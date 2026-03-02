<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <div class="m-md-20 m-15">
        <el-skeleton-item variant="h1" style="width: 100%;"/>
      </div>
      <div class="m-md-20 m-15">
        <el-skeleton-item variant="p" style="width: 100%; height: 45px"/>
      </div>
      <div class="m-md-20 m-15">
        <el-skeleton-item variant="h1" style="width: 100%;"/>
      </div>
      <div class="m-md-20 m-15 row">
        <div class="col-3" v-for="item in 4" :key="item">
          <el-skeleton-item
              variant="image"
              :style="{width: '100%', height: appStore.isPc ? '5vw' : '15vw'}"
          />
          <div class="py-5">
            <el-skeleton-item variant="h1"/>
            <el-skeleton-item variant="p" class="mt-5" style="width: 50%"/>
          </div>
        </div>
      </div>
      <div class="m-md-20 m-15">
        <el-skeleton-item variant="p" style="width: 100%;"/>
        <el-skeleton-item variant="p" style="width: 100%;"/>
        <el-skeleton-item variant="p" style="width: 100%;"/>
      </div>
      <div class="acea-row row-right m-md-20 m-15">
        <el-skeleton-item variant="p" style="width: 30%;"/>
      </div>
      <div class="m-md-20 m-15">
        <el-skeleton-item variant="p" style="width: 100%;"/>
        <el-skeleton-item variant="p" style="width: 100%;"/>
      </div>
      <div class="m-md-20 m-15">
        <el-skeleton-item variant="button" style="width: 100%; height: 40px;"/>
      </div>
    </template>
    <slot />
  </el-skeleton>
</template>

<script setup lang="ts">
import {useAppStore} from "~/stores/modules/app";

interface Props {
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const appStore = useAppStore()
</script>

<style scoped lang="scss">

</style>