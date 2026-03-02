import type {IPageQuery} from "~/api/interface";
import type {General, ObjectNode} from "~/types/global";

export namespace INews {

    /*新闻查询条件*/
    export interface RecQuery extends IPageQuery {
        id: string
        categoryId: string
    }

    /*新闻项*/
    export interface Row {
        /*ID编号*/
        id: string
        /*标题*/
        title: string
        /*slug*/
        slug: string
        /*副标题*/
        subtitle: string
        /*属性*/
        labels: string[]
        /*图片*/
        img: string
        /*分类编号*/
        categoryId: string
        /*作者*/
        creator: ObjectNode.Creator
        /*富文本*/
        content: string
        /*浏览量*/
        visit: string
        /*创建时间*/
        createTime: number
        /*更新时间*/
        updateTime: number
        /*SEO 描述*/
        description: string
        /*SEO 关键词 */
        keywords: string
        /*是否原创*/
        original: boolean
    }

    /*更多新闻项*/
    export interface MoreRow {
        /*年月时间戳*/
        index: number
        /*新闻列表*/
        news: Row[]
    }

    /*新闻顶部数据项*/
    export interface TopRow {
        /*顶部主题*/
        topic: General.MediaItem[]
        /*最新资讯*/
        latest: Row[]
    }
}
