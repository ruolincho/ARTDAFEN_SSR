import {GTM_ID} from "~/config";

export default defineNuxtPlugin((nuxtApp) => {
    // 只在生产环境生效
    if (import.meta.env.MODE !== 'production') {
        console.log('[gtm] 当前非生产环境：', import.meta.env.MODE)
        return
    }

    if (!process.client) return

    if (!GTM_ID) {
        console.warn('[gtm] GTM Measurement ID is not provided.')
        return;
    }

    // 插入 <head>：gtm.js
    // 1. 将此代码粘贴到网页的 <head> 中尽可能靠上的位置：
    const script = document.createElement('script')
    script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `
    document.head.appendChild(script)

    // 插入 <body> 最前面：noscript iframe
    // 2. 请将此代码粘帖到紧跟起始 <body> 标记之后的位置：
    const noscript = document.createElement('noscript')
    noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `
    document.body.prepend(noscript)

    // 推送 page_view 事件给 GTM dataLayer
    nuxtApp.hook('page:finish', () => {
        const route = useRoute()
        window.dataLayer?.push({
            event: 'page_view',
            page_path: route.fullPath,
            page_title: document.title
        })
    })

})
