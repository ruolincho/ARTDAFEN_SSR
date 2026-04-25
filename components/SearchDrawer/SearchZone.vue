<template>
  <div class="artist-list">
    <NuxtLink
        class="artist-item overflow-hidden"
        v-for="item in list"
        :key="item.id"
        :to="`/zone-detail/${item.id}/${item.slug}`"
        external
    >
      <div class="img-wrapper overflow-hidden">
        <el-image class="w-full img-hover" fit="cover" :src="imagePrefix(item.img)" :alt="item.name" lazy/>
      </div>
      <p class="text-center text-20 f-bold-500 mt-15 line1">{{ item.name }}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import type {IProduct} from "~/api/interface/product/product";

interface Props {
  list: IProduct.ZoneRow[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => ([]) as IProduct.ZoneRow[],
});

const {imagePrefix} = useImage()

</script>

<style scoped lang="scss">
  .artist-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 25px;

    .artist-item {

    }
  }
</style>