<template>
  <section class="list-section">
    <div class="container">
      <el-skeleton :loading="pending" animated :count="MEDIA_SIZE" class="row news-list mt-15">
        <template #template>
          <div class="col-lg-3 col-md-4 col-6">
            <el-skeleton-item variant="image" class="aspect-ratio-16_9" style="width: 100%; height: unset;"/>
            <div class="py-10">
              <el-skeleton-item variant="h1"/>
              <el-skeleton-item variant="p" class="my-10" style="width: 50%"/>
            </div>
          </div>
        </template>
        <div class="row news-list mt-15">
          <div
              class="col-lg-3 col-md-4 col-6"
              v-for="item in pageData.records"
              :key="item.id"
          >
            <NewsItem :item="item" />
          </div>
        </div>
      </el-skeleton>
      <div class="py-lg-40 py-20">
        <SeoPagination :current="currentPage" :totalPages="totalPages" basePath="/news" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useSeoPaginationLogic} from "~/composables/useSeoPaginationLogic";
import type {INews} from "~/api/interface/news/news";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {MEDIA_SIZE} from "~/config";

definePageMeta({
  scrollToTop: false // 再次确认禁用了默认滚动
})

const {pageData, currentPage, totalPages, pending} = await useSeoPaginationLogic<INews.Row>(
    {
      apiPath: `${TRADE_MODULE}/news/more`,
      baseRoute: '/news',
      uniqueKey: 'news-more',
      pageSize: MEDIA_SIZE
    },
)
</script>

<style scoped lang="scss">
  .list-section {
    .news-list {
      --gutter: 30px;
      row-gap: 30px;

      [class^="col-"] {
        .news-item {
          &::before {
            content: "";
            position: absolute;
            top: 0;
            right: -15px;
            width: 1px;
            height: 100%;
            background: var(--color-gray-200);
          }
        }

        &:nth-child(4n) .news-item::before {
          display: none;
        }
      }
    }
  }

  @media (max-width: 1259px) {

    .list-section {
      .news-list {

        [class^="col-"] {
          &:nth-child(3n) .news-item::before {
            display: none;
          }

          &:nth-child(4n) .news-item::before {
            display: block;
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .list-section {
      .news-list {
        --gutter: 15px;
        row-gap: 15px;

        [class^="col-"] {
          .news-item::before {
            display: none !important;
          }
        }
      }
    }
  }
</style>