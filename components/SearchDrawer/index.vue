<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="search-overlay" @click="closeSearch"></div>
      </Transition>

      <Transition name="slide">
        <div v-if="isOpen" class="search-container">
          <!--搜索框-->
          <div class="search-header">
            <div class="input-wrapper">
              <input
                  ref="searchInputRef"
                  v-model="searchQuery"
                  type="text"
                  class="search-input"
                  placeholder="Search for..."
                  @input="onSearch"
                  @keyup.enter="forceSearch"
              >
              <button
                  class="clear-input-btn"
                  :class="{show: searchQuery}"
                  @click="searchQuery = ''"
                  aria-label="Clear search"
              >
                Clear
              </button>
            </div>

            <button class="close-btn" @click="closeSearch">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!--搜索内容-->
          <div class="search-body">
            <Transition name="fade-slide-up" mode="out-in">
              <!--热门搜索词-->
              <div v-if="!searchQuery" class="state-panel recommend-state" key="recommend">
                <h4 class="search-title">Hot search</h4>
                <ul class="search-list">
                  <li v-for="(item, index) in hotList" :key="index">
                    <a href="#" @click.prevent="quickSearch(item)">{{ item }}</a>
                  </li>
                </ul>
              </div>

              <!--骨架屏-->
              <div v-else-if="isSearching" class="state-panel skeleton-state" key="skeleton">
                <div class="skeleton-tabs">
                  <div class="skeleton-tab skeleton-pulse"></div>
                  <div class="skeleton-tab skeleton-pulse"></div>
                  <div class="skeleton-tab skeleton-pulse"></div>
                </div>
                <div class="skeleton-list">
                  <div v-for="i in 4" :key="i" class="skeleton-item">
                    <div class="skeleton-img skeleton-pulse"></div>
                    <div class="skeleton-text-group">
                      <div class="skeleton-line short skeleton-pulse"></div>
                      <div class="skeleton-line long skeleton-pulse"></div>
                      <div class="skeleton-line medium skeleton-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!--空数据-->
              <div v-else-if="isEmptyResult" class="state-panel empty-state" key="empty">
                <p>No results could be found for "<strong>{{ searchQuery }}</strong>".</p>
                <button class="clear-btn" @click="searchQuery = ''">Clear search</button>
              </div>

              <!--搜索结果-->
              <div v-else class="state-panel results-state" key="results">
                <div class="tabs-scroll-container">
                  <div class="tabs-header">
                    <button
                        v-for="tab in allTypes"
                        :key="tab"
                        :class="['tab-btn text-capitalize', { active: activeTab === tab }]"
                        @click="activeTab = tab"
                    >
                      {{ typeMap[tab] }}
                      <span class="count" v-if="searchResults[tab]">
                        ({{ searchResults[tab].length }})
                      </span>
                    </button>
                  </div>
                </div>

                <div class="tab-panels">
                  <div v-if="activeTab === 'product'" class="panel-placeholder">
                    <SearchProduct :list="searchResults['product']"/>
                  </div>

                  <div v-if="activeTab === 'category'" class="panel-placeholder">
                    <SearchCategory :list="searchResults['category']"/>
                  </div>

                  <div v-if="activeTab === 'artists'" class="panel-placeholder">
                    <SearchArtists :list="searchResults['artists']"/>
                  </div>

                  <div v-if="activeTab === 'zone'" class="panel-placeholder">
                    <SearchZone :list="searchResults['zone']"/>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {ref, watch, computed, onMounted, onUnmounted, nextTick} from 'vue'
import {useLockScroll} from "~/composables/useLockScroll";
import {debounce} from "~/utils";
import type {ISearch} from "~/api/interface/search/search";
import {getHotSearchApi, getSearchCompletionApi} from "~/api/modules/search/search";
import axios from 'axios'
import SearchProduct from "~/components/SearchDrawer/SearchProduct.vue";
import SearchArtists from "~/components/SearchDrawer/SearchArtists.vue";
import SearchCategory from "~/components/SearchDrawer/SearchCategory.vue";
import SearchZone from "~/components/SearchDrawer/SearchZone.vue";
import {COLLECTIONS_URL} from "~/config";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const emit = defineEmits(['update:modelValue'])

const typeMap = {
  "product": "products",
  "category": "collections",
  "artists": "artists",
  "zone": "curations",
}

// 获取热门搜索
const hotList = ref<string[]>([])
const getHotSearch = async () => {
  // const {data} = await getHotSearchApi()
  // TODO: 暂时写死
  hotList.value = [
    "Impressionism",
    "Abstract Art",
    "Curator's Choice",
    "FineArt Studio",
    "Popular Oil Paintings",
    "Best Selling Abstract",
    "Wabi Sabi",
    "Claude Monet",
    "Vincent van Gogh",
    "Modern Minimalism",
    "American Country",
    "Mediterranean",
  ]
}

const isOpen = ref(props.modelValue)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)
const isSearching = ref(false)
const allTypes = ref<ISearch.KeywordType[]>([])
const activeTab = ref<ISearch.KeywordType | null>(null)
const searchResults = ref({} as ISearch.KeywordData)

// 重置状态
const resetState = () => {
  searchQuery.value = ''

  searchResults.value = {} as ISearch.KeywordData
  allTypes.value = []

  activeTab.value = null

  isSearching.value = false

  // 中断可能仍在进行的网络请求，避免后台还在默默请求
  if (searchAbortController) {
    searchAbortController.abort('Search drawer closed, cancelled pending request.');
    searchAbortController = null;
  }
}

// 计算属性：判断是否无结果
const isEmptyResult = computed(() => {
  return !isSearching.value &&
      searchQuery.value.trim() !== '' &&
      Object.keys(searchResults.value).length === 0
})

// 请求补全
const fetchSuggestData = debounce(async (query: string) => {
  // 如果存在旧的控制器，先取消掉之前的请求
  if (searchAbortController) searchAbortController.abort('The user has entered new characters and has cancelled the previous request.');
  // 为本次全新的请求，创建一个【全新】的 AbortController 实例
  searchAbortController = new AbortController();
  isSearching.value = true
  try {
    const {data} = await getSearchCompletionApi(query, searchAbortController.signal)
    if (!data || Object.keys(data).length === 0) {
      searchResults.value = {} as ISearch.KeywordData
      allTypes.value = []
    } else {
      const groupedData = data
      // 默认切回第一个有数据的 tab
      allTypes.value = Object.keys(groupedData) as ISearch.KeywordType[];
      searchResults.value = groupedData
      activeTab.value = allTypes.value[0]!
    }
  } catch (error) {
    // 捕获取消请求导致的错误
    if (axios.isCancel(error)) {
      console.log('请求被取消，无需处理');
    } else {
      console.error('真正的请求错误:', error);
    }
  } finally {
    isSearching.value = false
  }
}, 500)

// 监听输入，触发模拟搜索
const onSearch = () => {
  const query = searchQuery.value.trim()

  // 如果输入框被清空了，立刻重置状态，不需要防抖
  if (query.length === 0) return resetState()

  isSearching.value = true

  fetchSuggestData(query)
}

// 声明控制器
let searchAbortController: AbortController | null = null;

// 快速搜索
const quickSearch = (term: string) => {
  searchQuery.value = term
  isSearching.value = true
  fetchSuggestData(term)
}

const closeSearch = () => emit('update:modelValue', false)

const handleEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) closeSearch()
}

const forceSearch = () => {
  const queryStr = searchQuery.value.trim()
  if (queryStr && !isSearching.value) {
    const q = packQuery({KEYWORD: queryStr, SEARCH_TYPE: 'product', PAGE: 1})
    router.push({path: COLLECTIONS_URL, query: {q}})
    closeSearch()
  }
}

// --- 监听与动作 ---
watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
  if (newVal) {
    nextTick(() => searchInputRef.value?.focus())
  } else {
    // 弹窗关闭后可以视需求决定是否清空搜索记录
    // setTimeout(() => { searchQuery.value = '' }, 300)
  }
})

// 监听 visible 变化 锁定滚动
useLockScroll(toRef(props, 'modelValue'));

onMounted(() => {
  getHotSearch()
  document.addEventListener('keydown', handleEsc)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
  if (searchAbortController) searchAbortController.abort('The component has been destroyed. Cancel the ongoing search.');
})
</script>

<style scoped lang="scss">
  /* 遮罩层 */
  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9998;
  }

  /* 搜索容器 */
  .search-container {
    position: fixed;
    z-index: 9999;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: auto;

    top: 15px;
    right: 15px;
    width: 680px;
    height: calc(100vh - 30px);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    padding: 30px;

    /* 内部元素默认透明度，通过动画控制显示 */
    .search-header, .search-body {
      opacity: 1;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .search-header {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #111;
      padding-bottom: 15px;
      margin-bottom: 25px;
      flex-shrink: 0;

      .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;

        .search-input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 1.2rem;
          color: #333;
          background: transparent;
          padding-right: 50px; // 为清空按钮留位置

          &::placeholder {
            color: #999;
          }
        }

        .clear-input-btn {
          position: absolute;
          right: 5px;
          border: none;
          cursor: pointer;
          color: #999;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;

          &.show {
            opacity: 1;
          }
        }
      }

      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #333;
        margin-left: 15px;
      }
    }

    .search-body {
      flex: 1;
      position: relative;
    }
  }

  /* Vue 动画过度效果 */

  /* 遮罩 Fade */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  /* 抽屉 Slide 及其内部元素的透明度级联 */
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .slide-enter-from, .slide-leave-to {
    transform: translateX(calc(100% + 30px));

    /* 需求：打开和关闭时内部内容由不可见变为可见 */
    .search-header, .search-body {
      opacity: 0;
      transform: translateX(20px);
    }
  }

  /* search-body 内容切换过度 (下到上，淡入) */
  .fade-slide-up-enter-active, .fade-slide-up-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .fade-slide-up-enter-from {
    opacity: 0;
    transform: translateY(15px);
  }

  .fade-slide-up-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  /* =========================================
    各个状态面板的样式
  ========================================= */

  /* 通用状态面板占位 */
  .state-panel {
    width: 100%;
  }

  /* 推荐状态 */
  .recommend-state {
    .search-title {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .search-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 18px;

        a {
          text-decoration: none;
          color: #222;
          font-size: 1rem;
          transition: color 0.2s;

          &:hover {
            color: #888;
          }
        }
      }
    }
  }

  /* 骨架屏加载状态 */
  .skeleton-state {
    .skeleton-pulse {
      background-color: #e5e5e5;
      border-radius: 4px;
      animation: pulse 1.5s infinite ease-in-out;
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .skeleton-tabs {
      display: flex;
      gap: 12px;
      margin-bottom: 30px;

      .skeleton-tab {
        height: 36px;
        width: 100px;
        border-radius: 18px; /* 根据图示，tab有圆角 */
      }
    }

    .skeleton-list {
      .skeleton-item {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;

        .skeleton-img {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          border-radius: 6px;
        }

        .skeleton-text-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 12px;

          .skeleton-line {
            height: 12px;
          }

          .short {
            width: 30%;
          }

          .long {
            width: 85%;
          }

          .medium {
            width: 50%;
          }
        }
      }
    }
  }

  /* 结果 Tabs 状态 */
  .results-state {
    .tabs-scroll-container {
      width: 100%;
      overflow: hidden; // 裁剪外部
      margin-bottom: 25px;
    }

    .tabs-header {
      display: flex;
      gap: 20px;
      overflow-x: auto; // 开启横向滚动
      white-space: nowrap; // 强制不换行

      // 隐藏滚动条 (Chrome, Safari, Edge)
      &::-webkit-scrollbar {
        display: none;
      }

      // 隐藏滚动条 (Firefox)
      scrollbar-width: none;

      .tab-btn {
        flex-shrink: 0; // 防止按钮被压缩
        font-size: 1.2rem;
        cursor: pointer;
        color: #999999;
        transition: color 0.3s;

        &.active, &:hover {
          color: #111;
        }
      }
    }

    .panel-placeholder {

    }
  }

  /* 无结果状态 */
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #555;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
    }

    .clear-btn {
      background: #111;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.95rem;
      transition: background 0.2s;

      &:hover {
        background: #333;
      }
    }
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .search-container {
      top: 10px;
      left: 15px;
      right: auto;
      width: calc(100vw - 30px);
      max-height: calc(100vh - 20px);
      height: auto;
      padding: 20px;
      transform: translateY(0);
    }

    .slide-enter-from, .slide-leave-to {
      transform: translateY(-120%);

      .search-header, .search-body {
        transform: translateY(-20px); /* 移动端的内部内容随外部做垂直位移动画 */
      }
    }
  }
</style>