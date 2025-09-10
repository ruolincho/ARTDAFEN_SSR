import { useUserStore } from '~/stores/modules/user'
import { getCookie } from 'h3'
import { HOME_URL, LOGIN_URL, REGISTER_URL, STORAGE_BACK_URL } from '~/config'

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore()

    // 1) SSR：从 Cookie 恢复 token，防止刷新误判未登录
    if (import.meta.server) {
        const token = getCookie(useRequestEvent()!, 'auth_token') // 确保登录时也写了同名 Cookie
        if (token && !userStore.token) userStore.setToken(token)
    }

    // 统一小写对齐，避免大小写造成的比较误差
    const path = to.path.toLowerCase()
    const loginPath = LOGIN_URL.toLowerCase()
    const registerPath = REGISTER_URL.toLowerCase()
    const homePath = HOME_URL.toLowerCase()

    // 2) 已登录：禁止访问 /login、/register
    if (userStore.isLogin && (path === loginPath || path === registerPath)) {
        // 避免自跳转：只有在目标不是 HOME 时才跳
        if (path !== homePath) return navigateTo(HOME_URL, { replace: true })
        return
    }

    // 3) 需要登录的页面（靠 meta.auth=true 标记）
    const needAuth = to.meta?.auth === true
    if (needAuth && !userStore.isLogin) {
        // 仅在客户端记录回跳地址（SSR 无 localStorage）
        if (import.meta.client) localStorage.setItem(STORAGE_BACK_URL, to.fullPath)
        // 避免 /login -> /login 自重定向
        if (path !== loginPath) {
            return navigateTo(LOGIN_URL, { redirectCode: 302 })
        }
        return
    }
})
