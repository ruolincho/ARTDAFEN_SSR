import type {RouteParamValue} from "vue-router";
import type {General, ObjectNode} from "~/types/global";

export namespace IArtists {
    /*艺术家列表查询参数*/
    export interface Query {
        /*艺术家名称*/
        name?: string;
        /*索引*/
        letter?: string | RouteParamValue[];
        /*分类id*/
        categoryId?: string
    }

    /*艺术家列表查询结果*/
    export interface Row {
        /*用户编号 */
        id: string;
        /*真实姓名 */
        name: string;
        /*肖像 */
        portrait: string;
        slug: string;
    }

    /*艺术家列表查询结果*/
    export type Res = Record<string, Row[]>;


    /*艺术家列表查询结果*/
    export interface DetailRow extends ObjectNode.Creator {
        artworks: General.GoodsItem[];
    }
}
