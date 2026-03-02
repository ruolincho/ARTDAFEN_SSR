<template>
  <div class="p-8">
    <div class="shopping-bag-wrapper">
      <template v-if="cartStore.carts.length">
        <p class="text-16 mb-20">You have {{ cartStore.subtotalQuantity }} items in your cart</p>
        <div class="shopping-bag-scroll scroll-y scroll-hide">
          <div class="shopping-bag-list">
            <div
              class="shopping-bag-item acea-row row-middle pb-20  border-b-sm border-gray-200"
              :class="{ disabled: item.disable || Number(item.retailStock) <= 0 }"
               v-for="(item, index) in cartStore.carts"
               :key="item.productId"
            >
              <div
                class="p-img mr-10 border-sm cursor-pointer"
                @click="jumpToProduct(item)"
              >
                <img class="w-full h-full fit-contain" :src="imagePrefix(item.img)" :alt="item.title">
                <p class="tip text-14 py-3 text-center">
                  {{ item.disable ? 'Temporarily unavailable' : Number(item.retailStock) <= 0 ? 'Out of stock' : '' }}
                </p>
              </div>
              <div class="flex-1 text-16 overflow-hidden">
                <p class="line1">{{ item.title }}</p>
                <p class="f-bold my-5">{{ item.quantity }} × {{ formatToCurrency(item.retailPrice) }}</p>
                <div class="acea-row row-between-wrapper overflow-hidden">
                  <p class="flex-1 line1 mr-10">{{ formatAttr(item.specs) }}</p>
                  <span class="iconfont icon-delete text-20 cursor-pointer" @click="cartStore.remove(index)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="acea-row row-between-wrapper py-20 text-16 f-bold">
          <p>Subtotal</p>
          <p>{{ formatToCurrency(cartStore.subtotal) }}</p>
        </div>
        <el-button class="w-full" size="large" type="primary" @click="router.push('/cart')">Checkout</el-button>
      </template>
      <div v-else class="text-center">
        <p class="mb-15">Your Cart is Empty.</p>
        <el-button size="large" type="primary" @click="router.push(PRODUCT_URL)">START SHOPPING</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/modules/cart";
import {formatAttr, imagePrefix, jumpToProduct} from "~/utils";
import {PRODUCT_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";

const router = useRouter();
const cartStore = useCartStore();
const { formatToCurrency } = useCurrencyStore();

</script>

<style scoped lang="scss">
.shopping-bag-scroll {
  max-height: 364px;

  .shopping-bag-list {
    .shopping-bag-item {
      .p-img {
        width: 87px;
        height: 87px;
        position: relative;

        .tip {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, .5);
          color: #fff;
          display: none;
        }
      }

      &.disabled .p-img{
        cursor: not-allowed;
        pointer-events: none;

        img {
          opacity: .5;
        }

        .tip {
          display: block;
        }
      }
    }

    .shopping-bag-item + .shopping-bag-item {
      margin-top: 20px;
    }
  }
}

</style>