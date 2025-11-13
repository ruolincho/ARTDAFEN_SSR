<template>
  <section>
    <div class="container">
      <ClientOnly>
        <ProList
          ref="proListRef"
          :request-api="getNoticeList"
          :request-success="onSuccess"
        >
          <template #default="scope">
            <div class="review-header review-row text-14 py-15 border-b-sm border-gray-700 f-bold">
              <div class="review-col1">Order</div>
              <div class="review-col2">Subject</div>
              <div class="review-col3">Time</div>
            </div>
            <div class="review-list">
              <div class="review-item  border-b-sm" v-for="(item, index) in scope.rows" :key="item.id" @click="toggleNotice(index)">
                <div class="review-row text-14 py-15 cursor-pointer">
                  <div class="review-col1">{{ item.id }}</div>
                  <div class="review-col2">{{ item.title }}</div>
                  <div class="review-col3">{{ formatTimestamp(item.createTime, 'YYYY-MM-DD') }}</div>
                </div>
                <div class="bg-gray-200" v-show="currentIndex === index">
                  <div class="review-row py-30">
                    <div class="review-col1"></div>
                    <div class="review-col2" v-html="item.content"></div>
                    <div class="review-col3"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </ProList>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import {getNoticeListApi} from "~/api/modules/notice/notice";
import type {IPageQuery} from "~/api/interface";
import ProList from "~/components/ProList/index.vue";
import {formatTimestamp} from "~/utils/format";
import {pageMeta} from "~/config/pageMeta";

useHead(pageMeta["/notice"] ?? {});

// 获取公告列表
const getNoticeList = (params: IPageQuery) => getNoticeListApi(params);

const currentIndex = ref<number | null>(null);
const toggleNotice = (index: number) => {
  currentIndex.value = currentIndex.value === index ? null : index;
};
const onSuccess = () => {
  currentIndex.value = null;
}

</script>

<style scoped lang="scss">
.review-row {
  display: flex;
  align-items: center;

  .review-col1 {
    width: 9.21%;
    text-align: center;
    flex-shrink: 0;
  }

  .review-col2 {
    flex: 1;
  }

  .review-col3 {
    width: 8.55%;
    text-align: center;
    flex-shrink: 0;
    min-width: 100px;
  }
}
</style>