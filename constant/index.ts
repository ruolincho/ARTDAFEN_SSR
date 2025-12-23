import {ArtCodeEnum, type ArtCodeType, SortCodeEnum, TechniqueCodeEnum} from "~/types/enumeration";
import type {IHome} from "~/api/interface/home/home";
import {imagePrefix} from '~/utils'

// 移动端中Popup模拟工艺的菜单数据
export const techniqueMenu: IHome.MenuRow = {
    id: '7777',
    parentId: '0',
    name: 'Technique',
    config: { type: 'SORT' },
    children: [
        {
            id: '7776',
            parentId: '7777',
            name: 'Hand-painted oil painting',
            config: { type: 'SORT', code: TechniqueCodeEnum.Painting },
            children: [],
        },
        // {
        //   id: '7775',
        //   parentId: '7777',
        //   name: 'Print painting',
        //   config: {type: 'SORT', code: TechniqueCodeEnum.Prints},
        //   children: []
        // },
        {
            id: '7774',
            parentId: '7777',
            name: 'Relief painting',
            config: { type: 'SORT', code: TechniqueCodeEnum.Relief },
            children: [],
        },
        {
            id: '7773',
            parentId: '7777',
            name: 'Originals paintings',
            config: { type: 'SORT', code: TechniqueCodeEnum.Originals },
            children: [],
        },
    ],
}
// 移动端中Popup模拟价格排序的菜单数据
export const priceMenu: IHome.MenuRow = {
    id: '9999',
    parentId: '0',
    name: 'Price Sort',
    config: { type: 'SORT' },
    children: [
        {
            id: '9998',
            parentId: '9999',
            name: 'Price Sort By Desc',
            config: { type: 'SORT', code: SortCodeEnum.Desc },
            children: [],
        },
        {
            id: '9997',
            parentId: '9999',
            name: 'Price Sort By Asc',
            config: { type: 'SORT', code: SortCodeEnum.Asc },
            children: [],
        },
    ],
}
// 移动端中Popup模拟销量排序的菜单数据
export const salesMenu: IHome.MenuRow = {
    id: '8888',
    parentId: '0',
    name: 'Sales Sort',
    config: { type: 'SORT' },
    children: [
        {
            id: '8887',
            parentId: '8888',
            name: 'Sales Sort By Desc',
            config: { type: 'SORT', code: SortCodeEnum.Desc },
            children: [],
        },
        {
            id: '8886',
            parentId: '8888',
            name: 'Sales Sort By Asc',
            config: { type: 'SORT', code: SortCodeEnum.Asc },
            children: [],
        },
    ],
}

export const ARTIST_MENU_NAME = 'Artists' // 艺术家菜单名称
export const CUSTOM_MENU_NAME = 'Photo to art' // 自定义商品菜单名称
export const BEST_MENU_NAME = 'Best Sellers' // 热门商品菜单名称

// 定制不同工艺的示例图片
export const TECHNIQUE_EXAMPLE: Record<ArtCodeType, { photo: string, paint: string }[]> = {
    [ArtCodeEnum.Painting]: [
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
    [ArtCodeEnum.Prints]: [
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
    [ArtCodeEnum.Certificates]: [
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

// 现货MenuId
export const SPOT_MENU_ID = '1000002'

export const HOW_IT_WORKS = [
    {
        title: 'Choose Subject',
        desc: 'Pick your most cherished Subject(s). For best quality, choose an image that is clear, in focus, and large enough to see the details.',
        icon: 'icon-album',
    },
    {
        title: 'Choose Style',
        desc: 'Pick the medium for your artist to use when creating your portrait, from charcoal to oils. Then choose your desired background.',
        icon: 'icon-magic-pen',
    },
    {
        title: 'Upload Photos',
        desc: 'Upload your photos when you place your order or send them to us by email. You can even request to combine multiple images into one.',
        icon: 'icon-upload-pictures',
    },
    {
        title: 'Place Order',
        desc: 'fter checkout, you will receive an order number and a detailed email with what to expect next. Time to get excited about your custom portrait!',
        icon: 'icon-color-palette',
    },
]

export const QUALITY_LIST = [
    {
        title: `<span>Top Artists <br> Trust our experts</span>`,
        desc: 'Elite painters with 20+ years of experience crafting museum-quality art.',
        img: '/static/artdafen/quality-1.webp'
    },
    {
        title: `<span>100% Hand-painted Verify the quality</span>`,
        desc: 'Review high-res photos and process shots to ensure total authenticity.',
        img: '/static/artdafen/quality-2.webp'
    },
    {
        title: `<span>From Easel to Wall Hang it instantly</span>`,
        desc: 'Choose a custom frame and enjoy safe, global delivery to your door.',
        img: '/static/artdafen/quality-3.webp'
    },
    {
        title: `<span>Sustainable <br> Artistry</span>`,
        desc: 'Beauty without compromise. We use eco-sourced wood and non-toxic materials for a greener footprint.',
        img: '/static/artdafen/quality-4.webp'
    }
]

export const PROCESS_LIST = [
    {
        title: 'Choose Art & Frame',
        desc: 'Select art, frame, and checkout.',
        icon: 'icon-choose-art-frame'
    },
    {
        title: 'Artist Creation',
        desc: 'Hand-painted in 1–2 weeks.',
        icon: 'icon-artist-creation'
    },
    {
        title: 'Framing & Packing',
        desc: 'Expert framing, secure packing.',
        icon: 'icon-framing-packing'
    },
    {
        title: 'Free Shipping',
        desc: 'Safe, free global delivery.',
        icon: 'icon-free-shipping'
    },
    {
        title: 'Easy Returns',
        desc: 'Hassle-free 30-day returns.',
        icon: 'icon-easy-returns'
    },
]

export const WHY_CHOOSE_LIST = [
    {
        title: 'Top Artists Trust our experts',
        desc: 'Elite painters with 20+ years of experience crafting museum-quality art.',
        img: '/static/artdafen/why-1.webp'
    },
    {
        title: 'From Easel to Wall Hang it instantly',
        desc: 'Choose a custom frame and enjoy safe, global delivery to your door.',
        img: '/static/artdafen/why-2.webp'
    },
    {
        title: '100% Hand-painted Verify the quality',
        desc: 'Review high-res photos and process shots to ensure total authenticity.',
        img: '/static/artdafen/why-3.webp'
    }
]