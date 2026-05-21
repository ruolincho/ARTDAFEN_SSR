<template>
  <div class="orders-container">
    <div class="acea-row row-right mb-30">
      <el-button class="add-btn" type="primary" size="large">
        <SvgIcon name="add" class="mr-10" />
        Add New Card
      </el-button>
    </div>
    <div class="card-list">
      <div class="card-item acea-row row-middle pb-20 mb-20 border-b  " v-for="(item, index) in 5" :key="index">
        <div class="p-img">
          <img class="h-full w-full object-cover" :src="`https://picsum.photos/60/60?t=${index + 1}`" alt="">
        </div>
        <div class="flex-1 mx-20">
          <p class="text-18 font-bold">Master Card</p>
          <p class="text-16 mt-18">3456 7890 0987 6543</p>
        </div>
        <el-button class="operation-btn" size="large">Delete</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {resolvePageMeta} from "~/config/pageMeta";

defineOptions({
  name: 'Payments'
})

definePageMeta({
  auth: true
})

useHead(resolvePageMeta("/payments"));
</script>

<style scoped lang="scss">
.orders-container {

  .add-btn {
    width: 320px;
  }

  .operation-btn {
    width: 127px;
  }

  .card-list {
    .card-item {
      .p-img {
        width: 60px;
        height: 60px;
      }
    }
  }

}
</style>