<template>
  <section class="sec-main">
    <DataState :loading="pending" :is-empty="pageData.total === 0 && !pending">
      <div class="row product-list gap-row-base">
        <div class="col-2xl-average col-lg-3 col-md-4 col-6" v-for="item in pageData.records" :key="item.id">
          <GoodsItem :item="item" @thumbsClick="productThumbs" @artistClick="updateArtist!"/>
        </div>
      </div>
      <div class="py-lg-40 py-20">
        <SeoPagination :current="currentPage" :totalPages="totalPages" :basePath="baseRoute!"/>
      </div>
    </DataState>
  </section>
  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {debounce} from "~/utils";
import type {IProduct} from "~/api/interface/product/product";
import type {IHome} from "~/api/interface/home/home";
import {useUserStore} from "~/stores/modules/user";
import {productThumbsApi} from "~/api/modules/likes/likes";
import LoginWindow from "~/components/LoginWindow.vue";
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {General} from "~/types/global";
import {type SeoOptions, useSeoPaginationLogic} from "~/composables/useSeoPaginationLogic";
import {ZONE_SIZE} from "~/config";

const userStore = useUserStore()

const parentFilterParams = inject<ComputedRef<IProduct.ZoneCollectQuery>>('zoneFilterParams');
const baseRoute = inject<ComputedRef<string>>('baseRoute');
const seoInfo = inject<ComputedRef<SeoOptions>>('seoInfo');

const {pageData, currentPage, totalPages, pending, refresh} = await useSeoPaginationLogic<General.GoodsItem[], IProduct.ZoneCollectQuery>(
     {
      apiPath: `${TRADE_MODULE}/product/zone/collect`,
      baseRoute: baseRoute!.value,
      uniqueKey: 'zone-detail-collect',
      pageSize: ZONE_SIZE,
      filterParams: () => toValue(parentFilterParams!),
      seo: () => toValue(seoInfo!),
    },
)

const updateArtist = inject<(item: IHome.MenuRow) => void>('updateArtist');

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