import { $http } from '~/api/http'
import {USER_MODULE} from "~/api/helper/prefix";
import type {IAddress} from "~/api/interface/address/address";

/**
 * 获取地址列表
 */
export const getAddressListApi = () => {
    return $http().get<IAddress.Row[]>(USER_MODULE + `/address/list`)
}

/**
 * 添加地址
 * @param params
 */
export const addAddressApi = (params: IAddress.Row) => {
    return $http().post<string>(USER_MODULE + `/address/add`, params)
}

/**
 * 地址修改
 * @param params
 */
export const editAddressApi = (params: IAddress.Row) => {
    return $http().post(USER_MODULE + `/address/edit`, params)
}

/**
 * 地址详情
 * @param id
 */
export const detailAddressApi = (id: string) => {
    return $http().get<IAddress.Row>(USER_MODULE + `/address/detail/${id}`)
}

/**
 * 删除地址
 * @param id
 */
export const removeAddressApi = (id: string) => {
    return $http().post(USER_MODULE + `/address/remove/${id}`)
}

/**
 * 设置默认收货地址
 * @param id
 */
export const setDefaultAddressApi = (id: string) => {
    return $http().post(USER_MODULE + `/address/set/${id}`)
}

/**
 * 获取默认地址
 */
export const getDefaultAddressApi = () => {
    return $http().get<IAddress.Row>(USER_MODULE + `/address/default`)
}