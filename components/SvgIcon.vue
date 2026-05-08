<template>
  <Icon :name="fullIconName" mode="svg" class="svg-icon" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
}

const props = defineProps<Props>()

// 自动补全前缀，外部调用保持不变
const fullIconName = computed(() => `my-icon:${props.name}`)
</script>

<style scoped>
  .svg-icon {
    /* --- 尺寸继承 --- */
    width: 1em;            /* 继承父级字体大小 */
    height: 1em;           /* 继承父级字体大小 */
    vertical-align: -0.15em;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  /* 强制穿透，覆盖 SVG 内部 path, circle 等标签的 fill 属性 */
  .svg-icon :deep(path),
  .svg-icon :deep(circle),
  .svg-icon :deep(rect),
  .svg-icon :deep(svg) {
    fill: currentColor !important;
    stroke: currentColor !important;
  }
</style>