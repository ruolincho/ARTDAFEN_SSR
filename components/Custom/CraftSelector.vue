<template>
  <div class="craft-selector-wrapper">
    <div class="acea-row row-between-wrapper m-md-20 m-15">
      <div class="acea-row row-middle flex-1 mr-10">
        <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
        <span class="text-26">Choose a Craft</span>
      </div>
    </div>
    <div class="m-md-20 m-15" :id="tourId">
      <div class="width-list row">
        <div
            class="col-6"
            v-for="(item, index) in options"
            :key="index"
        >
          <div
              class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"
              :class="{ 'border-gray-700': modelValue === item[valueKey] }"
              @click="handleClick(item)"
          >
            <span>{{ item[labelKey] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  modelValue: string | number | boolean
  options: Array<Record<string, any>>
  labelKey?: string
  valueKey?: string
  tourId?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  tourId: 'tour-step-craft'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean];
  'change': [value: Record<string, any>]
}>()

const handleClick = (item: Record<string, any>) => {
  const value = item[props.valueKey]
  if (props.modelValue === value) return
  emit('update:modelValue', value)
  emit('change', item)
}
</script>

<style scoped lang="scss">
  .width-list {
    --gutter: var(--gutter-base);
    row-gap: var(--gutter);

    .width-item {
      width: 100%;
    }
  }

  @media (max-width: 1260px) {
    .width-list {
      --gutter: var(--gutter-sm);
    }
  }
</style>