<template>
  <div class="product-item">
    <div class="relative aspect-ratio">
      <NuxtLink class="img-wrapper bg-gray-100 w-full h-full block" :to="productLink(item)">
        <img v-lazy="imagePrefix(item.img)" :alt="`Hand-painted ${item.title} oil painting reproduction by ${item.creator?.name}`">
      </NuxtLink>
      <div class="tags-wrapper acea-row row-between-wrapper" v-if="item.techniqueId === TechniqueCodeEnum.Originals">
        <div class="p-tag bg-gray-700" v-if="item.status === '0'">For Sale</div>
        <div class="p-tag bg-error" v-if="item.status === '-1'">Sale Out</div>
      </div>
      <div class="operation rounded-full p-5">
        <span
            class="iconfont text-24 cursor-pointer"
            :class="[item.like ? 'icon-follow-fill text-error' : 'icon-follow text-primary']"
            @click="productThumbs()"
        />
      </div>
      <div class="num acea-row row-center-wrapper text-20" v-if="index">{{ index }}</div>
    </div>
    <div class="content-wrapper">
      <p class="my-8 line1 cursor-pointer text-hover">
        <span class="text-16 f-bold" @click.stop="handleClickArtist()">
          {{ item.creator?.name }}
        </span>
        <span class="iconfont icon-right text-16"></span>
      </p>
      <NuxtLink class="line2 text-14 block text-hover" :to="productLink(item)">{{ item.title }}</NuxtLink>
      <p class="my-8">
        <span class="text-16 f-bold">
          {{ formatToCurrency(item.retailPrice) }}
        </span>
        <span class="text-gray-400 text-through ml-5 text-14" v-if="item.retailPrice !== item.marketPrice">
          {{ formatToCurrency(item.marketPrice)}}
        </span>
      </p>
      <div class="acea-row gap-xs">
        <div class="p-tag bg-gray-400" v-for="label in item.labels" :key="label">{{ label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {productLink} from "~/utils";
import {TechniqueCodeEnum} from "~/types/enumeration";
import type { General, ObjectNode} from "~/types/global";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useImage} from "~/composables/useImage";

// 定义 Props
interface Props {
  item: General.GoodsItem
  index: number
}

const { imagePrefix } = useImage()
const props = withDefaults(defineProps<Props>(), {
  item: () => ({}) as General.GoodsItem,
  index: 0
});

const emit = defineEmits<{
  'thumbsClick': [value: General.GoodsItem]
  'artistClick': [value: ObjectNode.Creator]
}>()

const { formatToCurrency } = useCurrencyStore();

const productThumbs = () => {
  emit('thumbsClick', props.item);
}

const handleClickArtist = () => {
  emit('artistClick', props.item.creator);
}

</script>

<style scoped lang="scss">
  .product-item {
    .img-wrapper {
      position: relative;

      img {
        max-width: 95%;
        max-height: 95%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .tags-wrapper {
      position: absolute;
      left: 10px;
      bottom: 10px;
    }

    .operation {
      position: absolute;
      right: 10px;
      bottom: 10px;
      background: #fff;
    }

    .num {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      background: var(--color-primary);
      width: 42px;
      height: 42px;
    }

    .p-tag {
      padding: 4px;
      font-size: 10px;
      color: #fff;
    }
  }

  @media (max-width: 414px) {
    .product-item .num {
      width: 30px;
      height: 30px;
    }
  }
</style>