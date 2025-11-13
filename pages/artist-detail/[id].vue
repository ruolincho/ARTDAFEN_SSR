<template>
  <!--创作者-->
  <section class="mt-lg-60 mt-sm-20">
    <div class="container">
      <div class="artist-wrapper row gap-row-base">
        <div class="col-md-6">
          <div class="avatar" v-if="artistDetail?.portrait">
            <img class="w-full" :src="imagePrefix(artistDetail?.portrait)" alt="avatar">
          </div>
          <p class="text-22 f-bold-500 my-20 text-underline cursor-pointer">{{ artistDetail?.name }}</p>
          <p class="text-16 f-bold-500 my-20">{{ artistDetail?.location }}</p>
          <p class="text-18">{{ artistDetail?.intro }}</p>
        </div>
        <div class="col-md-6" v-if="artistDetail?.detail">
          <template v-for="(val, key) in artistDetail.detail">
            <p class="text-22 f-bold">{{ key }}</p>
            <div class="text-18 mt-md-20 mt-15" style="white-space: pre-line;" v-for="(val2, key2) in val" :key="key2">
              {{ val2 }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-desc mt-lg-60 mt-sm-20">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Art Work</h1>
      <ClientOnly>
        <!--商品数据-->
        <ProList
          ref="proListRef"
          :request-api="getProductList"
          :init-param="initParam"
          :scroll-auto="false"
        >
          <template #default="scope">
            <div class="row product-list gap-row-base">
              <div class="col-2xl-average col-lg-3 col-md-4 col-6" v-for="item in scope.rows" :key="item.id">
                <div class="product-item cursor-pointer" v-no-click-when-selected="() => jumpToProduct(item)">
                  <div class="img-wrapper bg-gray-100">
                    <img v-lazy="imagePrefix(item.img)" :alt="item.title">
                    <div class="tags-wrapper acea-row row-between-wrapper" v-if="item.techniqueId === TechniqueCodeEnum.Originals">
                      <div class="p-tag bg-gray-700" v-if="item.status === '0'">For Sale</div>
                      <div class="p-tag bg-error" v-if="item.status === '-1'">Sale Out</div>
                    </div>
                    <div class="operation rounded-full p-5">
                        <span
                          class="iconfont icon-follow text-24 text-primary"
                          v-show="!item.like"
                          @click.stop="productThumbs(item)"
                        />
                      <span
                        class="iconfont icon-follow-fill text-24 text-error"
                        v-show="item.like"
                        @click.stop="productThumbs(item)"
                      />
                    </div>
                  </div>
                  <div class="content-wrapper">
                    <p class="my-8 line1">
                    <span class="text-16 f-bold" @click.stop="handleClickArtist(item.creator)">
                      {{ item.creator?.name }}
                    </span>
                      <span class="iconfont icon-right text-16"></span>
                    </p>
                    <p class="line2 text-14">{{ item.title }}</p>
                    <p class="text-16 f-bold my-8">{{ currencyStore.formatToCurrency(item.retailPrice) }}</p>
                    <div class="acea-row gap-xs">
                      <div class="p-tag bg-gray-400" v-for="label in item.labels" :key="label">{{ label }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #empty>
            <div class="text-center py-60">
              <span class="iconfont icon-empty text-50"></span>
              <p class="text-20 f-bold mt-20">No Data</p>
              <p class="text-14 my-20">No data found, please check the query or try again later.</p>
            </div>
          </template>
        </ProList>
      </ClientOnly>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {debounce, imagePrefix, jumpToProduct} from "~/utils";
import {getArtistDetailApi} from "~/api/modules/artists/artists";
import ProList from "~/components/ProList/index.vue";
import type {IProduct} from "~/api/interface/product/product";
import {getArtworksApi} from "~/api/modules/product/product";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import {productThumbsApi} from "~/api/modules/likes/likes";
import {useCurrencyStore} from "~/stores/modules/currency";
import {PRODUCT_URL} from "~/config";
import {gen_path_obj} from "~/utils/product";
import type {IArtists} from "~/api/interface/artists/artists";
import {packQuery} from "~/composables/useQueryShort";
import {TechniqueCodeEnum} from "~/types/enumeration";

onMounted(() => {
  if (route.params.id) getDetail()
  $bus.on('loginSuccess', () => {
    proListRef.value?.reset()
  })
})

const {$bus} = useNuxtApp()
const route = useRoute();
const router = useRouter();
const userStore = useUserStore()
const currencyStore = useCurrencyStore();

// 获取详情
const artistDetail = ref({} as ObjectNode.Creator)
const getDetail = async () => {
  const {data} = await getArtistDetailApi(route.params.id as string)
  artistDetail.value = data
}

const proListRef = ref<InstanceType<typeof ProList>>();
const getProductList = (params: IProduct.ArtworksQuery) => getArtworksApi(params)
const initParam = ref({
  creatorId: route.params.id as string,
  size: 25
})

// 点击艺术家
const handleClickArtist = (creator: ObjectNode.Creator | IArtists.Row) => {
  router.push({
    path: PRODUCT_URL,
    query: {q: packQuery(gen_path_obj(creator, 'ARTIST', ['name']))}
  })
}

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
.artist-wrapper {
  --gutter: var(--gutter-md);

  .avatar {
    max-width: 600px;
  }
}

.product-list {

  .product-item {
    .img-wrapper {
      position: relative;
      aspect-ratio: 1 / 1;

      img {
        max-width: 95%;
        max-height: 95%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .tags-wrapper {
        position: absolute;
        left: 10px;
        bottom: 10px;
      }

      .operation {
        position: absolute;
        right: 10px;
        bottom: 10px;
        background: #fff;
      }

      .num {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        background: var(--color-primary);
        width: 42px;
        height: 42px;
      }
    }

    .p-tag {
      padding: 4px;
      font-size: 10px;
      color: #fff;
    }
  }
}
</style>