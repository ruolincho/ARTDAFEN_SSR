import {useGoogleAuth} from '~/composables/useGoogleAuth'
import {useUserStore} from "~/stores/modules/user";

export default defineNuxtPlugin((nuxtApp) => {

    if (!process.client) return

    // 如果已加载过则不重复加载
    if (document.getElementById('google-gis')) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.id = 'google-gis'
    document.head.appendChild(script)

    const {initOneTap} = useGoogleAuth()

    nuxtApp.hook('page:finish', () => {
        const {isLogin} = useUserStore();
        if(isLogin) return
        nextTick(() => initOneTap())
    })
})
