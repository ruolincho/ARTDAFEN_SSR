<template>
  <NuxtLink class="blog-item" :to="`/blog-detail/${item.id}/${item.slug}`" target="_blank">
    <div class="overflow-hidden">
      <img
          class="w-full h-full fit-cover img-hover aspect-ratio-16_9"
          :src="imagePrefix(item.img)"
          :alt="item.title"
      >
    </div>
    <div class="acea-row row-between-wrapper mt-16 mb-10">
      <h1 class="text-22 f-bold-500 flex-1 line2 border-r-sm pr-md-20 pr-10">{{ item.title }}</h1>
      <div class="text-center px-md-20 px-10 text-gray-400">
      <span
          class="iconfont cursor-pointer text-20"
          :class="[item.like ? 'icon-follow-fill text-error' : 'icon-follow']"
          @click.prevent.stop="blogThumbs()"
      />
        <p class="text-14 mt-2">{{ item.likeVolume }}</p>
      </div>
    </div>
    <div class="text-14 acea-row gap-xs" v-if="item.labels.length">
    <span class="text-secondary cursor-pointer" v-for="(label, labelIndex) in item.labels" :key="labelIndex"
          @click.stop>#{{ label }}</span>
    </div>
    <div class="product-list mt-16" v-if="item.products.length">
      <NuxtLink
          class="product-item border-t-sm py-8 acea-row row-middle"
          :to="productLink(goods)"
          target="_blank"
          v-for="goods in item.products"
          :key="goods.id"
      >
        <div class="p-img mr-6">
          <img :src="imagePrefix(goods.img)" :alt="goods.title">
        </div>
        <div class="flex-1 overflow-hidden">
          <h1 class="line1 text-16">{{ goods.title }}</h1>
          <p class="line1 text-14 my-4 text-gray-400">{{ formatAttr(goods.labels) }}</p>
          <p class="text-14">{{ currencyStore.formatToCurrency(goods.retailPrice) }}</p>
        </div>
      </NuxtLink>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {imagePrefix, productLink} from "~/utils";
import type {IBlog} from "~/api/interface/blog/blog";
import {useCurrencyStore} from "~/stores/modules/currency";

const currencyStore = useCurrencyStore();

// 定义 Props
interface Props {
  item: IBlog.Row
}

const props = withDefaults(defineProps<Props>(), {
  item: () => ({}) as IBlog.Row,
});

const emit = defineEmits<{
  'thumbsClick': [value: IBlog.Row]
}>()

const blogThumbs = () => {
  emit('thumbsClick', props.item);
}
</script>

<style scoped lang="scss">
  .blog-item {
    display: block;

    .product-list {
      .product-item {
        .p-img {
          width: 60px;
          height: 60px;
        }
      }

    }
  }

  @media (max-width: 991px) {
    .product-item {
      .p-img {
        width: 50px;
        height: 50px;
      }
    }
  }
</style>