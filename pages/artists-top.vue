<template>

  <!--头部-->
  <div class="sec-head">
    <div class="container">
      <div class="text-center py-lg-40 py-20 header-section f-bold-500">
        <h1 class="text-50 mb-20">Browse Top "50" Artists</h1>
        <p class="text-16 text-gray-600 description">
          Our oil paintings are 100% hand-painted on canvas by skilled artists
        </p>
        <p class="text-16 mt-20">BROWSE ARTISTS BY LAST NAME (simply click on the first letter of the artist's last
          name)</p>
      </div>
    </div>
  </div>

  <!--列表-->
  <div class="sec-list ignore">
    <div class="container">
      <div class="row artist-list my-20 gap-row-base">
        <div class="col-lg-3 col-sm-4 col-6" v-for="art in artistsList" :key="art.id">
          <div class="artist-item text-20 cursor-pointer line1" @click="handleClickArtist(art)">
            {{ art.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IArtists} from "~/api/interface/artists/artists";
import {PRODUCT_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import {getHomeArtistsApi} from "~/api/modules/home/home";
import {resolvePageMeta} from "~/config/pageMeta";
import {packQuery} from "~/composables/useQueryShort";

defineOptions({
  name: 'ArtistsTop'
})

onMounted(() => {
  getHomeArtists()
})

const router = useRouter()
const route = useRoute()

useHead(resolvePageMeta("/artists-top"));

// 获取Top50艺术家
const artistsList = ref<IArtists.Row[]>([])
const getHomeArtists = async () => {
  const {data} = await getHomeArtistsApi({ categoryId: categoryId.value as string })
  artistsList.value = data
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


watch(
  () => route.fullPath,
  (newId, oldId) => {
    if (newId !== oldId) {
      getHomeArtists()
    }
  }
)
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
.sec-list {
  .artist-list {
    .artist-item:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
</style>