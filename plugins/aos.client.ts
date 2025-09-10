import AOS, { type AosOptions } from 'aos';
import 'aos/dist/aos.css';

const defaultOptions: AosOptions = {
    once: false,
    offset: 100,
    duration: 600,
    easing: 'ease-in-out',
};

export default defineNuxtPlugin((nuxtApp) => {
    if (!process.client) return;

    // 初始化（在下一个 tick，确保 DOM 已就绪）
    queueMicrotask(() => {
        AOS.init({ ...defaultOptions });
    });

    // 页面切换后刷新（防止过场或 keepalive 带来的异常）
    nuxtApp.hook('page:finish', () => {
        // AOS.refresh();
        AOS.refreshHard();
    });

    // 注册一个 v-aos 指令（支持对象或字符串）
    nuxtApp.vueApp.directive('aos', {
        mounted(el, binding) {
            const value = binding.value;
            if (typeof value === 'string') {
                el.setAttribute('data-aos', value);
            } else if (value && typeof value === 'object') {
                // const { name, delay, duration, offset, anchor } = value
                const { name, ...rest } = value as any;
                if (name) el.setAttribute('data-aos', name);
                Object.entries(rest).forEach(([k, v]) => {
                    if (v != null) el.setAttribute(`data-aos-${k}`, String(v));
                });
            }
        },
        unmounted() {
            // 不需要特别处理，AOS.refreshHard 会重新计算
        },
    });

    // 暴露工具函数，组件里可 useNuxtApp().$aosRefresh()
    return {
        provide: {
            aosRefresh: () => AOS.refresh(),
            aosRefreshHard: () => AOS.refreshHard(),
        },
    };
});
