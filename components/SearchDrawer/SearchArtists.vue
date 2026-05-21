<template>
  <div class="artist-list">
    <NuxtLink
        class="artist-item overflow-hidden"
        v-for="item in list"
        :key="item.id"
        :to="`/artist-detail/${item.id}/${item.slug}`"
        external
    >
      <div class="img-wrapper rounded-full aspect-square overflow-hidden">
        <el-image class="w-full h-full img-hover" fit="cover" :src="imagePrefix(item.portrait)" :alt="item.name" lazy/>
      </div>
      <p class="text-center text-20 font-500 mt-15 truncate">{{ item.name }}</p>
    </NuxtLink>
  </div>


</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import type {ObjectNode} from "~/types/global";

interface Props {
  list: ObjectNode.Creator[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => ([]) as ObjectNode.Creator[],
});

const {imagePrefix} = useImage()

</script>

<style scoped lang="scss">
  .artist-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;

    .artist-item {
    }
  }

  @media (max-width: 768px) {
    .artist-list {
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
  }
</style>