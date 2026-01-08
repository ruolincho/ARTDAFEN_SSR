<template>
  <section class="news-detail">
    <div class="container-small">

      <div class="text-40 f-bold my-20"> {{ newsDetail.title }}</div>

      <div class="text-12 my-20">{{ formatTimestamp(newsDetail.createTime, 'YYYY-MM-DD HH:mm:ss') }}</div>

      <div v-html="newsDetail.content"/>
    </div>
  </section>

  <!-- 推荐新闻 -->
  <section class="news-more" v-if="newsDetail.id">
    <div class="container-small">
      <h1 class="my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 f-bold">RECOMMEND</h1>
      <ClientOnly>
        <ProInfinite
          ref="proInfiniteRef"
          :request-api="getNewsRecommend"
          :init-param="initParam"
        >
          <template #default="scope">
            <div class="news-more-list">
              <!--@click="router.replace(`/news-detail/${item.id}/${item.slug}`)"-->
              <NuxtLink class="news-more-item acea-row row-between gap-row-base" :to="`/news-detail/${item.id}/${item.slug}`" v-for="item in scope.rows" :key="item.id">
                <div class="p-cont">
                  <div>
                    <p class="text-26 line2">{{ item.title }}</p>
                    <p class="text-16 my-10 line2">{{ item.subtitle }}</p>
                  </div>
                  <div class="acea-row row-between-wrapper">
                    <div class="acea-row row-middle gap-xs">
                      <el-tag type="info" effect="plain" v-for="label in item.labels" :key="label">{{ label }}</el-tag>
                    </div>
                    <span class="text-14">{{ formatTimestamp(item.createTime, 'YYYY.MM.DD') }}</span>
                  </div>
                </div>
                <div class="p-img overflow-hidden">
                  <img class="w-full h-full fit-cover img-hover aspect-ratio-16_9" :src="imagePrefix(item.img)" :alt="item.title">
                </div>
              </NuxtLink>
            </div>
          </template>
        </ProInfinite>
      </ClientOnly>
    </div>
  </section>

</template>

<script setup lang="ts">
import {getNewsRecommendApi} from "~/api/modules/news/news";
import {formatTimestamp} from "~/utils/format";
import type {INews} from "~/api/interface/news/news";
import {imagePrefix} from "~/utils";
import ProInfinite from "~/components/ProInfinite.vue";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";

defineOptions({
  name: 'NewsDetail',
})

const route = useRoute()
const router = useRouter()
const id = toRef(route.params, 'id') // 响应式拿 id

// 新闻详情
const { data: newsDetail, pending, error, refresh } = await useAsyncData(() => `news-detail-${id.value}`, async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<INews.Row>>(config.public.apiBase + TRADE_MODULE + '/news/detail/' + id.value)
  return data
}, {
  server: true,
  default: () => ({} as INews.Row),
  // 当 id 变化时，自动重新执行（客户端）
  watch: [id],
})

// 更多新闻
const initParam = reactive({id: '', categoryId: '', size: 5});
const getNewsRecommend = (params: INews.RecQuery) => getNewsRecommendApi(params)

watch(() => newsDetail.value, (newVal) => {
  if (newVal) {
    newVal.content = newVal.content.replace(/(<(img|video|gif)[^>]*src=")(?!http)([^"]+")/gi, (match, p1, p2, p3) => {
      return `${p1}${imagePrefix(p3)}`;
    });
    initParam.id = newVal.id
    initParam.categoryId = newVal.categoryId
  }
}, { immediate: true })

</script>

<style scoped lang="scss">
.news-more {
  .news-more-list {
    .news-more-item {

      .p-cont {
        width: 68%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .p-img {
        flex-shrink: 0;
        width: 30%;
      }
    }

    .news-more-item + .news-more-item {
      margin-top: var(--gutter-base);
      padding-top: var(--gutter-base);
      border-top: var(--border-width-sm) solid var(--color-gray-200);
    }
  }
}

@media (max-width: 768px) {
  .news-more {
    .news-more-list {
      .news-more-item {

        .p-cont {
          order: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

        }

        .p-img {
          order: 1;
          flex-shrink: 0;
          width: 100%;
        }
      }
    }
  }
}
</style>