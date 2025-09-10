<template>
  <el-config-provider :locale="en">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <el-backtop :right="backtopPosition" :bottom="backtopPosition" />
  </el-config-provider>
</template>

<script setup lang="ts">
import en from 'element-plus/es/locale/lang/en';
import {useAppStore} from "~/stores/modules/app";
import {useUserStore} from "~/stores/modules/user";

const appStore = useAppStore();
const userStore = useUserStore();
const backtopPosition = computed(() => appStore.isPc? 50 : 25)

onMounted(() => {
  userStore.checkTokenStatus()
})
</script>

<style>
</style>
