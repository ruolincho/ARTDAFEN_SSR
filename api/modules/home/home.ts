import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IHome} from "~/api/interface/home/home";
import type {IArtists} from "~/api/interface/artists/artists";
import type {General} from "~/types/global";

/**
 * 首页菜单
 */
export const getMenuApi = () => {
    return $http().get<IHome.MenuRow[]>(TRADE_MODULE + `/home/menu`)
}

/**
 * 获取首页数据
 */
export const getHomeDataApi = () => {
    return $http().get<General.MediaItem[]>(TRADE_MODULE + `/home/ad`)
}


/**
 * 获取首页更多分类
 */
export const getHomeMoreApi = () => {
    return $http().get<IHome.MoreRow>(TRADE_MODULE + `/home/more`)
}

/**
 * 获取首页探索
 * @param params
 */
export const getHomeArtistsApi = (params: IArtists.Query) => {
    return $http().get<IArtists.Row[]>(TRADE_MODULE + `/home/artists`, params)
}

/**
 * 获取币种
 */
export const getCurrencyApi = () => {
    return $http().get<IHome.CurrencyRow[]>(TRADE_MODULE + `/home/currency`)
}
