import {MEDIA_SIZE} from "~/config";
import type {IPage, IResultData} from "~/api/interface";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useUserStore} from "~/stores/modules/user";

export interface SeoOptions {
    title?: string | Ref<string>;
    description?: string | Ref<string>;
    keywords?: string | Ref<string>;
}

interface PaginationOptions<ItemType, FilterType> {
    apiPath: string,
    baseRoute: string,
    uniqueKey: string,
    callBack?: (data: ItemType[]) => void;
    pageSize?: number | Ref<number>; // 支持动态改变每页数量
    filterParams?: Ref<FilterType> | (() => FilterType); // 额外的筛选参数 (响应式)
    seo?: SeoOptions | Ref<SeoOptions> | (() => SeoOptions); // SEO 配置
}

export const useSeoPaginationLogic = async <ItemType, FilterType = Record<string, any>>(
    options: PaginationOptions<ItemType, FilterType>
) => {
    const {
        apiPath,
        baseRoute,
        uniqueKey,
        callBack,
        filterParams,
        pageSize = MEDIA_SIZE,
        seo
    } = options;

    const route = useRoute()
    const origin = useRequestURL().origin
    const currencyStore = useCurrencyStore();
    const userStore = useUserStore()

    // 解析当前页码，如果 param 不存在则为 1，否则解析数字
    const currentPage = computed(() => {
        const pParam = route.params.page

        // 情况A: /xxx (走index.vue) -> pParam 是 undefined
        if (!pParam) return 1

        // 情况B: /xxx/2 (走[page].vue) -> pParam 是 string
        const p = Number(pParam)
        return Number.isFinite(p) && p >= 1 ? Math.floor(p) : 1
    })

    // 请求列表数据
    const size = computed(() => toValue(pageSize));

    // 先调用 useAsyncData 但不立即 await，而是先拿到返回的 Promise 对象
    const asyncDataPromise =  useAsyncData(
        `${uniqueKey}-${currentPage.value}`,
        async () => {
            const config = useRuntimeConfig()
            const extraBody = filterParams ? toValue(filterParams) : {}; // 获取当前的筛选参数值
            const {data} = await $fetch<IResultData<IPage<ItemType>>>(config.public.apiBase + apiPath, {
                method: 'POST',
                body: {
                    page: currentPage.value,
                    size: size.value,
                    ...extraBody // 合并筛选参数到 Body 中
                },
                headers: {
                    'Token': userStore.token || '',
                    'X-Currency': currencyStore.currentCurrency
                }
            })
            callBack && callBack(data.records)
            return data
        },
        {
            watch: [
                currentPage,
                () => toValue(filterParams),
                () => toValue(pageSize)
            ],
            lazy: true,
            server: true,
            default: () => ({
                current: currentPage.value,
                pages: 0,
                records: [] as ItemType[], // 这里的类型断言很重要
                size: size.value,
                total: 0,
            }),
        }
    )

    // 立即解构出响应式数据（此时数据可能还未返回，但 Ref 已经存在）
    const {data: pageData, pending, refresh, error} = asyncDataPromise

    // 计算 SEO 链接逻辑 (核心部分)
    const totalPages = computed(() => Math.ceil((pageData.value?.total || 0) / size.value))
    const hasPrev = computed(() => currentPage.value > 1)
    const hasNext = computed(() => currentPage.value < totalPages.value)

    // 处理 baseRoute，解包可能的 Ref 类型
    const currentBaseRoute = computed(() => toValue(baseRoute));

    // 当前页 URL
    const selfUrl = computed(() =>
        currentPage.value === 1
            ? `${origin}${currentBaseRoute.value}`
            : `${origin}${currentBaseRoute.value}/${currentPage.value}`
    )

    const canonicalUrl = computed(() =>`${origin}${currentBaseRoute.value}`)

    // 上一页 URL
    const prevUrlAbs = computed(() => {
        if (!hasPrev.value) return null
        // 如果当前是第2页，上一页就是 /news (不要写成 /news/1)
        return currentPage.value - 1 === 1
            ? `${origin}${currentBaseRoute.value}`
            : `${origin}${currentBaseRoute.value}/${currentPage.value - 1}`
    })

    // 下一页 URL
    const nextUrlAbs = computed(() => {
        if (!hasNext.value) return null
        return `${origin}${currentBaseRoute.value}/${currentPage.value + 1}`
    })

    // 无论外部传的是 () => toValue(seoInfo)、ref(seoInfo) 还是普通对象，这里都统一转换为一个响应式的 computed 对象
    const seoState = computed(() => {
        if (!seo) return null;
        return toValue(seo);
    });

    // useHead 在这里同步调用，因为 pageData 是响应式的 Ref，当下面 await 结束数据更新时，useHead 会自动重新计算并更新 Meta 标签。
    useHead({
        title: computed(() => {
            const s = seoState.value;
            if (!s?.title) return undefined;
            const rawTitle = toValue(s.title);
            return currentPage.value <= 1 ? rawTitle : `${rawTitle} - Page ${currentPage.value}`
        }),
        link: [
            {rel: 'canonical', href: canonicalUrl},
            ...(prevUrlAbs.value ? [{rel: 'prev', href: prevUrlAbs.value}] : []),
            ...(nextUrlAbs.value ? [{rel: 'next', href: nextUrlAbs.value}] : []),
        ],
        meta: [
            {name: 'robots', content: 'index,follow'},
            {name: 'og:url', content: selfUrl},
            ...(seoState.value?.description ? [{
                name: 'description',
                content: computed(() => {
                    const s = seoState.value;
                    if (!s?.description) return undefined;
                    const rawDesc = toValue(s.description);
                    return currentPage.value <= 1 ? rawDesc : `${rawDesc} (Page ${currentPage.value})`
                })
            }] : []),
            ...(seoState.value?.keywords ? [{
                name: 'keywords',
                content: computed(() => {
                    const s = seoState.value;
                    if (!s?.keywords) return undefined;
                    return toValue(s.keywords);
                })
            }] : []),
        ]
    })

    // 最后再 await 数据请求，这样确保 SSR 会等待数据加载完成再渲染 HTML，同时避免了 useHead 的上下文丢失问题
    await asyncDataPromise

    /*-----------正确写法：startFetch -> useHead (依赖响应式数据) -> await fetchResult (阻塞渲染直到完成)----------*/

    return {
        currentPage,
        totalPages,
        pageData,
        hasPrev,
        hasNext,
        pending,
        refresh,
        error
    }
}