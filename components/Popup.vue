<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="overlay-fade">
        <div v-if="modelValue" class="popup-overlay" @click="closePopup">
          <Transition name="popup-slide">
            <div
                class="popup-content"
                ref="popup"
                @click.stop
                :style="{
              transform: `translateY(${translateY}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }"
            >
              <div
                  class="drag-handle"
                  ref="dragHandle"
                  @mousedown="startDrag"
                  @touchstart.passive="startDrag"
              ></div>

              <div class="popup-body scroll-hide scroll-y">
                <slot></slot>
              </div>

              <div class="popup-footer" v-if="$slots.footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {onUnmounted, ref, toRef} from "vue";
import {useLockScroll} from "~/composables/useLockScroll";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const popup = ref<HTMLElement | null>(null);
const dragHandle = ref<HTMLElement | null>(null);

// 拖拽状态与位置记录
const translateY = ref<number>(0);
const isDragging = ref<boolean>(false);
let startY = 0;
let currentOffset = 0;
let hasMoved = false; // 用于区分是点击还是拖拽

const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  hasMoved = false; // 重置移动状态

  if (event instanceof MouseEvent) {
    startY = event.clientY;
  } else if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
    startY = event.touches[0].clientY;
  }

  currentOffset = translateY.value;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", onDrag, {passive: false}); // 允许 e.preventDefault() 视情况使用
  document.addEventListener("touchend", stopDrag);
};

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  let deltaY = 0;
  if (event instanceof MouseEvent) {
    deltaY = event.clientY - startY;
  } else if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
    deltaY = event.touches[0].clientY - startY;
  }

  // 移动距离大于 3px 才认为是真正的拖拽，防止手指轻微抖动被误判
  if (Math.abs(deltaY) > 3) {
    hasMoved = true;
  }

  if (deltaY > 0) {
    // 使用 requestAnimationFrame 优化渲染频率，进一步提升移动端流畅度
    requestAnimationFrame(() => {
      translateY.value = currentOffset + deltaY;
    });
  }
};

const stopDrag = () => {
  isDragging.value = false;

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);

  // 如果没有发生明显位移，判定为“点击”操作
  if (!hasMoved) {
    closePopup();
    return;
  }

  // 根据拖拽距离决定是关闭还是回弹
  if (translateY.value > 50) {
    closePopup();
  } else {
    translateY.value = 0; // 此时 isDragging 为 false，会自动带有过渡动画回弹
  }
};

const closePopup = (): void => {
  emit("update:modelValue", false);
  // 延迟重置 translateY，等待关闭动画完成，避免闪烁
  setTimeout(() => {
    translateY.value = 0;
  }, 300);
};

onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
});

// 监听 visible 变化 锁定滚动
useLockScroll(toRef(props, 'modelValue'));
</script>

<style scoped lang="scss">
  .popup-overlay {
    position: fixed;
    z-index: 122;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .popup-content {
      width: 100%;
      height: 75vh;
      background: white;
      border-radius: 16px 16px 0 0;
      padding: 8px 20px;
      position: relative;
      display: flex;
      flex-direction: column;

      .drag-handle {
        width: 40px;
        height: 5px;
        background: #ccc;
        border-radius: 3px;
        margin: 0 auto 8px;
        cursor: grab;
        flex-shrink: 0;
        touch-action: none;

        &:active {
          cursor: grabbing;
        }
      }

      .popup-body {
        flex: 1;
      }

      .popup-footer {
        flex-shrink: 0;
        width: 100%;
      }
    }
  }

  .popup-slide {
    &-enter-active, &-leave-active {
      transition: transform 0.3s ease-out;
    }

    &-enter-from, &-leave-to {
      transform: translateY(100%) !important;
    }
  }

  .overlay-fade {
    &-enter-active, &-leave-active {
      transition: opacity 0.3s ease;
    }

    &-enter-from, &-leave-to {
      opacity: 0;
    }
  }
</style>