import type {TechniqueCodeType} from "~/types/enumeration";

export namespace IShopping {

    /** 本地存储购物车数据 */
    export interface ShoppingCartsStorageRow {
        /*店铺编号 */
        shopId: string;
        /*工艺编号 */
        techniqueId: TechniqueCodeType;
        /*商品编号 */
        productId: string;
        /*商品图片 */
        img: string;
        /*商品标题 */
        title: string;
        /*商品规格编号 */
        specsId: string;
        /*商品规格 */
        specs: any;
        /*配送方式 */
        deliveryType: Dict.DeliveryType;
        /*尺寸编号 */
        dimensionId?: string | null;
        /*已选油画配件列表, key: 配件编号, value: 已选配件规格 */
        parts?: Record<string, any>;
        /*购买数量 */
        quantity: number;
        /*零售价 */
        retailPrice: string | number;
        /*兑换积分 */
        redeemPoints?: string | number;
        /*上下架标识, true: 商品已下架*/
        disable?: boolean;
        /*零售库存*/
        retailStock?: string | number;
        /*优惠信息*/
        promoOffer?: string[];
        /*是否选中*/
        selected?: boolean
        /*优惠金额*/
        discountAmount?: number
        /*金额计算中状态*/
        isPriceStale: boolean
    }

    /** 购物车数据 */
    export interface ShoppingCartsRow {
        /*店铺编号 */
        shopId: string;
        /*工艺编号 */
        techniqueId: TechniqueCodeType;
        /*商品编号 */
        productId: string;
        /*商品规格编号 */
        specsId: string;
        /*尺寸编号 */
        dimensionId?: string;
        /*已选油画配件列表, key: 配件编号, value: 已选配件规格 */
        parts?: Record<string, any>;
        /*购买数量 */
        quantity: number;
        /*零售价 */
        retailPrice: string | number;
        /*兑换积分 */
        redeemPoints?: string | number;
        /*分销代码 */
        salesCode?: string;
        /*优惠信息*/
        promoOffer?: string[];
        /*是否选中*/
        selected?: boolean;
        /*优惠金额*/
        discountAmount?: number;
    }

    /** 确认订单接口请求参数 */
    export interface OfferQuery {
        /*购物车列表 */
        shoppingCarts: ShoppingCartsRow[];
        /*配送类型*/
        deliveryType?: Dict.DeliveryType;
        /*用户收货地址编号/商户自提点编号 */
        addressId?: string;
        /*优惠券编码*/
        couponCode?: string | null;
    }

    /** 确认订单接口返回参数 */
    export interface OfferRow {
        /*原价*/
        originalAmount: string
        /*优惠金额*/
        discountAmount: string
        /*预计运费金额*/
        estimatedDeliveryAmount: string
        /*预计实付金额*/
        estimatedAmount: string
        /*积分抵扣数*/
        spentPoints: string
        /*店铺费用明细*/
        detail: OrderOfferDetailRow[]
    }

    /** 店铺费用明细 */
    export interface OrderOfferDetailRow {
        /*店铺编号*/
        shopId: string
        /*运价金额*/
        freight: string
        /*折扣金额*/
        discount: string
        /*实付金额*/
        amount: string
        /*运费模板*/
        deliveryTemplate: {}
        /*赠品*/
        gifts: GiftsRow[]
        /*商品列表*/
        products: ShoppingCartsRow[]
    }

    /** 赠品数据 */
    export interface GiftsRow {
        /*图片， 封面*/
        img: string
        /*名称*/
        name: string
        /*销售价*/
        retailPrice: string
        /*商品编号*/
        productId?: string
        /*数量*/
        quantity: string
        /*商品规格*/
        specs: object
        /*规格编号*/
        specsId?: string
        /*标题*/
        title: string
        /*店铺编号*/
        shopId: string
    }

    /** 创建订单参数 */
    export interface CreateQuery {
        /* 优惠券编码 */
        couponCode?: string
        /*总价*/
        actualAmount: string
        /*积分抵扣数*/
        spentPoints: string
        /*购物车*/
        shoppingCarts: ShoppingCartsRow[]
        /*配送类型 */
        deliveryType: Dict.DeliveryType
        /*地址ID*/
        addressId: string
        /*备注信息*/
        remarks: object
        /*用户手机号*/
        mobile: string
    }

    /** 创建订单返回结果 */
    export interface CreateRow {
        /*订单ID*/
        id: string
        /*订单编号*/
        tradeNo: string
        /*商品总额*/
        originalAmount: string
        /*优惠价格*/
        discountAmount: string
        /*实付价格*/
        actualAmount: string
        /*创建时间*/
        createTime: number
        /*运费金额*/
        deliveryAmount: string
    }

}
