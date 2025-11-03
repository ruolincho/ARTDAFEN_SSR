<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="modelValue" class="popup-overlay" @click="closePopup">
        <Transition name="popup-slide">
          <div
            class="popup-content"
            ref="popup"
            @click.stop
            :style="{ transform: `translateY(${translateY}px)` }"
          >
            <div class="drag-handle" ref="dragHandle" @mousedown="startDrag" @touchstart="startDrag"></div>
            <!-- slot 内容区域放在一个单独的容器中，便于滚动 -->
            <div class="popup-body scroll-hide scroll-y">
              <slot></slot>
            </div>
            <!-- popup-footer -->
            <div class="popup-footer" v-if="$slots.footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from "vue";
import {useLockScroll} from "~/composables/useLockScroll";

// 父组件控制显示与否
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const popup = ref<HTMLElement | null>(null);
const dragHandle = ref<HTMLElement | null>(null);
const translateY = ref<number>(0);
let startY = 0;
let currentOffset = 0;

const startDrag = (event: MouseEvent | TouchEvent) => {
  // 兼容 PC 和移动端
  if (event instanceof MouseEvent) {
    startY = event.clientY;
  } else if (event instanceof TouchEvent) {
    startY = event.touches[0].clientY;
  }
  currentOffset = translateY.value;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("touchend", stopDrag);
};

const onDrag = (event: MouseEvent | TouchEvent) => {
  let deltaY = 0;
  if (event instanceof MouseEvent) {
    deltaY = event.clientY - startY;
  } else if (event instanceof TouchEvent) {
    deltaY = event.touches[0].clientY - startY;
  }

  if (deltaY > 0) {
    translateY.value = currentOffset + deltaY; // 只允许向下移动
  }
};

const stopDrag = () => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);

  if (translateY.value > 50) {
    closePopup();  // 超过 50px 关闭
  } else {
    translateY.value = 0; // 回弹
  }
};

const closePopup = (): void => {
  emit("update:modelValue", false); // 通过 emit 通知父组件关闭弹窗
  translateY.value = 0; // 回弹
};

onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
});

// 监听 visible 变化 锁定滚动
useLockScroll(toRef(props, 'modelValue'))
</script>

<style scoped lang="scss">
.popup-overlay {
  position: fixed;
  z-index: 3;
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
    transition: transform 0.3s ease-out;
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
    }

    /* 用于滚动的内容区域 */
    .popup-body {
      flex: 1;
    }

    /* 顶部的 footer */
    .popup-footer {
      flex-shrink: 0;
      width: 100%;
    }
  }

}

.popup-slide {
  &-enter-active, &-leave-active {
    transition: transform 0.3s ease;
  }

  &-enter-from, &-leave-to {
    transform: translateY(100%);
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
