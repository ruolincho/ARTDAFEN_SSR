<template>

  <!--头部-->
  <section class="sec-head">
    <div class="container">
      <div class="text-center lg:py-40 py-20 header-section font-500">
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
  <section class="sec-letter ignore">
    <div class="container">
      <div class="letter-list acea-row row-between-wrapper gap-column-base">
        <NuxtLink
            class="letter-item text-22 lg:py-20 py-10"
            v-for="letter in letters" :key="letter"
            :to="{ path: `/artists-all/${letter}`, query: categoryId ? { categoryId } : undefined }"
        >
          {{ letter }}
        </NuxtLink>
      </div>
    </div>
  </section>

  <!--列表-->
    <div class="sec-list">
      <div class="container">
        <DataState
            :loading="isLoading"
            :is-empty="Object.keys(artistsList).length === 0"
            :error="error"
            :retry="getArtistsList"
        >
          <div class="row artist-list my-20 gap-row-md ignore">
            <div class="col-lg-3 col-sm-4 col-6" v-for="(val, key) in artistsList" :key="key">
              <div class="artist-item pl-25 text-20">
                <div class="letter text-22 font-bold ignore">{{ key }}</div>
                <NuxtLink
                    v-for="art in val" :key="art.id"
                    class="mb-10 cursor-pointer name truncate block"
                    :to="`/artist-detail/${art.id}/${art.slug}`"
                >
                  {{ art.name }}
                </NuxtLink>

                <NuxtLink
                    class="more text-22 font-bold cursor-pointer"
                    v-if="val.length > 4"
                    :to="{
                      path: `/artists-all/${key}`,
                      query: categoryId ? { categoryId } : undefined
                    }"
                >
                  View All <span class="ignore">"{{ key }}"</span> Artists
                </NuxtLink>
              </div>
            </div>
          </div>
        </DataState>
      </div>
    </div>
</template>

<script setup lang="ts">
import {getArtistsListApi} from "~/api/modules/artists/artists";
import type {IArtists} from "~/api/interface/artists/artists";
import {COLLECTIONS_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import { resolvePageMeta } from "~/config/pageMeta";
import {packQuery} from "~/composables/useQueryShort";

defineOptions({
  name: 'Artists'
})

onMounted(() => {
  getArtistsList()
})

const route = useRoute()
const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

useHead(resolvePageMeta("/artists-brief"));

// 获取艺术家列表
const error = ref<any>()
const isLoading = ref(false)
const artistsList = ref<IArtists.Res>({})
const getArtistsList = async () => {
  try {
    isLoading.value = true
    error.value = null
    const params: IArtists.Query = {}
    if (categoryId.value) params.categoryId = categoryId.value as string
    const {data} = await getArtistsListApi(params)
    artistsList.value = data
  } catch (err) {
    error.value = err
  } finally {
    isLoading.value = false
  }
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