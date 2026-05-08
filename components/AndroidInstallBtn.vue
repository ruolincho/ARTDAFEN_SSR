<template>
  <template v-if="isClient && deferredPrompt && !isStandalone">
    <slot :handle-install="handleInstall">
      <button
          class="artdafen-install-btn"
          @click="handleInstall"
      >
        <SvgIcon name="xiazai" />
        Install App
      </button>
    </slot>
  </template>
</template>

<script setup>
const isClient = ref(false)

// 用于保存浏览器拦截下来的安装事件
const deferredPrompt = ref(null)

// 判断当前是否已经在 PWA 环境中
const isStandalone = ref(false)

// 检查是否已经在独立应用模式
const checkDisplayMode = () => {
  isStandalone.value = window.matchMedia('(display-mode: standalone)').matches
}

const captureInstallPrompt = (e) => {
  // 1. 阻止浏览器默认的底部横幅自动弹出
  e.preventDefault()
  // 2. 将这个事件保存下来，留给我们的自定义按钮用
  deferredPrompt.value = e
}

const handleAppInstalled = () => {
  console.log('PWA installed successfully')
  isStandalone.value = true
  deferredPrompt.value = null
}

onMounted(() => {
  isClient.value = true
  // 挂载时检查当前是否已经是 PWA 模式
  checkDisplayMode()
  // 监听安卓/PC 浏览器的安装提示事件
  window.addEventListener('beforeinstallprompt', captureInstallPrompt)
  // 监听安装成功事件
  window.addEventListener('appinstalled', handleAppInstalled)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', captureInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})

const handleInstall = async () => {
  if (!deferredPrompt.value) return

  // 3. 触发我们保存下来的安装事件，唤起系统原生安装弹窗
  deferredPrompt.value.prompt()

  // 4. 等待用户操作（点击了安装，还是点击了取消）
  const {outcome} = await deferredPrompt.value.userChoice

  if (outcome === 'accepted') {
    console.log('User accepted the install prompt')
  } else {
    console.log('User dismissed the install prompt')
  }

  // 5. 无论结果如何，这个 prompt 只能用一次，用完就清空
  deferredPrompt.value = null
}

// 通过 defineExpose 暴露给父组件（允许父组件通过 ref 直接调用）
defineExpose({
  handleInstall,
  isReady: computed(() => !!deferredPrompt.value && !isStandalone.value)
})
</script>

<style scoped>
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

  .artdafen-install-btn .iconify {
    font-size: 16px;
  }
</style>