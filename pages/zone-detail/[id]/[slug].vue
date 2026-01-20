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
      <swiper-slide v-for="(item, index) in zoneDetail.banners" :key="index" :lazy="true">
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
        <div class="side-wrapper mr-40" v-show="appStore.device === 'pc' && zoneExploreList.length">
          <div class="py-24 border-b-lg border-gray-700">
            <span class="text-20 f-bold flex-1">VIBE EXPLORE</span>
          </div>
          <div class="explore-list">
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
        <!-- 右侧主要区域 -->
        <div class="main-wrapper flex-1">
          <!--锚点-->
          <div id="list-anchor"></div>
          <!--按钮组 Pc端-->
          <div
              class="buttons-wrapper py-md-30 py-15 acea-row nowrap gap-column-xs scroll-x scroll-hide"
              v-show="appStore.device === 'pc'"
              :style="{ top: appStore.headerState.height + 'px' }"
          >
            <!--价格排序-->
            <el-popover ref="pricePopoverRef" trigger="hover" placement="bottom-start" width="200"
                        :popper-style="{ padding: 0 }">
              <template #reference>
                <el-tag
                    size="large"
                    :type="priceSortSelected.id ? 'primary' : 'info'" round effect="dark"
                    class="cursor-pointer"
                    :closable="priceSortSelected.id"
                    @close="handleSort('PRICE_SORT', {} as IHome.MenuRow)"
                >
                  <div class="acea-row row-middle nowrap">
                    <span>{{ priceSortSelected.name ?? 'Price Sor' }}</span>
                    <span v-show="!priceSortSelected.id" class="iconfont icon-down text-16 ml-10"/>
                  </div>
                </el-tag>
              </template>
              <div
                  class="text-14 cursor-pointer text-center my-15 text-hover"
                  v-for="item in priceMenu.children"
                  :key="item.id"
                  @click="handleSort('PRICE_SORT', item)"
              >
                {{ item.name }}
              </div>
            </el-popover>
            <!--销量排序-->
            <el-popover ref="salesPopoverRef" trigger="hover" placement="bottom-start" width="200"
                        :popper-style="{ padding: 0 }">
              <template #reference>
                <el-tag
                    size="large"
                    :type="salesSortSelected.id ? 'primary' : 'info'" round effect="dark"
                    class="cursor-pointer"
                    :closable="salesSortSelected.id"
                    @close="handleSort('SALES_SORT', {} as IHome.MenuRow)"
                >
                  <div class="acea-row row-middle nowrap">
                    <span>{{ salesSortSelected.name ?? 'Sales Sort' }}</span>
                    <span v-show="!salesSortSelected.id" class="iconfont icon-down text-16 ml-10"/>
                  </div>
                </el-tag>
              </template>
              <div
                  class="text-14 cursor-pointer text-center my-15 text-hover"
                  v-for="item in salesMenu.children"
                  :key="item.id"
                  @click="handleSort('SALES_SORT', item)"
              >
                {{ item.name }}
              </div>
            </el-popover>
            <!--工艺筛选-->
            <el-popover ref="techniquePopoverRef" trigger="hover" placement="bottom-start" width="200"
                        :popper-style="{ padding: 0 }" v-if="hasTechniqueFilter">
              <template #reference>
                <el-tag
                    size="large"
                    :type="techniqueSelected.id ? 'primary' : 'info'" round effect="dark"
                    class="cursor-pointer"
                >
                  <div class="acea-row row-middle nowrap">
                    <span>{{ techniqueSelected.name ?? 'Technique' }}</span>
                    <span class="iconfont icon-down text-16 ml-10"/>
                  </div>
                </el-tag>
              </template>
              <div
                  class="text-14 cursor-pointer text-center my-15 text-hover"
                  v-for="item in techniqueMenu.children"
                  :key="item.id"
                  @click="handleTechnique(item)"
              >
                {{ item.name }}
              </div>
            </el-popover>
            <!--Artist 选中的值-->
            <el-tag
                v-if="artistSelected.id"
                size="large"
                type="primary" round effect="dark"
                class="cursor-pointer"
                closable
                @close="closeArtistTag()"
            >
              {{ artistSelected.name }}
            </el-tag>
          </div>

          <!--筛选区域 App端-->
          <div
              class="buttons-wrapper p-15 acea-row nowrap gap-column-xs scroll-x scroll-hide"
              v-show="appStore.device === 'app'"
              ref="appFilterRef"
              :style="{ top: appStore.headerState.height + 'px', margin: '0 -15px' }"
          >
            <!--价格排序-->
            <el-tag
                size="large"
                :type="priceSortSelected.id ? 'primary' : 'info'" round effect="dark"
                class="cursor-pointer"
                @click="clickAppFilter('PRICE_SORT', 0)"
            >
              {{ priceSortSelected.name ?? 'Price Sort' }}
            </el-tag>
            <!--销量排序-->
            <el-tag
                size="large"
                :type="salesSortSelected.id ? 'primary' : 'info'" round effect="dark"
                class="cursor-pointer"
                @click="clickAppFilter('SALES_SORT', 1)"
            >
              {{ salesSortSelected.name ?? 'Sales Sort' }}
            </el-tag>
            <!--工艺筛选-->
            <el-tag
                v-if="hasTechniqueFilter"
                size="large"
                :type="techniqueSelected.id ? 'primary' : 'info'" round effect="dark"
                class="cursor-pointer"
                @click="clickAppFilter('TECHNIQUE_SORT', 2)"
            >
              {{ techniqueSelected.name ?? 'Technique' }}
            </el-tag>
            <!--Artist 选中的值-->
            <el-tag
                v-if="artistSelected.id"
                size="large"
                type="primary" round effect="dark"
                class="cursor-pointer"
                closable
                @close="closeArtistTag()"
            >
              {{ artistSelected.name }}
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
          <!-- 价格排序 -->
          <span
              class="head-item"
              :class="{on: sortType === 'PRICE_SORT' }"
              @click="clickPopupHeader(0, priceMenu)"
          >
          Price Sort
        </span>
          <!-- 销量排序 -->
          <span
              class="head-item"
              :class="{on: sortType === 'SALES_SORT' }"
              @click="clickPopupHeader(1, salesMenu)"
          >
          Sales Sort
        </span>
          <!-- 工艺筛选 -->
          <span
              class="head-item"
              :class="{on: sortType === 'TECHNIQUE_SORT' }"
              @click="clickPopupHeader(2, techniqueMenu)"
          >
          Technique
        </span>
        </div>

        <!-- SORT -->
        <template v-if="popupCurrentMenu.config?.type === 'SORT'">
          <div
              class="text-20 py-16 border-b-sm border-gray-200"
              :class="[
            (sortType === 'PRICE_SORT' ? priceSortSelected : sortType === 'SALES_SORT' ? salesSortSelected : techniqueSelected).id === item.id
            ? 'text-gray-700'
            : 'text-gray-500'
          ]"
              v-for="item in popupCurrentMenu.children"
              :key="item.id"
              @click="() => { sortType === 'PRICE_SORT' || sortType === 'SALES_SORT' ? handleSort(sortType!, item) : handleTechnique(item)}"
          >
            {{ item.name }}
          </div>
        </template>
      </template>
      <template #footer>

        <div class="mt-20 mb-12 acea-row nowrap gap-column-xs scroll-x scroll-hide">
          <!--价格排序 选中的值-->
          <el-tag
              v-if="priceSortSelected.id"
              size="large"
              type="primary" round effect="dark"
              class="cursor-pointer"
              :closable="true"
              @close="handleSort('PRICE_SORT', {} as IHome.MenuRow)"
          >
            {{ priceSortSelected.name }}
          </el-tag>
          <!--销量排序 选中的值-->
          <el-tag
              v-if="salesSortSelected.id"
              size="large"
              type="primary" round effect="dark"
              class="cursor-pointer"
              :closable="true"
              @close="handleSort('SALES_SORT', {} as IHome.MenuRow)"
          >
            {{ salesSortSelected.name }}
          </el-tag>
          <!--工艺筛选 选中的值-->
          <el-tag
              v-if="hasTechniqueFilter && techniqueSelected.id"
              size="large"
              type="primary" round effect="dark"
              class="cursor-pointer"
          >
            {{ techniqueSelected.name }}
          </el-tag>
          <!--Artist 选中的值-->
          <el-tag
              v-if="artistSelected.id"
              size="large"
              type="primary" round effect="dark"
              class="cursor-pointer"
              closable
              @close="closeArtistTag()"
          >
            {{ artistSelected.name }}
          </el-tag>
        </div>

        <div class="acea-row side-button mt-20 mt-20"
             v-if="popupCurrentMenu.config.type !== 'GROUP' && popupCurrentMenu.config.type !== 'ARTIST'">
          <el-button @click="reset()">Reset</el-button>
          <el-button type="primary" class="flex-1" @click="search()">See all items</el-button>
        </div>
      </template>
    </Popup>
  </ClientOnly>
</template>

<script setup lang="ts">
import {imagePrefix} from "~/utils";
import type {IProduct} from "~/api/interface/product/product";
import type {ElPopover} from "element-plus";
import type {IHome} from "~/api/interface/home/home";
import {techniqueMenu, priceMenu, salesMenu} from "~/constant";
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

defineOptions({
  name: 'ZoneDetail'
})

onMounted(() => {
  getZoneExplore()
})

const modules = [Autoplay, Lazy]
const route = useRoute();
const router = useRouter();
const appStore = useAppStore()
const customStore = useCustomStore()

const banners = ref([
  '/trade/advertisement/2025/08/06/1763756679263330304/d01a86a0f2d249c6a0f48f43be2b17fe.webp',
  '/trade/advertisement/2025/08/06/1763756679263330304/b756024938cf46c28f21d3c164b15d98.webp',
  '/trade/advertisement/2025/08/06/1763756679263330304/4a00f253ca374e358bdc6830bc3f0464.webp',
  '/trade/advertisement/2025/07/16/1763756679263330304/7e0ed77ec3274e9ea55a8a0967292e60.webp',
])

// 获取专区详情
const {data: zoneDetail} = await useAsyncData(() => `zone-detail-${route.params.id}`, async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IProduct.ZoneRow[]>>(config.public.apiBase + TRADE_MODULE + '/product/zone/detail/' + route.params.id)
  return data
})

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
  priceSort: priceSortSelected.value?.config?.code ?? null,
  salesSort: salesSortSelected.value?.config?.code ?? null,
  techniqueId: techniqueSelected.value?.config?.code || null,
  creatorId: artistSelected.value?.id || null,
}));

const baseRoute = computed(() => `/zone-detail/${route.params.id}/${route.params.slug}`)

const seoInfo = computed(() => ({
  title: zoneDetail.value?.title,
  description: zoneDetail.value?.description,
  keywords: zoneDetail.value?.keywords,
}))

const sortType = ref<"PRICE_SORT" | "SALES_SORT" | "TECHNIQUE_SORT" | null>(null) // 移动端中SORT类型中筛选的类型

const pricePopoverRef = ref<InstanceType<typeof ElPopover>>()
const salesPopoverRef = ref<InstanceType<typeof ElPopover>>()
const techniquePopoverRef = ref<InstanceType<typeof ElPopover>>()

const priceSortSelected = ref({} as IHome.MenuRow) // 价格排序
const salesSortSelected = ref({} as IHome.MenuRow) // 销量排序

const hasTechniqueFilter = ref(true) // 是否有工艺筛选
const techniqueSelected = ref({} as IHome.MenuRow) // 选中的工艺类型

// 点击排序
const handleSort = (type: 'PRICE_SORT' | 'SALES_SORT', menu: IHome.MenuRow) => {
  if (type == 'PRICE_SORT') {
    if (priceSortSelected.value?.id === menu?.id) return
    priceSortSelected.value = menu
    pricePopoverRef.value?.hide()
  }
  if (type == 'SALES_SORT') {
    if (salesSortSelected.value?.id === menu?.id) return
    salesSortSelected.value = menu
    salesPopoverRef.value?.hide()
  }
  search()
}

// 点击工艺
const handleTechnique = (menu: IHome.MenuRow) => {
  if (techniqueSelected.value.id === menu?.id) return
  techniqueSelected.value = menu
  techniquePopoverRef.value?.hide()
  search()
}

// 点击Artist类型的选项（这里需要立即更新数据）
const artistSelected = ref({} as IHome.MenuRow)
const clickArtistType = (item: IHome.MenuRow) => {
  const isSame = artistSelected.value.id === item.id
  if (isSame) return // 相同的选项不做处理
  artistSelected.value = item
  search()
}
// 关闭Artist类型的选项
const closeArtistTag = () => {
  artistSelected.value = {} as IHome.MenuRow
  search()
}

const popupHeaderRef = ref<HTMLElement>()
let popupHeaderItemRect = [] as DOMRect[]
const appFilterRef = ref<HTMLElement>()
let appFilterItemRect = [] as DOMRect[]
const isPopup = ref(false)
const popupCurrentMenu = ref({} as IHome.MenuRow)
// 表示在移动端中PopupHeader中额外的选项数量
const extraLength = computed(() => hasTechniqueFilter.value ? 3 : 2)

// 点击App端的筛选按钮
const clickAppFilter = (type: 'PRICE_SORT' | 'SALES_SORT' | 'TECHNIQUE_SORT' | 'POPUP', index: number, menu?: IHome.MenuRow) => {
  isPopup.value = true

  if (type === 'PRICE_SORT') {
    sortType.value = 'PRICE_SORT'
    menu = priceMenu
    clickPopupHeader(index, menu)
  }

  if (type === 'SALES_SORT') {
    sortType.value = 'SALES_SORT'
    menu = salesMenu
    clickPopupHeader(index, menu)
  }

  if (type === 'TECHNIQUE_SORT') {
    sortType.value = 'TECHNIQUE_SORT'
    menu = techniqueMenu
    clickPopupHeader(index, menu)
  }

  if (type === 'POPUP') {
    sortType.value = null
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

  if (hasTechniqueFilter.value) {
    sortType.value = index === 0 ? 'PRICE_SORT' : index === 1 ? 'SALES_SORT' : index === 2 ? 'TECHNIQUE_SORT' : null

  } else {
    sortType.value = index === 0 ? 'PRICE_SORT' : index === 1 ? 'SALES_SORT' : null
  }

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
    const left = currentRect.left - pageW / 2 + currentRect.width / 2
    container.scrollTo({left, behavior: 'smooth'})
  })
}

// 重置
const reset = () => {
  techniqueSelected.value = {} as IHome.MenuRow
  priceSortSelected.value = {} as IHome.MenuRow
  salesSortSelected.value = {} as IHome.MenuRow
  artistSelected.value = {} as IHome.MenuRow
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

provide('zoneFilterParams', filterParams);
provide('updateArtist', clickArtistType);
provide('baseRoute', baseRoute);
provide('seoInfo', seoInfo);
</script>

<style scoped lang="scss">
  .filter-wrapper {

    .side-wrapper {
      width: 220px;
      position: relative;
      animation: animation-my5jl 300ms forwards;
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
</style>