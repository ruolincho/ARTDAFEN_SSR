import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IPage, IPageQuery} from "~/api/interface";
import type {IBlog} from "~/api/interface/blog/blog";

/**
 * 获取博客列表
 * @param params
 */
export const getBlogListApi = (params: IPageQuery) => {
    return $http().post<IPage<IBlog.Row>>(TRADE_MODULE + `/blog/example`, params)
}

/**
 * 获取博客详情
 * @param id
 */
export const getBlogDetailApi = (id: string) => {
    return $http().get<IBlog.Row>(TRADE_MODULE + `/blog/detail/${id}`)
}

