<template>
  <NuxtLink class="news-item" :to="`/magazine-detail/${item.id}/${item.slug}`" target="_blank">
    <div class="p-img overflow-hidden">
      <img class="w-full h-full object-cover img-hover aspect-video" :src="imagePrefix(item.img)" :alt="item.title">
    </div>
    <h2 class="text-22 mt-18 line-clamp-2">{{ item.title }}</h2>
    <p class="text-14 my-10 line-clamp-3">{{ item.subtitle || '- -' }}</p>
    <div class="acea-row row-middle gap-xs">
      <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
    </div>
    <div class="day text-30 font-200">{{ formatTimestamp(item.createTime, 'MMM Do YY') }}</div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import {formatTimestamp} from "~/utils/format";
import type {INews} from "~/api/interface/news/news";

// 定义 Props
interface Props {
  item: INews.Row
}

const { imagePrefix } = useImage()
const props = withDefaults(defineProps<Props>(), {
  item: () => ({}) as INews.Row,
});

</script>


<style scoped lang="scss">
  .news-item {
    position: relative;
    height: 100%;
    padding-bottom: 82px;
    display: block;

    .day {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  @media (max-width: 1259px) {
    .news-item {
      padding-bottom: 62px;
    }
  }
</style>