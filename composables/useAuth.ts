import type {IOauth} from "~/api/interface/oauth/oauth";
import {
    loginApi,
    logoutApi,
    registerApi,
    resetPasswordApi,
    sendCodeApi,
    verifyCodeApi
} from "~/api/modules/oauth/oauth";
import {HOME_URL, STORAGE_BACK_URL} from "~/config";
import {ElMessage} from "element-plus";
import {useCustomStore} from "~/stores/modules/custom";
import {useUserStore} from "~/stores/modules/user";

export const useAuth = () => {
    const { $encrypt, $bus } = useNuxtApp()

    const userStore = useUserStore()
    const customStore = useCustomStore()

    // 用户登录
    const loginFn = async (params: IOauth.LoginQuery & { component?: boolean }) => {
        params.inviteCode = ''
        if (params.password) {
            params.password = await $encrypt.encrypt(params.password!)
        }
        return new Promise<IOauth.LoginRow>((resolve, reject) => {
            loginApi(params)
                .then(({data}) => {
                    if (data.uuid) {
                        reject({ ...data, message: 'Please verify email address' })
                    } else {
                        successFn(data, 'login', params.component)
                        resolve(data)
                    }
                })
                .catch((err) => reject(err))
        })
    }

    // 用户注册
    const registerFn = async (params: IOauth.RegisterQuery, authToken: string) => {
        params.password = await $encrypt.encrypt(params.password!)
        return new Promise<IOauth.LoginRow>((resolve, reject) => {
            registerApi(params, authToken)
                .then(({data}) => {
                    successFn(data, 'register')
                    resolve(data)
                })
                .catch((err) => reject(err))
        })
    }

    // 登录成功和注册成功回调
    const successFn = async (res: IOauth.LoginRow, type: 'login' | 'register', component?: boolean) => {
        userStore.setToken(res.token)
        await userStore.getUserInfo()
        const router = useRouter()
        const backUrl = window.localStorage.getItem(STORAGE_BACK_URL) || HOME_URL
        !component && router.replace(backUrl)
        $bus.emit('loginSuccess')
        ElMessage.success(type === 'login' ? 'Login succeeded' : 'Registered succeeded')
    }

    // 重置密码
    const resetPasswordFn = async (params: IOauth.ResetPasswordQuery, authToken: string) => {
        params.password = await $encrypt.encrypt(params.password)
        return new Promise((resolve, reject) => {
            resetPasswordApi(params, authToken)
                .then(() => {
                    resolve('Reset password success!')
                })
                .catch((err) => reject(err))
        })
    }

    // 用户退出
    const logoutFn = async () => {
        return new Promise((resolve, reject) => {
            logoutApi()
                .then(() => {
                    resolve('logout success')
                    userStore.clear()
                    customStore.clearCache()

                })
                .catch((err) => reject(err))
        })

    }

    // 发送验证码
    const sendCodeFn = (params: IOauth.SendCodeQuery) => {
        return new Promise((resolve, reject) => {
            sendCodeApi(params)
                .then(res => {
                    if (res.status == 200) {
                        ElMessage.success('Verification code sent successfully, please check your email.')
                        resolve('Verification code sent successfully, please check your email.')
                    } else {
                        reject('Verification code sending failed, please try again later.')
                    }
                })
                .catch((err) => reject(err))

        })
    }

    // 校验验证码
    const verifyCodeFn = (params: IOauth.VerifyCodeQuery) => {
        return new Promise<string>((resolve, reject) => {
            verifyCodeApi(params)
                .then(res => {
                    if (res.status == 200) {
                        ElMessage.success('Verification code verified successfully.')
                        resolve(res.data)
                    } else {
                        reject('Verification code error, please try again later.')
                    }
                })
                .catch((err) => reject(err))

        })
    }

    return {
        loginFn,
        registerFn,
        logoutFn,
        resetPasswordFn,
        sendCodeFn,
        verifyCodeFn,
    }

}