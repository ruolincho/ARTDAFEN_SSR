<template>
  <header class="pc-header sandblasting" :class="{ 'is-dropdown': isDropdownVisible || activeLocType }" @mouseleave="closeMenu">
    <div class="header-inner-container">

      <div class="header-logo">
        <NuxtLink class="logo-link" to="/">
          <img class="logo-img" src="~/assets/images/logo.png" alt="ARTDAFEN Logo">
        </NuxtLink>
      </div>

      <nav class="main-nav">
        <ul class="level-1-list">
          <li
              v-for="item in menuData"
              :key="item.id"
              class="level-1-item"
              :class="{ 'is-active': activeFirstId === item.id || currentId === item.id }"
              @mouseenter="openMenu(item.id)"
          >
            <NuxtLink
                v-if="item.linkProps?.isPureLink"
                :to="item.linkProps?.to"
                :target="item.linkProps?.target"
                class="item-text"
                @click="closeMenu"
            >
              {{ item.name }}
            </NuxtLink>
            <span class="item-text" v-else>{{ item.name }}</span>
          </li>
        </ul>
      </nav>

      <div class="header-actions">

        <div class="header-localization" ref="containerRef">
          <!--语言-->
          <div class="loc-group ignore" :class="{ 'is-dropdown': activeLocType === 'Lang' }">
            <div class="loc-group-button" @click="toggleLoc('Lang')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20"/>
              </svg>
              <span class="loc-current">{{ currentServiceId }}</span>
            </div>
            <div class="loc-dropdown">
              <ul class="loc-list">
                <li
                    class="loc-item"
                    :class="{ active: currentServiceId === item.serviceId }"
                    v-for="item in languageData" :key="item.id"
                    @click="switchLanguage(item.id)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
          <span class="loc-divider">/</span>
          <!--货币-->
          <div class="loc-group" :class="{ 'is-dropdown': activeLocType === 'Currency' }">
            <div class="loc-group-button" @click="toggleLoc('Currency')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
              <span class="loc-current ignore">{{ currentCurrency }}</span>
            </div>
            <div class="loc-dropdown">
              <ul class="loc-list">
                <li class="loc-item"
                    :class="{ active: currentCurrency === item.code }"
                    v-for="item in currencyList"
                    :key="item.id"
                    @click="setCurrentCurrency(item.code)"
                >
                  <span class="ignore">{{ item.code }}</span> - {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="action-separator"></div>

        <button class="action-btn" aria-label="Search">
          <span class="iconfont icon-search" @click="openSearch"></span>
        </button>
        <button class="action-btn" aria-label="Account" v-if="userStore.isLogin" @click="router.push('/account')">
          <span class="iconfont icon-customer"></span>
        </button>
        <button class="action-btn" aria-label="Login" v-if="!userStore.isLogin" @click="router.push('/login')">
          <span class="iconfont icon-login"></span>
        </button>
        <button class="action-btn" aria-label="Favorites" v-if="userStore.isLogin"
                @click="router.push('/account/favorites')">
          <span class="iconfont icon-follow"></span>
        </button>
        <button class="action-btn" aria-label="Cart" ref="cartButtonRef" v-click-outside="onClickOutside">
          <el-badge :value="cartStore.subtotalQuantity" :show-zero="false" color="#000">
            <span class="iconfont icon-shopping-bag"></span>
          </el-badge>
        </button>
      </div>

    </div>

    <!--下沉导航-->
    <Transition name="mega-fade">
      <div v-show="isDropdownVisible" class="mega-menu-dropdown">
        <div class="dropdown-inner">

          <div
              v-for="secondItem in currentSecondLevels"
              :key="secondItem.id"
              class="menu-column"
          >
            <h3 class="column-title">{{ secondItem.name }}</h3>

            <ul class="level-3-list">
              <li
                  v-for="thirdItem in secondItem.children"
                  :key="thirdItem.id"
                  class="level-3-item"
              >
                <NuxtLink
                    v-if="thirdItem.linkProps?.isPureLink"
                    :to="thirdItem.linkProps?.to"
                    :target="thirdItem.linkProps?.target"
                    class="level-3-item-action"
                    @click="closeMenu"
                >
                  {{ thirdItem.name }}
                </NuxtLink>

                <span v-else class="level-3-item-action">
                  {{ thirdItem.name }}
                </span>

              </li>
            </ul>
          </div>

        </div>
      </div>
    </Transition>
  </header>
  <!--pc购物车弹窗-->
  <el-popover
      ref="cartPopoverRef"
      placement="bottom-end"
      width="381px"
      trigger="click"
      :virtual-ref="cartButtonRef"
      virtual-triggering
      @show="handleOpenCart"
  >
    <CartWindow/>
  </el-popover>
</template>

<script setup lang="ts">
import {useUserStore} from "~/stores/modules/user";
import {useTranslateLang} from "~/composables/useTranslateLang";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useCartStore} from "~/stores/modules/cart";
import type {IHome} from "~/api/interface/home/home";
import {useLockScroll} from "~/composables/useLockScroll";

const props = defineProps({
  menuData: {
    type: Array as () => IHome.MenuRow[],
    default: () => []
  },
  currentId: {
    type: [String, null]
  }
})

const {$bus} = useNuxtApp()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const {languageData, switchLanguage, currentServiceId} = useTranslateLang()
const {currentCurrency, currencyList, setCurrentCurrency} = useCurrencyStore();

// 购物车弹窗
const cartButtonRef = ref()
const cartPopoverRef = ref()
const onClickOutside = () => {
  unref(cartPopoverRef).popperRef?.delayHide?.()
}
// 打开购物车窗口进行商品状态以及库存预检查
const handleOpenCart = () => {
  cartStore.shoppingPreCheck()
}

const isDropdownVisible = ref(false)

const activeFirstId = ref<string | null>(null) // 记录当前激活的一级菜单 ID

const activeFirstItem = computed(() => { // 当前激活的一级菜单对象
  return props.menuData.find(i => i.id === activeFirstId.value)
})

const currentSecondLevels = computed(() => { // 前应该显示的二级和三级数据
  return activeFirstItem.value?.children || []
})

// --- 鼠标悬停，打开菜单 ---
const openMenu = (id: string) => {
  activeFirstId.value = id

  // 通过判断当前选中的项是否有子集，来决定是否拉下 Menu
  if (currentSecondLevels.value.length > 0) {
    isDropdownVisible.value = true
  } else {
    // 如果悬停在一级纯链接（无子集）上，收起面板
    isDropdownVisible.value = false
  }
}

// --- 鼠标移出 Header，关闭菜单 ---
const closeMenu = () => {
  isDropdownVisible.value = false
  activeFirstId.value = null
}

const openSearch = () => {
  $bus.emit('openSearchDrawer')
}

// 定义联合类型，null 表示全部收起
type ActiveLocType = 'Lang' | 'Currency' | null
const activeLocType = ref<ActiveLocType>(null)
const containerRef = ref<HTMLElement | null>(null)

const toggleLoc = (type: ActiveLocType) => {
  activeLocType.value = activeLocType.value === type ? null : type
  isDropdownVisible.value = false
}

// 点击外部自动收起
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    activeLocType.value = null
  }
}

watch(() => isDropdownVisible.value, (isVisible) => {
  if (isVisible) activeLocType.value = null
})

onMounted(() => {
  $bus.on('closeCartWindow', () => { // 隐藏购物车窗口
    cartPopoverRef.value?.hide?.()
  })
  $bus.on('openCartWindow', () => {  // 打开购物车窗口
    if (!cartPopoverRef.value?.visible) {
      cartButtonRef.value?.click()
    }
  })
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  $bus.off('closeCartWindow')
  $bus.off('openCartWindow')
  document.removeEventListener('click', handleClickOutside)
})

useLockScroll(isDropdownVisible)
</script>

<style scoped>
  .pc-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  /* 核心布局容器：全宽 + 32px 边距，并使用 Flexbox 分布 */
  .header-inner-container {
    width: 100%;
    margin: 0 auto;
    padding: 0 32px;
    height: var(--header-height, 80px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 1);
  }

  /* =========================================
     1. Logo 区域
     ========================================= */
  .header-logo {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .logo-link {
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 4px; /* 如果需要圆角可以加 */
    overflow: hidden;
  }

  .logo-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 如果是带背景的方图用 cover，如果是透明底 PNG 用 contain */
    display: block;
  }

  /* =========================================
     2. 主导航区域 (放在中间)
     ========================================= */
  .main-nav {
    flex: 1; /* 占据剩余空间 */
    display: flex;
    justify-content: flex-start; /* 导航靠左紧贴 Logo，如果想居中可以改为 center */
    margin-left: 32px; /* 与 Logo 保持呼吸感间距 */
    margin-right: 32px; /* 与 Actions 保持呼吸感间距 */

    /* 允许导航条在空间极度压缩时横向滚动，但不显示丑陋的滚动条 */
    min-width: 0; /* 必须加这个，打破 Flexbox 默认的最小宽度限制 */
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox 隐藏滚动条 */
  }

  .main-nav::-webkit-scrollbar {
    display: none;
  }

  .level-1-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 20px;
  }

  .level-1-item {
    cursor: pointer;
    height: var(--header-height, 80px);
    display: flex;
    align-items: center;
    position: relative;
  }

  .item-text {
    font-size: 14px;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .level-1-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #000;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .level-1-item:hover::after,
  .level-1-item.is-active::after {
    transform: scaleX(1);
  }

  /* =========================================
   语言与货币切换区 (高定极简风)
   ========================================= */
  .header-localization {
    display: flex;
    align-items: center;
    font-size: 13px; /* 比导航稍微小一点，分清主次 */
    font-weight: 600;
    color: #333;
  }

  /* 分隔符 */
  .loc-divider {
    margin: 0 8px;
    color: #ccc;
    font-weight: 400;
  }

  /* 单个设置组 (相对定位，用于包裹下拉框) */
  .loc-group {
    position: relative;
  }

  .loc-group-button {
    cursor: pointer;
    padding: 10px 0; /* 增加上下感应区，防止鼠标移出时太容易消失 */
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* 当前显示的文字 */
  .loc-current {
    transition: color 0.2s;
    text-transform: uppercase;
  }

  .loc-group-button:hover .loc-current {
    color: #000;
    text-decoration: underline; /* 悬停时加下划线提示可点击 */
  }

  /* --- 悬停下拉面板 --- */
  .loc-dropdown {
    position: absolute;
    top: 100%; /* 贴在文字正下方 */
    right: 0;
    transform: translateY(10px); /* 往下偏移 */
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
    min-width: 120px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1010;
    max-height: 320px; /* 大约能显示 8-10 个选项的高度 */
    overflow-y: auto;
    /* Firefox 浏览器的极简滚动条支持 */
    scrollbar-width: thin;
    scrollbar-color: #e0e0e0 transparent;
  }

  /* =========================================
   Webkit (Chrome/Safari/Edge) 自定义优雅滚动条
   ========================================= */
  .loc-dropdown::-webkit-scrollbar {
    width: 4px; /* 极细的宽度，不抢视觉焦点 */
  }

  .loc-dropdown::-webkit-scrollbar-track {
    background: transparent; /* 轨道透明 */
  }

  .loc-dropdown::-webkit-scrollbar-thumb {
    background-color: #e0e0e0; /* 浅灰色滑块 */
    border-radius: 4px; /* 圆角显得更精致 */
  }

  .loc-dropdown::-webkit-scrollbar-thumb:hover {
    background-color: #bdbdbd; /* 鼠标悬停在滚动条上时稍微加深 */
  }

  /* 显示下拉面板 */
  .loc-group.is-dropdown .loc-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0); /* 向上滑入 */
  }

  /* 下拉列表样式 */
  .loc-list {
    list-style: none;
    margin: 0;
    padding: 8px 0;
  }

  .loc-item {
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 400;
    color: #666;
    white-space: nowrap;
    transition: all 0.15s;
  }

  .loc-item:hover {
    background: #f9f9f9;
    color: #000;
  }

  /* 当前选中的项加粗变成黑色 */
  .loc-item.active {
    font-weight: 600;
    color: #000;
  }

  /* =========================================
     操作区竖向分割线
     ========================================= */
  .action-separator {
    width: 1px;
    height: 14px;
    background-color: #e0e0e0;
    margin: 0 12px; /* 控制文字设置区和图标区的间距 */
  }

  /* =========================================
     3. 右侧功能操作区
     ========================================= */
  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .action-btn {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;

    .iconfont {
      font-size: 20px;
    }
  }

  .action-btn:hover {
    opacity: 0.6;
  }

  /* =========================================
     巨型下拉菜单 (Mega Menu)
     ========================================= */
  .mega-menu-dropdown {
    position: absolute;
    top: 100%; /* 保证紧贴着 header-inner-container 的底部 */
    left: 0;
    width: 100%;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    box-shadow: 0 9999px 0 9999px #0006;
  }

  /* 下拉菜单内部同样对齐 1600px */
  .dropdown-inner {
    width: 100%;
    margin: 0 auto;
    padding: 32px 32px 60px 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }

  .menu-column {
    display: flex;
    flex-direction: column;
    min-width: 120px;
  }

  .column-title {
    font-size: 13px;
    font-weight: 700;
    color: #000;
    margin: 0 0 16px 0;
    letter-spacing: 0.5px;
  }

  .level-3-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .level-3-item {
    font-size: 13px;
  }

  .level-3-item-action {
    color: #666;
    cursor: pointer;
    transition: color 0.15s ease;
  }
  .level-3-item-action:hover {
    color: #000;
    text-decoration: underline;
  }

  /* 动画 */
  .mega-fade-enter-active,
  .mega-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .mega-fade-enter-from,
  .mega-fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  /*磨砂效果*/
  .sandblasting {}

  .sandblasting .header-inner-container{
    background: rgba(255,255,255,0.47);
    backdrop-filter: blur(16px);
  }

  .sandblasting .mega-menu-dropdown {
    border-top: 1px solid rgba(26, 26, 26, 0.12);
  }

  .sandblasting.is-dropdown {
    background: rgba(255,255,255,1);
  }


  /* 小屏幕 ( <= 991px ) 直接隐藏整个 PC Header */
  @media (max-width: 991px) {
    .pc-header {
      display: none !important; /* 隐藏 PC 导航，此时你的移动端 Header 应该会展示 */
    }
  }

  /* 中等屏幕 "尴尬期" ( 992px ~ 1300px ) */
  /* 这个区间屏幕能放下 PC 导航，但容易拥挤，所以我们极度压缩间距 */
  @media (min-width: 992px) and (max-width: 1300px) {
    .header-inner-container {
      padding: 0 16px; /* 缩减左右安全边距 */
    }

    .main-nav {
      margin-left: 16px; /* 缩减 Logo 和导航的距离 */
      margin-right: 16px; /* 缩减 Actions 和导航的距离 */
    }

    .level-1-list {
      gap: 12px; /* 极限压缩菜单项之间的间距 */
    }

    .item-text {
      font-size: 13px; /* 字号再稍微缩小一点点 */
      letter-spacing: 0; /* 舍弃字间距以换取空间 */
    }

    .header-actions {
      gap: 10px; /* 缩减右侧图标和文字的间距 */
    }

    /* 同步缩小下拉面板的 Padding，保持视觉统一 */
    .dropdown-inner {
      padding: 30px 16px 40px 16px;
      gap: 40px; /* 缩小列与列之间的间距 */
    }
  }
</style>