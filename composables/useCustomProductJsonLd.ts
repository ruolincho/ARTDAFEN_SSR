import { computed } from 'vue'
import type {IProduct} from "~/api/interface/product/product";
import type {JsonLd} from "~/composables/interface";
import {POP_COUNTRY_CODES} from "~/composables/useProductJsonLd";
import {useCurrencyStore} from "~/stores/modules/currency";
import {useImage} from "~/composables/useImage";

export function useCustomProductJsonLd(
    goodsDetail: IProduct.Row | null | undefined,
    options: JsonLd.ProductJsonLdOptions = {}
) {
    const runtime = useRuntimeConfig()
    const currencyStore = useCurrencyStore()
    const { imagePrefix } = useImage()
    const siteUrl = options.siteUrl || runtime.public?.siteUrl || ''
    const isGlobal = options.isGlobal ?? true
    const countryCodes = options.countryCodes || POP_COUNTRY_CODES
    const handling = options.handlingDays || {min: 5, max: 10}
    const transit = options.transitDays || {min: 5, max: 10}
    const returnDays = options.returnDays ?? 14
    const restockingFee = options.restockingFee ?? 0
    const defaultCurrency = options.currency || currencyStore.currentCurrency || 'USD'
    const priceValidUntilDays = options.priceValidUntilDays ?? 30 // 0 表示不输出
    const agg = options.aggregateRating
    const reviews = options.reviews || []

    // —— 计算 priceValidUntil ——
    function calcPriceValidUntil(days: number) {
        if (!days || days <= 0) return undefined
        const d = new Date()
        d.setDate(d.getDate() + days)
        return d.toISOString().slice(0, 10) // 仅日期部分 YYYY-MM-DD
    }


    const jsonLd = computed(() => {
        const p = goodsDetail
        if (!p) return null

        // —— 退货政策：客户自付运费 + 5% 上架费 ——
        const returnPolicy = {
            "@context": "https://schema.org/",
            "@type": "MerchantReturnPolicy", // 类型：退货政策
            "@id": "#return_policy_global", // 锚点ID（供 Offer 通过 @id 引用复用）
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", // 有限退货窗口
            "merchantReturnDays": returnDays, // 可退货天数（窗口长度）
            "returnMethod": "https://schema.org/ReturnByMail", // 退货方式：邮寄退回
            "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility", // 退货费用,消费者自行承担
            "restockingFee": restockingFee, // 上架费，5% 上架费
            //  如果不是全球通用，才加上适用国家限制
            ...(!isGlobal && countryCodes.length > 0 ? { applicableCountry: countryCodes } : {})
        }

        // —— 配送政策（可省略 shippingRate；运费结算时计算） ——
        const shippingDetailsGlobal = {
            "@context": "https://schema.org/",
            "@type": "OfferShippingDetails", // 类型：运费/时效信息
            "@id": "#shipping_global_standard", // 锚点ID（供 Offer 通过 @id 引用复用）
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
            },
            "shippingRate": { "@type":"MonetaryAmount", "currency": defaultCurrency, "value": "0.00" },
            // 如果不是全球通用，才加上配送目的地限制
            ...(!isGlobal && countryCodes.length > 0 ? { shippingDestination: { "@type": "DefinedRegion", "addressCountry": countryCodes }} : {})
        }

        // 商品详情
        const product: any = {
            "@context": "https://schema.org/",
            "@type": "Product",  // 类型：产品
            "name": p.title, // 父级名称（商品主标题）
            "sku": p.id, // 商品SKU
            "brand": {"@type": "Brand", "name": "ARTDAFEN"},
            "image": imagePrefix(p.img.split('?')[0]), // 商品图片
            "keywords": p.keywords, // 商品关键词
            "description": p.description, // 商品描述（可读友好、与页面一致）
            "url": `${siteUrl.replace(/\/+$/, '')}/paint-detail/${p.id}/${p.slug}`, // 此商品详情页的规范URL（canonical）
            "offers": {
                "@type": "Offer",  // 类型：报价
                "priceCurrency": defaultCurrency, // 价格币种（ISO 4217）
                "price": Number(p.retailPrice ?? 0).toFixed(2), // 价格（字符串/数字皆可；建议保留两位）
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "shippingDetails":[{"@id": "#shipping_global_standard"}], // 引用上面统一的运费对象
                // "hasMerchantReturnPolicy": {"@id": "#return_policy_global"} // 引用上面统一的退货对象
            },
            "additionalProperty": [
                {
                    "@type": "PropertyValue",
                    "name": "Size",
                    "value": "Customizable sizes available"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Frame",
                    "value": "With frame or frameless options"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Material",
                    "value": "High-quality materials"
                }
            ],
        }

        const pvu = calcPriceValidUntil(priceValidUntilDays)
        if (pvu) product.offers['priceValidUntil'] = pvu

        // 汇总评分（有数据才写）
        if (agg && typeof agg.ratingValue === 'number' && typeof agg.reviewCount === 'number') {
            product.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": agg.ratingValue,
                "reviewCount": agg.reviewCount
            }
        }

        // 最近评价（有数据才写）
        if (reviews.length) {
            product.review = reviews.map(r => ({
                "@type": "Review",
                "author": {"@type": "Person", "name": r.author},
                ...(r.datePublished ? {"datePublished": r.datePublished} : {}),
                "reviewRating": {"@type": "Rating", "ratingValue": r.ratingValue},
                ...(r.reviewBody ? {"reviewBody": r.reviewBody} : {})
            }))
        }

        // 返回数组：Google 支持同一 <script> 中输出多个 JSON-LD 对象（shipping 可能是“全局1条 + 每国分组若干条”）
        return [product, shippingDetailsGlobal, returnPolicy]
    })

    /** 便捷方法：直接把 JSON-LD 注入到 <head>（SSR/CSR均可） */
    function injectProductJsonLd() {
        useHead({
            script: [
                {
                    type: 'application/ld+json',
                    key: 'custom-product-jsonld-',
                    innerHTML: JSON.stringify(jsonLd.value)
                }
            ]
        })
    }

    return {jsonLd, injectProductJsonLd}
}