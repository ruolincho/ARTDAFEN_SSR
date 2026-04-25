import type {General, ObjectNode} from "~/types/global";
import type {IHome} from "~/api/interface/home/home";
import type {IProduct} from "~/api/interface/product/product";

export namespace ISearch {

    /** 关键字类型 */
    export type KeywordType = 'product' | 'category' | 'artists' | 'zone'

    /** 基础映射关系（Key -> 单个元素的类型） */
    export interface KeywordTypeMap {
        product: General.GoodsItem[];
        category: IHome.MenuRow[];
        artists: ObjectNode.Creator[];
        zone: IProduct.ZoneRow[];
    }

    /** 搜索建议返回数据 */
    export interface CompletionRow {
        /*主键ID */
        id?: string;
        /*名称 */
        keyword: string;
        /*关键字类型 */
        type: KeywordType;
        /*图片 */
        img?: string
    }

    export type KeywordData = {
        [K in KeywordType]?: KeywordTypeMap[K][];
    };

    export type SearchSeoReq= {
        slug: string
        type?: KeywordType
    };

    export type SearchSeoRow = {
        /*seo 标题*/
        name: string
        /*seo 身份证 */
        slug: string,
        /*seo 关键字*/
        keywords: string,
        /*seo 描述*/
        description: string

    };

}
