import { $http } from '~/api/http'
import type {IPaint} from "~/api/interface/paint/paint";
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IPage} from "~/api/interface";

/**
 * 查询配件列表
 * @param params
 * @returns {*}
 */
export const getCombinationApi = (params: IPaint.CombinationQuery) => {
    return $http().post<IPaint.CombinationRow>(TRADE_MODULE + `/paint/combo`, params)
}

/**
 * 查询版画油画主题
 * @returns {*}
 */
export const getThemeApi = (id: string) => {
    return $http().get<IPaint.ThemeRow[]>(TRADE_MODULE + `/paint/theme/${id}`)
}

/**
 * 查询版画油画定制案例样图
 * @returns {*}
 */
export const getSampleApi = (id: string) => {
    return $http().get<IPaint.SampleRow[]>(TRADE_MODULE + `/paint/sample/${id}`)
}