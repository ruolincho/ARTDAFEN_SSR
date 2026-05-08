<template>
  <Transition name="toast-slide-up">
    <div v-if="isClient && $pwa?.needRefresh" class="artdafen-pwa-toast">

      <div class="toast-content">
        <div class="icon-wrapper">
          <SvgIcon name="refresh" />
        </div>

        <div class="text-content">
          <span class="title">Update Available</span>
          <span class="desc">A new version of ARTDAFEN is ready.</span>
        </div>
      </div>

      <div class="toast-actions">
        <button class="update-btn" @click="$pwa.updateServiceWorker()">
          Refresh
        </button>
        <button class="close-btn" @click="$pwa.cancelPrompt()" aria-label="Dismiss">
          <SvgIcon name="close" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const $pwa = nuxtApp.$pwa
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
</script>

<style scoped>
  /* 悬浮在屏幕底部的 Toast 容器 */
  .artdafen-pwa-toast {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 32px);
    max-width: 420px;
    padding: 12px 16px;

    /* 现代化的暗色毛玻璃风格 */
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #fff;
  }

  /* 左侧内容区：图标 + 文字 */
  .toast-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #fff;
  }

  .text-content {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
  }

  .desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 2px;
  }

  /* 右侧操作区：按钮 */
  .toast-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .update-btn {
    background: #ffffff;
    color: #1a1a1a;
    border: none;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s ease, background 0.2s ease;
  }

  .update-btn:active {
    transform: scale(0.96);
  }

  .update-btn:hover {
    background: #f0f0f0;
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .close-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  /* 流畅的滑入滑出动画 */
  .toast-slide-up-enter-active,
  .toast-slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .toast-slide-up-enter-from,
  .toast-slide-up-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px) scale(0.95);
  }
</style>