import { $http } from '~/api/http'
import {USER_MODULE} from "~/api/helper/prefix";
import type {IMap} from "~/api/interface/map/map";

/**
 * 获取国家列表
 */
export const getCountryOptionApi = () => {
    return $http().get<IMap.RegionOptions[]>(USER_MODULE + `/map/country`)
}

/**
 * 获取区域列表
 */
export const getStateOptionApi = (params: IMap.StateQuery) => {
    return $http().get<IMap.RegionOptions[]>(USER_MODULE + `/map/state`, params)
}
