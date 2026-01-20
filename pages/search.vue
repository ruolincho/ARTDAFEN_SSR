<template>
  <section class="search-wrapper">
    <div class="iconfont icon-close text-40 cursor-pointer close-btn" @click="router.back()"></div>

    <div class="acea-row row-right">
      <div class="search-box">
        <!-- 输入框 -->
        <el-autocomplete
          ref="searchRef"
          v-model="keyword"
          value-key="keyword"
          placeholder="Search..."
          :fetch-suggestions="searchCompletionList"
          :debounce="450"
          :trigger-on-focus="false"
          @select="handleClickSearchCompletion"
          @click.stop
          :hide-loading="true"
          @input="handleInput"
        >
          <template #suffix>
            <span class="iconfont icon-search text-40 cursor-pointer text-gray-700" @click="search"></span>
          </template>
        </el-autocomplete>

        <!-- 历史搜索 -->
        <template v-if="userStore.isLogin">
          <div class="py-10 acea-row row-between-wrapper">
            <span class="text-26 f-bold">History search</span>
            <span class="iconfont icon-delete text-20 cursor-pointer" v-if="historyList.length"
                  @click="removeAllHistory"></span>
          </div>
          <template v-if="historyList.length">
            <div class="acea-row gap-sm pb-10 border-b-sm border-gray-200">
              <el-tag
                v-for="(item, index) in historyList"
                :key="index"
                size="large"
                type="info" round
                class="cursor-pointer"
                closable
                @close="removeHistory(item, index)"
                @click="clickKeyword(item)"
              >
                {{ item.keyword }}
              </el-tag>
            </div>
          </template>
          <div class="text-center py-20" v-else>
            <p class="text-20 f-bold mt-20">No Search History</p>
            <p class="text-14 my-20">You haven’t searched for anything yet. Start exploring and discover products you’ll
              love!</p>
          </div>
        </template>

        <!-- 大家都在搜 -->
        <template v-if="everyoneList.length">
          <div class="py-10 acea-row row-between-wrapper">
            <span class="text-26 f-bold">Everyone search</span>
            <span class="iconfont icon-change text-20 cursor-pointer" @click="getEveryoneSearch()"></span>
          </div>
          <div class="row gap-row-base">
            <div class="col-6" v-for="(item, index) in everyoneList" :key="index">
              <span class="cursor-pointer text-16" @click="clickKeyword(item)">{{ item.keyword }}</span>
            </div>
          </div>
        </template>

        <!-- 热门 -->
        <template v-if="hotList.length">
          <div class="py-10 acea-row row-between-wrapper">
            <span class="text-26 f-bold">Hot search</span>
            <span class="text-gray-400">Latest Data</span>
          </div>
          <div class="row gap-row-base">
            <div class="col-6" v-for="(item, index) in hotList" :key="index">
            <span class="cursor-pointer text-16" @click="clickKeyword(item)">
              <span class="mr-10">{{ index + 1 }}</span>
              <span>{{ item.keyword }}</span>
            </span>
            </div>
          </div>
        </template>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  deleteSearchHistoryApi,
  getEveryoneSearchApi,
  getHotSearchApi,
  getSearchCompletionApi,
  getSearchHistoryApi
} from "~/api/modules/search/search";
import {PRODUCT_URL} from "~/config";
import {useUserStore} from "~/stores/modules/user";
import {useHandleData} from "~/composables/useHandleData";
import type {ISearch} from "~/api/interface/search/search";
import {gen_path_obj} from "~/utils/product";
import {resolvePageMeta} from "~/config/pageMeta";
import {packQuery} from "~/composables/useQueryShort";

definePageMeta({
  layout: 'blank',
})

onMounted(() => {
  searchRef.value?.focus()
  if (userStore.isLogin) getSearchHistory()
  getEveryoneSearch()
  getHotSearch()
})

const userStore = useUserStore()
const router = useRouter()

const searchRef = ref()
const keyword = ref('')

useHead(resolvePageMeta("/search"));

useSeoMeta({
  robots: 'noindex, follow'
})

// 获取历史搜索
const historyList = ref<ISearch.CompletionRow[]>([])
const getSearchHistory = async () => {
  const {data} = await getSearchHistoryApi()
  historyList.value = data
}

// 删除历史搜索
const removeHistory = async (item: ISearch.CompletionRow, index: number) => {
  await deleteSearchHistoryApi([item])
  historyList.value.splice(index, 1)
}

// 删除所有历史搜索
const removeAllHistory = async () => {
  await useHandleData(
    deleteSearchHistoryApi,
    historyList.value,
    'Are you sure to delete all search history?'
  )
  historyList.value = []
}

// 获取大家都在搜索
const everyoneList = ref<ISearch.CompletionRow[]>([])
const getEveryoneSearch = async () => {
  const {data} = await getEveryoneSearchApi()
  everyoneList.value = data
}

// 获取热门搜索
const hotList = ref<ISearch.CompletionRow[]>([])
const getHotSearch = async () => {
  const {data} = await getHotSearchApi()
  hotList.value = data
}

// 点击关键词
const clickKeyword = (item: ISearch.CompletionRow) => {
  startJump(item)
}

// 搜索
const search = () => {
  if (keyword.value) {
    const q = packQuery({KEYWORD: keyword.value})
    router.push({path: PRODUCT_URL, query: {q}})
  }
}

const lastValidData = ref<ISearch.CompletionRow[]>([]) // 新增缓存变量
const emptyData = {id: '9999999999999', keyword: 'no search results found...', type: 'notData'} as ISearch.CompletionRow

// 触发搜索建议
const searchCompletionList = async (queryString: string, cb: Function) => {
  // 当长度小于4时不触发
  if (queryString.length < 4) {
    return cb(lastValidData.value || [emptyData]);
  }
  try {
    const {data} = await getSearchCompletionApi(queryString)
    if (!data.length) {
      data.push(emptyData)
    }
    cb(data)
    lastValidData.value = data // 缓存最后一次有效数据
  } catch (e) {
    // 保持当前建议列表不关闭弹窗
    cb(lastValidData.value || [emptyData])
  }
}

let prevKeyword = ''

// 点击搜索建议跳转
const handleClickSearchCompletion = (item: Record<string, any>) => {
  if (item.id === emptyData.id) {
    return keyword.value = prevKeyword
  }
  startJump(item as ISearch.CompletionRow)
};

const handleInput = (text: string) => {
  if (text !== emptyData.keyword) prevKeyword = text
}

// 跳转
const startJump = (rawItem: ISearch.CompletionRow) => {
  if (rawItem.type === 'product') {
    const q = packQuery({KEYWORD: rawItem.keyword})
    router.push({path: PRODUCT_URL, query: {q}})
  }
  if (rawItem.type === 'artists') {
    const params = {
      SEARCH_TYPE: rawItem.type,
      KEYWORD: rawItem.keyword,
      ...gen_path_obj({name: rawItem.keyword, id: rawItem.id!}, 'ARTIST', ['name'])
    }
    const q = packQuery(params)
    router.push({
      path: PRODUCT_URL,
      query: {q}
    })
  }
}

</script>

<style scoped lang="scss">
.search-wrapper {
  position: relative;
  padding: 120px 40px 40px;

  .close-btn {
    position: absolute;
    top: 40px;
    right: 40px;
  }

  .search-box {
    max-width: 800px;
    width: 100%;
  }

  :deep(.el-autocomplete) {
    .el-input__wrapper {
      padding: 5px 0;
      box-shadow: none;
      border-bottom: var(--border-width-xl) solid var(--color-primary);

      .el-input__inner {
        font-weight: bold;
        font-size: clamp(2.08vw, 16px, 40px);
        color: var(--color-primary);
        height: auto;
        line-height: unset;

        &::placeholder {
          color: var(--color-gray-200);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .search-wrapper {
    padding: 80px 20px 20px;

    .close-btn {
      top: 20px;
      right: 20px;
    }
  }
}

@media (max-width: 414px) {
  .search-wrapper {
    padding-top: 50px;
  }
}
</style>