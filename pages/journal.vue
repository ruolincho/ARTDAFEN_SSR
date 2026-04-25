<template>
  <div id="list-anchor"></div>
  <NuxtPage/>
</template>

<script setup lang="ts">
import {resolvePageMeta} from "~/config/pageMeta";
import {nextTick, watch} from "vue";

defineOptions({
  name: 'Blog'
})

const route = useRoute()

useHead(resolvePageMeta("/journal"));

// ⬇️ 定义滚动动作
const executeScroll = () => {
  if (!process.client) return

  // 使用 requestAnimationFrame 确保在浏览器渲染下一帧时执行，防止 DOM 还没准备好
  requestAnimationFrame(() => {
    const anchor = document.getElementById('list-anchor')

    if (anchor) {
      // 偏移量计算
      const root = document.documentElement
      const cssValue = getComputedStyle(root).getPropertyValue('--header-height').trim()
      const headerOffset = parseInt(cssValue, 10) || 0
      const elementPosition = anchor.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition - 15,
        behavior: 'smooth' // 建议用 auto (瞬间)，配合骨架屏体验更好；smooth 可能会有视觉上的拉扯
      })
    }
  })
}

watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      // 简单的防抖，确保不是同一个页面（虽然 fullPath 变了通常就是变了）
      if (newPath !== oldPath) {
        // 必须加 nextTick，因为路由变了，Nuxt 还需要一点点时间去卸载旧组件/挂载新组件
        nextTick(() => {
          executeScroll()
        })
      }
    }
)
</script>

<style scoped lang="scss">

</style>