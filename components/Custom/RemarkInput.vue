<template>
  <div class="acea-row row-between-wrapper m-md-20 m-15">
    <div class="acea-row row-middle">
      <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
      <span class="text-26">Additional Notes</span>
      <span
          class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
          @click="showInfo = !showInfo"
      >
        <span class="pc">{{ showInfo ? 'LESS INFO' : 'MORE INFO' }}</span>
        <span class="iconfont icon-down" :class="{'rotate-180': showInfo}"></span>
      </span>
    </div>
    <div class="text-20 f-bold"></div>
  </div>
  <div class="mx-20 text-16 info-box" v-show="showInfo">
    <p class="p-15 bg-gray-200">
      Here is where you can convey any special requests to the artist, such as removing certain aspects
      in
      the
      photo or specific color and background preferences.
    </p>
  </div>
  <div class="m-md-20 m-15" :id="tourId" ref="remarkRef">
    <el-input
        type="textarea"
        v-model="internalValue"
        placeholder="Please enter any additional instructions"
        :rows="appStore.isPc ? 8 : 3"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {useAppStore} from '~/stores/modules/app'

const appStore = useAppStore()

interface Props {
  modelValue: string
  tourId: string
}

const props = withDefaults(defineProps<Props>(), {
  tourId: 'tour-step-remark'
})

const emit = defineEmits(['update:modelValue'])

const showInfo = ref(false)

const internalValue = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emit('update:modelValue', val)
  }
})
</script>


<style scoped lang="scss">
</style>