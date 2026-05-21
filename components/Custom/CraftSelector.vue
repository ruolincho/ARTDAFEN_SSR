<template>
  <div class="my-15">
    <p class="acea-row row-middle mb-15">
      <span class="text-16">Artwork Style: {{ option?.craft }}</span>
    </p>

    <div :id="tourId">
      <div class="width-list row">
        <div
            class="col-6"
            v-for="(item, index) in options"
            :key="index"
        >
          <div
              class="width-item border acea-row row-center-wrapper cursor-pointer text-14 md:py-15 py-10"
              :class="{ 'border-primary': modelValue === item[valueKey] }"
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
  option: Record<string, any>
  labelKey?: string
  valueKey?: string
  tourId?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  option: () => {},
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