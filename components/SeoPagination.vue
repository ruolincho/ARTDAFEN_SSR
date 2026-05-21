<template>
  <!-- 真实 <a> 链接的分页导航，保证禁用 JS 时仍可翻页 -->
  <nav aria-label="Pagination" class="seo-pagination">
    <NuxtLink
        v-if="current > 1"
        :to="getLink(current - 1)"
        rel="prev"
        aria-label="Previous page"
        class="page-item prev"
    >
      <SvgIcon name="left" />
    </NuxtLink>
    <span class="page-item prev disabled" v-else aria-disabled="true">
      <SvgIcon name="left" />
    </span>

    <template v-for="(p, index) in visiblePages" :key="index">
      <span v-if="p === '...'" class="page-item separator">...</span>
      <NuxtLink
          v-else
          :to="getLink(p as number)"
          class="page-item"
          :class="{ 'active': p === current }"
          :aria-current="p === current ? 'page' : undefined"
      >
        {{ p }}
      </NuxtLink>
    </template>

    <NuxtLink
        v-if="current < totalPages"
        :to="getLink(current + 1)"
        rel="next"
        class="page-item next"
        aria-label="Next page"
    >
      <SvgIcon name="right" />
    </NuxtLink>
    <span class="page-item next disabled" v-else aria-hidden="true">
      <SvgIcon name="right" />
    </span>

    <!-- 无脚本兜底 -->
    <noscript>
      <p><a :href="getLink(current + 1)">Next page</a></p>
    </noscript>
  </nav>
</template>

<script setup lang="ts">
// 定义 Props
interface Props {
  // 当前页码
  current: number
  // 总页数
  totalPages: number
  // 基础路径, 例如 '/news'，生成链接会自动处理为 "/news" 和 "/news/2"
  basePath: string
  // 默认为 2，即显示: 1 ... [current-2] [current-1] current [current+1] [current+2] ... total
  range?: number
}

const props = withDefaults(defineProps<Props>(), {
  basePath: '/news',
  range: 2,
})

const getLink = (p: number) => {
  // 移除 basePath 末尾可能的斜杠
  const path = props.basePath.replace(/\/+$/, '')

  if (p <= 1) return path // 第一页返回， 如：/news
  return `${path}/${p}` // 其他页返回， 如：/news/2
}

// 智能计算显示的页码列表（包含分隔符）
const visiblePages = computed(() => {
  const {current, totalPages, range} = props
  const pages: (number | string)[] = []

  // 始终添加第一页
  pages.push(1)

  // 计算中间段的起止
  const start = Math.max(2, current - range)
  const end = Math.min(totalPages - 1, current + range)

  // 如果起止之间有断层，添加分隔符
  if (start > 2) {
    pages.push('...')
  }

  // 添加中间段页码
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // 如果中间段和最后一页有断层，添加分隔符
  if (end < totalPages - 1) {
    pages.push('...')
  }

  // 始终添加最后一页（如果总页数大于1）
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
})
</script>

<style scoped lang="scss">
  .seo-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;

    .page-item {
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

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
</style>