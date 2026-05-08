<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    width="500px"
    :show-close="false"
  >
    <div class="success-icon-wrapper acea-row row-center-wrapper py- 42">
      <div class="success-icon rounded-full bg-primary acea-row row-center-wrapper">
        <SvgIcon name="shopping" class="text-30 text-white" />
      </div>
      <div class="ripple ripple-inner"></div>
      <div class="ripple ripple-outer"></div>
    </div>
    <p class="text-20 f-bold text-center my-20">Your order is confirmed</p>
    <p class="text-14 text-center">
      Thanks for shopping! your order hasn't shipped yet,but we will send you and email when it done.
    </p>
    <template #footer>
      <div class="mb-16">
        <el-button class="w-full" type="primary" @click="router.replace(`/order-detail/${tradeNo}`)" size="large">View Order</el-button>
      </div>
      <div>
        <el-button class="w-full" @click="router.replace(HOME_URL)" size="large">Back to Home</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {HOME_URL} from "~/config";

defineOptions({
  name: 'PaySuccessPopup'
})

interface Props {
  tradeNo: string // 交易编号
}

const props = withDefaults(defineProps<Props>(), {
  tradeNo: ''
});

const router = useRouter();

const visible = ref(false)

const show = () => {
  visible.value = true
}

defineExpose({
  show
})
</script>

<style scoped lang="scss">
.success-icon-wrapper {
  position: relative;

  .success-icon {
    position: relative;
    z-index: 2;
    width: 64px;
    height: 64px;
  }

  .ripple {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation: ripple-animation 2s infinite ease-out;
  }

  .ripple-inner {
    width: 88px;
    height: 88px;
    animation-delay: 0s;
    background: var(--color-gray-300);
  }

  .ripple-outer {
    width: 108px;
    height: 108px;
    animation-delay: 1s; /* 调整延迟为1秒，让节奏更自然 */
    background: var(--color-gray-200);
  }
}

/* 涟漪动画 */
@keyframes ripple-animation {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.6); /* 从更小开始 */
  }
  20% {
    opacity: 0.7; /* 快速达到可见状态 */
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1);
  }
}
</style>