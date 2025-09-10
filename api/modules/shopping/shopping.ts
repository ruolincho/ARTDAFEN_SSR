import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IShopping} from "~/api/interface/shopping/shopping";

/**
 * 确认订单
 * @param params
 * @returns {*}
 */
export const confirmOrderApi = (params: IShopping.OfferQuery) => {
    return $http().post<IShopping.OfferRow>(TRADE_MODULE + `/shopping/order/offer`, params)
}

/**
 * 创建订单
 * @param params
 * @returns {*}
 */
export const createOrderApi = (params: IShopping.CreateQuery) => {
    return $http().post<IShopping.CreateRow[]>(TRADE_MODULE + `/shopping/order/create`, params)
}

/**
 * 购买前置检测
 * @param params
 * @returns {*}
 */
export const shoppingPreCheckApi = (params:  IShopping.ShoppingCartsRow[]) => {
    return $http().post<any[]>(TRADE_MODULE + `/shopping/cart/check`, params)
}