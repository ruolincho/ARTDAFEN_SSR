<template>
  <a
    :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('One-on-One Consultation')}`"
    class="chat-wrapper acea-row row-center-wrapper"
    :style="{ right: right + 'px', bottom: bottom + 'px' }"
  >
    <span class="iconfont icon-message text-28"></span>
    <span class="text-24 f-bold-600 text">Chat</span>
  </a>
</template>

<script setup lang="ts">

// 定义 Props
import {CONTACT_EMAIL} from "../config";

interface Props {
  right?: number;
  bottom?: number;
}

const props = withDefaults(defineProps<Props>(), {
  right: 50,
  bottom: 50
});

</script>


<style scoped lang="scss">
.chat-wrapper {
  position: fixed;
  z-index: 10;
  background: var(--color-primary);
  color: #fff;
  width: auto;
  height: 70px;
  padding: 0 12px 0 20px;
  border-radius: 16px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .15);
  column-gap: var(--gutter-base);

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0;

    .text {
      display: none;
    }
  }
}
</style>