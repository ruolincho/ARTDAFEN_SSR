<template>
  <div class="room-layout" v-show="visible" @click="close">
    <div class="layout-container" @click.stop>

      <div class="acea-row">
        <!-- PC端房型列表 -->
        <div class="menu-box text-center">
          <ul class="menu-list text-16" ref="menuListPcRef">
            <li
              class="cursor-pointer py-10"
              :class="{ 'bg-gray-200': roomIndex === index }"
              v-for="(room, index) in list"
              :key="index"
              @click="chooseRoom(index)"
            >
              {{ room.name }}
              <SvgIcon name="right" />
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
            <div class="upload-btn border  border-primary my-20 p-10 cursor-pointer" ref="uploadBtnPcRef">
              Upload A Photo <br> Of Your Own Room
              <SvgIcon name="right" />
            </div>
          </el-upload>

          <el-button size="large" type="primary" @click="openTour = true">
            <span class="px-50">Guide</span>
          </el-button>

        </div>

        <!-- PC端和移动端预览区域 -->
        <div class="room-box flex-1 overflow-hidden">
          <div class="preview-box" ref="previewBox">
            <img class="pictures" :src="bgSrc" alt="Scene Graph">
            <div
              class="drag-box"
              ref="dragBox"
              :style="dragBoxStyle"
              @mousedown.stop.prevent="onDragStart"
              @touchstart.stop.prevent="onDragStart"
            >
              <img :src="wallImage" alt="Scene Graph">
              <div class="resize-handle" ref="resizeRef" @mousedown.stop.prevent="onResizeStart" @touchstart.stop.prevent="onResizeStart">
                <SvgIcon name="suofang" />
              </div>
            </div>
          </div>
          <div class="thumb-box mt-10" ref="thumbRef">
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
                  <el-image class="w-full h-full" fit="contain" :src="imagePrefix(photo)" :alt="'Scene Graph' + index" lazy />
                  <!--<img class="w-full h-full object-contain" :src="imagePrefix(photo)" :alt="'Scene Graph' + index">-->
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>

      <!-- 移动端房型名称 -->
      <div class="app-menu-box">{{ roomName }}</div>

      <!-- 移动端房型列表 -->
      <div class="app-footer-box" :style="{ background: `url(${bgSrc}) no-repeat center center / cover` }">
        <div class="app-footer-inner acea-row row-between-wrapper py-15">
          <el-upload
              v-show="!appStore.isPc"
              :accept="fileType.join(',')"
              :before-upload="beforeUpload"
              :on-change="uploadChange"
              :auto-upload="false"
              :show-file-list="false"
          >
            <div class="acea-row row-column row-middle px-15" ref="uploadBtnAppRef">
              <div class="bg-white rounded-full p-10 shadow-md">
                <SvgIcon name="camera-switching" style="font-size: 25px;" />
              </div>
              <p class="mt-10 font-bold">Upload Photo</p>
            </div>
          </el-upload>
          <div class="flex-1 overflow-hidden" ref="menuListAppRef">
            <div class="app-room-list acea-row nowrap overflow-x-auto overflow-y-hidden scroll-hide py-10">
              <div
                  class="item shadow-md"
                  v-for="(item, index) in room" :key="item.name + index"
                  @click="chooseRoom(index)"
              >
                <img :src="imagePrefix(item.photos[0]!)" alt="">
                <p class="truncate">{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div class="close-box cursor-pointer acea-row row-center-wrapper" @click="close">
        <SvgIcon name="close" />
      </div>

      <!-- 关闭按钮 -->
      <div class="guide-app-btn shadow-md" @click="openTour = true">
        <SvgIcon name="help" />
      </div>

    </div>
  </div>

  <el-tour v-model="openTour" :target-area-clickable="false">
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
    <el-tour-step
        :target="dragBox"
        title="Drag to Move"
        description="Drag image to reposition."
    />
    <el-tour-step
        :target="resizeRef"
        title="Resize"
        description="Drag bottom-right to scale."
    />
    <el-tour-step
        :target="appStore.isPc ? menuListPcRef : menuListAppRef"
        title="Change Style"
        description="Switch room categories."
    />
    <el-tour-step
        :target="thumbRef"
        title="Select Room"
        description="Switch between rooms."
    />
    <el-tour-step
        :target="appStore.isPc ? uploadBtnPcRef : uploadBtnAppRef"
        title="Custom Upload"
        description="Use your own photo."
    />
  </el-tour>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Navigation} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import {useImage} from "~/composables/useImage";
import type {UploadFile, UploadProps} from "element-plus";
import {ElMessage} from "element-plus";
import type {PixelType} from "./interface";
import list from '~/config/room'
import {useAppStore} from "~/stores/modules/app";
import {useLockScroll} from "~/composables/useLockScroll";
import room from "~/config/room";
import {APP_HAS_SEEN_ROOM_GUIDE} from "~/config";

defineOptions({
  name: 'Room',
})

// 定义 Props
interface Props {
  wallImage: string; // 背景墙图片的 URL
  pixel: PixelType; // 背景墙图片的 尺寸
}

const { imagePrefix } = useImage()
const props = defineProps<Props>();

const emit = defineEmits<{
  close: []
}>()

const appStore = useAppStore()
const modules = [Navigation]
const roomIndex = ref(0)
const roomPhotos = computed(() => list[roomIndex.value]?.photos || [])
const roomName = computed(() => list[roomIndex.value]?.name || '')
const bgSrc = ref(imagePrefix(roomPhotos.value[0] || ''))
const chooseRoom = (index: number) => {
  roomIndex.value = index
  bgSrc.value = imagePrefix(roomPhotos.value[0] || '')
}
const choosePhoto = (photo: string) => {
  bgSrc.value = imagePrefix(photo)
}

const visible = ref(false)
const openTour = ref(false)

const previewBox = ref<HTMLDivElement | null>(null);
const dragBox = ref<HTMLDivElement | null>(null);
const resizeRef = ref<HTMLDivElement | null>(null);
const menuListPcRef = ref<HTMLDivElement | null>(null);
const menuListAppRef = ref<HTMLDivElement | null>(null);
const uploadBtnPcRef = ref<HTMLDivElement | null>(null);
const uploadBtnAppRef = ref<HTMLDivElement | null>(null);
const thumbRef = ref<HTMLDivElement | null>(null);

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
  filter:  `drop-shadow(
  -${Math.round(size.value.width / (defaultWidth / 10))}px
  ${Math.round(size.value.width / (defaultWidth / 10))}px
  ${Math.round(size.value.width / (defaultWidth / 6))}px #0000004D)`,
  transform: 'translate3d(0, 0, 0)',
  'will-change': 'filter',
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
  return new Promise((resolve) => {
    nextTick(() => {
      const box = previewBox.value;

      // 注意：即使提前返回，也必须调用 resolve()，否则 Promise 会一直处于 pending 状态
      if (!box) {
        resolve(false); // 可以返回 false 表示没执行
        return;
      }

      const boxRect = box.getBoundingClientRect();
      position.value.left = (boxRect.width - size.value.width) / 2;
      // position.value.top = (boxRect.height - size.value.height) / 2;

      // 逻辑执行完毕，返回成功
      setTimeout(() => {
        resolve(true);
      }, 200)
    });
  });
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

const initShowGuide = () => {
  if (process.server) return;
  if (localStorage.getItem(APP_HAS_SEEN_ROOM_GUIDE) === 'true') return
  openTour.value = true
  localStorage.setItem(APP_HAS_SEEN_ROOM_GUIDE, 'true')
}

const open = async () => {
  visible.value = true
  await centerDragBox()
  initShowGuide()
}

const close = () => {
  visible.value = false
  emit('close')
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
  open,
  close
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
    width: 980px;
    background: #fff;

    .app-menu-box {
      position: absolute;
      z-index: 100;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 5px 20px;
      display: none;
    }

    .app-footer-box {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      display: none;

      .app-footer-inner {
        width: 100%;
        backdrop-filter: blur(20px);

        .app-room-list {
          .item {
            width: 100px;
            margin-right: 10px;
            border-radius: 10px;
            overflow: hidden;
            flex-shrink: 0;
            backdrop-filter: blur(15px);
            background: rgba(255,255,255,0.8);
            padding: 10px 5px;

            img {
              width: 100%;
              height: 75px;
              object-fit: cover;
            }

            p {
              text-align: center;
              font-size: 12px;
              margin-top: 10px;
            }
          }
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
          object-fit: cover;
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
      z-index: 100;
      right: 0;
      top: 0;
      width: 39px;
      height: 39px;
      font-size: 12px;
      background: #fff;
    }

    .guide-app-btn {
      position: absolute;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      backdrop-filter: blur(10px);
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      right: 10px;
      bottom: 35%;
      display: none;

      .iconify {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 767px) {
  .room-layout {
    .layout-container {
      margin: auto;
      height: 100%;
      width: 100%;

      .app-menu-box {
        display: block;
      }

      .app-footer-box {
        display: flex;
      }

      .menu-box {
        display: none;
      }

      .room-box {

        .preview-box {
          //aspect-ratio: 1 / 1;
          width: 100%;
          height: auto;
          max-height: 74.57vw;
          overflow: hidden;

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

      .close-box {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        backdrop-filter: blur(10px);
        width: 30px;
        height: 30px;
        right: 10px;
        top: 10px;

        .iconify {
          font-size: 14px;
        }
      }

      .guide-app-btn {
        display: block;
      }
    }
  }
}
</style>