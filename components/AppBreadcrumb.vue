<template>
  <nav aria-label="Breadcrumb" class="breadcrumb-container" v-if="breadcrumbs.length > 0">
    <ol class="breadcrumb-list">

      <li class="breadcrumb-item">
        <NuxtLink to="/" class="breadcrumb-link">Home</NuxtLink>
        <span class="separator">/</span>
      </li>

      <li
          v-for="(item, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item"
      >
        <NuxtLink
            v-if="item.path && index !== breadcrumbs.length - 1"
            :to="item.path"
            class="breadcrumb-link"
        >
          {{ item.name }}
        </NuxtLink>

        <span v-else class="breadcrumb-current" aria-current="page">
          {{ item.name }}
        </span>

        <span v-if="index !== breadcrumbs.length - 1" class="separator">/</span>
      </li>

    </ol>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBreadcrumbStore } from '~/stores/modules/breadcrumb'

const breadcrumbStore = useBreadcrumbStore()
// 使用 storeToRefs 保持响应式
const { breadcrumbs } = storeToRefs(breadcrumbStore)
</script>

<style scoped>
  .breadcrumb-container {
    /* 基础容器样式，可以根据你的版心调整 margin 和 max-width */
    width: 100%;
    margin: 0 auto;
    padding: 20px 32px; /* 和你的 Header 保持相同的左右边距 */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .breadcrumb-list {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
    font-size: 13px; /* 小巧精致的字号 */
  }

  /* 可以点击的父级链接 */
  .breadcrumb-link {
    color: #666; /* 浅灰色 */
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .breadcrumb-link:hover {
    color: #000;
    text-decoration: underline;
  }

  /* 当前所在的最后一级页面 */
  .breadcrumb-current {
    color: #000; /* 黑色，突出当前位置 */
    font-weight: 600; /* 半加粗 */
  }

  /* 分隔符 */
  .separator {
    color: #ccc;
    margin: 0 10px; /* 舒适的呼吸感间距 */
    font-size: 12px;
  }

  @media (max-width: 991px) {
    .breadcrumb-container {
      padding: 15px; /* 缩减左右安全边距 */
    }
  }

</style>