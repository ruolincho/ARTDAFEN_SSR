<template>

  <!--头部-->
  <div class="sec-head">
    <div class="container">
      <div class="text-center py-lg-40 py-20 header-section f-bold-500">
        <h1 class="text-50 mb-20">Browse All <span class="ignore">"{{ letter }}"</span> Artists</h1>
        <p class="text-16 text-gray-600 description">
          Our oil paintings are 100% hand-painted on canvas by skilled artists
        </p>
        <p class="text-16 mt-20">BROWSE ARTISTS BY LAST NAME (simply click on the first letter of the artist's last
          name)</p>
      </div>
    </div>
  </div>

  <!--索引-->
  <section class="sec-letter ignore">
    <div class="container">
      <div class="letter-list acea-row row-between-wrapper gap-column-base">
        <NuxtLink class="letter-item text-22 py-lg-20 py-10" v-for="(letter, index) in letters" :key="index" :to="seeAll(letter)" replace>
          {{ letter }}
        </NuxtLink>
      </div>
    </div>
  </section>

  <!--列表-->
  <div class="sec-list ignore">
    <div class="container">
      <DataState
          :loading="isLoading"
          :is-empty="artistsList.length === 0"
          :error="error"
          :retry="getArtistsListBySearch"
      >
        <div class="row artist-list my-20 gap-row-base" v-if="artistsList.length">
          <div class="col-lg-3 col-sm-4 col-6" v-for="art in artistsList" :key="art.id">
            <div class="artist-item text-20 cursor-pointer line1" @click="handleClickArtist(art)">
              {{ art.name }}
            </div>
          </div>
        </div>
      </DataState>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getArtistsListBySearchApi} from "~/api/modules/artists/artists";
import type {IArtists} from "~/api/interface/artists/artists";
import {PRODUCT_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import {mergeHeadWithLodash, resolvePageMeta} from "~/config/pageMeta";
import {packQuery} from "~/composables/useQueryShort";

defineOptions({
  name: 'ArtistsAll'
})

onMounted(() => {
  getArtistsListBySearch()
})

const router = useRouter()
const route = useRoute()
const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
const origin = useRequestURL().origin

useHead(mergeHeadWithLodash(
    resolvePageMeta("/artists-all", route.params.id as string),
    {
      link: [
        {rel: 'canonical', href: `${origin}/artists-all/${route.params.id}`},
      ]
    }
))

// 获取艺术家列表
const error = ref<any>()
const isLoading = ref(false)
const artistsList = ref<IArtists.Row[]>([])
const getArtistsListBySearch = async () => {
  try {
    isLoading.value = true
    const params: IArtists.Query = {letter: letter.value as string}
    if (categoryId.value) params.categoryId = categoryId.value as string
    const {data} = await getArtistsListBySearchApi(params)
    artistsList.value = data
  } catch (err) {
    error.value = err
  } finally {
    isLoading.value = false
  }
}

// 点击查看更多
const seeAll = (letter: string) => {
  let path = `/artists-all/${letter}`
  if (categoryId.value) path += `?categoryId=${categoryId.value}`
  // router.replace(path)
  return path
}

// 点击艺术家
const handleClickArtist = (artist: IArtists.Row) => {
  router.push({
    path: PRODUCT_URL,
    query: {q: packQuery(gen_path_obj(artist, 'ARTIST', ['name']))}
  })
}

// 获取分类ID
const categoryId = computed(() => {
  return route.query.categoryId
})

// 获取关键词
const letter = computed(() => {
  return route.params.id || 'A'
})
</script>

<style scoped lang="scss">
.sec-head {
  .header-section {
    .description {
      max-width: 1030px;
      margin: auto;
    }
  }
}

.sec-letter {
  .letter-list .letter-item {
    &:hover,
    &.on {
      text-decoration: underline;
    }
  }

}

.sec-list {
  .artist-list {
    .artist-item:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
</style>