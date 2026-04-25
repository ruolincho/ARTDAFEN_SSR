import {ArtCodeEnum, type ArtCodeType} from "~/types/enumeration";
import type {IHome} from "~/api/interface/home/home";

// 排序的菜单数据
export const SORT_MENU: IHome.MenuRow = {
    id: '9999',
    parentId: '0',
    name: 'By Sort',
    config: {type: 'SORT'},
    children: [
        {
            id: '99991',
            parentId: '9999',
            name: 'Featured',
            config: {type: 'SORT', code: '0'},
            children: [],
        },
        {
            id: '99992',
            parentId: '9999',
            name: 'Best selling',
            config: {type: 'SORT', code: '1'},
            children: [],
        },
        {
            id: '99993',
            parentId: '9999',
            name: 'Price, high to low',
            config: {type: 'SORT', code: '2'},
            children: [],
        },
        {
            id: '99994',
            parentId: '9999',
            name: 'Price, low to high',
            config: {type: 'SORT', code: '3'},
            children: [],
        },
        {
            id: '99995',
            parentId: '9999',
            name: 'Date, new to old',
            config: {type: 'SORT', code: '4'},
            children: [],
        },
        {
            id: '99996',
            parentId: '9999',
            name: 'Date, old to new',
            config: {type: 'SORT', code: '5'},
            children: [],
        }

    ],
}

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
        title: 'Delivery & Returns', // 合并了 Shipping 和 Returns
        desc: 'Free global delivery with hassle-free 30-day returns.',
        icon: 'icon-free-shipping' // 可以用一个表示保障（盾牌）或物流包装的图标
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

export const WHY_CHOOSE_LIST2 = [
    {
        title: 'Factory Direct',
        desc: 'Skip the gallery markup. Connect directly with our production base for the most competitive, transparent pricing.',
        icon: 'icon-choose-1'
    },
    {
        title: 'Custom Sizing',
        desc: 'From renderings to reality. We offer interactive resizing and cropping to perfectly fit unique architectural spaces, such as long corridors or high ceilings.',
        icon: 'icon-choose-2'
    },
    {
        title: 'Trust & Stability',
        desc: 'Verify us with real factory footage to eliminate risk. We use professional crate packing to ensure safe, damage-free global logistics.',
        icon: 'icon-choose-3'
    },
]

export const HISTORY_LIST = [
    {
        id: '1',
        img: '/static/artdafen/history/about-history-1.webp',
        year: '1989',
        title: 'The Genesis',
        content: 'It started with a vision.Hong Kong art dealer Mr. Huang Jiang established the very first oil painting workshop in Dafen Village.This pivotal moment planted the seed that would grow into the world\'s largest oil painting industrial chain.'
    },
    {
        id: '2',
        img: '/static/artdafen/history/about-history-2.webp',
        year: '2004-2008',
        title: 'Global Dominance',
        content: 'Global Dominance We became the engine of global decoration.Statistics revealed that 80%of oil paintings sold in US and European markets originated right here.Major media like The New York Times and BBC reported on Dafen as the global center of commercial art.'
    },
    {
        id: '3',
        img: '/static/artdafen/history/about-history-3.webp',
        year: '2012',
        title: 'The Shift to Originality',
        content: 'Moving beyond simple replicas,we launched the National Oil Painting Exhibition to champion original creation.We began cultivating a new generation of artists capable of creating future masterpieces,not just copying old ones.'
    },
    {
        id: '4',
        img: '/static/artdafen/history/about-history-4.webp',
        year: '2016',
        title: 'Digital Leadership',
        content: 'Under the leadership of Mr.Zhou Feng (Chairman of the Dafen Fine Arts Industry Association),the village accelerated its "Internet +strategy.We connected our elite studios directly to the global digital economy,laying the foundation for a modern art brand.'
    },
    {
        id: '5',
        img: '/static/artdafen/history/about-history-5.webp',
        year: '2020-NOW',
        title: 'Enter ARTDAFEN',
        content: 'Reimagined for the modern collector.We launched ARTDAFEN to cut out the middleman.Today,we connect our master artists directly to you,delivering museum-quality hand-painted art from our easels to your wall.'
    },
]

export const ARTISTS_LIST = [
    {
        id: '1',
        portrait: '/static/artdafen/artists/about-artists1.webp',
        name: 'Aaron Greenwood',
        intro: 'Chief Designer (North American Projects) An American visual creative artist and designer, this professional serves as a key design lead. A standing member of the International Interior Design Association (IIDA), he has been professionally recognized as a distinguished winner of the International Design Awards (IDC).'
    },
    {
        id: '2',
        portrait: '/static/artdafen/artists/about-artists2.webp',
        name: 'Ivanova Galina',
        intro: 'Chief Designer (Russian-speaking Region) A Belarusian artist and designer, she serves as a lead creative for regional projects. Recognized as an "Expert Level Artist" by the Moscow Artists Association, she is the recipient of the First Prize for Art Creation, awarded by the President of Belarus.'
    },
    {
        id: '3',
        portrait: '/static/artdafen/artists/about-artists3.webp',
        name: 'Jason Mann',
        intro: 'Visual Artist Focused on imagining the real world to depict unique imagery, this artist creates depth and realism to draw empathy from viewers. His work attempts to bridge the surface with deep engagement, offering a highly personal perspective on visual storytelling and human connection.'
    },
    {
        id: '4',
        portrait: '/static/artdafen/artists/about-artists4.webp',
        name: 'Katherine Mann',
        intro: 'Chief Designer (European Projects) A British interior designer and artist, she currently serves as the Director of the British Institute of Interior Design (BIID). Her portfolio is distinguished by winning the UK FX International Interior Design Award and the Contract Magazine Interior Design of the Year Award.'
    },
    {
        id: '5',
        portrait: '/static/artdafen/artists/about-artists5.webp',
        name: 'Maia Figueroa Marcio',
        intro: 'Chief Designer (South American Projects) A Brazilian designer and crossover visual artist, she serves as the creative lead for South American projects. Her work is renowned for a unique style that seamlessly integrates pop culture, music, and folk art to express a profound and distinctive inner world.'
    },
    {
        id: '6',
        portrait: '/static/artdafen/artists/about-artists6.webp',
        name: 'Huang Ting',
        intro: 'Senior Art Design Consultant A contemporary original painter, stage artist, and national senior interior architect. Serving as a Senior Consultant for the Shenzhen Interior Designers Association, he also holds significant leadership roles within the Shenzhen Original Art Association and the Dafen Art Industry Association.'
    },
    {
        id: '7',
        portrait: '/static/artdafen/artists/about-artists7.webp',
        name: 'Wang Feng',
        intro: 'Senior Artist & Art Director Educated at top academies in China and Russia, his works are collected globally and featured in Dubai’s Burj Al Arab. The subject of international documentaries and BBC coverage, he has won multiple gold awards and serves as VP of the Shenzhen Dafen Art Industry.'
    },
    {
        id: '8',
        portrait: '/static/artdafen/artists/about-artists8.webp',
        name: 'Yu Sheng',
        intro: 'Senior Art Consultant Educated in Fine Arts and born in 1965, he is a member of major provincial artist associations. Holding executive leadership roles in the Shenzhen Dafen Art Industry Association, his works have been widely exhibited and collected in China, South Korea, France, and the USA.'
    },
    {
        id: '9',
        portrait: '/static/artdafen/artists/about-artists9.webp',
        name: 'Zhou Feng',
        intro: 'CEO & Curator An accomplished art broker and curator, he is a member of the International Art Curators Alliance. As the initiator of the China Art Industry Alliance, he previously served distinct terms as President and Secretary-General of the Shenzhen Dafen Art Industry Association.'
    },
    {
        id: '10',
        portrait: '/static/artdafen/artists/about-artists10.webp',
        name: 'Zhou Qi',
        intro: 'Art Director A creative artist and space art designer, he is the creator of the Idea-Tops Award for Space Design. In addition to initiating the Shenzhen International Creative Art Alliance, he currently acts as the Vice President of the Shenzhen Dafen Art Industry Association.'
    }
]

export const HONOR_LIST = [
    {img: '/static/artdafen/honor/about-honor1.webp', name: 'EXECUTIVE PRESIDENT UNIT', id: '1'},
    {img: '/static/artdafen/honor/about-honor2.webp', name: 'CHINA CULTURAL MEDIA GROUP', id: '2'},
    {img: '/static/artdafen/honor/about-honor3.webp', name: 'ESTANDING COMMITTEE MEMBER UNITE', id: '3'},
    {img: '/static/artdafen/honor/about-honor4.webp', name: 'PRES IDENT UNIT', id: '4'},
    {img: '/static/artdafen/honor/about-honor5.webp', name: 'PARTICIPATING MERCHANTS OF SUMMER CAMP', id: '5'},
    {img: '/static/artdafen/honor/about-honor6.webp', name: 'CHINA METAVERSE WHITE PAPER EDITORIAL', id: '6'},
    {img: '/static/artdafen/honor/about-honor7.webp', name: 'OIL PAINTING TRADE PROMOTION CENTER', id: '7'},
    {
        img: '/static/artdafen/honor/about-honor8.webp',
        name: 'DAFEN FINE ART INDUSTRY ASSOCIATION PRESIDENT UNIT',
        id: '8'
    },
]

export const PARTNER_LIST = [
    {
        id: '1',
        img: '/static/artdafen/partner/about-partner1.webp',
        title: 'President of the French Fine Arts Association, Rémi Ayrong',
    },
    {
        id: '2',
        img: '/static/artdafen/partner/about-partner2.webp',
        title: 'Russian artist Tatyana Livova',
    },
    {
        id: '3',
        img: '/static/artdafen/partner/about-partner3.webp',
        title: 'French Art Fund',
    },
    {
        id: '4',
        img: '/static/artdafen/partner/about-partner4.webp',
        title: 'President of Claremont University’s Art Institute, USA',
    },
    {
        id: '5',
        img: '/static/artdafen/partner/about-partner5.webp',
        title: 'Huangjiang-Dafen’s Number One',
    },
    {
        id: '6',
        img: '/static/artdafen/partner/about-partner6.webp',
        title: 'Peng Wenbin, Artistic Director of the Guangzhou Art Fair',
    },
    {
        id: '7',
        img: '/static/artdafen/partner/about-partner7.webp',
        title: 'Korean artist Park Jeolhwan',
    },
    {
        id: '8',
        img: '/static/artdafen/partner/about-partner8.webp',
        title: 'Hollywood Director Mike',
    },
    {
        id: '9',
        img: '/static/artdafen/partner/about-partner9.webp',
        title: 'Russian artist Elena',
    },
    {
        id: '10',
        img: '/static/artdafen/partner/about-partner10.webp',
        title: 'Artist - French artist Mike',
    },
    {
        id: '11',
        img: '/static/artdafen/partner/about-partner11.webp',
        title: 'Artist - Italian sculptor Giuseppe Angelo',
    },
    {
        id: '12',
        img: '/static/artdafen/partner/about-partner12.webp',
        title: 'Belarusian artist Kaliya',
    },
    {
        id: '13',
        img: '/static/artdafen/partner/about-partner13.webp',
        title: 'Danish artist Peter Ilersted',
    },
    {
        id: '14',
        img: '/static/artdafen/partner/about-partner14.webp',
        title: 'Russian artist Sergey',
    },
    {
        id: '15',
        img: '/static/artdafen/partner/about-partner15.webp',
        title: 'John Hawkins - Father of the Global Creative Industries, Renowned British Expert in Creative Cultural Industries',
    },
    {
        id: '16',
        img: '/static/artdafen/partner/about-partner16.webp',
        title: 'Ink Artist Zheng Taijun',
    }
]

export const CASE_LIST = [
    {
        img: '/static/artdafen/case/case-1.webp',
        title: 'The Carter Houston TX',
        size: '180*180',
        name: 'untitled no. 1 (gold)',
        id: '1'
    },
    {
        img: '/static/artdafen/case/case-2.webp',
        title: 'Capital One, Las Vegas NV',
        size: '190x260',
        name: 'Colorful Botanical04',
        id: '2'
    },
    {
        img: '/static/artdafen/case/case-3.webp',
        title: 'Tate at Tanglewood TX',
        size: '240*630',
        name: 'The Eight Steeds',
        id: '3'
    },
    {
        img: '/static/artdafen/case/case-4.webp',
        title: 'The Oriental Spa HK',
        size: '95*70',
        name: 'Flowers in a Blue Vase',
        id: '4'
    },
    {
        img: '/static/artdafen/case/case-5.webp',
        title: 'JW Marriott Mexico City',
        size: '310x440',
        name: 'Cerulean Abstract01',
        id: '5'
    },
    {
        img: '/static/artdafen/case/case-6.webp',
        title: 'Marriott, Newport RI',
        size: '350x135',
        name: 'Gray Golden Blossoms05',
        id: '6'
    },
    {
        img: '/static/artdafen/case/case-7.webp',
        title: 'Private Residence, Henderson Nevada',
        size: '300x140',
        name: 'Untitled_',
        id: '7'
    },
]

export const SOCIAL_LIST = [
    {name: 'youtube', icon: 'icon-Youtube', url: 'https://www.youtube.com/@artdafen'},
    {name: 'instagram', icon: 'icon-instagram', url: 'https://www.instagram.com/art_dafen/'},
    {name: 'pinterest', icon: 'icon-pinterest', url: 'https://www.pinterest.com/artdafen/'},
    {name: 'tiktok', icon: 'icon-douyinjumuguanli', url: 'https://www.tiktok.com/@artdafencom'},
    {name: 'x', icon: 'icon-tuite', url: 'https://x.com/artdafen'},
]