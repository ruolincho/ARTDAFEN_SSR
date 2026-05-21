import {defineConfig, presetUno} from 'unocss'

// 动态生成 0-100 的间距映射 (让 mt-20 直接输出 20px)
const customSpacing: Record<string, string> = {}
for (let i = 0; i <= 100; i++) {
    customSpacing[i] = `${i}px`
}

// 字体响应式配置
const fontMap: Record<string, string[]> = {
    '12': ['10px', '10px', '11px', '11px', '12px', '12px'],
    '14': ['11px', '12px', '12px', '13px', '13px', '14px'],
    '16': ['12px', '13px', '14px', '14px', '15px', '16px'],
    '18': ['13px', '14px', '15px', '16px', '17px', '18px'],
    '20': ['14px', '15px', '16px', '18px', '19px', '20px'],
    '22': ['15px', '16px', '18px', '19px', '21px', '22px'],
    '24': ['16px', '18px', '19px', '21px', '22px', '24px'],
    '26': ['17px', '19px', '21px', '22px', '24px', '26px'],
    '28': ['18px', '20px', '22px', '24px', '26px', '28px'],
    '30': ['19px', '21px', '23px', '26px', '28px', '30px'],
    '40': ['21px', '25px', '29px', '32px', '36px', '40px'],
    '46': ['23px', '28px', '32px', '37px', '41px', '46px'],
    '50': ['25px', '30px', '35px', '40px', '45px', '50px'],
    '60': ['27px', '34px', '40px', '47px', '53px', '60px'],
}

// 注册响应式字体快捷方式
const textShortcuts: Record<string, string> = {}
for (const [key, sizes] of Object.entries(fontMap)) {
    textShortcuts[`text-${key}`] = `text-[${sizes[0]}] xs:text-[${sizes[1]}] sm:text-[${sizes[2]}] md:text-[${sizes[3]}] lg:text-[${sizes[4]}] xl:text-[${sizes[5]}]`
}

export default defineConfig({
    presets: [
        presetUno(), // 核心预设，提供原生的阴影、圆角等所有工具类
    ],
    theme: {
        breakpoints: {
            xs: '414px',
            sm: '768px',
            md: '992px',
            lg: '1260px',
            xl: '1460px',
            '2xl': '1680px',
        },
        spacing: customSpacing,
        colors: {
            primary: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',
            success: 'var(--color-success)',
            warning: 'var(--color-warning)',
            error: 'var(--color-error)',
            gray: {
                100: 'var(--color-gray-100)',
                200: 'var(--color-gray-200)',
                300: 'var(--color-gray-300)',
                400: 'var(--color-gray-400)',
                500: 'var(--color-gray-500)',
                600: 'var(--color-gray-600)',
                700: 'var(--color-gray-700)',
            },
        }
    },
    shortcuts: [
        ...Object.entries(textShortcuts),
        {
            'scroll-hide': 'scrollbar-none scrollbar:hidden', // 隐藏滚动条
            'img-hover': 'transition-transform duration-300 ease-in-out hover:scale-110', // 图片悬浮效果
            'text-hover': 'transition-colors duration-300 ease-in-out hover:text-secondary', // 文本悬浮效果
        }
    ],
    rules: [
        ['scrollbar-none', {
            'scrollbar-width': 'none',
            '-ms-overflow-style': 'none'
        }],
        [/^text-(\d+)$/, ([, d]) => ({'font-size': `${d}px`})],
    ],
    blocklist: ['container']
})