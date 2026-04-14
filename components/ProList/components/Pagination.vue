<template>
  <el-pagination
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :total="pageable.total"
    layout="prev, pager, next"
    size="large"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :pager-count="5"
  />
</template>

<script setup lang="ts">
import type {ProList} from "~/composables/interface";

interface PaginationProps {
  pageable: ProList.Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>