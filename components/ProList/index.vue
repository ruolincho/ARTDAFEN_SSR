<template>
  <div v-loading="loading" style="min-height: 30vh; position: relative">
    <template v-if="processTableData.length">
      <!-- 列表内容 -->
      <slot :rows="processTableData"/>
      <!-- 分页组件 -->
      <slot name="pagination">
        <div class="acea-row row-center-wrapper py-lg-40 py-20">
          <Pagination
              v-if="pagination"
              :pageable="pageable"
              :handle-size-change="handleSizeChange"
              :handle-current-change="handleCurrentChange"
          />
        </div>
      </slot>
    </template>
    <!-- 空数据 -->
    <div v-else-if="requestFinished" class="acea-row row-center-wrapper empty-wrapper">
      <slot name="empty">
        <div class="text-center py-60">
          <span class="iconfont icon-empty text-50"></span>
          <p class="text-20 f-bold mt-20">No Data</p>
          <p class="text-14 my-20">No data found, please check the query or try again later.</p>
          <el-button size="large" type="primary" @click="getTableList">TRY AGAIN</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import Pagination from './components/Pagination.vue'
import type {ProListProps} from "@/components/ProList/interface";
import {useList} from "~/composables/useList";

defineOptions({
  name: 'ProList'
})

// 初始化表格数据
onMounted(() => {
  props.requestAuto && getTableList();
  props.data && (pageable.value.total = props.data.length);
});

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProListProps>(), {
  requestAuto: true,
  pagination: true,
  scrollAuto: true,
  initParam: {},
});

// 表格操作 Hooks
const {
  tableData,
  pageable,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  loading,
  requestFinished
} = useList(
    props.requestApi,
    props.initParam,
    props.pagination,
    props.dataCallback,
    props.requestError,
    props.loadingTime,
    props.requestSuccess,
    props.scrollAuto,
    props.handleCurrentChange
);

// 处理表格数据
const processTableData = computed(() => {
  if (!props.data) return tableData.value;
  if (!props.pagination) return props.data;
  return props.data.slice(
      (pageable.value.pageNum - 1) * pageable.value.pageSize,
      pageable.value.pageSize * pageable.value.pageNum
  );
});

defineExpose({
  pageable,
  search,
  reset,
  requestFinished,
});

</script>

<style scoped lang="scss">
.empty-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>