export namespace ISearch {
    /** 搜索建议返回数据 */
    export interface CompletionRow {
        /*主键ID */
        id?: string;
        /*名称 */
        keyword: string;
        /*关键字类型,可用值:product,category,artists,brand */
        type: 'product' | 'category' | 'artists' | 'brand' | 'notData';
    }
}
