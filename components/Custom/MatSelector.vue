<template>
  <div class="mat-selector">
    <div class="acea-row row-between-wrapper m-md-20 m-15">
      <div class="acea-row row-middle flex-1 mr-10">
        <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
        <span class="text-26">Choose a Canvas material</span>
      </div>
      <div class="text-20 f-bold">
        {{ formatToCurrency(materialOption?.price || 0) }}
      </div>
    </div>

    <div class="m-md-20 m-15" :id="tourId">
      <div class="material-wrapper border-sm p-md-20 p-15">

        <div class="acea-row row-middle text-20 f-bold-500">
          <p class="mr-xl-40 mr-20">Mat Color</p>
          <p class="flex-1 line1">{{ materialOption?.name }}</p>
        </div>
        <div class="color-list my-md-20 my-15">
          <div
              class="color-item rounded-full cursor-pointer"
              :class="{ on: matId === item.id }"
              :style="{ background: item.config?.matColor }"
              v-for="item in options"
              :key="item.id"
              @click="handleColorChange(item)"
          >
            <span v-if="item.id === ''" class="iconfont icon-close"></span>
          </div>
        </div>

        <template v-if="currentMaterialWidthOption.length">
          <div class="acea-row row-middle text-20 f-bold-500">
            <p class="mr-xl-40 mr-20">Mat Width</p>
            <p class="flex-1 line1">{{ matWidth }}″</p>
          </div>
          <div class="width-list row mt-md-20 mt-15">
            <div
                class="col-average"
                v-for="(item, index) in currentMaterialWidthOption"
                :key="index"
            >
              <div
                  class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"
                  :class="{ 'border-gray-700': matWidth === item.matWidth }"
                  @click="handleWidthChange(item.matWidth!)"
              >
                {{ item.matWidth }}″
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useCurrencyStore} from '~/stores/modules/currency'
import type {IPaint} from "~/api/interface/paint/paint";

const {formatToCurrency} = useCurrencyStore()

interface Props {
  matId: string;
  matWidth: string;
  options: IPaint.CombinationParts[]
  materialOption: IPaint.CombinationParts
  tourId: string
}

const props = withDefaults(defineProps<Props>(), {
  tourId: 'tour-step-mat'
})

// 声明双向绑定的 emit 事件
const emit = defineEmits(['update:matId', 'update:matWidth'])

// 当前卡纸宽度选项
const currentMaterialWidthOption = computed(() => props.materialOption?.specs || [])

const handleColorChange = (item: any) => {
  if (props.matId === item.id) return
  emit('update:matId', item.id)

  // 需要卡纸
  if (!!item.id) {
    // 没有选择卡纸宽度默认获取第一个卡纸宽度
    if (!props.matWidth && item.specs && item.specs.length > 0) emit('update:matWidth', item.specs[0].matWidth)
  }
  // 不需要卡纸
  else {
    emit('update:matWidth', '')
  }
}

const handleWidthChange = (width: string) => {
  if (props.matWidth === width) return
  emit('update:matWidth', width)
}
</script>

<style scoped lang="scss">
  .color-list {
    display: grid;
    grid-template-columns: repeat(8, 34px);
    row-gap: 20px;
    width: 100%;
    justify-content: space-between;

    .color-item {
      width: 34px;
      height: 34px;
      color: var(--color-gray-400);
      border: var(--border-width-md) solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size: 28px;
      }

      &.on {
        border-color: var(--color-gray-700);
        color: var(--color-gray-700);
      }
    }
  }

  .width-list {
    --gutter: var(--gutter-base);
    row-gap: var(--gutter);

    .width-item {
      width: 100%;
    }
  }

  @media (max-width: 1260px) {
    .color-list {
      grid-template-columns: repeat(6, 25px);
      row-gap: var(--gutter-sm);;

      .color-item {
        width: 25px;
        height: 25px;

        .iconfont {
          font-size: 16px;
        }
      }
    }

    .width-list {
      --gutter: var(--gutter-sm);
    }
  }
</style>