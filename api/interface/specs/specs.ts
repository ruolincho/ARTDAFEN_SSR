export namespace ISpecs {
    /** 购物车数据 */
    export interface Row {
        /* 商品规格编号 */
        id: string
        /* 规格图 */
        img: string
        /* 属性 */
        specs: Record<string, string>
        /* 兑换积分 */
        redeemPoints: string
        /* 商品规格库存 */
        retailStock: string
        /* 商品规格销售价 */
        retailPrice: string
        /* 商品规格库存 */
        supplyStock: string
        /* 商品规格销售价 */
        supplyPrice: string
        /* 装运标识 */
        shipment: Dict.SpecsShipmentStatus
        /* 状态 */
        status: Dict.SpecsStatus
        /* 最少订购数量 */
        minOrderQuantity: string
        /* 增加步长 */
        batchOrderQuantity: string
        /* 商品编码 */
        code: string
        /* 商品工艺Label */
        craft: string
        /* 后续后端添加 */
        gtin?: string
        /* 后续后端添加 */
        mpn?: string
    }

    /* 用于渲染的 SKU 数据 */
    export interface SpecsSchema {
        list: SpecsListSchema[]
        /* 规格属性名 */
        name: string
    }

    /*  */
    export interface SpecsListSchema {
        /* 规格图 */
        img: string
        /* 规格属性值 */
        val: string
        /* 是否不可选 */
        isDisabled: boolean
    }
}
