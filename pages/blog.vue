<template>
  <div id="more-anchor"></div>
  <section class="blog-section">
    <div class="container">
      <div class="row blog-list mt-md-40 mt-20">
        <div
          class="col-lg-3 col-md-4 col-6"
          v-for="(item, index) in moreData.records"
          :key="item.id"
          v-aos="{ name: 'fade-up', delay: index % 4 * 100}"
        >
          <NuxtLink class="blog-item" :to="`/blog-detail/${item.id}`" target="_blank">
            <div class="overflow-hidden">
              <img
                class="w-full h-full fit-cover img-hover aspect-ratio-16_9"
                :src="imagePrefix(item.img)"
                :alt="item.title"
              >
            </div>
            <div class="acea-row row-between-wrapper mt-16 mb-10">
              <h1 class="text-22 f-bold-500 flex-1 line2 border-r-sm pr-md-20 pr-10">{{ item.title }}</h1>
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
              <NuxtLink
                class="product-item border-t-sm py-8 acea-row row-middle"
                :to="productLink(goods)"
                target="_blank"
                v-for="goods in item.products"
                :key="goods.id"
              >
                <div class="p-img mr-6">
                  <img :src="imagePrefix(goods.img)" alt="">
                </div>
                <div class="flex-1 overflow-hidden">
                  <h1 class="line1 text-16">{{ goods.title }}</h1>
                  <p class="line1 text-14 my-4 text-gray-400">{{ formatAttr(goods.labels) }}</p>
                  <p class="text-14">{{ currencyStore.formatToCurrency(goods.retailPrice) }}</p>
                </div>
              </NuxtLink>
            </div>
          </NuxtLink>
        </div>
      </div>
      <!-- 真实 <a> 链接的分页导航，保证禁用 JS 时仍可翻页 -->
      <nav aria-label="Pagination" class="seo-pagination py-lg-40 py-20">
        <NuxtLink
          v-if="hasPrev"
          :to="page - 1 === 1 ? '/blog' : `/blog?page=${page - 1}`"
          rel="prev"
        >
          <span class="iconfont icon-left"/>
        </NuxtLink>

        <!-- 页码建议不要一次性全打出；这里举例显示当前页前后各 2 页 -->
        <NuxtLink
          v-for="p in Array.from({length: totalPages}, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)"
          :key="p"
          :to="p === 1 ? '/blog' : `/blog?page=${p}`"
          :aria-current="p === page ? 'page' : null"
          :class="{'active': p === page}"
        >
          {{ p }}
        </NuxtLink>

        <NuxtLink
          v-if="hasNext"
          :to="`/blog?page=${page + 1}`"
          rel="next"
        >
          <span class="iconfont icon-right"/>
        </NuxtLink>
        <!-- 无脚本兜底 -->
        <noscript>
          <p><a href="/blog?page=2">Next page</a></p>
        </noscript>
      </nav>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import type {IPage, IResultData} from "~/api/interface";
import {debounce, formatAttr, imagePrefix, productLink} from "~/utils";
import type {IBlog} from "~/api/interface/blog/blog";
import {useUserStore} from "~/stores/modules/user";
import {ref, watch} from "vue";
import LoginWindow from "~/components/LoginWindow.vue";
import {blogThumbsApi} from "~/api/modules/likes/likes";
import {useCurrencyStore} from "~/stores/modules/currency";
import {pageMeta} from "~/composables/pageMeta";
import {TRADE_MODULE} from "~/api/helper/prefix";

defineOptions({
  name: 'Blog'
})

const router = useRouter()
const route = useRoute()
const currencyStore = useCurrencyStore();
const userStore = useUserStore()

useHead(pageMeta[route.path] ?? pageMeta["/blog"]);

// 获取博客数据
const page = computed<number>({
  get() {
    const p = Number(route.query.page ?? 1)
    return Number.isFinite(p) && p >= 1 ? Math.floor(p) : 1
  },
  set(v: number) {
    if (process.client) {
      const n = Number.isFinite(v) && v >= 1 ? Math.floor(v) : 1
      router.push({query: {...route.query, page: n}})
    }
  }
})
const size = ref(12)

if (import.meta.client) {
  watch(page, (newPage) => {
    document.getElementById('more-anchor')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  })
}

const {data: moreData, pending, error} = await useAsyncData(
  'blog-more',
  async () => {
    const config = useRuntimeConfig()
    const {data} = await $fetch<IResultData<IPage<IBlog.Row>>>(config.public.apiBase + TRADE_MODULE + '/blog/example', {
      method: 'POST',
      body: {
        page: page.value,
        size: size.value,
      }
    })
    data.records.forEach(item => {
      item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : 0)).toString()
    })
    return data
  },
  {
    watch: [page],
    server: true,
    default: () => ({
      /*当前页数*/
      current: 1,
      /*总页码*/
      pages: 0,
      /*列表数据*/
      records: [],
      /*页数*/
      size: 10,
      /*数据条数*/
      total: 0,
    })
  }
)

// 计算总页数（基于后端返回的 total 和当前 size）
const totalPages = computed(() => {
  const t = Number(moreData.value?.total ?? 0)
  const s = Number(size.value ?? 1) || 1
  return Math.max(1, Math.ceil(t / s))
})

const hasPrev = computed(() => page.value > 1)
const hasNext = computed(() => page.value < totalPages.value)

const origin = useRequestURL().origin
const selfUrl = computed(() => (page.value === 1 ? `${origin}/blog` : `${origin}/blog?page=${page.value}`))
const prevUrlAbs = computed(() => hasPrev.value
  ? (page.value - 1 === 1 ? `${origin}/blog` : `${origin}/blog?page=${page.value - 1}`)
  : null
)
const nextUrlAbs = computed(() => hasNext.value
  ? `${origin}/blog?page=${page.value + 1}`
  : null
)

useHead({
  link: [
    {rel: 'canonical', href: selfUrl.value},
    ...(prevUrlAbs.value ? [{rel: 'prev', href: prevUrlAbs.value}] : []),
    ...(nextUrlAbs.value ? [{rel: 'next', href: nextUrlAbs.value}] : []),
  ],
  meta: [
    {name: 'robots', content: 'index,follow'},
  ]
})

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

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

</script>

<style scoped lang="scss">
.blog-section {
  .blog-list {
    --gutter: 15px;
    row-gap: 15px;

    [class^="col-"] {
      .blog-item {
        display: block;

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
}

.seo-pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    opacity: 0.9;

    &.active {
      font-weight: bold;
      opacity: 1;
    }
  }
}

@media (max-width: 991px) {
  .blog-section .blog-list {
    [class^="col-"] {
      .blog-item {
        .product-list {
          .product-item {
            .p-img {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
  }
}
</style>