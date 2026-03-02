<template>
  <div class="acea-row row-between-wrapper m-md-20 m-15">
    <div class="acea-row row-middle">
      <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
      <span class="text-26">Count of {{ themeName }}</span>
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
      Please select the number of figures in your photo. Each person or pet/animal in a photo would be
      counted
      as one figure. Houses, cars, boats and travel scenery would each count as one figure.
    </p>
  </div>

  <!-- Pc端复杂程度选择 -->
  <div class="m-md-20 m-15" v-if="appStore.isPc">
    <div class="width-list row" :id="tourId">
      <div
          class="col-xl-average col-md-3 col-xs-4 col-6"
          v-for="(item, index) in maxNumber"
          :key="index"
      >
        <div
            class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-20"
            :class="{'border-gray-700': modelValue === item}"
            @click="handleChange(item)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 移动端复杂程度选择 -->
  <div class="px-20 acea-row row-between-wrapper gap-base" :id="tourId" v-else>
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

</template>

<script setup lang="ts">
import {useAppStore} from "~/stores/modules/app";
import {debounce} from "~/utils";

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

const showInfo = ref(false)

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