<template>
  <div>
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount} from "vue";
import {useAppStore} from "~/stores/modules/app";
import {throttle} from "lodash";

const WIDTH = 767
const appStore = useAppStore()

// 只在客户端运行这段逻辑
if (import.meta.client) {
  const isMobile = () => {
    // 使用更直接的窗口宽度，减少对 DOM 的依赖
    const w = window.innerWidth || document.documentElement.clientWidth
    return w < WIDTH
  }

  const applyDevice = () => {
    appStore.toggleDevice(isMobile() ? 'app' : 'pc')
  }

  const onResize = throttle(() => {
    if (!document.hidden) applyDevice()
  }, 150)

  onMounted(() => {
    applyDevice() // 首次设置一次，避免仅在 mobile 分支设置
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
}
</script>

<style scoped lang="scss">

</style>