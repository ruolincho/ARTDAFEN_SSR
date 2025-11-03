<template>
  <div class="room-layout" v-show="visible" @click="visible = false">
    <div class="layout-container" @click.stop>
      <div class="app-menu-box acea-row row-center-wrapper">
        <div class="acea-row row-center-wrapper" @click="isOpenMenu = !isOpenMenu">
          <span class="mr-10">{{ list[roomIndex].name }}</span>
          <span class="iconfont" :class="[isOpenMenu ? 'icon-up' : 'icon-down']"></span>
        </div>

        <ul class="drop-list" :class="{ on: isOpenMenu }">
          <li
            class="cursor-pointer py-10"
            v-for="(room, index) in list"
            :key="index"
            @click="chooseRoom(index)"
          >
            {{ room.name }}
          </li>
        </ul>
      </div>
      <div class="acea-row">
        <div class="menu-box text-center">
          <ul class="menu-list text-16 ">
            <li
              class="cursor-pointer py-10"
              :class="{ 'bg-gray-200': roomIndex === index }"
              v-for="(room, index) in list"
              :key="index"
              @click="chooseRoom(index)"
            >
              {{ room.name }}
              <span class="iconfont icon-right"></span>
            </li>
          </ul>

          <el-upload
            class="upload-box"
            :accept="fileType.join(',')"
            :before-upload="beforeUpload"
            :on-change="uploadChange"
            :auto-upload="false"
            :show-file-list="false"
          >
            <div class="upload-btn mt-20 p-10 cursor-pointer">
              Upload A Photo <br> Of Your Own Room
              <span class="iconfont icon-right"></span>
            </div>
          </el-upload>

        </div>

        <div class="room-box flex-1 overflow-hidden">
          <div class="preview-box" ref="previewBox">
            <img class="pictures" :src="bgSrc" alt="">
            <div
              class="drag-box"
              ref="dragBox"
              :style="dragBoxStyle"
              @mousedown.stop.prevent="onDragStart"
              @touchstart.stop.prevent="onDragStart"
            >
              <img :src="wallImage" alt="">
              <div
                class="resize-handle iconfont icon-suofang"
                @mousedown.stop.prevent="onResizeStart"
                @touchstart.stop.prevent="onResizeStart"
              />
            </div>
          </div>
          <div class="thumb-box mt-10">
            <swiper
              :modules="modules"
              :navigation="true"
              :space-between="10"
              :slides-per-view="5"
              :style="{
                '--swiper-navigation-color': '#fff',
              }"
            >
              <swiper-slide v-for="(photo, index) in roomPhotos" :key="index">
                <div class="slide acea-row row-center-wrapper bg-gray-200 cursor-pointer" @click="choosePhoto(photo)">
                  <img class="w-full h-full fit-contain" :src="imagePrefix(photo)" alt="">
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <el-upload
        v-show="!appStore.isPc"
        class="acea-row row-center-wrapper mt-20"
        :accept="fileType.join(',')"
        :before-upload="beforeUpload"
        :on-change="uploadChange"
        :auto-upload="false"
        :show-file-list="false"
      >
        <span class="text-underline">Upload A Photo Of Your Own Room</span>
      </el-upload>
      <div class="close-box cursor-pointer acea-row row-center-wrapper" @click="visible = false">
        <span class="iconfont icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Navigation} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import {imagePrefix} from "~/utils";
import type {UploadFile, UploadProps} from "element-plus";
import {ElMessage} from "element-plus";
import type {PixelType} from "./interface";
import list from '~/config/room'
import {useAppStore} from "~/stores/modules/app";
import {useLockScroll} from "~/composables/useLockScroll";

defineOptions({
  name: 'Room',
})

// 定义 Props
interface Props {
  wallImage: string; // 背景墙图片的 URL
  pixel: PixelType; // 背景墙图片的 尺寸
}

const props = defineProps<Props>();

const appStore = useAppStore()
const modules = [Navigation]
const roomIndex = ref(0)
const roomPhotos = computed(() => list[roomIndex.value].photos)
const bgSrc = ref(imagePrefix('/static/room/Bathroom/01.webp'))
const chooseRoom = (index: number) => {
  roomIndex.value = index
  bgSrc.value = imagePrefix(roomPhotos.value[0])


  if (!appStore.isPc) {
    isOpenMenu.value = false
  }

}
const choosePhoto = (photo: string) => {
  bgSrc.value = imagePrefix(photo)
}

const isOpenMenu = ref(false)
const visible = ref(false)

const previewBox = ref<HTMLDivElement | null>(null);
const dragBox = ref<HTMLDivElement | null>(null);

const aspectRatio = props.pixel.width / props.pixel.height;

// 初始化宽度150，高度按比例缩放
let defaultWidth = 150;
let defaultHeight = defaultWidth / aspectRatio;

const position = ref({top: 50, left: 50});
const size = ref({width: defaultWidth, height: defaultHeight});

const isDragging = ref(false);
const isResizing = ref(false);
const isMoving = ref(false); // 拖拽/缩放中

const dragOffset = ref({x: 0, y: 0});
const startPos = ref({x: 0, y: 0});
const startSize = ref({width: 0, height: 0});

const dragBoxStyle = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
  width: `${size.value.width}px`,
  height: `${size.value.height}px`,
  transition: isMoving.value ? 'none' : 'all 0.2s ease',
  boxShadow: `-${Math.round(size.value.width / (defaultWidth / 10))}px
              ${Math.round(size.value.width / (defaultWidth / 10))}px
              ${Math.round(size.value.width / (defaultWidth / 6))}px 0 #0000004D`
}));

interface Point {
  x: number;
  y: number;
}

function getEventPosition(e: MouseEvent | TouchEvent): Point {
  if (e instanceof MouseEvent) {
    return {x: e.clientX, y: e.clientY};
  } else if (e.touches.length === 1) {
    return {x: e.touches[0].clientX, y: e.touches[0].clientY};
  } else {
    return {x: 0, y: 0}; // 忽略多点触控
  }
}

function onDragStart(e: MouseEvent | TouchEvent) {
  isDragging.value = true;
  isMoving.value = true;
  const {x, y} = getEventPosition(e)
  const box = previewBox.value;
  if (!box) return;
  dragOffset.value = {
    x: x - position.value.left - box.getBoundingClientRect().left,
    y: y - position.value.top - box.getBoundingClientRect().top,
  };
  document.addEventListener('mousemove', onDragging);
  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchmove', onDragging, {passive: false});
  document.addEventListener('touchend', onDragEnd);
}

function onDragging(e: MouseEvent | TouchEvent) {
  if (!isDragging.value || !previewBox.value) return;
  const boxRect = previewBox.value.getBoundingClientRect();
  const width = size.value.width;
  const height = size.value.height;

  const {x, y} = getEventPosition(e)
  let newLeft = x - dragOffset.value.x - boxRect.left;
  let newTop = y - dragOffset.value.y - boxRect.top;

  newLeft = Math.max(0, Math.min(newLeft, boxRect.width - width));
  newTop = Math.max(0, Math.min(newTop, boxRect.height - height));

  position.value.left = newLeft;
  position.value.top = newTop;
}

function onDragEnd() {
  isDragging.value = false;
  isMoving.value = false;
  document.removeEventListener('mousemove', onDragging);
  document.removeEventListener('mouseup', onDragEnd);
  document.removeEventListener('touchmove', onDragging);
  document.removeEventListener('touchend', onDragEnd);
}

function onResizeStart(e: MouseEvent | TouchEvent) {
  isResizing.value = true;
  isMoving.value = true;
  const {x, y} = getEventPosition(e)
  startPos.value = {x: x, y: y};
  startSize.value = {...size.value};
  document.addEventListener('mousemove', onResizing);
  document.addEventListener('mouseup', onResizeEnd);
  document.addEventListener('touchmove', onResizing, {passive: false});
  document.addEventListener('touchend', onResizeEnd);
}

function onResizing(e: MouseEvent | TouchEvent) {
  if (!isResizing.value || !previewBox.value) return;
  const boxRect = previewBox.value.getBoundingClientRect();
  const {x, y} = getEventPosition(e)
  let deltaX = x - startPos.value.x;

  let newWidth = startSize.value.width + deltaX;
  let newHeight = newWidth / aspectRatio;

  const maxWidth = boxRect.width - position.value.left;
  const maxHeight = boxRect.height - position.value.top;

  // 最大限制
  if (newWidth > maxWidth) {
    newWidth = maxWidth;
    newHeight = newWidth / aspectRatio;
  }
  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = newHeight * aspectRatio;
  }

  // 最小限制
  const minWidth = 80;
  const minHeight = minWidth / aspectRatio;

  // 当两个维度都小于最小值时才应用限制
  if (newWidth < minWidth && newHeight < minHeight) {
    // 根据宽高比选择更大的那个维度作为基准
    if (minWidth / aspectRatio > minHeight) {
      newWidth = minWidth;
      newHeight = newWidth / aspectRatio;
    } else {
      newHeight = minHeight;
      newWidth = newHeight * aspectRatio;
    }
  }

  size.value.width = newWidth;
  size.value.height = newHeight;
}

function onResizeEnd() {
  isResizing.value = false;
  isMoving.value = false;
  document.removeEventListener('mousemove', onResizing);
  document.removeEventListener('mouseup', onResizeEnd);
  document.removeEventListener('touchmove', onResizing);
  document.removeEventListener('touchend', onResizeEnd);
}

function centerDragBox() {
  nextTick(() => {
    const box = previewBox.value;
    if (!box) return;
    const boxRect = box.getBoundingClientRect();

    position.value.left = (boxRect.width - size.value.width) / 2;
    // position.value.top = (boxRect.height - size.value.height) / 2;
  })
}

const fileType = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg']
const fileSize = 5

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload: UploadProps['beforeUpload'] = rawFile => {
  const imgSize = rawFile.size / 1024 / 1024 < fileSize;
  const imgType = fileType.includes(rawFile.type);
  if (!imgType) ElMessage.warning('The uploaded image does not conform to the required format!');
  if (!imgSize) ElMessage.warning(`The size of the uploaded image cannot exceed ${fileSize}MB！`);
  return imgType && imgSize;
};

/**
 * @description 监听图片上传
 * */
const uploadChange = (file: UploadFile) => {
  bgSrc.value = URL.createObjectURL(file.raw as Blob);
}

const open = () => {
  visible.value = true
  centerDragBox()
}

// 监听 visible 变化 锁定滚动
useLockScroll(visible)

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onResizing);
  document.removeEventListener('mouseup', onResizeEnd);
  document.removeEventListener('touchmove', onResizing);
  document.removeEventListener('touchend', onResizeEnd);
})

defineExpose({
  open
})
</script>

<style lang="scss">
.room-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgba(0, 0, 0, .5);

  .layout-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1100px;
    width: 100%;
    background: #fff;

    .app-menu-box {
      height: 39px;
      position: relative;
      font-size: 14px;
      display: none;

      .drop-list {
        position: absolute;
        z-index: 11;
        width: 100%;
        left: 0;
        top: 100%;
        background: #ffffff;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.25s linear;

        li {
          text-align: center;
          padding: 6px 0;
        }

        &.on {
          max-height: 500px;
        }
      }
    }

    .menu-box {
      width: 244px;

      .menu-list {
        margin-top: 87px;
      }

      .upload-btn {
        display: inline-block;
        border: var(--border-width-sm) solid var(--color-primary);
        line-height: 1.7;
      }
    }

    .room-box {
      user-select: none; /* 禁止选中拖拽盒子 */
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;

      .preview-box {
        width: 100%;
        height: 550px;
        position: relative;

        .pictures {
          height: 100%;
          width: 100%;
          object-fit: contain;
          pointer-events: none; /* 禁止干扰拖拽 */
        }

        .drag-box {
          position: absolute;
          cursor: move;
          z-index: 10;
          //box-shadow: -10px 10px 6px 0 #0000004D;
          user-select: none; /* 禁止选中拖拽盒子 */
          -ms-user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;

          img {
            width: 100%;
            height: 100%;
            pointer-events: none; /* 禁止干扰拖拽 */
            user-select: none; /* 禁止选中图片 */
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
          }

          .resize-handle {
            position: absolute;
            right: 0;
            bottom: 0;
            cursor: se-resize;
            color: #fff;
            font-size: 20px;
            display: none;
          }

          &:hover .resize-handle {
            display: block;
          }
        }
      }

      .thumb-box {
        .slide {
          height: 150px;
        }

        .swiper-button-prev, .swiper-button-next {
          width: clamp(26px, 2.60vw, 50px);
          height: clamp(26px, 2.60vw, 50px);
          margin-top: auto;
          transform: translateY(-50%);

          &::after {
            font-size: clamp(26px, 2.60vw, 30px);
          }
        }

      }
    }

    .close-box {
      position: absolute;
      right: 0;
      top: 0;
      width: 39px;
      height: 39px;
      font-size: 12px;
    }
  }
}

@media (max-width: 767px) {
  .room-layout {
    .layout-container {
      margin: auto;
      height: 100%;

      .app-menu-box {
        display: flex;
      }

      .menu-box {
        display: none;
      }

      .room-box {

        .preview-box {
          aspect-ratio: 1 / 1;
          width: 100%;
          height: auto;

          .drag-box .resize-handle {
            display: block;
          }
        }

        .thumb-box {
          .slide {
            aspect-ratio: 1 / 1;
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}
</style>