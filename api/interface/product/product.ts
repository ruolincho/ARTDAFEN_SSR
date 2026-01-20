import type {RouteParamValue} from "vue-router";
import type {ISpecs} from "~/api/interface/specs/specs";
import type {IPageQuery} from "~/api/interface";
import type { General, ObjectNode} from "~/types/global";
import type {TechniqueCodeType} from "~/types/enumeration";

export namespace IProduct {

    /*产品请求参数*/
    export interface Query {
        /*产品ID*/
        productId: string | RouteParamValue[];
        /*规格ID*/
        specsId?: string | RouteParamValue[];
    }

    /*产品详情*/
    export interface Row {
        code: string //	版画代码
        techniqueId: TechniqueCodeType // 工艺编号
        id: string //	商品编号
        name: string // 名称
        title: string // 标题
        labels: string[] // 商品标签
        img: string // 图片, 封面
        banners: string[] // banner列表
        specs: Record<string, ISpecs.SpecsListSchema[]> // 商品规格列表, 笛卡尔积 specs key, value 所有规格, 部分规格需带图片展示
        attributes: {
            [key: string]: any
        } // 商品属性列表, 笛卡尔积 attribute key, value 所有属性, 纯文本
        details: string[] // 商品图片详情
        retailPrice: string // 初始价格
        redeemPoints: string // 兑换积分
        supplyPrice: string // 供货价格
        deliveryType: Dict.DeliveryType // 配送方式
        freeDelivery: Dict.FreeDeliveryStatus // 配送标识
        traceability: Dict.TraceabilityStatus // 追溯状态
        productId: string // 商品编号
        shape: Dict.ShapeType // 形状
        ratio: string // 比例
        merchant: ObjectNode.Merchant // 商家信息
        creator: ObjectNode.Creator // 创作者信息
        brand: ObjectNode.Brand // 品牌信息
        status: Dict.ProductSaleStatus // 商品状态
        specsCombo: ISpecs.Row[] // SKU组合
    }

    /*左侧筛选菜单请求参数*/
    export interface GroupQuery {
        /*父编号*/
        parentId: string;
    }

    /*属性参数*/
    export interface AttributeRow {
        /*属性值编号 */
        id: string
        /*属性值名称 */
        values: string
    }

    /*best产品列表请求参数*/
    export interface BestQuery {
        /*商品分类编号列表 */
        categoryIds?: string[];
        /*商品属性值编号列表 */
        attributeValueIds?: string[];
        /*价格排序, null: 重置, 0: 降序, 1: 升序 */
        priceSort?: string | null;
        /*销量排序, null: 重置, 0: 降序, 1: 升序 */
        salesSort?: string | null;
        /*起始价 */
        startPrice?: string | null;
        /*结束价 */
        endPrice?: string | null;
        /*创作者编号 */
        creatorId?: string | null;
        /*商品工艺编号 */
        techniqueId?: TechniqueCodeType | null;
    }

    /*产品列表请求参数*/
    export interface ListQuery extends IPageQuery {
        /*商品分类编号列表 */
        categoryIds?: never[];
        /*商品属性值编号列表 */
        attributeValueIds?: never[];
        /*价格排序, null: 重置, 0: 降序, 1: 升序 */
        priceSort?: string | null;
        /*销量排序, null: 重置, 0: 降序, 1: 升序 */
        salesSort?: string | null;
        /*起始价 */
        startPrice?: string | null;
        /*结束价 */
        endPrice?: string | null;
        /*品牌编号 */
        brandId?: string | null;
        /*创作者编号 */
        creatorId?: string | null;
        /*关键词 */
        keyword?: string | null;
    }

    /*相关推荐请求参数*/
    export interface RelatedQuery {
        /*商品工艺编号 */
        techniqueId: TechniqueCodeType;
        /*商品编号 */
        productId: string;
        /*创作者编号 */
        creatorId: string;
    }

    /*品牌相关推荐请求参数*/
    export interface BrandQuery {
        /*商品编号 */
        productId: string;
        /*品牌编号 */
        brandId: string;
    }

    /*品牌相关推荐请求参数*/
    export interface ArtworksQuery extends IPageQuery {
        /*创作者编号 */
        creatorId: string;
    }

    /*购物车链接请求参数*/
    export interface CheckoutLinkQuery {
        /*Google提供的编号 */
        offerId: string;
        /*尺寸编号 */
        dimensionId?: string;
        /*已选油画配件列表, key: 配件编号, value: 已选配件规格 JSON字符串 */
        parts?: Record<string, any>;
    }

    /*购物车链接响应参数*/
    export interface CheckoutLinkRow {
        /*商品 */
        product: General.GoodsItem;
        /*规格 */
        specs: ISpecs.Row;
        /*尺寸编号 */
        dimensionId: string;
    }

    /*购物车链接响应参数*/
    export interface ZoneRow {
        /*主键编号 */
        id: string;
        /*标题 */
        title: string;
        /*副标题 */
        subTitle: string;
        img: string;
        banners: string[];
        keywords: string;
        slug: string;
        description: string;
    }

    /*品牌相关推荐请求参数*/
    export interface ZoneCollectQuery extends IPageQuery {
        /*专区编号 */
        zoneId: string;
        /*商品工艺编号 */
        techniqueId?: TechniqueCodeType | null;
        /*价格排序, null: 重置, 0: 降序, 1: 升序 */
        priceSort?: string | null;
        /*销量排序, null: 重置, 0: 降序, 1: 升序 */
        salesSort?: string | null;
        /*创作者编号 */
        creatorId?: string | null;
    }
}
