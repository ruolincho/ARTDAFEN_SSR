import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {ISpecs} from "~/api/interface/specs/specs";
import type {RouteParamValue} from "vue-router";

/**
 * 获取产品SKU列表
 * @param productId
 * @returns {*}
 */
export const getSpecsListApi = (productId: string | RouteParamValue[]) => {
    return $http().get<ISpecs.Row[]>(TRADE_MODULE + `/specs/list/${productId}`)
}