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
          <div class="col-6" v-for="(item, index) in latestList" :key="item.id"
               v-aos="{ name: 'fade-up', delay: index % 2 * 100}">
            <div class="single-item cursor-pointer" @click="jumpNewWindow(`/news-detail/${item.id}`)">
              <div class="p-img overflow-hidden">
                <img class="w-full h-full fit-cover img-hover aspect-ratio-16_9" :src="imagePrefix(item.img)"
                     :alt="item.title">
              </div>
              <p class="text-22 mt-18 line1">{{ item.title }}</p>
              <p class="text-14 my-10 line2">{{ item.subtitle }}</p>
              <div class="acea-row row-between-wrapper gap-row-base">
                <div class="acea-row row-middle gap-xs">
                  <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
                </div>
                <span class="text-12">{{ formatTimestamp(item.createTime, 'MMM Do YY') }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-skeleton>
    </div>
  </section>

  <!-- More -->
  <section class="list-section" v-loading="pending">
    <div class="container">
      <div class="row news-list mt-md-40 mt-20 ">
        <div class="col-lg-3 col-md-4 col-6" v-for="(item, index) in moreData.records" :key="item.id"
             v-aos="{ name: 'fade-up', delay: index % 4 * 100}">
          <NuxtLink class="news-item cursor-pointer" :to="`/news-detail/${item.id}`" target="_blank">
            <div class="p-img overflow-hidden">
              <img class="w-full h-full fit-cover img-hover aspect-ratio-16_9" :src="imagePrefix(item.img)" alt="">
            </div>
            <h2 class="text-22 mt-18 line2">{{ item.title }}</h2>
            <p class="text-14 my-10 line3">{{ item.subtitle || '- -' }}</p>
            <div class="acea-row row-middle gap-xs">
              <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
            </div>
            <div class="day text-30 f-bold-200">{{ formatTimestamp(item.createTime, 'MMM Do YY') }}</div>
          </NuxtLink>
        </div>
      </div>
      <!-- 真实 <a> 链接的分页导航，保证禁用 JS 时仍可翻页 -->
      <nav aria-label="Pagination" class="seo-pagination py-lg-40 py-20">
        <NuxtLink
          v-if="hasPrev"
          :to="page - 1 === 1 ? '/news' : `/news?page=${page - 1}`"
          rel="prev"
        >
          <span class="iconfont icon-left"/>
        </NuxtLink>

        <!-- 页码建议不要一次性全打出；这里举例显示当前页前后各 2 页 -->
        <NuxtLink
          v-for="p in Array.from({length: totalPages}, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)"
          :key="p"
          :to="p === 1 ? '/news' : `/news?page=${p}`"
          :aria-current="p === page ? 'page' : null"
          :class="{'active': p === page}"
        >
          {{ p }}
        </NuxtLink>

        <NuxtLink
          v-if="hasNext"
          :to="`/news?page=${page + 1}`"
          rel="next"
        >
          <span class="iconfont icon-right"/>
        </NuxtLink>
        <!-- 无脚本兜底 -->
        <noscript>
          <p><a href="/news?page=2">Next page</a></p>
        </noscript>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {getNewsLatestApi, getNewsTopicApi} from "~/api/modules/news/news";
import {imagePrefix, jumpNewWindow, jumpToUrl} from "~/utils";
import {formatTimestamp} from "~/utils/format";
import {useAppStore} from "~/stores/modules/app";
import type {INews} from "~/api/interface/news/news";
import type {IPage, IResultData} from "~/api/interface";
import {TRADE_MODULE} from "../api/helper/prefix";
import {pageMeta} from "~/composables/pageMeta";

defineOptions({
  name: 'News'
})

onMounted(() => {
  getNewsTopic()
  getNewsLatest()
})

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const modules = [Pagination, Navigation]

useHead(pageMeta[route.path] ?? pageMeta["/news"]);

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

const page = computed<number>({
  get() {
    const p = Number(route.query.page ?? 1)
    return Number.isFinite(p) && p >= 1 ? Math.floor(p) : 1
  },
  set(v: number) {
    if (process.client) {
      const n = Number.isFinite(v) && v >= 1 ? Math.floor(v) : 1
      router.push({query: {...route.query, page: n}})
    }
  }
})
const size = ref(12)
const {data: moreData, pending, error} = await useAsyncData(
  'news-more',
  async () => {
    const config = useRuntimeConfig()
    const {data} = await $fetch<IResultData<IPage<INews.MoreRow>>>(config.public.apiBase + TRADE_MODULE + '/news/more', {
      method: 'POST',
      body: {
        page: page.value,
        size: size.value,
      }
    })
    return data
  },
  {
    watch: [page],
    server: true,
    default: () => ({
      /*当前页数*/
      current: 1,
      /*总页码*/
      pages: 0,
      /*列表数据*/
      records: [],
      /*页数*/
      size: 12,
      /*数据条数*/
      total: 0,
    })
  }
)

// 计算总页数（基于后端返回的 total 和当前 size）
const totalPages = computed(() => {
  const t = Number(moreData.value?.total ?? 0)
  const s = Number(size.value ?? 1) || 1
  return Math.max(1, Math.ceil(t / s))
})

const hasPrev = computed(() => page.value > 1)
const hasNext = computed(() => page.value < totalPages.value)

const origin = useRequestURL().origin
const selfUrl = computed(() => (page.value === 1 ? `${origin}/news` : `${origin}/news?page=${page.value}`))
const prevUrlAbs = computed(() => hasPrev.value
  ? (page.value - 1 === 1 ? `${origin}/news` : `${origin}/news?page=${page.value - 1}`)
  : null
)
const nextUrlAbs = computed(() => hasNext.value
  ? `${origin}/news?page=${page.value + 1}`
  : null
)

useHead({
  link: [
    {rel: 'canonical', href: selfUrl.value},
    ...(prevUrlAbs.value ? [{rel: 'prev', href: prevUrlAbs.value}] : []),
    ...(nextUrlAbs.value ? [{rel: 'next', href: nextUrlAbs.value}] : []),
  ],
  meta: [
    {name: 'robots', content: 'index,follow'},
  ]
})

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
        display: block;

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

.seo-pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    opacity: 0.9;

    &.active {
      font-weight: bold;
      opacity: 1;
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