import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IPay} from "~/api/interface/pay/pay";

/**
 * 支付接口
 * @param params
 * @returns {*}
 */
export const paymentApi = (params: IPay.Query) => {
    return $http().post<string>(TRADE_MODULE + `/pay/payment`, params)
}

/**
 * 支付回调
 * @returns {*}
 */
export const paymentCallbackApi = (params: IPay.CallbackQuery) => {
    return $http().post<IPay.CallbackRow>(TRADE_MODULE + `/pay/callback/paypal`, params)
}