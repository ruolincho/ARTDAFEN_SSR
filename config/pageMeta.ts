import {ArtCodeEnum} from "~/types/enumeration";
import {mergeWith} from "lodash-es";
import type { UseHeadInput } from '@unhead/vue';

type ArtistAllParams = string;
type CustomPaintParams = ArtCodeEnum;

export const pageMeta = {
    "/": () => ({
        title: "ARTDAFEN | Museum-Quality Hand-Painted Oil Painting Reproductions",
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
        title: "Hand-Painted Oil Paintings & Custom Art | About ARTDAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Explore our collection of authentic, hand-painted art. ARTDAFEN bridges the gap between master artists and art lovers worldwide, ensuring museum-quality pieces and personalized service."
            }
        ],
    }),

    "/artists-all": (letter: ArtistAllParams) => ({
        title: `Artists starting with ${letter} | Browse Creators - ARTDAFEN"`,
        meta: [
            {
                name: "description",
                content:
                    `Explore all ARTDAFEN artists whose names begin with ${letter}. View their unique portfolios, original hand-painted works, and specialized styles.`
            }
        ],
    }),

    "/artists-brief": () => ({
        title: "Our Artists A-Z | Discover Talented Painters & Creators - ARTDAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Browse our curated directory of professional artists. From traditional oil painters to contemporary masters, find the perfect talent for your custom art and home decor at ARTDAFEN."
            }
        ],
    }),

    "/journal": () => ({
        title: "Art Journal & Studio Insights | ARTDAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Explore the ARTDAFEN's journal. Discover behind-the-scenes stories from our studio, classical oil painting techniques, artist spotlights, and custom artwork inspiration."
            },
            {
                name: "keywords",
                content:
                    "Buy oil paintings online, art collecting guide, canvas art tips, Dafen painters, modern landscape paintings, abstract art blog."
            }
        ],
    }),

    "/zone": () => ({
        title: "Explore Custom Oil Paintings & Masterpiece Reproductions | ARTDAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Step into the ARTDAFEN Zone. Discover a curated collection of museum-quality oil painting reproductions and bespoke portrait services. From classical masterpieces to modern abstracts, find the perfect hand-painted art to elevate your space."
            }
        ],
    }),

    "/join-as-artist": () => ({
        title: "Join ARTDAFEN as an Artist | Sell Your Original Paintings Worldwide",
        meta: [
            {
                name: "description",
                content:
                    "Are you a talented painter? Join the ARTDAFEN artist community. We provide a global platform for artists to showcase their work, reach international collectors, and grow their careers. Apply now."
            }
        ],
    }),

    "/trade-commercial": () => ({
        title: "Art & Design Trade Program | Exclusive Benefits",
        meta: [
            {
                name: "description",
                content:
                    "Trade program for designers & artists. Get exclusive access to original, custom, museum-quality paintings, special pricing, and dedicated support."
            }
        ],
    }),

    "/contact": () => ({
        title: "Contact Us | Art & Custom Painting Support",
        meta: [
            {
                name: "description",
                content:
                    "Support for original & custom art. Dedicated service for unique landscapes, modern cityscapes, quality, and sustainable artwork inquiries."
            }
        ],
    }),

    "/cookies-policy": () => ({
        title: "Cookies & Tracking | ARTDAFEN",
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

    "/custom-case": (themeText: string) => ({
        title: `Custom ${themeText || ''} Portrait Showcase — From Photo to Art | ARTDAFEN`,
        meta: [
            {
                name: "description",
                content:
                    `Discover how an ordinary ${themeText || '' } photo transforms into extraordinary art. In our Custom ${themeText || ''} Portrait Showcase, you’ll see real examples of before-and-after results — side-by-side comparisons revealing the remarkable detail, color, and emotion our artists bring to life.`
            }
        ],
    }),

    "/faq": () => ({
        title: "Frequently Asked Questions | ARTDAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Find answers to frequently asked questions about ARTDAFEN's custom artworks, shipping, payments, returns, and more."
            },
            {
                name: "keywords",
                content:
                    "FAQ, ordering, framing FAQ, proofing, shipping, returns, Dafen artists"
            }
        ],
    }),

    "/forget-password": () => ({
        title: "Password Recovery | ARTDAFEN",
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

    "/login": () => ({
        title: "Login | ARTDAFEN"
    }),

    "/register": () => ({
        title: "Register | ARTDAFEN"
    }),

    "/magazine": () => ({
        title: "Curated Oil Painting Trends & Artist Spotlights | ARTDAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Dive into ARTDAFEN Magazine. Your premier source for contemporary oil painting trends, exclusive interviews with Dafen artists, and professional guides on building your home art collection."
            },
            {
                name: "keywords",
                content:
                    "Art magazine, oil painting trends 2026, home art gallery, Dafen artist interviews, contemporary wall decor, fine art collection."
            }
        ],
    }),

    "/notice": () => ({
        title: "Notice | ARTDAFEN",
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
        title: "Privacy & Policy | ARTDAFEN",
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

    "/collections": () => ({
        title: "Collections - Hand-Painted Canvas Art | ARTDAFEN",
        meta: [
            {
                name: "description",
                content:
                    "Explore ARTDAFEN’s stunning art collection—original hand-painted canvas artwork featuring captivating details, diverse themes, and unique style. Shop limited-edition pieces today!"
            },
            {
                name: "keywords",
                content:
                    "products, framed prints, canvas reproductions, online framing, proof preview, original art, limited edition prints, buy art online"
            }
        ],
    }),

    "/search": () => ({
        title: "Search | ARTDAFEN",
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
        title: "Terms & Conditions | ARTDAFEN",
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
        title: "Our Return Policy | ARTDAFEN",
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

    "/profile": () => ({
        title: "Profile - Account | ARTDAFEN",
        meta: [
            {
                name: 'robots',
                content: 'noindex, nocache, noarchive, nofollow'
            }
        ],
    }),

    "/orders": () => ({
        title: "Orders - Account | ARTDAFEN",
        meta: [
            {
                name: 'robots',
                content: 'noindex, nocache, noarchive, nofollow'

            }
        ],
    }),

    "/favorites": () => ({
        title: "Favorites - Account | ARTDAFEN",
        meta: [
            {
                name: 'robots',
                content: 'noindex, nocache, noarchive, nofollow'

            }
        ],
    }),

    "/addresses": () => ({
        title: "Addresses - Account | ARTDAFEN",
        meta: [
            {
                name: 'robots',
                content: 'noindex, nocache, noarchive, nofollow'

            }
        ],
    }),

    "/payments": () => ({
        title: "Payments - Account | ARTDAFEN",
        meta: [
            {
                name: 'robots',
                content: 'noindex, nocache, noarchive, nofollow'

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