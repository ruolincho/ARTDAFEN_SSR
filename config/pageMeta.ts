import {ArtCodeEnum} from "~/types/enumeration";
import {mergeWith} from "lodash-es";
import type { UseHeadInput } from '@unhead/vue';

type ArtistAllParams = string;
type CustomPaintParams = ArtCodeEnum;

export const pageMeta = {
    "/": () => ({
        title: "ART DAFEN | Museum-Quality Hand-Painted Oil Painting Reproductions",
        meta: [
            {
                name: "description",
                content:
                    "Framed prints, custom framing and museum-quality reproductions at Artdafen — buy art online: canvas prints, oil painting reproductions, ready-to-hang wall art and limited edition artist collectibles."
            },
            {
                name: "keywords",
                content:
                    "Artdafen, buy art online, framed prints, canvas prints, custom framing, oil painting reproductions, wall art, framed wall art, limited edition prints, art prints for sale, " +
                    "Artdafen, deviantart, arte, gallery, pixel art, draw, installation art examples, art and craft project ideas, drawing, artstation, drawings"
            }
        ],
    }),

    "/about": () => ({
        title: "About - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "About Artdafen — our studio collaborates with Dafen-trained artists to create custom reproductions, hand-finished prints and framing services. Learn about quality, sourcing and commissions."
            },
            {
                name: "keywords",
                content:
                    "about Artdafen, Dafen artists, art studio, artist collaborations, commissions, custom reproductions, sourcing prints"
            }
        ],
    }),

    "/artists-all": (letter: ArtistAllParams) => ({
        title: `Artists starting with ${letter} - ART DAFEN"`,
        meta: [
            {
                name: "description",
                content:
                    `Artists directory with ${letter} — discover portfolios, prints and commission options from Artdafen artists: oil painters, printmakers, pixel artists and collectible toy designers.`
            },
            {
                name: "keywords",
                content:
                    "artist directory, artist profiles, oil painters, printmakers, pixel artists, collectible toy artists, commission artists, portfolios"
            }
        ],
    }),

    "/artists-brief": () => ({
        title: "Artists - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Short artist briefs — quick overviews of featured makers, popular prints and framing/proofing options for each artist's works."
            },
            {
                name: "keywords",
                content:
                    "artist briefs, featured artists, quick profiles, artist highlights, popular prints"
            }
        ],
    }),

    "/artists-top": () => ({
        title: "Top Artists - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Top artists — curated best-sellers and trending creators on Artdafen with gallery-quality prints, limited editions and collectible pieces."
            },
            {
                name: "keywords",
                content:
                    "top artists, best selling artists, trending artists, limited edition prints, gallery quality, collectible art"
            }
        ],
    }),

    "/best": () => ({
        title: "Best Sellers - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Best sellers — shop Artdafen's most popular framed prints, canvas reproductions and art collectibles chosen by customers and curators."
            },
            {
                name: "keywords",
                content:
                    "best sellers, popular prints, customer favorites, top framed art, trending prints"
            }
        ],
    }),

    "/journal": () => ({
        title: "Blog - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Artdafen Blog — framing guides, artist interviews, how-to tutorials and trend reports on prints, installation art and Dafen painting techniques."
            },
            {
                name: "keywords",
                content:
                    "art blog, framing guide, artist interview, art tutorials, installation art examples, Dafen news, print trends"
            }
        ],
    }),

    "/collaboration": () => ({
        title: "Collaboration - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Collaborations — partner with Artdafen for branded prints, gallery projects, custom editions and design-led framing solutions."
            },
            {
                name: "keywords",
                content:
                    "collaboration, partnerships, branded prints, gallery projects, custom editions, wholesale, interior design"
            }
        ],
    }),

    "/contact": () => ({
        title: "Contact - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Contact Artdafen — support for orders, custom framing, proofs, commissions and wholesale inquiries. Reach our team for production and shipping details."
            },
            {
                name: "keywords",
                content:
                    "contact Artdafen, customer support, order help, custom framing inquiry, commissions, wholesale inquiries"
            }
        ],
    }),

    "/cookies-policy": () => ({
        title: "Cookies & Tracking - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Cookies & tracking — how Artdafen uses cookies for personalization, analytics and advertising on artdafen.com."
            },
            {
                name: "keywords",
                content:
                    "cookies policy, tracking, analytics, user consent, privacy"
            }
        ],
    }),

    "/custom-paint": (code: CustomPaintParams) => {
        const commonMap: Partial<Record<ArtCodeEnum, UseHeadInput>> = {
            [ArtCodeEnum.Painting]: {
                title: 'Custom Hand-Painted Oil Paintings | Portrait & Masterpiece Reproduction | ArtDafen',
                meta: [
                    {name: "description", content: "Order your own hand-painted custom oil painting from professional artists. Whether it’s a portrait, pet, or reproduction of a famous masterpiece, each piece is crafted with museum-quality detail and brushwork."},
                    {name: "keywords", content: "custom oil painting, hand-painted art, portrait painting, oil painting reproduction, famous painting replica, custom canvas art"}
                ]
            },
            [ArtCodeEnum.Prints]: {
                title: 'Printed Custom Paintings | Professional Canvas Reproduction | ArtDafen',
                meta: [
                    {name: "description", content: "Discover our printed custom painting service for precise art reproductions. Using professional-grade printing on premium canvas, we deliver museum-quality details and vibrant colors—ideal for décor, art collections, or gallery displays."},
                    {name: "keywords", content: "printed custom painting, canvas reproduction, art print on canvas, digital painting print, high-quality art reproduction, print to canvas"}
                ]
            },
            [ArtCodeEnum.Certificates]: {
                title: 'Custom Certificate Printing with 3D Texture | Personalized Art Certificate | ArtDafen',
                meta: [
                    {
                        name: "description",
                        content: "Upload your own certificate and turn it into a textured masterpiece. ArtDafen provides professional certificate printing with 3D relief texture for a premium, artistic finish—perfect for collectors, artists, and institutions looking to display authenticity with style."
                    },
                    {name: "keywords", content: "custom oil painting, hand-painted art, portrait painting, oil painting reproduction, famous painting replica, custom canvas art"}
                ]
            }
        };
        return commonMap[code] || {};
    },

    "/faq": () => ({
        title: "FAQ - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "FAQ — answers about ordering, framing, proof approvals, shipping times, returns and working with Dafen artists."
            },
            {
                name: "keywords",
                content:
                    "FAQ, ordering, framing FAQ, proofing, shipping, returns, Dafen artists"
            }
        ],
    }),

    "/forget-password": () => ({
        title: "Password Recovery - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Password recovery — securely reset your Artdafen account password to manage orders, commissions and saved favorites."
            },
            {
                name: "keywords",
                content:
                    "password reset, account recovery, login help"
            }
        ],
    }),

    "/magazine": () => ({
        title: "News - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "News & announcements — Artdafen releases, exhibitions, artist drops and Dafen community updates. Stay informed on new products and promotions."
            },
            {
                name: "keywords",
                content:
                    "news, announcements, artist drops, exhibitions, Dafen news, product launches, promotions"
            }
        ],
    }),

    "/notice": () => ({
        title: "Notice - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Site notices — important updates on service changes, scheduled maintenance and customer notices from Artdafen."
            },
            {
                name: "keywords",
                content:
                    "site notice, maintenance, service update, customer announcement"
            }
        ],
    }),

    "/privacy-policy": () => ({
        title: "Privacy & Policy - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Privacy policy — how Artdafen collects, stores and uses personal data, payment details, and browsing information; your rights and contact details."
            },
            {
                name: "keywords",
                content:
                    "privacy policy, data protection, GDPR, personal data, user rights"
            }
        ],
    }),

    "/product": () => ({
        title: "Products - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Products — framed prints, canvas reproductions, originals and designer collectibles with online framing and proof preview. Shop by style, size and finish."
            },
            {
                name: "keywords",
                content:
                    "products, framed prints, canvas reproductions, online framing, proof preview, original art, limited edition prints, buy art online"
            }
        ],
    }),

    "/search": () => ({
        title: "Search - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Search Artdafen — quickly find prints, artists, blog posts and framing options. Filter by style, medium, size and price to find the right piece."
            },
            {
                name: "keywords",
                content:
                    "site search, find art, search prints, filter by style, artist search, product search"
            }
        ],
    }),

    "/terms-and-conditions": () => ({
        title: "Terms & Conditions - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Terms & conditions — legal terms for purchases, licensing, returns and site usage on Artdafen, including intellectual property and ordering policies."
            },
            {
                name: "keywords",
                content:
                    "terms and conditions, T&C, purchase terms, licensing, returns policy, legal"
            }
        ],
    }),

    "/our-return-policy": () => ({
        title: "Return Policy - ART DAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Return Policy — ARTDAFEN's guidelines for returns, exchanges, refunds and damaged artwork for art prints, original paintings and custom commissions. Request returns within 14 days; contact info@artdafen.com."
            },
            {
                name: "keywords",
                content:
                    "return policy, art returns, exchange policy, refund policy, damaged artwork, art prints returns, original paintings returns, custom artwork returns, commissioned art, international returns, return shipping, trackable returns, refund timeline, ARTDAFEN"
            }
        ],
    }),
};

type PageMetaType = typeof pageMeta;
export type RouteKey = keyof PageMetaType;

/**
 * * 安全获取 PageMeta 对象
 *  * 支持类型推导：resolvePageMeta('/artists-all', 'A') 会自动提示需要 string 参数
 * @param routeKey
 * @param params
 */
export function resolvePageMeta<K extends RouteKey>(
    routeKey: K | string,
    // 下面这行稍微复杂，意思是：如果该路由对应的函数有参数，就取第一个参数的类型，否则为 undefined
    params?: K extends RouteKey ? Parameters<PageMetaType[K]>[0] : any
): UseHeadInput {
    const factory = pageMeta[routeKey as RouteKey];

    if (!factory) {
        console.warn(`[pageMeta] Missing meta for route: ${routeKey}`);
        return {};
    }

    // @ts-ignore: 简单的调用，忽略 strict 类型检查带来的复杂性
    return factory(params);
}

/**
 * 合并 UseHeadInput 对象，数组拼接、对象递归合并、普通值覆盖
 */
export const mergeHeadWithLodash = (base: UseHeadInput, extend: UseHeadInput): UseHeadInput => {
    return mergeWith({}, base, extend, (objValue: any, srcValue: any) => {
        // 如果是数组，则拼接
        if (Array.isArray(objValue) && Array.isArray(srcValue)) {
            return objValue.concat(srcValue);
        }
        // 否则交给 lodash 默认逻辑（递归合并或覆盖）
        return undefined;
    });
}