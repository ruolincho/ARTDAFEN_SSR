import translate from 'i18n-jsautotranslate'
import type {Tawk_API} from "~/types/tawk-api";
import type {TechniqueCodeType} from "~/types/enumeration";

declare global {
    interface Window {
        webkitRequestAnimationFrame?: typeof window.requestAnimationFrame;
        mozRequestAnimationFrame?: typeof window.requestAnimationFrame;
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        translate: typeof translate
        // 聊天组件API对象
        Tawk_API: Tawk_API;
        // 聊天组件启动的时间
        Tawk_LoadStart: Date;
        // 聊天组件是否已经登录
        __tawk_logged_in__: boolean;
        // 商家评价组件对象
        merchantwidget: any;
        // Google 登录 API 对象 (google 对象已经安装 @types/google.accounts 包)
        google: typeof google;
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
        id: string
        /*商品编号*/
        productId?: string
        /*标题*/
        title: string
        /*商品名称*/
        name: string
        /*商品标签*/
        labels: Dict.AttributeAndLabelsType
        /*图片, 封面*/
        img: string
        /*图片, 透明封面*/
        cover?: string
        /*起始价*/
        retailPrice: string
        /*市场价*/
        marketPrice: string
        /*兑换积分*/
        redeemPoints: string
        /*总销售量*/
        salesVolume: number
        /*配送标识*/
        freeDelivery: Dict.FreeDeliveryStatus
        /*作者*/
        creator: ObjectNode.Creator
        /*工艺编号*/
        techniqueId: TechniqueCodeType
        /*收藏状态*/
        like: boolean
        /* 状态 */
        status: Dict.ProductSaleStatus
        /* 商家 */
        merchant?: ObjectNode.Merchant
        /* slug */
        slug: string
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