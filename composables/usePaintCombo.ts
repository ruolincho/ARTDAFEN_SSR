import {getCombinationApi} from "~/api/modules/paint/paint"
import type {IPaint} from "~/api/interface/paint/paint"
import {cm2inch} from "~/utils"

// --- 静态常量抽离，避免重复创建 ---
const notFrame = {id: '', name: 'No Frame (Rolled in a Tube)', price: '0.00', img: '/trade/paint/frame/NOT/img.webp'} // 无框单项
const noMat = {id: '', name: 'No Mat', price: '0.00', specs: []} // 无卡纸单项

export function usePaintCombo(options: {
    getCode: () => string; // 动态获取当前的 code
    getRatio: () => string; // 动态获取当前的 ratio
    onGuideInit?: () => void; // 用于触发新手引导的回调
    getExtraSpecs?: () => Record<string, any>; // 增加动态获取额外 Specs 的配置项
}) {

    const loadingCombo = ref(false) // 组合加载中
    const firstLoadCombo = ref(false) // 第一次加载组合

    // ---- 尺寸 ----
    // 尺寸选项
    const sizeOptions = ref<IPaint.CombinationParts[]>([])
    // 选择的尺寸Id
    const currentSizeId = ref('')
    // 当前尺寸选项
    const currentSizeOption = computed(() => sizeOptions.value.find(item => item.id === currentSizeId.value))
    // 选择尺寸
    const chooseSize = async (sizeId: string) => {
        // currentSizeId.value = sizeId 赋值交给了组件的v-model
        await fetchCombination()
    }

    // ---- 画框 ----
    // 内框单项
    const innerFrame = ref({} as IPaint.CombinationParts)
    // 画框选项
    const frameOptions = ref<IPaint.CombinationParts[]>([])
    // 选择的画框Id
    const currentFrameId = ref('')
    // 当前画框选项
    const currentFrameOption = computed(() => frameOptions.value.find(item => item.id === currentFrameId.value))
    // 选中的是否是内框
    const isInnerFrame = computed(() => currentFrameId.value === innerFrame.value?.id)
    // 是否有画框
    const hasFrame = computed(() => !isInnerFrame.value && currentFrameId.value !== '')
    // 选择画框（本地状态联动）
    const chooseFrame = (item: IPaint.CombinationParts) => {
        // currentFrameId.value = item.id 赋值交给了组件的v-model
        if (hasMat.value) {
            if (!item.config?.matSupport) {
                currentMaterialId.value = ''
                currentMaterialWidth.value = ''
            } else if (currentMaterialId.value === '') {
                currentMaterialId.value = materialOptions.value[0]?.id || '' // 拿到第一个卡纸ID
                currentMaterialWidth.value = materialOptions.value[0]?.specs?.[0]?.matWidth || '' // 拿到第一个卡纸宽度
            }
        }
    }

    // --- 卡纸 ---
    // 是否可以选择卡纸
    const hasMat = ref(false)
    // 卡纸选项
    const materialOptions = ref<IPaint.CombinationParts[]>([])
    // 选择的卡纸Id
    const currentMaterialId = ref('')
    // 当前卡纸宽度选项
    const currentMaterialWidth = ref('')
    // 当前卡纸选项
    const currentMaterialOption = computed(() => materialOptions.value.find(item => item.id === currentMaterialId.value))
    // 是否有卡纸选项（多了个画框配置中是否支持卡纸）
    const matVisible = computed(() => currentFrameOption.value?.config?.matSupport && hasMat.value)

    // 画框金额，如果没选择卡纸就需要加内框的金额
    const frameMoney = computed(() => {
        const price = Number(currentFrameOption.value?.price) || 0 // 当前框的价格
        const surcharge = Number(currentFrameOption.value?.surcharge) || 0 // 当前框的手续费
        if (!hasFrame.value) { // 卷轴直接返回金额
            return price + surcharge
        } else {
            if (currentMaterialId.value === '') { // 没有选择卡纸
                return price + surcharge + Number((innerFrame.value?.price || 0))
            } else {
                return price + surcharge
            }
        }
    })

    // 总价
    const totalPrice = computed(() => {
        const sizePrice = currentSizeOption.value?.price || 0
        const framePrice = frameMoney.value || 0
        const matPrice = !!currentMaterialId.value && hasFrame.value ? (currentMaterialOption.value?.price || 0) : 0
        return Number(sizePrice) + Number(framePrice) + Number(matPrice)
    })

    // 核心网络请求闭环
    const fetchCombination = async (senior = false) => {
        loadingCombo.value = true
        try {
            // 动态调用注入的 getCode 和 getRatio 拿到最新参数
            const {data} = await getCombinationApi({
                code: options.getCode(),
                ratio: options.getRatio(),
                dimensionId: currentSizeId.value || null,
            })

            sizeOptions.value = data.size || [] // 尺寸选项
            innerFrame.value = data.parts.inner_frame[0]! // 内框单项
            frameOptions.value = [notFrame, innerFrame.value, ...(data.parts?.frame || [])] // 画框选项

            // 是否可以选择卡纸
            hasMat.value = !!data.parts?.mat?.length
            // 卡纸选项
            materialOptions.value = hasMat.value ? [...data.parts.mat, noMat] : []

            // 默认选中尺寸提取
            const selectDefaultSize = () => {
                const defaultSelect = sizeOptions.value.find(item => item.selected === '1') // 拿到默认选中的尺寸选项
                if (defaultSelect) {
                    currentSizeId.value = defaultSelect.id // 选中
                } else if (sizeOptions.value.length > 0) {
                    currentSizeId.value = sizeOptions.value[0]?.id || '' // 拿到第一个尺寸ID
                }
            }

            // 首次加载初始化（默认选中一些规格）
            if (!firstLoadCombo.value) {
                selectDefaultSize()

                // const innerFrameId = innerFrame.value.id || '' // 拿到内框ID
                // if (innerFrameId) { // 有内框默认选中内框
                //   currentFrameId.value = innerFrameId
                // } else {
                //   currentFrameId.value = frameOptions.value[0].id // 拿到第一个画框ID
                // }

                if (hasMat.value) {
                    currentMaterialId.value = materialOptions.value[0]?.id || '' // 拿到第一个卡纸ID
                    currentMaterialWidth.value = materialOptions.value[0]?.specs?.[0]?.matWidth || '' // 拿到第一个卡纸宽度
                }
            }

            // 高级选项比较
            if (senior) {
                if (currentSizeId.value && !sizeOptions.value.some(item => item.id === currentSizeId.value)) {
                    selectDefaultSize()
                }
                if (currentFrameId.value && !frameOptions.value.some(item => item.id === currentFrameId.value)) {
                    currentFrameId.value = ''
                }

                if (!hasMat.value || !currentFrameOption.value?.config?.matSupport) {
                    currentMaterialId.value = ''
                    currentMaterialWidth.value = ''
                } else if (currentMaterialId.value === '') {
                    currentMaterialId.value = materialOptions.value[0]?.id || '' // 拿到第一个卡纸ID
                    currentMaterialWidth.value = materialOptions.value[0]?.specs?.[0]?.matWidth || ''  // 拿到第一个卡纸宽度
                }
            }

            // 触发新手引导
            if (!firstLoadCombo.value && options.onGuideInit) {
                options.onGuideInit()
            }

            firstLoadCombo.value = true
        } catch (error) {
            console.error('Failed to fetch combination:', error)
        } finally {
            loadingCombo.value = false
        }
    }

    // 商品规格
    const specs = computed(() => {
        // 商品规格值
        let currentFrameName = currentFrameOption.value?.name
        const thickness = currentFrameOption.value?.config?.thickness
        if (thickness) currentFrameName += ` (${cm2inch(thickness)} in wide)`

        // 执行外部传入的 Getter 函数获取额外的 Specs。
        const extraSpecs = options.getExtraSpecs ? options.getExtraSpecs() : {}

        const specs: Record<string, any> = {
            'Painting Size': currentSizeOption.value?.name,  // 尺寸名称
            'Frame': !hasFrame.value ? currentFrameName : currentMaterialId.value === '' ? currentFrameName + ', ' + innerFrame.value?.name : currentFrameName, // 画框名称
            ...extraSpecs // 响应式合并
        }

        if (hasFrame.value && !!currentMaterialId.value) {
            specs['Mounting On'] = 'Moisture Proof Backboard, Glass, Mat' // 玻璃、背板
            specs['Mat Color'] = currentMaterialOption.value?.name // 卡纸颜色
            specs['Mat Width'] = `${currentMaterialWidth.value}″` // 卡纸宽度
        }
        return specs
    })

    // 商品配件
    const parts = computed(() => {
        const parts: Record<string, any> = {}
        if (currentFrameId.value !== '') {
            parts[currentFrameId.value] = {}
            if (hasFrame.value && currentMaterialId.value === '') parts[innerFrame.value.id] = {}
        }
        if (hasFrame.value && !!currentMaterialId.value) {
            parts[currentMaterialId.value] = {
                'Mounting On': 'Moisture Proof Backboard, Glass, Mat',
                'Mat Width': `${currentMaterialWidth.value}″`,
            }
        }

        return parts
    })

    // 重置状态
    const resetCombo = () => {
        firstLoadCombo.value = false
        currentSizeId.value = ''
        currentFrameId.value = ''
        currentMaterialId.value = ''
    }

    return {
        // 状态与计算属性
        loadingCombo, firstLoadCombo,
        sizeOptions, currentSizeId, currentSizeOption,
        frameOptions, currentFrameId, currentFrameOption, innerFrame, isInnerFrame, hasFrame, frameMoney,
        materialOptions, currentMaterialId, currentMaterialOption, currentMaterialWidth, hasMat, matVisible,
        totalPrice,
        specs,
        parts,

        // 交互方法闭环
        fetchCombination,
        chooseSize,
        chooseFrame,

        // 辅助工具
        resetCombo

    }
}