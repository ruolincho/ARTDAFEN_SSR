<template>
  <!--规格选择-->
  <section>
    <div class="container-middle">
      <div class="spu-wrapper row pt-md-50 pt-20">
        <div class="col-md-6">
          <el-skeleton :loading="isSkeleton" animated>
            <template #template>
              <el-skeleton-item variant="image" style="width: 100%; height: 34vw"/>
              <div class="acea-row my-10">
                <el-skeleton-item class="mr-10" variant="image" style="width: 4vw; height: 4vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 4vw; height: 4vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 4vw; height: 4vw; "/>
              </div>
              <div>
                <el-skeleton-item variant="h1" style="width: 20%;"/>
              </div>
              <div>
                <el-skeleton-item variant="p" style="width: 30%;"/>
              </div>
              <div>
                <el-skeleton-item variant="p" style="width: 20%;"/>
              </div>
            </template>
            <div class="spu-preview">
              <ClientOnly>
                <div class="thumb-wrapper">
                  <swiper
                    class="main-swiper"
                    :modules="modules"
                    :space-between="10"
                    :navigation="true"
                    :thumbs="{ swiper: thumbsSwiper }"
                  >
                    <swiper-slide
                      v-for="(banner, index) in goodsDetail.banners"
                      :key="index"
                    >
                      <div class="w-full h-full acea-row row-center-wrapper">
                        <img :src="imagePrefix(banner)" alt="banner"
                             style="user-select: none; max-height: 100%; max-width: 100%;"/>
                      </div>
                    </swiper-slide>
                  </swiper>
                  <swiper
                    class="thumb-swiper my-10"
                    :modules="modules"
                    :space-between="10"
                    :slides-per-view="5"
                    :watch-slides-progress="true"
                    :prevent-clicks="false"
                    :prevent-clicks-propagation="false"
                    @swiper="setThumbsSwiper"
                    :breakpoints="{
                  '414': { slidesPerView: 7 },
                }"
                  >
                    <swiper-slide
                      v-for="(banner, index) in goodsDetail.banners"
                      :key="index"
                    >
                      <div class="w-full h-full acea-row row-center-wrapper">
                        <img :src="imagePrefix(banner)" alt="banner"
                             style="user-select: none; max-height: 100%; max-width: 100%;"/>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </ClientOnly>
              <div class="p-20 f-bold-500 text-16 border-sm">
                <p>Product Parameter</p>
                <p class="mt-10" v-for="(val, key) in selectedCombination">{{ key }}: {{ val }}</p>
                <template v-if="Object.keys(goodsDetail.attributes).length">
                  <p class="mt-10">Product Attribute</p>
                  <template v-for="(val, key) in goodsDetail.attributes" :key="index">
                    <p class="mt-10">{{ key }}:
                      <template v-if="Array.isArray(val)">{{ val.join(' / ') }}</template>
                    </p>
                  </template>
                </template>
              </div>
              <!--              <div class="border-t-sm p-20 text-16 f-bold-500">-->
              <!--                All framing includes free canvas stretching, mounting & wall hooks.Your framed-->
              <!--                oil painting will arrive to your door ready to hang on your wall.-->
              <!--              </div>-->
            </div>
          </el-skeleton>
        </div>
        <div class="col-md-6">
          <el-skeleton :loading="isSkeleton" animated>
            <template #template>
              <div>
                <el-skeleton-item variant="h1" style="width: 50%;"/>
              </div>
              <div class="my-10">
                <el-skeleton-item variant="h1" style="width: 20%;"/>
              </div>
              <div class="acea-row my-10">
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item variant="image" style="width: 8vw; height: 8vw; "/>
              </div>
              <div class="my-10">
                <el-skeleton-item variant="h1" style="width: 20%;"/>
              </div>
              <div class="acea-row my-10">
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item variant="image" style="width: 8vw; height: 8vw; "/>
              </div>
              <div class="acea-row row-right my-10">
                <el-skeleton-item variant="p" style="width: 30%;"/>
              </div>
              <div class="my-10">
                <el-skeleton-item variant="p" style="width: 100%; height: 5vh;"/>
              </div>
            </template>
            <div class="spu-spec">
              <div class="acea-row row-center-wrapper border-t-md border-gray-700">
                <span class="flex-1 border-r-md border-gray-700 py-20 text-20 f-bold-500">{{ goodsDetail.title }}</span>
                <span class="iconfont icon-follow text-24 px-20 cursor-pointer" v-show="!isThumbs"
                      @click="productThumbs"></span>
                <span class="iconfont icon-follow-fill text-24 px-20 cursor-pointer text-error" v-show="isThumbs"
                      @click="productThumbs"></span>
              </div>
              <div class="text-14 cursor-pointer text-underline" @click="handleClickArtist">
                by:{{ goodsDetail.creator?.name }}
              </div>
              <div class="sku-wrapper" v-for="(item, index1) in mySpecsList" :key="index1">
                <div class="f-bold text-20 py-24">{{ item.name }}</div>
                <div class="row sku-list">
                  <div class="col-md-3 col-4" v-for="(item_value, index2) in item.list" :key="index2">
                    <div
                      class="sku-item border-sm cursor-pointer"
                      :class="{
                    'sku-disabled': !item_value.isDisabled,
                    'sku-selected': selectArr[index1] == item_value.val,
                    'border-gray-700': selectArr[index1] == item_value.val,
                  }"
                      @click="handleSelectSpecs(item_value, index1, index2, item.name)"
                    >
                      <div class="sku-img aspect-ratio" v-if="item_value.img">
                        <img class="w-full h-full fit-cover" :src="imagePrefix(item_value.img)" :alt="item_value.val"/>
                      </div>
                      <p class="line1 my-10 mx-20 text-center text-18">{{ item_value.val }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-20 mt-20 acea-row row-right text-20 bg-gray-100">
                <p class="f-bold">Total：<span
                  class="text-26 text-error">{{ currencyStore.formatToCurrency(currentPrice || 0) }}</span></p>
              </div>
              <el-button class="w-full add-cart__button" size="large" type="danger" @click="addToCart"
                         :disabled="!chooseComplete || stockNum == 0 || isShelves == true">Add To Cart
              </el-button>
            </div>
          </el-skeleton>
        </div>
      </div>
    </div>
  </section>

  <!--创作者-->
  <section class="mt-lg-60 mt-sm-20" v-if="goodsDetail.creator">
    <div class="container-middle">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">About the Artist</h1>
      <div class="artist-box acea-row gap-base">
        <div class="avatar" v-if="goodsDetail.creator?.portrait">
          <img class="w-full" :src="imagePrefix(goodsDetail.creator?.portrait)" alt="avatar">
        </div>
        <div class="info flex-1 text-gray-600">
          <p class="text-16 f-bold-500">{{ goodsDetail.creator?.timeline || '--' }}</p>
          <p class="text-20 f-bold-500 text-gray-700 my-10">{{ goodsDetail.creator?.name }}</p>
          <!--          <p class="text-16 f-bold-500 my-10">19th-Century</p>-->
          <p class="text-18">{{ goodsDetail.creator?.intro }}</p>
        </div>
      </div>

    </div>
  </section>

  <!--产品详情-->
  <section class="sec-desc mt-lg-60 mt-sm-20" :class="{ open: isOpenDesc }" v-if="goodsDetail?.details?.length">
    <div class="container-middle">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Product Description</h1>
      <div class="img-box">
        <img v-for="item in goodsDetail.details" :key="item" class="w-full" :src="imagePrefix(item)" alt="detail">
      </div>
      <div class="btn-box">
        <el-button class="w-full mt-20" plain size="large" @click="isOpenDesc = !isOpenDesc">
          {{ isOpenDesc ? 'Hide Product Details' : 'View More Product Details' }}
          <span class="iconfont ml-20" :class="isOpenDesc ? 'icon-up' : 'icon-down'"></span>
        </el-button>
      </div>
    </div>
  </section>

  <!-- 相关推荐-->
  <section class="mt-lg-60 mt-sm-20" v-if="relatedList.length">
    <div class="container-middle">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Product Related</h1>
      <ClientOnly>
        <div class="recommend-swiper">
          <swiper
            :modules="modules"
            :navigation="{ nextEl: '.related-next', prevEl: '.related-prev' }"
            :pagination="{
          el: '.pagination-related',
          type: 'fraction'
         }"
            :autoplay="{ delay: 5000 }"
            :breakpoints="{
          '1680': { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
          '1460': { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
          '1260': { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
          '375': { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
        }"
          >
            <swiper-slide v-for="item in relatedList" :key="item.id">
              <div class="explore-item cursor-pointer" @click="jumpToProduct(item)">
                <div class="aspect-ratio">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.title"/>
                </div>
                <p class="line1 text-14 my-8">{{ item.title }}</p>
                <p class="text-12 f-bold">{{ currencyStore.formatToCurrency(item.retailPrice || 0) }}</p>
              </div>
            </swiper-slide>
          </swiper>
          <div class="recommend-button swiper-button-next related-next"></div>
          <div class="recommend-button swiper-button-prev related-prev"></div>
          <div class="recommend-pagination swiper-pagination pagination-related"></div>
        </div>
      </ClientOnly>
    </div>
  </section>

  <!-- 品牌-->
  <section class="mt-lg-60 mt-sm-20" v-if="goodsDetail?.brand?.id">
    <div class="container-middle">
      <div class="brand-topic mb-20">
        <div class="brand-topic-caption text-white text-26">
          <p>{{ goodsDetail?.brand?.name }}</p>
          <p class="text-60 f-bold my-xs-20 my-15">{{ goodsDetail?.brand?.title }}</p>
          <p>{{ goodsDetail?.brand?.intro }}</p>
        </div>
        <button class="caption-btn text-28 p-xs-20 p-15" @click="handleClickBrand">
          Brand Home
          <span class="iconfont icon-right-arrow text-28 ml-xs-60 ml-30"></span>
        </button>
        <img class="w-full pc" :src="imagePrefix(goodsDetail?.brand?.background)" alt="brand">
        <img class="w-full app" :src="imagePrefix(goodsDetail?.brand?.img)" alt="brand">
      </div>
      <ClientOnly>
        <div class="recommend-swiper">
          <swiper
            :modules="modules"
            :navigation="{ nextEl: '.brand-next', prevEl: '.brand-prev' }"
            :pagination="{
          el: '.pagination-brand',
          type: 'fraction'
         }"
            :autoplay="{ delay: 5000 }"
            :breakpoints="{
          '1680': { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
          '1460': { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
          '1260': { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
          '375': { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
        }"
          >
            <swiper-slide v-for="item in brandRecList" :key="item.id">
              <div class="explore-item cursor-pointer" @click="jumpToProduct(item)">
                <div class="aspect-ratio">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.title"/>
                </div>
                <p class="line1 text-14 my-8">{{ item.title }}</p>
                <p class="text-12 f-bold">{{ item.retailPrice }}</p>
              </div>
            </swiper-slide>
          </swiper>
          <div class="recommend-button swiper-button-next brand-next"></div>
          <div class="recommend-button swiper-button-prev brand-prev"></div>
          <div class="recommend-pagination swiper-pagination pagination-brand"></div>
        </div>
      </ClientOnly>
    </div>
  </section>

  <!-- FQ4-->
  <section class="mt-lg-60 mt-sm-20">
    <div class="container-middle">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Frequently Asked Questions</h1>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="subItem in shoppingFaq" :title="subItem.title" :name="subItem.name"
                          :key="subItem.name">
          <template #icon="{ isActive }">
            <p style="margin-left:  auto">
              <span class="iconfont text-20 ml-10" :class="isActive ? 'icon-reduce' : 'icon-add'"></span>
            </p>
          </template>
          <div class="px-20 py-24" v-html="subItem.content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import type SwiperClass from 'swiper'
import {Autoplay, Navigation, Pagination, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {debounce, imagePrefix, jumpToProduct} from "~/utils";
import type {IProduct} from "~/api/interface/product/product";
import {getBrandRecommendApi, getRelatedRecommendApi} from "~/api/modules/product/product";
import type {ISpecs} from "~/api/interface/specs/specs";
import {getSpecsListApi} from "~/api/modules/specs/specs";
import type {IShopping} from "~/api/interface/shopping/shopping";
import {useCartStore} from "~/stores/modules/cart";
import {ElMessage} from "element-plus";
import {getIsThumbsApi, productThumbsApi} from "~/api/modules/likes/likes";
import {gen_path_obj} from "~/utils/product";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import {PRODUCT_URL} from "~/config";
import {shoppingFaq} from "~/config/faq";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {packQuery} from "~/composables/useQueryShort";
import {unpackSpecs} from "~/composables/useSpotSpecToken";
import {useProductJsonLd} from "~/composables/useProductJsonLd";

defineOptions({
  name: 'SpotDetail'
})

onMounted(async () => {
  specsList.value = goodsDetail.value.specs
  specsCombination.value = goodsDetail.value.specsCombo
  _initSpecs()
  if (goodsDetail.value.brand?.id) await getBrandRecommend() // 获取品牌推荐
  await getRelatedRecommend()
  if (userStore.isLogin) {
    await getIsThumbs()
  }
  $bus.on('loginSuccess', getIsThumbs)
})

onUnmounted(() => {
  $bus.off('loginSuccess', getIsThumbs)
})

const {$bus} = useNuxtApp()
const userStore = useUserStore()
const cartStore = useCartStore()
const route = useRoute();
const router = useRouter();
const currencyStore = useCurrencyStore()

const modules = [Autoplay, Pagination, Navigation, Thumbs]

const activeName = ref('')

const isOpenDesc = ref(false) // 是否展开产品详情

// 获取详情
const {data: goodsDetail, pending: isSkeleton} = await useAsyncData('goods-detail', async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IProduct.Row>>(config.public.apiBase + TRADE_MODULE + '/product/detail', {
    method: 'GET',
    params: {
      productId: route.params.id
    },
    headers: {
      'Token': userStore.token || '',
      'X-Currency': currencyStore.currentCurrency
    }
  })
  return data
})

const { injectProductJsonLd, jsonLd } = useProductJsonLd(goodsDetail.value, { priceValidUntilDays: 7 })
injectProductJsonLd()
console.log('injectProductJsonLd =>', jsonLd.value)

const specsCombination = ref<ISpecs.Row[]>([]) // Sku组合数据
const specsList = ref({} as Record<string, ISpecs.SpecsListSchema[]>)
const subIndex = ref<number[]>([]) // 是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
const shopItemInfo = ref({}) // 可选的SKU组合对象
const mySpecsList = ref<ISpecs.SpecsSchema[]>([]) // 对后端spec加工后端的spec
const selectedCombination = ref({} as Record<string, string>) // 已经选中的组合，带属性名 {"颜色":"梦幻紫", "尺寸(CM)":"13.3", "材质/工艺":"合金+电镀"}
const selectArr = ref<string[]>([]) // 已经选中的组合，不带属性名 ["梦幻紫", "13.3", "合金+电镀"]
const selectedCombinationLabel = computed(() => Object.values(selectedCombination.value).join(' ')) // 全部选中的属性值
// 初始化规格
const _initSpecs = () => {
  // 1.对后端返回的specs进行处理
  const originSpecList = specsList.value
  mySpecsList.value = Object.keys(originSpecList).reduce((prev, cur) => {
    return prev.concat({
      list: originSpecList[cur],
      name: cur,
    })
  }, [])

  // 2.默认选择,没有的话选择所有中的第一个
  if (route.query.q) {
    const pairs = unpackSpecs(route.query.q)
    const desired = new Map<string, string>(pairs.map(p => [p.name, p.val]))
    const _selectedCombination: Record<string, string> = {}
    const _selectArr: string[] = []
    const _subIndex: number[] = []
    for (const group of mySpecsList.value) {
      const gName = group.name
      const wantVal = desired.get(gName) ?? ''            // 没给就置空
      _selectedCombination[gName] = wantVal                // 1) 键值对（按组名）
      _selectArr.push(wantVal)                             // 2) 顺序数组（按组顺序）
      const idx = group.list.findIndex(it => it.val === wantVal)
      _subIndex.push(idx)                                  // 3) 索引数组（找不到为 -1）
    }

    selectedCombination.value = _selectedCombination
    selectArr.value = _selectArr
    subIndex.value = _subIndex

  } else {
    mySpecsList.value.forEach((item, i) => {
      selectedCombination.value[item.name] = item.list[0].val
      selectArr.value[i] = item.list[0].val
      subIndex.value[i] = 0
    })
  }

  // 3.去除库存小于等于0的商品sku,并生成可以选中的组合列表
  checkItem()

  // 4.
  checkInpath(-1)
}

// 计算sku里面规格形成路径
const checkItem = () => {
  let skuList = specsCombination.value.filter((skuItem) => parseInt(skuItem.retailStock) > 0 && skuItem.status == '0')
  // 计算有多小种可选路径
  skuList.reduce(
    (arrs, items) => {
      let specs = Object.values(items.specs)
      return arrs.concat(
        specs.reduce(
          (arr, item) => {
            return arr.concat(
              arr.map((item2) => {
                if (
                  !Object.prototype.hasOwnProperty.call(
                    shopItemInfo.value,
                    getArrayToSting([...item2, item])
                  )) {
                  shopItemInfo.value[getArrayToSting([...item2, item])] = items
                }
                return [...item2, item]
              }),
            )
          },
          [[]],
        ),
      )
    },
    [[]],
  )
}

// 检查路径
const checkInpath = (clickIndex: number) => {
  // console.time('checkInpath')
  const MY_SPECS_LIST = mySpecsList.value
  for (let i = 0, len = MY_SPECS_LIST.length; i < len; i++) {
    // if (i == clickIndex) {
    //   continue
    // }
    let len2 = MY_SPECS_LIST[i].list.length
    for (let j = 0; j < len2; j++) {
      // if (subIndex.value[i] != -1 && j == subIndex.value[i]) {
      //   continue
      // }
      let choosed_copy = [...selectArr.value]
      choosed_copy[i] = MY_SPECS_LIST[i].list[j].val
      let choosed_copy2 = choosed_copy.filter((item) => item !== '' && typeof item !== 'undefined')
      if (
        Object.prototype.hasOwnProperty.call(shopItemInfo.value, getArrayToSting(choosed_copy2))
      ) {
        MY_SPECS_LIST[i].list[j].isDisabled = true
      } else {
        MY_SPECS_LIST[i].list[j].isDisabled = false
      }
    }
  }
  // console.timeEnd('checkInpath')
}

// 字符串数组转字符串
const getArrayToSting = (arr: string[]) => {
  let str = ''
  arr.map((item, index) => {
    item = item.replace(/\./g, '。')
    if (index == 0) {
      str += item
    } else {
      str += ',' + item
    }
  })
  return str
}

// 选中
const handleSelectSpecs = (
  value: ISpecs.SpecsListSchema,
  index1: number,
  index2: number,
  specsKey: string,
) => {
  // if (!value.isDisabled) return

  if (selectArr.value[index1] != value.val) {
    selectArr.value[index1] = value.val
    subIndex.value[index1] = index2
    selectedCombination.value[specsKey] = value.val
  } else {
    selectArr.value[index1] = ''
    subIndex.value[index1] = -1
    selectedCombination.value[specsKey] = ''
  }
  checkInpath(index1)
}

// 是否全部选中
const chooseComplete = computed(() => {
  const attrNum = Object.values(specsList.value).length
  let selectedNum = 0
  selectArr.value.forEach((val) => {
    val && selectedNum++
  })
  return attrNum === selectedNum
})

// 全部选中后的SKU
const chooseCompleteSku = computed<ISpecs.Row>(() => {
  if (chooseComplete.value) {
    const key = JSON.stringify(selectedCombination.value)
    let result = null
    specsCombination.value.forEach((item) => {
      if (JSON.stringify(item.specs) === key) {
        result = item
      }
    })
    return result
  }
  return null
})

// 当前价格
const currentPrice = computed(() => {
  if (chooseComplete.value) {
    if (chooseCompleteSku.value) {
      return chooseCompleteSku.value.retailPrice
    }
  }
  return goodsDetail.value.retailPrice
})

// 库存
const stockNum = computed(() => {
  if (chooseComplete.value) {
    if (chooseCompleteSku.value) {
      return parseInt(chooseCompleteSku.value.retailStock)
    }
  }
  return 0
})

// 是否下架
const isShelves = computed(() => {
  if (chooseComplete.value) {
    if (chooseCompleteSku.value) {
      return chooseCompleteSku.value.status == '1'
    }
  }
  return false
})

// 添加购物车
const addToCart = () => {
  const currentSku = JSON.parse(JSON.stringify(chooseCompleteSku.value))
  const currentSpecs = JSON.parse(JSON.stringify(selectedCombination.value))
  const cartRow: IShopping.ShoppingCartsStorageRow = {
    productId: goodsDetail.value.id, // 商品ID
    techniqueId: goodsDetail.value.techniqueId, // 工艺编号
    title: goodsDetail.value.title, // 商品标题
    deliveryType: goodsDetail.value.deliveryType || '0', // 配送方式
    retailPrice: currentSku.retailPrice, // 商品售价
    redeemPoints: currentSku.redeemPoints, // 商品积分
    img: currentSku.img, // 商品图片
    shopId: goodsDetail.value.merchant?.id, // 商家编号
    specsId: currentSku.id, // 商品规格编号
    specs: currentSpecs, // 商品规格值
    quantity: 1, // 购买数量
    dimensionId: null,
    parts: {}
  }
  cartStore.addition(cartRow)
  ElMessage.success('Add to cart success!')
  $bus.emit('openCartWindow')
}

const thumbsSwiper = ref<SwiperClass>()
const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}

// 获取相关推荐产品
const relatedList = ref<General.GoodsItem[]>([])
const getRelatedRecommend = async () => {
  const {data} = await getRelatedRecommendApi({
    techniqueId: goodsDetail.value.techniqueId,
    productId: goodsDetail.value.id,
    creatorId: goodsDetail.value.creator.id
  })
  relatedList.value = data
}

// 获取品牌推荐产品
const brandRecList = ref<General.GoodsItem[]>([])
const getBrandRecommend = async () => {
  const {data} = await getBrandRecommendApi({
    brandId: goodsDetail.value.brand.id,
    productId: goodsDetail.value.id,
  })
  brandRecList.value = data
}

// 是否收藏
const isThumbs = ref(false)
const getIsThumbs = async () => {
  const {data} = await getIsThumbsApi({mediaId: route.params.id, type: '0'})
  isThumbs.value = data
}

// 收藏/取消收藏
const productThumbs = debounce(async () => {
  if (!userStore.isLogin) {
    showLoginWindow()
    return
  }

  await productThumbsApi({mediaId: route.params.id, operate: ~~!isThumbs.value as Dict.ThumbsOperateType})
  isThumbs.value = !isThumbs.value
}, 300)

// 点击艺术家
const handleClickArtist = () => {
  router.push({
    path: PRODUCT_URL,
    query: {q: packQuery(gen_path_obj(goodsDetail.value.creator, 'ARTIST', ['name']))}
  })
}

// 点击品牌
const handleClickBrand = () => {
  router.push({
    path: PRODUCT_URL,
    query: {q: gen_path_obj(goodsDetail.value.brand, 'BRAND', ['name'])}
  })
}

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

const origin = useRequestURL().origin
useHead({
  link: [
    {rel: 'canonical', href: `${origin}/spot-detail`},
  ],
  meta: [
    { name: 'robots', content: 'index, follow' },
  ],
})

</script>

<style scoped lang="scss">
.spu-wrapper {

  .spu-preview {
    .thumb-wrapper {
      .main-swiper {
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
        }

        .swiper-slide {
          aspect-ratio: 1 / 1;
        }

      }

      .thumb-swiper {
        .swiper-slide {
          aspect-ratio: 1 / 1;
          cursor: pointer;
          border: var(--border-width-md) solid var(--color-gray-200);

          &.swiper-slide-thumb-active {
            border-color: var(--color-primary);
          }
        }
      }
    }
  }

  .spu-spec {
    .sku-wrapper {
      .sku-list {
        row-gap: var(--gutter-base);

        .sku-item {

          &.sku-selected {
            background-color: var(--color-primary);
            color: #fff;
          }

          &.sku-disabled {
            color: var(--color-gray-400);
          }

          &.sku-selected.sku-disabled {
            background-color: var(--color-gray-400);
            color: #fff;

            .sku-img {
              filter: grayscale(100%);
            }
          }
        }
      }
    }
  }
}

.artist-info {
  gap: 20px;

  .avatar {
    width: 200px;
    flex-shrink: 0;
  }
}

.sec-desc {
  .img-box {
    max-height: 500px;
    overflow: hidden;
  }

  .btn-box {
    position: relative;

    &::after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 100%;
      height: 160px;
      background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
      content: "";
    }
  }

  &.open {
    .img-box {
      max-height: unset;
    }

    .btn-box::after {
      display: none;
    }
  }
}

.recommend-swiper {
  position: relative;

  .swiper {
    padding-bottom: 105px;
  }

  .recommend-pagination {
    color: var(--color-gray-600);
    font-size: 30px;
    bottom: 30px;

    :deep(.swiper-pagination-current) {
      color: var(--color-gray-700)
    }
  }

  :deep(.swiper-pagination-lock) {
    display: block !important;
  }

  .recommend-button {
    --swiper-navigation-color: var(--color-primary);
    top: unset;
    bottom: 30px;
    width: 45px;
    height: 45px;
    z-index: 11;
    text-align: center;

    &::after {
      font-size: 18px;
      line-height: 45px;
    }

    &.swiper-button-prev {
      left: 40%;
    }

    &.swiper-button-next {
      right: 40%;
    }
  }
}

.brand-topic {
  position: relative;

  .brand-topic-caption {
    position: absolute;
    z-index: 1;
    left: 60px;
    top: 60px;
  }

  .caption-btn {
    position: absolute;
    z-index: 2;
    border: var(--border-width-sm) solid #fff;
    color: #fff;
    cursor: pointer;
    left: 60px;
    bottom: 60px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
}

.artist-box .avatar {
  min-width: 100px;
  width: 13.15%;
}

:deep(.swiper-pagination-lock),
:deep(.swiper-button-lock) {
  display: flex !important;
}

@media (max-width: 1260px) {
  .recommend-swiper {
    .swiper {
      padding-bottom: 80px;
    }

    .recommend-pagination {
      font-size: 15px;
    }

    .recommend-button {
      width: 22px;
      height: 22px;

      &::after {
        font-size: 10px;
        line-height: 22px;
      }

      &.swiper-button-prev {
        left: 20%;
      }

      &.swiper-button-next {
        right: 20%;
      }
    }
  }

  .brand-topic {
    .brand-topic-caption {
      left: 30px;
      top: 30px;
    }

    .caption-btn {
      left: 30px;
      bottom: 30px;
    }
  }
}

@media (max-width: 991px) {
  .spu-wrapper {
    .spu-preview {
      .thumb-wrapper {
        .main-swiper {
          --swiper-navigation-size: 20px;

          :deep(.swiper-button-prev),
          :deep(.swiper-button-next) {
            width: 38px;
            height: 60px;
          }

        }
      }
    }
  }

}

@media (max-width: 414px) {
  .brand-topic {
    .brand-topic-caption {
      left: 20px;
      top: 20px;
    }

    .caption-btn {
      left: 20px;
      bottom: 20px;
    }
  }
}
</style>