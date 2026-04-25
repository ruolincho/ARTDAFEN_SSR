import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {ISearch} from "~/api/interface/search/search";
import type { GenericAbortSignal } from 'axios'

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
 * * @param keyword 搜索词
 * * @param signal 取消请求的信号源 (从组件传入)
 */
export const getSearchCompletionApi = (keyword: string, signal?: GenericAbortSignal) => {
    return $http().get<ISearch.KeywordData>(TRADE_MODULE + `/search/completion`, { keyword }, {signal})
}

/**
 * 获取 SEO 信息视图
 * @param params
 */
export const getSearchSeoApi = (params: ISearch.SearchSeoReq) => {
    return $http().get<ISearch.SearchSeoRow>(TRADE_MODULE + `/search/seo`, params)
}