<template>
  <VitePwaManifest />
  <el-config-provider :locale="currentElementPlusLocale">
    <PwaUpdateBanner />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </el-config-provider>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useUserStore} from "~/stores/modules/user";
import {useTranslateLang} from '~/composables/useTranslateLang'

const {currentElementPlusLocale} = useTranslateLang();
const {checkTokenStatus} = useUserStore();

onMounted(() => {
  checkTokenStatus()
})
</script>

<style>
</style>
