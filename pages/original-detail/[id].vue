<template>
  <!--规格选择-->
  <section>
    <div class="container">
      <div class="spu-wrapper row gap-row-base pt-md-50 pt-20">
        <div class="col-md-6">
          <div class="spu-preview">
            <div class="aspect-ratio acea-row row-center-wrapper">
              <ClientOnly>
                <HighResViewer
                  :thumbnail-src="imagePrefix(goodsDetail.img)"
                  :dzi-url="goodsDetail?.banners?.[0] ? imagePrefix(goodsDetail?.banners?.[0]) : ''"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="spu-spec">
            <p class="text-20 text-error">Transaction Price</p>
            <div class="acea-row row-between row-bottom mt-10 mb-40">
              <span class="text-60 f-bold-500">{{ currencyStore.formatToCurrency(goodsDetail.retailPrice || 0) }}</span>
              <el-tag type="danger" effect="dark" v-if="goodsDetail.status === '-1'">Sale Out</el-tag>
              <el-tag type="primary" effect="dark" v-if="goodsDetail.status === '0'">For Sale</el-tag>
            </div>
            <a
              class="block text-center bg-gray-700 text-white rounded-sm py-xl-20 py-md-15 py-10 text-20"
              v-if="goodsDetail.status === '0'"
              :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Initiate A Quotation')}&body=${encodeURIComponent(mailBody)}`"
            >
              Initiate A Quotation
            </a>
            <div class="row" v-else>
              <div
                class="col-6"
                v-for="item in specsCombination"
                :key="item.id"
              >
                <div
                  class="border-sm border-gray-700 cursor-pointer text-20 py-xl-20 py-md-15 py-10 text-center text-capitalize"
                  :class="[currentSpecId === item.id && 'bg-gray-700 text-white']"
                  @click="goReplicas(item)"
                >
                  View {{ item.craft }} <br> Replicas
                </div>
              </div>
            </div>
            <div class="py-20 mt-20 border-b-md border-gray-700 text-18 f-bold">
              About Original Painting
            </div>
            <ul class="text-gray-600 py-20">
              <li class="text-14">Returns and refu possible within 7 days from the date of receiving the product.</li>
              <li class="text-14 mt-10">Returns and refunds are possible within 7 days from the date of receiving the
                product. possible within 7 days from the date of receiving the product.
              </li>
            </ul>
            <div>
              <div class="row text-26 f-bold mb-40">
                <div class="col-3">Title</div>
                <div class="col-9">{{ goodsDetail.title || '-' }}</div>
              </div>
              <div class="row text-22" v-if="goodsDetail.creator">
                <div class="col-3">Creator</div>
                <div class="col-9">
                  <span class="text-underline cursor-pointer" @click="goArtistDetail">
                    {{ goodsDetail?.creator?.name || '-' }}
                  </span>
                </div>
              </div>
              <div class="row text-22 mt-20" v-for="(val, key) in goodsDetail.attributes" :key="key">
                <div class="col-3 text-capitalize">{{ key }}</div>
                <div class="col-9">
                  <template v-if="Array.isArray(val)">{{ val.join(' / ') }}</template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--创作者-->
  <section class="mt-lg-60 mt-sm-20" v-if="goodsDetail.creator">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">About the Artist</h1>
      <div class="artist-wrapper row gap-row-base">
        <div class="col-md-6">
          <div class="avatar" v-if="goodsDetail?.creator?.portrait">
            <img
              class="w-full"
              :src="imagePrefix(goodsDetail?.creator?.portrait)"
              alt="avatar"
            />
          </div>
          <p class="text-22 f-bold-500 my-20 text-underline cursor-pointer" @click="goArtistDetail">
            {{ goodsDetail?.creator?.name }}</p>
          <p class="text-16 f-bold-500 my-20">{{ goodsDetail?.creator?.region }}</p>
          <p class="text-18">{{ goodsDetail?.creator?.intro }}</p>
        </div>
        <div class="col-md-6" v-if="goodsDetail?.creator?.detail">
          <template v-for="(val, key) in goodsDetail.creator.detail">
            <p class="text-22 f-bold">{{ key }}</p>
            <div class="text-18 mt-md-20 mt-15" style="white-space: pre-line;" v-for="(val2, key2) in val" :key="key2">
              {{ val2 }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>

  <!--产品详情-->
  <section class="sec-desc mt-lg-60 mt-sm-20" :class="{ open: isOpenDesc }" v-if="goodsDetail?.details?.length">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Product Description</h1>
      <div class="img-box">
        <div v-for="item in goodsDetail.details" :key="item">
          <div v-if="false" class="p-20 bg-gray-700 text-white">
            <p class="text-20 acea-row row-middle">
              <span class="iconfont icon-info-fill text-30 mr-10"></span>
              Quick Overview
            </p>
            <p class="text-16 mt-10 mb-20">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cupiditate delectus deleniti
              excepturi illum iure officia provident quia, quidem recusandae reiciendis, rerum voluptate. Animi cumque
              hic necessitatibus, quae quaerat quasi.
            </p>
            <iframe
              width="100%"
              height="600"
              :src="item"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <ClientOnly v-if="item.includes('https://www.youtube.com/embed/')">
            <iframe
              width="100%"
              height="600"
              :src="item"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </ClientOnly>
          <img v-else class="w-full" :src="imagePrefix(item)" alt="">
        </div>
      </div>
      <div class="btn-box">
        <el-button class="w-full mt-20" plain size="large" @click="isOpenDesc = !isOpenDesc">
          {{ isOpenDesc ? 'Hide Product Details' : 'View More Product Details' }}
          <span class="iconfont ml-20" :class="isOpenDesc ? 'icon-up' : 'icon-down'"></span>
        </el-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {imagePrefix, jumpNewWindow} from "~/utils";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {IProduct} from "~/api/interface/product/product";
import {CONTACT_EMAIL} from "~/config";
import type {ISpecs} from "~/api/interface/specs/specs";
import {getSpecsListApi} from "~/api/modules/specs/specs";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {useUserStore} from "../../stores/modules/user";
import {useOriginalProductJsonLd} from "../../composables/useOriginalProductJsonLd";

onMounted(() => {
  if (goodsDetail.value.status === '-1') getSpecsList()
})

const route = useRoute();
const router = useRouter();
const userStore = useUserStore()
const currencyStore = useCurrencyStore()

const isOpenDesc = ref(false) // 是否展开产品详情

// 获取详情
const {data: goodsDetail} = await useAsyncData('goods-detail', async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IProduct.Row>>(config.public.apiBase + TRADE_MODULE + '/product/detail', {
    method: 'GET',
    params: {productId: route.params.id},
    headers: {
      'Token': userStore.token || '',
      'X-Currency': currencyStore.currentCurrency
    }
  })
  return data
})

const {injectProductJsonLd} = useOriginalProductJsonLd(goodsDetail.value, {})
injectProductJsonLd()

// 获取SKu
const currentSpecId = ref('')
const specsCombination = ref<ISpecs.Row[]>([])
const getSpecsList = async () => {
  const {data} = await getSpecsListApi(route.params.id)
  specsCombination.value = data
  currentSpecId.value = data[0]?.id || ''
}

const goArtistDetail = () => {
  router.push(`/artist-detail/${goodsDetail.value.creator?.id}`)
}

const goReplicas = (item: ISpecs.Row) => {
  const {referenceProductId, referenceSpecId} = item.specs
  jumpNewWindow(`/paint-detail/${referenceProductId}?specId=${referenceSpecId}`)
}

const mailBody = 'I hope this message finds you well.\nI am very interested in your artwork"[Artwork Title]"([attach image or link if possible]) and would like to inquire about its availability and pricing.\nCould you kindly provide the following information: \n1.Selling price (including or excluding framing and shipping)\n2.Dimensions, medium, and year of creation\n3.Whether it comes with the artist\'s signature and a certificate of authenticity\n4.Payment and delivery options\n5.Shipping and insurance arrangements (especially for international delivery)\nMy expected budget range is [USD____ - USD____]. If there are similar works in the same size and style within this range, I would be happy to consider them as well.\nI look forward to your reply and hope to discuss further.'

</script>

<style scoped lang="scss">
.spu-wrapper {
  --gutter: var(--gutter-md);

  .spu-preview {
    img {
      cursor: zoom-in;
    }
  }
}

.artist-wrapper {
  --gutter: var(--gutter-md);

  .avatar {
    max-width: 400px;
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
</style>