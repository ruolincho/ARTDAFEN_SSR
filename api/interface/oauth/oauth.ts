export namespace IOauth {
    export interface CaptchaRow {
        imgStream: string
        uuid: string
        // ISO 8601 时间段
        duration: string
    }

    /*登录参数*/
    export interface LoginQuery {
        /*登录渠道*/
        channel: Dict.LoginChannel
        /*手机号*/
        username?: string
        /*验证码对应的uuid*/
        uuid?: string
        /*用户输入的验证码*/
        captcha?: string
        /*邀请码*/
        inviteCode?: string
        /*用户登录明文密码*/
        password?: string
        /*重定向地址*/
        redirectUri?: string
    }

    /*注册参数*/
    export interface RegisterQuery {
        /*邀请码*/
        inviteCode?: string
        /*用户登录明文密码，注册可以跳过*/
        password?: string
    }

    /*登录返回结果*/
    export interface LoginRow {
        /*登录访问令牌*/
        token: string
        /*业务编码*/
        uuid: string
    }

    /*重置密码参数*/
    export interface ResetPasswordQuery {
        /*授权渠道*/
        channel: Dict.ResetChannel
        /*密码*/
        password: string
    }

    /*发送验证码参数*/
    export interface SendCodeQuery {
        /*手机号, 不传用于已登录状态下发送验证码*/
        username?: string
        /*发送之前校验账号是否存在数据库*/
        ifExists?: boolean
    }

    /*校验验证码参数*/
    export interface VerifyCodeQuery {
        /*手机号, 不传用于已登录状态下发送验证码 */
        username?: string
        /*验证码*/
        captcha: string
    }
}
