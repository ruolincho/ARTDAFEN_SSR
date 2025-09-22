import { defineNuxtPlugin } from '#app'
import { nextTick } from 'vue'
import translate from 'i18n-jsautotranslate'

export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) return // 确保只在客户端执行

    // 挂到 window，方便调试
    // @ts-ignore
    window.translate = translate

    // 语言设置
    // translate.language.setDefaultTo('english');

    // 翻译通道
    translate.service.use('client.edge')

    // 启用整体翻译
    translate.whole.enableAll()

    // 隐藏语言选择器
    translate.selectLanguageTag.show = false;

    // 页面首次挂载
    nuxtApp.hook('app:mounted', async () => {
        await nextTick()
        translate.execute()

        setTimeout(() => {
            translate.execute() // 处理 placeholder 延迟渲染
        }, 500)

        translate.listener.start() // 开启 DOM 变化监听
    })

    // 页面切换完成时执行
    nuxtApp.hook('page:finish', async () => {
        await nextTick()
        translate.execute()
        setTimeout(() => {
            translate.execute()
        }, 500)
    })
})
