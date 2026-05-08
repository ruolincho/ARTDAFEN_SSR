<template>
  <div class="orders-container">
    <div class="acea-row row-right mb-lg-30 mb-15">
      <el-input
        class="search-input"
        type="text"
        v-model="initParam.keyword"
        size="large"
        @keyup.enter="handleSearch"
        placeholder="Search..."
        clearable
      >
        <template #prefix>
          <SvgIcon name="search" class="text-24 text-primary" />
        </template>
      </el-input>
    </div>
    <ProList
        ref="proListRef"
        :request-api="getOrderList"
        :init-param="initParam"
    >
      <template #default="scope">
        <div class="order-list">
          <div class="order-item mt-lg-20 mt-15" v-for="item in scope.rows" :key="item.id">
            <div
                class="acea-row row-middle text-16 mt-10"
                :class="{ 'mb-20': index < item.orderItems.length - 1 }"
                v-for="(goods, index) in item.orderItems"
                :key="index"
            >
              <div class="acea-row row-middle p-content flex-1">
                <div class="p-img mr-lg-20 mr-10">
                  <div class="aspect-ratio p-10 border-sm border-gray-200">
                    <img class="w-full h-full fit-contain" :src="imagePrefix(goods.img)" :alt="goods.title">
                  </div>
                </div>
                <div class="flex-1 mr-lg-20 mr-sm-10">
                  <p class="f-bold-500">{{ goods.title }}</p>
                  <p class="text-gray-600 my-5">{{ formatAttr(goods.specs) }}</p>
                </div>
              </div>
              <div class="f-bold p-price text-center">{{ formatToCurrency(goods.unitPrice, item.currencyCode) }}</div>
              <p class="text-gray-600 p-operation text-center">Qty: {{ goods.quantity }}</p>
            </div>
            <div class="py-lg-20 py-10 border-b-sm border-gray-200 acea-row row-middle">
              <div class="flex-1 p-content" style="line-height: 1.7">
                <template v-if="item.status === '0'">
                  <el-tag type="warning" effect="dark">Obligation</el-tag>
                  <span class="ml-10">Your order has not been paid yet, please make the payment as soon as possible!</span>
                </template>
                <template v-if="item.status === '1'">
                  <el-tag type="info" effect="dark" size="large">Cancelled</el-tag>
                  <span class="ml-10">Your order has been cancelled, please place a new order.</span>
                </template>
                <template v-if="item.status === '2'">
                  <el-tag type="success" effect="dark" size="large">Pending Shipment</el-tag>
                  <span class="ml-10">Your order is being processed, please wait for the delivery.</span>
                </template>
                <template v-if="item.status === '3'">
                  <el-tag type="success" effect="dark" size="large">Pending Receipt</el-tag>
                  <span class="ml-10">Your order has been shipped, please wait for the receipt.</span>
                </template>
                <template v-if="item.status === '4'">
                  <el-tag type="success" effect="dark" size="large">Completed</el-tag>
                  <span class="ml-10">Your order has been completed, thank you for your purchase!</span>
                </template>
                <template v-if="item.status === '5'">
                  <el-tag type="danger" effect="dark" size="large">After Sales</el-tag>
                  <span
                      class="ml-10">Please wait for customer service to provide after-sales service for your order.</span>
                </template>
              </div>
              <div class="f-bold p-price text-center">{{ formatToCurrency(item.actualAmount, item.currencyCode) }}</div>
              <div class="p-operation">
                <NuxtLink class="block" :to="`/order-detail/${item.tradeNo}`">
                  <el-button class="w-full" size="large" type="primary">
                    View Order
                  </el-button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center py-60">
          <SvgIcon name="empty" class="text-50" />
          <p class="text-20 f-bold mt-20">No Orders Found</p>
          <p class="text-14 my-20">No data found, please check the query or try again later.</p>
          <el-button size="large" type="primary" @click="router.push(COLLECTIONS_URL)">START SHOPPING</el-button>
        </div>
      </template>
    </ProList>
  </div>
</template>

<script setup lang="ts">
import {getOrderListApi} from "~/api/modules/physical/physical";
import type {IPhysical} from "~/api/interface/physical/physical";
import ProList from "~/components/ProList/index.vue";
import {formatAttr} from "~/utils";
import {COLLECTIONS_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useImage} from "~/composables/useImage";
import {resolvePageMeta} from "~/config/pageMeta";

defineOptions({
  name: 'Orders'
})

definePageMeta({
  auth: true
})

useHead(resolvePageMeta("/orders"));

const { imagePrefix } = useImage()
const { formatToCurrency } = useCurrencyStore();
const router = useRouter();
const initParam = reactive({status: '0', keyword: '', size: 3});
const getOrderList = (params: IPhysical.OrderQuery) => getOrderListApi(params)

const proListRef = ref<InstanceType<typeof ProList>>();
const handleSearch = () => {
  proListRef.value?.search();
}
</script>

<style scoped lang="scss">
.orders-container {

  .search-input {
    width: 320px;
  }

  .order-list {
    .order-item {

      .p-img {
        width: 87px;
        height: 87px;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .p-price {
        width: 23.70%;
      }

      .p-operation {
        width: 11.60%;
      }
    }
  }
}

@media (max-width: 1259px) {
  .orders-container .order-list .order-item .p-img {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 991px) {
  .orders-container {
    .search-input {
      width: 100%;
    }
  }

}

@media (max-width: 768px) {
  .orders-container .order-list .order-item {

    .p-content {
      width: 100%;
      flex: unset;
      margin-bottom: 10px;
    }

    .p-price {
      width: 50%;
      text-align: left;
    }

    .p-operation {
      width: 50%;
      text-align: left;
    }
  }

}

</style>