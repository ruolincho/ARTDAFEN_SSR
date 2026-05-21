<template>
  <div class="expandable-wrapper" :class="{ open: modelValue }">
    <!-- Header -->
    <div class="py-20 border-t  cursor-pointer" @click="toggle">
      <slot name="header" :open="modelValue" :toggle="toggle">
        <!-- 默认 Header -->
        <div class="expandable-header acea-row row-between-wrapper uppercase">
          <span class="font-bold flex-1 header-text">{{ title }}</span>
          <div class="header-icon">
            <SvgIcon name="down" />
          </div>
        </div>
      </slot>
    </div>

    <!-- Main -->
    <div
        class="expandable-main pb-20"
        @transitionend="onTransitionEnd"
        v-show="mainVisible"
    >
      <div class="inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ============================================
 * Expandable
 * ============================================
 *
 * 可折叠容器组件（支持 SSR / grid 动画）
 *
 * Props
 * --------------------------------------------
 * @prop modelValue boolean
 *    - v-model，控制展开 / 收起
 *
 * @prop title string (optional)
 *    - 默认 Header 标题（未使用 header slot 时）
 *
 * Slots
 * --------------------------------------------
 * @slot header
 *    - 自定义 Header
 *    - 暴露参数：
 *        open   : boolean   当前是否展开
 *        toggle : () => void  切换展开状态
 *
 * @slot default
 *    - 内容区域
 *
 * Usage
 * --------------------------------------------
 * ```vue
 * <Expandable v-model="open" title="测试">
 *   <template #header="{ open, toggle }">
 *     <div class="acea-row row-between-wrapper">
 *       <span class="font-bold">测试</span>
 *       <span
 *         class="iconfont"
 *         :class="open ? 'icon-up' : 'icon-down'"
 *         @click="toggle"
 *       />
 *     </div>
 *   </template>
 *
 *   <div class="overflow-y-auto overflow-x-hidden" style="max-height: 300px;">
 *     <div v-for="item in 10" :key="item">
 *       {{ item }}
 *     </div>
 *   </div>
 * </Expandable>
 * ```
 *
 * Notes
 * --------------------------------------------
 * - 展开时：先显示内容，再触发展开动画
 * - 收起时：动画结束后才移除内容（display:none）
 * - SSR 下服务端始终渲染内容，避免 hydration mismatch
 */

/**
 * Props
 *
 * @prop modelValue - 是否展开（v-model）
 * @prop title      - 默认 Header 标题（未使用 header slot 时生效）
 */
interface Props {
  modelValue: boolean;
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: 'Title'
});

/**
 * Emits
 *
 * @event update:modelValue - 展开状态变化
 */
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>()

/**
 * mainVisible
 * -----------------------------
 * 控制 expandable-main 是否 display
 *
 * 规则：
 * - 打开时：先 display → 再触发展开动画
 * - 关闭时：先执行动画 → transitionend 后再 display:none
 *
 * SSR：
 * - 服务端强制为 true，保证结构一致
 */
const isClient = import.meta.client
const mainVisible = ref(isClient ? props.modelValue : true)

/**
 * 同步外部 v-model 变更
 * （防止父组件直接修改 modelValue 导致 display 不一致）
 */
watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        mainVisible.value = true
      }
    }
)

/**
 * toggle
 * -----------------------------
 * 切换展开状态
 *
 * 行为：
 * - 打开：立即显示内容，再更新 modelValue
 * - 关闭：立即更新 modelValue，display 延迟到动画结束
 *
 * 暴露给 header slot 使用
 */
const toggle = () => {
  if (!props.modelValue) {
    // 打开：先显示内容，再触发展开动画
    mainVisible.value = true
    requestAnimationFrame(() => {
      emit('update:modelValue', true)
    })
  } else {
    // 关闭：先收起动画，display 延后
    emit('update:modelValue', false)
  }
}

/**
 * transitionend 回调
 *
 * 仅监听 grid-template-rows
 * 用于在收起动画完成后移除内容（display:none）
 */
const onTransitionEnd = (e: TransitionEvent) => {
  if (e.propertyName !== 'grid-template-rows') return
  if (!props.modelValue) {
    mainVisible.value = false
  }
}
</script>

<style scoped lang="scss">
  .expandable-wrapper {

    .expandable-header {
      .header-text {
        font-size: 14px;
      }

      .header-icon {
        width: 24px;
        height: 24px;
        background: #e8e8e8;
        border-radius: 50%;
        transition: all .2s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;

        .iconify {
          font-size: 12px;
        }
      }

      &:hover {
        .header-icon {
          background: var(--color-primary);
          color: #fff;
        }
      }
    }

    .expandable-main {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease-out;

      .inner {
        overflow: hidden;
      }
    }

    &.open {

      .expandable-header .header-icon {
        transform: rotate(180deg);
      }

      .expandable-main {
        grid-template-rows: 1fr;
      }
    }
  }
</style>
