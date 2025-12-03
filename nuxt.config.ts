// @ts-ignore
export default defineNuxtConfig({
    ssr: process.env.NUXT_PUBLIC_ENABLE_SSR === 'true',
    modules: ['@element-plus/nuxt', '@pinia/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/google-fonts'],
    runtimeConfig: {
        public: {
            siteName: process.env.NUXT_PUBLIC_SITE_NAME,
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            obsUrl: process.env.NUXT_PUBLIC_OBS_URL,
            paypalClientId: process.env.NUXT_PUBLIC_PAYPAL_CLIENT_ID,
            httpTimeout: process.env.NUXT_PUBLIC_HTTP_TIMEOUT,
        },
    },
    elementPlus: {
        // Critical: use SCSS so we can override variables at build-time
        importStyle: 'scss',
        // Keep useful global methods auto-installed
        installMethods: ['ElMessage', 'ElMessageBox', 'ElNotification', 'ElLoading'],
    },
    // Import our SCSS theme override entry BEFORE any component styles
    css: ['~/assets/styles/index.scss'], // We only introduce one version that we have compiled ourselves
    sitemap: {
        // @ts-ignore
        hostname: process.env.NUXT_PUBLIC_SITE_URL,
        exclude: ['/error', '/account/**', '/cart', '/checkout-custom', '/auth', '/login', '/register', '/checkout', '/search'],
        cacheTime: 0,  // 调试时关缓存，避免看到旧的 XML
        // 动态生成条目
        routes: () => {
            const newsTotalPages = 7
            const blogTotalPages = 2
            const urls = [
                { url: '/custom-paint/HPOP', priority: 0.8 },
                { url: '/custom-paint/40USD-M2', priority: 0.8 },
                { url: '/custom-paint/CTS', priority: 0.8 },
                { url: '/news', changefreq  : 'daily', priority: 0.8 },
                { url: '/blog', changefreq  : 'daily', priority: 0.8 },
            ]
            for (let p = 2; p <= newsTotalPages; p++) {
                urls.push({ url: `/news/${p}`, changefreq: 'daily', priority: 0.6 })
            }
            for (let p = 2; p <= blogTotalPages; p++) {
                urls.push({ url: `/blog/${p}`, changefreq: 'daily', priority: 0.6 })
            }
            return urls
        },
    },
    robots: {
        groups: [{ userAgent: '*', allow: '/', disallow: ['/error', '/account/**', '/cart', '/checkout-custom', '/auth', '/login', '/register'] }],
        sitemap: process.env.NUXT_PUBLIC_SITE_URL + '/sitemap.xml'
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            title: 'ART DAFEN',
            meta: [
                {
                    name: 'description',
                    content: 'Artdafen — the Dafen community\'s hub for the latest art news, gallery highlights, and creative resources. Explore pixel art showcases, installation art examples, and hands-on art & craft project ideas, plus curated drawing tutorials and inspiration from platforms like DeviantArt and ArtStation. Perfect for artists, students, and collectors seeking trends, techniques, and project-ready references.'
                },
                {
                    name: 'keywords',
                    content:
                        'ART DAFEN, ARTDAFEN art, artworks, contemporary art, gallery, sculpture, custom art, art workshops, Dafen, Dafen Oil Painting Village Shenzhen, oil painting' +
                        'Artdafen, deviantart, arte, gallery, pixel art, draw, installation art examples, art and craft project ideas, drawing, artstation, drawings'
                },
                {
                    name: 'p:domain_verify',
                    content: 'dc566406ce7fa6878cd0ea11514dbe49'

                },
                {property: 'og:type', content: 'website'},
                {property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL},
            ],
            link: [
                {rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico'}
            ]
        }
    },
    googleFonts: {
        families: {
            Roboto: [100, 300, 400, 500, 700, 900],
        },
        display: 'swap',  // 自动添加 font-display
        preconnect: true,
        preload: true,
        download: true,   // 建议开启，将字体下载到本地避免 CDN 限制
    },
    devServer: {
        host: '0.0.0.0',
        port: 5174,
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // @ts-ignore
                    api: 'modern-compiler',
                    additionalData: `@use '~/assets/styles/element/index.scss' as *;`,
                }
            }
        },
        esbuild: {
            drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
        }
    },
    nitro: {
        compatibilityDate: '2025-11-11',
    }
})