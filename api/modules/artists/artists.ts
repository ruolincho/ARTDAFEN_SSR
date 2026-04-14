import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IArtists} from "~/api/interface/artists/artists";
import type {ObjectNode} from "~/types/global";

/**
 * 获取艺术家列表
 */
export const getArtistsListApi = (params: IArtists.Query) => {
    return $http().get<IArtists.Res>(TRADE_MODULE + `/artists/search`, params)
}

/**
 * 获取艺术家列表
 */
export const getArtistsListBySearchApi = (params: IArtists.Query) => {
    return $http().post<IArtists.Row[]>(TRADE_MODULE + `/artists/search`, params)
}

/**
 * 艺术家详情
 * @param id
 * @returns {*}
 */
export const getArtistDetailApi = (id: string) => {
    return $http().get<ObjectNode.Creator>(TRADE_MODULE + `/artists/detail/${id}`)
}
