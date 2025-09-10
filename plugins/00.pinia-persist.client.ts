import persistedState from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$pinia.use(persistedState)   // 只在客户端注册
})
