<template>
  <section class="sec-main">
    <DataState
        :loading="pending"
        :is-empty="pageData.records.length === 0"
        :error="error"
        :retry="refresh"
    >
      <div class="row product-list gap-row-base">
        <div class="col-2xl-average col-lg-3 col-sm-4 col-6" v-for="item in pageData.records" :key="item.id">
          <GoodsItem :item="item" @thumbsClick="productThumbs" :isOperation="false"/>
        </div>
      </div>
      <div class="lg:py-40 py-20">
        <SeoPagination :current="currentPage" :totalPages="totalPages" :basePath="baseRoute!"/>
      </div>
    </DataState>
  </section>
  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {debounce} from "~/utils";
import type {IProduct} from "~/api/interface/product/product";
import {useUserStore} from "~/stores/modules/user";
import {productThumbsApi} from "~/api/modules/likes/likes";
import LoginWindow from "~/components/LoginWindow.vue";
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {General} from "~/types/global";
import {type SeoOptions, useSeoPaginationLogic} from "~/composables/useSeoPaginationLogic";
import {ZONE_DETAIL_SIZE} from "~/config";

const userStore = useUserStore()

const parentFilterParams = inject<ComputedRef<IProduct.ZoneCollectQuery>>('zoneFilterParams');
const baseRoute = inject<ComputedRef<string>>('baseRoute');
const seoInfo = inject<ComputedRef<SeoOptions>>('seoInfo');
const executeScroll = inject<() => void>('executeScroll');

const {pageData, currentPage, totalPages, pending, refresh, error} = await useSeoPaginationLogic<General.GoodsItem, IProduct.ZoneCollectQuery>(
     {
      apiPath: `${TRADE_MODULE}/product/zone/collect`,
      baseRoute: baseRoute!.value,
      uniqueKey: 'zone-detail-collect',
      pageSize: ZONE_DETAIL_SIZE,
      filterParams: () => toValue(parentFilterParams!),
      seo: () => toValue(seoInfo!),
      callBack: executeScroll
    },
)

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
</script>

<style scoped lang="scss">

</style>