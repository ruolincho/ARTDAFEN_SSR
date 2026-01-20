<template>
  <div v-if="loading" class="data-state-loading" :class="wrapperClass">
    <slot name="loading">
      <div class="spinner"></div>
      <span class="mt-10 text-gray-500">loading...</span>
    </slot>
  </div>

  <div v-else-if="error" class="state-error" :class="wrapperClass">
    <slot name="error" :error="error" :retry="retry">
      <div class="text-center">
        <span class="iconfont icon-zhongduancuowuxinxi text-50"></span>
        <p class="text-14 my-20">{{ computedErrorText }}</p>
        <el-button v-if="retry" size="large" type="primary" @click="retry">TRY AGAIN</el-button>
      </div>
    </slot>
  </div>

  <div v-else-if="isEmpty" class="data-state-empty" :class="wrapperClass">
    <slot name="empty">
      <div class="text-center">
        <span class="iconfont icon-empty text-50"></span>
        <p class="text-20 f-bold mt-20">No Data</p>
        <p class="text-14 my-20">{{ emptyText }}</p>
      </div>
    </slot>
  </div>

  <div v-else class="data-state-content">
    <slot/>
  </div>
</template>

<script setup lang="ts">
/**
 * 用于处理页面数据的 加载中 / 错误信息/ 空数据 / 正常显示 三种状态
 * 状态优先级: Loading -> Error -> Empty -> Content
 */

interface Props {
  // 是否正在加载
  loading?: boolean
  // 错误状态 (可以是布尔值，也可以是 Error 对象)
  error?: any
  // 错误提示文案
  errorText?: string
  // 重试事件 (如果传入该函数，会显示"点击重试"按钮)
  retry?: () => void | Promise<void>
  // 是否为空数据 (当 loading 为 false 时生效)
  isEmpty?: boolean
  // 空状态时的提示文字
  emptyText?: string
  // 容器的自定义类名 (用于控制高度、居中等)
  wrapperClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  errorText: 'Loading fails check the network or try again.',
  isEmpty: false,
  emptyText: 'No data found, please check the query or try again later.',
  wrapperClass: 'min-h-[300px] acea-row row-column row-center-wrapper' // 默认给一个最小高度和居中
})

// 处理显示的错误信息：优先显示后端返回的 message，否则显示默认文案
const computedErrorText = computed(() => {
  if (props.error && typeof props.error === 'object' && props.error.message) {
    return props.error.message
  }
  return props.errorText
})
</script>

<style lang="scss" scoped></style>