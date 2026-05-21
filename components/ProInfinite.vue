<template>
  <div v-loading="loading">
    <template v-if="!needGroup ? (tableData as any[]).length : (tableData as Map<any, any[]>).size">
      <!-- 列表内容 -->
      <slot :rows="tableData"/>
      <!-- 分页组件 -->
      <div ref="loadMoreRef">
        <slot name="pagination" v-if="!isObserver && !loaded">
          <div class="acea-row row-center-wrapper lg:py-40 py-20">
            <el-button  size="large" plain @click="startLoadMore">
              See More
              <SvgIcon name="down" />
            </el-button>
          </div>
        </slot>
      </div>
    </template>
    <!-- 空数据 -->
    <slot name="empty" v-else-if="requestFinished">
      <div class="text-center py-60">
        <SvgIcon name="empty" class="text-50" />
        <p class="text-20 font-bold mt-20">No Data</p>
        <p class="text-14 my-20">No data found, please check the query or try again later.</p>
        <el-button size="large" type="primary" @click="getTableList">TRY AGAIN</el-button>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type {ProInfiniteProps} from "~/components/interface";
import {useInfinite} from "~/composables/useInfinite";

defineOptions({
  name: 'ProInfinite'
})

// 初始化表格数据
onMounted(() => {
  props.requestAuto && getTableList();
});

onUnmounted(() => {
  stopObserver()
})

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProInfiniteProps>(), {
  requestAuto: true,
  needGroup: false,
  groupField: 'date',
  initParam: {},
});

const loadMoreRef = ref<HTMLElement | null>(null)
const isObserver = ref(false)

const startLoadMore = () => {
  getTableList();
  initObserver(loadMoreRef.value);
  isObserver.value = true;
}

// 表格操作 Hooks
const {
  tableData,
  pageable,
  getTableList,
  search,
  reset,
  initObserver,
  stopObserver,
  loading,
  loaded,
  clear,
  requestFinished
} = useInfinite(
  props.requestApi,
  props.initParam,
  props.needGroup,
  props.groupField,
  props.dataCallback,
  props.requestError,
  props.loadingTime,
  props.requestSuccess,
);

defineExpose({
  tableData,
  pageable,
  search,
  reset,
  clear,
});

</script>

<style scoped lang="scss">

</style>