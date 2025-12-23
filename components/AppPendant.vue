<template>
  <div class="customer-widget">
<!--    <a-->
<!--      :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('One-on-One Consultation')}`"-->
<!--      class="widget-btn"-->
<!--    >-->
<!--      <span class="iconfont icon-message "></span>-->
<!--    </a>-->
    <a v-if="showBackTop" class="widget-btn" @click="scrollToTop" href="javascript:void(0)">
      <span class="iconfont icon-top "></span>
    </a>

  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'

const showBackTop = ref(false)

if (import.meta.client) {
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}

const handleScroll = () => {
  if (process.server) return
  // 滚动超过 300px 才显示回到顶部
  showBackTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  if (process.server) return
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped lang="scss">
.customer-widget {
  position: fixed;
  right: 35px;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 110;

  .widget-btn {
    width: 40px;
    height: 40px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: #333;
    }
  }
}
</style>
