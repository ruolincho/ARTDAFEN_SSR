<template>
  <div class="my-15">
    <p class="acea-row row-middle mb-15">
      <span class="text-16">{{ themeName }} Count: {{ modelValue }}</span>
      <span class="iconfont icon-info-fill text-20 ml-8 cursor-pointer" @click="openNotice"></span>
    </p>

    <div :id="tourId">
      <!-- Pc端复杂程度选择 -->
      <div class="size-picker" v-if="appStore.isPc">
        <div
            class="size-option cursor-pointer text-14"
            :class="{ 'on': modelValue === item }"
            v-for="(item, index) in maxNumber" :key="index"
            @click="handleChange(item)"
        >
          {{ item }}
        </div>
      </div>
      <!-- 移动端复杂程度选择 -->
      <div class="acea-row row-between-wrapper gap-base" v-else>
        <div class="flex-1">
          <el-slider
              :show-tooltip="false"
              v-model="sliderValue"
              :step="1"
              :max="maxNumber"
              :min="1"
              show-stops
          />
        </div>
        <div class="flex-auto f-bold">{{ sliderValue }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAppStore} from "~/stores/modules/app";
import {debounce} from "~/utils";
import { ElMessageBox } from 'element-plus';

interface Props {
  modelValue: number
  maxNumber: number
  themeName: string
  tourId: string
}

const props = withDefaults(defineProps<Props>(), {
  maxNumber: 10,
  tourId: 'tour-step-complexity'
})

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>()

const appStore = useAppStore()


const handleChange = (num: number) => {
  if (props.modelValue === num) return
  emit('update:modelValue', num) // 更新父组件 v-model
}

// --- 移动端逻辑：内部状态同步 + 防抖派发 ---
// 1. 本地状态，保障滑块拖拽时的 120fps 丝滑体验
const localSliderValue = ref(props.modelValue)

// 2. 监听外部传入的值（防止外部重置数据时，滑块没对齐）
watch(() => props.modelValue, (newVal) => {
  if (newVal !== localSliderValue.value) {
    localSliderValue.value = newVal
  }
})

// 3. 核心：封装一个防抖的事件派发器
const debouncedEmitChange = debounce((val: number) => {
  emit('update:modelValue', val)
}, 150)

// 4. 计算属性，服务于 el-slider
const sliderValue = computed({
  get: () => localSliderValue.value,
  set: (val: number) => {
    localSliderValue.value = val // [立即执行] 内部状态瞬间更新，滑块不卡顿
    debouncedEmitChange(val)     // [延迟执行] 150ms 后告诉父级真正改变了
  }
})

const openNotice = () => {
  ElMessageBox({
    title: 'Notice',
    message: 'Please select the number of figures in your photo. Each person or pet/animal in a photo would be counted as one figure. Houses, cars, boats and travel scenery would each count as one figure.',
  })
}
</script>

<style scoped lang="scss">
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