<template>
  <div class="acea-row row-between-wrapper m-md-20 m-15">
    <div class="acea-row row-middle flex-1 mr-10">
      <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
      <span class="text-26">Choose a Size</span>
      <span
          class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
          @click="showInfo = !showInfo"
      >
        <span class="pc">{{ showInfo ? 'LESS INFO' : 'MORE INFO' }}</span>
        <span class="iconfont icon-down" :class="{'rotate-180': showInfo}"></span>
      </span>
    </div>
    <div class="text-20 f-bold">{{ formatToCurrency(sizeOption?.price || 0) }}
    </div>
  </div>
  <div class="mx-20 text-16 info-box" v-show="showInfo">
    <p class="p-15 bg-gray-200">
      To order a custom size,
      <a :href="`mailto:${CONTACT_EMAIL}`" class="text-underline cursor-pointer">click here</a>.
      Our artists will create a painting in any size you require.
    </p>
  </div>
  <div class="m-md-20 m-15" :id="tourId">
    <el-select
        class="custom-select"
        :model-value="modelValue"
        placeholder="Please Select Size"
        size="large"
        @change="handleChange"
    >
      <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
      >
        <div class="option-item acea-row row-between-wrapper">
          <span>{{ item.name }}</span>
          <span>{{ formatToCurrency(item.price || 0) }}</span>
        </div>
      </el-option>
      <template #prefix>
        <div class="size-prefix"></div>
      </template>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import {useCurrencyStore} from "~/stores/modules/currency";
import {CONTACT_EMAIL} from "~/config";
import type {IPaint} from "~/api/interface/paint/paint";

interface Props {
  modelValue: string;
  options: IPaint.CombinationParts[]
  sizeOption: IPaint.CombinationParts
  tourId: string
}

const props = withDefaults(defineProps<Props>(), {
  tourId: 'tour-step-size'
})

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'change': [value: string]
}>()

const {formatToCurrency} = useCurrencyStore();

const showInfo = ref(false)

const handleChange = (val: string) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped lang="scss">
</style>