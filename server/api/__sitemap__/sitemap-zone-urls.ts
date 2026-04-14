import type { SitemapUrlInput } from "@nuxtjs/sitemap";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {ZONE_DETAIL_SIZE, ZONE_LIST_SIZE} from "~/config";
import type {IResultData} from "~/api/interface";
import {CODE_SUCCESS} from "~/api/helper";

interface MediaCount {
    detail: {
        zoneId: string
        slug: string
        totalPage: string
    }[]
    totalPage: string
}

export default defineSitemapEventHandler(async () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase
    const sitemapLinks: SitemapUrlInput[] | PromiseLike<SitemapUrlInput[]> = []
    try {
        const response = await $fetch<IResultData<MediaCount>>(`${baseURL}${TRADE_MODULE}/site/zone`, { method: 'GET', query: { listSize: ZONE_LIST_SIZE, detailSize: ZONE_DETAIL_SIZE} })
        const {data, status} = response

        if (status === CODE_SUCCESS && data) {
            const detail = data.detail || []
            const totalPage = parseInt(data.totalPage) || 1
            if (detail.length) {
                detail.forEach(item => {
                    const totalPage = Number(item.totalPage) || 1

                    sitemapLinks.push({
                        loc: `/zone-detail/${item.zoneId}/${item.slug}`,
                        changefreq: 'daily',
                        priority: 1.0
                    })

                    for (let i = 2; i <= totalPage; i++) {
                        sitemapLinks.push({
                            loc: `/zone-detail/${item.zoneId}/${item.slug}/${i}`,
                            changefreq: 'daily',
                            priority: 0.8
                        })
                    }
                })
            }

            for (let i = 2; i <= totalPage; i++) {
                sitemapLinks.push({
                    loc: `/zone/${i}`,
                    changefreq: 'daily',
                    priority: 0.8
                })
            }


        } else {
            console.warn('[Sitemap] 接口返回状态非 200 或 data 为空')
        }
    } catch (error) {
        console.error('【Sitemap Error】请求失败:', error)
    }

    return sitemapLinks
})