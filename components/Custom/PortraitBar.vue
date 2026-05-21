<template>
  <div class="md:my-50 my-25 portrait-wrapper acea-row row-center-wrapper gap-column-md gap-row-sm">
    <img src="~/assets/images/logo-portrait.png" alt="logo-portrait">
    <h1 class="text-20 text-center" v-if="appStore.isPc">
      Your exclusive art customization service is now available. Discover timeless creations.
    </h1>
  </div>
</template>

<script setup lang="ts">
import {useAppStore} from "~/stores/modules/app";

const appStore = useAppStore()
</script>

<style scoped lang="scss">
  .portrait-wrapper {
    img {
      height: 60px;
    }
  }
</style>