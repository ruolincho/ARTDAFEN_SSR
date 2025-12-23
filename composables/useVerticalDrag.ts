interface UseVerticalDragOptions {
    initialTop?: number
    clickThreshold?: number // 判定是否为拖拽的最小位移
}

export function useVerticalDrag(
    targetRef: { value: HTMLElement | null },
    options: UseVerticalDragOptions = {}
) {
    const isClient = process.client && typeof window !== 'undefined';

    const {
        initialTop = 100,
        clickThreshold = 6
    } = options

    const top = ref(initialTop)
    const enableTransition = ref(false)

    let startY = 0
    let startTop = 0
    let maxTop = 0
    let rafId = 0
    let moved = false

    // ResizeObserver 用于监听元素尺寸变化或 body 尺寸变化
    let resizeObserver: ResizeObserver | null = null

    // 稳健的边界计算
    const calcMaxTop = () => {
        // 如果元素还没渲染出来，直接返回，不要错误地把 maxTop 设为 0
        if (!isClient || !targetRef.value) return

        const h = targetRef.value.offsetHeight
        const screenH = window.innerHeight

        // 计算最大允许的 top 值（屏幕高度 - 元素高度 - 底部安全边距）
        // 减去 10 是为了留一点底部的空隙，不贴死边缘，可根据需要调整
        maxTop = screenH - h - 10

        // 只有当计算结果真的小于 0 时（元素比屏幕还高），才归零
        if (maxTop < 0) maxTop = 0

        // 自动修正当前位置（如果当前 top 已经超出了新的边界，比如切屏导致）
        if (top.value > maxTop) {
            top.value = maxTop
        }
    }

    const onTouchStart = (e: TouchEvent) => {
        if (!isClient) return

        // 每次触摸时强制重新计算, 这确保了即使 v-if 导致组件刚显示，第一次触摸也能拿到正确的高度
        calcMaxTop()

        enableTransition.value = false
        cancelAnimationFrame(rafId)

        startY = e.touches[0]?.clientY ?? 0
        startTop = top.value
        moved = false
    }

    const onTouchMove = (e: TouchEvent) => {
        if (!isClient || !e.touches.length) return

        // 阻止默认滚动，解决“边缘点击无法拖拽”时的浏览器冲突
        // 配合 template 中的 .prevent 使用效果更佳
        if (e.cancelable) {
            // e.preventDefault() // 可以在这里加，也可以在 template 加
        }

        const currentY = e.touches[0]?.clientY ?? 0
        const deltaY = currentY - startY

        // 只有移动超过阈值才算拖拽
        if (!moved && Math.abs(deltaY) > clickThreshold) {
            moved = true
        }

        if (!moved) return

        let nextTop = startTop + deltaY

        // 边界处理
        if (nextTop < 0) nextTop = 0 // 顶部吸附
        if (nextTop > maxTop) nextTop = maxTop // 底部吸附

        rafId = requestAnimationFrame(() => {
            top.value = nextTop
        })
    }

    const onTouchEnd = (e: TouchEvent) => {
        if (!isClient) return

        enableTransition.value = true

        if (moved) {
            // 关键：阻止 click
            if (e.cancelable) e.preventDefault()
            e.stopPropagation()
        }

        // 最终修正，防止越界
        if (top.value < 0) top.value = 0
        if (top.value > maxTop) top.value = maxTop
    }

    // 监听 targetRef 的变化 (解决 v-if 问题)
    watch(() => targetRef.value, (el) => {
        if (isClient && el) {
            // 元素出现了！等待渲染完成后计算高度
            nextTick(() => {
                calcMaxTop()
                // 启动 ResizeObserver 监听该元素和 body 的变化
                if (!resizeObserver) {
                    resizeObserver = new ResizeObserver(() => {
                        calcMaxTop()
                    })
                }
                resizeObserver.observe(el)
                resizeObserver.observe(document.body)
            })
        }
    })

    onMounted(() => {
        if (!isClient) return
        // 初始尝试计算
        calcMaxTop()
        window.addEventListener('resize', calcMaxTop)
    })

    onUnmounted(() => {
        if (!isClient) return
        window.removeEventListener('resize', calcMaxTop)
        cancelAnimationFrame(rafId)
        if (resizeObserver) resizeObserver.disconnect()
    })

    return {
        top,
        enableTransition,
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}
