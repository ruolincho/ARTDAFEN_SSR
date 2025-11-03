import { watch, onUnmounted, isRef, type Ref } from 'vue'

/**
 * 锁定滚动条（支持多个响应式布尔值）
 * @example
 * useLockScroll(isVisible)
 * useLockScroll([isVisible1, isVisible2])
 * useLockScroll(isVisible1, isVisible2)
 */
export function useLockScroll(...args: (Ref<boolean> | Ref<boolean>[])[]) {
    let scrollTop = 0
    let isLocked = false

    // 统一格式 => 所有监听目标变成一个数组
    const sources: Ref<boolean>[] = args.flat().filter(isRef)

    const lockScroll = () => {
        if (isLocked) return
        isLocked = true

        // 1️⃣ 获取滚动条宽度
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

        // 2️⃣ 记录当前滚动位置
        scrollTop = window.scrollY

        // 3️⃣ 锁定滚动但不改变布局宽度
        document.documentElement.style.overflow = 'hidden'
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const unlockScroll = () => {
        if (!isLocked) return
        isLocked = false

        document.documentElement.style.overflow = ''
        document.documentElement.style.paddingRight = ''
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''

        // 恢复原滚动位置（在 iOS 上没副作用）
        window.scrollTo(0, scrollTop)
    }

    // 独立监听每个 ref
    sources.forEach((src) => {
        watch(
            src,
            () => {
                const anyVisible = sources.some((r) => r.value)
                if (anyVisible) lockScroll()
                else unlockScroll()
            },
            { immediate: true }
        )
    })

    onUnmounted(() => unlockScroll())

    return { lockScroll, unlockScroll }
}
