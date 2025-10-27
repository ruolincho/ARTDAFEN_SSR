import {ArtCode, type CodeType} from "~/types/enumeration.d";

// 工艺筛选可选项
export const TECHNIQUE_OPTIONS = [
    {label: 'Hand-painted oil painting', value: '3000012'},
    // {label: 'Print painting', value: '3000013'},
    {label: 'Relief painting', value: '3000014'},
    {label: 'Originals paintings', value: '3000015'},
]

export const ARTIST_MENU_NAME = 'Artists' // 艺术家菜单名称
export const CUSTOM_MENU_NAME = 'Photo to art' // 自定义商品菜单名称
export const BEST_MENU_NAME = 'Best Sellers' // 热门商品菜单名称

// 定制不同工艺的示例图片
export const TECHNIQUE_EXAMPLE: Record<CodeType, { photo: string, paint: string }[]> = {
    [ArtCode.Painting]: [
        {
            photo: '/static/custom/example/hand/example_photo1.png',
            paint: '/static/custom/example/hand/example_paint1.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo2.png',
            paint: '/static/custom/example/hand/example_paint2.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo3.png',
            paint: '/static/custom/example/hand/example_paint3.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo4.png',
            paint: '/static/custom/example/hand/example_paint4.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo5.png',
            paint: '/static/custom/example/hand/example_paint5.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo6.png',
            paint: '/static/custom/example/hand/example_paint6.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo7.png',
            paint: '/static/custom/example/hand/example_paint7.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo8.png',
            paint: '/static/custom/example/hand/example_paint8.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo9.png',
            paint: '/static/custom/example/hand/example_paint9.png',
        },
        {
            photo: '/static/custom/example/hand/example_photo10.png',
            paint: '/static/custom/example/hand/example_paint10.png',
        }
    ],
    [ArtCode.Prints]: [
        {
            photo: '/static/custom/example/print/example_photo1.webp',
            paint: '/static/custom/example/print/example_paint1.webp',
        },
        {
            photo: '/static/custom/example/print/example_photo2.webp',
            paint: '/static/custom/example/print/example_paint2.webp',
        },
        {
            photo: '/static/custom/example/print/example_photo3.webp',
            paint: '/static/custom/example/print/example_paint3.webp',
        },
        {
            photo: '/static/custom/example/print/example_photo4.webp',
            paint: '/static/custom/example/print/example_paint4.webp',
        },
        {
            photo: '/static/custom/example/print/example_photo5.webp',
            paint: '/static/custom/example/print/example_paint5.webp',
        },
    ],
    [ArtCode.Certificates]: [
        {
            photo: '/static/custom/example/certificate/example_photo1.webp',
            paint: '/static/custom/example/certificate/example_paint1.webp',
        },
        {
            photo: '/static/custom/example/certificate/example_photo2.webp',
            paint: '/static/custom/example/certificate/example_paint2.webp',
        },
        {
            photo: '/static/custom/example/certificate/example_photo3.webp',
            paint: '/static/custom/example/certificate/example_paint3.webp',
        },
        {
            photo: '/static/custom/example/certificate/example_photo4.webp',
            paint: '/static/custom/example/certificate/example_paint4.webp',
        },
    ],
}
