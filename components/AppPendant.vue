<template>
  <div class="customer-widget">
    <a
      :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('One-on-One Consultation')}`"
      class="widget-btn"
    >
      <span class="iconfont icon-message "></span>
    </a>

    <a v-if="showBackTop" class="widget-btn" @click="scrollToTop" href="javascript:void(0)">
      <span class="iconfont icon-top "></span>
    </a>

  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {CONTACT_EMAIL} from '../config';

const showBackTop = ref(false)

const handleScroll = () => {
  // 滚动超过 300px 才显示回到顶部
  showBackTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.customer-widget {
  position: fixed;
  right: 16px;
  bottom: 80px;
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
