import { reactive, computed, toRefs } from 'vue';
import type {ProList} from "~/composables/interface";
import { scrollTo } from '~/utils/scrollTo'

/**
 * @description pagination 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * @param {Function} requestError 对请求数据错误处理的方法 (非必传)
 * @param loadingTime loading 延迟时间 (非必传，默认为 0 ms)
 * @param {Function} requestSuccess 对请求数据成功处理的方法 (非必传)
 * @param {Boolean} scrollAuto 是否自动滚动到顶部 (非必传，默认为 false)
 * */
export const useList = (
    api?: (params: any) => Promise<any>,
    initParam: object = {},
    isPageable: boolean = true,
    dataCallBack?: (data: any) => any,
    requestError?: (params: any) => void,
    loadingTime?: number,
    requestSuccess?: (data: any) => void,
    scrollAuto?: boolean,
    customizeCurrentChange?: (val: number) => void, // 分页组件当前页码改变监听（没有就使用默认的） ==> 非必传
) => {
    const state = reactive<ProList.StateProps>({
        // 表格数据
        tableData: [],
        // 分页数据
        pageable: {
            // 当前页数
            pageNum: 1,
            // 每页显示条数
            pageSize: 10,
            // 总条数
            total: 0
        },
        // 总参数(包含分页和查询参数)
        totalParam: {},
        loading: false,
        requestFinished: false,
        error: null
    });

    /**
     * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
     * */
    const pageParam = computed({
        get: () => {
            return {
                page: state.pageable.pageNum,
                size: state.pageable.pageSize
            };
        },
        set: newVal => {
            console.log('我是分页更新之后的值', newVal);
        }
    });

    /**
     * @description 获取表格数据
     * @return void
     * */
    const getTableList = async () => {
        if (!api) return;
        state.loading = true;
        state.requestFinished = false;
        state.error = null
        try {
            await delayLoading(loadingTime);
            // 先把初始化参数和分页参数放到总参数里面
            Object.assign(state.totalParam, isPageable ? pageParam.value : {}, initParam);
            let { data } = await api({ ...state.totalParam });
            dataCallBack && (data = dataCallBack(data));
            if (typeof data === 'object' && Object.keys(data).length === 0) {
                state.tableData = isPageable ? data.records : [];
            } else {
                state.tableData = isPageable ? data.records : data;
            }
            // 解构后台返回的分页数据
            const { current: pageNum, size: pageSize, total } = data;
            updatePageable({ pageNum, pageSize, total });
            requestSuccess && requestSuccess(data);
        } catch (error) {
            state.error = error
            requestError && requestError(error);
        }
        finally {
            state.loading = false;
            state.requestFinished = true;
        }
    };

    /**
     * @description 更新分页信息
     * @param {Object} pageable 后台返回的分页数据
     * @return void
     * */
    const updatePageable = (pageable: ProList.Pageable) => {
        Object.assign(state.pageable, pageable);
    };

    /**
     * @description 表格数据查询
     * @param {Boolean} initPage 是否初始化分页参数 (非必传，默认为true)
     * @return void
     * */
    const search = (initPage: boolean = true) => {
        if (initPage) state.pageable.pageNum = 1;
        getTableList();
    };

    /**
     * @description 表格数据重置
     * @return void
     * */
    const reset = () => {
        state.pageable.pageNum = 1;
        // TODO: 重置表格数据，等待处理
        getTableList();
    };

    /**
     * @description 每页条数改变
     * @param {Number} val 当前条数
     * @return void
     * */
    const handleSizeChange = (val: number) => {
        state.pageable.pageNum = 1;
        state.pageable.pageSize = val;
        if (scrollAuto) {
            scrollTo(0, 100)
        }
        getTableList();
    };

    /**
     * @description 当前页改变
     * @param {Number} val 当前页
     * @return void
     * */
    const handleCurrentChange = customizeCurrentChange
    ? (val: number) => {
        customizeCurrentChange(val);   // 直接使用外部传入的方法
        if (scrollAuto) {
            scrollTo(0, 100)
        }
    }
    : (val: number) => {
        state.pageable.pageNum = val;
        if (scrollAuto) {
            scrollTo(0, 100)
        }
        getTableList();
    };

    /**
     * @description 延迟加载
     * @param loadingTime
     */
    const delayLoading = async (loadingTime: number | undefined) => {
        const defaultLoadingTime = 0; // 默认的 loading 延迟时间为0秒
        let actualLoadingTime = loadingTime;
        // 判断 loadingTime 是否为特殊参数
        if (typeof loadingTime === 'undefined' || loadingTime === null || loadingTime === -1) {
            actualLoadingTime = defaultLoadingTime;
        }
        // 等待 loading 延迟时间
        await new Promise(resolve => setTimeout(resolve, actualLoadingTime));
    };

    return {
        ...toRefs(state),
        getTableList,
        search,
        reset,
        handleSizeChange,
        handleCurrentChange,
    };
};
