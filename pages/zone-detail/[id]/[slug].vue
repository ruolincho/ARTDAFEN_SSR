<template>
  <section class="sec-banner">
    <swiper
        :modules="modules"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="false"
        :lazy="true"
        :breakpoints="{
        '991': { slidesPerView: 3, spaceBetween: 10, slidesPerGroup: 3 },
        '414': { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
      }"
    >
      <swiper-slide v-for="(item, index) in zoneDetail?.banners" :key="index" :lazy="true">
        <img class="w-full h-full object-cover" :src="imagePrefix(item)" alt="picturesInTheSpecialArea"/>
      </swiper-slide>
    </swiper>
  </section>

  <section>
    <div class="sm:py-30 py-20 text-center bg-gray-700 text-white">
      <h1 class="text-30 font-500 uppercase">{{ zoneDetail?.title }}</h1>
      <h2 class="text-16 mt-10" style="max-width: 1000px; margin: auto;">{{ zoneDetail?.name }}</h2>
    </div>
  </section>

  <!--主视图-->
  <section>
    <div class="container">
      <!--锚点-->
      <div id="list-anchor"></div>
      <div class="lg:pt-40 pt-20">
        <!--路由插槽-->
        <NuxtPage/>
      </div>
    </div>
  </section>

  <!--更多专区探索-->
  <section>
    <div class="container">
      <h1 class="lg:pb-30 pb-20 text-26 font-bold border-b-2  border-primary lg:mb-30 mb-20">VIBE EXPLORE</h1>
      <div class="explore-list row gap-row-base">
        <div class="col-6 col-md-4" v-for="item in zoneExploreList" :key="item.id">
          <NuxtLink
              :to="`/zone-detail/${item.id}/${item.slug}`"
              class="explore-item h-full acea-row row-column"
              target="_blank"
          >
            <div class="overflow-hidden">
              <img class="w-full img-hover" :src="imagePrefix(item.img)" :alt="item.title"/>
            </div>
            <div class="bg-gray-100 p-10 flex-1">
              <p class="text-20 font-bold">{{ item.title }}</p>
              <p class="text-14 mt-10 line-clamp-2">{{ item.name }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- PHOTO TO ART -->
  <section class="sec-art lg:pt-40 pt-20">
    <div class="container">
      <h1 class="lg:pb-30 pb-20 text-26 font-bold border-b-2  border-primary lg:mb-30 mb-20">CREATE YOUR OWN</h1>
      <NuxtLink class="make-wrapper" :to="`/custom-paint/${ArtCodeEnum.Painting}`" @click="goCustomPaint">
        <div class="make-box flex-1 bg-gray-100 md:p-40 p-20">
          <p class="text-18 font-bold">MAKE YOUR MEMORIES LAST</p>
          <p class="text-60 font-bold my-20">Photo To Art</p>
          <p class="text-22">Easily Transform Life's Real Moments Into A <br> Masterpiece — Made Just For You.</p>
        </div>
        <img class="cover" :src="imagePrefix('/static/artdafen/make.webp')" alt="make"/>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import type {IProduct} from "~/api/interface/product/product";
import {useCustomStore} from "~/stores/modules/custom";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {computed, ref, provide} from 'vue'
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay, Lazy} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {getZoneExploreApi} from "~/api/modules/product/product";
import {ArtCodeEnum} from "~/types/enumeration";
import {useBreadcrumbStore} from "~/stores/modules/breadcrumb";

defineOptions({
  name: 'ZoneDetail'
})

definePageMeta({
  showBreadcrumb: true
})

onMounted(() => {
  getZoneExplore()
})

const {imagePrefix} = useImage()
const modules = [Autoplay, Lazy]
const route = useRoute();
const customStore = useCustomStore()
const breadcrumbStore = useBreadcrumbStore()

// 获取专区详情
const {data: zoneDetail} = await useAsyncData(() => `zone-detail-${route.params.id}`, async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IProduct.ZoneRow[]>>(config.public.apiBase + TRADE_MODULE + '/product/zone/detail/' + route.params.id)
  return data
})

breadcrumbStore.setBreadcrumbs([{name: 'Zone'}, {name: zoneDetail.value?.title}])

// 获取专区探索
const zoneExploreList = ref<IProduct.ZoneRow[]>([])
const getZoneExplore = async () => {
  const {data} = await getZoneExploreApi(route.params.id)
  zoneExploreList.value = data
}

const goCustomPaint = () => {
  customStore.clearCache()
}

const filterParams = computed(() => ({
  zoneId: route.params.id
}));

const baseRoute = computed(() => `/zone-detail/${route.params.id}/${route.params.slug}`)

const seoInfo = computed(() => ({
  title: zoneDetail.value?.title,
  description: zoneDetail.value?.description,
  keywords: zoneDetail.value?.keywords,
}))

// ⬇️ 定义滚动动作
const executeScroll = () => {
  if (!process.client) return

  // 使用 requestAnimationFrame 确保在浏览器渲染下一帧时执行，防止 DOM 还没准备好
  requestAnimationFrame(() => {
    const anchor = document.getElementById('list-anchor')

    if (anchor) {
      // 偏移量计算
      const root = document.documentElement
      const cssValue = getComputedStyle(root).getPropertyValue('--header-height').trim()
      const headerOffset = parseInt(cssValue, 10) || 0
      const elementPosition = anchor.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition - 15,
        behavior: 'smooth' // 建议用 auto (瞬间)，配合骨架屏体验更好；smooth 可能会有视觉上的拉扯
      })
    }
  })
}

provide('zoneFilterParams', filterParams);
provide('baseRoute', baseRoute);
provide('seoInfo', seoInfo);
provide('executeScroll', executeScroll);
</script>

<style scoped lang="scss">
  .sec-art {
    .make-wrapper {
      display: flex;

      .make-box {
        display: flex;
        justify-content: center;
        flex-direction: column;

      }

      .cover {
        width: 50%;
        flex-shrink: 0;
      }
    }

  }

  @media (max-width: 991px) {
    .sec-art {
      .make-wrapper {
        flex-wrap: wrap;

        .cover {
          width: 100%;
        }

        .make-box {
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .sec-art {
      margin-bottom: -20px;
    }
  }
</style>