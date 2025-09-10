import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {ISearch} from "~/api/interface/search/search";

/**
 * 查询用户搜索历史记录
 */
export const getSearchHistoryApi = () => {
    return $http().get<ISearch.CompletionRow[]>(TRADE_MODULE + `/search/history`)
}

/**
 * 删除用户历史搜索记录
 * @param params
 */
export const deleteSearchHistoryApi = (params: ISearch.CompletionRow[]) => {
    return $http().post(TRADE_MODULE + `/search/history/remove`, params)
}

/**
 * 大家都在搜
 */
export const getEveryoneSearchApi = () => {
    return $http().get<ISearch.CompletionRow[]>(TRADE_MODULE + `/search/everyone`)
}

/**
 * 热门搜索
 */
export const getHotSearchApi = () => {
    return $http().get<ISearch.CompletionRow[]>(TRADE_MODULE + `/search/hot`)
}

/**
 * 搜索关键字补全
 * @param keyword
 */
export const getSearchCompletionApi = (keyword: string) => {
    return $http().get<ISearch.CompletionRow[]>(TRADE_MODULE + `/search/completion`, { keyword })
}