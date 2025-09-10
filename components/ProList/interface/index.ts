export interface ProListProps {
    data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
    requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
    requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
    requestSuccess?: (data: any) => void; // 表格 api 请求成功监听 ==> 非必传
    requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    loadingTime?: number; // 表格数据加载时间 ==> 非必传（默认为200）
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
    scrollAuto?: boolean; // 是否需要加载完成后自动滚动到顶部 ==> 非必传（默认为true）
}
