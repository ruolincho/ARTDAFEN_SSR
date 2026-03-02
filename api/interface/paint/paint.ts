import type {IPageQuery} from "~/api/interface";

export namespace IPaint {
    export interface CombinationQuery {
        // 版画代码
        code: string;
        // 尺寸编号
        dimensionId?: string | null;
        // 形状比例
        ratio?: string;
        // 风格编号
        coreId?: string | null;
    }

    export interface CombinationRow {
        /*尺寸 */
        size: CombinationParts[];
        /*配件 */
        parts: {
            frame: CombinationParts[]
            mat: CombinationParts[]
            inner_frame: CombinationParts[]
        };
        /*复杂程度 */
        style: CombinationStyle[]
    }

    export interface CombinationParts {
        /*主键编号 */
        id: string;
        /*名称 */
        name: string;
        /*图片 */
        img?: string;
        /*价格 */
        price?: string;
        /*手续费 */
        surcharge?: string;
        /* 制程代码 */
        code?: string;
        /*  */
        referenceType?: string;
        /*  */
        style?: string;
        /* */
        specs?: {
            /* 卡纸的宽度 */
            matWidth?: string;
        }[];
        /*  */
        lengthInInch?: string;
        /*  */
        widthInInch?: string;
        /*  */
        lengthInCm?: string;
        /*  */
        widthInCm?: string;
        /* 是否默认选中 */
        selected?: '0' | '1';
        /* */
        config?: {
            /* 左上角 */
            lt?: string;
            /* 右上角 */
            rt?: string
            /* 左下角 */
            lb?: string;
            /* 右下角 */
            rb?: string;
            /* 上边框 */
            ct?: string;
            /* 下边框 */
            cb?: string;
            /* 左边框 */
            cl?: string;
            /* 右边框 */
            cr?: string
            /* 卡纸颜色 */
            matColor?: string;
            /* 框的宽度 */
            thickness?: string;
            /* 是否可安装卡纸 */
            matSupport?: boolean;
        };
    }

    export interface CombinationStyle {
        id: string
        img: string
        name: string
        complexity: {
            [key: string]: StyleComplexity[]
        }
    }

    export interface StyleComplexity {
        code: string
        id: string
        craftName: string
        styleName: string
        styleId: string
        unitPrice: string
    }

    /* 主题数据对象 */
    export interface ThemeRow {
        /*主键编号 */
        id: string;
        /*父分类编号, 0: 顶级 */
        parentId: string;
        /*名称 */
        name: string;
        /*原图 */
        img: string;
        /*效果图 */
        painting: string;
        /*简介 */
        intro: string;
        /*排序编号 */
        sort: string;
        /*关联画芯编码 */
        reference: ReferenceRow[];
        /* 前端添加的子分类参数 */
        children?: ThemeRow[]
        /* 案例图 */
        samples: SampleRow[];
    }

    /* 关联画芯数据对象 */
    export interface ReferenceRow {
        /*主键编号 */
        id: string;
        /*主题编号 */
        themeId: string;
        /*区间字符串 */
        contentInterval: string;
        /*画芯代码 */
        code: string;
    }

    /* 案例图查询参数 */
    export interface SampleQuery extends IPageQuery {
        /*主题编号 */
        themeId: string;
    }

    /* 案例图数据对象 */
    export interface SampleRow {
        /*主键编号 */
        id: string;
        /*主题编号 */
        themeId: string;
        /*参考图 */
        actualImg: string;
        /*效果图 */
        paintImg: string;
        /*对比图 */
        compareImg: string;
    }
}
