<template>
  <div class="image-generator">
    <!-- 加载动画 -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p style="margin-top: 10px;">Generating images...</p>
    </div>
    <!-- 最终图片 -->
    <div
      :class="['image-container', { 'inner-frame': innerFrame }]"
      :style="shapeStyle"
      v-else-if="!isLoading && !isError"
    >
      <img :src="imageSrc" alt="image generator"/>
      <!-- 扫光 -->
      <div class="scan-light" :style="{ width: wRatio + '%', height: hRatio + '%' }" v-show="hasMat"></div>
      <!-- 内框 -->
      <div class="frame-holder-box" v-if="innerFrame">
        <div class="frame-holder" :style="{ backgroundImage: `url(${imageSrc})` }"></div>
      </div>
    </div>
    <!-- 错误信息 -->
    <p v-else>Image generation error, please refresh the page and try again.</p>
  </div>
</template>

<script setup lang="ts">
import {cloneDeep, isEqual} from "lodash-es";
import type {PixelType} from "./interface";
import ct from '~/assets/images/ct.png'
import cl from '~/assets/images/cl.png'

defineOptions({
  name: 'ImageGenerator',
})

interface SizeCm {
  width: number;
  length: number
}

// 定义 Props
interface Props {
  modelValue?: string; // 最终图片的 URL
  pixel?: PixelType; // 最终图片的 尺寸
  coreImage: string; // 画芯图片的 URL
  hasMat?: boolean; // 是否有卡纸，默认无
  matThickness?: string; // 卡纸宽度（英寸），默认 0
  matColor?: string; // 卡纸颜色，默认白色
  hasFrame?: boolean; // 是否有画框，默认无
  frameCornerImages?: string[]; // 4 张角图片 URL [左上, 右上, 左下, 右下]
  frameSideImages?: string[]; // 4 张边图片 URL [上, 下, 左, 右]
  frameCm?: string; // 框的宽度（cm）
  innerFrame?: boolean; // 是否是内画框，默认外画框
  sizeCm?: SizeCm; // 选择尺寸的宽和长（厘米）
  shape?: Dict.ShapeType; // 形状，默认 slim
  embeddedFrame?: boolean; // 是否是嵌入框
}

const props = withDefaults(defineProps<Props>(), {
  hasMat: false,
  matThickness: '0',
  matColor: '#ffffff',
  hasFrame: false,
  innerFrame: false,
  embeddedFrame: false,
  shape: 'slim',
  frameCornerImages: () => [],
  frameSideImages: () => [],
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'update:pixel': [value: PixelType];
  'change': [value: string];
}>();

const MAX_WIDTH = 1000; // 绘制的画芯最大宽度
const MAX_HEIGHT = 1000; // 绘制的画芯最大高度
const lastSnapshot = ref<Record<string, any> | null>(null);  // 上一次的 Props 快照
const inch2cm = (inch: string) => Number(inch) * 2.54;
const isLoading = ref(false); // 是否显示加载动画
const isError = ref(false); // 是否显示错误信息
const imageSrc = ref(''); // 最终图片的 URL
const offscreenCanvas = ref<HTMLCanvasElement | null>(null); // Canvas缓存
const wRatio = ref(100) // 宽度比例
const hRatio = ref(100) // 高度比例

// 加载图片工具函数
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 关键设置，允许跨域
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 绘制 X 轴方向平铺（顶部 / 底部边框）
const drawHorizontalTiledImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, totalWidth: number, height: number) => {
  const patternWidth = img.width;

  // 由于是平铺，如果只是绘制 1 次会导致出现白边，所以执行 4 次绘制（😂本人表示也很无奈，设计给出的方案）
  for (let repeat = 0; repeat < 4; repeat++) {
    for (let i = 0; i < totalWidth;) {
      const drawWidth = Math.min(patternWidth, totalWidth - i);
      ctx.drawImage(img, 0, 0, drawWidth, img.height, x + i, y, drawWidth, height);
      i += drawWidth;
    }
  }
}

// 绘制 Y 轴方向平铺（左侧 / 右侧边框）
const drawVerticalTiledImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, width: number, totalHeight: number) => {
  const patternHeight = img.height;

  // 由于是平铺，如果只是绘制 1 次会导致出现白边，所以执行 4 次绘制（😂本人表示也很无奈，设计给出的方案）
  for (let repeat = 0; repeat < 4; repeat++) {
    for (let i = 0; i < totalHeight;) {
      const drawHeight = Math.min(patternHeight, totalHeight - i);
      ctx.drawImage(img, 0, 0, img.width, drawHeight, x, y + i, width, drawHeight);
      i += drawHeight;
    }
  }
}

const isBase64 = (url: string): boolean => {
  return url.startsWith('data:image/') || url.startsWith('data:');
}

// 一个cm为单位的宽度，对应像素宽度
const getFrameWidthPx = (
  pixelSize: SizeCm,
  widthCm: number
) => {
  const realCmSize = {width: props.sizeCm!.width, length: props.sizeCm!.length}
  const scale = (pixelSize.width / realCmSize.width + pixelSize.length / realCmSize.length) / 2;
  return widthCm * scale;
}

// 绘制函数
const draw = async () => {
  try {
    isLoading.value = true; // 开始加载，显示加载动画
    isError.value = false; // 隐藏错误信息

    // 创建 Canvas 用于绘制
    if (!offscreenCanvas.value) {
      offscreenCanvas.value = document.createElement('canvas');
    }

    const canvas = offscreenCanvas.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 加载画芯图片并获取原始尺寸（需要判断是否是 Base64 类型）
    let coreImage = props.coreImage
    // if (!isBase64(coreImage)) coreImage += `?method=${'canvas'}` // 不是 Base64 类型，加上参数防止 CORS error
    const coreImg = await loadImage(coreImage);
    let coreWidth = coreImg.width;
    let coreHeight = coreImg.height;

    // 判断是否超出最大尺寸，进行等比缩放
    if (coreWidth > MAX_WIDTH || coreHeight > MAX_HEIGHT) {
      const widthRatio = MAX_WIDTH / coreWidth;
      const heightRatio = MAX_HEIGHT / coreHeight;
      const ratio = Math.min(widthRatio, heightRatio); // 取较小的缩放比
      coreWidth = Math.floor(coreWidth * ratio);
      coreHeight = Math.floor(coreHeight * ratio);
    }

    // 计算卡纸以及卡纸斜切和画框的宽度
    let frameThickness = 0; // 画框宽度
    let matThickness = props.hasMat
      ? getFrameWidthPx({width: coreWidth, length: coreHeight}, inch2cm(props.matThickness))
      : 0; // 卡纸宽度
    let MAT_WIDTH =  props.hasMat
      ? Math.min(5, Math.max(2, 2 + matThickness * 0.05)) // 基础值2 + matThickness的5%
      : 0; // 卡纸内嵌宽度
    matThickness = matThickness + MAT_WIDTH;
    let embeddedThickness = props.hasFrame && props.embeddedFrame
      ? getFrameWidthPx({width: coreWidth, length: coreHeight}, 0.6)
      : 0

    // 加载画框图片（若有）
    let cornerImgs: HTMLImageElement[] = []; // 4 张角图片
    let sideImgs: HTMLImageElement[] = []; // 4 张边图片
    if (props.hasFrame && props.frameCornerImages.length === 4 && props.frameSideImages.length === 4) {
      cornerImgs = await Promise.all(props.frameCornerImages.map(loadImage));
      sideImgs = await Promise.all(props.frameSideImages.map(loadImage));
      frameThickness = getFrameWidthPx({width: coreWidth, length: coreHeight}, Number(props.frameCm!));
    }

    // 计算最终尺寸
    const totalWidth = coreWidth + 2 * matThickness + 2 * frameThickness + 2 * embeddedThickness;
    const totalHeight = coreHeight + 2 * matThickness + 2 * frameThickness + 2 * embeddedThickness;

    wRatio.value = (coreWidth + 2 * matThickness) / totalWidth * 100
    hRatio.value = (coreHeight + 2 * matThickness) / totalHeight * 100

    // 设置画布尺寸
    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // 清空画布
    ctx.clearRect(0, 0, totalWidth, totalHeight);

    // 画芯的位置
    const coreX = frameThickness + matThickness + embeddedThickness;
    const coreY = frameThickness + matThickness + embeddedThickness;

    // 绘制画框（若有）
    if (props.hasFrame) {
      // 绘制 4 个角
      ctx.drawImage(cornerImgs[0], 0, 0, frameThickness, frameThickness); // 左上
      ctx.drawImage(cornerImgs[1], totalWidth - frameThickness, 0, frameThickness, frameThickness); // 右上
      ctx.drawImage(cornerImgs[2], 0, totalHeight - frameThickness, frameThickness, frameThickness); // 左下
      ctx.drawImage(cornerImgs[3], totalWidth - frameThickness, totalHeight - frameThickness, frameThickness, frameThickness); // 右下

      // 顶部边框
      ctx.save();
      ctx.translate(frameThickness, 0);
      drawHorizontalTiledImage(ctx, sideImgs[0], 0, 0, totalWidth - 2 * frameThickness, frameThickness);
      ctx.restore();

      // 底部边框
      ctx.save();
      ctx.translate(frameThickness, totalHeight - frameThickness);
      drawHorizontalTiledImage(ctx, sideImgs[1], 0, 0, totalWidth - 2 * frameThickness, frameThickness);
      ctx.restore();

      // 左侧边框
      ctx.save();
      ctx.translate(0, frameThickness);
      drawVerticalTiledImage(ctx, sideImgs[2], 0, 0, frameThickness, totalHeight - 2 * frameThickness);
      ctx.restore();

      // 右侧边框
      ctx.save();
      ctx.translate(totalWidth - frameThickness, frameThickness);
      drawVerticalTiledImage(ctx, sideImgs[3], 0, 0, frameThickness, totalHeight - 2 * frameThickness);
      ctx.restore();

      if (embeddedThickness !== 0) {

        ctx.fillStyle = 'rgba(0, 0, 0, 1)'

        // 上
        ctx.beginPath();
        ctx.moveTo(frameThickness, frameThickness); // 左上外
        ctx.lineTo(coreX + coreWidth + embeddedThickness, frameThickness); // 右上外
        ctx.lineTo(coreX + coreWidth, coreY); // 右上内（形成 // ）
        ctx.lineTo(frameThickness, coreY); // 左上内
        ctx.closePath();
        ctx.fill();

        // 左
        ctx.beginPath();
        ctx.moveTo(frameThickness, coreY); // 左上外
        ctx.lineTo(frameThickness, coreY + coreHeight + embeddedThickness); // 左下外
        ctx.lineTo(coreX, coreY + coreHeight); // 左下内（形成＼）
        ctx.lineTo(coreX, coreY); // 左上内
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(0, 0, 0, 1)'

        // 下
        ctx.beginPath();
        ctx.moveTo(frameThickness, coreY + coreHeight + embeddedThickness); // 左下外
        ctx.lineTo(coreX + coreWidth + embeddedThickness, coreY + coreHeight + embeddedThickness); // 右下外
        ctx.lineTo(coreX + coreWidth, coreY + coreHeight); // 右下内
        ctx.lineTo(frameThickness, coreY + coreHeight); // 左下内
        ctx.closePath();
        ctx.fill();

        // 右
        ctx.beginPath();
        ctx.moveTo(coreX + coreWidth, coreY); // 右上内
        ctx.lineTo(coreX + coreWidth + embeddedThickness, coreY - embeddedThickness); // 右上外（＼斜角）
        ctx.lineTo(coreX + coreWidth + embeddedThickness, coreY + coreHeight + embeddedThickness); // 右下外
        ctx.lineTo(coreX + coreWidth, coreY + coreHeight); // 右下内
        ctx.closePath();
        ctx.fill();
      }
    }

    // 绘制卡纸（若有）
    if (props.hasMat) {
      // 卡纸
      ctx.fillStyle = props.matColor;
      ctx.fillRect(frameThickness, frameThickness, totalWidth - 2 * frameThickness, totalHeight - 2 * frameThickness);

      // 采用图片的方式绘制阴影
      const SHADOW_WEIGHT = Math.min(50, Math.max(5, matThickness * 0.4));
      const ctShadow = await loadImage(ct);
      const clShadow = await loadImage(cl);

      // 上卡纸投影
      ctx.drawImage(ctShadow, frameThickness, frameThickness, totalWidth - 2 * frameThickness, SHADOW_WEIGHT);
      // 左卡纸投影
      ctx.drawImage(clShadow, frameThickness, frameThickness, SHADOW_WEIGHT, totalHeight - 2 * frameThickness);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'

      // 上
      ctx.beginPath();
      ctx.moveTo(coreX - MAT_WIDTH, coreY - MAT_WIDTH); // 左上外
      ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY - MAT_WIDTH); // 右上外
      ctx.lineTo(coreX + coreWidth, coreY); // 右上内（形成 // ）
      ctx.lineTo(coreX - MAT_WIDTH, coreY); // 左上内
      ctx.closePath();
      ctx.fill();
      // 左
      ctx.beginPath();
      ctx.moveTo(coreX - MAT_WIDTH, coreY); // 左上外
      ctx.lineTo(coreX - MAT_WIDTH, coreY + coreHeight + MAT_WIDTH); // 左下外
      ctx.lineTo(coreX, coreY + coreHeight); // 左下内（形成＼）
      ctx.lineTo(coreX, coreY); // 左上内
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(244, 243, 243, 1)'
      // 右
      ctx.beginPath();
      ctx.moveTo(coreX + coreWidth, coreY); // 右上内
      ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY - MAT_WIDTH); // 右上外（＼斜角）
      ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY + coreHeight + MAT_WIDTH); // 右下外
      ctx.lineTo(coreX + coreWidth, coreY + coreHeight); // 右下内
      ctx.closePath();
      ctx.fill();

      // 下
      ctx.beginPath();
      ctx.moveTo(coreX, coreY + coreHeight); // 左下内
      ctx.lineTo(coreX - MAT_WIDTH, coreY + coreHeight + MAT_WIDTH); // 左下外（＼斜角）
      ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY + coreHeight + MAT_WIDTH); // 右下外
      ctx.lineTo(coreX + coreWidth, coreY + coreHeight); // 右下内
      ctx.closePath();
      ctx.fill();
    }

    // 绘制画芯
    ctx.drawImage(coreImg, coreX, coreY, coreWidth, coreHeight);

    // 将 Canvas 转换为图片 URL
    imageSrc.value = canvas.toDataURL('image/png');
    emit('update:modelValue', imageSrc.value); // 触发更新
    emit('update:pixel', {width: totalWidth, height: totalHeight}); // 触发更新
    emit('change', imageSrc.value); // 触发事件
  } catch (e) {
    isError.value = true; // 显示错误信息
  } finally {
    isLoading.value = false; // 加载完成，隐藏加载动画
  }

};

const shapeStyle = computed(() => {
  let style = {}
  switch (props.shape) {
    case "square":
    case "landscape":
    case "panoramic":
      style = {
        maxWidth: `70% !important`,
      }
      break;
    case "portrait":
    case "slim":
      style = {
        maxWidth: `50%!important`,
      }
      break;
    default:
      break;
  }
  return style
})

watch(
  () => ({
    coreImage: props.coreImage,
    hasMat: props.hasMat,
    matThickness: props.matThickness,
    matColor: props.matColor,
    hasFrame: props.hasFrame,
    frameCornerImages: props.frameCornerImages,
    frameSideImages: props.frameSideImages,
    sizeCm: props.sizeCm,
  }),
  (newVal) => {
    const rawNew = toRaw(newVal); // 防止响应式污染
    if (!isEqual(rawNew, lastSnapshot.value)) {
      draw(); // 真正变了才调用 draw
      lastSnapshot.value = cloneDeep(rawNew); // 更新快照
    }
  },
  {flush: 'post', immediate: true} // flush 为 post 确保在 DOM 更新后执行
);
</script>

<style scoped lang="scss">
.image-generator {
  width: 100%;
  min-height: 26vw;
  perspective: 1200px;
  perspective-origin: 100% 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px; /* 可根据需要调整高度 */
  }

  .spinner {
    border: 4px solid #f3f3f3; /* 灰色边框 */
    border-top: 4px solid var(--color-primary); /* 蓝色顶部，表示旋转 */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite; /* 旋转动画 */
  }

  .image-container {
    position: relative;
    z-index: 0;
    margin: auto;
    max-height: 80% !important;
    box-shadow: 0 5px 5px 0 #666;

    &.inner-frame {
      transform: rotateY(15deg) translateX(clamp(15px, 1.82vw, 35px));
      transform-style: preserve-3d;
      box-shadow: -10px 5px 20px 0 #666;
    }

    /*侧框*/
    .frame-holder-box {
      position: absolute;
      inset: 0;
      z-index: 20;
      perspective: 1200px;

      .frame-holder {
        position: absolute;
        width: 6%;
        height: 100%;
        top: 0;
        left: -6%;
        transform: rotateY(-37deg);
        transform-origin: right center;
        background-position: 0 0;
        background-size: auto 100%;

        /*侧框暗化*/
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          border-right: 1px solid #999;
          z-index: 20;
        }

        /*侧框投影*/
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -45px;
          width: 0;
          height: 0;
          border-top: 50px solid rgba(0, 0, 0, 0.2);
          border-left: 50px solid transparent;
          filter: blur(7px);
          transform: skewX(15deg);
          transform-origin: 100% 100%;
        }
      }
    }

    .scan-light {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        width: 500%;
        height: 100px;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, .65), rgba(255, 255, 255, 0));
        transform-origin: center center;
        transform: translate(-100%, -50%) rotate(-60deg);
        animation: scanLights 3s linear 1s infinite;
      }
    }

  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes scanLights {
  0% {
    transform: translate(-100%, -50%) rotate(-60deg);
  }
  100% {
    transform: translate(0%, -50%) rotate(-60deg);
  }
}

</style>