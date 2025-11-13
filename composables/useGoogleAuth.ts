import {ref} from 'vue'
import {useAuth} from "~/composables/useAuth";
import {useTranslateLang} from '~/composables/useTranslateLang'
import {FORGET_PASSWORD_URL, GOOGLE_CLIENT_ID, LOGIN_URL, REGISTER_URL} from "~/config";

export function useGoogleAuth() {
    const clientId = GOOGLE_CLIENT_ID
    const credential = ref<string | null>(null)
    const {loginFn} = useAuth()
    const {currentServiceId} = useTranslateLang()
    const route = useRoute()
    let timeoutId: any = null

    // 等待 Google SDK 加载完成
    const waitForGoogleSDK = () => {
        return new Promise<void>((resolve) => {
            if (window.google?.accounts?.id && currentServiceId.value) return resolve()
            const check = () => {
                timeoutId && clearTimeout(timeoutId)
                if (window.google?.accounts?.id) return resolve()
                timeoutId = setTimeout(check, 200)
            }
            check()
        })
    }

    /**
     * 登录响应处理
     * @param response Google 登录响应
     * @param needRedirect 是否需要跳转登录页
     * @param callback 登录成功回调
     */
    const handleCredentialResponse = (response: google.accounts.id.CredentialResponse, needRedirect: boolean, callback?: () => void) => {
        credential.value = response.credential
        console.log('Google 登录模式：', needRedirect ? '按钮登录' : 'One Tap')
        console.log('credential', response.credential)
        loginFn({
            channel: '3',
            captcha: response.credential, // 将 token 发送给后端验证登录
            component: needRedirect,
        })
        .then(() => {
            callback && callback()
        })
    }

    /**
     * 初始化 One Tap 登录
     */
    const initOneTap = async () => {
        if (typeof window === 'undefined') return

        await waitForGoogleSDK()

        const skipPages = [LOGIN_URL, REGISTER_URL, FORGET_PASSWORD_URL]
        if (skipPages.includes(route.path)) return

        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response) => handleCredentialResponse(response, true), // 不跳转
            auto_select: false, // 用户已登录时是否自动登录
            cancel_on_tap_outside: false, // 点击外部是否关闭弹窗
            context: 'signin'
        })

        window.google.accounts.id.prompt()
    }

    /**
     * 渲染登录按钮（登录页中调用）
     * @param elementId 挂载按钮的元素ID
     * @param isComponent 是否在组件中渲染（默认否）
     * @param closeDialog 关闭弹窗回调（登录组件中传递）
     */
    const renderButton = async (elementId: string, isComponent: boolean = false, closeDialog?: () => void) => {
        if (typeof window === 'undefined') return

        await waitForGoogleSDK()

        window.google.accounts.id.cancel()

        // 每次渲染按钮都重新初始化，绑定新的回调（避免闭包固定）
        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response) => handleCredentialResponse(response, isComponent, closeDialog), // 按钮登录，根据 isComponent 判断跳转
        })

        const el = document.getElementById(elementId)
        if (!el) return


        window.google.accounts.id.renderButton(el, {
                type: 'icon',
                theme: 'outline',
                size: 'large',
                shape: 'circle',
                locale: currentServiceId.value,
                logo_alignment: 'left',
            }
        )
    }

    return {initOneTap, credential, renderButton}
}
