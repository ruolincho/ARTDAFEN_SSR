import path from 'path';
// @ts-ignore
export default defineNuxtConfig({
    ssr: process.env.NUXT_PUBLIC_ENABLE_SSR === 'true',
    modules: ['@element-plus/nuxt', '@pinia/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/google-fonts', '@nuxt/image', '@vite-pwa/nuxt', '@nuxt/icon'],
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
    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL,
        name: process.env.NUXT_PUBLIC_SITE_NAME,
    },
    sitemap: {
        debug: process.env.NODE_ENV !== 'production',
        cacheMaxAgeSeconds: process.env.NODE_ENV === 'production' ? 3600 : 0,
        exclude: ['/error', '/account/**', '/cart', '/checkout-custom', '/auth', '/login', '/register', '/checkout', '/search'], // 排除不需要的路由
        defaults: {
            changefreq: 'daily',
            priority: 0.8,
        },
        urls: [
            '/custom-paint/HPOP',
            // '/custom-paint/40USD-M2',
            // '/custom-paint/CTS',
            '/magazine',
            '/journal'
        ], // 静态固定路径
        sources: [
            '/api/__sitemap__/sitemap-media-urls',
            '/api/__sitemap__/sitemap-zone-urls',
            '/api/__sitemap__/sitemap-common-urls',
        ],
    },
    robots: {
        groups: [{
            userAgent: '*',
            allow: '/',
            disallow: ['/error', '/cart', '/checkout', '/checkout-custom', '/login', '/register']
        }],
        sitemap: process.env.NUXT_PUBLIC_SITE_URL + '/sitemap.xml'
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            title: 'ARTDAFEN',
            meta: [
                {
                    name: 'description',
                    content: 'Artdafen — the Dafen community\'s hub for the latest art news, gallery highlights, and creative resources. Explore pixel art showcases, installation art examples, and hands-on art & craft project ideas, plus curated drawing tutorials and inspiration from platforms like DeviantArt and ArtStation. Perfect for artists, students, and collectors seeking trends, techniques, and project-ready references.'
                },
                {
                    name: 'keywords',
                    content:
                        'ARTDAFEN, ARTDAFEN art, artworks, contemporary art, gallery, sculpture, custom art, art workshops, Dafen, Dafen Oil Painting Village Shenzhen, oil painting' +
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
        prefetch: false, // 建议：如果是 download: true，通常不需要 prefetch/preconnect Google 的域名
        preconnect: true,
        preload: true,
        download: true,   // 建议开启，将字体下载到本地避免 CDN 限制
        base64: false,  // 建议 false，除非字体文件极小
        inject: true,   // 确保注入 CSS
        overwriting: true, // 允许覆盖现有规则
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
        },
        build: {
            cssCodeSplit: false,  // 所有组件的 CSS 将会被合并到 entry.css 中 , 设置为 false，禁止将 CSS 拆分成多个小文件
        }
    },
    nitro: {
        compatibilityDate: '2025-09-10', // 这是项目的创建日期
        output: {
            dir: path.join(__dirname, 'output')
        }
    },
    sourcemap: {
        server: true,
        client: false,
    },
    image: {
        provider: 'huaweiObs', // 默认使用
        providers: {
            huaweiObs: {
                name: 'huaweiObs', // provider 名称
                provider: '~/providers/huawei-obs.ts',
                options: {
                    baseURL: process.env.NUXT_PUBLIC_OBS_URL
                }
            }
        }
    },
    pwa: {
        // 开启 PWA
        registerType: 'prompt',
        manifest: {
            name: 'ARTDAFEN',
            short_name: 'ARTDAFEN',
            description: 'Artdafen — the Dafen community\'s hub for the latest art news, gallery highlights, and creative resources. Explore pixel art showcases, installation art examples, and hands-on art & craft project ideas, plus curated drawing tutorials and inspiration from platforms like DeviantArt and ArtStation. Perfect for artists, students, and collectors seeking trends, techniques, and project-ready references.',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone', // 这个属性让应用全屏显示，看起来像原生 App
            icons: [
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{js,css,html,png,svg,ico}']
        },
        // 开发环境也能测试 PWA
        devOptions: {
            enabled: true,
            type: 'module'
        }
    },
    icon: {
        // 自定义本地图标存放目录，默认就是 assets/icons
        customCollections: [
            {
                prefix: 'my-icon',
                dir: './assets/icons'
            }
        ],
        // 强制将你的 my-icon 集合打包进客户端
        clientBundle: {
            includeCustomCollections: true,
        },
        // 确保服务端运行时也能访问到这些图标数据
        serverBundle: {
            collections: ['my-icon']
        }
    },
})