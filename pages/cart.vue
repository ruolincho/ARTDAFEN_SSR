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
            </div>
          </div>
        </div>

        <!-- 选择地址 -->
        <div class="row gap-row-base address-list">
          <template v-for="(item, index) in addressList" :key="item.id">
            <div class="col-sm-6 col-12" v-if="isExpand ? true : index < 2">
              <div class="address-item p-lg-20 p-15 border-sm border-gray-200 bg-gray-100">
                <div class="acea-row row-between-wrapper">
                <span class="text-20 f-bold">
                  {{ item.firstName }} {{ item.lastName }} <el-tag type="primary" v-if="item.defaultFlag === '0'">Default</el-tag>
                </span>
                  <span
                    class="iconfont text-24 cursor-pointer"
                    :class="[item.id === addressId ? 'icon-checkbox-fill' : 'icon-checkbox']"
                    @click="handleAddress(item.id)"
                  ></span>
                </div>
                <p class="mt-10 text-14 line1">{{ item.mobile }}</p>
                <p class="mt-10 mb-lg-20 mb-15 text-14 line1">{{ item.detail }}</p>
                <el-button type="primary" class="w-full" size="large" @click="openAddEdit('Edit address', item, false)">
                  Edit
                </el-button>
              </div>
            </div>
          </template>
          <div class="col-sm-6 col-12" v-if="isExpand || addressList.length < 2">
            <div
              class="address-item h-full border-sm border-gray-200 bg-gray-100 acea-row row-center-wrapper cursor-pointer"
              @click="openAddEdit('Add a new address')"
            >
              <span class="iconfont icon-add text-20"></span>
              <span class="text-16 f-bold-500 ml-10">Add Address</span>
            </div>
          </div>
        </div>
        <div class="acea-row row-center-wrapper py-20 cursor-pointer"
             @click="isExpand = !isExpand"
             v-if="addressList.length >= 2"
        >
          <span class="mr-10 text-16 f-bold-500">{{ isExpand ? 'Less' : 'More' }} Address</span>
          <span class="iconfont text-20" :class="{ 'icon-down': !isExpand, 'icon-up': isExpand}"></span>
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
        <div class="acea-row row-right row-center text-error" v-if="discountDetail?.discountAmount">
          <span class="text-14">not using discounts <span class="iconfont icon-close text-14 cursor-pointer" @click="delCode" /></span>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Delivery Amount</span>
          <span>{{ currencyStore.formatToCurrency(offerData.deliveryAmount || 0)  }}</span>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Discount Amount</span>
          <span>{{ currencyStore.formatToCurrency(Number(offerData.discountAmount || 0) + Number(discountDetail.discountAmount || 0))}}</span>
        </div>
        <div class="acea-row row-between-wrapper text-16 f-bold pt-20 my-20 border-t-sm border-gray-200">
          <span>Grand Total</span>
          <div>
            <p :class="[discountDetail.discountAmount ? 'text-through text-gray-600' : '']">{{ currencyStore.formatToCurrency(Number(offerData.actualAmount || 0) || cartStore.subtotal) }}</p>
            <p v-if="discountDetail.discountAmount">{{ currencyStore.formatToCurrency((Number(offerData.actualAmount || 0) - Number(discountDetail.discountAmount || 0)) || cartStore.subtotal) }}</p>
          </div>
        </div>
        <div id="paypal-button-container" class="paypal-button-container"></div>
        <!--        <el-button type="primary" size="large" class="w-full" @click="test">Proceed to Checkout</el-button>-->
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
  <AddressInfo ref="addressInfoRef" @add="addAddressCB"/>
  <PaySuccessPopup :trade-no="tradeNo" ref="paySuccessPopupRef"/>
  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import type {OnApproveActions, OnApproveData} from "@paypal/paypal-js/types/components/buttons";
import {debounce, imagePrefix} from "~/utils";
import {useCartStore} from "~/stores/modules/cart";
import {useUserStore} from '~/stores/modules/user'
import AddressInfo from "~/components/AddressInfoForm.vue";
import PaySuccessPopup from "~/components/PaySuccessPopup.vue";
import LoginWindow from "~/components/LoginWindow.vue";
import {
  addAddressApi,
  detailAddressApi,
  editAddressApi,
  getAddressListApi,
  getDefaultAddressApi
} from "~/api/modules/address/address";
import {type ElForm, ElMessage} from "element-plus";
import type {IAddress} from "~/api/interface/address/address";
import type {IShopping} from "~/api/interface/shopping/shopping";
import {confirmOrderApi, createOrderApi} from "~/api/modules/shopping/shopping";
import {paymentApi, paymentCallbackApi} from "~/api/modules/pay/pay";
import {PRODUCT_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {discountCalcApi} from "~/api/modules/physical/physical";
import type {IPhysical} from "../api/interface/physical/physical";
import { initPaypal } from '~/composables/usePayment'

defineOptions({
  name: 'Cart'
})

onMounted(() => {
  if (canCarts.value.length > 0) {
    loadPaypal()
    if (userStore.isLogin) {
      _init()
    }
  }
  $bus.emit('closeCartWindow')
  $bus.on('loginSuccess', _init)
})

onUnmounted(() => {
  $bus.off('loginSuccess', _init)
})

const _init = async () => {
  await getDefaultAddress()
  await confirmOrder()
  await getAddressList()
}

const {$bus} = useNuxtApp()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore();
const currencyStore = useCurrencyStore();

const isExpand = ref(false)
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

// 获取默认地址
const addressId = ref('')
const getDefaultAddress = async () => {
  const {data} = await getDefaultAddressApi()
  if (!data) {
    ElMessage.warning('Address information not found, please add address information first.')
    return
  }
  addressId.value = data.id
}

// 获取地址列表
const addressList = ref<IAddress.Row[]>([])
const getAddressList = async () => {
  const {data} = await getAddressListApi()
  addressList.value = data
}

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
    addressId: addressId.value,
    deliveryType: '0',
  }

  const {data} = await confirmOrderApi(params)
  offerData.value = data
}

// 数量变化
const quantityChange = debounce(() => {
  if (userStore.isLogin) confirmOrder()
})

// 地址变化
const handleAddress = (id: string) => {
  if (addressId.value === id) return
  addressId.value = id
  confirmOrder()
}

const addressInfoRef = ref<InstanceType<typeof AddressInfo>>()
const openAddEdit = async (title: string, row: any = {}, isAdd = true) => {
  if (!userStore.isLogin) return showLoginWindow()
  if (!isAdd) {
    const record = await detailAddressApi(row?.id)
    row = record?.data
  }
  const params = {
    isAdd,
    title,
    row: {...row},
    api: isAdd ? addAddressApi : editAddressApi,
    getTableList: getAddressList
  }
  addressInfoRef.value?.acceptParams(params)
}

const paySuccessPopupRef = ref<InstanceType<typeof PaySuccessPopup>>()

// 创建订单唤起支付回调
const tradeNo = ref('')
const createOrderCallback = async () => {
  try {
    if (!userStore.isLogin) {
      showLoginWindow()
      throw new Error("Please login first.");
    }

    if (addressId.value === '') {
      ElMessage.error('Please select the address first.')
      throw new Error("Please select the address first.");
    }

    const params = {
      actualAmount: String(Number(offerData.value?.actualAmount || 0) - Number(discountDetail.value?.discountAmount || 0)),
      spentPoints: offerData.value.spentPoints,
      shoppingCarts: shoppingCartData.value,
      addressId: addressId.value,
      remarks: remarks.value,
      deliveryType: '0',
    } as  IShopping.CreateQuery

    if (discountDetail.value?.discountAmount) {
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
  if (canCarts.value.length > 0 && userStore.isLogin) confirmOrder()
}

// 添加地址的回调
const addAddressCB = (id: string) => {
  addressId.value = id
  confirmOrder()
}

// 应用优惠券
const isDiscount = ref(false)
const discountDetail = ref({} as IPhysical.DiscountCalcRow)
const formRef = ref<InstanceType<typeof ElForm>>()
const applyCode = () => {
  formRef.value!.validate(async valid => {
    if (!valid) return;
    const {data} = await discountCalcApi({
      couponCode: form.discountCode,
      shoppingCarts: shoppingCartData.value
    })
    discountDetail.value = data
    isDiscount.value = true
  });
}
const delCode = () => {
  form.discountCode = ''
  discountDetail.value = {} as IPhysical.DiscountCalcRow
  isDiscount.value = false
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