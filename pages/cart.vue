<template>
  <div class="container">
    <h1 class="text-40 f-bold-500 py-lg-50 py-30">Checkout</h1>
    <div class="cart-container acea-row row-between row-top" v-show="canCarts.length > 0">
      <div class="review-container pr-md-30">

        <!-- 产品视图 -->
        <div class="review-list">
          <div class="review-item acea-row gap-base" v-for="(item, index) in canCarts" :key="index">
            <div class="p-img">
              <div class="aspect-ratio p-10 border-sm border-gray-200">
                <img class="w-full h-full fit-contain" :src="imagePrefix(item.img)" alt="">
              </div>
            </div>
            <div class="p-cont flex-1">
              <div class="acea-row row-between-wrapper gap-base mb-10">
                <p class="text-16 f-bold-500 flex-1">{{ item.title }}</p>
                <span class="iconfont icon-close text-20 cursor-pointer" @click="removeCart(index)"></span>
              </div>
              <p class="text-14 text-gray-500 mt-4" v-for="(v, k) in item.specs">{{ k }}: {{ v }}</p>
              <div class="acea-row row-between-wrapper mt-10">
                <el-input-number
                  class="review-number"
                  v-model="item.quantity"
                  :min="1"
                  :max="Number(item.retailStock) > 999 ? 999 : Number(item.retailStock)"
                  @change="quantityChange"
                />
                <p class="text-14 f-bold">{{ currencyStore.formatToCurrency(Number(item.retailPrice) * Number(item.quantity)) }}</p>
              </div>
              <div class="mt-10 text-right text-secondary f-bold">
                <p v-for="(promo, promoIndex) in item.promoOffer" :key="promoIndex">{{  promo  }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-summary shadow-lg p-xl-20 p-15">
        <div class="acea-row row-between-wrapper text-16 f-bold pb-20 mb-20 border-b-sm border-gray-200">
          <span>Subtotal</span>
          <span>{{ currencyStore.formatToCurrency(cartStore.subtotal) }}</span>
        </div>
        <p class="text-16 text-gray-600 mb-8">Enter Discount Code</p>
        <el-form :model="form" ref="formRef" :rules="rules" :auto-complete="false">
          <el-form-item prop="discountCode">
            <el-input v-model="form.discountCode" placeholder="Enter your discount code" size="large" :disabled="isDiscount">
              <template #append>
                <el-button size="large" @click="applyCode">Apply</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="acea-row row-right row-center text-error mb-10" v-if="isDiscount">
          <span class="text-14">not using discounts <span class="iconfont icon-close text-14 cursor-pointer" @click="delCode" /></span>
        </div>
        <div class="text-16">
          Promo codes cannot be combined with sitewide promos or markdown items.
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Estimated Shipping</span>
          <span>{{ currencyStore.formatToCurrency(offerData.estimatedDeliveryAmount || 0)  }}</span>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Discount Amount</span>
          <span>{{ currencyStore.formatToCurrency(Number(offerData?.discountAmount || 0)) }}</span>
        </div>
        <div class="acea-row row-between-wrapper text-16 f-bold pt-20 my-20 border-t-sm border-gray-200">
          <span>Estimated Total</span>
          <div>
            <!-- 优惠之前的金额（需要加上预计运费） -->
            <p v-if="offerData?.discountAmount > 0" class="text-through text-gray-600">{{ currencyStore.formatToCurrency(Number(offerData.originalAmount || 0) + Number(offerData.estimatedDeliveryAmount || 0)) }}</p>
            <!-- 实付金额 -->
            <p>{{ currencyStore.formatToCurrency(Number(offerData.estimatedAmount || 0) || cartStore.subtotal) }}</p>
          </div>
        </div>
        <div id="paypal-button-container" class="paypal-button-container"></div>
        <div class="mt-15 text-16">
          The estimated shipping will be confirmed once you added your shipping address in checkout.
        </div>
        <div class="mt-15 acea-row row-middle">
          <span class="mr-5 text-16">Promotion Rules</span>
          <el-tooltip :content="PromotionRuleText" placement="top" popper-style="max-width: 345px;">
            <span class="iconfont icon-info-fill text-30"></span>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="text-center py-60" v-show="canCarts.length === 0">
      <span class="iconfont icon-shopping-bag text-50"></span>
      <p class="text-20 f-bold mt-20">Your Cart is Empty.</p>
      <p class="text-14 my-20">Please add products to your cart to checkout.</p>
      <el-button size="large" type="primary" @click="router.push(PRODUCT_URL)">
        Start Shopping
      </el-button>
    </div>
  </div>
  <PaySuccessPopup :trade-no="tradeNo" ref="paySuccessPopupRef"/>
  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import type {OnApproveActions, OnApproveData} from "@paypal/paypal-js/types/components/buttons";
import {debounce, imagePrefix} from "~/utils";
import {useCartStore} from "~/stores/modules/cart";
import {useUserStore} from '~/stores/modules/user'
import PaySuccessPopup from "~/components/PaySuccessPopup.vue";
import LoginWindow from "~/components/LoginWindow.vue";
import {type ElForm, ElMessage} from "element-plus";
import type {IShopping} from "~/api/interface/shopping/shopping";
import {confirmOrderApi, createOrderApi} from "~/api/modules/shopping/shopping";
import {paymentApi, paymentCallbackApi} from "~/api/modules/pay/pay";
import {PRODUCT_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import { initPaypal } from '~/composables/usePayment'
import {isEqual} from "lodash-es";

defineOptions({
  name: 'Cart'
})

onMounted(() => {
  if (canCarts.value.length > 0) {
    loadPaypal()
    _init()
  }
  $bus.emit('closeCartWindow')
  $bus.on('loginSuccess', _init)
})

onUnmounted(() => {
  $bus.off('loginSuccess', _init)
})

const _init = async () => {
  await confirmOrder()
}

const {$bus} = useNuxtApp()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore();
const currencyStore = useCurrencyStore();

const PromotionRuleText = '*Promotion applies to order total before shipping, taxes, and duties. Promotions that involve a price reduction may take a variety of forms, including strikethrough prices or a discount code (e.g., percent-off or dollar-off discount code) that is applied by the customer at checkout (collectively “Product Discounts”). Promotional offers may be used one time only per household. Only one discount or promotional offer may be used per item. “Bonus Discounts” that are automatically applied to your order total may not be combined with one-time use discount codes or gift codes. Discounts will not be applied to previous or existing orders, We offer fair shipping rates based on the size and quantity of the items in an order. Final shipping charges will be calculated during checkout.'

const form = reactive({
  discountCode: ''
})
const rules = reactive({
  discountCode: [
    {required: true, message: 'Please enter the discount code', trigger: []},
  ]
})
const canCarts = computed(() => cartStore.canCarts)

// 加载 PayPal SDK
const loadPaypal = async () => {
  const config = useRuntimeConfig()
  initPaypal({
    containerId: '#paypal-button-container',
    clientId: config.public.paypalClientId,
    currency: currencyStore.currentCurrency,
    createOrder: createOrderCallback,
    onApprove: onApproveCallback,
  })
}

const remarks = ref({})

// 确认订单
const shoppingCartData = ref<IShopping.ShoppingCartsRow[]>([])
const offerData = ref({} as IShopping.OfferRow)
const confirmOrder = async () => {
  // 初始化商品列表
  shoppingCartData.value = canCarts.value.map((item) => ({
    shopId: item.shopId,
    techniqueId: item.techniqueId,
    productId: item.productId,
    specsId: item.specsId,
    dimensionId: item.dimensionId,
    parts: item.parts,
    quantity: item.quantity,
    retailPrice: item.retailPrice,
    redeemPoints: item.redeemPoints,
  })) as IShopping.ShoppingCartsRow[]

  const params: IShopping.OfferQuery = {
    shoppingCarts: shoppingCartData.value,
    couponCode: isDiscount.value ? form.discountCode : null,
  }

  try {
    const {data} = await confirmOrderApi(params)
    const products = data?.detail[0]?.products || []
    offerData.value = data

    // 匹配优惠
    // if (products.length > 0) {
    //   cartStore.carts.forEach(item1 => {
    //
    //     item1.promoOffer = []
    //
    //     for (const item2 of products) {
    //       if (
    //         item1.specsId === item2.specsId &&
    //         item1.dimensionId === item2.dimensionId &&
    //         isEqual(item1.parts, item2.parts)
    //       ) {
    //         item1.promoOffer = item2.promoOffer || []
    //       }
    //     }
    //   });
    // }

    // 匹配优惠
    if (products.length > 0) {
      // 创建产品映射表，以唯一标识为键
      const productMap = new Map();

      // 构建映射表 O(m)
      products.forEach(item => {
        const key = `${item.specsId}_${item.dimensionId}_${JSON.stringify(item.parts)}`;
        productMap.set(key, item.promoOffer || []);
      });

      // 查找匹配项 O(n)
      cartStore.carts.forEach(item => {
        const key = `${item.specsId}_${item.dimensionId}_${JSON.stringify(item.parts)}`;
        item.promoOffer = productMap.get(key) || [];
      });
    }

  } catch (err) {
    setTimeout(() => {
      form.discountCode = ''
      isDiscount.value = false
    }, 1000)
  }
}

// 数量变化
const quantityChange = debounce(() => {
  confirmOrder()
})

const paySuccessPopupRef = ref<InstanceType<typeof PaySuccessPopup>>()

// 创建订单唤起支付回调
const tradeNo = ref('')
const createOrderCallback = async () => {
  try {
    const params = {
      actualAmount: String(Number(offerData.value?.originalAmount || 0) - Number(offerData.value?.discountAmount || 0)),
      spentPoints: offerData.value.spentPoints,
      shoppingCarts: shoppingCartData.value,
      remarks: remarks.value,
    } as  IShopping.CreateQuery

    if (isDiscount.value) {
      params['couponCode'] = form.discountCode
    }

    const {data: orderData} = await createOrderApi(params)

    tradeNo.value = orderData[0]!.tradeNo

    const {data: paymentData} = await paymentApi({
      payChannelStr: 'paypal_checkout', // 支付方式
      tradeNo: tradeNo.value,
      orderType: '0',
    })

    if (paymentData) {
      return paymentData;
    } else {
      throw new Error("Payment failed");
    }
  } catch (error) {
    throw error;
  }
}

// 支付成功回调
const onApproveCallback = async (data: OnApproveData, actions: OnApproveActions) => {
  try {
    const {data: orderData} = await paymentCallbackApi({orderId: data.orderID})

    const transaction =
      orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
      orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
    const errorDetail = orderData?.details?.[0];

    if (errorDetail?.issue === "INSTRUMENT_DECLINED" && actions) {
      return actions.restart();
    } else if (
      errorDetail ||
      !transaction ||
      transaction.status === "DECLINED"
    ) {
      let errorMessage;
      if (transaction) {
        errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
      } else if (errorDetail) {
        errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
      } else {
        errorMessage = JSON.stringify(orderData);
      }
      throw new Error(errorMessage);
    } else {
      cartStore.clear()
      paySuccessPopupRef.value?.show()
    }

  } catch (error) {
    console.error(error);
  }
}

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

const removeCart = (index: number) => {
  cartStore.remove(index)
  if (canCarts.value.length > 0) confirmOrder()
}

// 应用优惠券
const isDiscount = ref(false)
const formRef = ref<InstanceType<typeof ElForm>>()
const applyCode = () => {
  if (!userStore.isLogin) {
    ElMessage({
      message: 'You can only apply coupons after logging in!',
      type: 'warning',
      duration: 2000,
      showClose: true,
      onClose: () => {
        showLoginWindow()
      }
    })
    return
  }

  formRef.value!.validate(async valid => {
    if (!valid) return;
    isDiscount.value = true
    try {
      await confirmOrder()
    } catch (e) {
      isDiscount.value = false
    }
  });
}
const delCode = () => {
  form.discountCode = ''
  isDiscount.value = false
  confirmOrder()
}
</script>

<style scoped lang="scss">
.cart-container {
  position: relative;

  .review-container {
    width: 70.40%;

    .review-list {
      .review-item {
        margin-bottom: var(--gutter-base);

        .p-img {
          width: 17%;
          min-width: 100px;
          flex-shrink: 0;
        }
      }
    }

    .address-list {
      .address-item {
        min-height: 188px;
      }
    }
  }

  .review-summary {
    width: 29.60%;
    position: sticky;
    top: 150px;
  }
}

.review-number {
  width: 110px;
}

@media (max-width: 991px) {
  .cart-container {
    .review-container {
      width: 100%;
    }

    .review-summary {
      width: 100%;
      margin-top: 15px;
      position: static;
    }
  }
}

@media (max-width: 768px) {
  .cart-container .review-container .address-list .address-item {
    min-height: 40px;
  }
}

</style>