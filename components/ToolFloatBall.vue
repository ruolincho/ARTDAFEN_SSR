<template>
  <div
      class="float-ball-container"
      :style="containerStyle"
      ref="containerRef"
  >
    <TransitionGroup name="ball-pop">
      <div v-if="isOpen" class="ball-list">
        <div
            v-for="(item, index) in actions"
            :key="item.name"
            class="ball-item-wrapper"
            :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <button
              class="ball-item-default"
              @click.stop="handleAction(item)"
              @touchend.stop.prevent="handleAction(item)"
          >
            <slot :name="item.name" :item="item">
              <SvgIcon v-if="typeof item.icon === 'string'" :name="item.icon" />
              <component v-else-if="item.icon" :is="item.icon" class="icon-svg" />
              <span v-else>{{ item.label }}</span>
            </slot>
          </button>
          <div class="ball-tooltip">{{ item.label }}</div>
        </div>
      </div>
    </TransitionGroup>

    <button
        class="ball-main-btn"
        :class="{ 'is-active': isOpen }"
        @click.stop="isOpen = !isOpen"
        @touchend.stop.prevent="isOpen = !isOpen"
    >
      <span class="plus-icon"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface ActionItem {
  name: string    // 唯一标识，也是插槽名
  label: string   // 提示文字
  icon?: any      // 可以是 'icon-xxx' 字符串，也可以是组件对象
  handler?: () => void
}

const props = withDefaults(defineProps<{
  actions: ActionItem[]
  zIndex?: number | string
  position?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
}>(), {
  zIndex: 100,
  position: () => ({ bottom: '20px', right: '20px' })
})

const isOpen = ref(true)
const containerRef = ref<HTMLElement | null>(null)

const containerStyle = computed(() => ({
  zIndex: props.zIndex,
  ...props.position
}))

const handleAction = (item: ActionItem) => {
  if (item.handler) item.handler()
  // isOpen.value = false
}

// 点击外部自动收起
// const handleClickOutside = (event: MouseEvent) => {
//   if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
//     isOpen.value = false
//   }
// }
//
// onMounted(() => {
//   document.addEventListener('click', handleClickOutside)
// })
//
// onUnmounted(() => {
//   document.removeEventListener('click', handleClickOutside)
// })
</script>

<style scoped>
  .float-ball-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
  }

  .ball-list {
    display: flex;
    flex-direction: column-reverse; /* 从下往上排 */
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
  }

  .ball-item-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }

  /* 默认按钮样式 */
  .ball-item-default {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
    background: #ffffff;
    color: #606266;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
  }

  /* 主按钮 */
  .ball-main-btn {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--color-primary);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
  }

  .ball-main-btn.is-active {
    transform: rotate(135deg);
    background: #f56c6c;
    box-shadow: 0 4px 12px rgba(245, 108, 108, 0.4);
  }

  .plus-icon {
    width: 20px;
    height: 2px;
    background: white;
    position: relative;
  }

  .plus-icon::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 20px;
    background: white;
    left: 9px;
    top: -9px;
  }

  /* Tooltip 提示 */
  .ball-tooltip {
    position: absolute;
    right: 55px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(48, 49, 51, 0.9);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
  }

  /* 动画 */
  .ball-pop-enter-active,
  .ball-pop-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .ball-pop-enter-from,
  .ball-pop-leave-to {
    opacity: 0;
    transform: translateY(15px) scale(0.5);
  }

  .icon-svg {
    width: 20px;
    height: 20px;
  }

  @media (hover: hover) {
    .ball-item-default:hover {
      color: #FFFFFF;
      border-color: var(--color-gray-600);
      background-color: var(--color-gray-700);
      transform: translateY(-2px);
    }

    .ball-item-wrapper:hover .ball-tooltip {
      opacity: 1;
      transform: translateY(-50%) translateX(-5px);
    }
  }

  @media (max-width: 768px) {
    .ball-main-btn {
      width: 42px;
      height: 42px;
    }

    .plus-icon {
      transform: scale(0.8);
    }

    .ball-list[data-v-06cc837c] {
      gap: 6px;
    }

    .ball-item-default {
      width: 36px;
      height: 36px;
    }

  }
</style>

<style>
  .ball-item-default .iconify {
    font-size: 20px;
  }
</style>