import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {INotice} from "~/api/interface/notice/notice";
import type {IPage, IPageQuery} from "~/api/interface";

/**
 * 底部导航获取最新通知列表
 */
export const getNoticeBtoApi = () => {
    return $http().get<INotice.Row[]>(TRADE_MODULE + `/message/notice/latest`)
}

/**
 * 通知列表分页
 */
export const getNoticeListApi = (params: IPageQuery) => {
    return $http().post<IPage<INotice.Row>>(TRADE_MODULE + `/message/notice/list`, params)
}
