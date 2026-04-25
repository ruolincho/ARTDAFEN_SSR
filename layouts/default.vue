<template>
  <div>
    <AppHeader />
    <main class="main">
      <AppBreadcrumb />
      <slot />
    </main>
    <AppFooter />
    <AppPendant/>
    <DiscountWindow v-if="showDiscountWindow" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount} from "vue";
import {useAppStore} from "~/stores/modules/app";
import {throttle} from "lodash";
import { useRequestHeaders } from 'nuxt/app'
import AppHeader from '~/components/AppHeader/index.vue'
import AppFooter from '~/components/AppFooter/index.vue'

const WIDTH = 768
const appStore = useAppStore()
const route = useRoute()

// SSR 阶段识别
if (import.meta.server) {
  const headers = useRequestHeaders(['user-agent'])
  const ua = headers['user-agent'] || ''
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile|Huawei|MiuiBrowser|UCBrowser/i.test(ua)
  appStore.toggleDevice(isMobileUA ? 'app' : 'pc') // SSR 阶段提前设置一次，确保首次渲染正确
}

// 客户端阶段（动态判断宽度）
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
    applyDevice() // 客户端启动时以宽度为主重新判断（防止 SSR 判断错误
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
}

const showDiscountWindow = computed(() => {
  return route.meta.isShowActivity === true
})
</script>

<style scoped lang="scss">
.main {
  border-top: 1px solid rgba(26, 26, 26, 0.12);
}
</style>