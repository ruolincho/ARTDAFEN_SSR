import {useUserStore} from "~/stores/modules/user";

export default defineNuxtPlugin(() => {
    if (process.server) return; // 确保只在客户端执行

    // 插入 tawk.to 嵌入脚本
    (function() {
        // 保证 Tawk_API 可访问

        window.Tawk_API = window.Tawk_API || {}
        window.Tawk_LoadStart = new Date()

        // 如果已经加载过脚本，就不重复加载（防止多次触发）
        if (!document.getElementById('tawk-script')) {
            var s1 = document.createElement("script");
            s1.id = 'tawk-script';
            s1.async = true;
            s1.src = 'https://embed.tawk.to/68f9a9b103c0d7194f5d0e4d/1j87jtnt0';
            s1.charset = 'UTF-8';
            (s1 as any).setAttribute('crossorigin','*');
            var s0 = document.getElementsByTagName("script")[0];
            if (s0 && s0.parentNode) {
                s0.parentNode.insertBefore(s1, s0);
            } else {
                document.head.appendChild(s1);
            }
        }

        window.Tawk_API.onLoad = async function () {
            const userStore = useUserStore()
            const userInfo = userStore.userInfo
            const userId = userInfo?.id || ''
            const chatHash = userInfo?.chatHash || ''

            // 如果没有用户信息，就不走登录逻辑，防止游客重复处理
            if (!userId || !chatHash) return

            // ✅ 防止重复登录：检查是否已经调用过 login
            if (window.__tawk_logged_in__) return

            const hash = base64ToHex(chatHash) // 解码为16进制

            window.Tawk_API.login({ userId, hash }, function(error: any) {
                if (!error) {
                    window.__tawk_logged_in__ = true // ✅ 标识已登录
                    console.log('Tawk login success')
                } else {
                    console.error('tawk.to login error:', error)
                }
            });
        }
    })();
});


