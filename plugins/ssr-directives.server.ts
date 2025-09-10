export default defineNuxtPlugin((nuxtApp) => {
    // SSR 空指令桩：避免 server-renderer 读取 undefined.getSSRProps 崩溃
    nuxtApp.vueApp.directive('click-outside', {})
    nuxtApp.vueApp.directive('infinite-scroll', {})
    nuxtApp.vueApp.directive('aos', {})
    nuxtApp.vueApp.directive('lazy', {})
    nuxtApp.vueApp.directive('noClickWhenSelected', {})
    nuxtApp.vueApp.directive('clickOutside', {})
})