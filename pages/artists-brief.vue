<template>

  <!--头部-->
  <section class="sec-head">
    <div class="container">
      <div class="text-center py-lg-40 py-20 header-section f-bold-500">
        <h1 class="text-50 mb-20">Shop by Artist</h1>
        <p class="text-16 text-gray-600 description">
          Our comprehensive website contains over 60,000 oil paintings from thousands of the most widely acclaimed
          artists
          the world over. Simply click on your favorite artist and then view all of our museum quality hand-painted oil
          painting reproductions in one easy and convenient gallery. You may also refine your search by subject, art
          style, painting orientation, or dominant color.
        </p>
        <p class="text-16 mt-20">BROWSE ARTISTS BY LAST NAME (simply click on the first letter of the artist's last
          name)</p>
      </div>
    </div>
  </section>

  <!--索引-->
  <section class="sec-letter">
    <div class="container">
      <div class="letter-list acea-row row-between-wrapper gap-column-base">
        <div class="letter-item text-22 py-lg-20 py-10 cursor-pointer" v-for="(letter, index) in letters" :key="index" @click="seeAll(letter)">
          {{ letter }}
        </div>
      </div>
    </div>
  </section>

  <!--列表-->
  <div class="sec-list">
    <div class="container">
      <div class="row artist-list my-20 gap-row-md">
        <div class="col-lg-3 col-sm-4 col-6" v-for="(val, key) in artistsList" :key="key">
          <div class="artist-item pl-25 text-20">
            <div class="letter text-22 f-bold">{{ key }}</div>
            <div v-for="art in val" class="mb-10 cursor-pointer name line1" @click="handleClickArtist(art)">
              {{ art.name }}
            </div>
            <div class="more text-22 f-bold cursor-pointer" v-if="val.length > 4" @click="seeAll(key)">View All "{{ key }}" Artists</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {getArtistsListApi} from "~/api/modules/artists/artists";
import type {IArtists} from "~/api/interface/artists/artists";
import {PRODUCT_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import { pageMeta } from "~/composables/pageMeta";

defineOptions({
  name: 'Artists'
})

onMounted(() => {
  getArtistsList()
})

const route = useRoute()
const router = useRouter()
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

useHead(pageMeta[route.path] ?? pageMeta["/artists-brief"]);

// 获取艺术家列表
const artistsList = ref<IArtists.Res>({})
const getArtistsList = async () => {
  const params: IArtists.Query = {}
  if (categoryId.value) params.categoryId = categoryId.value as string
  const {data} = await getArtistsListApi(params)
  artistsList.value = data
}

// 点击查看更多
const seeAll = (letter: string) => {
  let path = `/artists-all?id=${letter}`
  if (categoryId.value) path += `&categoryId=${categoryId.value}`
  router.push(path)
}

// 点击艺术家
const handleClickArtist = (artist: IArtists.Row) => {
  router.push({
    path: PRODUCT_URL,
    query: gen_path_obj(artist, 'ARTIST', ['name'])
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
      getArtistsList()
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
  .letter-list .letter-item:hover {
    text-decoration: underline;
  }
}

.sec-list {
  .artist-list {
    .artist-item {
      position: relative;
      .letter {
        position: absolute;
        top: 0;
        left: 0;
      }
      .name:hover {
        font-weight: bold;
        text-decoration: underline;
      }
      .more:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>