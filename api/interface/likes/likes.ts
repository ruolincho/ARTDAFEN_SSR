import type {RouteParamValue} from "vue-router";

export namespace ILikes {
    /*查询是否点赞*/
    export interface IsThumbsQuery {
        /*媒体编号 */
        mediaId: string | RouteParamValue[]
        /*媒体校验*/
        type: Dict.ThumbsType
    }

    /*菜单数据*/
    export interface UpdateThumbsQuery {
        /*媒体编号 */
        mediaId: string | RouteParamValue[]
        /*操作类型*/
        operate: Dict.ThumbsOperateType
    }
}
