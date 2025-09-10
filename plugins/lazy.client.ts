export default defineNuxtPlugin((nuxtApp) => {
    if (!process.client) return;

    nuxtApp.vueApp.directive('lazy', {
        mounted(el: HTMLImageElement, binding) {
            // 若已加载过或没有值，直接返回
            if (!binding.value) return;

            const observer = new IntersectionObserver(([entry]) => {
                if (entry.intersectionRatio > 0) {
                    el.src = binding.value;
                    observer.unobserve(el);
                }
            });
            observer.observe(el);
        },
    });
});
