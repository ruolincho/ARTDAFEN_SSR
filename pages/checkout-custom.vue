<template>
  <div class="container">
    <h1 class="text-40 f-bold-500 py-lg-50 py-30">Checkout Photo to art </h1>
    <div class="cart-container acea-row row-between row-top" v-show="customStore.subtotalQuantity > 0">
      <div class="review-container pr-30">
        <!-- 产品视图 -->
        <div class="review-list">
          <div class="review-item acea-row gap-base">
            <div class="p-img">
              <div class="aspect-ratio p-10 border-sm border-gray-200">
                <img class="w-full h-full fit-contain" :src="previewImg" alt="previewImg">
              </div>
            </div>
            <div class="p-cont flex-1">
              <div class="acea-row row-between-wrapper gap-base mb-10">
                <p class="text-16 f-bold-500 flex-1">{{ customStore.carts.title }}</p>
              </div>
              <p class="text-14 text-gray-500 mt-4" v-for="(v, k) in customStore.carts.specs">{{ k }}: {{ v }}</p>
              <div class="acea-row row-between-wrapper mt-10">
                <el-input-number
                  class="review-number"
                  v-model="customStore.carts.quantity"
                  :min="1"
                  :max="99"
                  @change="quantityChange"
                  :disabled="isCreate"
                  :value-on-clear="1"
                />
                <p class="text-14 f-bold">{{ formatToCurrency(customStore.subtotal) }}</p>
              </div>
              <div class="mt-10 text-right text-secondary f-bold" v-if="getOfferProduct.length">
                <span> {{ getOfferProduct[0]?.promoOffer.join(' / ') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-summary shadow-lg p-xl-20 p-15">
        <div class="acea-row row-between-wrapper text-16 f-bold pb-20 mb-20 border-b-sm border-gray-200">
          <span>Subtotal</span>
          <span>{{ formatToCurrency(customStore.subtotal) }}</span>
        </div>
        <div class="acea-row row-between-wrapper mb-20">
          <div class="acea-row row-middle">
            <span class="f-bold text-16 mr-5">Phone Number</span>
            <el-tooltip :content="phoneRuleText" placement="top" popper-style="max-width: 345px;">
              <SvgIcon name="info-fill" class="text-18" />
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
          :disabled="isCreate"
        />
        <div class="acea-row row-right row-center text-error mb-10" v-if="isCreate">
          <span class="text-14">The order has been created and the phone number cannot be modified</span>
        </div>
        <div class="acea-row row-between-wrapper mb-20">
          <div class="acea-row row-middle">
            <span class="f-bold text-16 mr-5">Apply Discount Code</span>
            <el-tooltip :content="discountRuleText" placement="top" popper-style="max-width: 345px;">
              <SvgIcon name="info-fill" class="text-18" />
            </el-tooltip>
          </div>
          <SvgIcon :name="showDiscountInput ? 'reduce' : 'add'" class="text-24 cursor-pointer" @click="showDiscountInput = !showDiscountInput" />
        </div>
        <div v-show="showDiscountInput">
          <el-input
            v-model="discountCode"
            placeholder="Enter your discount code"
            size="large"
            :disabled="isDiscount || isCreate"
            @keydown.enter="applyCode"
          >
            <template #append>
              <el-button size="large" @click="applyCode">Apply</el-button>
            </template>
          </el-input>
          <div class="acea-row row-right row-center text-error my-20 text-14" v-if="isDiscount">
            <p>
              not using discounts
              <SvgIcon name="close" class="text-14 cursor-pointer" @click="delCode" />
            </p>
          </div>
          <div class="acea-row row-right row-center text-error mb-10" v-if="isCreate && isDiscount">
            <span class="text-14">The order has been created and the discount code cannot be modified</span>
          </div>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Estimated Shipping</span>
          <span>{{ formatToCurrency(offerData.estimatedDeliveryAmount || 0) }}</span>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Discount Amount</span>
          <span>{{ formatToCurrency(Number(offerData?.discountAmount || 0)) }}</span>
        </div>
        <div class="acea-row row-between-wrapper text-16 f-bold pt-20 my-20 border-t-sm border-gray-200">
          <span>Estimated Total</span>
          <div>
            <!-- 优惠之前的金额 -->
            <p v-if="Number(offerData?.discountAmount || 0) > 0" class="text-through text-gray-600">
              {{ formatToCurrency(totalBeforeDiscount) }}
            </p>
            <!-- 付款前的预估金额 -->
            <p>{{ formatToCurrency(prePaymentEstimatedAmount) }}</p>
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
            <SvgIcon name="info-fill" class="text-18" />
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="text-center py-60" v-show="customStore.subtotalQuantity === 0">
      <SvgIcon name="shopping-bag" class="text-50" />
      <p class="text-20 f-bold mt-20">Your Cart is Empty.</p>
      <p class="text-14 my-20">Please add products to your cart to checkout.</p>
      <el-button size="large" type="primary" @click="router.push(COLLECTIONS_URL)">
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
import {dataURLtoBlob, debounce} from "~/utils";
import PaySuccessPopup from "~/components/PaySuccessPopup.vue";
import {ElMessage, type ElInput} from "element-plus";
import {paymentApi, paymentCallbackApi} from "~/api/modules/pay/pay";
import {useCustomStore} from "~/stores/modules/custom";
import {advanceOrderNoApi, confirmOrderApi, createOrderApi, uploadOrderOriginImgApi} from "~/api/modules/custom/custom";
import type {ICustom} from "~/api/interface/custom/custom";
import TypedFormData from "~/api/helper/formData";
import {COLLECTIONS_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useIndexedDBBase64} from '~/composables/useIndexedDBBase64'
import {phoneReg} from "~/regular";
import Decimal from 'decimal.js';
import {initPaypal} from '~/composables/usePayment'
import {checkStatus} from "~/api/helper";

defineOptions({
  name: 'CustomPaintCheckout',
  ssr: false
})

definePageMeta({
  auth: false,
  isShowActivity: true
})

useSeoMeta({
  title: 'Your Shopping Cart',
  robots: 'noindex, nocache, noarchive, nofollow'
})

const previewImg = ref<string | null>('')

onMounted(() => {
  if (customStore.subtotalQuantity > 0) {
    _init()
  }
  $bus.on('loginSuccess', _init)
})

onUnmounted(() => {
  $bus.off('loginSuccess', _init)
})

const _init = async () => {
  // 从 IndexedDB 获取预览图片
  previewImg.value = await getBase64(customStore.carts.previewImg)
  await confirmOrder()
}

const {$bus} = useNuxtApp()
const router = useRouter()
const customStore = useCustomStore()
const { formatToCurrency, currentCurrency } = useCurrencyStore();
const {getBase64} = useIndexedDBBase64()

const promotionRuleText = '*Promotion applies to order total before shipping, taxes, and duties. Promotions that involve a price reduction may take a variety of forms, including strikethrough prices or a discount code (e.g., percent-off or dollar-off discount code) that is applied by the customer at checkout (collectively “Product Discounts”). Promotional offers may be used one time only per household. Only one discount or promotional offer may be used per item. “Bonus Discounts” that are automatically applied to your order total may not be combined with one-time use discount codes or gift codes. Discounts will not be applied to previous or existing orders, We offer fair shipping rates based on the size and quantity of the items in an order. Final shipping charges will be calculated during checkout.'
const discountRuleText = 'Promo codes cannot be combined with sitewide promos or markdown items.'
const phoneRuleText = 'For delivery questions.'
const discountCode = ref('')
const showDiscountInput = ref(false)
const phone = ref('')

// 加载 PayPal SDK
const loadPaypal = async () => {
  const config = useRuntimeConfig()
  initPaypal({
    containerId: '#paypal-button-container',
    clientId: config.public.paypalClientId,
    currency: currentCurrency,
    createOrder: createOrderCallback,
    onApprove: onApproveCallback,
    onInit: onPaypalInit,
    onClick: onPaypalClick,
  })
}

// 预生成订单编号上传原图
const tradeNo = ref('')
let uploadOriginImgSuccess = ref(false)
const _advanceOrderNo = async () => {
  const {data} = await advanceOrderNoApi()
  tradeNo.value = data
  const formData = new TypedFormData<ICustom.UploadOrderOriginImgQuery>();
  const originalImgStr = await getBase64(customStore.carts.originalImg)
  const originalImg = dataURLtoBlob(originalImgStr!); // 转回 Blob
  formData.append('originalImg', originalImg)
  formData.append('tradeNo', tradeNo.value)
  await uploadOrderOriginImgApi(formData.getFormData())
  uploadOriginImgSuccess.value = true
}

// 确认订单
const shoppingCartData = ref({} as ICustom.OfferQuery)
let isGeneratedOrderNo = false
const offerData = ref({} as ICustom.OfferRow)
const confirmOrder = async () => {

  shoppingCartData.value = {
    paintCode: customStore.carts.code,
    dimensionId: customStore.carts.dimensionId,
    parts: customStore.carts.parts,
    quantity: customStore.carts.quantity,
    couponCode: isDiscount.value ? discountCode.value : null,
  }

  try {
    const {data, message, status} = await confirmOrderApi(shoppingCartData.value)

    // 优惠券无法使用会返回一个空data
    if (!data) {
      checkStatus(status, message)
      setTimeout(() => {
        discountCode.value = ''
        isDiscount.value = false
      }, 500)
      return
    }

    // 切换货币后,需要重新计算金额
    const originalAmount = new Decimal(data.originalAmount || 0)
    customStore.carts.actualAmount = originalAmount.div(customStore.carts.quantity).toNumber()

    offerData.value = data
    if (!isGeneratedOrderNo) {
      await _advanceOrderNo()
      isGeneratedOrderNo = true
    }
  } catch (err) {
    setTimeout(() => {
      discountCode.value = ''
      isDiscount.value = false
    }, 500)
  }
}

const getOfferProduct = computed(() => {
  const product = offerData.value?.products || []
  if (!product.length) return []
  return product
})

// 数量变化
const quantityChange = debounce(() => {
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

const isCreate = ref(false) // 是否创建订单,用于判断是否需要再次创建订单

// 创建订单唤起支付回调
const createOrderCallback: PayPalButtonCreateOrder = async (data, actions) => {
  try {
    // ② 等待图片上传完成
    await waitForUploadSuccess();

    const formData = new TypedFormData<ICustom.CreateQuery>();
    const previewImgStr = dataURLtoBlob(previewImg.value!); // 转回 Blob
    formData.append('previewImg', previewImgStr)
    formData.append('tradeNo', tradeNo.value)
    formData.append('actualAmount', actualPaidAmount.value.toString())
    formData.append('paintCode', customStore.carts.code)
    formData.append('quantity', customStore.carts.quantity.toString())
    formData.append('dimensionId', customStore.carts.dimensionId)
    formData.append('partStr', JSON.stringify(customStore.carts.parts))
    formData.append('remark', customStore.carts.remark)
    formData.append('mobile', phone.value)

    if (customStore.carts.themeId) {
      formData.append('contentNumber', customStore.carts.contentNumber)
      formData.append('themeId', customStore.carts.themeId)
    }

    if (isDiscount.value) {
      formData.append('couponCode', discountCode.value)
    }

    // 创建订单（只创建一次）
    !isCreate.value && await createOrderApi(formData.getFormData())
    isCreate.value = true;

    const payChannelStr = prePaymentEstimatedAmount.value === 0 ? 'inner_points' : 'paypal_checkout'  // 支付方式

    const {data: paymentData} = await paymentApi({
      payChannelStr,
      tradeNo: tradeNo.value,
      orderType: '4',
    })

    // 0元支付
    if (payChannelStr === 'inner_points') {
      if (paymentData === 'success') {
        customStore.clear()
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

    throw new Error("Payment failed: invalid PayPal response");

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
        transactionCurrency: currentCurrency // 货币代码，如 'CNY'
      })
      customStore.clear()
      paySuccessPopupRef.value?.show()
    }

  } catch (error) {
    console.error(error);
  }
}

const waitForUploadSuccess = (): Promise<void> => {
  return new Promise(resolve => {
    // 如果已经是 true，直接 resolve
    if (uploadOriginImgSuccess.value === true) {
      resolve();
      return;
    }

    // 否则开始 watch 等待变为 true
    const stop = watch(uploadOriginImgSuccess, (val) => {
      if (val === true) {
        stop(); // 解绑监听
        resolve();
      }
    });
  });
}

// 应用优惠券
const isDiscount = ref(false)
const applyCode = async () => {
  if (isCreate.value) return ElMessage.warning('Order has been created, coupon cannot be applied repeatedly!')
  if (!discountCode.value) return
  try {
    isDiscount.value = true
    await confirmOrder()
  } catch (e) {
    isDiscount.value = false
  }
}
const delCode = () => {
  if (isCreate.value) return ElMessage.warning('The order has been created, the coupon cannot be deleted!')
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

watch(() => prePaymentEstimatedAmount.value, (newVal: number) => {
  if (newVal > 0) {
    loadPaypal()
  }
})
</script>

<style scoped lang="scss">
.cart-container {
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
      row-gap: 20px;

      .address-item {
        min-height: 188px;

        :deep(.el-checkbox.is-disabled .el-checkbox__inner) {
          background-color: red;
          border-color: red;
        }
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
  width: 103px;
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
</style>