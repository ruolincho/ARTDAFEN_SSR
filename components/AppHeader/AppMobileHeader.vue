<template>
  <header class="mobile-header sandblasting">
    <div class="header-bar">
      <NuxtLink class="logo" to="/">
        <img src="~/assets/images/logo.png" alt="ARTDAFEN"/>
        <span>100% HandPainted</span>
      </NuxtLink>

      <div class="header-tools">
        <TransitionGroup name="nike-zoom">
          <div class="tool-item" v-if="!isDrawerOpen">
            <span class="iconfont icon-search" @click="openSearch"></span>
          </div>
          <div class="tool-item" v-if="!isDrawerOpen">
            <el-badge :value="cartStore.subtotalQuantity" :show-zero="false" color="#000">
              <span class="iconfont icon-shopping-bag" @click="handleCartApp"></span>
            </el-badge>
          </div>
          <div class="tool-item" v-if="userStore.isLogin && !isDrawerOpen">
            <span class="iconfont icon-customer" @click="router.push('/account')"></span>
          </div>
          <div class="tool-item" v-if="!userStore.isLogin && !isDrawerOpen">
            <span class="iconfont icon-login" @click="router.push('/login')"></span>
          </div>
        </TransitionGroup>
        <div class="tool-item burger-box" :class="{ 'is-active': isDrawerOpen }" @click="toggleDrawer">
          <div class="icon_bar"></div>
          <div class="icon_bar"></div>
          <div class="icon_bar"></div>
        </div>
      </div>
    </div>

    <!--遮罩-->
    <Transition name="fade">
      <div v-if="isDrawerOpen" class="drawer-overlay" @click="closeDrawer"></div>
    </Transition>

    <Transition name="drawer-slide">
      <div v-if="isDrawerOpen" class="drawer-content">

        <div class="menu-container">
          <Transition :name="transitionName">
            <div :key="currentLevel.id" class="menu-level">
              <!--层级标题-->
              <div class="level-header">
                <div class="level-header__text" v-if="history.length > 0" @click="goBack">
                  <svg class="icon-back" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                  <span class="back-text">{{ currentLevel.name }}</span>
                </div>
                <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" @click="toggleDrawer">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </div>
              <!--层级列表-->
              <ul class="menu-list" :class="{ 'is-root': history.length === 0, ignore: settingType === 'LANG' }">
                <li
                    v-for="item in currentLevel.list"
                    :key="item.id"
                    class="menu-item"
                >
                  <NuxtLink
                      v-if="!settingType && item.linkProps?.isPureLink"
                      :to="item.linkProps?.to"
                      :target="item.linkProps?.target"
                      class="item-action"
                      @click="closeDrawer"
                  >
                    <span class="item-label">{{ item.name }}</span>
                  </NuxtLink>
                  <div v-else class="item-action" @click="handleItemClick(item)">
                    <span class="item-label">{{ item.name }}</span>
                    <svg v-if="item.children?.length" class="icon-arrow" width="20" height="20" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </li>
              </ul>
              <!--功能位置-->
              <div v-if="history.length === 0" class="level-footer">
                <div class="social-icon">
                  <a class="social-item" href="https://www.youtube.com/@artdafen" target="_blank" title="youtube">
                    <span class="iconfont icon-Youtube"></span>
                  </a>
                  <a class="social-item" href="https://www.instagram.com/art_dafen/" target="_blank" title="instagram">
                    <span class="iconfont icon-instagram"></span>
                  </a>
                  <a class="social-item" href="https://www.pinterest.com/artdafen/" target="_blank" title="pinterest">
                    <span class="iconfont icon-pinterest"></span>
                  </a>
                  <a class="social-item" href="https://www.tiktok.com/@artdafencom" target="_blank" title="tiktok">
                    <span class="iconfont icon-douyinjumuguanli"></span>
                  </a>
                  <a class="social-item" href="https://x.com/artdafen" target="_blank" title="x">
                    <span class="iconfont icon-tuite "></span>
                  </a>
                </div>

                <div class="footer-settings">
                  <button class="setting-btn" @click="openSetting('LANG')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20"/>
                    </svg>
                    <span>{{ currentLang }}</span>
                  </button>

                  <div class="divider"></div>

                  <button class="setting-btn" @click="openSetting('CURRENCY')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                    </svg>
                    <span>{{ currentCurrency }} <i class="ignore">({{ getCurrencySymbol }})</i></span>
                  </button>

                  <AndroidInstallBtn v-slot="{ handleInstall }">
                    <div class="divider"></div>
                    <button class="setting-btn" @click="handleInstall">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span>Install App</span>
                    </button>
                  </AndroidInstallBtn>

                  <IosInstallPrompt v-slot="{ handleInstall }">
                    <div class="divider"></div>
                    <button class="setting-btn" @click="handleInstall">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span>Install App</span>
                    </button>
                  </IosInstallPrompt>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {useUserStore} from "~/stores/modules/user";
import {useCartStore} from "~/stores/modules/cart";
import {useTranslateLang} from "~/composables/useTranslateLang";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useLockScroll} from "~/composables/useLockScroll";
import SearchDrawer from "~/components/SearchDrawer/index.vue";

const props = defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
})

const {currentLang, languageData, switchLanguage} = useTranslateLang()
const {currentCurrency, currencyList, setCurrentCurrency, getCurrencySymbol} = useCurrencyStore();
const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()

// ---状态控制 ---
const isDrawerOpen = ref(false)
const history = ref<any[]>([]) // 存储点击路径 [一级对象, 二级对象]
const transitionName = ref('slide-next')

// --- 核心计算逻辑 ---
const currentLevel = computed(() => {
  if (history.value.length === 0) {
    return {
      id: 'root', name: 'Menu',
      list: props.menuData ?? [],
      config: {}
    } // 根菜单
  }
  const activeItem = history.value[history.value.length - 1] // 取最后一个记录
  return {
    id: activeItem.id,
    name: activeItem.name,
    list: activeItem.children || [],
    config: activeItem.config || {}
  }
})

// --- 切换展示抽屉 ---
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
  settingType.value = undefined
  if (!isDrawerOpen.value) {
    // 关闭时重置菜单到第一层
    setTimeout(() => history.value = [], 300)
  }
}

// --- 关闭抽屉 ---
const closeDrawer = () => {
  isDrawerOpen.value = false
  settingType.value = undefined
  setTimeout(() => history.value = [], 300)
}

// --- 点击菜单 ---
const handleItemClick = (item: any) => {
  if (item.children && item.children.length > 0) { // 展开子集
    transitionName.value = 'slide-next'
    history.value.push(item)
    return
  }

  // 切换语言
  if (settingType.value === 'LANG') {
    switchLanguage(item.id)
    closeDrawer()
    return
  }

  // 切换货币
  if (settingType.value === 'CURRENCY') {
    setCurrentCurrency(item.code)
    closeDrawer()
    return
  }
}

// --- 返回上一级 ---
const goBack = () => {
  transitionName.value = 'slide-prev'
  history.value.pop()
  settingType.value = undefined
}

// --- 跳转购物车 ---
const handleCartApp = async () => {
  await cartStore.shoppingPreCheck()
  router.push('/cart')
}

// 打开设置项（语言或货币）
type SettingType = 'LANG' | 'CURRENCY'
const settingType = ref<SettingType | undefined>()
const openSetting = (type: SettingType) => {
  transitionName.value = 'slide-next'
  settingType.value = type
  if (type === 'LANG') {
    history.value.push({
      id: 'setting-lang',
      name: 'Select Language',
      children: languageData ?? []
    })
  } else if (type === 'CURRENCY') {
    history.value.push({
      id: 'setting-currency',
      name: 'Select Currency',
      children: currencyList ?? []
    })
  }
}

const openSearch = () => {
  const {$bus} = useNuxtApp()
  $bus.emit('openSearchDrawer')
}

watch(
    () => isDrawerOpen.value,
    (flag) => {
      if (import.meta.env.MODE !== 'production') return
      if (!flag) {
        window.Tawk_API.showWidget()
      } else {
        window.Tawk_API.hideWidget();
      }
    }
)

useLockScroll(isDrawerOpen) // 监听状态变化锁定滚动
</script>

<style scoped>
  /* 基础容器 */
  .mobile-header {
    --nike-ease: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Header Bar */
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height, 50px);
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    //border-bottom: 1px solid #eee;
    z-index: 1000;
  }

  .logo {
    font-weight: 800;
    height: var(--header-height, 50px);
    vertical-align: middle;
    display: flex;
    align-items: center;
    font-size: 13px;

    img {
      height: 30px;
      margin-right: 5px;
    }
  }

  .header-tools {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
  }

  .tool-item .iconfont {
    font-size: 24px;
  }

  .tool-item + .tool-item {
    margin-left: 15px;

  }

  /* burger */
  .burger-box {
    background: transparent;
    border: none;
    display: inline-block;
    visibility: visible;
    transition: transform 0.44s 0.2s cubic-bezier(0.04, 0.04, 0.12, 0.96), opacity 0.28s 0.36s cubic-bezier(0.52, 0.16, 0.24, 1), -webkit-transform 0.44s 0.2s cubic-bezier(0.04, 0.04, 0.12, 0.96);
  }

  .burger-box .icon_bar {
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background-color: #111;
    opacity: 1;
    transition-property: transform, opacity;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  .burger-box .icon_bar:nth-of-type(2) {
    margin: 5px 0;
  }

  /* Burger 激活状态 (变 X) */
  .burger-box.is-active .icon_bar:nth-of-type(2) {
    opacity: 0;
  }

  .burger-box.is-active .icon_bar:first-child {
    transform: translate(0, 7px) rotate(45deg);
  }

  .burger-box.is-active .icon_bar:last-child {
    transform: translate(0, -7px) rotate(-45deg);
  }

  /* Overlay */
  .drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;
  }

  /* Drawer Content */
  .drawer-content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 340px;
    background: #fff;
    z-index: 1002;
    overflow: hidden;
  }

  /* Menu Container & Level Animation */
  .menu-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .menu-level {
    position: absolute;
    inset: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .level-header {
    padding-left: 20px;
    padding-right: 20px;
    height: var(--header-height, 50px);
    position: relative;
  }

  .level-header__text {
    display: flex;
    align-items: center;
    padding-right: 30px;
    height: 100%;
  }

  .icon-back {
    flex-shrink: 0;
  }

  .back-text {
    width: 100%;
    font-weight: 600;
    font-size: 14px;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .icon-close {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }

  .menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    overflow-y: auto;
    height: auto;
  }

  .menu-item {
    border-top: 1px solid #f9f9f9;
  }

  .item-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    width: 100%;
    box-sizing: border-box;
  }

  .item-label {
    font-size: 14px;
    color: #111;
  }

  .icon-arrow {
    color: #ccc;
  }

  .level-footer {
    flex-shrink: 0;
  }

  /* 语言货币在一排 */
  .footer-settings {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 24px;
  }

  .setting-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #111;
    cursor: pointer;
    transition: color 0.2s;
  }

  .setting-btn:active {
    color: #757575;
  }

  /* 极简分割线 */
  .divider {
    width: 1px;
    height: 12px;
    background-color: #ddd;
    margin: 0 10px; /* 控制左右按钮的间距 */
  }

  .social-icon {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    border-top: 1px solid #f9f9f9;
    border-bottom: 1px solid #f9f9f9;
    padding: 20px 24px;
    align-items: center;
    justify-content: center;
  }

  .social-item {
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }

  .social-item .iconfont {
    font-size: 24px;
  }

  /* --- 动画部分 --- */

  /* 1. 遮罩淡入 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  /* 2. 抽屉滑入 */
  .drawer-slide-enter-active, .drawer-slide-leave-active {
    transition: transform 0.3s var(--nike-ease);
  }

  .drawer-slide-enter-from, .drawer-slide-leave-to {
    transform: translateX(100%);
  }

  /* 3. 层级推入 (Nike Style) */
  .slide-next-enter-active, .slide-next-leave-active,
  .slide-prev-enter-active, .slide-prev-leave-active {
    transition: transform 0.4s var(--nike-ease), opacity 0.4s;
  }

  /* 下一步：新页面从右进，旧页面向左退 */
  .slide-next-enter-from {
    transform: translateX(100%);
  }

  .slide-next-leave-to {
    transform: translateX(-30%);
    opacity: 0;
  }

  /* 上一步：旧页面向右出，新页面从左回 */
  .slide-prev-enter-from {
    transform: translateX(-30%);
    opacity: 0;
  }

  .slide-prev-leave-to {
    transform: translateX(100%);
  }


  /* --- 精心设计的 Zoom-Fade 动画 --- */

  /* 进入和离开的激活状态 */
  .nike-zoom-enter-active {
    /* 进入时：稍微慢一点，带点优雅的回弹 */
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.3s ease-out;
  }

  .nike-zoom-leave-active {
    /* 离开时：动作利索，迅速闪避 */
    transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.2s ease-in;
  }

  /* 离开时的状态 (Menu 打开时，Action 消失) */
  .nike-zoom-leave-to {
    /* 这里的核心设计：缩小的同时向左位移 -15px */
    transform: scale(0.6) translateX(-15px);
    opacity: 0;
  }

  /* 进入时的初始状态 (Menu 关闭时，Action 回来) */
  .nike-zoom-enter-from {
    /* 从更小的比例和左侧滑入 */
    transform: scale(0.6) translateX(-15px);
    opacity: 0;
  }

  /* 进阶技巧：如果你想要两个按钮有先后顺序，可以加一点 delay */
  /* 只有在 TransitionGroup 下有效 */
  .nike-zoom-leave-active:nth-child(1) {
    transition-delay: 0.05s;
  }

  .nike-zoom-leave-active:nth-child(2) {
    transition-delay: 0s;
  }

  /*磨砂效果*/
  .sandblasting {}

  .sandblasting .header-bar{
    background: rgba(255,255,255,0.47);
    backdrop-filter: blur(16px);
  }

  /* 小屏幕 ( >= 991px ) 直接隐藏整个 PC Header */
  @media (min-width: 992px) {
    .mobile-header {
      display: none !important; /* 隐藏 PC 导航，此时你的移动端 Header 应该会展示 */
    }
  }
</style>