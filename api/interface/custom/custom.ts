export namespace ICustom {

    /** 本地存储购物车数据 */
    export interface ShoppingCartsStorageRow {
        /*画芯代码 */
        code: string;
        /*预览图片（Base64） */
        previewImg: string;
        /*原图（Base64）*/
        originalImg: string;
        /*商品标题 */
        title: string;
        /*商品规格 */
        specs: any;
        /*尺寸编号 */
        dimensionId: string;
        /*已选油画配件列表, key: 配件编号, value: 已选配件规格 */
        parts?: Record<string, any> | null;
        /*购买数量 */
        quantity: number;
        /*实付金额 */
        actualAmount: string | number;
        /*备注信息 */
        remark: string;
        /*人头数量 */
        contentNumber: number | null;
        /*主题编号*/
        themeId: string | null;
    }

    /** 确认订单接口请求参数 */
    export interface OfferQuery {
        /*画芯代码 */
        paintCode: string;
        /*尺寸编号*/
        dimensionId: string;
        /*已选油画配件列表, key: 配件编号, value: 已选配件规格 */
        parts?: Record<string, any> | null;
        /*用户收货地址编号/商户自提点编号 */
        addressId?: string;
        /*购买数量*/
        quantity: number
        /*优惠券编号*/
        couponCode?: string | null;
    }

    /** 确认订单接口返回参数 */
    export interface OfferRow {
        /*预计实付金额*/
        estimatedAmount: string
        /*预计运费金额*/
        estimatedDeliveryAmount: string
        /*运费模板*/
        deliveryTemplate: {}
        /*优惠金额*/
        discountAmount: string
        /*原始金额*/
        originalAmount: string
        /*商品列表*/
        products: OfferProductsRow[]
    }

    export interface OfferProductsRow extends OfferQuery{
        promoOffer: string[]
    }

    /** 上传订单原图接口请求参数 */
    export interface UploadOrderOriginImgQuery extends Record<string, string | Blob> {
        tradeNo: string
        originalImg: Blob
    }

    /** 创建订单参数 */
    export interface CreateQuery extends Record<string, any> {
        /*交易编号*/
        tradeNo: string
        /*总价*/
        actualAmount: string
        /*  */
        couponCode?: string
        /*画芯代码 */
        paintCode: string;
        /*购买数量*/
        quantity: string
        /*尺寸编号*/
        dimensionId: string;
        /*已选油画配件列表, key: 配件编号, value: 已选配件规格 JSON字符串 */
        partStr: string;
        /*预览图*/
        previewImg: Blob
        /*用户收货地址编号/商户自提点编号 */
        addressId: string;
        /*备注信息*/
        remark: string
        /*人头数量 */
        contentNumber: number | null;
        /*主题编号*/
        themeId: string | null;
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
