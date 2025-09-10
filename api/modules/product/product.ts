import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IProduct} from "~/api/interface/product/product";
import type {IHome} from "~/api/interface/home/home";
import type {IPage} from "~/api/interface";

/**
 * 产品详情
 * @param params
 * @returns {*}
 */
export const getProductDetailApi = (params: IProduct.Query) => {
    return $http().get<IProduct.Row>(TRADE_MODULE + `/product/detail`, params)
}

/**
 * 获取左侧筛选菜单
 * @param params
 * @returns {*}
 */
export const getProductGroupApi = (params: IProduct.GroupQuery) => {
    return $http().get<IHome.MenuRow[]>(TRADE_MODULE + `/product/group`, params)
}

/**
 * 商品属性值检索
 * @param params
 */
export const getProductAttributeApi = (params: string[]) => {
    return $http().post<IProduct.AttributeRow[]>(TRADE_MODULE + `/product/attribute/value`, params)
}

/**
 * 商品Best检索
 * @param params
 */
export const getProductBestApi = (params: IProduct.BestQuery) => {
    return $http().post<General.GoodsItem[]>(TRADE_MODULE + `/product/best`, params)
}

/**
 * 商品列表检索
 * @param params
 */
export const getProductListApi = (params: IProduct.ListQuery) => {
    return $http().post<IPage<General.GoodsItem[]>>(TRADE_MODULE + `/product/search`, params)
}

/**
 * 获取相关推荐
 * @param params
 * @returns {*}
 */
export const getRelatedRecommendApi = (params: IProduct.RelatedQuery) => {
    return $http().post<General.GoodsItem[]>(TRADE_MODULE + `/product/related`, params)
}

/**
 * 获取品牌推荐
 * @param params
 * @returns {*}
 */
export const getBrandRecommendApi = (params: IProduct.BrandQuery) => {
    return $http().post<General.GoodsItem[]>(TRADE_MODULE + `/product/brand`, params)
}

/**
 * 艺术家作品列表查询
 * @param params
 */
export const getArtworksApi = (params: IProduct.ArtworksQuery) => {
    return $http().post<IPage<General.GoodsItem[]>>(TRADE_MODULE + `/product/artist/artworks`, params)
}