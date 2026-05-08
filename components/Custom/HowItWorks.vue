<template>
  <p class="text-60 f-bold-500 text-center my-md-50 my-25">How it Works:</p>
  <div class="my-md-50 my-25">
    <!--桌面端视图-->
    <div class="row works-list gap-row-base" v-if="appStore.isPc">
      <div class="col-lg-3 col-sm-6" v-for="item in HOW_IT_WORKS" :key="item.title">
        <div class="works-item">
          <p class="acea-row row-between-wrapper">
            <span class="text-26 f-bold">{{ item.title }}</span>
            <SvgIcon :name="item.icon" class="text-50" />
          </p>
          <p class="text-20 mt-20">{{ item.desc }}</p>
        </div>
      </div>
    </div>
    <!--移动端视图-->
    <swiper
        v-else
        slides-per-view="auto"
        :space-between="15"
        :centered-slides="true"
        :loop="true"
    >
      <swiper-slide v-for="(item, index) in HOW_IT_WORKS" :key="item.title" style="width: 80%;">
        <div class="works-item text-center relative bg-gray-100 p-10 rounded-md">
          <SvgIcon :name="item.icon" style="font-size: 40px;" />
          <p class="text-26 f-bold my-20">{{ item.title }}</p>
          <p class="text-20">{{ item.desc }}</p>
          <div class="serial">{{ index + 1 }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import {HOW_IT_WORKS} from "~/constant";
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import {useAppStore} from "~/stores/modules/app";

const appStore = useAppStore()
</script>

<style scoped lang="scss">
  .works-list {
    --gutter: var(--gutter-xl);
  }

  .works-item {
    position: relative;
    overflow: hidden;

    .serial {
      position: absolute;
      //z-index: -1;
      font-size: 100px;
      left: 50%;
      top: 50%;
      color: rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }

  @media (max-width: 1460px) {
    .works-list {
      --gutter: var(--gutter-lg);
    }
  }

  @media (max-width: 1260px) {
    .works-list {
      --gutter: var(--gutter-md);
    }
  }

  @media (max-width: 991px) {
    .works-list {
      --gutter: var(--gutter-base);
    }
  }

</style>