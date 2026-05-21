<template>
  <div class="my-15">

    <p class="acea-row row-middle mb-15">
      <span class="text-16">Frame: {{ sizeOption?.name }}</span>
    </p>

    <div :id="tourId">
      <div class="frame-list">
        <div
            class="frame-option border hover:border-3 hover:border-primary [&.on]:border-3 [&.on]:border-primary cursor-pointer overflow-hidden"
            :class="{ on: modelValue === item.id }"
            v-for="item in options" :key="item.id"
            @click="handleChange(item)"
        >
          <el-tooltip :content="item.name" placement="top" :hide-after="100">
            <img class="w-full h-full object-cover" v-lazy="imagePrefix(item.img!)" :alt="item.name">
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IPaint} from "~/api/interface/paint/paint";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useImage} from "~/composables/useImage";

const {imagePrefix} = useImage()

interface Props {
  modelValue: string;
  options: IPaint.CombinationParts[]
  sizeOption: IPaint.CombinationParts
  price: string | number
  tourId: string
}

const props = withDefaults(defineProps<Props>(), {
  price: 0,
  tourId: 'tour-step-frame'
})

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'change': [value: IPaint.CombinationParts]
}>()

const {formatToCurrency} = useCurrencyStore();

const handleChange = (item: IPaint.CombinationParts) => {
  emit('update:modelValue', item.id)
  emit('change', item)
}
</script>

<style scoped lang="scss">
  .frame-list {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 10px;

    .frame-option {
      width: 54px;
      height: 54px;
      flex-shrink: 0;

      img {
        transition: transform 0.3s ease ;
      }

      &.on,
      &:hover {
        img {
          transform: scale(0.9);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .frame-list {
      width: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;
    }
  }
</style>