// 画芯代码
export enum ArtCodeEnum {
    /* Custom Oil Painting (手绘) */
    'Painting' = 'HPOP',
    /* Custom Prints（喷绘）*/
    'Prints' = '40USD-M2',
    /* Custom Certificates（证书）*/
    'Certificates' = 'CTS',
}
export type ArtCodeType = typeof ArtCodeEnum[keyof typeof ArtCodeEnum];

// 工艺编号
export enum TechniqueCodeEnum {
    /* Hand-painted oil painting (手绘) */
    'Painting' = '3000012',
    /* Print painting (喷绘) */
    'Prints' = '3000013',
    /* Relief painting (浮雕) */
    'Relief' = '3000014',
    /* Originals paintings (原作) */
    'Originals' = '3000015',
    /* Spot paintings (现货) */
    'Spot' = '0',
}
export type TechniqueCodeType = typeof TechniqueCodeEnum[keyof typeof TechniqueCodeEnum];

// 排序方式
export enum SortCodeEnum {
    'Desc' = '0',
    'Asc' = '1',
}
export type SortCodeType = typeof SortCodeEnum[keyof typeof SortCodeEnum];

