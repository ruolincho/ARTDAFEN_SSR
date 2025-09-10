import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {ICustom} from "~/api/interface/custom/custom";
import type { AxiosRequestConfig } from 'axios';

/**
 * 确认订单
 * @param params
 */
export const confirmOrderApi = (params: ICustom.OfferQuery) => {
    return $http().post<ICustom.OfferRow>(TRADE_MODULE + `/custom/order/offer`, params)
}

/**
 * 预生成交易编号
 */
export const advanceOrderNoApi = () => {
    return $http().get<string>(TRADE_MODULE + `/custom/order/advance`)
}

/**
 * 上传订单原图
 * @param params
 * @param config
 */
export const uploadOrderOriginImgApi = (params: FormData, config?: AxiosRequestConfig<{}> | undefined) => {
    return $http().upload(TRADE_MODULE + `/custom/order/upload`, params, config)
}

/**
 * 创建订单
 * @param params
 * @param config
 */
export const createOrderApi = (params: FormData, config?: AxiosRequestConfig<{}> | undefined) => {
    return $http().upload<ICustom.CreateRow[]>(TRADE_MODULE + `/custom/order/create`, params, config)
}