import { reactive, computed, toRefs } from 'vue';
import type {ProInfinite} from "~/composables/interface";

/**
 * @description pagination 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} needGroup 是否需要分组形成 Map数据结构 (非必传，默认为false)
 * @param {String} groupField 分组字段 (非必传，默认为date)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * @param {Function} requestError 对请求数据错误处理的方法 (非必传)
 * @param loadingTime loading 延迟时间 (非必传，默认为 0 ms)
 * @param {Function} requestSuccess 对请求数据成功处理的方法 (非必传)
 * */
export const useInfinite = (
    api?: (params: any) => Promise<any>,
    initParam: object = {},
    needGroup: boolean = false,
    groupField: string = 'date',
    dataCallBack?: (data: any) => any,
    requestError?: (params: any) => void,
    loadingTime?: number,
    requestSuccess?: (data: any) => void,
) => {
    const state = reactive<ProInfinite.StateProps>({
        // 表格数据
        tableData: needGroup ? new Map() : [],
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
        loaded: false,
        requestFinished: false,
    });

    let observer: IntersectionObserver | null = null;

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

        if (!api || state.loading || state.loaded) return;
        state.loading = true;
        state.requestFinished = false;
        try {
            await delayLoading(loadingTime);
            // 先把初始化参数和分页参数放到总参数里面
            Object.assign(state.totalParam, pageParam.value, initParam);

            let { data } = await api({ ...state.totalParam });
            dataCallBack && (data = dataCallBack(data));

            // 解构后台返回的分页数据
            const { current: pageNum, size: pageSize, total, records } = data;

            if (pageNum * pageSize >= total) {
                state.loaded = true;
                stopObserver();
            }

            // 不需要分组
            if (!needGroup) {
                (state.tableData as Array<any>).push(...records)
            }
            // 需要分组
            else {
                records.forEach((record: any) => {
                    const index = record[groupField] || 'default';
                    const has = (state.tableData as Map<any, any>).has(index)
                    if (has) {
                        (state.tableData as Map<any, any>).get(index)?.push(record)
                    } else {
                        (state.tableData as Map<any, any>).set(index, [record])
                    }
                })
            }

            requestSuccess && requestSuccess(data);
            updatePageable({ pageNum: pageNum + 1, pageSize, total });
        } catch (error) {
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
    const updatePageable = (pageable: ProInfinite.Pageable) => {
        Object.assign(state.pageable, pageable);
    };

    /**
     * @description 表格数据查询
     * @return void
     * */
    const search = () => {
        state.pageable.pageNum = 1;
        getTableList();
    };

    /**
     * @description 初始化交叉观察器（用于无限滚动加载）
     * 1. 获取目标元素
     * 2. 创建IntersectionObserver实例监听元素进入视口
     * 3. 当目标元素进入视口时触发数据加载
     * 4. 配置观察器参数（阈值10%可见即触发）
     * 5. 开始观察目标元素
     */
    const initObserver = (el: HTMLElement | null) => {
        if (!el) return;
        stopObserver();
        observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                getTableList();
            }
        }, {
            threshold: 0.1, // 露出10%就触发
        });

        observer.observe(el);
    };

    /**
     * @description 停止交叉观察器
     * 1. 如果存在观察器实例则执行断开连接操作
     * 2. 将观察器实例置空释放资源
     * @return void
     */
    const stopObserver = () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
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
     * @description 清空所有数据和状态
     * @return void
     */
    const clear = () => {
        state.tableData = needGroup ? new Map() : [];
        state.pageable = {
            pageNum: 1,
            pageSize: 10,
            total: 0
        };
        state.loading = false;
        state.loaded = false;
        stopObserver();
        Object.assign(state.totalParam, initParam);
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
        clear,
        initObserver,
        stopObserver,
    };
};
