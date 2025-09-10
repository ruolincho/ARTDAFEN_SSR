import { $http } from '~/api/http'
import {USER_MODULE} from "~/api/helper/prefix";
import type {IOauth} from "~/api/interface/oauth/oauth";

/**
 * 获取图形验证码
 * @returns {*}
 */
export const getCaptchaImageApi = () => {
    return $http().get<IOauth.CaptchaRow>(USER_MODULE + `/oauth/captcha`)
}

/**
 * 登录
 * @param params
 */
export const loginApi = (params: IOauth.LoginQuery) => {
    return $http().post<IOauth.LoginRow>(USER_MODULE + `/oauth/login`, params)
}

/**
 * 用户注册
 * @param params
 * @param authToken
 */
export const registerApi = (params: IOauth.RegisterQuery, authToken: string) => {
    return $http().post<IOauth.LoginRow>(USER_MODULE + `/oauth/register`, params, {headers: {'AuthToken': authToken}})
}

/**
 * 忘记/重置密码
 * @param params
 * @param authToken
 */
export const resetPasswordApi = (params: IOauth.ResetPasswordQuery, authToken: string) => {
    return $http().post(USER_MODULE + `/oauth/rest`, params, {headers: {'AuthToken': authToken}})
}

/**
 * 获取RAS加密公钥
 */
export const getPublicKeyApi = () => {
    return $http().get<string>(USER_MODULE + `/oauth/key`)
}

/**
 * 发送验证码
 */
export const sendCodeApi = (params: IOauth.SendCodeQuery) => {
    return $http().post(USER_MODULE + `/oauth/send`, params)
}

/**
 * 校验验证码
 */
export const verifyCodeApi = (params: IOauth.VerifyCodeQuery) => {
    return $http().post<string>(USER_MODULE + `/oauth/verify/captcha`, params)
}

/**
 * 退出登录
 */
export const logoutApi = () => {
    return $http().post(USER_MODULE + `/oauth/logout`)
}

/**
 * 图片装换为base64
 */
export const imgToBaseApi = (key: string) => {
    return $http().get<string>(USER_MODULE + `/oauth/lookup` ,{ key })
}

/**
 * 检查Token是否过期
 */
export const checkToken = () => {
    return $http().get<boolean>(USER_MODULE + `/oauth/check`)
}
