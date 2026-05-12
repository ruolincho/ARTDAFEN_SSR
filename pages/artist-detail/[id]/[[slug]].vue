<template>
  <!--艺术家信息-->
  <section class="mt-lg-60 mt-20">
    <div class="container-middle">
      <div class="artist-wrapper acea-row row-middle">
        <div class="artist-avatar aspect-ratio overflow-hidden rounded-md">
          <img
              class="w-full h-full fit-cover"
              :src="imagePrefix(artistDetail?.portrait)"
              :alt="`Portrait of ${artistDetail?.name}`"
          >
        </div>
        <div class="artist-content">
          <p class="text-14 f-bold-500 text-capitalize" v-if="artistDetail?.region">From {{ artistDetail?.region }}</p>
          <p class="text-60 f-bold-500 my-20">{{ artistDetail?.name }}</p>
          <p class="text-16 text-gray-500 mb-20" style="line-height: 1.7">{{ artistDetail?.intro }}</p>
          <el-button type="primary" size="large">
            <NuxtLink :to="generatedPath">Explore Collection</NuxtLink>
          </el-button>
        </div>
      </div>
    </div>
  </section>

  <!--艺术家作品-->
  <section class="mt-lg-60 mt-20" v-if="artworks.length">
    <div class="container">
      <div class="mb-lg-60 mb-20 acea-row row-between-wrapper">
        <h1 class="section-title text-40 f-bold-500">Art by {{ artistDetail?.name }}</h1>
        <NuxtLink :to="generatedPath" class="view-all acea-row row-middle">
          View all
          <div class="icon-box ml-10">
            <SvgIcon name="right" />
          </div>
        </NuxtLink>
      </div>

      <div class="row product-list gap-row-base">
        <div class="col-2xl-average col-md-3 col-sm-4 col-6" v-for="item in artworks" :key="item.id">
          <GoodsItem :item="item" @thumbsClick="productThumbs" :clickArtistFn="handleClickArtist" />
        </div>
      </div>
    </div>
  </section>

  <!--艺术家故事-->
  <section class="mt-lg-60 mt-20" v-if="artistDetail?.description">
    <div class="container">
      <div class="title-box text-center">
        <h1 class="text-60 f-bold-500">{{ artistDetail?.name }}</h1>
        <p class="mt-10 text-gray-500" style="line-height: 1.7">{{ artistDetail?.description }}</p>
      </div>
    </div>
  </section>

  <!--艺术家探索-->
  <section class="mt-lg-60 mt-20">
    <div class="container">
      <div class="mb-lg-60 mb-20 acea-row row-between-wrapper">
        <h1 class="section-title text-40 f-bold-500">Explore More Artists</h1>
        <NuxtLink to="/artists-brief" class="view-all acea-row row-middle">
          View all
          <div class="icon-box ml-10">
            <SvgIcon name="right" />
          </div>
        </NuxtLink>
      </div>
      <DataState
          :loading="isLoading"
          :is-empty="artistExplore === 0"
          :error="error"
          :retry="getArtistExplore"
      >
        <div class="artist-list row gap-row-base">
          <div class="col-xl-average col-md-3 col-sm-4 col-6" v-for="item in artistExplore" :key="item.id">
            <NuxtLink class="artist-item bg-gray-100 rounded-md text-center" :to="`/artist-detail/${item.id}/${item.slug}`" external>
              <img class="aspect-ratio fit-cover" :src="imagePrefix(item?.portrait)"
                   :alt="`Portrait of ${item.name}`">
              <div class="artist-content mt-15 acea-row row-center-wrapper overflow-hidden nowrap">
                <span class="line1">{{ item.name }}</span>
                <div class="icon-box">
                  <SvgIcon name="right" />
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </DataState>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {debounce} from "~/utils";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import {productThumbsApi} from "~/api/modules/likes/likes";
import {COLLECTIONS_URL} from "~/config";
import type {IArtists} from "~/api/interface/artists/artists";
import {packQuery} from "~/composables/useQueryShort";
import type {ObjectNode, General} from "~/types/global";
import {useImage} from "~/composables/useImage";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {getArtistExploreApi} from "~/api/modules/artists/artists";
import {useCurrencyStore} from "~/stores/modules/currency";

onMounted(() => {
  $bus.on('loginSuccess', () => {
    proListRef.value?.reset()
  })
  getArtistExplore()
})

const origin = useRequestURL().origin
const {imagePrefix} = useImage()
const {currentCurrency} = useCurrencyStore();
const {$bus} = useNuxtApp()
const route = useRoute();
const userStore = useUserStore()
const artistId = toRef(route.params, 'id') // 响应式拿 id

// 获取详情
const config = useRuntimeConfig()
const artworks = ref<General.GoodsItem>([])
const {data: artistDetail} = await useAsyncData(
    `artist-detail-${artistId.value}`,
    async () => {
      const {data} = await $fetch<IResultData<IArtists.DetailRow>>(config.public.apiBase + TRADE_MODULE + `/artists/detail/${artistId.value}`, {
        method: 'GET',
        headers: {
          'Token': userStore.token || '',
          'X-Currency': currentCurrency
        }
      })
      artworks.value = data.artworks ?? []
      return data
    }
)

// 艺术家探索
const error = ref<any>()
const isLoading = ref(false)
const artistExplore = ref<ObjectNode.Creator[]>([])
const getArtistExplore = async () => {
  try {
    isLoading.value = true
    error.value = null
    const {data} = await getArtistExploreApi(artistId.value as string)
    artistExplore.value = data
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }
}

const generatedPath = computed<string>(() => {
  const q = packQuery({PAGE: 1, SEARCH_TYPE: 'artists'})
  return `${COLLECTIONS_URL}/${artistDetail.value?.slug}?q=${q}`
})

// 点击艺术家
const handleClickArtist = () => {}

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
    {name: 'description', content: pageDescription.value}
  ],
  link: [
    {rel: 'canonical', href: pageUrl.value}
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
</script>

<style scoped lang="scss">
  .artist-wrapper {
    gap: 100px;
    flex-wrap: wrap;

    .artist-avatar {
      width: 39.40%;
      flex-shrink: 0;
    }

    .artist-content {
      flex: 1;
    }

    @media (max-width: 991px) {
      gap: 50px;
    }

    @media (max-width: 768px) {
      gap: 20px;

      .artist-avatar,
      .artist-content {
        width: 100%;
      }

      .artist-content {
        text-align: center;
      }
    }
  }

  .section-title {
    background-image: linear-gradient(270deg, rgba(188, 188, 188, 1), rgba(26, 26, 26, 1) 100%);
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    -webkit-background-clip: text;
    background-clip: text;
    color: #0000;
    display: inline-block;
  }

  .view-all {
    font-size: 14px;
    color: var(--color-gray-500);
    transition: all 0.35s;

    .icon-box {
      width: 24px;
      height: 24px;
      background: var(--color-gray-200);
      border-radius: 50%;
      color: var(--color-primary);
      transition: all 0.35s;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconify {
        font-size: 12px;
      }
    }

    &:hover {
      color: var(--color-gray-700);

      .icon-box {
        background: var(--color-primary);
        color: #fff;
      }
    }
  }

  .title-box {
    max-width: 780px;
    margin: auto;
  }

  .artist-list {
    .artist-item {
      display: block;
      padding: clamp(15px, 2.0833vw, 40px) clamp(15px, 2.0833vw, 40px) 15px;

      .artist-content {
        padding-left: 34px;
        transition: padding-left .25s ease;

        .icon-box {
          width: 24px;
          height: 24px;
          line-height: 24px;
          background: var(--color-gray-200);
          border-radius: 50%;
          text-align: center;
          color: var(--color-primary);
          transition: opacity .25s ease;
          opacity: 0;
          margin-left: 10px;
          flex-shrink: 0;

          .iconify {
            font-size: 12px;
          }
        }

      }

      &:hover {
        .artist-content {
          padding-left: 0;

          .icon-box {
            opacity: 1;
          }
        }
      }
    }
  }
</style>