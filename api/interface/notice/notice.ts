export namespace INotice {

    /*通知数据*/
    export interface Row {
        /*主键编号 */
        id: string
        /*标题 */
        title: string;
        /*内容 */
        content: string;
        /*创建时间 */
        createTime: number;
    }
}
