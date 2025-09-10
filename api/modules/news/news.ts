import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {INews} from "~/api/interface/news/news";
import type {IPage, IPageQuery} from "~/api/interface";

/**
 * 新闻资讯顶部主题查询
 */
export const getNewsTopicApi = () => {
    return $http().get<General.MediaItem[]>(TRADE_MODULE + `/news/topic`)
}

/**
 * 最新资讯
 */
export const getNewsLatestApi = () => {
    return $http().get<INews.Row[]>(TRADE_MODULE + `/news/latest`)
}

/**
 * 更多资讯
 */
export const getNewsMoreApi = (params: IPageQuery) => {
    return $http().post<IPage<INews.MoreRow>>(TRADE_MODULE + `/news/more`, params)
}


/**
 * 推荐资讯
 */
export const getNewsRecommendApi = (params: INews.RecQuery) => {
    return $http().post<IPage<INews.Row>>(TRADE_MODULE + `/news/recommend`, params)
}

/**
 * 资讯详情
 * @param id
 */
export const getNewsDetailApi = (id: string) => {
    return $http().get<INews.Row>(TRADE_MODULE + `/news/detail/${id}`)
}
