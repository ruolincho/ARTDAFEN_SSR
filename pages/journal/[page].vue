<template>
  <section class="blog-section">
    <div class="container">
      <el-skeleton :loading="pending" animated :count="MEDIA_SIZE" class="row blog-list gap-row-base mt-15">
        <template #template>
          <div class="col-lg-3 col-md-4 col-6">
            <el-skeleton-item variant="image" class="aspect-video" style="width: 100%; height: unset;"/>
            <div class="py-10">
              <el-skeleton-item variant="h1"/>
              <el-skeleton-item variant="p" class="my-10" style="width: 50%"/>
            </div>
          </div>
        </template>
        <div class="row blog-list gap-row-base mt-15">
          <div
              class="col-lg-3 col-md-4 col-6"
              v-for="item in pageData.records"
              :key="item.id"
          >
            <BlogItem :item="item" @thumbsClick="blogThumbs"/>
          </div>
        </div>
      </el-skeleton>

      <div class="lg:py-40 py-20">
        <SeoPagination :current="currentPage" :totalPages="totalPages" basePath="/journal"/>
      </div>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {useSeoPaginationLogic} from "~/composables/useSeoPaginationLogic";
import type {IBlog} from "~/api/interface/blog/blog";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {debounce } from "~/utils";
import {useUserStore} from "~/stores/modules/user";
import {ref} from "vue";
import {blogThumbsApi} from "~/api/modules/likes/likes";
import LoginWindow from "~/components/LoginWindow.vue";
import {MEDIA_SIZE} from "~/config";

definePageMeta({
  scrollToTop: false // 再次确认禁用了默认滚动
})

const {pageData, currentPage, totalPages, pending, refresh} = await useSeoPaginationLogic<IBlog.Row>(
    {
      apiPath: `${TRADE_MODULE}/blog/example`,
      baseRoute: '/journal',
      uniqueKey: 'blog-more',
      callBack: (data) => {
        data.forEach(item => {
          item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : 0)).toString()
        })
      },
      pageSize: MEDIA_SIZE
    },
)

const userStore = useUserStore()

// 点赞/取消点赞
const blogThumbs = debounce(async (item: IBlog.Row) => {
  if (!userStore.isLogin) {
    showLoginWindow()
    return
  }
  await blogThumbsApi({mediaId: item.id, operate: ~~!item.like as Dict.ThumbsOperateType})
  refresh()
}, 300)

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

</script>

<style scoped lang="scss">
</style>