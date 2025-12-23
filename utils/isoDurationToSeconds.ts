export interface IsoDurationOptions {
    daysPerMonth?: number
    daysPerYear?: number
}

const DEFAULT_OPTIONS: Required<IsoDurationOptions> = {
    daysPerMonth: 30,
    daysPerYear: 365,
}

/**
 * 宽松模式（不抛异常）
 */
export function isoDurationToSeconds(
    duration: string,
    options?: IsoDurationOptions
): number {
    if (!duration || typeof duration !== 'string') return 0

    const regex =
        /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/

    const match = duration.match(regex)
    if (!match) return 0

    const [, y, mo, w, d, h, m, s] = match

    return (
        Number(s || 0) +
        Number(m || 0) * 60 +
        Number(h || 0) * 3600 +
        (Number(d || 0) + Number(w || 0) * 7) * 86400 +
        Number(mo || 0) * DEFAULT_OPTIONS.daysPerMonth * 86400 +
        Number(y || 0) * DEFAULT_OPTIONS.daysPerYear * 86400
    )
}

/**
 * 严格模式（推荐在业务中使用）
 */
export function isoDurationToSecondsStrict(duration: string): number {
    if (!duration || typeof duration !== 'string') {
        throw new Error('Duration must be a string')
    }

    // 禁止使用 Year / Month（前端无法精确）
    if (/P\d+Y/.test(duration) || /P\d+M(?![^\w]*T)/.test(duration)) {
        throw new Error(`Unsupported duration unit (Y/M): ${duration}`)
    }

    return isoDurationToSeconds(duration)
}
