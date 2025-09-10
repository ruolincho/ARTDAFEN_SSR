import { $http } from '~/api/http'
import {USER_MODULE, TRADE_MODULE} from "~/api/helper/prefix";
import type {IMine} from "~/api/interface/mine/mine";
import type {IPage, IPageQuery} from "~/api/interface";
import type {AxiosRequestConfig} from "axios";

/**
 * 获取用户基本信息
 * @param i
 */
export const getUserBaseInfoApi = (i?: string) => {
    return $http().get<IMine.UserInfoRow>(USER_MODULE + `/mine/info`)
}

/**
 * 获取用户基本信息（回显）
 */
export const getUserEchoInfoApi = () => {
    return $http().get<IMine.UserInfoRow>(USER_MODULE + `/mine/echo`)
}

/**
 * 编辑用户个人资料
 * @param params
 */
export const modifyInfoApi = (params: IMine.ModifyQuery) => {
    return $http().post(USER_MODULE + `/mine/edit`, params)
}

/**
 * 获取用户收藏的商品
 * @param params
 */
export const getUserCollectGoodsApi = (params: IPageQuery) => {
    return $http().post<IPage<General.GoodsItem>>(TRADE_MODULE + `/mine/collect/product`, params)
}

/**
 * 头像上传
 * @param params
 * @param config
 */
export const uploadAvatar = (params: FormData, config?: AxiosRequestConfig<{}> | undefined) => {
    return $http().upload(USER_MODULE + `/mine/avatar`, params, config)
}
