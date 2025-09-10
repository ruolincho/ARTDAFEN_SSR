export default defineNuxtPlugin((nuxtApp) => {
    if (!process.client) return;

    nuxtApp.vueApp.directive('noClickWhenSelected', {
        mounted(el: HTMLElement, binding) {
            el.addEventListener('click', (event: MouseEvent) => {
                const selectedText = window.getSelection()?.toString().trim();
                if (selectedText) return; // 有选中文本时，不触发回调

                if (typeof binding.value === 'function') {
                    binding.value(event);
                }
            });
        },
    });
});
