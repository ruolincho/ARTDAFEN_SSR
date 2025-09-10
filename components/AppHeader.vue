<template>
  <!--pc-导航-->
  <header ref="pcHeaderRef" class="header-pc pc" :class="{ 'fold': isScrollingPositive }">
    <div class="header-wrapper">
      <div class="left">
        <div class="logo-wrapper acea-row row-middle">
          <NuxtLink class="logo-link" to="/">
            <img class="logo-img" src="~/assets/images/logo.png" alt="logo">
          </NuxtLink>
          <img class="logo-text" src="~/assets/images/slogan.png" alt="slogan">
        </div>
        <div class="nav-wrapper">
          <div class="website">
            <NuxtLink class="website-name" to="/">ARTDAFEN.COM</NuxtLink>
          </div>
          <div class="nav-menu acea-row row-middle">
            <div class="nav-list acea-row row-middle">
              <div
                class="nav-item"
                v-for="(menu, index) in headerList"
                :key="menu.name"
                @touchstart.stop.prevent="showDropdown(index)"
                @mouseenter.stop.prevent="showDropdown(index)"
                @mouseleave.stop.prevent="scheduleHideDropdown"
                @click="clickNavFirst(menu, index)"
              >
                  <span
                    class="nav-link cursor-pointer"
                    :class="{ 'on': activeNavIndex === index || menu.path?.includes(currentRouteText) }"
                  >
                    {{ menu.name }}
                  </span>
              </div>
              <div class="split"></div>
              <div class="nav-item side" @click="router.push('/news')">
                  <span
                    class="nav-link cursor-pointer"
                    :class="{ 'on': currentRouteText === '/news' }"
                  >
                   NEWS
                  </span>
              </div>
              <div class="nav-item side" @click="router.push('/blog')">
                  <span
                    class="nav-link cursor-pointer"
                    :class="{ 'on': currentRouteText === '/blog' }"
                  >
                   BLOG
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="operation-wrapper acea-row row-column row-bottom">
        <div class="operation-list acea-row row-middle">
          <div class="operation-item acea-row row-middle" @click="router.push('/account')" v-if="userStore.isLogin">
            <span class="iconfont icon-customer"></span>
            <span class="operation-text">MY PAGE</span>
          </div>
          <div class="operation-item acea-row row-middle" @click="router.push('/account/favorites')"
               v-if="userStore.isLogin">
            <span class="iconfont icon-follow"></span>
            <span class="operation-text">MY LIKE</span>
          </div>
          <div class="operation-item acea-row row-middle" ref="cartButtonRef" v-click-outside="onClickOutside">
            <span class="iconfont icon-shopping-bag"></span>
            <span class="operation-text">SHOPPING CART</span>
          </div>
          <div class="operation-item acea-row row-middle" @click="router.push('/login')" v-if="!userStore.isLogin">
            <span class="iconfont icon-login"></span>
            <span class="operation-text">LOGIN</span>
          </div>
          <div class="operation-item acea-row row-middle currency">
            <span class="operation-text">{{ currencyStore.currentCurrency }}</span>
            <span class="iconfont icon-down"></span>
            <ul class="currency-list">
              <li
                v-for="item in currencyStore.currencyList"
                :key="item.id"
                @click="currencyStore.setCurrentCurrency(item.code)"
              >
                {{ item.code }} - {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="iconfont icon-search" @click="router.push('/search')"></div>
      </div>
      <!--下沉导航-->
      <div
        class="drop-wrapper border-t-sm"
        v-if="isDropdownVisible"
        @mouseenter="cancelHideDropdown"
        @mouseleave="hideDropdown"
      >
        <ClientOnly>
          <swiper
            :modules="modules"
            :pagination="{ clickable: true }"
            class="swiper"
            :space-between="40"
            slides-per-view="auto"
          >
            <swiper-slide class="slide" v-for="subMenu in currentDropdownMenu.children" :key="subMenu.name">
              <div class="drop-menu">
                <dl>
                  <dt @click="clickNavSecond(currentDropdownMenu, subMenu)">
                    {{ subMenu.name }}
                    <span class="iconfont icon-right"/>
                  </dt>
                  <dd
                    v-if="currentDropdownMenu.name === ARTIST_MENU_NAME && subMenu.config.type === 'ARTIST'"
                    @click="() => {hideDropdown(); router.push(`/artists-top?categoryId=${subMenu.id}`)}"
                  >
                    TOP 50 {{ subMenu.name }} <span class="iconfont icon-right"/>
                  </dd>
                  <dd v-for="subitem in subMenu.children" :key="subitem.name"
                      @click="clickNavThird(subitem, subMenu.config.type, currentDropdownMenu)">{{ subitem.name }}
                  </dd>
                  <dd
                    v-if="currentDropdownMenu.name === ARTIST_MENU_NAME && subMenu.config.type === 'ARTIST'"
                    @click="() => {hideDropdown(); router.push(`/artists-brief?categoryId=${subMenu.id}`)}"
                  >
                    All <span class="iconfont icon-right"/>
                  </dd>
                </dl>
              </div>
            </swiper-slide>
          </swiper>
        </ClientOnly>
      </div>
      <div class="mask" @click.stop.prevent="hideDropdown" @touchstart.stop.prevent="hideDropdown"
           v-show="isDropdownVisible"/>
    </div>
  </header>
  <div :style="{ height: pcPlaceHeight + 'px', transition: 'height 0.3s ease' }" v-show="appStore.isPc"/>

  <!--app-导航-->
  <header class="header-app app" :class="{'open-menu': openMenu}">
    <!--头部-->
    <div class="navbar-app">
      <NuxtLink class="logo" to="/">
        <img src="~/assets/images/logo.png"/>
      </NuxtLink>
      <div class="operating-area">
        <span class="iconfont icon-search" @click="router.push('/search')"></span>
        <span class="iconfont icon-shopping-bag" @click="handleCartApp"></span>
        <span class="iconfont icon-customer" v-if="userStore.isLogin" @click="router.push('/account')"></span>
        <span class="iconfont icon-login" v-if="!userStore.isLogin" @click="router.push('/login')"></span>
        <span class="iconfont" :class="[openMenu ? 'icon-close' : 'icon-editor-right-alignment']"
              @click="openMenu = !openMenu"></span>
        <!--        <div class="navbar-togger" @click="openMenu = !openMenu">-->
        <!--          <div class="icon_bar"></div>-->
        <!--          <div class="icon_bar"></div>-->
        <!--          <div class="icon_bar"></div>-->
        <!--        </div>-->
      </div>
    </div>

    <!-- 菜单 -->
    <div class="nav-menu">
      <ul class="nav-list">
        <li
          class="P_parent"
          :class="{ active: menu.path?.includes(currentRouteText), open: openIndex === index  }"
          v-for="(menu, index) in headerList"
          :key="menu.name"
        >
          <div class="cate-item">
            <div class="category-a" @click="clickNavFirst(menu, index)">{{ menu.name }}</div>
            <div class="category-tig P_tig" @click="toggleMenu(index)" v-if="menu.children?.length">
              <span><i class="iconfont icon-down"></i></span>
            </div>
          </div>
          <div class="category-cont P_slide">
            <div class="category-pad">
              <div class="pad-a" v-for="subMenu in menu.children" :key="subMenu.name"
                   @click="clickNavSecond(menu, subMenu)">{{ subMenu.name }}
              </div>
            </div>
          </div>
        </li>
        <li class="P_parent" :class="{ open: currentRouteText === '/news' }">
          <div class="cate-item">
            <div class="category-a" @click="jumpOperation('/news')">NEWS</div>
          </div>
        </li>
        <li class="P_parent" :class="{ open: currentRouteText === '/blog' }">
          <div class="cate-item">
            <div class="category-a" @click="jumpOperation('/blog')">BLOG</div>
          </div>
        </li>
      </ul>
      <el-divider border-style="solid"></el-divider>

      <ul class="nav-list">
        <li class="P_parent" :class="{ open: openLangApp }" @click="openLangApp = !openLangApp">
          <div class="cate-item">
            <div class="category-a">{{ currencyStore.currentCurrency }}</div>
            <div class="category-tig P_tig">
              <span><i class="iconfont icon-down"></i></span>
            </div>
          </div>
          <div class="category-cont P_slide">
            <div class="category-pad">
              <div
                class="pad-a"
                v-for="item in currencyStore.currencyList"
                :key="item.id"
                @click="currencyStore.setCurrentCurrency(item.code)"
              >
                {{ item.code }} - {{ item.name }}
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!--      <el-select v-model="currencyStore.currentCurrency" class="mt-15">-->
      <!--        <el-option-->
      <!--          v-for="item in currencyStore.currencyList"-->
      <!--          :key="item.code"-->
      <!--          :label="item.name"-->
      <!--          :value="item.code"-->
      <!--        />-->
      <!--      </el-select>-->
    </div>
  </header>
  <div :style="{ height: 50 + 'px' }" v-show="!appStore.isPc"/>

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
import {computed, onBeforeUnmount, onMounted, ref, unref} from 'vue'
import {useUserStore} from "~/stores/modules/user";
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import type {IHome} from "~/api/interface/home/home";
import {useAppStore} from "~/stores/modules/app";
import {BEST_URL, PRODUCT_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useCartStore} from "~/stores/modules/cart";
import {ARTIST_MENU_NAME, TECHNIQUE_OPTIONS} from "~/constant";
import {throttle} from "lodash-es";
import {useCustomStore} from "~/stores/modules/custom";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";

// ✅ 只在客户端挂载/清理监听
if (import.meta.client) {
  const {$bus} = useNuxtApp()
  onMounted(() => {
    handlePageScroll()
    handlePageSize()
    window.addEventListener('resize', handlePageSize)
    window.addEventListener('scroll', handlePageSize)
    window.addEventListener('scroll', handlePageScroll)

    currencyStore.getCurrency()
    // 隐藏购物车窗口
    $bus.on('closeCartWindow', () => {
      cartPopoverRef.value?.hide?.()
    })
    // 打开购物车窗口
    $bus.on('openCartWindow', () => {
      if (!cartPopoverRef.value?.visible) {
        cartButtonRef.value?.click()
      }
    })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handlePageScroll);
    window.removeEventListener('resize', handlePageSize)
    window.removeEventListener('scroll', handlePageSize)
    $bus.off('closeCartWindow')
    $bus.off('openCartWindow')
  })
}

const pcHeaderRef = ref()
const pcPlaceHeight = ref(218)
const handlePageSize = throttle(() => {
  if (pcHeaderRef.value && appStore.isPc) {
    pcPlaceHeight.value = pcHeaderRef.value.offsetHeight
  }
}, 300)

const jumpOperation = (path: string) => {
  openMenu.value = false
  router.push(path)
}

const modules = [Pagination]
const userStore = useUserStore()
const appStore = useAppStore()
const currencyStore = useCurrencyStore()
const cartStore = useCartStore()
const customStore = useCustomStore()
const router = useRouter()
const route = useRoute()
const openMenu = ref(false)
const openIndex = ref<null | number>(null);
const openLangApp = ref(false)
const toggleMenu = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

// 获取菜单数据
const { data: headerList } = await useAsyncData('header-menu', async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IHome.MenuRow[]>>(config.public.apiBase + TRADE_MODULE + '/home/menu')
  data.forEach(item => {
    if (item.config.type === 'BEST') {
      item.path = [`${BEST_URL}_${item.id}`]
    }
    if (item.config.type === 'LIST') {
      item.path = [`${PRODUCT_URL}_${item.id}`]
    }
    if (item.config.type === 'ARTIST') {
      item.path = [`${PRODUCT_URL}_${item.id}`, '/artists-brief', '/artists-all', '/artists-top']
    }
    if (item.config.type === 'CUSTOM') {
      item.path = ['/custom-paint']
    }
  })
  return data
})


// 页面滚动
const isScrollingPositive = ref(false);
const handlePageScroll = () => {
  isScrollingPositive.value = window.scrollY > 0
}

// 购物车弹窗
const cartButtonRef = ref()
const cartPopoverRef = ref()
const onClickOutside = () => {
  unref(cartPopoverRef).popperRef?.delayHide?.()
}

// 导航菜单索引
const activeNavIndex = ref<number | null>(null);
const isDropdownVisible = ref(false)
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const lockScrolling = () => {
  document.body.style.overflow = 'hidden'
}

const unlockScrolling = () => {
  document.body.style.overflow = ''
}

// 悬浮菜单显示下沉导航
const showDropdown = (index: number) => {
  // 如果没有子菜单则不显示下沉导航
  const hasChildren = headerList.value[index].children?.length
  if (hasChildren) {
    isDropdownVisible.value = true;
    lockScrolling()
  } else {
    isDropdownVisible.value = false;
    unlockScrolling()
  }
  activeNavIndex.value = index;
  clearTimeout(hideTimeout!);
  hideTimeout = null;
}

// 移除菜单隐藏下沉导航
const scheduleHideDropdown = () => {
  hideTimeout = setTimeout(() => {
    isDropdownVisible.value = false;
    activeNavIndex.value = null;
    unlockScrolling()
  }, 200);
}

// 进入下沉导航后继续显示
const cancelHideDropdown = () => {
  clearTimeout(hideTimeout!);
  hideTimeout = null;
}

// 隐藏下沉导航
const hideDropdown = () => {
  isDropdownVisible.value = false;
  activeNavIndex.value = null;
  unlockScrolling()
}

/**
 * 点击导航菜单（一级）
 * @param firstMenu - 当前的一级菜单
 * @param index
 */
const clickNavFirst = (firstMenu: IHome.MenuRow, index: number) => {
  // 如果没有子菜单可以点击，则跳转到对应页面
  const hasChildren = headerList.value[index].children?.length
  if (!hasChildren) {
    const params: any = {}
    router.push({
      path: firstMenu.config.type === 'BEST' ? BEST_URL : PRODUCT_URL,
      query: Object.assign({}, {menuId: firstMenu.id}, params)
    })
    openMenu.value = false
    hideDropdown()
  } else if (appStore.device === 'app' && firstMenu.name !== ARTIST_MENU_NAME) {
    toggleMenu(index)
  }
  if (firstMenu.name === ARTIST_MENU_NAME) {
    router.push('/artists-brief')
    openMenu.value = false
    hideDropdown()
  }
}

/**
 * 点击导航菜单（二级）
 * @param firstMenu - 当前一级菜单
 * @param secondMenu - 当前二级菜单
 */
const clickNavSecond = (firstMenu: IHome.MenuRow, secondMenu: IHome.MenuRow) => {
  // 跳转到自定义版画页面
  if (firstMenu.config.type === 'CUSTOM') {
    customStore.clearCache()
    router.push({
      path: '/custom-paint',
      query: {
        work: secondMenu.config.code
      }
    })
  }
  // 跳转到筛选页面
  else {
    // 点击二级默认选中第一个三级菜单
    clickNavThird(secondMenu.children[0], secondMenu.config.type, firstMenu)
  }

  if (appStore.device === 'app') {
    openMenu.value = false
  }

  hideDropdown()
}

/**
 * 点击导航菜单（三级）
 * @param thirdMenu - 当前三级菜单
 * @param subType - 上级菜单的类型
 * @param firstMenu - 当前一级菜单
 */
const clickNavThird = (thirdMenu: IHome.MenuRow, subType: Dict.CategoryType, firstMenu: IHome.MenuRow) => {
  const params: any = {}
  const cid = thirdMenu.config?.referenceId || thirdMenu.id // 优先取配置中的referenceId，没有再取id

  // 只有ARTIST和PRICE是对象，其他都是数组
  if (subType !== 'ARTIST' && subType !== 'PRICE' && subType !== 'MUTEX') {
    params[subType] = JSON.stringify([{parentId: thirdMenu.parentId, id: cid}])
  } else {
    params[subType] = JSON.stringify({parentId: thirdMenu.parentId, id: cid})
  }

  if (subType === 'MUTEX') {
    const val = thirdMenu.config.techniqueId ?? ''
    const cur = TECHNIQUE_OPTIONS.find(item => item.value === val)
    if (cur) params['TECHNIQUE'] = cur.value
  }

  hideDropdown()
  router.push({
    path: firstMenu.config.type === 'BEST' ? BEST_URL : PRODUCT_URL,
    query: Object.assign({}, {menuId: firstMenu.id}, params)
  })
}

// 当前下沉导航菜单（一级）
const currentDropdownMenu = computed(() => headerList.value[activeNavIndex.value!])

// 当前路由
const currentRouteText = computed(() => {
  let path = route.path
  if (route.query.menuId) {
    path += `_${route.query.menuId}`
  }
  return path
})

// 移动端点击购物车按钮
const handleCartApp = async () => {
  await cartStore.shoppingPreCheck()
  router.push('/cart')
  openMenu.value = false
}

// 打开购物车窗口进行商品状态以及库存预检查
const handleOpenCart = () => {
  cartStore.shoppingPreCheck()
}

</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  z-index: -1;
  inset: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px); /* 兼容移动端浏览器 */
  touch-action: none; /* 阻止触摸滚动穿透 */
  -webkit-overflow-scrolling: touch; /* 启用iOS弹性滚动 */
}

/*pc-导航*/
.header-pc {
  background: #ffffff;
  position: fixed;
  width: 100%;
  z-index: 120;
  top: 0;

  .header-wrapper {
    position: relative;
    padding-top: 40px;
    transition: all 0.3s ease;
    background: #fff;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .logo-wrapper {
        transition: all 0.3s ease;
        padding: 0 40px;
        flex-shrink: 0;

        .logo-img {
          width: 60px;
          height: 60px;
        }

        .logo-text {
          transition: all 0.3s ease;
          margin-left: 40px;
          height: 60px;
        }
      }

      .nav-wrapper {
        padding: 0 40px;
        transition: all 0.3s ease;

        .website {
          margin: 10px 0;

          .website-name {
            position: relative;
            font-size: 46px;
            font-weight: 900;
            letter-spacing: 12px;
            //transition: all 0.3s ease;

            //&::after {
            //  content: "";
            //  position: absolute;
            //  bottom: 0;
            //  left: 50%;
            //  transform: translateX(-50%);
            //  width: 0;
            //  height: 5px;
            //  background: var(--color-primary);
            //  transition: width 0.3s ease-in-out;
            //}
            //
            //&:hover::after {
            //  width: 100%;
            //}
          }
        }

        .nav-menu {
          position: relative;

          .nav-link {
            position: relative;
            display: inline-block;
            padding: 10px 0;
            transition: all 0.3s ease;

            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 5px;
              background: var(--color-primary);
              transition: width 0.3s ease-in-out;
            }

            &:hover::after,
            &.on::after {
              width: 100%;
            }
          }

          .nav-list {
            .nav-item {
              margin-right: 20px;

              .nav-link {
                font-size: 18px;
              }

              &.side {
                .nav-link {
                  font-style: italic;
                  font-weight: 300;
                  font-size: 16px;
                }
              }
            }

            .split {
              margin-right: 20px;
              width: 1px;
              height: 21px;
              background: var(--color-primary);
            }
          }
        }
      }
    }

    .operation-wrapper {
      position: absolute;
      right: 40px;
      top: 58px;
      transition: all 0.3s ease;

      .operation-list {

        .operation-item {
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;

          .iconfont {
            font-size: 18px;
          }

          .operation-text {
            margin-left: 10px;
          }

          &.currency {
            border: 1px solid var(--border-color);
            padding: 5px 10px;

            .iconfont {
              font-size: 14px;
            }

            .operation-text {
              margin-left: 0;
              margin-right: 10px;
            }

            .currency-list {
              position: absolute;
              top: 100%;
              right: 0;
              background: #fff;
              color: #000;
              min-width: 200px;
              padding: 15px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              display: none;

              li {
                white-space: nowrap;
                padding: 5px;
                transition: all 0.3s ease;

                &:hover {
                  background: #f5f4f4;
                }
              }
            }

            &:hover {
              background: var(--color-primary);
              border-color: var(--color-primary);
              color: #fff;

              .currency-list {
                display: block;
              }
            }
          }
        }

        .operation-item + .operation-item {
          margin-left: 20px;
        }
      }

      .icon-search {
        font-size: 40px;
        margin-top: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
    }

    .drop-wrapper {
      position: absolute;
      z-index: 99;
      top: 100%;
      right: 0;
      left: 0;
      min-height: 210px;
      padding: 20px 40px;
      background: #ffffff;

      .drop-menu {
        dl {
          font-size: 16px;

          dt {
            cursor: pointer;
            margin-bottom: 20px;
            font-weight: 500;

            .iconfont {
              font-size: 14px;
            }
          }

          dd {
            font-weight: 400;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }

          dd + dd {
            margin-top: 12px;
          }
        }
      }
    }
  }

  &.fold {
    border-bottom: var(--border-width-sm) solid var(--border-color);

    .header-wrapper {
      .left {
        flex-direction: row;

        .logo-wrapper .logo-text {
          display: none;
        }

        .nav-wrapper {
          padding: 0;

          .website {
            margin: 0;

            .website-name {
              font-size: 28px;
            }
          }
        }
      }

      .operation-wrapper {
        top: 40px;

        .operation-list .operation-item:not(.currency) {
          .operation-text {
            display: none;
          }
        }

        .icon-search {
          font-size: 30px;
          margin-top: 10px;
        }
      }
    }
  }
}

@media (max-width: 1680px) {
  .header-pc {
    .header-wrapper {
      padding-top: 35px;

      .left {
        .logo-wrapper {
          padding: 0 35px;

          .logo-text {
            margin-left: 35px;
          }
        }

        .nav-wrapper {
          padding: 0 35px;

          .website .website-name {
            font-size: 41px;
            letter-spacing: 10px;
          }

          .nav-menu {
            .nav-list .nav-item {
              .nav-link {
                font-size: 17px;
              }

              &.side {
                .nav-link {
                  font-size: 15px;
                }
              }
            }
          }
        }
      }

      .operation-wrapper {
        top: 53px;
        right: 35px;

        .icon-search {
          font-size: 35px;
          margin-top: 45px;
        }
      }
    }

    &.fold .header-wrapper .operation-wrapper {
      top: 25px;
    }
  }

  .pc-placeholder {
    height: 226.5px;

    &.fold {
      height: 122.5px;
    }
  }
}

@media (max-width: 1460px) {
  .header-pc {
    .header-wrapper {
      padding-top: 30px;

      .left {
        .logo-wrapper {
          padding: 0 30px;

          .logo-text {
            margin-left: 30px;
            font-size: 20px;
          }
        }

        .nav-wrapper {
          padding: 0 30px;

          .website .website-name {
            font-size: 37px;
          }

          .nav-menu {
            .nav-list .nav-item {
              .nav-link {
                font-size: 16px;
              }

              &.side {
                .nav-link {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }

      .operation-wrapper {
        top: 48px;
        right: 30px;

        .icon-search {
          font-size: 30px;
          margin-top: 40px;
        }
      }
    }
  }
  .pc-placeholder {
    height: 213.5px;

    &.fold {
      height: 116px;
    }
  }
}

@media (max-width: 1260px) {
  .header-pc {
    .header-wrapper {
      padding-top: 20px;

      .left {
        .logo-wrapper {
          padding: 0 20px;

          .logo-text {
            margin-left: 20px;
            font-size: 20px;
          }
        }

        .nav-wrapper {
          padding: 0 20px;

          .website .website-name {
            font-size: 37px;
          }

          .nav-menu {
            .nav-list .nav-item {
              .nav-link {
                font-size: 14px;
              }

              &.side {
                .nav-link {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }

      .operation-wrapper {
        top: 38px;
        right: 20px;
      }
    }

    &.fold .header-wrapper .operation-wrapper {
      top: 20px;
    }
  }

  .pc-placeholder {
    height: 200.5px;

    &.fold {
      height: 103px;
    }
  }
}

/*app-导航*/
.header-app {
  background: #ffffff;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 120;
  transition: background .44s .2s cubic-bezier(0.52, 0.16, 0.24, 1), height .56s cubic-bezier(0.52, 0.16, 0.24, 1);

  .navbar-app {
    position: relative;
    height: 50px;
    text-align: center;

    .logo {
      float: left;
      height: 50px;
      vertical-align: middle;
      padding: 10px 15px;

      img {
        height: 100%;
      }
    }

    .operating-area {
      float: right;
      height: 50px;
      padding: 13px 15px;

      .iconfont {
        font-size: 24px;
      }

      .iconfont:not(:first-child) {
        margin-left: 20px;
      }

    }

    .navbar-togger {
      background: transparent;
      border: none;
      display: inline-block;
      visibility: visible;
      transition: transform 0.44s 0.2s cubic-bezier(0.04, 0.04, 0.12, 0.96), opacity 0.28s 0.36s cubic-bezier(0.52, 0.16, 0.24, 1), -webkit-transform 0.44s 0.2s cubic-bezier(0.04, 0.04, 0.12, 0.96);

      .icon_bar {
        width: 20px;
        height: 2px;
        background-color: var(--color-primary);
        opacity: 1;
        transition: all .3s;

        &:nth-of-type(2) {
          margin: 5px 0;
        }
      }
    }

  }

  .nav-menu {
    position: absolute;
    top: 40px;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    z-index: 620;
    padding: 20px 15px;
    overflow-x: hidden;
    overflow-y: auto;
    visibility: hidden;
    transition: visibility 0s linear 1s;

    .nav-list li {
      //border-bottom: var(--border-width-sm) solid var(--border-color);
      opacity: 0;
      pointer-events: none;

      .cate-item {
        position: relative;

        .category-a {
          font-size: 16px;
          line-height: 48px;
          margin-right: 60px;
          display: block;
        }

        .category-tig {
          font-size: 14px;
          width: 50px;
          height: 48px;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          span {
            transition: transform 0.3s ease;
          }
        }
      }

      .category-cont {
        display: none;

        .category-pad {
          padding: 0 15px;
        }

        .pad-a {
          color: var(--color-primary);
          font-size: 14px;
          line-height: 40px;
          //border-bottom:var(--border-width-sm) solid var(--border-color);

          &.active {
            color: var(--color-secondary);
          }

          &:last-child {
            border: none;
          }
        }
      }

      &.open {
        border-bottom: none;

        .category-tig span {
          transform-origin: center;
          transform: rotate(180deg);
        }

        .category-cont {
          display: block;
          //border-top: var(--border-width-sm) solid var(--border-color);
          //border-bottom: var(--border-width-sm) solid var(--border-color);
        }
      }

      &:nth-child(1) {
        transform: translateY(-44px);
        transition: opacity .3345s cubic-bezier(0.52, 0.16, 0.52, 0.84) .15s, transform .4669s cubic-bezier(0.52, 0.16, 0.52, 0.84) .108s, -webkit-transform .4669s cubic-bezier(0.52, 0.16, 0.52, 0.84) .108s;
      }

      &:nth-child(2) {
        transform: translateY(-40px);
        transition: opacity .29294s cubic-bezier(0.52, 0.16, 0.52, 0.84) .13s, transform .45043s cubic-bezier(0.52, 0.16, 0.52, 0.84) .095s, -webkit-transform .45043s cubic-bezier(0.52, 0.16, 0.52, 0.84) .095s;
      }

      &:nth-child(3) {
        transform: translateY(-36px);
        transition: opacity .26098s cubic-bezier(0.52, 0.16, 0.52, 0.84) .11s, transform .43756s cubic-bezier(0.52, 0.16, 0.52, 0.84) .082s, -webkit-transform .43756s cubic-bezier(0.52, 0.16, 0.52, 0.84) .082s;
      }

      &:nth-child(4) {
        transform: translateY(-32px);
        transition: opacity .2386s cubic-bezier(0.52, 0.16, 0.52, 0.84) .09s, transform .42827s cubic-bezier(0.52, 0.16, 0.52, 0.84) .069s, -webkit-transform .42827s cubic-bezier(0.52, 0.16, 0.52, 0.84) .069s;
      }

      &:nth-child(5) {
        transform: translateY(-28px);
        transition: opacity .22581s cubic-bezier(0.52, 0.16, 0.52, 0.84) .07s, transform .42259s cubic-bezier(0.52, 0.16, 0.52, 0.84) .056s, -webkit-transform .42259s cubic-bezier(0.52, 0.16, 0.52, 0.84) .056s;
      }

      &:nth-child(6) {
        transform: translateY(-24px);
        transition: opacity .20343s cubic-bezier(0.52, 0.16, 0.52, 0.84) .05s, transform .41691s cubic-bezier(0.52, 0.16, 0.52, 0.84) .043s, -webkit-transform .41691s cubic-bezier(0.52, 0.16, 0.52, 0.84) .043s;
      }

      &:nth-child(7) {
        transform: translateY(-20px);
        transition: opacity .18105s cubic-bezier(0.52, 0.16, 0.52, 0.84) .03s, transform .41123s cubic-bezier(0.52, 0.16, 0.52, 0.84) .03s, -webkit-transform .41123s cubic-bezier(0.52, 0.16, 0.52, 0.84) .03s;
      }

      &:nth-child(8) {
        transform: translateY(-16px);
        transition: opacity .15867s cubic-bezier(0.52, 0.16, 0.52, 0.84) .01s, transform .40555s cubic-bezier(0.52, 0.16, 0.52, 0.84) .17s, -webkit-transform .40555s cubic-bezier(0.52, 0.16, 0.52, 0.84) .17s;
      }

      &.active .cate-item .category-a {
        color: var(--color-secondary);
      }

    }
  }

  &.open-menu {
    height: 100%;
    background: #ffffff;
    transition: background .36s cubic-bezier(0.32, 0.08, 0.24, 1), height .56s cubic-bezier(0.52, 0.16, 0.24, 1);

    .navbar-togger {
      .icon_bar:nth-of-type(2) {
        opacity: 0;
      }

      .icon_bar:first-child {
        transform: translate(0, 7px) rotate(45deg);
      }

      .icon_bar:last-child {
        transform: translate(0, -7px) rotate(-45deg);
      }
    }

    .nav-menu {
      visibility: visible;
      transition-delay: 0s;

      .nav-list li {
        opacity: 1;
        pointer-events: auto;
        transform: none;


        &:nth-child(1) {
          transition: opacity .3091s cubic-bezier(0.32, 0.08, 0.24, 1) .03s, transform .3455s cubic-bezier(0.32, 0.08, 0.24, 1) .02s, -webkit-transform .3455s cubic-bezier(0.32, 0.08, 0.24, 1) .02s;
        }

        &:nth-child(2) {
          transition: opacity .32244s cubic-bezier(0.32, 0.08, 0.24, 1) .05s, transform .35825s cubic-bezier(0.32, 0.08, 0.24, 1) .04s, -webkit-transform .35825s cubic-bezier(0.32, 0.08, 0.24, 1) .04s;
        }

        &:nth-child(3) {
          transition: opacity .33467s cubic-bezier(0.32, 0.08, 0.24, 1) .07s, transform .37539s cubic-bezier(0.32, 0.08, 0.24, 1) .06s, -webkit-transform .37539s cubic-bezier(0.32, 0.08, 0.24, 1) .06s;
        }

        &:nth-child(4) {
          transition: opacity .34577s cubic-bezier(0.32, 0.08, 0.24, 1) .09s, transform .39692s cubic-bezier(0.32, 0.08, 0.24, 1) .08s, -webkit-transform .39692s cubic-bezier(0.32, 0.08, 0.24, 1) .08s;
        }

        &:nth-child(5) {
          transition: opacity .35577s cubic-bezier(0.32, 0.08, 0.24, 1) .11s, transform .42286s cubic-bezier(0.32, 0.08, 0.24, 1) .1s, -webkit-transform .42286s cubic-bezier(0.32, 0.08, 0.24, 1) .1s;
        }

        &:nth-child(6) {
          transition: opacity .36577s cubic-bezier(0.32, 0.08, 0.24, 1) .13s, transform .41718s cubic-bezier(0.32, 0.08, 0.24, 1) .12s, -webkit-transform .41718s cubic-bezier(0.32, 0.08, 0.24, 1) .12s;
        }

        &:nth-child(7) {
          transition: opacity .37577s cubic-bezier(0.32, 0.08, 0.24, 1) .15s, transform .4115s cubic-bezier(0.32, 0.08, 0.24, 1) .14s, -webkit-transform .4115s cubic-bezier(0.32, 0.08, 0.24, 1) .14s;
        }

        &:nth-child(8) {
          transition: opacity .38577s cubic-bezier(0.32, 0.08, 0.24, 1) .17s, transform .40582s cubic-bezier(0.32, 0.08, 0.24, 1) .16s, -webkit-transform .42286s cubic-bezier(0.32, 0.08, 0.24, 1) .16s;
        }
      }

    }

  }
}

.swiper .slide {
  width: auto;
}
</style>