<template>
  <section class="favorites-container">
    <ClientOnly>
      <ProList
        ref="proListRef"
        :request-api="getFavoritesList"
        :init-param="initParam"
      >
        <template #default="scope">
          <div class="row favorites-list gap-row-base">
            <div class="col-lg-3 col-md-4 col-6" v-for="item in scope.rows" :key="item.id">
              <div class="favorites-item cursor-pointer border-sm border-gray-200 p-10" @click.stop="jumpToProduct(item)">
                <div class="aspect-ratio relative">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.title"/>
                  <span class="iconfont icon-delete text-20" @click.stop="cancelThumbs(item.id)"></span>
                </div>
                <p class="line1 text-12 my-8">{{ item.title }}</p>
                <p class="text-12 f-bold">{{ currencyStore.formatToCurrency(item.retailPrice || 0)}}</p>
              </div>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="text-center py-60">
            <span class="iconfont icon-empty text-50"></span>
            <p class="text-20 f-bold mt-20">No Favorites Found</p>
            <p class="text-14 my-20">You have not collected any products yet.</p>
            <el-button size="large" type="primary" @click="router.push(PRODUCT_URL)">START SHOPPING</el-button>
          </div>
        </template>
      </ProList>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import ProList from "~/components/ProList/index.vue";
import {getUserCollectGoodsApi} from "~/api/modules/mine/mine";
import type {IPageQuery} from "~/api/interface";
import {imagePrefix, jumpToProduct} from "~/utils";
import {useHandleData} from "~/composables/useHandleData";
import {productThumbsApi} from "~/api/modules/likes/likes";
import {PRODUCT_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";

defineOptions({
  name: 'Favorites'
})

definePageMeta({
  auth: true
})

const router = useRouter()
const currencyStore = useCurrencyStore()

const proListRef = ref<InstanceType<typeof ProList>>()
const initParam = reactive({size: 12});
const getFavoritesList = (params: IPageQuery) => getUserCollectGoodsApi(params)

// 取消收藏
const cancelThumbs = async (id: string) => {
  await useHandleData(
    productThumbsApi,
    { mediaId:id, operate: 0 },
    'Are you sure to cancel the collection?'
  )
  proListRef.value?.reset()
}
</script>

<style scoped lang="scss">
.favorites-container {
  .favorites-list .favorites-item .iconfont {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>