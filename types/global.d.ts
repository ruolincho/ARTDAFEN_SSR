declare global {
    interface Window {
        webkitRequestAnimationFrame?: typeof window.requestAnimationFrame;
        mozRequestAnimationFrame?: typeof window.requestAnimationFrame;
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

declare namespace View {
    interface DefaultParams {
        // Dialog Title
        title: string;
        // Dialog 中数据信息
        row: { [key: string]: any };
        // Dialog中调用接口API
        api: ((params: any) => Promise<any>) | undefined;
        // 刷新列表数据使用
        getTableList?: (() => Promise<any>) | undefined;
        // 是否是新增
        isAdd?: boolean;

        // 其他附加信息
        [key: string]: any;
    }
}

declare namespace ObjectNode {
    /*店铺信息*/
    interface Merchant {
        /*店铺名称*/
        name: string
        /*店铺ID*/
        id: string
        /*店铺LOGO*/
        logo: string
        /*店铺标题*/
        title: string
        /*店铺头像*/
        img: string
    }

    /*作者信息*/
    interface Creator {
        /*头像*/
        portrait: string
        /*用户ID*/
        id: string
        /*昵称*/
        name: string
        /*时间线*/
        timeline: string
        /*简介*/
        intro: string
        /*区域*/
        region: string
        /*详细信息*/
        detail?: {
            /*展览数据*/
            exhibition: {
                intro: string[]
                localtion: string[]
                time: string[]
            }[]
        }
    }

    /*品牌信息*/
    interface Brand {
        /*品牌背景*/
        background: string
        /*品牌编号*/
        id: string
        /*品牌图片*/
        img: string
        /*品牌描述*/
        intro: string
        /*品牌名称*/
        name: string
        /*品牌标题*/
        title: string
    }
}

declare namespace General {
    /*通用实物商品详情*/
    interface GoodsItem {
        /*商品编号*/
        id: number
        /*标题*/
        title: string
        /*商品标签*/
        labels: Dict.AttributeAndLabelsType
        /*图片, 封面*/
        img: string
        /*图片, 透明封面*/
        cover?: string
        /*起始价*/
        retailPrice: string
        /*兑换积分*/
        redeemPoints: string
        /*总销售量*/
        salesVolume: number
        /*配送标识*/
        freeDelivery: Dict.FreeDeliveryStatus
        /*作者*/
        creator: ObjectNode.Creator
        /*工艺编号*/
        techniqueId: string
        /*收藏状态*/
        like: boolean
        /* 状态 */
        status: Dict.ProductSaleStatus
    }

    /* 媒体类型 */
    interface MediaItem {
        /* id */
        id: string
        /* 图片链接 */
        img: string
        /* 移动端图片链接 */
        mobileImg: string
        /* 跳转类型 */
        type: Dict.AdType
        /* 跳转链接 */
        url: string
        /* 名称 */
        name: string
        /* 标题 */
        title: string
        /* 媒体链接 */
        media: string
        /* 标签 */
        tags: string
    }
}

// export {}; // 确保文件被视为模块