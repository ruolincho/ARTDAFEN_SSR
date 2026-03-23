<template>
  <!-- Topic -->
  <section class="swiper-section">
    <div class="container">
      <h1 class="mb-15 py-15 border-b-xl border-gray-700 text-26 f-bold">Latest post</h1>
      <ClientOnly>
        <div class="latest-swiper">
          <swiper
              :modules="modules"
              :navigation="{ nextEl: '.next', prevEl: '.prev' }"
              :pagination="{ clickable: true }"
              :loop="true"
          >
            <swiper-slide class="cursor-pointer" v-for="item in topicList" :key="item.id" @click="jumpToUrl(item.url)">
              <!-- 图片 -->
              <template v-if="item.type === '0'">
                <img class="w-full pc fit-cover" :src="imagePrefix(item.img)" :alt="item.title">
                <img class="w-full app" :src="imagePrefix(item.mobileImg)" :alt="item.title">
              </template>
              <!-- 视频 -->
              <template v-if="item.type === '1'">
                <div class="video-box w-full h-full">
                  <video
                      class="w-full h-full fit-cover"
                      :src="imagePrefix(item.media)"
                      :poster="imagePrefix(item.img)"
                      :autoplay="true"
                      :loop="true"
                      :muted="true"
                      :controls="false"
                      playsinline
                  />
                </div>
              </template>
            </swiper-slide>
          </swiper>
          <div class="swiper-button next iconfont icon-right"></div>
          <div class="swiper-button prev iconfont icon-left"></div>
        </div>
      </ClientOnly>
    </div>
  </section>

  <!-- Latest -->
  <section class="single-section">
    <div class="container">
      <div class="row single-post mt-15">
        <div class="col-6" v-for="item in latestList" :key="item.id">
          <NuxtLink class="single-item" :to="`/magazine-detail/${item.id}/${item.slug}`" target="_blank">
            <div class="p-img overflow-hidden">
              <img
                  class="w-full h-full fit-cover img-hover aspect-ratio-16_9"
                  :src="imagePrefix(item.img)"
                  :alt="item.title"
              />
            </div>
            <p class="text-22 mt-18 line1">{{ item.title }}</p>
            <p class="text-14 my-10 line2">{{ item.subtitle }}</p>
            <div class="acea-row row-between-wrapper gap-row-base">
              <div class="acea-row row-middle gap-xs">
                <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
              </div>
              <span class="text-12">{{ formatTimestamp(item.createTime, 'MMM Do YY') }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <div id="list-anchor"></div>
  <NuxtPage/>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {jumpNewWindow, jumpToUrl} from "~/utils";
import {formatTimestamp} from "~/utils/format";
import {useAppStore} from "~/stores/modules/app";
import type {INews} from "~/api/interface/news/news";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {computed, nextTick, watch} from "vue";
import {resolvePageMeta} from "~/config/pageMeta";
import {useImage} from "~/composables/useImage";

defineOptions({
  name: 'News'
})

const { imagePrefix } = useImage()
const route = useRoute()
const appStore = useAppStore()
const modules = [Pagination, Navigation]

const {data: topData} = await useAsyncData(
    `news-top`,
    async () => {
      const config = useRuntimeConfig()
      const {data} = await $fetch<IResultData<INews.TopRow>>(config.public.apiBase + TRADE_MODULE + '/news/top')
      return data
    }
)

const topicList = computed(() => topData.value?.topic || [])
const latestList = computed(() => topData.value?.latest || [])

useHead(resolvePageMeta("/magazine"));

// ⬇️ 定义滚动动作
const executeScroll = () => {
  if (!process.client) return

  // 使用 requestAnimationFrame 确保在浏览器渲染下一帧时执行，防止 DOM 还没准备好
  requestAnimationFrame(() => {
    const anchor = document.getElementById('list-anchor')

    if (anchor) {
      // 偏移量计算
      const headerOffset = appStore.headerState.height
      const elementPosition = anchor.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition - 15,
        behavior: 'smooth' // 建议用 auto (瞬间)，配合骨架屏体验更好；smooth 可能会有视觉上的拉扯
      })
    }
  })
}

watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      // 简单的防抖，确保不是同一个页面（虽然 fullPath 变了通常就是变了）
      if (newPath !== oldPath) {
        // 必须加 nextTick，因为路由变了，Nuxt 还需要一点点时间去卸载旧组件/挂载新组件
        nextTick(() => {
          executeScroll()
        })
      }
    }
)
</script>

<style scoped lang="scss">
  .swiper-section {
    .latest-swiper {
      position: relative;

      :deep(.swiper) {

        .swiper-slide {
          height: auto;

          img.pc {
            max-height: 500px;
          }

          .video-box {
            position: relative;
            background: red;

            video {
              position: absolute;
              top: 0;
              left: 0;
            }

            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
            }
          }

        }
      }
      .swiper-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 50px;
        cursor: pointer;
        color: var(--color-primary);
        z-index: 2;
        width: 68px;
        height: 108px;
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

  @media (max-width: 1259px) {
    .swiper-section .latest-swiper {

      .swiper-button {
        width: 53px;
        height: 84px;
        font-size: 35px;
      }
    }
  }

  @media (max-width: 991px) {
    .swiper-section .latest-swiper {

      .swiper-button {
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
    }
  }

  @media (max-width: 414px) {
    .swiper-section .latest-swiper {

      :deep(.swiper) {
        max-height: unset;
      }

      .swiper-button {
        display: none;
      }
    }
  }
</style>