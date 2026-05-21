<template>
  <div class="my-15">
    <p class="acea-row row-middle mb-15">
      <span class="text-16">Additional Notes: </span>
      <SvgIcon name="info-fill" class="ml-8 cursor-pointer" @click="openNotice" style="font-size: 20px;" />
    </p>

    <div :id="tourId">
      <el-input
          type="textarea"
          v-model="internalValue"
          placeholder="Leave your specific instructions for our design team here."
          :rows="appStore.isPc ? 6 : 3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAppStore} from '~/stores/modules/app'
import { ElMessageBox } from 'element-plus';

const appStore = useAppStore()

interface Props {
  modelValue: string
  tourId: string
}

const props = withDefaults(defineProps<Props>(), {
  tourId: 'tour-step-remark'
})

const emit = defineEmits(['update:modelValue'])


const internalValue = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emit('update:modelValue', val)
  }
})

const openNotice = () => {
  ElMessageBox({
    title: 'Notice',
    message: 'Here is where you can convey any special requests to the artist, such as removing certain aspects in the photo or specific color and background preferences.',
  })
}
</script>


<style scoped lang="scss">
</style>