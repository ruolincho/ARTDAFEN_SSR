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
        <img class="w-full h-full fit-cover" :src="imagePrefix(item)" alt="picturesInTheSpecialArea"/>
      </swiper-slide>
    </swiper>
  </section>

  <section>
    <div class="py-sm-30 py-20 text-center bg-gray-700 text-white">
      <h1 class="text-50 f-bold-500 text-uppercase">{{ zoneDetail.title }}</h1>
      <h2 class="text-24 mt-10" style="max-width: 1000px; margin: auto;">{{ zoneDetail.subTitle }}</h2>
    </div>
  </section>

  <section class="filter-wrapper">
    <div class="container-fluid">
      <div class="acea-row row-between">
        <!-- 左侧专区区域 PC端-->
        <transition name="slide-fade">
          <div class="side-wrapper mr-40" v-show="appStore.device === 'pc' && zoneExploreList.length && isFilter">
            <div class="py-24 border-b-lg border-gray-700">
              <span class="text-20 f-bold flex-1">VIBE EXPLORE</span>
            </div>
            <div class="explore-list scroll-y pr-10" style="max-height: 1200px;">
              <NuxtLink
                  :to="`/zone-detail/${item.id}/${item.slug}`"
                  class="explore-item mt-15 block border-b-sm border-gray-700 pb-15"
                  v-for="item in zoneExploreList" :key="item.id"
                  target="_blank"
              >
                <div>
                  <img class="w-full" :src="imagePrefix(item.img)" :alt="item.title"/>
                </div>
                <div class="bg-gray-100 p-10">
                  <p class="text-20 f-bold">{{ item.title }}</p>
                  <p class="text-14 mt-10">{{ item.subTitle }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </transition>
        <!-- 右侧主要区域 -->
        <div class="main-wrapper flex-1">
          <!--锚点-->
          <div id="list-anchor"></div>

          <!--排序按钮 Pc端-->
          <div
              class="buttons-wrapper py-md-30 py-15 acea-row row-right row-middle gap-column-base"
              :style="{ top: appStore.headerState.height + 'px' }"
              v-show="appStore.device === 'pc'"
          >
            <!--展示过滤选项-->
            <div class="loc-group" :class="{ 'active' : isFilter }" @click="isFilter = !isFilter">
              <div class="loc-current">
                <span><span class="loc-text">{{ isFilter ? 'Hide' : 'Show' }} VIBE</span></span>
                <span class="loc-arrow"><i class="iconfont icon-editor-left-alignment"></i></span>
              </div>
            </div>

            <!--排序选项-->
            <div class="loc-group" :class="{ 'active' : isSort }" @click="isSort = !isSort">
              <div class="loc-current">
                <span><strong>Sort by:</strong> <span class="loc-text">
                  {{ sortSelected.name || 'Default' }}</span>
                </span>
                <span class="loc-arrow"><i class="iconfont icon-down"></i></span>
              </div>
              <div class="loc-dropdown">
                <ul class="loc-list">
                  <li
                      class="loc-item"
                      :class="{ active: sortSelected.id === item.id }"
                      v-for="item in SORT_MENU.children" :key="item.id"
                      @click.stop="handleSort(item)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!--按钮组 Pc端-->
          <div class="acea-row gap-xs row-middle pb-md-30 pb-15" v-show="appStore.device === 'pc'">
            <!--Artist 选中的值-->
            <el-tag
                v-if="artistSelected.id"
                size="large"
                type="info" round
                class="cursor-pointer"
                closable
                @close="closeArtistTag()"
            >
              {{ artistSelected.name }}
            </el-tag>
            <div class="cursor-pointer text-underline" @click="reset" v-if="hasFilterSelected">Clear all</div>
          </div>

          <!--筛选区域 App端-->
          <div
              class="buttons-wrapper p-15 acea-row nowrap gap-column-xs scroll-x scroll-hide"
              v-show="appStore.device === 'app'"
              ref="appFilterRef"
              :style="{ top: appStore.headerState.height + 'px', margin: '0 -15px' }"
          >
            <!--排序-->
            <el-tag
                size="large"
                type="primary" round effect="plain"
                class="cursor-pointer"
                @click="clickAppFilter('SORT', 0)"
            >
              Sort by: {{ sortSelected.name ?? 'Default' }}
            </el-tag>
          </div>

          <!--路由插槽-->
          <NuxtPage/>

          <!-- 左侧专区区域 移动端-->
          <div v-show="appStore.device === 'app'">
            <h1 class="py-20 text-26 f-bold border-b-md border-gray-700 mb-20">VIBE EXPLORE</h1>
            <div class="explore-list row gap-row-base">
              <div class="col-6" v-for="item in zoneExploreList" :key="item.id">
                <NuxtLink
                    :to="`/zone-detail/${item.id}/${item.slug}`"
                    class="explore-item block"
                    target="_blank"
                >
                  <div>
                    <img class="w-full" :src="imagePrefix(item.img)" :alt="item.title"/>
                  </div>
                  <div class="bg-gray-100 p-10">
                    <p class="text-20 f-bold">{{ item.title }}</p>
                    <p class="text-14 mt-10">{{ item.subTitle }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PHOTO TO ART -->
  <section class="sec-art">
    <div class="text-center bg-gray-700 text-white py-sm-30 py-20">
      <div class="text-50">
        Can't find the perfect piece? Create your own.
      </div>
    </div>
    <NuxtLink class="make-wrapper" :to="`/custom-paint/${ArtCodeEnum.Painting}`" @click="goCustomPaint">
      <div class="make-box flex-1 bg-gray-100 p-md-40 p-20">
        <p class="text-18 f-bold">MAKE YOUR MEMORIES LAST</p>
        <p class="text-60 f-bold my-20">Photo To Art</p>
        <p class="text-22">Easily Transform Life's Real Moments Into A <br> Masterpiece — Made Just For You.</p>
      </div>
      <img class="cover" :src="imagePrefix('/static/artdafen/make.webp')" alt="make"/>
    </NuxtLink>
  </section>

  <ClientOnly>
    <!-- 移动端弹窗筛选 -->
    <Popup v-model="isPopup" v-if="appStore.device === 'app'">
      <template #default>
        <!-- popup 头部 -->
        <div
            class="app-popup-header mt-12 mb-20 acea-row nowrap gap-column-base scroll-x scroll-hide"
            style="white-space: nowrap"
            ref="popupHeaderRef"
        >
          <!-- 排序 -->
          <span
              class="head-item"
              :class="{on: popupCurrentMenu.id === '9999' }"
              @click="clickPopupHeader(0, SORT_MENU)"
          >
            By Sort
          </span>
        </div>

        <div>
          <!-- SORT -->
          <template v-if="popupCurrentMenu.config?.type === 'SORT'">
            <div
                class="text-20 py-16 border-b-sm border-gray-200"
                :class="[sortSelected.id === item.id? 'text-gray-700': 'text-gray-500']"
                v-for="item in popupCurrentMenu.children"
                :key="item.id"
                @click="handleSort(item)"
            >
              {{ item.name }}
            </div>
          </template>
        </div>
      </template>
      <template #footer>

        <div class="mt-20 mb-12 acea-row nowrap gap-column-xs scroll-x scroll-hide">
          <!--排序 选中的值-->
          <el-tag
              v-if="sortSelected.id"
              size="large"
              type="info" round
              class="cursor-pointer"
              :closable="true"
              @close="handleSort({} as IHome.MenuRow)"
          >
            {{ sortSelected.name }}
          </el-tag>
          <!--Artist 选中的值-->
          <el-tag
              v-if="artistSelected.id"
              size="large"
              type="info" round
              class="cursor-pointer"
              closable
              @close="closeArtistTag()"
          >
            {{ artistSelected.name }}
          </el-tag>
        </div>

        <div class="acea-row side-button mt-20 mt-20">
          <el-button @click="reset()">Reset</el-button>
          <el-button type="primary" class="flex-1" @click="search()">See all items</el-button>
        </div>
      </template>
    </Popup>
  </ClientOnly>
</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import type {IProduct} from "~/api/interface/product/product";
import type {IHome} from "~/api/interface/home/home";
import {SORT_MENU} from "~/constant";
import {useAppStore} from "~/stores/modules/app";
import {useCustomStore} from "~/stores/modules/custom";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {computed, ref, nextTick, watch, provide} from 'vue'
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay, Lazy} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {getZoneExploreApi} from "~/api/modules/product/product";
import {ArtCodeEnum} from "~/types/enumeration";
import {useBreadcrumbStore} from "~/stores/modules/breadcrumb";
import type {ObjectNode} from "~/types/global";

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
const router = useRouter();
const appStore = useAppStore()
const customStore = useCustomStore()
const breadcrumbStore = useBreadcrumbStore()
const isFilter = ref(true)

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
  zoneId: route.params.id,
  sort: sortSelected.value?.config?.code ?? null,
  creatorId: artistSelected.value?.id || null,
}));

const baseRoute = computed(() => `/zone-detail/${route.params.id}/${route.params.slug}`)

const seoInfo = computed(() => ({
  title: zoneDetail.value?.title,
  description: zoneDetail.value?.description,
  keywords: zoneDetail.value?.keywords,
}))

// ------ 点击Artist类型的选项（这里需要立即更新数据） ------
const artistSelected = ref({} as IHome.MenuRow)
// 关闭Artist类型的选项
const closeArtistTag = () => {
  artistSelected.value = {} as IHome.MenuRow
  search()
}
// 点击艺术家
const handleClickArtist = (creator: ObjectNode.Creator) => {
  if (artistSelected.value.id === creator.id) return
  artistSelected.value = {name: creator.name, id: creator.id} as IHome.MenuRow
  search()
}

const popupHeaderRef = ref<HTMLElement>()
let popupHeaderItemRect = [] as DOMRect[]
const appFilterRef = ref<HTMLElement>()
let appFilterItemRect = [] as DOMRect[]
const isPopup = ref(false)
const popupCurrentMenu = ref({} as IHome.MenuRow)
// 表示在移动端中PopupHeader中额外的选项数量
const extraLength = ref(1)

// 点击App端的筛选按钮
const clickAppFilter = (type: 'SORT' | 'POPUP', index: number, menu?: IHome.MenuRow) => {
  isPopup.value = true

  if (type === 'SORT') {
    menu = SORT_MENU
    clickPopupHeader(index, menu)
  }

  if (type === 'POPUP') {
    clickPopupHeader(index + extraLength.value, menu!)
  }

  nextTick(() => {
    const container = appFilterRef.value
    if (!container) return
    const pageW = document.documentElement.clientWidth
    const idx = type === 'POPUP' ? index + extraLength.value : index
    const currentRect = appFilterItemRect[idx]
    const left = currentRect.left - pageW / 2 + currentRect.width / 2
    container.scrollTo({left, behavior: 'smooth'})
  })
}

// 点击PopupHeader
const clickPopupHeader = (index: number, menu: IHome.MenuRow) => {
  popupCurrentMenu.value = menu

  nextTick(() => {
    const container = popupHeaderRef.value
    if (!container) return
    // 只获取一次
    if (!popupHeaderItemRect.length) {
      Array.from(container?.children ?? []).forEach((node, index) => {
        popupHeaderItemRect[index] = node.getBoundingClientRect()
      })
    }
    const pageW = document.documentElement.clientWidth
    const currentRect = popupHeaderItemRect[index]
    const left = currentRect!.left - pageW / 2 + currentRect!.width / 2
    container.scrollTo({left, behavior: 'smooth'})
  })
}

// 是否有筛选值的计算属性
const hasFilterSelected = computed<boolean>(() => {
  return (
      // 判断对象是否添加了属性 (非空对象)
      Object.keys(artistSelected.value).length > 0
  )
})

// ------ 排序------
const isSort = ref(false)
const sortSelected = ref({} as IHome.MenuRow) // 排序选中的值
const handleSort = (menu: IHome.MenuRow) => {
  if (sortSelected.value?.id === menu?.id) return
  sortSelected.value = menu
  isSort.value = false
  search()
}

// 重置
const reset = () => {
  artistSelected.value = {} as IHome.MenuRow
  sortSelected.value = {} as IHome.MenuRow
  search()
}

const search = () => {
  isPopup.value = false
  router.push(baseRoute.value)
}

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

provide('zoneFilterParams', filterParams);
provide('updateArtist', handleClickArtist);
provide('baseRoute', baseRoute);
provide('seoInfo', seoInfo);
provide('executeScroll', executeScroll);
</script>

<style scoped lang="scss">
  /* 单个设置组 (相对定位，用于包裹下拉框) */
  .loc-group {
    position: relative;
    cursor: pointer;

    /* 当前显示的文字 */
    .loc-current {
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;

      .loc-text {
        color: #666;
        transition: color 0.2s;
      }

      .loc-arrow {
        background: var(--el-color-info);
        color: var(--el-color-white);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        transition: all 0.2s;

        .iconfont {
          font-size: 12px;
        }
      }
    }

    /* 激活状态 */
    &.active {
      .loc-current {
        .loc-text {
          color: #000;
          text-decoration: underline; /* 悬停时加下划线提示可点击 */
          transition: color 0.2s;
        }

        .loc-arrow {
          background: var(--el-color-primary);
          transform: rotate(180deg);
        }
      }

      /* 鼠标悬停时显示下拉面板 */
      .loc-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(10px); /* 向上滑入 */
      }
    }

    /* --- 悬停下拉面板 --- */
    .loc-dropdown {
      position: absolute;
      top: 100%; /* 贴在文字正下方 */
      right: 0;
      transform: translateY(25px); /* 稍微往下偏移 */
      background: #fff;
      border: 1px solid #eee;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1010;
      max-height: 320px; /* 大约能显示 8-10 个选项的高度 */
      overflow-y: auto;
      /* Firefox 浏览器的极简滚动条支持 */
      scrollbar-width: thin;
      scrollbar-color: #e0e0e0 transparent;

      /* =========================================
       Webkit (Chrome/Safari/Edge) 自定义优雅滚动条
       ========================================= */
      &::-webkit-scrollbar {
        width: 4px; /* 极细的宽度，不抢视觉焦点 */
      }

      &::-webkit-scrollbar-track {
        background: transparent; /* 轨道透明 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: #e0e0e0; /* 浅灰色滑块 */
        border-radius: 4px; /* 圆角显得更精致 */

        &:hover {
          background-color: #bdbdbd; /* 鼠标悬停在滚动条上时稍微加深 */
        }
      }
    }
  }

  /* 下拉列表样式 */
  .loc-list {
    list-style: none;
    margin: 0;
    padding: 8px 0;

    .loc-item {
      padding: 8px 20px;
      font-size: 13px;
      font-weight: 400;
      color: #666;
      white-space: nowrap;
      transition: all 0.15s;

      &:hover {
        background: #f9f9f9;
        color: #000;
      }

      /* 当前选中的项加粗变成黑色 */
      &.active {
        font-weight: 600;
        color: #000;
      }
    }
  }

  .filter-wrapper {

    .side-wrapper {
      width: 220px;
      position: relative;
    }

    .main-wrapper {
      width: 100%;
      min-width: 0;

      .buttons-wrapper {
        position: sticky;
        top: 0;
        z-index: 10;
        background: #fff;
      }

      .nav-list {

        .nav-item {
          position: relative;

          &.on {
            font-weight: bold;
            color: var(--color-primary);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            height: 19px;
            width: 1px;
            background: var(--color-gray-400);
          }

        }
      }
    }
  }

  .buttons-wrapper {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
  }

  .app-popup-header {
    .head-item {
      color: var(--color-gray-500);

      &.on {
        font-weight: bold;
        color: var(--color-primary);
      }
    }
  }

  .sec-art {
    margin-top: 3.125vw;

    .make-wrapper {
      display: flex;

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

  @keyframes animation-my5jl {
    0% {
      margin-left: -220px;
      visibility: visible;
    }
    100% {
      margin-left: 0px;
    }
  }


  .slide-fade-enter-active,
  .slide-fade-leave-active {
    /* 恢复使用 margin-left 动画，让文档流平滑改变，带动右侧内容 */
    /* 同时保留 opacity 增加淡入淡出效果 */
    transition: margin-left 200ms ease-out, opacity 200ms ease-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    margin-left: -220px;
    opacity: 0;
  }

  .slide-fade-enter-to,
  .slide-fade-leave-from {
    margin-left: 0;
    opacity: 1;
  }
</style>