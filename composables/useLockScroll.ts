import { watch, onUnmounted, isRef, type Ref, type ComputedRef } from 'vue'

type LockTarget = Ref<boolean> | ComputedRef<boolean>;

/**
 * 用于锁定滚动
 * @param args
 * @example useLockScroll(xxx,xxx)、useLockScroll([xxx,xxx])
 */
export function useLockScroll(...args: (LockTarget | LockTarget[])[]) {
    let isLocked = false
    let touchStartX = 0
    let touchStartY = 0

    // 保存 body 原始的样式，以便解锁时恢复
    let originalOverflow = ''
    let originalPaddingRight = ''

    const isClient = process.client && typeof window !== 'undefined';

    const sources: Ref<boolean>[] = args.flat().filter(isRef)
    const preventKeys = new Set(['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'])

    // --- 获取滚动条宽度，防止隐藏滚动条时页面抖动 ---
    const getScrollbarWidth = (): number => {
        if (!isClient) return 0
        return window.innerWidth - document.documentElement.clientWidth
    }

    // 1. 辅助：判断是否是可滚动元素 (同时支持 X 和 Y 轴检测)
    const isElementScrollable = (el: HTMLElement): boolean => {
        if (!isClient || el === document.body || el === document.documentElement) return false

        const style = window.getComputedStyle(el)

        // 检查垂直滚动
        const isScrollY = (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
            el.scrollHeight > el.clientHeight

        // 检查水平滚动 (新增)
        const isScrollX = (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
            el.scrollWidth > el.clientWidth

        return isScrollY || isScrollX
    }

    // 2. 辅助：寻找滚动的父级
    const findScrollableParent = (target: EventTarget | null): HTMLElement | null => {
        if (!isClient) return null
        let el = target as HTMLElement | null
        while (el && el !== document.body && el !== document.documentElement) {
            if (isElementScrollable(el)) return el
            el = el.parentElement
        }
        return null
    }

    // 3. PC端滚轮处理 (区分 X/Y 轴)
    const handleWheel = (e: WheelEvent) => {
        if (!isClient) return
        const scrollEl = findScrollableParent(e.target)

        // A. 背景滚动 -> 拦截
        if (!scrollEl) {
            if (e.cancelable) e.preventDefault()
            return
        }

        // B. 容器内滚动 -> 判断方向
        const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollEl
        const deltaX = e.deltaX
        const deltaY = e.deltaY

        // 判断主滚动方向：谁的偏移量大，就听谁的
        const isVertical = Math.abs(deltaY) > Math.abs(deltaX)

        if (isVertical) {
            // --- 垂直逻辑 ---
            // 向上滚且到顶 -> 拦截
            if (deltaY < 0 && scrollTop <= 0) {
                if (e.cancelable) e.preventDefault()
            }
            // 向下滚且到底 -> 拦截
            else if (deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
                if (e.cancelable) e.preventDefault()
            }
        } else {
            // --- 水平逻辑 (新增) ---
            // 向左滚且到左边 -> 拦截 (防止浏览器后退手势等)
            if (deltaX < 0 && scrollLeft <= 0) {
                if (e.cancelable) e.preventDefault()
            }
            // 向右滚且到右边 -> 拦截
            else if (deltaX > 0 && scrollLeft + clientWidth >= scrollWidth - 1) {
                if (e.cancelable) e.preventDefault()
            }
        }
    }

    // 4. 移动端触摸开始 (记录 X 和 Y)
    const handleTouchStart = (e: TouchEvent) => {
        if (!isClient) return
        touchStartX = e.targetTouches[0]?.clientX || 0
        touchStartY = e.targetTouches[0]?.clientY || 0
    }

    // 5. 移动端触摸移动 (区分 X/Y 轴)
    const handleTouchMove = (e: TouchEvent) => {
        if (!isClient) return
        const scrollEl = findScrollableParent(e.target)

        if (!scrollEl) {
            if (e.cancelable) e.preventDefault()
            return
        }

        const touchX = e.targetTouches[0]?.clientX || 0
        const touchY = e.targetTouches[0]?.clientY || 0

        // 计算移动距离
        const deltaX = touchX - touchStartX
        const deltaY = touchY - touchStartY

        // *注意*: 移动端 delta 与 滚轮 delta 方向相反
        // 下拉是 deltaY > 0，右滑是 deltaX > 0

        const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollEl

        // 判断手指滑动的主方向
        const isVertical = Math.abs(deltaY) > Math.abs(deltaX)

        if (isVertical) {
            // --- 垂直逻辑 ---
            // 手指下滑 (想看上面) 且 到顶 -> 拦截
            if (deltaY > 0 && scrollTop <= 0) {
                if (e.cancelable) e.preventDefault()
            }
            // 手指上滑 (想看下面) 且 到底 -> 拦截
            else if (deltaY < 0 && scrollTop + clientHeight >= scrollHeight - 1) {
                if (e.cancelable) e.preventDefault()
            }
        } else {
            // --- 水平逻辑 (新增) ---
            // 手指右滑 (想看左边) 且 到左边 -> 拦截
            if (deltaX > 0 && scrollLeft <= 0) {
                if (e.cancelable) e.preventDefault()
            }
            // 手指左滑 (想看右边) 且 到右边 -> 拦截
            else if (deltaX < 0 && scrollLeft + clientWidth >= scrollWidth - 1) {
                if (e.cancelable) e.preventDefault()
            }
        }
    }

    const handleKeydown = (e: KeyboardEvent) => {
        if (!isClient) return
        if (preventKeys.has(e.code)) {
            const activeTag = document.activeElement?.tagName
            if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
                if (e.cancelable) e.preventDefault()
            }
        }
    }

    const lockScroll = () => {
        if (!isClient || isLocked) return
        isLocked = true
        // --- 隐藏滚动条并补偿宽度 ---
        const scrollbarWidth = getScrollbarWidth()
        originalOverflow = document.body.style.overflow
        originalPaddingRight = document.body.style.paddingRight
        document.body.style.overflow = 'hidden'
        if (scrollbarWidth > 0) {
            const computedPadding = window.getComputedStyle(document.body).paddingRight // 获取当前可能的 padding，防止覆盖用户原有的样式
            document.body.style.paddingRight = `calc(${computedPadding} + ${scrollbarWidth}px)`
        }
        // ----------------------------------
        window.addEventListener('wheel', handleWheel, { passive: false })
        window.addEventListener('touchmove', handleTouchMove, { passive: false })
        window.addEventListener('touchstart', handleTouchStart, { passive: false })
        window.addEventListener('keydown', handleKeydown)
    }

    const unlockScroll = () => {
        if (!isClient || !isLocked) return
        isLocked = false
        // --- 恢复原始样式 ---
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
        // ------------------------------
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('keydown', handleKeydown)
    }

    sources.forEach((src) => {
        watch(src, () => {
            const anyVisible = sources.some(r => r.value)
            anyVisible ? lockScroll() : unlockScroll()
        }, { immediate: true })
    })

    onUnmounted(() => unlockScroll())

    return { lockScroll, unlockScroll }
}