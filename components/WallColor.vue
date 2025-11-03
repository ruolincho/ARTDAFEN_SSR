<template>
  <Teleport to="body">
    <div class="wall-color" v-show="visible" @click="visible = false">
      <div class="wrapper" :style="{'background-color': color }" @click.stop>
        <div class="preview-box w-full acea-row row-center-wrapper aspect-ratio">
          <img :src="wallImage" alt="wallImage">
        </div>
        <div class="acea-row row-center-wrapper py-sm-40 py-20">
          <span class="text-14 text-gray-700 mr-5">SELECT YOUR WALL COLOR</span>
          <el-color-picker v-model="color"/>
        </div>
        <div class="swatches-box pb-sm-40 px-sm-40 pb-20 px-20">
          <div
            class="swatches-item cursor-pointer"
            :class="{'on': color === item }"
            @click="color = item" v-for="(item, index) in fixedColor"
            :key="index"
            :style="{'background-color': item }"
          />
        </div>
        <div class="close-box cursor-pointer acea-row row-center-wrapper" @click="visible = false">
          <span class="iconfont icon-close"></span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {useLockScroll} from "~/composables/useLockScroll";

defineOptions({
  name: 'WallColor',
})

// 定义 Props
interface Props {
  wallImage: string; // 背景墙图片的 URL
  defaultColor?: string; // 颜色值
  fixedColor?: string[]; // 是否禁用颜色选择器
}

const props = withDefaults(defineProps<Props>(), {
  defaultColor: '#FFFFFF',
  fixedColor: () => ['#FFFFFF', '#A1887F', '#FF8A65', '#FFCA28', '#DCEDC8', '#66BB6A', '#81D4FA', '#42A5F5', '#CE93D8', '#EC407A', '#90A4AE', '#9E9E9E', '#FFCC80', '#FFEE58', '#DCE775', '#4DB6AC', '#80DEEA', '#7986CB', '#E57373', '#7E57C2']
});

onMounted(() => {
  color.value = props.defaultColor
})

const visible = ref(false)
const color = ref('')

const open = () => {
  visible.value = true
}

// 监听 visible 变化 锁定滚动
useLockScroll(visible)

defineExpose({
  open
})
</script>

<style lang="scss">
.wall-color {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgba(0, 0, 0, .5);

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1100px;
    width: 100%;
    background: #fff;

    .preview-box {
      max-height: 500px;

      img {
        max-width: 83% !important;
        max-height: 83% !important;
      }
    }

    .swatches-box {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      margin: auto;
      gap: 10px;
      max-width: 730px;

      .swatches-item {
        aspect-ratio: 56 / 43;
        width: 100%;

        &.on {
          border: 1px solid #333;
        }
      }
    }

    .close-box {
      position: absolute;
      right: 0;
      top: 0;
      width: 39px;
      height: 39px;
      font-size: 12px;
    }
  }
}

@media (max-width: 767px) {
  .wall-color {
    .wrapper {
      margin: auto;
      height: 100%;

      .preview-box {
        img {
          max-width: 300px !important;
          max-height: 300px !important;
        }
      }

      .swatches-box {
        grid-template-columns: repeat(7, 1fr);
      }
    }

  }
}
</style>