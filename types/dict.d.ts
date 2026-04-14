declare namespace Dict {
    /*性别状态, 0: 女, 1: 男*/
    type GenderStatus = '0' | '1'
    /*角色类型, 0: 管理员, 1: 普通用户, 2: 艺术家, 3: 创作运营, 4: 分销商, 5: 企业,*/
    type RoleStatus = Array<'0' | '1' | '2' | '3' | '4' | '5'>
    /*登录渠道, 0: 密码登录, 1: 验证码登录, 2: 谷歌授权登录, 3: 谷歌新版 GIS One Tap 授权登录*/
    type LoginChannel = '0' | '1' | '2' | '3'
    /*重置渠道, 0: 登录密码*/
    type ResetChannel = '0'
    /*配送类型, 0: 快递发货, 1: 同城配送(暂未开放), 2: 上门自提*/
    type DeliveryType = '0' | '1' | '2'
    /*包邮标识, null: 不包邮, 0: 不包邮, 1: 包邮*/
    type FreeDeliveryStatus = null | '0' | '1'
    /*是否支持溯源, null: 不支持, 0: 不支持, 1: 支持"*/
    type TraceabilityStatus = null | '0' | '1'
    /*是否默认, 0: 默认, 1: 非默认 */
    type DefaultFlagStatus = '0' | '1'
    /*订单类型: 0: 商城订单 shopping, 1: 数藏订单 virtual, 2: 图库订单 gallery, 3: 版权订单 copyright, 4: 定制订单 custom, 5: 兑换订单, 99: 采购订单 purchase*/
    type OrderType = '0' | '1' | '2' | '3' | '4' | '5' | '99'
    /*
    * 支付渠道
    * inner_points: 积分支付
    * ali_pc_website: 支付宝电脑网页支付
    * ali_mobile_website: 支付宝手机网页支付
    * ali_mobile_app: 支付宝 App 支付
    * wechat_app: 微信 App 支付
    * wechat_h5: 微信 H5 支付
    * wechat_jsapi: 微信 jsapi 支付
    * wechat_native: 微信 Native 支付
    * paypal_checkout: Paypal 支付
    * */
    type PayChannelStr =
        'inner_points' |
        'ali_pc_website' |
        'ali_mobile_website' |
        'ali_mobile_app' |
        'wechat_app' |
        'wechat_h5' |
        'wechat_jsapi' |
        'wechat_native' |
        'paypal_checkout'
    /*支付渠道, 0: 未发起调用任何支付(默认、上传支付凭据), 1: 领取, 2: 空投, 3: 合成, 4: 管理员手动补偿, 5: 积分支付, 6: 微信支付, 7: 支付宝支付, 8: Paypal 支付*/
    type PayChannelType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
    /*订单筛选状态, 0: 全部, 1: 待付款, 2: 待发货, 3: 待收货， 4: 售后*/
    type OrderFilterStatus = '0' | '1' | '2' | '3' | '4'
    /*实物订单状态, 0: 待付款, 1: 已取消, 2: 待发货, 3: 待收货, 4: 已完成, 5: 售后中*/
    type OrderStatus = '0' | '1' | '2' | '3' | '4' | '5'
    /*商品类型, 0:购买商品, 1:赠品*/
    type ProductType = '0' | '1'
    /*售后状态, 0: 无, 1: 申请中 2: 通过, 3: 同意, 4: 拒绝*/
    type AfterSaleStatus = '0' | '1' | '2' | '3' | '4'
    /* 装运标识, 0: 正常发货, 1: 无需发货 */
    type SpecsShipmentStatus = '0' | '1'
    /* 上下架状态, 0: 上架, 1: 下架 */
    type SpecsStatus = '0' | '1'
    /*媒体校验类型 0: 产品*/
    type ThumbsType = '0'
    /*操作类型, 0: 取消, 1: 选中*/
    type ThumbsOperateType = 0 | 1
    /*属性以及标签的类型*/
    type AttributeAndLabelsType = string | Record<string, any> | Array<any>
    /*分类类型*/
    type CategoryType = 'BEST' | 'LIST' | 'CUSTOM' | 'GROUP' | 'PRICE' | 'COLOR' | 'RADIO' | 'CHECKBOX' | 'ARTIST' | 'MUTEX' | 'SORT' | 'LINK'
    /* 跳转类型 0: 图片, 1: 视频 */
    type AdType = '0' | '1'
    /* 形状 square: 广场 1:1, portrait: 肖像 3:4, landscape: 景观 4:3, panoramic: 全景 16:9, slim: 苗条 16:10 */
    type ShapeType = 'square' | 'portrait' | 'landscape' | 'panoramic' | 'slim'
    /*商品状态, 0: For Sale, 1: Off tShe shelf, -1: Sale Out */
    type ProductSaleStatus = '0' | '1' | '-1'
    /* 订阅类型 0: 已订阅, 1: 未订阅 */
    type SubscribeType = '0' | '1'
}