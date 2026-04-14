<template>
  <!--创作者-->
  <section class="mt-lg-60 mt-sm-20">
    <div class="container">
      <div class="artist-wrapper row gap-row-base">
        <div class="col-md-6">
          <div class="avatar" v-if="artistDetail?.portrait">
            <img class="w-full" :src="imagePrefix(artistDetail?.portrait)" :alt="`Portrait of ${artistDetail?.name}`">
          </div>
          <p class="text-22 f-bold-500 my-20 text-underline cursor-pointer">{{ artistDetail?.name }}</p>
          <p class="text-16 f-bold-500 my-20">{{ artistDetail?.location }}</p>
          <p class="text-18">{{ artistDetail?.intro }}</p>
        </div>
        <div class="col-md-6" v-if="artistDetail?.detail">
          <template v-for="(val, key) in artistDetail.detail">
            <p class="text-22 f-bold">{{ key }}</p>
            <div class="text-18 mt-md-20 mt-15" style="white-space: pre-line;" v-for="(val2, key2) in val" :key="key2">
              {{ val2 }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-desc mt-lg-60 mt-sm-20">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Art Work</h1>
      <ClientOnly>
        <!--商品数据-->
        <ProList
          ref="proListRef"
          :request-api="getProductList"
          :init-param="initParam"
          :scroll-auto="false"
        >
          <template #default="scope">
            <div class="row product-list gap-row-base">
              <div class="col-2xl-average col-lg-3 col-md-4 col-6" v-for="item in scope.rows" :key="item.id">
                <GoodsItem :item="item" @thumbsClick="productThumbs" @artistClick="handleClickArtist" />
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

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {debounce} from "~/utils";
import ProList from "~/components/ProList/index.vue";
import type {IProduct} from "~/api/interface/product/product";
import {getArtworksApi} from "~/api/modules/product/product";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import {productThumbsApi} from "~/api/modules/likes/likes";
import {COLLECTIONS_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import type {IArtists} from "~/api/interface/artists/artists";
import {packQuery} from "~/composables/useQueryShort";
import type {ObjectNode} from "~/types/global";
import {useImage} from "~/composables/useImage";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";

onMounted(() => {
  $bus.on('loginSuccess', () => {
    proListRef.value?.reset()
  })
})

const origin = useRequestURL().origin
const { imagePrefix } = useImage()
const {$bus} = useNuxtApp()
const route = useRoute();
const router = useRouter();
const userStore = useUserStore()

// 获取详情
const config = useRuntimeConfig()
const {data: artistDetail } = await useAsyncData(
    'artist-detail',
    async () => {
      const {data} = await $fetch<IResultData<ObjectNode.Creator>>(config.public.apiBase + TRADE_MODULE + `/artists/detail/${route.params.id}`, {
        method: 'GET',
        headers: {
          'Token': userStore.token || '',
        }
      })
      return data
    }
)

const pageUrl = computed(() => `${origin}${route.path}`)

const pageTitle = computed(() => `${artistDetail.value?.name}  - Artist Introduction | ARTDAFEN`)

const pageDescription = computed(() => {
  if (artistDetail.value?.intro) {
    return artistDetail.value.intro.length > 150
        ? artistDetail.value.intro.substring(0, 150) + '...'
        : artistDetail.value.intro
  }
  return `Discover the life, artworks, and legacy of ${artistDetail.value?.name} on ARTDAFEN. Explore their timeline ${artistDetail.value?.timeline || ''}.`
})

useHead({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDescription.value }
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": artistDetail.value?.name,
        "description": pageDescription.value,
        "image": imagePrefix(artistDetail.value?.portrait),
        "url": pageUrl.value,
        "jobTitle": "Artist"
      })
    }
  ]
})

const proListRef = ref<InstanceType<typeof ProList>>();
const getProductList = (params: IProduct.ArtworksQuery) => getArtworksApi(params)
const initParam = ref({
  creatorId: route.params.id as string,
  size: 25
})

// 点击艺术家
const handleClickArtist = (creator: ObjectNode.Creator | IArtists.Row) => {
  router.push({
    path: COLLECTIONS_URL,
    query: {q: packQuery(gen_path_obj(creator, 'ARTIST', ['name']))}
  })
}

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
</script>

<style scoped lang="scss">
.artist-wrapper {
  --gutter: var(--gutter-md);

  .avatar {
    max-width: 300px;
  }
}
</style>