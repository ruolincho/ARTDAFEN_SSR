import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IPhysical} from "~/api/interface/physical/physical";
import type {IPage} from "~/api/interface";
import type {RouteParamValue} from "vue-router";

/**
 * 产品列表
 * @param params
 * @returns {*}
 */
export const getOrderListApi = (params: IPhysical.OrderQuery) => {
    return $http().post<IPage<IPhysical.OrderListRow>>(TRADE_MODULE + `/physical/order/manager`, params)
}

/**
 * 订单详情
 * @param tradeNo
 * @returns {*}
 */
export const getOrderDetailApi = (tradeNo: string | RouteParamValue[]) => {
    return $http().get<IPhysical.OrderDetailRow>(TRADE_MODULE + `/physical/order/detail/${tradeNo}`)
}

/**
 * 折扣计算
 * @param params
 * @returns {*}
 */
export const discountCalcApi = (params: IPhysical.DiscountCalc) => {
    return $http().post<IPhysical.DiscountCalcRow>(TRADE_MODULE + `/physical/order/discount/calculation`, params)
}