<template>
  <section class="sec-banner my-md-40 my-20">
    <img class="w-full" :src="imagePrefix(zone.background)" alt="background">
  </section>

  <section class="sec-main">
    <div class="container">
      <div class="py-sm-30 py-20 text-center">
        <h1 class="text-50 f-bold-500 text-uppercase">{{ zone.title }}</h1>
        <h2 class="text-24 mt-20 mt-sm-40">{{ zone.subTitle }}</h2>
      </div>

      <!--按钮组 Pc端-->
      <div
          class="buttons-wrapper py-md-30 py-15 acea-row nowrap gap-column-xs scroll-x scroll-hide"
          v-show="appStore.device === 'pc'"
          :style="{ top: appStore.headerHeight + 'px' }"
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
          :style="{ top: appStore.headerHeight + 'px', margin: '0 -15px' }"
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

      <ClientOnly>
        <!--商品数据-->
        <ProList
            ref="proListRef"
            :request-api="getProductList"
            :init-param="initParam"
        >
          <template #default="scope">
            <div class="row product-list gap-row-base">
              <div class="col-2xl-average col-lg-3 col-md-4 col-6" v-for="item in scope.rows" :key="item.id">
                <GoodsItem :item="item" @thumbsClick="productThumbs" @artistClick="clickArtistType"/>
              </div>
            </div>
          </template>
          <template #empty>
            <div class="text-center py-60">
              <span class="iconfont icon-empty text-50"></span>
              <p class="text-20 f-bold mt-20">No Data</p>
              <p class="text-14 my-20">No data found, please check the query or try again later.</p>
            </div>
          </template>
        </ProList>
      </ClientOnly>
    </div>
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

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {debounce, imagePrefix} from "~/utils";
import {getProductZoneApi} from "~/api/modules/product/product";
import type {IProduct} from "~/api/interface/product/product";
import {useAppStore} from "~/stores/modules/app";
import type {ElPopover} from "element-plus";
import type {IHome} from "~/api/interface/home/home";
import {techniqueMenu, priceMenu, salesMenu} from "~/constant";
import ProList from "~/components/ProList/index.vue";
import {getZoneCollectApi} from "~/api/modules/product/product";
import {useUserStore} from "~/stores/modules/user";
import {productThumbsApi} from "~/api/modules/likes/likes";
import LoginWindow from "~/components/LoginWindow.vue";

onMounted(() => {
  _getProductZone()
})

const route = useRoute();
const appStore = useAppStore()
const userStore = useUserStore()

// 获取专区详情
const zone = ref({} as IProduct.ZoneRow)
const _getProductZone = async () => {
  const {data} = await getProductZoneApi(route.params.id as string)
  zone.value = data
}

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

const initParam = reactive<any>({
  size: 50,
  zoneId: 1,
  priceSort: null,
  salesSort: null,
  techniqueId: null,
  creatorId: null,
})
const proListRef = ref<InstanceType<typeof ProList>>();
const getProductList = (params: IProduct.zoneCollectQuery) => getZoneCollectApi(params)

// 收藏/取消收藏
const productThumbs = debounce(async (item) => {
  if (!userStore.isLogin) {
    showLoginWindow()
    return
  }
  await productThumbsApi({mediaId: item.id, operate: ~~!item.like as Dict.ThumbsOperateType})
  item.like = !item.like
}, 300)

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
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
  search()
}

const search = () => {
  isPopup.value = false

  initParam.priceSort = priceSortSelected.value?.config?.code ?? null
  initParam.salesSort = salesSortSelected.value?.config?.code ?? null
  initParam.techniqueId = techniqueSelected.value?.config?.code || null
  initParam.creatorId = artistSelected.value?.id || null

  proListRef.value?.search(true);
}


</script>

<style scoped lang="scss">
  .sec-main {
    .buttons-wrapper {
      position: sticky;
      top: 0;
      z-index: 10;
      background: #fff;
    }
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
</style>