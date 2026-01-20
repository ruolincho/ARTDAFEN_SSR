import type { SitemapUrlInput } from "@nuxtjs/sitemap";
import { generateTitle2Slug } from '~/utils'

export default defineSitemapEventHandler(async () => {
    const letters = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    )

    const customPaintCase = [
        { id: 1, name: 'People' },
        { id: 2, name: 'Animal' },
        { id: 3, name: 'Still Life / Scenery' },
        { id: 4, name: 'Vehicle' },
        { id: 5, name: 'Building' },
    ]

    const sitemapLinks: SitemapUrlInput[] | PromiseLike<SitemapUrlInput[]> = []

    letters.forEach(letter => {
        sitemapLinks.push({
            loc: `/artists-all/${letter}`,
            changefreq: 'weekly',
            priority: 0.7,
        })
    })

    customPaintCase.forEach(item => {
        const slug = generateTitle2Slug(item.name)
        sitemapLinks.push({
            loc: `/custom-case/${item.id}/${slug}`,
            changefreq: 'weekly',
            priority: 0.7,
        })
    })

    return sitemapLinks
})