export enum ArtCode {
    /* Custom Oil Painting (手绘) */
    'Painting' = 'HPOP',
    /* Custom Prints（喷绘）*/
    'Prints' = '40USD-M2',
    /* Custom Certificates（证书）*/
    'Certificates' = 'CTS',
}

export type CodeType = typeof ArtCode[keyof typeof ArtCode];