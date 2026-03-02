<template>
  <div class="acea-row row-between-wrapper m-md-20 m-15">
    <div class="acea-row row-middle flex-1 mr-10">
      <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
      <span class="text-26">Choose a Frame</span>
    </div>
    <div class="text-20 f-bold">{{ formatToCurrency(price) }}</div>
  </div>
  <div class="m-md-20 m-15" :id="tourId">
    <div class="frame-scroll border-sm p-10">
      <div class="frame-list">
        <div
            v-for="item in options" :key="item.id"
            class="frame-item text-14 bg-gray-100 p-5 cursor-pointer"
            :class="{ on: modelValue === item.id }"
            @click="handleChange(item)"
        >
          <div class="frame-box">
            <div class="frame-img aspect-ratio">
              <img class="w-full h-full fit-cover" :src="imagePrefix(item.img!)" :alt="item.name">
            </div>
            <p class="line2 mt-10 frame-name">{{ item.name }}</p>
            <p class="f-bold-500 frame-money">
              {{ formatToCurrency((Number(item.price) + Number(item.surcharge)) || 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IPaint} from "~/api/interface/paint/paint";
import {useCurrencyStore} from "~/stores/modules/currency";
import {imagePrefix} from "~/utils";

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
  .frame-scroll {
    max-height: 427px;
    overflow: auto;

    .frame-list {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 10px;

      .frame-item {
        position: relative;
        background: var(--color-gray-100);

        .frame-box {
          padding-bottom: 25px;

          .frame-money {
            position: absolute;
            left: 5px;
            bottom: 5px;
          }
        }

        &.on {
          background: var(--color-gray-700);
          color: #fff;
        }
      }
    }
  }

  @media (max-width: 1460px) {
    .frame-scroll {
      .frame-list {
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 5px;
      }
    }
  }

  @media (max-width: 1260px) {
    .frame-scroll {
      max-height: 350px;

      .frame-list {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  @media (max-width: 768px) {
    .frame-scroll {
      max-height: unset;

      .frame-list {
        display: flex;
        grid-template-columns: unset;
        flex-wrap: nowrap;

        .frame-item {
          width: 65px;
          flex-shrink: 0;
        }

      }
    }
  }

</style>