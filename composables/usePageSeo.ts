import {useHead} from '@unhead/vue'
import type {Seo} from "~/composables/interface";

export function usePageSeo(params: Seo.Props) {
    const {
        title,
        description,
        keywords = '',
        ogImage = '',
        ogUrl = 'https://artdafen.com',
        ogType = 'website',
    } = params
    useHead({
        title,
        meta: [
            {name: 'description', content: description},
            {name: 'keywords', content: keywords},
            {property: 'og:title', content: title},
            {property: 'og:description', content: description},
            {property: 'og:type', content: ogType},
            {property: 'og:url', content: ogUrl},
            ...(ogImage ? [{property: 'og:image', content: ogImage}] : []),
        ],
    })
}
