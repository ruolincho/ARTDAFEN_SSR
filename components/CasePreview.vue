<template>
  <section class="case-preview" v-show="modelValue">
    <div class="wrapper">
      <div class="main-swiper-wrapper">
        <swiper
          class="main-swiper"
          :modules="modules"
          :navigation="{ nextEl: '.main-next', prevEl: '.main-prev' }"
          :thumbs="{ swiper: thumbsSwiper }"
          @swiper="onSwiper"
        >
          <swiper-slide
            v-for="item in items"
            :key="item.id + '_main'"
          >
            <div class="contrast-wrapper">
              <div class="contrast-item">
                <div class="header text-18 py-12 line1">🖼️ OUR PAINTING</div>
                <div class="content">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.paintImg)" alt=""/>
                </div>
              </div>
              <div class="contrast-item">
                <div class="header text-18 py-12 line1">📸 ORIGINAL PHOTO</div>
                <div class="content">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.actualImg)" alt=""/>
                </div>
              </div>
            </div>

          </swiper-slide>
        </swiper>
        <div class="main-button main-next swiper-button-next"></div>
        <div class="main-button main-prev swiper-button-prev"></div>
      </div>
      <div class="thumb-swiper-wrapper" v-if="appStore.isPc">
        <swiper
          class="thumb-swiper"
          :modules="modules"
          :space-between="10"
          @swiper="setThumbsSwiper"
          :breakpoints="{
            767: {
              slidesPerView: 5,
            },
            990: {
              slidesPerView: 6,
            },
            1260: {
              slidesPerView: 8,
            },
          }"
        >
          <swiper-slide
            v-for="item in items"
            :key="item.id + '_thumb'"
          >
            <img class="w-full h-full fit-cover" :src="imagePrefix(item.paintImg)" alt=""/>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="close cursor-pointer" @click="close">
      <span class="iconfont icon-error-fill text-30"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {IPaint} from "~/api/interface/paint/paint";
import {Swiper, SwiperSlide} from 'swiper/vue'
import type {Swiper as SwiperClass} from 'swiper'
import {Autoplay, Navigation, Pagination, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {useAppStore} from "~/stores/modules/app";
import {imagePrefix} from "~/utils";
import {useLockScroll} from '~/composables/useLockScroll'

defineOptions({
  name: 'CasePreview',
})

interface Props {
  modelValue: boolean; // 显示和隐藏的状态
  items: IPaint.SampleRow[]; // 对比数据
  index: number; // 当前选中的对比项索引
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const appStore = useAppStore()
useLockScroll(toRef(props, 'modelValue'))

const modules = [Autoplay, Pagination, Navigation, Thumbs]
const thumbsSwiper = ref<SwiperClass>()
const mainSwiperInstance = ref()
const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}
const onSwiper = (swiper: SwiperClass) => {
  mainSwiperInstance.value = swiper
}
const slideTo = (index: number) => {
  mainSwiperInstance.value.slideTo(index)
}
const close = () => {
  emit('update:modelValue', false)
}

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.index >= 0) slideTo(props.index)
})
</script>

<style scoped lang="scss">
.case-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgba(0, 0, 0, .85);

  .wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;

    .main-swiper-wrapper {
      position: relative;
      max-width: 700px;
      width: 100%;

      .main-swiper {
        height: 100%;
        //aspect-ratio: 1 / 0.85;

        :deep(.swiper-slide) {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .contrast-wrapper {
            display: flex;

            .contrast-item {
              flex: 1;
              flex-shrink: 0;
              display: flex;
              flex-direction: column;

              .header {
                text-align: center;
                color: #fff;
                background: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
              }

              .content {
                flex: 1;
                overflow: hidden;
                flex-shrink: 0;
                max-height: 460px;
              }
            }
          }
        }
      }

      .main-button {
        --swiper-navigation-color: #fff;
        top: calc(50%);
        width: clamp(26px, 2.60vw, 50px);
        height: clamp(26px, 2.60vw, 50px);
        transform: translateY(-50%);

        &::after {
          font-size: clamp(26px, 2.60vw, 30px);
        }

        &.main-prev {
          left: -15%;
        }

        &.main-next {
          right: -15%;
        }
      }
    }

    .thumb-swiper-wrapper {
      max-width: 1180px;
      padding: 0 50px;
      width: 100%;

      .thumb-swiper {
        .swiper-slide {
          aspect-ratio: 1 / 1;
          cursor: pointer;
          opacity: .5;

          &.swiper-slide-thumb-active,
          &:hover {
            opacity: 1;
          }
        }
      }
    }

  }

  .close {
    position: absolute;
    right: 2vw;
    top: 2vw;
    font-size: 30px;
    color: #fff;
  }
}

@media (max-width: 768px) {
  .case-preview .wrapper .main-swiper-wrapper {
    padding: 0 15px;

    .main-button {
      top: -30px;
      transform: unset;

      &::after {
        font-size: 16px;
      }

      &.main-prev {
        left: 0;
      }

      &.main-next {
        left: 40px;
        right: unset;
      }
    }
  }
}
</style>