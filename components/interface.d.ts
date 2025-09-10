export interface PixelType { width: number; height: number; }

export interface HighResViewerType {
    /** 缩略图 */
    thumbnailSrc: string
    /** 高分辨率图（DZI or DeepZoom） */
    dziUrl?: string
    /* 是否显示导航 */
    showNavigator?: boolean
    /** 导航边框颜色 */
    navigatorBorderColor?: string
    constrainDuringPan?: boolean
    /** 最大缩放比例 */
    maxZoomPixelRatio?: number
    /** 可见比例 */
    visibilityRatio?: number
}

export interface ProInfiniteProps {
    data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
    requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
    requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
    requestSuccess?: (data: any) => void; // 表格 api 请求成功监听 ==> 非必传
    requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    loadingTime?: number; // 表格数据加载时间 ==> 非必传（默认为200）
    needGroup?: boolean; // 是否需要分组形成 Map数据结构 ==> 非必传（默认为false）
    groupField?: string; // 分组字段 ==> 非必传（默认为date）
}
