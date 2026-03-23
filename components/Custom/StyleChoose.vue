<template>
  <div class="text-center my-lg-40 my-30">
    <h2 class="text-50">CHOOSE YOUR FAVORITE STYLE</h2>
    <p class="mt-20 text-gray-600 text-20 f-bold-500">
      Discover the perfect look for every moment. From soft aesthetics to dramatic fantasy, transform your photos
      with unique textures designed to inspire.
    </p>
  </div>
  <div ref="favoriteMainRef" style="min-height: 450px" v-loading="loading">
    <div class="compare-list" v-show="themeOption?.children?.length">
      <div class="compare-item" v-for="{ id, name, intro, img, painting } in themeOption?.children" :key="id">
        <div class="compare-wrapper">
          <div class="fg_compare_block">
            <div class="compare-container" style="--pos: 50%;">

              <div class="img-layer after">
                <img v-lazy="imagePrefix(img)" alt="ORIGINAL PHOTO"/>
                <span class="label">ORIGINAL PHOTO</span>
              </div>

              <div class="img-layer before">
                <img v-lazy="imagePrefix(painting)" alt="OUR PAINTING"/>
                <span class="label">OUR PAINTING</span>
              </div>

              <input
                  type="range"
                  min="0"
                  max="100"
                  value="50"
                  class="compare-slider"
                  @input="handleSlide"
              />

              <div class="slider-line">
                <div class="slider-button"></div>
              </div>

            </div>
          </div>
        </div>
        <div class="compare-content text-center">
          <p class="p-title text-40">{{ name }}</p>
          <p class="p-desc text-28">{{ intro }}</p>
          <div class="p-btn">
            <el-upload
                :accept="fileType.join(',')"
                :before-upload="beforeUpload"
                :on-change="(file) => uploadChange(file, id)"
                :auto-upload="false"
                :show-file-list="false"
            >
              <el-button type="primary" size="large">CHOOSE FILE</el-button>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center py-60" v-show="!loading && !themeOption?.children?.length">
      <span class="iconfont icon-empty text-50"></span>
      <p class="text-20 f-bold mt-20">No Data</p>
      <p class="text-14 my-20">No data found, please check the query or try again later.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IPaint} from "~/api/interface/paint/paint";
import {useImage} from "~/composables/useImage";
import type {UploadFile, UploadProps} from "element-plus";

const { imagePrefix } = useImage()

// 定义 Props
interface Props {
  modelValue: string;
  loading: boolean;
  themeOption: IPaint.ThemeRow;
  fileType: Array<string>; // 支持上传文件的类型
  beforeUpload: UploadProps['beforeUpload']; // 上传前回调
  uploadChangeWithStyle: (file: UploadFile) => Promise<void>  // 上传成功回调
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>()

const handleSlide = (e: Event) => {
  // 获取当前的 input 元素
  const slider = e.target as HTMLInputElement;

  // 获取父容器 (.compare-container)
  const container = slider.parentElement as HTMLElement;

  // 直接修改 CSS 变量，浏览器合成线程处理绘制，极快
  if (container) {
    container.style.setProperty('--pos', `${slider.value}%`);
  }
}

const uploadChange = (file: UploadFile, id: string) => {
  emit("update:modelValue", id);
  props.uploadChangeWithStyle(file)
}
</script>

<style scoped lang="scss">
  .compare-list {

    .compare-item {
      display: flex;
      justify-content: space-between;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      .compare-wrapper {
        width: 59.21%;

        /* 容器样式 */
        .fg_compare_block {
          width: 100%;

          .compare-container {
            position: relative;
            display: grid;
            place-content: center;
            overflow: hidden;
            aspect-ratio: 4 / 3; /* 强制图片比例，防止布局抖动 */

            /* 图片层通用样式 */
            .img-layer {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none; /* 让鼠标事件穿透到 input */

              img {
                width: 100%;
                height: 100%;
                object-fit: cover; /* 保证填充 */
                display: block;
              }

              /* 标签样式 */
              .label {
                position: absolute;
                top: 1rem;
                padding: 4px 8px;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                font-size: 12px;
                font-weight: bold;
                border-radius: 4px;
                z-index: 1;
                user-select: none;
              }

              &.after .label {
                right: 1rem;
              }

              &.before .label {
                left: 1rem;
              }

              /* 核心逻辑：上层图片裁剪 */
              &.before {
                z-index: 1;
                /* 使用 inset 裁剪：上 右 下 左 */
                /* 计算公式：右边裁剪量 = 100% - 当前位置 */
                clip-path: inset(0 calc(100% - var(--pos)) 0 0);
                will-change: clip-path; /* 性能优化：提示浏览器提升为合成层 */
              }
            }

            /* 输入控件 (隐形滑块) */
            .compare-slider {
              position: absolute;
              z-index: 3; /* 最顶层 */
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              margin: 0;
              opacity: 0; /* 完全透明，但保留交互 */
              cursor: grab;
              /* 某些移动端浏览器的触摸优化 */
              touch-action: pan-y;

              &:active {
                cursor: grabbing;
              }
            }

            /* 视觉分割线 (跟随变量移动) */
            .slider-line {
              position: absolute;
              z-index: 2;
              top: 0;
              bottom: 0;
              left: var(--pos); /* 跟随变量 */
              width: 2px;
              background: white;
              pointer-events: none; /* 不干扰点击 */
              transform: translateX(-50%); /* 居中对齐 */
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

              /* 中心拖拽按钮样式 */
              .slider-button {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;

                /* 绘制按钮中的左右箭头 */
                &::before {
                  content: '';
                  display: block;
                  width: 0;
                  height: 0;
                  border-top: 6px solid transparent;
                  border-bottom: 6px solid transparent;
                  border-right: 8px solid #333; /* 左箭头 */
                  margin-right: 4px;
                }

                &::after {
                  content: '';
                  display: block;
                  width: 0;
                  height: 0;
                  border-top: 6px solid transparent;
                  border-bottom: 6px solid transparent;
                  border-left: 8px solid #333; /* 右箭头 */
                  margin-left: 4px;
                }
              }
            }
          }
        }
      }

      .compare-content {
        width: 39.47%;
        background: var(--color-gray-200);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .p-title {
          margin-top: clamp(15px, 2.60vw, 50px);
          //margin-bottom: clamp(15px, 3.64vw, 70px);
        }

        .p-desc {
          margin: 0 clamp(15px, 3.125vw, 60px);
          line-height: 1.5em;
        }

        .p-btn {
          margin: 0 15px clamp(15px, 1.56vw, 30px);

        }

        :deep(.el-upload) {
          display: block;
        }

        :deep(.el-button) {
          width: 100%;

        }
      }

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }

    .compare-item + .compare-item {
      margin-top: clamp(15px, 3.125vw, 60px);
    }

  }

  @media (max-width: 991px) {
    .compare-list .compare-item {
      flex-direction: column !important;
      justify-content: unset;

      .compare-wrapper {
        width: 100%;
      }

      .compare-content {
        width: 100%;
        row-gap: 15px;
      }
    }
  }
</style>