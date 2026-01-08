<template>
  <div class="container">
    <h1 class="text-40 f-bold-500 py-lg-50 py-30">Checkout</h1>
    <div class="cart-container acea-row row-between row-top" v-show="canCarts.length > 0">
      <div class="review-container pr-md-30">

        <!-- 产品视图 -->
        <div class="review-list">
          <div class="review-item acea-row gap-base" v-for="(item, index) in canCarts" :key="index">
            <div class="p-img">
              <div class="acea-row nowrap row-middle gap-base">
                <el-checkbox v-model="item.selected" size="large" @change="changeCheck"/>
                <div class="aspect-ratio p-10 border-sm border-gray-200 cursor-pointer" @click="jumpToProduct(item)">
                  <img class="w-full h-full fit-contain" :src="imagePrefix(item.img)" :alt="item.title">
                </div>
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
                  :model-value="item.quantity"
                  @update:model-value="(val) => quantityChange(val, item)"
                  :min="1"
                  :max="Number(item.retailStock) > 999 ? 999 : Number(item.retailStock)"
                  :value-on-clear="1"
                />
                <p>
                  <span class="shimmer-text" v-if="item.isPriceStale">Calculating...</span>
                  <template v-else>
                    <span class="text-14 f-bold">
                    {{ currencyStore.formatToCurrency(item.discountAmount === 0 ? getItemTotal(item) : getItemDisCountTotal(item)) }}
                  </span>
                    <span v-if="item.discountAmount !== 0" class="text-gray-400 text-through ml-5 text-12">
                      {{ currencyStore.formatToCurrency(getItemTotal(item)) }}
                    </span>
                  </template>
                </p>
              </div>
              <div class="mt-10 text-right text-secondary f-bold">
                <span>{{ item?.promoOffer?.join(' / ') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-summary shadow-lg p-xl-20 p-15">
        <template v-if="selectedCarts.length > 0">
          <div class="acea-row row-between-wrapper text-16 f-bold pb-20 mb-20 border-b-sm border-gray-200">
            <span>Subtotal</span>
            <span>{{ currencyStore.formatToCurrency(cartStore.checkoutSubtotal) }}</span>
          </div>
          <div class="acea-row row-between-wrapper mb-20">
            <div class="acea-row row-middle">
              <span class="f-bold text-16 mr-5">Phone Number</span>
              <el-tooltip :content="phoneRuleText" placement="top" popper-style="max-width: 345px;">
                <span class="iconfont icon-info-fill text-18"></span>
              </el-tooltip>
            </div>
            <span></span>
          </div>
          <el-input
              ref="phoneInputRef"
              class="mb-20"
              v-model="phone"
              placeholder="Enter your phone number"
              size="large"
              maxlength="20"
              @input="checkPhone"
          />
          <div class="acea-row row-between-wrapper mb-20">
            <div class="acea-row row-middle">
              <span class="f-bold text-16 mr-5">Apply Discount Code</span>
              <el-tooltip :content="discountRuleText" placement="top" popper-style="max-width: 345px;">
                <span class="iconfont icon-info-fill text-18"></span>
              </el-tooltip>
            </div>
            <span class="iconfont text-24 cursor-pointer" :class="[showDiscountInput ? 'icon-reduce' : 'icon-add']"
                  @click="showDiscountInput = !showDiscountInput"/>
          </div>
          <div v-show="showDiscountInput">
            <el-input
                v-model="discountCode"
                placeholder="Enter your discount code"
                size="large"
                :disabled="isDiscount"
                @keydown.enter="applyCode"
            >
              <template #append>
                <el-button size="large" @click="applyCode">Apply</el-button>
              </template>
            </el-input>
            <div class="acea-row row-right row-center text-error my-20" v-if="isDiscount">
            <span class="text-14">
              not using discounts
              <i class="iconfont icon-close text-14 cursor-pointer" @click="delCode"/>
            </span>
            </div>
          </div>
          <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
            <span>Estimated Shipping</span>
            <span>{{ currencyStore.formatToCurrency(Number(offerData.estimatedDeliveryAmount || 0)) }}</span>
          </div>
          <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
            <span>Discount Amount</span>
            <span>{{ currencyStore.formatToCurrency(Number(offerData?.discountAmount || 0)) }}</span>
          </div>
          <div class="acea-row row-between-wrapper text-16 f-bold pt-20 my-20 border-t-sm border-gray-200">
            <span>Estimated Total</span>
            <div>
              <!-- 优惠之前的金额 -->
              <p v-if="Number(offerData?.discountAmount || 0) > 0" class="text-through text-gray-600">
                {{ currencyStore.formatToCurrency(totalBeforeDiscount) }}
              </p>
              <!-- 付款前的预估金额 -->
              <p>{{ currencyStore.formatToCurrency(prePaymentEstimatedAmount) }}</p>
            </div>
          </div>
          <!-- paypal 按钮 -->
          <div id="paypal-button-container" class="paypal-button-container" v-if="prePaymentEstimatedAmount !== 0"></div>
          <!-- 积分支付 按钮 -->
          <el-button type="primary" class="w-full checkout-btn" @click="createOrderCallback" v-else>Secure Checkout
          </el-button>
          <div class="mt-15 text-16">
            The estimated shipping will be confirmed once you added your shipping address in checkout.
          </div>
          <div class="mt-15 acea-row row-middle">
            <span class="mr-5 text-16">Promotion Rules</span>
            <el-tooltip :content="promotionRuleText" placement="top" popper-style="max-width: 345px;">
              <span class="iconfont icon-info-fill text-18"></span>
            </el-tooltip>
          </div>
        </template>
        <div class="text-center py-60" v-else>
          <span class="iconfont icon-shopping-bag text-50"></span>
          <p class="text-20 f-bold mt-20">No Items Selected</p>
          <p class="text-14 my-20">Please select at least one product in your cart before proceeding to checkout.</p>
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
</template>

<script setup lang="ts">
import {computed, watch, onMounted, onUnmounted, ref} from 'vue'
import type {
  PayPalButtonCreateOrder,
  PayPalButtonOnApprove,
  PayPalButtonOnClick,
  PayPalButtonOnInit
} from "@paypal/paypal-js/types/components/buttons";
import {debounce, imagePrefix, jumpToProduct} from "~/utils";
import {useCartStore} from "~/stores/modules/cart";
import PaySuccessPopup from "~/components/PaySuccessPopup.vue";
import {ElMessage, type ElInput} from "element-plus";
import type {IShopping} from "~/api/interface/shopping/shopping";
import {confirmOrderApi, createOrderApi} from "~/api/modules/shopping/shopping";
import {paymentApi, paymentCallbackApi} from "~/api/modules/pay/pay";
import {PRODUCT_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {initPaypal} from '~/composables/usePayment'
import {phoneReg} from "~/regular";
import Decimal from "decimal.js";
import {checkStatus} from "~/api/helper";

defineOptions({
  name: 'Cart',
  ssr: false
})

definePageMeta({
  auth: false,
  isShowActivity: true
})

useSeoMeta({
  robots: 'noindex, follow'
})

onMounted(() => {
  if (selectedCarts.value.length > 0) {
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
const cartStore = useCartStore();
const currencyStore = useCurrencyStore();

const promotionRuleText = '*Promotion applies to order total before shipping, taxes, and duties. Promotions that involve a price reduction may take a variety of forms, including strikethrough prices or a discount code (e.g., percent-off or dollar-off discount code) that is applied by the customer at checkout (collectively “Product Discounts”). Promotional offers may be used one time only per household. Only one discount or promotional offer may be used per item. “Bonus Discounts” that are automatically applied to your order total may not be combined with one-time use discount codes or gift codes. Discounts will not be applied to previous or existing orders, We offer fair shipping rates based on the size and quantity of the items in an order. Final shipping charges will be calculated during checkout.'
const discountRuleText = 'Promo codes cannot be combined with sitewide promos or markdown items.'
const phoneRuleText = 'For delivery questions.'
const discountCode = ref('')
const showDiscountInput = ref(false)
const phone = ref('')

const canCarts = computed(() => cartStore.canCarts)
const selectedCarts = computed(() => cartStore.selectedCarts)

// 加载 PayPal SDK
const loadPaypal = async () => {
  const config = useRuntimeConfig()
  initPaypal({
    containerId: '#paypal-button-container',
    clientId: config.public.paypalClientId,
    currency: currencyStore.currentCurrency,
    createOrder: createOrderCallback,
    onApprove: onApproveCallback,
    onInit: onPaypalInit,
    onClick: onPaypalClick,
  })
}

const remarks = ref({})

// 确认订单
const shoppingCartData = ref<IShopping.ShoppingCartsRow[]>([])
const offerData = ref({} as IShopping.OfferRow)
const confirmOrder = async () => {
  cartStore.priceCalculated(true) // 开启价格请求状态

  // 初始化商品列表
  shoppingCartData.value = selectedCarts.value.map((item) => ({
    shopId: item.shopId,
    techniqueId: item.techniqueId,
    productId: item.productId,
    specsId: item.specsId,
    dimensionId: item.dimensionId,
    parts: item.parts,
    quantity: item.quantity,
    retailPrice: item.retailPrice,
    redeemPoints: item.redeemPoints,
    // selected: item.selected ?? false
  })) as IShopping.ShoppingCartsRow[]

  const params: IShopping.OfferQuery = {
    shoppingCarts: shoppingCartData.value,
    couponCode: isDiscount.value ? discountCode.value : null,
  }

  try {
    const {data, message, status} = await confirmOrderApi(params)

    // 优惠券无法使用会返回一个空data
    if (!data) {
      checkStatus(status, message)
      setTimeout(() => {
        discountCode.value = ''
        isDiscount.value = false
      }, 500)
      return
    }
    cartStore.clearPromoOffer() // 清除优惠折扣数组
    const products = data?.detail[0]?.products || []
    offerData.value = data
    // 匹配优惠
    if (products.length > 0) {
      // 创建产品映射表，以唯一标识为键
      const productMap = new Map();

      // 构建映射表 O(m)
      products.forEach(item => {
        const key = `${item.specsId}_${item.dimensionId}_${JSON.stringify(item.parts)}`;
        const obj = {
          promoOffer: item.promoOffer,
          discountAmount: item.discountAmount
        }
        productMap.set(key, obj);
      });

      // 查找匹配项 O(n)
      cartStore.carts.forEach(item => {
        const key = `${item.specsId}_${item.dimensionId}_${JSON.stringify(item.parts)}`;
        if (productMap.has(key)) {
          const obj = productMap.get(key)
          item.promoOffer = obj?.promoOffer;
          item.discountAmount = obj?.discountAmount;
        }
      });
    }
  } catch (err) {
    setTimeout(() => {
      discountCode.value = ''
      isDiscount.value = false
    }, 500)
  } finally {
    cartStore.priceCalculated(false) // 关闭价格请求状态
  }
}

// 数量变化
const quantityChange = debounce((newVal, item) => {
  item.quantity = newVal;
  confirmOrder()
})

const phoneInputRef =  ref<InstanceType<typeof ElInput>>()
const paySuccessPopupRef = ref<InstanceType<typeof PaySuccessPopup>>()

// PayPal 初始化回调
let paypalActions: any = null
const onPaypalInit: PayPalButtonOnInit = (data, actions) => {
  paypalActions = actions
  actions.disable() // 默认禁用按钮，直到手机号有效
}

// 点击支付按钮
const onPaypalClick: PayPalButtonOnClick = (data, actions) => {
  return new Promise((resolve, reject) => {
    const isValid = validatePhone(phone.value)
    if (!isValid) {
      paypalActions.disable()
      ElMessage.error('Please enter a valid phone number before paying.')
      phoneInputRef?.value?.focus()
      reject()
    } else {
      paypalActions.enable()
      resolve()
    }
  })
}

// 创建订单唤起支付回调
const tradeNo = ref('')
const createOrderCallback: PayPalButtonCreateOrder = async (data, actions) => {
  try {
    const params = {
      actualAmount: actualPaidAmount.value.toString(),
      spentPoints: offerData.value.spentPoints,
      shoppingCarts: shoppingCartData.value,
      remarks: remarks.value,
      mobile: phone.value,
    } as IShopping.CreateQuery

    if (isDiscount.value) {
      params['couponCode'] = discountCode.value
    }

    const {data: orderData} = await createOrderApi(params)

    if (!orderData?.[0]?.tradeNo) throw new Error("Failed to create order: tradeNo missing");

    tradeNo.value = orderData[0].tradeNo;

    const payChannelStr = prePaymentEstimatedAmount.value === 0 ? 'inner_points' : 'paypal_checkout'  // 支付方式

    const {data: paymentData} = await paymentApi({
      payChannelStr,
      tradeNo: tradeNo.value,
      orderType: '0',
    })

    // 0元支付
    if (payChannelStr === 'inner_points') {
      if (paymentData === 'success') {
        cartStore.clear()
        paySuccessPopupRef.value?.show()
        return Promise.resolve(tradeNo.value); // 返回 tradeNo 保持类型一致
      } else {
        throw new Error("0 amount payment failed");
      }
    }

    // 非0元支付（走 PayPal 支付）
    if (typeof paymentData === "string" && paymentData.length > 0) {
      return Promise.resolve(paymentData); // PayPal 要求返回订单ID
    }

    throw new Error("Payment failed: invalid response");

  } catch (error) {
    console.error("[createOrderCallback] error:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// 支付成功回调
const onApproveCallback: PayPalButtonOnApprove = async (data, actions) => {
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
      // 发送页面视图事件
      window.dataLayer?.push({
        event: 'purchase_success', // 👈 事件名称，自定义但要与GTM触发器对应
        transactionId: tradeNo.value, // 订单号（字符串）
        transactionValue: prePaymentEstimatedAmount.value, // 实际支付金额（数字）
        transactionCurrency: currencyStore.currentCurrency // 货币代码，如 'CNY'
      })
      cartStore.clear()
      paySuccessPopupRef.value?.show()
    }

  } catch (error) {
    console.error(error);
  }
}

const removeCart = (index: number) => {
  cartStore.remove(index)
  if (canCarts.value.length > 0) confirmOrder()
}

// 应用优惠券
const isDiscount = ref(false)
const applyCode = async () => {
  if (!discountCode.value) return
  try {
    isDiscount.value = true
    await confirmOrder()
  } catch (e) {
    isDiscount.value = false
  }
}
const delCode = () => {
  discountCode.value = ''
  isDiscount.value = false
  confirmOrder()
}

// 检查手机号是否合法
function validatePhone(value: string): boolean {
  const cleaned = value.trim()
  return phoneReg.test(cleaned)
}

// 检查手机号格式
const checkPhone = debounce((val: string) => {
  // 允许：数字、空格、加号、连字符、括号
  phone.value = val.replace(/[^\d+\-\s()]/g, '')

  // 限制 "+" 只能出现在开头
  if (phone.value.indexOf('+') > 0) {
    phone.value = phone.value.replace(/\+/g, '')
  }

  // 校验手机号是否有效
  const isValid = validatePhone(phone.value)

  // 动态控制 PayPal 按钮状态
  if (paypalActions) {
    if (isValid) paypalActions.enable()
    else paypalActions.disable()
  }

  return isValid
})

const getItemTotal = (item: IShopping.ShoppingCartsStorageRow) => {
  return new Decimal(item.retailPrice || 0)
    .mul(item.quantity || 0)
    .toNumber()
}

const getItemDisCountTotal = (item: IShopping.ShoppingCartsStorageRow) => {
  return new Decimal(getItemTotal(item) || 0)
      .sub(item.discountAmount || 0)
      .toNumber()
}

//  优惠之前的金额（原价 + 运费）
const totalBeforeDiscount = computed<number>(() => {
  const originalAmount = new Decimal(offerData.value?.originalAmount || 0);
  const estimatedDeliveryAmount = new Decimal(offerData.value?.estimatedDeliveryAmount || 0);
  return originalAmount.plus(estimatedDeliveryAmount).toNumber()
})

// 付款前的预估金额
const prePaymentEstimatedAmount = computed<number>(() => {
  return new Decimal(offerData.value?.estimatedAmount || 0).toNumber();
})

// 实际支付金额（提交给后端的金额）
const actualPaidAmount = computed<number>(() => {
  const originalAmount = new Decimal(offerData.value?.originalAmount || 0);
  const discountAmount = new Decimal(offerData.value?.discountAmount || 0);
  return originalAmount.minus(discountAmount).toNumber();
})

const changeCheck = () => {
  confirmOrder()
}

watch(() => prePaymentEstimatedAmount.value, (newVal: number) => {
  if (newVal > 0) {
    loadPaypal()
  }
})
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

.checkout-btn {
  height: 45px;
  font-size: 16px;
}

@media (max-width: 1259px) {
  .checkout-btn {
    height: 40px;
    font-size: 14px;
  }
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

  .checkout-btn {
    height: 55px;
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .cart-container .review-container .address-list .address-item {
    min-height: 40px;
  }
}

@media (max-width: 559px) {
  .checkout-btn {
    height: 45px;
    font-size: 16px;
  }
}

@media (max-width: 359px) {
  .checkout-btn {
    height: 35px;
    font-size: 13px;
  }
}

.shimmer-text {
  font-family: sans-serif;
  font-weight: bold;
  color: #e0e0e0; /* 底色：浅灰 */

  /* 核心背景渐变逻辑 */
  background: linear-gradient(
          100deg,
          #e0e0e0 40%,
          #888888 50%,
          #e0e0e0 60%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text; /* 兼容 Safari/Chrome */
  -webkit-text-fill-color: transparent; /* 让文字透明，显示出背景 */

  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: -100% 50%; }
}
</style>