export default defineNuxtPlugin((nuxtApp) => {
    // 仅生产环境启用
    if (import.meta.env.MODE !== 'production') {
        console.log('[ga4] 当前非生产环境：', import.meta.env.MODE);
        return;
    }

    const config = useRuntimeConfig();
    const gaId = config.public.gaId;

    if (!process.client) return;
    if (!gaId) {
        console.warn('[ga4] GA4 Measurement ID is not provided.')
        return;
    }

    // 动态插入 GA4 脚本
    (function loadGtag() {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
        document.head.appendChild(script2);
    })();

    // 监听路由变更并上报
    nuxtApp.hook('page:finish', () => {
        const route = useRoute();
        // 容错：gtag 可能尚未注入
        if (typeof window.gtag === 'function') {
            window.gtag('config', gaId, {
                page_path: route.fullPath,
                page_title: (route.meta?.title as string) || (route.name as string) || document.title,
            });
        }
    });
});

// 可选：在组件里也能直接调用
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}
