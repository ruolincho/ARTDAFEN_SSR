import type {IProduct} from "~/api/interface/product/product";
import {useCurrencyStore} from "~/stores/modules/currency";
import {packSpecs} from "~/composables/useSpotSpecToken";
import type {JsonLd} from "./interface";
import {imagePrefix} from "../utils";

/**
 * 一个覆盖多区域的国家短清单（可立即上线）；你也可以传入全量国家码替换
 */
export const POP_COUNTRY_CODES = [
    "US", "CA", "MX",
    "GB", "IE", "DE", "FR", "IT", "ES", "NL", "SE", "NO", "DK", "FI", "PL", "AT", "BE", "CH", "PT",
    "AU", "NZ", "JP", "KR", "SG", "HK", "TW",
    "AE", "SA", "IL",
    "BR", "AR", "CL", "CO", "PE", "UY", "EC", "VE",
    "ZA", "NG", "EG", "MA", "KE", "GH", "TN", "DZ", "ET", "TZ"
]

/**
 * 把 /path 转成绝对URL（按需替换实现）
 * @param siteUrl
 * @param path
 */
export function toAbsUrl(siteUrl: string, path: string) {
    if (!path) return ''
    if (/^https?:\/\//i.test(path)) return path
    return siteUrl.replace(/\/+$/, '') + '/' + String(path).replace(/^\/+/, '')
}

/**
 * 把 specs（未知键名）映射为：已识别标准字段 + additionalProperty + variesBy
 * @param specs
 */
function mapSpecs(specs: Record<string, any>) {
    const recognized: Record<string, any> = {}
    const additionalProperty: Array<any> = []
    const variesBy = new Set<string>()

    for (const [rawKey, rawVal] of Object.entries(specs || {})) {
        const key = String(rawKey).trim().toLowerCase()
        const val = typeof rawVal === 'string' ? rawVal : String(rawVal)

        // 识别常见维度（可继续扩展中英文关键词）
        if (key === 'color' || key === '颜色') {
            recognized.color = val
            variesBy.add("https://schema.org/color")
        } else if (key.includes('size') || key.includes('尺寸')) {
            recognized.size = val
            variesBy.add("https://schema.org/size")
        } else if (key === 'material' || key === '材质') {
            recognized.material = val
            variesBy.add("https://schema.org/material")
        } else if (key === 'pattern' || key === '图案') {
            recognized.pattern = val
            variesBy.add("https://schema.org/pattern")
        } else if (key === 'model' || key === '型号') {
            recognized.model = val
            variesBy.add("https://schema.org/model")
        }

        // 全部规格都落入 additionalProperty，保证信息完整
        additionalProperty.push({
            "@type": "PropertyValue",
            "name": rawKey,
            "value": val
        })
    }

    return {recognized, additionalProperty, variesBy: Array.from(variesBy)}
}

/**
 * 核心 composable：
 * - 输入商品详情（带变体）
 * - 输出可直接注入 <script type="application/ld+json"> 的 JSON
 * @param goodsDetail
 * @param options
 */

// ① 报价有效期（例如：今天+30天）
// priceValidUntilDays: 30,
// ② 汇总评分（有数据再写；没有就别传）
// aggregateRating: { ratingValue: 4.7, reviewCount: 126 },
// ③ 最近评价（有数据再写）
// reviews: [
//   { author: 'Emma', ratingValue: 5, reviewBody: 'Lovely quality!', datePublished: '2025-07-12' },
//   { author: 'Noah', ratingValue: 4, reviewBody: 'Color as described.' }
// ],
// ④ shippingRate：方式A（全球统一基准邮费）
// shippingRateUSD: 9.99,
// 或者方式B（按国家设置邮费；会输出多条 OfferShippingDetails）
// shippingRateByCountry: { US: 7.99, GB: 8.99, DE: 8.49, FR: 8.49 }

export function useProductJsonLd(
    goodsDetail: IProduct.Row | null | undefined,
    options: JsonLd.ProductJsonLdOptions = {}
) {
    const runtime = useRuntimeConfig()
    const currencyStore = useCurrencyStore()
    const siteUrl = options.siteUrl || runtime.public?.siteUrl || ''
    const countryCodes = options.countryCodes || POP_COUNTRY_CODES
    const handling = options.handlingDays || {min: 1, max: 3}
    const transit = options.transitDays || {min: 3, max: 12}
    const returnDays = options.returnDays ?? 14
    const restockingFee = options.restockingFee ?? 0.05
    const defaultCurrency = options.currency || currencyStore.currentCurrency || 'USD'
    const priceValidUntilDays = options.priceValidUntilDays ?? 0 // 0 表示不输出
    const agg = options.aggregateRating
    const reviews = options.reviews || []

    // 生成变体URL：默认用 q= 打包逻辑（可被 options.makeVariantUrl 覆盖）
    const makeVariantUrl = options.makeVariantUrl || ((baseId: string | number, specs: Record<string, any>) => {
        const q = packSpecs(Object.entries(specs).map(([name, val]) => ({name, val})))
        return `${siteUrl.replace(/\/+$/, '')}/spot-detail/${baseId}?q=${q}`
    })

    // —— 计算 priceValidUntil ——
    function calcPriceValidUntil(days: number) {
        if (!days || days <= 0) return undefined
        const d = new Date()
        d.setDate(d.getDate() + days)
        return d.toISOString().slice(0, 10) // 仅日期部分 YYYY-MM-DD
    }

    // —— 生成 shippingDetails ——（增加 shippingRate 支持）
    // 方式A：全局统一邮费
    const shippingDetailsGlobal: any = {
        "@context": "https://schema.org/",
        "@type": "OfferShippingDetails",
        "@id": "#shipping_global_standard",
        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": countryCodes },
        "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": { "@type": "QuantitativeValue", "minValue": handling.min, "maxValue": handling.max, "unitCode": "DAY" },
            "transitTime":  { "@type": "QuantitativeValue", "minValue": transit.min,  "maxValue": transit.max,  "unitCode": "DAY" }
        }
    }
    if (typeof options.shippingRateUSD === 'number') {
        shippingDetailsGlobal.shippingRate = { "@type":"MonetaryAmount", "currency":"USD", "value": String(options.shippingRateUSD.toFixed(2)) }
    }

    // 方式B：按国家分组邮费（会额外生成多条 shippingDetails）
    const shippingDetailsByCountry: any[] = []
    if (options.shippingRateByCountry && Object.keys(options.shippingRateByCountry).length) {
        // 按“相同邮费值”把国家聚合起来，减少对象数量
        const groups = new Map<number, string[]>()
        for (const c of countryCodes) {
            const rate = options.shippingRateByCountry[c]
            if (typeof rate === 'number') {
                if (!groups.has(rate)) groups.set(rate, [])
                groups.get(rate)!.push(c)
            }
        }
        let i = 1
        for (const [rate, countries] of groups.entries()) {
            shippingDetailsByCountry.push({
                "@context": "https://schema.org/",
                "@type": "OfferShippingDetails",
                "@id": `#shipping_group_${i++}`,
                "shippingDestination": { "@type": "DefinedRegion", "addressCountry": countries },
                "deliveryTime": shippingDetailsGlobal.deliveryTime,
                "shippingRate": { "@type":"MonetaryAmount", "currency":"USD", "value": String(rate.toFixed(2)) }
            })
        }
    }


    const jsonLd = computed(() => {
        const p = goodsDetail
        if (!p) return null

        // —— 退货政策：客户自付运费 + 5% 上架费 ——
        const returnPolicy = {
            "@context": "https://schema.org/",
            "@type": "MerchantReturnPolicy", // 类型：退货政策
            "@id": "#return_policy_global", // 锚点ID（供 Offer 通过 @id 引用复用）
            "applicableCountry": countryCodes, // 适用国家
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", // 有限退货窗口
            "merchantReturnDays": returnDays, // 可退货天数（窗口长度）
            "returnMethod": "https://schema.org/ReturnByMail", // 退货方式：邮寄退回
            "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility", // 退货费用,消费者自行承担
            "restockingFee": restockingFee // 上架费，5% 上架费
        }

        // —— 全球配送（可省略 shippingRate；运费结算时计算） ——
        const shippingDetailsGlobal = {
            "@context": "https://schema.org/",
            "@type": "OfferShippingDetails", // 类型：运费/时效信息
            "@id": "#shipping_global_standard", // 锚点ID（供 Offer 通过 @id 引用复用）
            "shippingDestination": { // 配送目的地（国家/地区）
                "@type": "DefinedRegion",
                "addressCountry": countryCodes // 目标市场：欧美常见国家
            },
            "deliveryTime": { // 配送时效（备货+运输）
                "@type": "ShippingDeliveryTime",
                "handlingTime": { // 备货时长（商家处理订单）
                    "@type": "QuantitativeValue",
                    "minValue": handling.min,
                    "maxValue": handling.max,
                    "unitCode": "DAY" // 单位：天（ISO 80000 / UN/CEFACT）
                },
                "transitTime": { // 运输时长（物流在途）
                    "@type": "QuantitativeValue",
                    "minValue": transit.min,
                    "maxValue": transit.max,
                    "unitCode": "DAY"
                }
            }
            // 如能提供代表价，可加：
            // ,"shippingRate": { "@type":"MonetaryAmount", "currency": defaultCurrency, "value": "12.99" }
        }

        // —— 变体集合 ——（同页切换）
        const variants = (p.specsCombo ?? []).map((v) => {
            const {recognized, additionalProperty} = mapSpecs(v.specs || {})
            const specPairs = Object.entries(v.specs || {}).map(([k, val]) => `${k}: ${val}`)
            const offer = {
                "@type": "Offer", // 类型：报价
                "url": makeVariantUrl(p.id, v.specs || {}), // 购买URL（需可访问、和页面一致）
                "priceCurrency": defaultCurrency, // 价格币种（ISO 4217）
                "price": Number(v.retailPrice ?? 0).toFixed(2), // 价格（字符串/数字皆可；建议保留两位）
                "availability": (parseInt(String(v.retailStock ?? 0)) > 0) // 库存（使用 Schema.org 标准URL）
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                "itemCondition": "https://schema.org/NewCondition", // 商品成色（新品/二手/翻新等）
                // 如果你使用“按国家邮费”，把所有组都挂上；否则挂全局对象
                "shippingDetails": shippingDetailsByCountry.length
                    ? shippingDetailsByCountry.map((_, idx) => ({ "@id": `#shipping_group_${idx+1}` }))
                    : [{ "@id": "#shipping_global_standard" }], // 引用上面统一的运费对象
                "hasMerchantReturnPolicy": {"@id": "#return_policy_global"} // 引用上面统一的退货对象
            }

            const pvu = calcPriceValidUntil(priceValidUntilDays)
            if (pvu) offer['priceValidUntil'] = pvu

            const variant: any = {
                "@type": "Product",
                "name": [p.title, ...specPairs].filter(Boolean).join(' - '), // 变体展示名（建议包含父标题 + 关键属性）
                "description": p.description || p.name, // 变体描述（可读友好、与页面一致）
                "image": imagePrefix(v.img), // 变体图片（绝对URL；多张更好）
                "offers": offer, // 绑定该变体的报价信息
                ...(v.id ? {"sku": String(v.id)} : {}), // SKU（强烈推荐，唯一）
                ...(v.gtin ? {"gtin13": v.gtin} : {}),
                ...(v.mpn ? {"mpn": v.mpn} : {}),
                ...("color" in recognized ? {"color": recognized.color} : {}),
                ...("size" in recognized ? {"size": recognized.size} : {}),
                ...("material" in recognized ? {"material": recognized.material} : {}),
                ...("pattern" in recognized ? {"pattern": recognized.pattern} : {}),
                ...("model" in recognized ? {"model": recognized.model} : {}),
                ...(additionalProperty.length ? {"additionalProperty": additionalProperty} : {})
            }
            return variant
        })

        // —— variesBy：自动汇总所有变体中识别到的标准维度 ——（没有就不写）
        const variesBySet = new Set<string>()
        for (const v of (p.specsCombo ?? [])) {
            mapSpecs(v.specs || {}).variesBy.forEach(url => variesBySet.add(url))
        }
        const variesByArr = Array.from(variesBySet)

        const productGroup: any = {
            "@context": "https://schema.org/",
            "@type": "ProductGroup", // 类型：商品组（用于聚合变体）
            "name": p.title, // 父级名称（商品主标题）
            "description": p.description || p.name, // 父级描述（可读友好、与页面一致）
            "url": `${siteUrl.replace(/\/+$/, '')}/spot-detail/${p.id}`, // 此商品详情页的规范URL（canonical）
            ...(p.brand ? {
                "brand": {
                    "@type": "Brand",
                    "name": (typeof p.brand === 'string' ? p.brand : p.brand.name)
                }
            } : {}),
            "productGroupID": String(p.id), // 变体组ID（稳定且唯一；无则用商品ID兜底）
            "hasVariant": variants // 具体的变体列表（每项是一个 Product）
        }

        if (variesByArr.length) productGroup.variesBy = variesByArr // 该商品有哪些“变体维度”

        // 汇总评分（有数据才写）
        if (agg && typeof agg.ratingValue === 'number' && typeof agg.reviewCount === 'number') {
            productGroup.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": agg.ratingValue,
                "reviewCount": agg.reviewCount
            }
        }

        // 最近评价（有数据才写）
        if (reviews.length) {
            productGroup.review = reviews.map(r => ({
                "@type": "Review",
                "author": { "@type": "Person", "name": r.author },
                ...(r.datePublished ? { "datePublished": r.datePublished } : {}),
                "reviewRating": { "@type": "Rating", "ratingValue": r.ratingValue },
                ...(r.reviewBody ? { "reviewBody": r.reviewBody } : {})
            }))
        }

        // 返回数组：Google 支持同一 <script> 中输出多个 JSON-LD 对象（shipping 可能是“全局1条 + 每国分组若干条”）
        return [productGroup, ...(shippingDetailsByCountry.length ? shippingDetailsByCountry : [shippingDetailsGlobal]), returnPolicy]
    })

    /** 便捷方法：直接把 JSON-LD 注入到 <head>（SSR/CSR均可） */
    function injectProductJsonLd() {
        useHead({
            script: [
                {
                    type: 'application/ld+json',
                    key: 'product-jsonld',
                    innerHTML: JSON.stringify(jsonLd.value)
                }
            ]
        })
    }

    return {jsonLd, injectProductJsonLd}
}
