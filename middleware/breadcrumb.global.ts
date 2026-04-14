import { useBreadcrumbStore } from '~/stores/modules/breadcrumb'

export default defineNuxtRouteMiddleware((to) => {
    const breadcrumbStore = useBreadcrumbStore()

    // 如果目标页面没有显式声明 showBreadcrumb: true，则默认清空面包屑
    if (!to.meta.showBreadcrumb) {
        breadcrumbStore.clearBreadcrumbs()
    }
})