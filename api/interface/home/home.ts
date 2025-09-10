export namespace IHome {
    /*菜单数据*/
    export interface MenuRow {
        /*分类编号*/
        id: string
        /*父分类编号, 0: 顶级分类*/
        parentId: string
        /*图片*/
        img?: string
        /*分类名称*/
        name: string
        /*说明*/
        config: {
            type: Dict.CategoryType
            startPrice?: string | null
            endPrice?: string | null
            color?: string
            code?: string
            techniqueId?: string
            referenceId?: string
        }
        /*子*/
        children: MenuRow[]
        /*前端添加参数（用户导航聚焦）*/
        path?: string[]
        /*描述*/
        intro?: string[]
        /*是否显示（前端添加的参数）*/
        isShow?: boolean
    }

    /*更多分类数据*/
    export interface MoreRow {
        room: MenuRow[]
        game: MenuRow[]
        style: MenuRow[]
    }

    /*币种数据*/
    export interface CurrencyRow {
        /*主键编号 */
        id: string;
        /*货币全称 */
        name: string;
        /*ISO4217 货币代码 */
        code: string;
    }

}
