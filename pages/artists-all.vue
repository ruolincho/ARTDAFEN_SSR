<template>

  <!--头部-->
  <div class="sec-head">
    <div class="container">
      <div class="text-center py-lg-40 py-20 header-section f-bold-500">
        <h1 class="text-50 mb-20">Browse All "{{ letter }}" Artists</h1>
        <p class="text-16 text-gray-600 description">
          Our oil paintings are 100% hand-painted on canvas by skilled artists
        </p>
        <p class="text-16 mt-20">BROWSE ARTISTS BY LAST NAME (simply click on the first letter of the artist's last
          name)</p>
      </div>
    </div>
  </div>

  <!--索引-->
  <section class="sec-letter">
    <div class="container">
      <div class="letter-list acea-row row-between-wrapper gap-column-base">
        <div
          class="letter-item text-22 py-lg-20 py-10 cursor-pointer"
          :class="{ 'on': route.params.id === letter }"
          v-for="(letter, index) in letters"
          :key="index"
          @click="handleLetterClick(letter)"
        >
          {{ letter }}
        </div>
      </div>
    </div>
  </section>

  <!--列表-->
  <div class="sec-list">
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
import {getArtistsListBySearchApi} from "~/api/modules/artists/artists";
import type {IArtists} from "~/api/interface/artists/artists";
import {PRODUCT_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import {pageMeta} from "~/composables/pageMeta";
import {packQuery} from "~/composables/useQueryShort";

defineOptions({
  name: 'ArtistsAll'
})

onMounted(() => {
  getArtistsListBySearch()
})

const router = useRouter()
const route = useRoute()
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

useHead(pageMeta[route.path] ?? pageMeta["/artists-all"]);

// 获取艺术家列表
const artistsList = ref<IArtists.Row[]>([])
const getArtistsListBySearch = async () => {
  const params: IArtists.Query = {letter: letter.value as string}
  if (categoryId.value) params.categoryId = categoryId.value as string
  const {data} = await getArtistsListBySearchApi(params)
  artistsList.value = data
}

// 点击其他索引
const handleLetterClick = (letterStr: string) => {
  if (letterStr === letter.value) return
  let path = `/artists-all?id=${letterStr}`
  if (categoryId.value) path += `&categoryId=${categoryId.value}`
  router.replace(path)
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
  return route.query.id
})

watch(
  () => route.fullPath,
  (newId, oldId) => {
    if (newId !== oldId) {
      getArtistsListBySearch()
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