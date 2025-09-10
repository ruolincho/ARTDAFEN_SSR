/**
 * 校验和解析区间字符串工具
 * 支持：
 *  - 完全区间：[a,b], (a,b), [a,b), (a,b]
 *  - 左半无限区间: (,b], (,b)
 *  - 右半无限区间: [a,),(a,)
 * 数字支持正负、整数或浮点数
 */

// 完整区间：指定上下限
const FULL_RANGE = /^[\[\(]\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*[\)\]]$/;
// 左半无限区间：仅指定下限
const LEFT_OPEN  = /^[\[\(]\s*(-?\d+(?:\.\d+)?)\s*,\s*[\)\]]$/;
// 右半无限区间：仅指定上限
const RIGHT_OPEN = /^[\[\(]\s*,\s*(-?\d+(?:\.\d+)?)\s*[\)\]]$/;

/**
 * 判断区间字符串是否合法
 * @param {string} str 区间字符串
 * @returns {boolean}
 */
export function isValidNumRange(str: string) {
    const s = str.trim();
    return FULL_RANGE.test(s) || LEFT_OPEN.test(s) || RIGHT_OPEN.test(s);
}

/**
 * 解析区间字符串，返回上下限值（不含边界符号）
 * 若为无限区间，相应值返回 null
 * @param {string} str 区间字符串
 * @returns {{ lower: number|null, upper: number|null }}
 */
export function parseNumRange(str: string) {
    if (!isValidNumRange(str)) {
        return { lower: null, upper: null };
    }
    const inner = str.trim().slice(1, -1);
    const [left, right] = inner.split(',').map(s => s.trim());
    const lower = left === '' ? null : parseFloat(left);
    const upper = right === '' ? null : parseFloat(right);
    return { lower, upper };
}

/**
 * 验证给定数值是否在指定区间内
 * 支持完整区间、左/右无限区间，并根据括号决定是否包含边界
 * @param {number} value 要验证的数值
 * @param {string} rangeStr 区间字符串
 * @returns {boolean}
 */
export function rangeVerify(value: number, rangeStr: string) {
    if (!isValidNumRange(rangeStr)) {
        return false;
    }
    const str = rangeStr.trim();
    let match;

    // 完整区间
    match = str.match(FULL_RANGE);
    if (match) {
        const leftInclusive = str[0] === '[';
        const rightInclusive = str[str.length - 1] === ']';
        const lower = parseFloat(match[1]);
        const upper = parseFloat(match[2]);
        if (lower > upper) return false;
        const leftOk = leftInclusive ? value >= lower : value > lower;
        const rightOk = rightInclusive ? value <= upper : value < upper;
        return leftOk && rightOk;
    }

    // 左无限区间
    match = str.match(RIGHT_OPEN);
    if (match) {
        const upperInclusive = str[str.length - 1] === ']';
        const upper = parseFloat(match[1]);
        return upperInclusive ? value <= upper : value < upper;
    }

    // 右无限区间
    match = str.match(LEFT_OPEN);
    if (match) {
        const leftInclusive = str[0] === '[';
        const lower = parseFloat(match[1]);
        return leftInclusive ? value >= lower : value > lower;
    }

    return false;
}
