<template>
  <div class="relative">
    <!-- 缩略图（点击展开） -->
    <img
      ref="thumbRef"
      :src="thumbnailSrc"
      class="thumbnail"
      @click="openViewer"
      alt="thumbnail"
      :style="{ cursor: props.dziUrl ? 'zoom-in' : 'default' }"
    />

    <!-- OpenSeadragon 容器 -->
    <transition name="preview-zoom">
      <div
        v-if="showPreview"
        ref="previewRef"
        class="preview-container"
        :style="previewStyle"
      >
        <div class="close-btn" @click="closeViewer">
          <span class="iconfont icon-error-fill text-30"></span>
        </div>
        <div ref="osdRef" class="osd-container"></div>
      </div>
    </transition>

    <div class="preview-btn" v-if="dziUrl" @click="openViewer">
      <span class="iconfont icon-zoom-in" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OpenSeadragon from 'openseadragon'
import type {HighResViewerType} from "~/components/interface";

const props = withDefaults(defineProps<HighResViewerType>(), {
  showNavigator: true,
  navigatorBorderColor: 'transparent',
  constrainDuringPan: true,
  maxZoomPixelRatio: 2,
  visibilityRatio: 1
})

const thumbRef = ref<HTMLImageElement | null>(null)
const previewRef = ref<HTMLDivElement | null>(null)
const osdRef = ref<HTMLDivElement | null>(null)

const showPreview = ref(false)
const viewer = ref<OpenSeadragon.Viewer | null>(null)

const previewStyle = reactive({
  width: '0px',
  height: '0px',
  top: '0px',
  left: '0px',
  opacity: '0',
})

const initOSD = () => {
  if (!osdRef.value) return
  viewer.value = OpenSeadragon({
    element: osdRef.value!,
    showNavigationControl: false,
    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
    tileSources: props.dziUrl,
    showNavigator: props.showNavigator,
    navigatorPosition: 'ABSOLUTE',
    navigatorTop: "15%",
    navigatorLeft: "75%",
    navigatorBorderColor: props.navigatorBorderColor,
    navigatorDisplayRegionColor: 'white',
    navigatorHeight: "100px", // 或设置为百分比，例如 "20%"
    navigatorWidth: "120px",
    constrainDuringPan: props.constrainDuringPan,
    maxZoomPixelRatio: props.maxZoomPixelRatio,
    visibilityRatio: props.visibilityRatio,
    defaultZoomLevel: 0,
    minZoomLevel: 0,
    maxZoomLevel: 10,
    showZoomControl: true,
    showHomeControl: true,
    showFullPageControl: true,
    animationTime: 0.6,
    blendTime: 0.1,
    gestureSettingsMouse: {
      clickToZoom: true,
      dblClickToZoom: true,
      flickEnabled: true,
      pinchToZoom: true,
      scrollToZoom: true
    }
  })
}

const openViewer = async () => {
  if (!props.dziUrl) return
  const thumbEl = thumbRef.value
  if (!thumbEl) return

  const rect = thumbEl.getBoundingClientRect()
  const w = rect.width
  const h = rect.height

  // 从缩略图的大小中间开始展开
  const centerX = window.innerWidth / 2 - w / 2
  const centerY = window.innerHeight / 2 - h / 2

  Object.assign(previewStyle, {
    width: `${w}px`,
    height: `${h}px`,
    top: `${centerY}px`,
    left: `${centerX}px`,
    opacity: '1',
  })


  showPreview.value = true

  // 等待DOM挂载后再进行动画
  await nextTick()

  // 禁用滚动条
  document.body.style.overflow = 'hidden'

  requestAnimationFrame(() => {
    Object.assign(previewStyle, {
      width: '100vw',
      height: '100vh',
      top: '0',
      left: '0',
      opacity: '1',
    })
  })
  // 初始化 OSD
  initOSD()
}

function closeViewer() {
  const thumbEl = thumbRef.value
  if (!thumbEl) return

  const rect = thumbEl.getBoundingClientRect()
  const w = rect.width
  const h = rect.height
  const centerX = window.innerWidth / 2 - w / 2
  const centerY = window.innerHeight / 2 - h / 2

  // 收缩动画
  Object.assign(previewStyle, {
    width: `${w}px`,
    height: `${h}px`,
    top: `${centerY}px`,
    left: `${centerX}px`,
    opacity: '0',
  })

  // 延迟卸载组件和销毁 viewer
  setTimeout(() => {
    showPreview.value = false
    viewer.value?.destroy()
    viewer.value = null
    document.body.style.overflow = ''
  }, 300)
}

const destroyOSD = () => {
  if (viewer.value) {
    viewer.value.destroy()
    viewer.value = null
  }
}

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeViewer()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
  destroyOSD()
  document.body.style.overflow = ''
})
</script>

<style scoped>
.thumbnail {
  max-width: 100%;
  max-height: 100%;
}

.preview-container {
  position: fixed;
  background: #fff;
  z-index: 9999;
  overflow: hidden;
  transition: all 0.3s ease;
}

.osd-container {
  width: 100%;
  height: 100%;
}

.close-btn {
  position: absolute;
  top: 5%;
  right: 3%;
  z-index: 10000;
  cursor: pointer;
}

.preview-btn {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  right: 50px;
  bottom: -24px;

  .iconfont {
    font-size: 24px;
  }

}

/* 动画（渐变缩放） */
.preview-zoom-enter-from,
.preview-zoom-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.preview-zoom-enter-to,
.preview-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

.preview-zoom-enter-active,
.preview-zoom-leave-active {
  transition: all 0.3s ease;
}
</style>
