<template>
  <div class="text-center lg:my-40 my-30">
    <h2 class="text-50">TRANSFORM YOUR PHOTOS INTO STUNNING ARTWORKS</h2>
    <p class="mt-20 text-gray-600 text-20 font-500">
      With Our Artists' Creation, Any Photo Can Be Turned Into An Elaborately Crafted Artwork. Choose From A Variety
      Of Unique Styles You Desire, And You'll Get Professional-Grade Results.
    </p>
  </div>
  <div class="row gap-row-base style-list">
    <div class="col-md-3 col-sm-4 col-6" v-for="item in themeOptions" :key="item.id">
      <div class="style-item" @click="chooseTheme(item.id)">
        <img class="p-img aspect-square" :src="imagePrefix(item.img)" alt="">
        <p class="p-text text-30">{{ item.name }}</p>
        <div class="p-btn border-white border-2">CUSTOMIZE NOW</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import type {IPaint} from "~/api/interface/paint/paint";

const { imagePrefix } = useImage()

// 定义 Props
interface Props {
  modelValue: string;
  themeOptions: IPaint.ThemeRow[];
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'choose': [id: string];
}>()

const chooseTheme = (id: string) => {
  emit("update:modelValue", id);
  emit('choose', id)
}

</script>

<style scoped lang="scss">
  .style-list {
    .style-item {
      position: relative;
      overflow: hidden;
      cursor: pointer;

      .p-img {
        width: 100%;
        transition: all 0.3s ease-in-out;
      }

      .p-text {
        position: absolute;
        z-index: 3;
        left: 0;
        top: 32%;
        width: 100%;
        text-align: center;
        color: #fff;
        font-weight: 500;
      }

      .p-btn {
        position: absolute;
        z-index: 3;
        left: 50%;
        bottom: 8.57%;
        transform: translateX(-50%);
        color: #fff;
        font-weight: 500;
        padding: 3.43%;
        white-space: nowrap;
      }

      &::before {
        content: "";
        position: absolute;
        z-index: 2;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
      }

      &:hover {
        .p-img {
          transform: scale(1.1);
        }
      }
    }
  }
</style>