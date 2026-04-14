<template>
  <div class="my-15">
    <p class="acea-row row-middle mb-15">
      <span class="text-16">Mat Color & Size: {{ materialOption?.name }} / {{ matWidth || 0 }}″</span>
    </p>

    <div class="my-15" :id="tourId">
      <div class="color-picker">
        <div
            class="color-option cursor-pointer overflow-hidden"
            :class="{ on: matId === item.id }"
            v-for="item in options" :key="item.id"
            @click="handleColorChange(item)"
        >
          <el-tooltip :content="item.name" placement="top" :hide-after="100">
            <div
                class="w-full h-full"
                :class="{ none: !item.config?.matColor }"
                :style="{ background: item.config?.matColor }"
            />
          </el-tooltip>
        </div>
      </div>

      <div class="size-picker mt-15" v-if="currentMaterialWidthOption.length">
        <div
            class="size-option cursor-pointer text-14"
            :class="{ 'on': matWidth === item.matWidth }"
            v-for="(item, index) in currentMaterialWidthOption" :key="index"
            @click="handleWidthChange(item.matWidth!)"
        >
          {{ item.matWidth }}″
        </div>
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
const emit = defineEmits(['update:matId', 'update:matWidth', 'change'])

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
  emit('change')
}

const handleWidthChange = (width: string) => {
  if (props.matWidth === width) return
  emit('update:matWidth', width)
  emit('change')
}
</script>

<style scoped lang="scss">
  .color-picker {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 10px;

    .color-option {
      width: 34px;
      height: 34px;
      border: var(--border-width-sm) solid var(--color-gray-300);

      &.on,
      &:hover {
        border-color: var(--color-gray-700);
        border-width: var(--border-width-md);


      }

      .none {
        background: repeating-linear-gradient(
                -45deg,
                #ffffff,
                #ffffff 4px,
                #cccccc 4px,
                #cccccc 5px
        );
      }
    }
  }

  .size-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .size-option {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 36px;
      padding: 0 12px;
      border: var(--border-width-sm) solid var(--color-gray-300);

      &.on,
      &:hover {
        border-color: var(--color-gray-700);
        border-width: var(--border-width-md);
      }
    }
  }
</style>