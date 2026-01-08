<template>
  <ProductList />
</template>

<script setup lang="ts">
import ProductList from "~/components/Zone/ProductList.vue";

definePageMeta({
  scrollToTop: false // 再次确认禁用了默认滚动
})
</script>

<style scoped lang="scss">
</style>