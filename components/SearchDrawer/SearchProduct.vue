<template>
  <div class="product-list">
    <NuxtLink
        class="product-item acea-row row-middle gap-base"
        v-for="item in list" :key="item.id"
        :to="productLink(item)"
        external
    >
      <div class="p-img bg-gray-100">
        <img :src="imagePrefix(item.img)" crossorigin="anonymous" :alt="item.title">
      </div>
      <div class="p-content flex-1 acea-row row-column gap-row-xs">
        <div class="author text-14">{{ item.creator?.name }}</div>
        <div class="title text-16 font-bold line-clamp-2" style="line-height: 1.5">{{ item.title }}</div>
        <div class="price text-14">
          <span>{{ formatToCurrency(item.retailPrice) }}</span>
          <span class="text-gray-400 line-through ml-5 text-14" v-if="item.retailPrice !== item.marketPrice">
            {{ formatToCurrency(item.marketPrice)}}
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {General} from "~/types/global";
import {productLink} from "~/utils";


interface Props {
  list: General.GoodsItem[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => ([]) as General.GoodsItem[],
});

const {imagePrefix} = useImage()
const { formatToCurrency } = useCurrencyStore();

</script>

<style scoped lang="scss">
.product-list {
  .product-item {
    .p-img {
      width: 96px;
      height: 96px;
      position: relative;

      @media (max-width: 768px) {
        width: 85px;
        height: 85px;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.38s ease-in-out;
      }
    }
  }

  .product-item + .product-item {
    margin-top: 15px;
  }
}
</style>