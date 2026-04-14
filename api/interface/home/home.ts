import type {TechniqueCodeType} from "~/types/enumeration";
import type {IArtists} from "~/api/interface/artists/artists";
import type {General} from "~/types/global";

export namespace IHome {

    export interface HomeDataRow {
        ad: General.MediaItem[]
        product: General.GoodsItem[]
        artists: IArtists.Row[]
    }

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
            techniqueId?: TechniqueCodeType
            referenceId?: string
            url?: string
        }
        /*子*/
        children: MenuRow[]
        /*前端添加参数（用户导航聚焦）*/
        path?: string[]
        /*描述*/
        description?: string[]
        /*是否显示（前端添加的参数）*/
        isShow?: boolean
        //跳转相关的配置（前端添加的参数）
        linkProps?: {
            to: string;
            target: string;
            isPureLink: boolean; // 是否是纯叶子节点（可跳转）
        }
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
