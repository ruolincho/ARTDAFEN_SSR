<template>
  <!--pc-导航-->
  <AppPcHeader :menuData="headerList" :headerHeight="pcPlaceHeight" :currentId="highlightMenuId" />

  <!--app-导航-->
  <AppMobileHeader :menuData="headerList" :headerHeight="appPlaceHeight" :currentId="highlightMenuId" />

  <div id="header-placeholder"
       :style="{ height: appStore.headerState.height + 'px', transition: `height ${appStore.headerState.duration}ms ease` }"/>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import type {IHome} from "~/api/interface/home/home";
import {useAppStore} from "~/stores/modules/app";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import AppPcHeader from './AppPcHeader.vue'
import AppMobileHeader from './AppMobileHeader.vue'
import {COLLECTIONS_URL} from "~/config";

// ✅ 只在客户端挂载/清理监听
if (import.meta.client) {
  const {$bus} = useNuxtApp()
  onMounted(() => {
    getCurrency()
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
}

// 递归处理函数
const processMenuData = (menuList: IHome.MenuRow[]) => {
  menuList.forEach(item => {
    let url = '';
    let isExternal = false;
    let isPureLink = false;

    // 如果有子集，说明当前项不可直接跳转，递归处理它的子集
    if (item.children && item.children.length > 0) {
      processMenuData(item.children);
    } else {
      // 没有子集，说明是纯跳转链接（叶子节点）
      isPureLink = true;
      if (item.config?.url) {
        url = item.config.url;
        isExternal = url.indexOf('http') !== -1;
      } else {
        const q = packQuery({ MENU_ID: item.id, PAGE: 1 });
        url = `${COLLECTIONS_URL}/${formatHandle(item.name)}?q=${q}`;
      }
    }

    // 将计算结果直接挂载到 item 上
    item.linkProps = {
      to: url,
      target: isExternal ? '_blank' : '_self',
      isPureLink: isPureLink
    };
  });

  return menuList;
};

const appStore = useAppStore()
const {getCurrency} = useCurrencyStore();
const route = useRoute()

// 获取菜单数据
const {data: headerList} = await useAsyncData('header-menu', async () => {
  const config = useRuntimeConfig()
  const {data = []} = await $fetch<IResultData<IHome.MenuRow[]>>(config.public.apiBase + TRADE_MODULE + '/home/menu')
  // 在存储和返回之前，对数据进行一次性的树状递归清洗
  const processedData = processMenuData(data)
  appStore.setMenuList(processedData)
  return processedData
})

/**
 * 精准匹配校验函数
 */
const isMatch = (menuPath: string, cleanCurrentPath: string): boolean => {
  if (!menuPath) return false
  let normalizedPath = menuPath.toLowerCase()
  if (normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1)
  }
  return cleanCurrentPath === normalizedPath || cleanCurrentPath.startsWith(`${normalizedPath}/`)
}

/**
 * 递归校验函数：判断某个节点或其子节点是否命中
 */
const checkNode = (node: any, targetMenuId: string | null, cleanCurrentPath: string): boolean => {
  // 规则 A：MENU_ID 精准命中
  if (targetMenuId && node.id === targetMenuId) {
    return true
  }

  // 规则 B：静态路由 (path) 或 附加页面 (url) 命中
  const targetPathArray = node.path || node.config?.path
  const isPathMatch = (targetPathArray && Array.isArray(targetPathArray))
      ? targetPathArray.some((p: string) => isMatch(p, cleanCurrentPath))
      : false

  const isUrlMatch = node.config?.url ? isMatch(node.config.url, cleanCurrentPath) : false

  if (isPathMatch || isUrlMatch) {
    return true
  }

  // 规则 C：递归检查所有子集
  if (node.children && node.children.length > 0) {
    return node.children.some((child: any) => checkNode(child, targetMenuId, cleanCurrentPath))
  }

  return false
}

// 当前匹配到的顶级菜单ID
const highlightMenuId = computed(() => {
  const currentPath = route.path || ''
  const cleanCurrentPath = currentPath.split('?')[0]!.split('#')[0]!.toLowerCase()

  // 提取当前 URL 中的 MENU_ID
  let targetMenuId: string | null = null
  if (route.query.q) {
    try {
      const params = unpackQuery(route.query.q as string)
      if (params.MENU_ID) targetMenuId = params.MENU_ID
    } catch (e) {
      console.warn('解析 q 参数高亮失败', e)
    }
  }

  // 遍历顶级菜单
  if (headerList.value && Array.isArray(headerList.value)) {
    for (const topItem of headerList.value) {
      // 调用外部的纯函数
      if (checkNode(topItem, targetMenuId, cleanCurrentPath)) {
        return topItem.id
      }
    }
  }

  return null
})

const pcPlaceHeight = ref(80) // pc 头部理论高度
const appPlaceHeight = ref(50) // app 头部理论高度
const currentPlaceHeight = ref(0) // 用于存储当前实际应用的高度
// 定义处理窗口尺寸变化的函数
const handleResize = () => {
  if (window.innerWidth < 991) {
    currentPlaceHeight.value = appPlaceHeight.value
  } else {
    currentPlaceHeight.value = pcPlaceHeight.value
  }
  appStore.setHeaderHeight(currentPlaceHeight.value)
}
</script>

<style scoped>
</style>