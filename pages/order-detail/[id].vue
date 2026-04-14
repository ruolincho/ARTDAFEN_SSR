<template>
  <div class="container">
    <h1 class="text-40 f-bold-500 py-lg-50 py-30">Review Your Order</h1>
    <div class="cart-container acea-row row-between row-top">

      <div class="review-container pr-md-30">
        <div class="text-20 f-bold py-20">Order Item List</div>
        <div class="review-list">
          <div class="review-item acea-row gap-base" v-for="(item, index) in generateList" :key="index">
            <div class="p-img">
              <div class="aspect-ratio p-10 border-sm border-gray-200">
                <img class="w-full h-full fit-contain" :src="imagePrefix(item.img)" :alt="item.title">
              </div>
            </div>
            <div class="p-cont flex-1">
              <div class="acea-row row-between-wrapper gap-base mb-10">
                <p class="text-16 f-bold-500 flex-1">{{ item.title }}</p>
              </div>
              <p class="text-14 f-bold">{{ item.quantity }} ×
                {{ formatToCurrency(item.unitPrice, currencyCode) }}</p>
              <p class="text-14 text-gray-500 mt-4" v-for="(v, k) in item.specs">{{ k }}: {{ v }}</p>
            </div>
          </div>
        </div>
        <div class="text-20 f-bold py-20">Shipping Address</div>
        <div class="border-b-sm border-gray-200 my-20 pb-20">
          <p class="text-20 f-bold">{{ orderDetail?.address?.name }}</p>
          <p class="text-14 mt-20">
            {{ orderDetail?.address?.detail }},
            {{ orderDetail?.address?.country }},
            {{ orderDetail?.address?.state }},
            {{ orderDetail?.address?.city }},
            {{ orderDetail?.address?.zip }}
          </p>
        </div>
        <div class="text-20 f-bold py-20">Payment Method</div>
        <div class="border-b-sm border-gray-200 my-20 pb-20 text-20 acea-row row-between-wrapper">
          <p class="f-bold">{{ formatPayChannel(orderDetail?.order?.payChannel) }}</p>
          <p>{{ formatTimestamp(orderDetail?.order?.payTime) }}</p>
        </div>
        <div class="border-b-sm border-gray-200 my-20 pb-20 text-20 acea-row row-between-wrapper">
          <p class="f-bold">Trade No</p>
          <p>{{ orderDetail?.order?.tradeNo || '-' }}</p>
        </div>
      </div>

      <div class="review-summary shadow-lg p-20">
        <div class="acea-row row-between-wrapper text-16 f-bold pb-20 mb-20 border-b-sm border-gray-200">
          <span>Subtotal</span>
          <span>{{ formatToCurrency(orderDetail?.order?.originalAmount || 0, currencyCode) }}</span>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Delivery Amount</span>
          <span>{{ formatToCurrency(orderDetail?.order?.deliveryAmount || 0, currencyCode) }}</span>
        </div>
        <div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper">
          <span>Discount Amount</span>
          <span>{{ formatToCurrency(orderDetail?.order?.discountAmount || 0, currencyCode) }}</span>
        </div>
        <div class="acea-row row-between-wrapper text-16 f-bold pt-20 mt-20 border-t-sm border-gray-200 text-error">
          <span>Grand Total</span>
          <span>{{ formatToCurrency(orderDetail?.order?.actualAmount || 0, currencyCode) }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import {getOrderDetailApi} from "~/api/modules/physical/physical";
import type {IPhysical} from "~/api/interface/physical/physical";
import {formatPayChannel, formatTimestamp} from "~/utils/format";
import {useCurrencyStore} from "~/stores/modules/currency";

defineOptions({
  name: 'OrderDetail '
})

onMounted(() => {
  if (route.params.id) getOrderDetail()
})

useSeoMeta({
  title: 'Order Details | ARTDAFEN',
  robots: 'noindex, nocache, noarchive, nofollow'
})

const { imagePrefix } = useImage()
const route = useRoute()
const { formatToCurrency } = useCurrencyStore();

// 获取订单详情
const currencyCode = ref('USD')
const orderDetail = ref({} as IPhysical.OrderDetailRow)
const getOrderDetail = async () => {
  const {data} = await getOrderDetailApi(route.params.id)
  orderDetail.value = data
  currencyCode.value = data.order.currencyCode
}

// 生成组件中接收的订单列表
const generateList = computed(() => [...(orderDetail.value?.orderItems || []), ...(orderDetail.value?.gifts || [])])
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
  }

  .review-summary {
    width: 29.60%;
    position: sticky;
    top: 150px;
  }
}

@media (max-width: 991px) {
  .cart-container {
    .review-container {
      width: 100%;
    }

    .review-summary {
      width: 100%;
      position: static;
    }
  }
}

</style>