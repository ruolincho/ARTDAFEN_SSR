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
        v-else-if="!isLoading && !isError"
    >
      <img :src="imageSrc" alt="image generator" ref="imgRef" @load="onImgLoad"/>
      <!-- 扫光 -->
      <div class="touch-container" :style="{ width: imgRefWidth + 'px', height: imgRefHeight + 'px' }"  v-show="hasMat">
        <div class="scan-light" :style="{ width: wRatio + '%', height: hRatio + '%' }"></div>
      </div>
      <!-- 点击区域 -->
      <div class="touch-container" :class="{ 'touch-container-click': hasTouchListener }" :style="{ width: imgRefWidth + 'px', height: imgRefHeight + 'px' }" @click="handleScreenClick" />
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
import {useAppStore} from "~/stores/modules/app";

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
  squareImage?: string; // 1:1 正方形图片的 URL
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
  'update:modelValue': [value: string]; // 最终图片的 URL
  'update:squareImage': [value: string]; // 1:1 正方形图片的 URL
  'update:pixel': [value: PixelType];
  'change': [value: string];
  'touchScreen': [value: string]; // 点击了屏幕
}>();

const CONSTANTS = {
  //(0.1 - 1.0),1.0 表示没有透视（平面），数字越小透视越夸张。
  PERSPECTIVE_FACTOR: 0.88,
  // 正方形图片的尺寸
  SQUARE_SIZE: 1000,
  // 绘制的画芯最大宽度
  MAX_WIDTH: 1000,
  // 绘制的画芯最大高度
  MAX_HEIGHT: 1000,
  // 最多缓存多少张生成的图
  MAX_CACHE_SIZE: 30,
};

const appStore = useAppStore()
const lastSnapshot = ref<Record<string, any> | null>(null);  // 上一次的 Props 快照
const inch2cm = (inch: string) => Number(inch) * 2.54;
const isLoading = ref(false); // 是否显示加载动画
const isError = ref(false); // 是否显示错误信息
const imageSrc = ref(''); // 最终图片的 URL
const squareImageSrc = ref(''); // 1:1 正方形图片的 URL

const offscreenCanvas = ref<HTMLCanvasElement | null>(null); // Canvas缓存
const offscreenSquareCanvas = ref<HTMLCanvasElement | null>(null); // 正方形 Canvas 缓存
const wRatio = ref(100) // 宽度比例
const hRatio = ref(100) // 高度比例

// 获取渲染图片的宽度和高度
const imgRef = ref<HTMLImageElement | null>(null)
const imgRefWidth = ref(0)
const imgRefHeight = ref(0)
const onImgLoad = () => {
  if (!imgRef.value) return
  imgRefWidth.value = imgRef.value.width
  imgRefHeight.value = imgRef.value.height
}

// 加载图片工具函数
const loadImage = (src: string, signal?: AbortSignal): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {

    // 如果信号已经被取消，直接 reject
    if (signal?.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; // 关键设置，允许跨域
    img.src = src;

    const onAbort = () => {
      img.onload = null;
      img.onerror = null;
      img.src = ''; // 尝试停止网络请求
      reject(new DOMException('Aborted', 'AbortError'));
    };

    img.onload = () => {
      if (signal) signal.removeEventListener('abort', onAbort); // 清理监听
      resolve(img);
    };

    img.onerror = (err) => {
      if (signal) signal.removeEventListener('abort', onAbort); // 清理监听
      reject(new Error('Image load failed'));
    };

    // 监听取消信号
    if (signal) {
      signal.addEventListener('abort', onAbort);
    }
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

// 添加缓存机制，使用 Map 存储，key 为序列化的 props 组合，value 为生成的 base64 URL
const cache = ref(new Map<string, { src: string; squareSrc: string; pixel: PixelType; ratio: PixelType }>());

// 获取图片的唯一指纹， 这样可以避免把巨大的 Base64 字符串塞进 JSON 序列化里，提升性能
const getImageFingerprint = (url: string) => {
  if (!url) return '';
  // 如果是 Base64，取长度 + 后30位字符作为唯一标识（足以区分不同图片）
  if (isBase64(url)) {
    return `base64_${url.length}_${url.slice(-30)}`;
  }
  // 如果是普通 URL，直接使用
  return url;
}

// 生成缓存 key，基于所有影响绘制的 props
const generateCacheKey = () => {
  const propsForKey = {
    coreImageId: getImageFingerprint(props.coreImage),
    hasMat: props.hasMat,
    matThickness: props.matThickness,
    matColor: props.matColor,
    hasFrame: props.hasFrame,
    frameCornerImages: props.frameCornerImages,
    frameSideImages: props.frameSideImages,
    frameCm: props.frameCm,
    embeddedFrame: props.embeddedFrame,
    sizeCm: props.sizeCm,
    innerFrame: props.innerFrame,
  };
  return JSON.stringify(propsForKey);
}

let abortController: AbortController | null = null;

// 绘制函数
const draw = async () => {
  // 如果有正在进行的任务，取消它
  if (abortController) abortController.abort();

  // 创建新的控制器
  abortController = new AbortController();
  const signal = abortController.signal;

  const key = generateCacheKey();

  // 检查缓存
  if (cache.value.has(key)) {
    console.log('检测到缓存')
    const cached = cache.value.get(key)!;
    imageSrc.value = cached.src;
    squareImageSrc.value = cached.squareSrc;
    wRatio.value = cached.ratio.width;
    hRatio.value = cached.ratio.height;

    emit('update:modelValue', imageSrc.value);
    emit('update:squareImage', squareImageSrc.value);
    emit('update:pixel', cached.pixel);
    emit('change', imageSrc.value);
    isLoading.value = false;
    return;
  }

  try {
    isLoading.value = true; // 开始加载，显示加载动画
    isError.value = false; // 隐藏错误信息

    // 创建 Canvas 用于绘制
    if (!offscreenCanvas.value) {
      offscreenCanvas.value = document.createElement('canvas');
    }

    const canvas = offscreenCanvas.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return isLoading.value = false;

    // 加载画芯图片并获取原始尺寸（需要判断是否是 Base64 类型）
    let coreImage = props.coreImage
    // if (!isBase64(coreImage)) coreImage += `?method=${'canvas'}` // 不是 Base64 类型，加上参数防止 CORS error
    const coreImg = await loadImage(coreImage, signal);
    let coreWidth = coreImg.width;
    let coreHeight = coreImg.height;

    // 判断是否超出最大尺寸，进行等比缩放
    if (coreWidth > CONSTANTS.MAX_WIDTH || coreHeight > CONSTANTS.MAX_HEIGHT) {
      const widthRatio = CONSTANTS.MAX_WIDTH / coreWidth;
      const heightRatio = CONSTANTS.MAX_HEIGHT / coreHeight;
      const ratio = Math.min(widthRatio, heightRatio); // 取较小的缩放比
      coreWidth = Math.floor(coreWidth * ratio);
      coreHeight = Math.floor(coreHeight * ratio);
    }

    // 计算卡纸以及卡纸斜切和画框的宽度
    let frameThickness = 0; // 画框宽度
    let matThickness = props.hasMat
        ? getFrameWidthPx({width: coreWidth, length: coreHeight}, inch2cm(props.matThickness))
        : 0; // 卡纸宽度
    let MAT_WIDTH = props.hasMat
        ? Math.min(5, Math.max(2, 2 + matThickness * 0.05)) // 基础值2 + matThickness的5%
        : 0; // 卡纸内嵌宽度
    matThickness = matThickness + MAT_WIDTH;
    let embeddedThickness = props.hasFrame && props.embeddedFrame
        ? getFrameWidthPx({width: coreWidth, length: coreHeight}, 0.6)
        : 0 // 细框内嵌宽度
    let innerFrameThickness = props.innerFrame
        ? getFrameWidthPx({width: coreWidth, length: coreHeight}, 2)
        : 0 // 内框侧面宽度

    // 加载画框图片（若有）
    let cornerImgs: HTMLImageElement[] = []; // 4 张角图片
    let sideImgs: HTMLImageElement[] = []; // 4 张边图片
    if (props.hasFrame && props.frameCornerImages.length === 4 && props.frameSideImages.length === 4) {
      cornerImgs = await Promise.all(props.frameCornerImages.map((src) => loadImage(src, signal)));
      sideImgs = await Promise.all(props.frameSideImages.map((src) => loadImage(src, signal)));
      frameThickness = getFrameWidthPx({width: coreWidth, length: coreHeight}, Number(props.frameCm!));
    }

    // 计算最终尺寸
    const totalWidth = coreWidth + 2 * matThickness + 2 * frameThickness + 2 * embeddedThickness + innerFrameThickness;
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
      ctx.drawImage(cornerImgs[0]!, 0, 0, frameThickness, frameThickness); // 左上
      ctx.drawImage(cornerImgs[1]!, totalWidth - frameThickness, 0, frameThickness, frameThickness); // 右上
      ctx.drawImage(cornerImgs[2]!, 0, totalHeight - frameThickness, frameThickness, frameThickness); // 左下
      ctx.drawImage(cornerImgs[3]!, totalWidth - frameThickness, totalHeight - frameThickness, frameThickness, frameThickness); // 右下

      // 顶部边框
      ctx.save();
      ctx.translate(frameThickness, 0);
      drawHorizontalTiledImage(ctx, sideImgs[0]!, 0, 0, totalWidth - 2 * frameThickness, frameThickness);
      ctx.restore();

      // 底部边框
      ctx.save();
      ctx.translate(frameThickness, totalHeight - frameThickness);
      drawHorizontalTiledImage(ctx, sideImgs[1]!, 0, 0, totalWidth - 2 * frameThickness, frameThickness);
      ctx.restore();

      // 左侧边框
      ctx.save();
      ctx.translate(0, frameThickness);
      drawVerticalTiledImage(ctx, sideImgs[2]!, 0, 0, frameThickness, totalHeight - 2 * frameThickness);
      ctx.restore();

      // 右侧边框
      ctx.save();
      ctx.translate(totalWidth - frameThickness, frameThickness);
      drawVerticalTiledImage(ctx, sideImgs[3]!, 0, 0, frameThickness, totalHeight - 2 * frameThickness);
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
      const ctShadow = await loadImage(ct, signal);
      const clShadow = await loadImage(cl, signal);

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

    // 绘制内框 (若是)
    if (props.innerFrame) {
      // 透视因子
      const perspectiveFactor = CONSTANTS.PERSPECTIVE_FACTOR;

      // 计算右侧透视高度
      const leftHeight = coreHeight;
      const rightHeight = coreHeight * perspectiveFactor;

      // 计算绘制起始点
      // 主图从留白+厚度之后开始画
      const startX = innerFrameThickness;
      const startY = 0;

      // 自执行函数，绘制左侧透视矩形
      (function (image, sX, sY, height, thickness) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 侧面透视的垂直缩进量
        const verticalOffset = 10;
        // 源图中用于侧面的切片总宽度 (保持原逻辑：取左侧 10%)
        const sourceSliceWidth = image.width * 0.1;

        // 使用切片法循环绘制，使纹理跟随梯形透视
        // 我们从左(外侧)向右(内侧)绘制
        for (let i = 0; i < thickness; i++) {
          // 进度百分比 (0 = 最左/外侧, 1 = 最右/内侧)
          let percent = i / thickness;

          // 1. 计算当前切片的高度 (线性插值)
          // 外侧高度 = height - 20 (上下各缩进10)
          // 内侧高度 = height (原始高度)
          let hOuter = height - 2 * verticalOffset;
          let hInner = height;
          let currentHeight = hOuter + (hInner - hOuter) * percent;

          // 2. 计算当前切片的 Y 起始坐标 (线性插值)
          // 外侧 Y = sY + 10
          // 内侧 Y = sY
          let yOuter = sY + verticalOffset;
          let yInner = sY;
          let currentY = yOuter + (yInner - yOuter) * percent;

          // 3. 计算当前切片的 X 坐标
          // sX 是主图开始的位置，侧面在 sX 的左边
          let currentX = sX - thickness + i;

          // 4. 绘制 1px 宽的切片
          ctx.drawImage(
              image,
              (i * sourceSliceWidth) / thickness,
              0,
              sourceSliceWidth / thickness,
              image.height, // 源图：按比例取那10%的内容
              currentX, currentY, 1, currentHeight // 目标：根据透视计算的高度和位置
          );
        }

        // 绘制侧面阴影遮罩 (保持原有的形状逻辑，覆盖一层半透明黑色)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(sX, sY); // 右上 (内)
        ctx.lineTo(sX, sY + height); // 右下 (内)
        ctx.lineTo(sX - thickness, sY + height - verticalOffset); // 左下 (外)
        ctx.lineTo(sX - thickness, sY + verticalOffset); // 左上 (外)
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fill();
        ctx.restore();
      })(coreImg, startX, startY, leftHeight, innerFrameThickness);

      // 自执行函数，绘制主图透视矩形
      (function (image, sX, sY, width, lHeight, rHeight) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 切片法绘制主图
        for (let i = 0; i < width; i++) {
          let percent = i / width;
          // 线性插值计算当前切片高度
          let currentHeight = lHeight - ((lHeight - rHeight) * percent);
          // 垂直居中对齐的 Y 坐标偏移量
          let offsetY = (lHeight - currentHeight) / 2;

          ctx.drawImage(
              image,
              (i * image.width) / width,
              0,
              image.width / width, image.height, // 源图切片
              sX + i,
              sY + offsetY,
              2,
              currentHeight                          // 目标位置与动态高度
          );
        }
      })(coreImg, startX, startY, coreWidth, leftHeight, rightHeight);
    } else {
      // 绘制画芯
      ctx.drawImage(coreImg, coreX, coreY, coreWidth, coreHeight);
    }

    // 将 Canvas 转换为图片 URL
    imageSrc.value = canvas.toDataURL('image/png');

    // ------------绘制在一个1:1的图层中------------

    // 1. 检查并创建/复用 Canvas 实例
    if (!offscreenSquareCanvas.value) {
      offscreenSquareCanvas.value = document.createElement('canvas');
      offscreenSquareCanvas.value.width = CONSTANTS.SQUARE_SIZE;
      offscreenSquareCanvas.value.height = CONSTANTS.SQUARE_SIZE;
    }
    const squareCanvas = offscreenSquareCanvas.value;
    const sqCtx = squareCanvas.getContext('2d');

    if (sqCtx) {
      // 2. 清除旧内容并填充白色背景
      sqCtx.fillStyle = '#ffffff';
      sqCtx.fillRect(0, 0, CONSTANTS.SQUARE_SIZE, CONSTANTS.SQUARE_SIZE);

      // 3. 根据 shape 决定原图在 1000px 中的目标占比
      const targetWidthRatio = shapeWidthMap[props.shape];

      // 4. 计算缩放 Scale
      // 逻辑：尝试将图片宽度缩放到 1000 * ratio
      // 但必须同时保证高度不超过 1000 (减去一点padding，比如0.9, 防止贴边不好看)
      const widthBasedScale = (CONSTANTS.SQUARE_SIZE * targetWidthRatio) / totalWidth;
      const heightBasedScale = (CONSTANTS.SQUARE_SIZE * 0.8) / totalHeight;

      // 取两者中较小的 scale
      const finalScale = Math.min(widthBasedScale, heightBasedScale);

      // 5. 计算绘制尺寸和偏移量
      const drawW = totalWidth * finalScale;
      const drawH = totalHeight * finalScale;
      const dx = (CONSTANTS.SQUARE_SIZE - drawW) / 2;
      const dy = (CONSTANTS.SQUARE_SIZE - drawH) / 2;

      // 5. 绘制
      sqCtx.save()
      sqCtx.shadowOffsetX = props.innerFrame ? -15 : 0;    // X轴偏移
      sqCtx.shadowOffsetY = props.innerFrame ? 20 : 5;    // Y轴偏移 5px
      sqCtx.shadowBlur = 5;       // 模糊程度 5px
      sqCtx.shadowColor = '#666'; // 颜色
      sqCtx.drawImage(canvas, dx, dy, drawW, drawH);
      sqCtx.restore()

      squareImageSrc.value = squareCanvas.toDataURL('image/png');
    }

    // 如果缓存超过限制，删除最早的一个
    if (cache.value.size >= CONSTANTS.MAX_CACHE_SIZE) cache.value.delete(cache.value.keys().next().value!);

    // 存入缓存
    cache.value.set(key, {
      src: imageSrc.value,
      squareSrc: squareImageSrc.value,
      pixel: {width: totalWidth, height: totalHeight},
      ratio: {width: wRatio.value, height: hRatio.value}
    });

    // 触发更新
    emit('update:modelValue', imageSrc.value);
    emit('update:squareImage', squareImageSrc.value);
    emit('update:pixel', {width: totalWidth, height: totalHeight});
    emit('change', imageSrc.value); // 触发事件

    isLoading.value = false;
  } catch (e: any) {
    // 关键：区分是“用户取消”还是“真的出错了”
    if (e.name === 'AbortError') {
      console.log('上一次渲染已被取消');
      return;
    }
    // 真的出错了
    console.error(e);
    isError.value = true;
    isLoading.value = false;
  }

};

const shapeWidthMap = {
  'square': appStore.device === 'pc' ? 0.6 : 0.8,
  'landscape': appStore.device === 'pc' ? 0.7 : 0.8,
  'panoramic': appStore.device === 'pc' ? 0.7 : 0.8,
  'portrait': 0.5,
  'slim': 0.4,
}

const handleScreenClick = () => {
  emit('touchScreen', squareImageSrc.value);
}

// 获取当前组件实例
const instance = getCurrentInstance()
// 判断父组件是否传递了 @touchScreen (底层会编译为 onTouchScreen)
const hasTouchListener = computed(() => {
  return !!instance?.vnode.props?.onTouchScreen;
})

watch(
    () => ({
      coreImageId: getImageFingerprint(props.coreImage),
      hasMat: props.hasMat,
      matThickness: props.matThickness,
      matColor: props.matColor,
      hasFrame: props.hasFrame,
      frameCornerImages: props.frameCornerImages,
      frameSideImages: props.frameSideImages,
      frameCm: props.frameCm,
      embeddedFrame: props.embeddedFrame,
      sizeCm: props.sizeCm,
      innerFrame: props.innerFrame,
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
  height: 90%;
  width: 90%;
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

  .image-container {
    position: relative;
    z-index: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 5px 5px #666);

    /* 强制开启硬件加速，解决闪烁和残影 */
    transform: translate3d(0, 0, 0);
    /* 告知浏览器该属性会变化 (可选，有时能优化性能) */
    will-change: filter;

    img {
      max-width: 100%;
      max-height: 100%;
    }

    &.inner-frame {
      filter: drop-shadow(-15px 20px 5px #666);
    }

    .touch-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: transparent;
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

    .touch-container-click {
      cursor: zoom-in;
    }
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

@media (max-width: 767px) {
  .image-generator {
    width: 80%;
    height: 80%;

    .image-container {

      &.inner-frame {
        filter: drop-shadow(-10px 10px 2px rgba(0, 0, 0, 0.5));
      }
    }
  }
}

</style>