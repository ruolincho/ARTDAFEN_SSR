<template>
  <section class="blog-section">
    <div class="container">
      <ProInfinite
        ref="proInfiniteRef"
        :request-api="getBlogList1"
        :data-callback="dataCallback"
      >
        <template #default="scope">
          <div class="blog-list mt-md-40 mt-20">
            <div class="blog-item cursor-pointer" v-for="item in scope.rows" :key="item.id" @click="toDetail(item.id)">
              <div class="overflow-hidden">
                <img class="w-full img-hover" :src="imagePrefix(item.img)" alt="">
              </div>
              <div class="acea-row row-between-wrapper mt-16 mb-10">
                <p class="text-22 f-bold-500 flex-1 line2 border-r-sm pr-md-20 pr-10">{{ item.title }}</p>
                <div class="text-center px-md-20 px-10 text-gray-400">
              <span class="iconfont icon-follow cursor-pointer text-20" v-show="!item.like"
                    @click.stop="blogThumbs(item)"></span>
                  <span class="iconfont icon-follow-fill text-error cursor-pointer text-20" v-show="item.like"
                        @click.stop="blogThumbs(item)"></span>
                  <p class="text-14 mt-2">{{ item.likeVolume }}</p>
                </div>
              </div>
              <div class="text-14 acea-row gap-xs" v-if="item.labels.length">
            <span class="text-secondary cursor-pointer" v-for="(label, labelIndex) in item.labels" :key="labelIndex"
                  @click.stop>#{{ label }}</span>
              </div>
              <div class="product-list mt-16" v-if="item.products.length">
                <div class="product-item border-t-sm py-8 acea-row row-middle" v-for="goods in item.products"
                     :key="goods.id" @click.stop="jumpToProduct(goods)">
                  <div class="p-img mr-6">
                    <img :src="imagePrefix(goods.img)" alt="">
                  </div>
                  <div class="flex-1 overflow-hidden">
                    <p class="line1 text-16">{{ goods.title }}</p>
                    <p class="line1 text-14 my-4 text-gray-400">{{ formatAttr(goods.labels) }}</p>
                    <p class="text-14">{{ currencyStore.formatToCurrency(goods.retailPrice) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ProInfinite>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>

  <BlogPopup
    v-model="mainShow"
    :nid="nid"
    :nowTime="new Date()"
    @no-auth="showLoginWindow"
    @on-thumbs="onThumbs"
  />
</template>

<script setup lang="ts">
import type {IPage, IPageQuery} from "~/api/interface";
import {getBlogListApi} from "~/api/modules/blog/blog";
import {debounce, formatAttr, imagePrefix, jumpNewWindow, jumpToProduct} from "~/utils";
import type {IBlog} from "~/api/interface/blog/blog";
import {useUserStore} from "~/stores/modules/user";
import {ref} from "vue";
import LoginWindow from "~/components/LoginWindow.vue";
import {blogThumbsApi} from "~/api/modules/likes/likes";
import ProInfinite from "~/components/ProInfinite.vue";
import {useCurrencyStore} from "~/stores/modules/currency";
import {pageMeta} from "~/composables/pageMeta";


defineOptions({
  name: 'Blog'
})

const router = useRouter()
const route = useRoute()
const currencyStore = useCurrencyStore();
const userStore = useUserStore()
const mainShow = ref(false);
const nid = ref("");

useHead(pageMeta[route.path] ?? pageMeta["/best"]);


// 获取博客数据
const getBlogList1 = (params: IPageQuery) => getBlogListApi(params)
const dataCallback = (data:  IPage<IBlog.Row>) => {
  data.records.forEach(item => {
    item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : 0)).toString()
  })
  return data
}

// 点赞/取消点赞
const blogThumbs = debounce(async (item: IBlog.Row) => {
  if (!userStore.isLogin) {
    showLoginWindow()
    return
  }
  await blogThumbsApi({mediaId: item.id, operate: ~~!item.like as Dict.ThumbsOperateType})
  item.like = !item.like
  item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : -1)).toString()
}, 300)

// 组件点赞监听
const proInfiniteRef = ref<InstanceType<typeof ProInfinite>>()
const onThumbs = (id: string) => {
  const list = proInfiniteRef.value?.tableData as IBlog.Row[] || []
  const item = list.find(item => item.id === id)
  if (!item) return
  item.like = !item.like
  item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : -1)).toString()
}

// 查看详情
const toDetail = (noteId: string) => {
  // nid.value = noteId;
  // mainShow.value = true;
  jumpNewWindow(`/blog-detail/${noteId}`)
}

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

</script>

<style scoped lang="scss">
.blog-section {
  .blog-list {
    column-count: 3; /* 列数 */
    column-gap: 40px; /* 列间距 */

    .blog-item {
      break-inside: avoid; /* 防止内容被分割到不同列 */
      margin-bottom: 40px; /* 项目间距 */

      .product-list {

        .product-item {
          .p-img {
            width: 60px;
            height: 60px;
          }
        }

      }
    }
  }
}

@media (max-width: 1260px) {
  .blog-section {
    .blog-list {
      column-gap: 20px; /* 列间距 */

      .blog-item {
        margin-bottom: 20px; /* 项目间距 */
      }
    }
  }
}

@media (max-width: 991px) {
  .blog-section {
    .blog-list {
      column-count: 2; /* 列数 */
      column-gap: 15px; /* 列间距 */

      .blog-item {
        margin-bottom: 15px; /* 项目间距 */

        .product-list {

          .product-item {
            .p-img {
              width: 45px;
              height: 45px;
            }
          }

        }
      }
    }
  }
}
</style>