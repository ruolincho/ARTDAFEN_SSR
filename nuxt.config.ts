export default defineNuxtConfig({
    ssr: true,
    modules: ['@element-plus/nuxt', '@pinia/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots'],
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            obsUrl: process.env.NUXT_PUBLIC_OBS_URL,
            paypalClientId: process.env.NUXT_PUBLIC_PAYPAL_CLIENT_ID,
            httpTimeout: process.env.NUXT_PUBLIC_HTTP_TIMEOUT,
            gaId: process.env.NUXT_PUBLIC_GA_ID
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
        hostname: process.env.NUXT_PUBLIC_SITE_URL,
        exclude: ['/error', '/account/**', '/cart', '/checkout-custom', '/auth', '/login', '/register'],
        cacheTime: 0,  // 调试时关缓存，避免看到旧的 XML
        // 动态生成条目
        routes: () => {
            const totalPages = 7
            const urls = [
                { url: '/news', changefreq  : 'daily', priority: 0.8 }
            ]
            for (let p = 2; p <= totalPages; p++) {
                urls.push({ url: `/news?page=${p}`, changefreq: 'daily', priority: 0.6 })
            }
            return urls
        },
    },
    robots: {
        groups: [{ userAgent: '*', allow: '/' }],
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
                {property: 'og:type', content: 'website'},
                {property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL},
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.font.im/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i'
                },
                {rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico'}
            ]
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 5174,
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    additionalData: `@use '~/assets/styles/element/index.scss' as *;`,
                }
            }
        }
    },
    nitro: {
        compatibilityDate: '2025-09-08'
    }
})