import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {ILikes} from "~/api/interface/likes/likes";

/**
 * 校验用户是否收藏
 * @param params
 */
export const getIsThumbsApi = (params: ILikes.IsThumbsQuery) => {
    return $http().get<boolean>(TRADE_MODULE + `/likes/is/thumbs/${params.mediaId}`, {type: params.type})
}

/**
 * 产品 收藏 / 取消收藏
 * @param params
 */
export const productThumbsApi = (params: ILikes.UpdateThumbsQuery) => {
    return $http().post(TRADE_MODULE + `/likes/product/collect`, params)
}

/**
 * 博客 点赞 / 取消点赞
 * @param params
 */
export const blogThumbsApi = (params: ILikes.UpdateThumbsQuery) => {
    return $http().post(TRADE_MODULE + `/likes/blog/thumbs`, params)
}
