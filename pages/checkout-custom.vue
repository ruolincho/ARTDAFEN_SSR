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
                />
                <p class="text-14 f-bold">{{ currencyStore.formatToCurrency(customStore.subtotal || 0) }}</p>
              </div>
              <div class="mt-10 text-right text-secondary f-bold" v-if="getOfferProduct.length">
                <p v-for="(promo, index) in getOfferProduct[0]?.promoOffer" :key="index"> {{ promo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-summary shadow-lg p-xl-20 p-15">
        <div class="acea-row row-between-wrapper text-16 f-bold pb-20 mb-20 border-b-sm border-gray-200">
          <span>Subtotal</span>
          <span>{{ currencyStore.formatToCurrency(customStore.subtotal || 0) }}</span>
        </div>
        <p class="text-16 text-gray-600 mb-8">Enter Discount Code</p>
        <el-form :model="form" ref="formRef" :rules="rules" :auto-complete="false">
          <el-form-item prop="discountCode">
            <el-input v-model="form.discountCode" placeholder="Enter your discount code" size="large"
                      :disabled="isDiscount || isCreate">
              <template #append>
                <el-button size="large" @click="applyCode">Apply</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="acea-row row-right row-center text-error mb-10" v-if="isDiscount">
          <span class="text-14">not using discounts <span class="iconfont icon-close text-14 cursor-pointer" @click="delCode"/></span>
        </div>
        <div class="acea-row row-right row-center text-error mb-10" v-if="isCreate && isDiscount">
          <span class="text-14">The order has been created and the discount code cannot be modified</span>
        </div>
        <div class="text-16">
          Promo codes cannot be combined with sitewide promos or markdown items.
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Estimated Shipping</span>
          <span>{{ currencyStore.formatToCurrency(offerData.estimatedDeliveryAmount || 0) }}</span>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Discount Amount</span>
          <span>{{ currencyStore.formatToCurrency(Number(offerData?.discountAmount || 0)) }}</span>
        </div>
        <div class="acea-row row-between-wrapper text-16 f-bold pt-20 my-20 border-t-sm border-gray-200">
          <span>Estimated Total</span>
          <div>
            <!-- 优惠之前的金额（需要加上预计运费） -->
            <p v-if="offerData?.discountAmount > 0" class="text-through text-gray-600">{{
                currencyStore.formatToCurrency(Number(offerData.originalAmount || 0) + Number(offerData.estimatedDeliveryAmount || 0))
              }}</p>
            <!-- 实付金额 -->
            <p>{{ currencyStore.formatToCurrency(Number(offerData.estimatedAmount || 0) || customStore.subtotal) }}</p>
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
    <div class="text-center py-60" v-show="customStore.subtotalQuantity === 0">
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
import {type PayPalNamespace} from '@paypal/paypal-js';
import type {OnApproveActions, OnApproveData} from "@paypal/paypal-js/types/components/buttons";
import {dataURLtoBlob, debounce} from "~/utils";
import {useUserStore} from '~/stores/modules/user'
import PaySuccessPopup from "~/components/PaySuccessPopup.vue";
import LoginWindow from "~/components/LoginWindow.vue";
import {type ElForm, ElMessage} from "element-plus";
import {paymentApi, paymentCallbackApi} from "~/api/modules/pay/pay";
import {useCustomStore} from "~/stores/modules/custom";
import {advanceOrderNoApi, confirmOrderApi, createOrderApi, uploadOrderOriginImgApi} from "~/api/modules/custom/custom";
import type {ICustom} from "~/api/interface/custom/custom";
import TypedFormData from "~/api/helper/formData";
import {PRODUCT_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useIndexedDBBase64} from '~/composables/useIndexedDBBase64'

defineOptions({
  name: 'CustomPaintCheckout',
  ssr: false
})

definePageMeta({
  auth: false
})

const previewImg = ref('')

onMounted(() => {
  if (customStore.subtotalQuantity > 0) {
    loadPaypal()
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
const userStore = useUserStore()
const customStore = useCustomStore()
const currencyStore = useCurrencyStore();
const { getBase64 } = useIndexedDBBase64()

const PromotionRuleText = '*Promotion applies to order total before shipping, taxes, and duties. Promotions that involve a price reduction may take a variety of forms, including strikethrough prices or a discount code (e.g., percent-off or dollar-off discount code) that is applied by the customer at checkout (collectively “Product Discounts”). Promotional offers may be used one time only per household. Only one discount or promotional offer may be used per item. “Bonus Discounts” that are automatically applied to your order total may not be combined with one-time use discount codes or gift codes. Discounts will not be applied to previous or existing orders, We offer fair shipping rates based on the size and quantity of the items in an order. Final shipping charges will be calculated during checkout.'

const form = reactive({
  discountCode: ''
})
const rules = reactive({
  discountCode: [
    {required: true, message: 'Please enter the discount code', trigger: []},
  ]
})

// 加载 PayPal SDK
let paypal: PayPalNamespace | null;
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
    couponCode: isDiscount.value ? form.discountCode : null,
  }

  try {
    const {data} = await confirmOrderApi(shoppingCartData.value)

    // 切换货币后,需要重新计算金额
    customStore.carts.actualAmount = Number(data.originalAmount) / customStore.carts.quantity

    offerData.value = data
    if (!isGeneratedOrderNo) {
      await _advanceOrderNo()
      isGeneratedOrderNo = true
    }
  } catch (err) {
    setTimeout(() => {
      form.discountCode = ''
      isDiscount.value = false
    }, 1000)
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

const paySuccessPopupRef = ref<InstanceType<typeof PaySuccessPopup>>()

const isCreate = ref(false) // 是否创建订单,用于判断是否需要再次创建订单

// 创建订单唤起支付回调
const createOrderCallback = async () => {
  try {

    await waitForUploadSuccess();

    const formData = new TypedFormData<ICustom.CreateQuery>();
    const previewImgStr = dataURLtoBlob(previewImg.value); // 转回 Blob
    formData.append('previewImg', previewImgStr)
    formData.append('tradeNo', tradeNo.value)
    formData.append('actualAmount',
      String(Number(offerData.value?.originalAmount || 0) - Number(offerData.value?.discountAmount || 0))
    )
    formData.append('paintCode', customStore.carts.code)
    formData.append('quantity', customStore.carts.quantity.toString())
    formData.append('dimensionId', customStore.carts.dimensionId)
    formData.append('part', JSON.stringify(customStore.carts.parts))
    formData.append('remark', customStore.carts.remark)

    if (customStore.carts.themeId) {
      formData.append('contentNumber', customStore.carts.contentNumber)
      formData.append('themeId', customStore.carts.themeId)
    }

    if (isDiscount.value) {
      formData.append('couponCode', form.discountCode)
    }

    !isCreate.value && await createOrderApi(formData.getFormData())
    isCreate.value = true;

    const {data: paymentData} = await paymentApi({
      payChannelStr: 'paypal_checkout', // 支付方式
      tradeNo: tradeNo.value,
      orderType: '4',
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
      customStore.clear()
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

  if (isCreate.value) return ElMessage.warning('Order has been created, coupon cannot be applied repeatedly!')
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
  if (isCreate.value) return ElMessage.warning('The order has been created, the coupon cannot be deleted!')
  form.discountCode = ''
  isDiscount.value = false
  confirmOrder()
}
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