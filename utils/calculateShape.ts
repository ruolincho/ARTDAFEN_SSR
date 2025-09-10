// 定义形状类型及其对应的比例字典
type RatioMap = Record<string, number>;

const ShapeRatios = {
    LANDSCAPE: {
        "3/2": 3 / 2,
        "4/3": 4 / 3,
        "5/3": 5 / 3
    },
    PORTRAIT: {
        "2/3": 2 / 3,
        "3/4": 3 / 4,
        "3/5": 3 / 5
    },
    PANORAMIC: {
        "2/1": 2,
        "3/1": 3,
        "4/1": 4
    },
    SQUARE: {
        "1/1": 1
    },
    SLIM: {
        "1/2": 1 / 2,
        "1/3": 1 / 3,
        "1/4": 1 / 4
    }
} as const;

type ShapeType = keyof typeof ShapeRatios;

// 查找最接近的比例字符串
export function findClosestMatch(width: number, height: number): string {
    if (height === 0) throw new Error("Image height cannot be zero.");

    const ratio = width / height;
    const allRatios = Object.values(ShapeRatios)
        .flatMap(ratioMap => Object.entries(ratioMap));

    const closest = allRatios.reduce((prev, curr) => {
        const prevDiff = Math.abs(ratio - prev[1]);
        const currDiff = Math.abs(ratio - curr[1]);
        return currDiff < prevDiff ? curr : prev;
    });

    return closest[0];
}

// 导出类型声明
export type {ShapeType};
