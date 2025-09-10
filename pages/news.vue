<template>
  <!-- Topic -->
  <section class="swiper-section">
    <div class="container">
      <h1 class="my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 font-bold">Latest post</h1>
      <el-skeleton :loading="isTopicSkeleton" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 44vw"/>
        </template>
        <ClientOnly>
          <div class="latest-swiper">
            <swiper
              :modules="modules"
              :navigation="{ nextEl: '.next', prevEl: '.prev' }"
              :pagination="{ clickable: true }"
              :loop="true"
            >
              <swiper-slide v-for="item in topicList" :key="item.id">
                <div @click="jumpToUrl(item.url)" class="cursor-pointer">
                  <!-- 图片 -->
                  <template v-if="item.type === '0'">
                    <img class="w-full" :src="imagePrefix(item.img)" alt="" v-show="appStore.device === 'pc'">
                    <img class="w-full" :src="imagePrefix(item.mobileImg)" alt="" v-show="appStore.device === 'app'">
                  </template>
                  <!-- 视频 -->
                  <template v-if="item.type === '1'">
                    <video
                      class="w-full"
                      :src="imagePrefix(item.media)"
                      :poster="imagePrefix(item.img)"
                      :autoplay="true"
                      :loop="true"
                      :muted="true"
                      :controls="false"
                      playsinline
                    />
                  </template>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-button next iconfont icon-right"></div>
            <div class="swiper-button prev iconfont icon-left"></div>
          </div>
        </ClientOnly>
      </el-skeleton>
    </div>
  </section>

  <!-- Latest -->
  <section class="single-section">
    <div class="container">
      <el-skeleton :loading="isLatestSkeleton" animated :count="2" class="row single-post">
        <template #template>
          <div class="col-6">
            <el-skeleton-item variant="image" style="width: 100%; height: 25vw"/>
            <div class="py-10">
              <el-skeleton-item variant="h1"/>
              <el-skeleton-item variant="p" class="my-10" style="width: 50%"/>
            </div>
          </div>
        </template>
        <div class="row single-post">
          <div class="col-6" v-for="(item, index) in latestList" :key="item.id" v-aos="{ name: 'fade-up', delay: index % 2 * 100}">
            <div class="single-item cursor-pointer" @click="jumpNewWindow(`/news-detail/${item.id}`)">
              <div class="p-img overflow-hidden">
                <img class="w-full h-full fit-cover img-hover aspect-ratio-16_9" :src="imagePrefix(item.img)" alt="">
              </div>
              <p class="text-22 mt-18 line1">{{ item.title }}</p>
              <p class="text-14 my-10 line2">{{ item.subtitle }}</p>
              <div class="acea-row row-between-wrapper gap-row-base">
                <div class="acea-row row-middle gap-xs">
                  <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
                </div>
                <span class="text-12">{{ formatTimestamp(item.createTime, 'YYYY.MM.DD') }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-skeleton>
    </div>
  </section>

  <!-- More -->
  <section class="list-section">
    <div class="container">
      <ProInfinite
        ref="proInfiniteRef"
        :request-api="getNewsMoreList"
        :need-group="true"
        :init-param="initParam"
      >
        <template #default="scope">
          <div v-for="[timeStamp, data] in scope.rows" :key="timeStamp">
            <h1 class="my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 font-bold">{{ formatTimestamp(timeStamp, 'MMM YYYY') }}</h1>
            <div class="row news-list">
              <div class="col-lg-3 col-md-4 col-6" v-for="(item, index) in data" :key="item.id" v-aos="{ name: 'fade-up', delay: index % 4 * 100}">
                <div class="news-item cursor-pointer" @click="jumpNewWindow(`/news-detail/${item.id}`)">
                  <div class="p-img overflow-hidden">
                    <img class="w-full h-full fit-cover img-hover aspect-ratio-16_9" :src="imagePrefix(item.img)" alt="">
                  </div>
                  <p class="text-22 mt-18 line2">{{ item.title }}</p>
                  <p class="text-14 my-10 line3">{{ item.subtitle || '- -' }}</p>
                  <div class="acea-row row-middle gap-xs">
                    <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
                  </div>
                  <div class="day text-60 f-bold-200">{{ formatTimestamp(item.createTime, 'DD') }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ProInfinite>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {getNewsLatestApi, getNewsMoreApi, getNewsTopicApi} from "~/api/modules/news/news";
import {imagePrefix, jumpNewWindow, jumpToUrl} from "~/utils";
import {formatTimestamp} from "~/utils/format";
import {useAppStore} from "~/stores/modules/app";
import type {INews} from "~/api/interface/news/news";
import type {IPageQuery} from "~/api/interface";
import ProInfinite from "~/components/ProInfinite.vue";

defineOptions({
  name: 'News'
})

onMounted(() => {
  getNewsTopic()
  getNewsLatest()
})

const router = useRouter()
const appStore = useAppStore()
const modules = [Pagination, Navigation]
const initParam = reactive({size: 12});

// Topic
const isTopicSkeleton = ref(true)
const topicList = ref<General.MediaItem[]>([])
const getNewsTopic = async () => {
  const {data} = await getNewsTopicApi()
  topicList.value = data
  isTopicSkeleton.value = false
}

// Latest
const isLatestSkeleton = ref(true)
const latestList = ref<INews.Row[]>([])
const getNewsLatest = async () => {
  const {data} = await getNewsLatestApi()
  latestList.value = data
  isLatestSkeleton.value = false
}

// 获取跟多新闻
const getNewsMoreList = (params: IPageQuery) => getNewsMoreApi(params)

</script>

<style scoped lang="scss">
.swiper-section {
  .latest-swiper {
    position: relative;

    .swiper-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 50px;
      cursor: pointer;
      color: var(--color-primary);
      z-index: 2;
      width: 76px;
      height: 120px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      &.swiper-button-disabled {
        color: var(--color-gray-400);
        //cursor: not-allowed;
      }

      &.prev {
        left: 40px;
      }

      &.next {
        right: 40px;
      }
    }

  }
}

.single-section {
  .single-post {
    --gutter: var(--gutter-md);
    margin-top: var(--gutter-md);
    row-gap: var(--gutter-md);
  }
}

.list-section {
  .news-list {
    --gutter: 50px;
    row-gap: 50px;

    [class^="col-"] {
      .news-item {
        position: relative;
        height: 100%;
        padding-bottom: 82px;

        .day {
          position: absolute;
          bottom: 0;
          left: 0;
        }

        &::before {
          content: "";
          position: absolute;
          top: 0;
          right: -25px;
          width: 1px;
          height: 100%;
          background: var(--color-gray-200);
        }
      }

      &:nth-child(4n) .news-item::before {
        display: none;
      }
    }
  }
}

@media (max-width: 1259px) {
  .swiper-section .latest-swiper .swiper-button {
    width: 53px;
    height: 84px;
    font-size: 35px;
  }

  .list-section {
    .news-list {
      row-gap: 40px;

      [class^="col-"] {
        .news-item {
          padding-bottom: 62px;
        }

        &:nth-child(3n) .news-item::before {
          display: none;
        }

        &:nth-child(4n) .news-item::before {
          display: block;
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .swiper-section .latest-swiper .swiper-button {
    width: 38px;
    height: 60px;
    font-size: 25px;

    &.prev {
      left: 20px;
    }

    &.next {
      right: 20px;
    }
  }

  .single-section {
    .single-post {
      --gutter: var(--gutter-base);
      margin-top: var(--gutter-base);
      row-gap: var(--gutter-base);
    }
  }

  .list-section {
    .news-list {

      [class^="col-"] {

        &:nth-child(3n) .news-item::before {
          display: block;
        }

        &:nth-child(2n) .news-item::before {
          display: none;
        }

      }
    }
  }
}

@media (max-width: 414px) {
  .swiper-section .latest-swiper .swiper-button {
    display: none;
  }
}
</style>