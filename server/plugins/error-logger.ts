export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('error', async (error, { event }) => {
        console.error('【SSR Error Captured】:', error)
        // 你可以在这里将错误发送到日志服务，如 Sentry, Logstash 等
        // console.log('Request Path:', event.path)
    })
})