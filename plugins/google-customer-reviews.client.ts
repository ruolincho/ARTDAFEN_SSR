import { watchEffect } from 'vue'
import { useTranslateLang } from '~/composables/useTranslateLang'

export default defineNuxtPlugin(() => {

    // 只在生产环境生效
    if (import.meta.env.MODE !== 'production') {
        console.log('[google-customer-reviews] 当前非生产环境：', import.meta.env.MODE)
        return
    }

    if (process.server) return; // 确保只在客户端执行

    const { currentServiceId } = useTranslateLang()
    const MERCHANT_ID = 5643819474;

    // 移除旧脚本
    const removeExistingScript = () => {
        const oldScript = document.getElementById('merchantWidgetScript')
        if (oldScript) oldScript.remove()

        // 删除原有的 widget 容器和 iframe
        const wrapper = document.getElementById('google-merchantwidget-iframe-wrapper') // Google 官方默认 iframe 容器 ID
        if (wrapper && wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper)
        }

        // 删除全局对象，避免重复初始化
        if (window.merchantwidget) {
            try { delete window.merchantwidget } catch {}
        }
    }

    // 加载新脚本并初始化徽章
    const loadGoogleReviewScript = (region: string) => {
        removeExistingScript()

        const script = document.createElement('script')
        script.id = 'merchantWidgetScript'
        script.src = 'https://www.gstatic.com/shopping/merchant/merchantwidget.js'
        script.defer = true
        script.addEventListener('load', () => {
            const mw = window.merchantwidget;
            if (mw && typeof mw.start === 'function') {
                mw.start({
                    merchant_id: MERCHANT_ID, // 商家ID
                    position: 'BOTTOM_RIGHT', // 可选: TOP_RIGHT | BOTTOM_LEFT | TOP_LEFT
                    region: region              // 可选: zh-CN, en, fr 等语言区域
                });
            } else {
                console.warn('[google-customer-reviews] failed to load successfully');
            }
        });
        document.head.appendChild(script)
    }

    let timeoutId: any = null

    // 初始化 + 监听语言变化
    watchEffect(() => {
        if (!currentServiceId.value) return

        if (timeoutId) clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            loadGoogleReviewScript(currentServiceId.value)
            timeoutId = null
        }, 300) // 延迟触发

        console.log('[google-customer-reviews] reloading with region:', currentServiceId.value)
    })

});
