import { getUrlQuery } from '~/utils'

export class AuthGoogle {
    /**
     * 自动去授权
     */
    oAuth() {
        const { code } = getUrlQuery()
        if (!code) {
            return this.toAuth()
        }
    }

    /**
     * 跳转自动登陆
     */
    toAuth() {
        window.location.replace(this.getAuthUrl())
    }

    /**
     * 获取微信授权地址
     */
    getAuthUrl() {
        const redirect_uri = `https://artdafen.com/get-google-code.html`
        const scope = 'email profile'
        const client_id = '455586942399-nu9h43lv56jprqmq4sqeffr72n9d5u8a.apps.googleusercontent.com' // 应用的客户端ID
        const access_type = 'offline'
        const response_type = 'code'
        const project_url = `${encodeURIComponent(location.origin + '/auth')}`
        // 这里的跳转微信授权页面写在了服务器上的get-google-code.html中
        return `https://accounts.google.com/o/oauth2/auth?response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&client_id=${client_id}&access_type=${access_type}&state=${project_url}`
    }
}

export default defineNuxtPlugin(() => {
    const ga = new AuthGoogle()

    return {
        provide: {
            google: ga,
        }
    }
})