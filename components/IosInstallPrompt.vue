<template>
  <template v-if="isClient && isEligible">

    <slot :handle-install="handleInstall">
      <button
          class="artdafen-install-btn"
          @click="handleInstall"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round" class="btn-icon">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Install App
      </button>
    </slot>

    <Transition name="slide-up">
      <div v-if="showPrompt" class="ios-install-prompt">
        <div class="prompt-header">
          <span class="title">Install ARTDAFEN</span>
          <button class="close-btn" @click="closePrompt" aria-label="Close">×</button>
        </div>

        <div class="prompt-body">
          <p>Install our app for a better, faster, and full-screen experience. Just two steps:</p>
          <ol>
            <li>
              Tap the
              <svg class="icon share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              <strong>Share</strong> button below.
            </li>
            <li>
              Scroll down and select
              <svg class="icon add-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <strong>Add to Home Screen</strong>.
            </li>
          </ol>
        </div>
        <div class="arrow-down"></div>
      </div>
    </Transition>
  </template>
</template>

<script setup>
const isClient = ref(false)
const showPrompt = ref(false)
const isEligible = ref(false) // 只有 iOS Safari 并且非 PWA 模式才会设为 true

onMounted(() => {
  isClient.value = true

  // 1. 检查是否已经在独立应用模式 (Standalone)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
  if (isStandalone) {
    return
  }

  // 2. 检查是否是 iOS Safari 环境
  const ua = window.navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream
  const isSafari = isIOS && /WebKit/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua)

  // 只有满足条件，才将整个组件（按钮）渲染出来
  if (isSafari) {
    isEligible.value = true
  }
})

// 暴露给外部调用的触发方法（名称与安卓组件统一）
const handleInstall = () => {
  showPrompt.value = true
}

const closePrompt = () => {
  showPrompt.value = false
}

// 暴露给父级组件的 ref 调用
defineExpose({
  handleInstall,
  closePrompt
})
</script>

<style scoped>
  /* ===== 默认按钮样式（与安卓版本完全一致） ===== */
  .artdafen-install-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: #1a1a1a;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .artdafen-install-btn:hover {
    background-color: #333333;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  /* ===== IOS 操作指引弹窗样式 ===== */
  .ios-install-prompt {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    padding: 16px;
    z-index: 9999;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .prompt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .title {
    font-weight: 600;
    font-size: 16px;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
  }

  .prompt-body p {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }

  .prompt-body ol {
    margin: 0;
    padding-left: 24px;
    font-size: 14px;
    line-height: 1.6;
  }

  .prompt-body li {
    margin-bottom: 8px;
  }

  .icon {
    width: 18px;
    height: 18px;
    vertical-align: text-bottom;
    margin: 0 4px;
  }
  .share-icon { color: #007aff; }
  .add-icon { color: #333; }

  .arrow-down {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid rgba(255, 255, 255, 0.95);
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translate(-50%, 120%);
    opacity: 0;
  }

  /* 如果应用已经是独立模式，隐藏整个组件 */
  @media all and (display-mode: standalone) {
    .install-btn-wrapper {
      display: none !important;
    }
  }
</style>