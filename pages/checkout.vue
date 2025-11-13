<template>
  <div class="checkout-container">
    <!-- 正常加载状态 -->
    <div class="loading-content" v-if="hasId">
      <div class="loading-animate">
        <div class="circle"></div>
        <img class="logo" src="~/assets/images/logo.png" alt="logo">
      </div>
      <p class="text-20 mt-24 text-gray-600">Processing, please wait...</p>
    </div>
    <!-- 缺少offerId的错误状态 -->
    <div v-else class="error-content">
      <div class="error-icon">
        <span class="iconfont icon-error-fill"></span>
      </div>
      <p class="text-20 mt-25 text-gray-600">Missing parameter</p>
      <el-button
        plain
        size="large"
        class="mt-25"
        @click="backHome"
      >
        Back to Home
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {HOME_URL} from "~/config";
import {checkoutLinkApi} from "~/api/modules/product/product";
import type {IShopping} from "~/api/interface/shopping/shopping";
import {useCartStore} from '~/stores/modules/cart'
import {ElMessage} from "element-plus";

definePageMeta({
  layout: 'blank',
})

const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()
const hasId = ref(true)
const currentOfferId = ref('')

onMounted(() => {
  if (route.query.offerId) {
    hasId.value = true
    currentOfferId.value = route.query.offerId as string
    _init()
  } else {
    hasId.value = false
  }
})

const _init = async () => {
  const { data } = await checkoutLinkApi({ offerId: currentOfferId.value })

  if (!data) {
    ElMessage({
      type: 'error',
      message: 'invalid specification number!',
      duration: 1000,
      onClose: () => {
        backHome()
      }
    })
    return
  }

  const goodsDetail = data.product
  const specs = data.specs
  const currentSizeId = data.dimensionId

  const cartRow: IShopping.ShoppingCartsStorageRow = {
    productId: goodsDetail.id, // 商品ID
    techniqueId: goodsDetail.techniqueId, // 工艺编号
    title: goodsDetail.title, // 商品标题
    deliveryType: '0', // 配送方式
    retailPrice: specs.retailPrice, // 商品售价
    redeemPoints: specs.redeemPoints, // 商品积分
    img: specs.img.split('?')[0] || '', // 商品图片
    shopId: goodsDetail.merchant?.id || '', // 商家编号
    specsId: specs.id, // 商品规格编号
    specs: specs.specs, // 商品规格值
    quantity: 1, // 购买数量
    dimensionId: currentSizeId, // 尺寸编号
    parts: {}
  }

  cartStore.addition(cartRow)
  router.push('/cart')
}

const backHome = () => {
  router.push(HOME_URL)
}

</script>

<style scoped lang="scss">
.checkout-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;

  .loading-content {
    text-align: center;

    .loading-animate {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto;

      .circle {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 4px solid transparent;
        border-radius: 50%;
        border-top-color: var(--color-primary);
        animation: rotate 1s linear infinite;
      }

      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-content {
  text-align: center;

  .error-icon {
    color: var(--color-error);
    width: 80px;
    height: 80px;
    animation: pulse 2s infinite;
    margin: auto;

    span {
      font-size: 80px;
    }
  }

  p {
    font-size: 20px;
    margin-top: 24px;
    color: #666;
    font-weight: 500;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
</style>