<template>
  <!-- Banner -->
  <section class="sec-banner">
    <el-skeleton :loading="isSkeleton" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%; height: 31vw"/>
      </template>
      <swiper
        :modules="modules"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
      >
        <swiper-slide v-for="item in topicData" :key="item.id">
          <div @click="jumpToUrl(item.url)" class="cursor-pointer">
            <!-- 图片 -->
            <template v-if="item.type === '0'">
              <img class="banner-img" :src="imagePrefix(item.img)" alt="" v-show="appStore.device === 'pc'">
              <img class="banner-img" :src="imagePrefix(item.mobileImg)" alt="" v-show="appStore.device === 'app'">
            </template>
            <!-- 视频 -->
            <template v-if="item.type === '1'">
              <video :src="imagePrefix(item.media)" :poster="imagePrefix(item.img)" :autoplay="true" :loop="true"
                     :muted="true" :controls="false"/>
            </template>
          </div>
        </swiper-slide>
      </swiper>
    </el-skeleton>
  </section>

  <!--OFFICIAL-->
  <section class="sec-welcome">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h1 class="text-50">ARTDAFEN.COM</h1>
        <p class="mt-20 text-gray-600 text-16 f-bold-500" style="max-width: 608px; margin: auto">
          Since 1989 · Reimagined 2020
        </p>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="4" class="row gap-row-base">
        <template #template>
          <div class="col-xl-3 col-md-4 col-6">
            <el-skeleton-item variant="image" style="width: 100%; height: 25vw"/>
            <div class="py-10">
              <el-skeleton-item variant="h1"/>
              <el-skeleton-item variant="p" class="my-10" style="width: 50%"/>
            </div>
          </div>
        </template>
        <div class="row gap-row-base">
          <div
            class="col-sm-4 col-6"
            v-for="(item, index) in officialData"
            :key="item.id"
            v-aos="{ name: 'fade-up', delay: index * 100}"
          >
            <div class="cursor-pointer" @click="jumpToUrl(item.url)">
              <div class="border-sm border-gray-200 overflow-hidden bg-gray-200">
                <img class="w-full img-hover" :src="imagePrefix(item.img)" alt=""/>
              </div>
              <div class="content-wrapper p-10 bg-gray-100">
                <p class="line1 text-28 f-bold">{{ item.name }}</p>
                <p class="line2 text-16 my-10">{{ item.title }}</p>
                <p class="text-16 f-bold-500 text-underline">SHOP NOW</p>
              </div>
            </div>
          </div>
        </div>
      </el-skeleton>
    </div>
  </section>

  <!-- PHOTO TO ART -->
  <section class="sec-art">
    <div class="container">
      <div class="make-wrapper" v-aos="'fade-up'">
        <div class="make-box flex-1 bg-gray-100 p-md-40 p-20">
          <p class="text-18 f-bold">MAKE YOUR MEMORIES LAST</p>
          <p class="text-60 f-bold my-20">Photo To Art</p>
          <p class="text-22">Easily Transform Life's Real Moments Into A <br> Masterpiece — Made Just For You.</p>
        </div>
        <img class="cover cursor-pointer" :src="imagePrefix('/static/artdafen/make.webp')" alt=""
             @click="goCustomPaint">
      </div>
      <div class="bespoke-wrapper" v-aos="'fade-up'">
        <img class="cover" :src="imagePrefix('/static/artdafen/bespoke.webp')" alt="bespoke">
        <div class="content">
          <div>
            <h2 class="text-40">The Essence of Quality</h2>
            <p class="text-20 mt-20">Every painting is meticulously crafted and rigorously inspected before it reaches
              you</p>
          </div>
          <div class="problem-list row">
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Custom Frame Selection</p>
                <p class="text-16 text-gray-600 mt-20">
                  Choose from an extensive range of frame styles, finishes, and sizes to complement your décor
                  perfectly.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Real-Time Scene Swap</p>
                <p class="text-16 text-gray-600 mt-20">
                  Visualize your artwork instantly in living rooms, bedrooms, or gallery settings to find the perfect
                  fit.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">True-Scale Visualization</p>
                <p class="text-16 text-gray-600 mt-20">
                  See your artwork at true scale alongside furniture and décor for precise sizing.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Interactive Resize & Crop</p>
                <p class="text-16 text-gray-600 mt-20">
                  Easily resize or crop your artwork without losing quality, ensuring it’s just right.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Dynamic Style Filters</p>
                <p class="text-16 text-gray-600 mt-20">
                  Experiment with matting, wall colors, and lighting presets to achieve perfect aesthetic harmony.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">One-Click Save & Order</p>
                <p class="text-16 text-gray-600 mt-20">
                  Create shareable mock-ups and place your order seamlessly in just one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--WELCOME-->
  <section class="sec-welcome">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h1 class="text-50">LIFESTYLE SPACE</h1>
        <p class="mt-20 text-gray-600 text-16 f-bold-500" style="max-width: 608px; margin: auto">
          Art That Lights Up Life
        </p>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="4" class="row gap-row-base">
        <template #template>
          <div class="col-xl-3 col-md-4 col-6">
            <el-skeleton-item variant="image" style="width: 100%; height: 25vw"/>
            <div class="py-10">
              <el-skeleton-item variant="h1"/>
              <el-skeleton-item variant="p" class="my-10" style="width: 50%"/>
            </div>
          </div>
        </template>
        <div class="row gap-row-base">
          <div
            class="col-md-3 col-6"
            v-for="(item, index) in roomData"
            :key="item.id"
            v-aos="{ name: 'fade-up', delay: index * 100}"
          >
            <div class="cursor-pointer" @click="jumpToUrl(item.url)">
              <div class="border-sm border-gray-200 overflow-hidden bg-gray-200">
                <img class="w-full img-hover" :src="imagePrefix(item.img)" alt=""/>
              </div>
              <div class="content-wrapper p-10 bg-gray-100">
                <p class="line1 text-28 f-bold">{{ item.name }}</p>
                <p class="line2 text-16 my-10">{{ item.title }}</p>
                <p class="text-16 f-bold-500 text-underline">SHOP NOW</p>
              </div>
            </div>
          </div>
        </div>
      </el-skeleton>
    </div>
  </section>

  <!--100 MOST-->
  <section class="sec-explore">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h1 class="text-50">THE 100 MOST POPULAR WORKS OF ART</h1>
      </div>
      <el-skeleton :loading="isSkeleton2Explore" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 19vw"/>
        </template>
        <div class="explore-swiper" v-aos="'fade-up'">
          <swiper
            class="pb-lg-60 pb-40"
            :modules="modules"
            :navigation="true"
            :pagination="{ clickable: true, type: 'progressbar' }"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
            :loop="true"
            :breakpoints="{
              '1460': { slidesPerView: 5, spaceBetween: 40, slidesPerGroup: 5 },
              '991': { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 },
              '600': { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
              '100': { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },

            }"
          >
            <swiper-slide v-for="item in exploreData" :key="item.id">
              <div
                class="explore-item text-center border-sm border-gray-200 cursor-pointer select-none"
                @click="jumpToProduct(item)"
              >
                <div class="img-wrapper bg-gray-100">
                  <img :src="imagePrefix(item.img)" alt=""/>
                </div>
                <h1 class="mt-15 line1 px-10">
                  <span class="text-16 f-bold-500 text-underline"
                        @click.stop="handleClickArtist(item.creator)">{{ item.creator?.name }}</span>
                  <span class="iconfont icon-right text-16"></span>
                </h1>
                <p class="line1 text-14 my-15 px-10" style="word-break: break-word">{{ item.title }}</p>
                <p class="text-16 f-bold px-10 pb-10">{{ currencyStore.formatToCurrency(item.retailPrice) }}</p>
              </div>
            </swiper-slide>
          </swiper>
          <div class="acea-row row-center-wrapper pt-lg-40 pt-30">
            <el-button class="home-button" plain @click="handleSeeMoreBest">SEE MORE</el-button>
          </div>
        </div>
      </el-skeleton>
    </div>
  </section>

  <!--GAME-->
  <section class="sec-elevating">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h1 class="text-50" >ELEVATING YOUR STYLE GAME</h1>
        <p class="mt-20 text-gray-600 text-16 f-bold-500" style="max-width: 608px; margin: auto">
          Discover the Perfect Blend of Comfort and Trend with Our Exclusive Collection. Explore Deals on print, Trendy
          Play, and More!
        </p>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="3" class="row gap-row-base">
        <template #template>
          <div class="col-md-4 col-6">
            <el-skeleton-item variant="image" style="width: 100%; height: 25vw"/>
            <div class="text-center">
              <el-skeleton-item variant="p" class="mt-20" style="width: 50%"/>
            </div>
          </div>
        </template>
        <div class="row elevating-list">
          <div class="col-md-4 col-6" v-for="(item, index) in disCoverData" :key="item.id"
               v-aos="{ name: 'fade-up', delay: index % 3 * 100}">
            <div class="cursor-pointer" @click="jumpToUrl(item?.url)">
              <div class="overflow-hidden">
                <img class="w-full img-hover" :src="imagePrefix(item.img)" alt="">
              </div>
              <p class="text-center text-30 f-bold-500 mt-20">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </el-skeleton>
    </div>
  </section>

  <!-- TOP ARTIST -->
  <section class="sec-artist">
    <div class="container">
      <div class="artist-wrapper">
        <div class="content" v-aos="'fade-up'">
          <h1 class="text-50">TOP 50 ARTIST</h1>
          <el-skeleton :loading="isSkeleton2Artists" animated :count="4" class="my-30">
            <div class="row artist-list">
              <div class="col-sm-4 col-6" v-for="item in artistsData" :key="item.id">
                <div class="artist-item text-20">
                  <p class="cursor-pointer mb-10 line1" @click="handleClickArtist(item)">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </el-skeleton>
          <div class="view-all">
            <el-button class="home-button" plain @click="router.push('/artists-brief')">VIEW ALL ARTISTS</el-button>
          </div>
        </div>
        <img class="cover" :src="imagePrefix('/static/artdafen/artists.webp')" alt="cover" v-aos="'fade-up'">
      </div>
    </div>
  </section>

  <!--STYLE-->
  <section class="sec-style">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h1 class="text-50">MORE STYLE</h1>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="8" class="row gap-row-base">
        <template #template>
          <div class="col-xl-3 col-md-4 col-6">
            <el-skeleton-item variant="image" style="width: 100%; height: 12vw"/>
          </div>
        </template>
        <div class="row gap-row-base categories-list">
          <div
            class="col-xl-3 col-md-4 col-6"
            v-for="(item, index) in styleData"
            :key="item.id"
            v-aos="{ name: 'fade-up', delay: index % 4 * 100}"
          >
            <div class="categories-item cursor-pointer overflow-hidden" @click="jumpToUrl(item.url)">
              <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" alt="">
              <p class="categories-text text-26 f-bold text-white text-center">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </el-skeleton>
    </div>
  </section>

  <!--CONTACT-->
  <section class="sec-contact">
    <div class="container-fluid">
      <div class="contact-container">
        <div class="contact-bg" :style="{ backgroundImage: `url(${contactImage})` }"></div>
        <div class="contact-wrapper text-center">
          <h1 class="text-46 f-bold-500 mb-20">Keep up with the latest at ArtDaFen.com.<br/>Sign up now & get 15% off*
            your purchase of $99 or more!</h1>
          <div class="contact-buttons acea-row row-column gap-row-base">
            <el-button size="large" type="primary" @click="handleSubscribe">
              <template v-if="userStore.isLogin">
                {{ userStore.userInfo.subscribe === '1' ? 'Subscribe' : 'You Have Been Subscribed' }}
              </template>
              <template v-else>Sign Up</template>
            </el-button>
          </div>
          <p class="text-16">
            INSTANTLY ACCESS THE LATEST FASHION TRENDS AND EXCLUSIVE DEALS ON OUR
            SITE.DISCOVER YOUR PERFECT STYLE IN A FEW CLICKS!
          </p>
        </div>
      </div>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>

  <PromoCode ref="promoCodeRef"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, Navigation, Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {getHomeExploreApi} from "~/api/modules/home/home";
import {useAppStore} from "~/stores/modules/app";
import {imagePrefix, jumpToProduct, jumpToUrl} from "~/utils";
import {BEST_URL, PRODUCT_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {IArtists} from "~/api/interface/artists/artists";
import {ElMessage} from "element-plus";
import {subscribeForRealName} from "~/api/modules/message/message";
import {useCustomStore} from "~/stores/modules/custom";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {ArtCode} from "~/types/enumeration.d";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import PromoCode from "~/components/PromoCode.vue";
import {pageMeta} from "~/composables/pageMeta";

defineOptions({
  name: 'Home'
})

onMounted(() => {
  getHomeExplore()
  if (route.query.couponId) showPromoCode(route.query.couponId)
})

const contactImage = imagePrefix('/static/artdafen/contact-bg.webp');
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const customStore = useCustomStore()
const currencyStore = useCurrencyStore()
const userStore = useUserStore()
const modules = [Autoplay, Pagination, Navigation]
const isSkeleton2Explore = ref(true)

useHead(pageMeta[route.path] ?? pageMeta["/"]);

// 点击艺术家
const handleClickArtist = (creator: ObjectNode.Creator | IArtists.Row) => {
  router.push({
    path: PRODUCT_URL,
    query: gen_path_obj(creator, 'ARTIST', ['name'])
  })
}

// 获取首页数据
const {data: homeData, pending: isSkeleton} = await useAsyncData('homeData', async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<General.MediaItem[]>>(config.public.apiBase + TRADE_MODULE + '/home/ad')
  return data
})
const topicData = computed(() => (homeData.value ?? []).filter(i => i.tags === 'index:topic'))
const roomData = computed(() => (homeData.value ?? []).filter(i => i.tags === 'index:room'))
const styleData = computed(() => (homeData.value ?? []).filter(i => i.tags === 'index:style'))
const disCoverData = computed(() => (homeData.value ?? []).filter(i => i.tags === 'index:discover'))
const officialData = computed(() => (homeData.value ?? []).filter(i => i.tags === 'index:official'))

// 获取探索
const exploreData = ref<General.GoodsItem[]>([])
const getHomeExplore = async () => {
  const {data} = await getHomeExploreApi()
  exploreData.value = data
  isSkeleton2Explore.value = false
}

// 查看更多Top100
const handleSeeMoreBest = () => {
  router.push({
    path: BEST_URL,
    query: {menuId: '1000001'}
  })
}

// 获取Top50艺术家
const {data: artistsData, pending: isSkeleton2Artists} = await useAsyncData('artistsData', async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IArtists.Row[]>>(config.public.apiBase + TRADE_MODULE + '/home/artists')
  return data
})


// 消息订阅
const handleSubscribe = async () => {
  if (userStore.userInfo.subscribe === '0') return
  if (!userStore.isLogin) return showLoginWindow()
  await subscribeForRealName()
  ElMessage.success('Subscription successful，Please pay attention to the email.')
  userStore.updateSubscribe('0')
}

const goCustomPaint = () => {
  customStore.clearCache()
  router.push(`/custom-paint?work=${ArtCode.Painting}`)
}

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

const promoCodeRef = ref<InstanceType<typeof PromoCode>>()
const showPromoCode = (id: string) => {
  promoCodeRef.value?.open(id)
}
</script>

<style scoped lang="scss">

.home-button {
  padding: 20px 40px !important;
  height: auto !important;
}

.sec-banner {
  .banner-img {
    width: 100%;
    height: 100%;
  }
}

.sec-elevating {
  .elevating-list {
    --gutter: var(--gutter-md);
    row-gap: var(--gutter-md);
  }
}

.sec-explore {
  .explore-swiper {
    position: relative;

    .swiper {
      --swiper-navigation-color: #fff;
      --swiper-navigation-size: 30px;

      :deep(.swiper-button-prev) {
        left: 0;
      }

      :deep(.swiper-button-next) {
        right: 0;
      }

      :deep(.swiper-button-prev),
      :deep(.swiper-button-next) {
        background: rgba(0, 0, 0, 0.2);
        width: 58px;
        height: 90px;
        margin-top: 0;
        transform: translateY(-50%);
      }

      :deep(.swiper-pagination) {
        bottom: 0;
        top: unset;
      }
    }

    .explore-item {
      .img-wrapper {
        position: relative;
        aspect-ratio: 1 / 1;

        img {
          max-width: 95%;
          max-height: 95%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}

.sec-artist {
  .artist-wrapper {
    padding-top: 3.125vw;
    display: flex;
    align-items: flex-start;
    gap: 5.2vw;

    .content {
      flex: 1;

      .artist-list {
        margin-top: 2.60vw;
        margin-bottom: 2.60vw;
        --gutter: var(--gutter-xl);
      }
    }

    .cover {
      width: 46.71%;
      flex-shrink: 0;
    }
  }
}

.sec-art {
  .make-wrapper {
    display: flex;
    margin: 3.125vw 0;

    .make-box {
      display: flex;
      justify-content: center;
      flex-direction: column;

    }

    .cover {
      width: 59.21%;
      flex-shrink: 0;
    }
  }

  .bespoke-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 5.20vw;

    .cover {
      width: 46.71%;
      flex-shrink: 0;
    }

    .content {
      .problem-list {
        margin-top: var(--gutter-xl);
        --gutter: var(--gutter-xl);
        row-gap: var(--gutter-xl);
      }
    }

  }
}

.sec-style {
  .categories-list {

    .categories-item {
      position: relative;
      overflow: hidden;

      img {
        transition: transform 0.3s ease-in-out;
      }

      .categories-text {
        position: absolute;
        bottom: 40px;
        left: 40px;
        right: 40px;
        z-index: 1;
        transition: all 0.3s ease-in-out;
      }

      &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.2);
        pointer-events: none;
        transition: all 0.3s ease-in-out;
      }

      &:hover {

        img {
          transform: scale(1.1);
        }

        .categories-text {
          bottom: 50%;
          transform: translateY(50%);
        }

        &::after {
          background: rgba(0, 0, 0, 0.4);
        }

      }
    }
  }
}

.sec-contact {
  .contact-container {
    position: relative;
    height: 35.41vw;
    min-height: 450px;
    overflow: hidden;

    .contact-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%; /* 图片宽度为容器的两倍 */
      height: 100%;
      background-repeat: repeat;
      background-size: contain;
      animation: scroll 50s linear infinite; /* 调整时间来控制滚动速度 */
      mask: radial-gradient(50% 50% at 50% 50%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .contact-wrapper {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .contact-buttons {
        max-width: 546px;
        margin: auto;

        .el-button {
          margin-left: 0 !important;
        }
      }

      > p {
        max-width: 607px;
        margin: 20px auto 0;
      }
    }

    .email-input :deep(.el-input__inner) {
      text-align: center;
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* 移动图片的一半宽度 */
  }
}

@media (max-width: 1260px) {
  .sec-style .categories-list .categories-item .categories-text {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }

  .sec-artist {
    .artist-wrapper {
      .content {
        .artist-list {
          margin-top: var(--gutter-md);
          margin-bottom: var(--gutter-md);
          --gutter: var(--gutter-md);
        }
      }
    }
  }

  .sec-elevating {
    .elevating-list {
      --gutter: var(--gutter-base);
      row-gap: var(--gutter-base);
    }
  }
}

@media (max-width: 991px) {
  .sec-explore {
    .explore-swiper {
      .swiper {
        --swiper-navigation-size: 20px;

        :deep(.swiper-button-prev),
        :deep(.swiper-button-next) {
          width: 38px;
          height: 60px;
        }
      }
    }
  }

  .sec-artist {
    .artist-wrapper {
      gap: var(--gutter-md);
      flex-wrap: wrap;

      .content {
        width: 100%;
        order: 2;

        .artist-list {
          margin-top: var(--gutter-base);
          margin-bottom: var(--gutter-base);
          --gutter: var(--gutter-base);
        }

        .view-all {
          text-align: center;
        }
      }

      .cover {
        width: 100%;
        order: 1;
      }
    }
  }

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

    .bespoke-wrapper {
      flex-wrap: wrap;
      column-gap: unset;
      row-gap: var(--gutter-base);

      .cover {
        width: 100%;
      }

      .content {
        width: 100%;

        .problem-list {
          margin-top: var(--gutter-base);
          --gutter: var(--gutter-base);
          row-gap: var(--gutter-base);
        }
      }
    }
  }
}

</style>
