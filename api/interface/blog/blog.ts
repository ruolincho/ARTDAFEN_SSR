import type {General, ObjectNode} from "~/types/global";

export namespace IBlog {

    /*博客数据*/
    export interface Row {
        /*笔记编号 */
        id: string
        /*标题 */
        title: string
        /* slug */
        slug: string
        /*内容 */
        content: string
        /*主图 */
        img: string
        /*图片列表 */
        banner: string[]
        /*是否点赞 */
        like: boolean
        /*点赞数量 */
        likeVolume: string
        /*创作者 */
        creator: ObjectNode.Creator
        /*创建时间 */
        createTime: number
        /*种草商品 */
        products: General.GoodsItem[]
        /*标签 */
        labels: string[]
    }
}
