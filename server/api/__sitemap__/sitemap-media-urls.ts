import type { SitemapUrlInput } from "@nuxtjs/sitemap";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {MEDIA_SIZE} from "~/config";
import type {IResultData} from "~/api/interface";
import {CODE_SUCCESS} from "~/api/helper";

interface MediaCount {
    newPageSize: string
    blogPageSize: string
}

export default defineSitemapEventHandler(async () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase
    let newsTotalPages = 1
    let blogTotalPages = 1

    const sitemapLinks: SitemapUrlInput[] | PromiseLike<SitemapUrlInput[]> = []

    try {
        const response = await $fetch<IResultData<MediaCount>>(`${baseURL}${TRADE_MODULE}/site/media/${MEDIA_SIZE}`)
        const {data = {
            newPageSize: '',
            blogPageSize: ''
        }, status} = response
        if (status === CODE_SUCCESS) {
            newsTotalPages = parseInt(data.newPageSize) || 1
            blogTotalPages = parseInt(data.blogPageSize) || 1
            for (let i = 2; i <= newsTotalPages; i++) {
                sitemapLinks.push({
                    loc: `/magazine/${i}`,
                    changefreq: 'daily',
                    priority: 0.8
                })
            }
            for (let i = 2; i <= blogTotalPages; i++) {
                sitemapLinks.push({
                    loc: `/journal/${i}`,
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