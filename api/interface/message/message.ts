import type {IPageQuery} from "~/api/interface";

export namespace IMessage {

    export interface Query {
        /*邮箱 */
        email: string;
        /*内容 */
        subject: string;
        /*消息 */
        message: string;
    }

    export interface CommentRes {
        /*评论ID */
        id: string;
        /*用户名 */
        name: string;
        /*图片 */
        img: string;
        /*评分 */
        rating: number;
        /*内容 */
        content: string;
        /*创建时间 */
        createTime: number;
        /* */
        product: General.GoodsItem;
    }

    export interface CommentQuery extends IPageQuery {
        /*产品编号 */
        productId?: number;
    }

}
