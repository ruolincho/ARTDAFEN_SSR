import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {ICoupon} from "~/interface/coupon/coupon";

/**
 * 获取优惠券详情
 * @param id
 */
export const getCouponDetailApi = (id: string) => {
    return $http().get<ICoupon.Row>(TRADE_MODULE + `/coupon/detail/${id}`)
}

