import type {IPageQuery} from "~/api/interface";
import type {IShopping} from "~/api/interface/shopping/shopping";
import type {ICustom} from "~/api/interface/custom/custom";

export namespace IPhysical {

    /*订单列表查询条件*/
    export interface OrderQuery extends IPageQuery {
        /*筛选状态*/
        status: Dict.OrderFilterStatus
        /*关键字*/
        keyword: string
    }

    /*订单列表数据*/
    export interface OrderListRow {
        /*订单编号*/
        id: string
        /*货币代码*/
        currencyCode: string
        /*配送类型*/
        deliveryType: Dict.DeliveryType
        /*交易编号*/
        tradeNo: string
        /*实付价格*/
        actualAmount: string
        /*订单状态*/
        status: Dict.OrderStatus
        /*创建时间*/
        createTime: number
        /*购物订单管理订单项视图*/
        orderItems: OrderGoodsItem[]
        /*店铺信息*/
        merchant: ObjectNode.Merchant
    }

    /*订单项视图数据*/
    export interface OrderGoodsItem {
        /*商品ID*/
        id: string
        /*商品名称*/
        name: string
        /*商品标题*/
        title: string
        /*商品图片*/
        img: string
        /*购买数量*/
        quantity: string
        /*单个价钱*/
        unitPrice: string
        /*属性*/
        specs: string
        /*商品类型*/
        productType: Dict.ProductType
        /*政策*/
        salesPolicy: {
            deliveryType: Dict.DeliveryType
            freeDelivery: Dict.FreeDeliveryStatus
        }
        /*装运标识，0:正常发货，1:无需发货*/
        shipment: '0' | '1'
    }

    /*订单收货地址视图*/
    export interface OrderAddress {
        /*联系人姓名*/
        name: string
        /*联系人电话*/
        mobile: string
        /*市*/
        city: string
        /*区*/
        district: string
        /*详细地址信息, 具体到门牌号*/
        detail: string
        /*营业时间*/
        businessHours?: string
        /*打烊时间*/
        closingHour?: string
        /*邮编*/
        zip: string
        /*国家*/
        country: string
        /*州*/
        state: string
    }

    /*订单视图数据*/
    export interface OrderDetail {
        //	订单编号
        id: string
        //	交易编号
        tradeNo: string
        // 订单金额
        originalAmount: string
        // 优惠价格
        discountAmount: string
        // 运费价格
        deliveryAmount: string
        // 实付价格
        actualAmount: string
        // 支付渠道
        payChannel: Dict.PayChannelType
        // 订单备注
        remark: string
        // 订单状态
        status: Dict.OrderStatus
        // 支付时间
        payTime: number
        // 发货时间
        deliveredTime: number
        // 收货时间
        receivedTime: number
        //	售后状态
        afterSaleStatus: Dict.AfterSaleStatus
        //	售后时间
        afterSaleTime: number
        //	创建时间
        createTime: number
        /*配送类型 */
        deliveryType: Dict.DeliveryType
        /*支付凭证 */
        payCredential?: string
        /*兑换积分 */
        spentPoints: string
        /*货币代码*/
        currencyCode: string
    }

    /*订单详情数据*/
    export interface OrderDetailRow {
        /*订单视图*/
        order: OrderDetail
        /*订单项视图*/
        orderItems: OrderGoodsItem[]
        /*订单收货地址视图*/
        address: OrderAddress
        /*赠品*/
        gifts: OrderGoodsItem[]
        /*店铺信息*/
        merchant: ObjectNode.Merchant
    }

    /* 折扣计算 */
    export interface DiscountCalc {
        /*优惠券代码 */
        couponCode: string;
        /*购物车列表*/
        shoppingCarts: IShopping.ShoppingCartsRow[] | ICustom.OfferQuery[]
    }

    /* 折扣计算结果 */
    export interface DiscountCalcRow {
        /*优惠金额 */
        discountAmount: string;
        /*优惠详情*/
        details: IShopping.ShoppingCartsRow[]
    }
}