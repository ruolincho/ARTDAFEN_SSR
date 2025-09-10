/**
 * 二次缓入缓出函数（ease-in-out）
 * @param t 当前时间（通常为0到d之间的值）
 * @param b 起始位置
 * @param c 变化量（目标位置 - 起始位置）
 * @param d 持续时间
 * @returns 当前时间对应的位置值
 */
function easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;  // 将时间标准化到总时间的一半（0-2区间）
    if (t < 1) {
        // 前半段加速阶段（二次函数递增）
        return (c / 2) * t * t + b;
    }
    t--;  // 进入后半段前调整时间参数
    // 后半段减速阶段（二次函数递减）
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

// requestAnimationFrame for Smart Animating
const requestAnimFrame: (callback: FrameRequestCallback) => number = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback: FrameRequestCallback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    );
})();

/**
 * Move the scroll position
 * @param amount Scroll position to move to
 */
function move(amount: number): void {
    if (document.documentElement) {
        document.documentElement.scrollTop = amount;
    }
    if (document.body.parentNode instanceof HTMLElement) {
        document.body.parentNode.scrollTop = amount;
    }
    if (document.body) {
        document.body.scrollTop = amount;
    }
}

/**
 * Get current scroll position
 */
function position(): number {
    return (
        document.documentElement?.scrollTop ||
        (document.body.parentNode instanceof HTMLElement ? document.body.parentNode.scrollTop : 0) ||
        document.body?.scrollTop ||
        0
    );
}

/**
 * Smooth scroll to a position
 * @param to Target scroll position
 * @param duration Duration of the scroll (ms)
 * @param callback Callback when finished
 */
export function scrollTo(to: number, duration: number = 500, callback?: () => void): void {
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        move(val);
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        } else {
            if (callback) {
                callback();
            }
        }
    };

    animateScroll();
}
