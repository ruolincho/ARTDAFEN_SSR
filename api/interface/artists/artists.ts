import type {RouteParamValue} from "vue-router";

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
    }

    /*艺术家列表查询结果*/
    export type Res = Record<string, Row[]>;

}
