<template>
  <div class="my-15">

    <p class="acea-row row-middle mb-15">
      <span class="text-16">Size: {{ sizeOption?.name }}</span>
      <SvgIcon name="info-fill" class="text-20 ml-8 cursor-pointer" @click="openNotice" />
    </p>

    <div :id="tourId">
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
  </div>
</template>

<script setup lang="ts">
import {useCurrencyStore} from "~/stores/modules/currency";
import {CONTACT_EMAIL} from "~/config";
import type {IPaint} from "~/api/interface/paint/paint";
import { ElMessageBox } from 'element-plus';

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

const handleChange = (val: string) => {
  emit('update:modelValue', val)
  emit('change', val)
}

const openNotice = () => {
  ElMessageBox({
    title: 'Notice',
    message: h('p', null, [
      h('span', null, 'To order a custom size, '),
      h('a', {
        href: `mailto:${CONTACT_EMAIL}`,
        class: 'text-underline cursor-pointer'
      }, 'click here'),
      h('span', null, '. Our artists will create a painting in any size you require.'),
    ]),
  })
}
</script>

<style scoped lang="scss">
</style>