import { $http } from '~/api/http'
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IProduct} from "~/api/interface/product/product";
import type {IHome} from "~/api/interface/home/home";
import type {IPage} from "~/api/interface";
import type {General} from "~/types/global";

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
 * 商品列表检索
 * @param params
 */
export const getProductRecommendedListApi = (params: IProduct.ListQuery) => {
    return $http().post<IPage<General.GoodsItem[]>>(TRADE_MODULE + `/product/recommended`, params)
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

/**
 * 购物车链接查询
 * @param params
 */
export const checkoutLinkApi = (params: IProduct.CheckoutLinkQuery) => {
    return $http().post<IProduct.CheckoutLinkRow>(TRADE_MODULE + `/product/checkout/link`, params)
}

/**
 * 商品专区查询
 * @returns {*}
 * @param id
 */
export const getProductZoneApi = (id: string) => {
    return $http().get<IProduct.ZoneRow>(TRADE_MODULE + `/product/zone/detail/${id}`)
}

/**
 * 商品专区列表检索
 * @param params
 */
export const getZoneCollectApi = (params: IProduct.ZoneCollectQuery) => {
    return $http().post<IPage<General.GoodsItem[]>>(TRADE_MODULE + `/product/zone/collect`, params)
}

/**
 * 商品主图查询
 * @returns {*}
 * @param id
 */
export const getProductAlbumApi = (id: string) => {
    return $http().get<string>(TRADE_MODULE + `/product/style/${id}`)
}

/**
 * 专区探索
 * @returns {*}
 * @param zoneId
 */
export const getZoneExploreApi = (zoneId: string) => {
    return $http().get<IProduct.ZoneRow[]>(TRADE_MODULE + `/product/zone/explore/${zoneId}`)
}

/**
 * 专区Topic
 * @returns {*}
 */
export const getZoneTopicApi = () => {
    return $http().get<IProduct.ZoneRow[]>(TRADE_MODULE + `/product/zone/topic`)
}
