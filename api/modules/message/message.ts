import {$http} from '~/api/http'
import {TRADE_MODULE, USER_MODULE} from "~/api/helper/prefix";
import type {IMessage} from "~/api/interface/message/message";
import type {IPage} from "~/api/interface";

/**
 * 消息订阅（匿名）在 https://portraitpainting.com/ 的项目中使用到了记得同步到另外一边
 * @param params
 */
export const subscribe = (params: { email: string }) => {
    return $http().post(USER_MODULE + `/message/subscribe`, params)
}

/**
 * 消息订阅（实名）
 */
export const subscribeForRealName = () => {
    return $http().get(USER_MODULE + `/message/subscribe`)
}

/**
 * 取消消息订阅
 * @param params
 */
export const unsubscribeApi = (params: { token?: string }) => {
    return $http().post<string>(USER_MODULE + `/message/unsubscribe`, params)
}

/**
 * 发送问题询问
 * @param params
 */
export const sendConsulting = (params: IMessage.Query) => {
    return $http().post(TRADE_MODULE + `/message/send`, params)
}

/**
 * 查询最新评论列表
 */
export const getLatestComment = () => {
    return $http().get<IMessage.CommentRes[]>(TRADE_MODULE + `/message/comment/latest`)
}

/**
 * 获取博客列表
 * @param params
 */
export const getCommentList = (params: IMessage.CommentQuery) => {
    return $http().post<IPage<IMessage.CommentRes>>(TRADE_MODULE + `/message/comment/page`, params)
}