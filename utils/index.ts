import type {UploadFile} from "element-plus";

/**
 * 图片添加服务器前缀
 * @param path
 * @param defaultImage
 */
export function imagePrefix(path: string, defaultImage = false) {
    const config = useRuntimeConfig()
    defaultImage && !path && (path = '/static/default_avatar1.webp')
    // 域名判断逻辑
    if (path?.startsWith('http')) return path
    return config.public.obsUrl + path
}

/**
 * 图片取消服务器前缀
 * @param path
 */
export function imageUnPrefix(path: string = '') {
    const config = useRuntimeConfig()
    return path.replace(config.public.obsUrl, '')
}

/**
 * 属性格式化 属性中的值可能是 字符串 / 数组 / 对象 需要递归处理
 * @param data
 * @param symbol 是否需要 #
 */
export function formatAttr(data: any, symbol: boolean = true) {
    if (typeof data === 'string' || typeof data === 'number') {
        return `${symbol ? '#' : ''}${data}`
    } else if (typeof data === 'object') {
        let attr = ''
        for (const key in data) {
            attr += formatAttr(data[key], symbol) + ' '
        }
        return attr
    }
}

/**
 * 防抖函数
 * @param func
 * @param delay
 */
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number = 300): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

/**
 * 跳转到新窗口
 * @param urls
 */
export const jumpNewWindow = (urls: string) => {
    const router = useRouter()
    const routePath = router.resolve(urls);
    window.open(routePath.href, '_blank');
}

/**
 * 广告媒体跳转链接
 * @param urls
 */
export const jumpToUrl = (urls: string) => {
    if (!urls) return
    if (urls.indexOf('http') != -1) {
        window.open(urls, '_blank');
    } else {
        jumpNewWindow(urls)
    }
}

/**
 * 产品跳转链接
 * @param item
 */
export const jumpToProduct = (item: General.GoodsItem) => {
    if (['3000012', '3000013', '3000014'].includes(item.techniqueId)) {
        jumpNewWindow(`/paint-detail/${item.id}`)
    } else if (['3000015'].includes(item.techniqueId)) {
        jumpNewWindow(`/original-detail/${item.id}`)
    } else {
        jumpNewWindow(`/spot-detail/${item.id}`)
    }
}

/**
 * 产品跳转链接
 * @param item
 */
export const productLink = (item: General.GoodsItem) => {
    if (['3000012', '3000013', '3000014'].includes(item.techniqueId)) {
        return `/paint-detail/${item.id}`
    } else if (['3000015'].includes(item.techniqueId)) {
        return `/original-detail/${item.id}`
    } else {
        return `/spot-detail/${item.id}`
    }
}

/**
 * 工具方法：dataURL -> Blob
 * @param dataurl
 */
export const dataURLtoBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], {type: mime});
}

/**
 * 获取路径参数（自动获取当前页面的 query 参数）
 * @returns 返回一个对象，包含所有解析的 query 参数
 */
export const getUrlQuery = function (): Record<string, string | string[]> {
    const res: Record<string, string | string[]> = {}

    // 优化点1：使用更高效的正则分割获取查询参数
    const query = (location.href.split(/[?#]/)[1] || '').trim().replace(/^[&]/, '')

    if (!query) return res

    query.split('&').forEach((param) => {
        // 优化点2：合并参数解码操作
        const [encodedKey, ...encodedValues] = param.replace(/\+/g, ' ').split('=')
        if (!encodedKey) return // 跳过空参数

        const key = decodeURIComponent(encodedKey)
        const value = encodedValues.length > 0
            ? decodeURIComponent(encodedValues.join('='))
            : ''

        // 优化点3：简化参数合并逻辑
        res[key] = key in res
            ? [...(Array.isArray(res[key]) ? res[key] : [res[key]]), value]
            : value
    })

    return res
}

/**
 * 获取图片宽高
 * @param file
 */
export const getImageSize = (file: UploadFile): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        if (!file?.raw) {
            return reject(new Error('Invalid file object'));
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file.raw);

        img.onload = () => {
            // 使用自然尺寸获取原始宽高
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
            URL.revokeObjectURL(objectUrl); // 立即释放内存
        };

        img.onerror = (e) => {
            URL.revokeObjectURL(objectUrl); // 出错时也要释放内存
            reject(new Error('Failed to load image'));
        };

        img.src = objectUrl;
    });
}

/**
 * 计算图片形状
 * @param options
 */
export const calculateShape = (
    options: { width: number; height: number }
): Dict.ShapeType => {
    const width = options.width;
    const height = options.height;
    const ratio = width / height;
    if (Math.abs(ratio - 1.0) <= 0.05) {
        return "square";
    } else if (ratio > 1.0) {
        if (ratio >= 1.7 && ratio < 2.1) return 'landscape';
        if (ratio >= 2.1) return "panoramic";
        return "landscape";
    } else {
        if (ratio >= 0.7 && ratio < 1.0) return "portrait";
        if (ratio >= 0.5 && ratio < 0.7) return "slim";
        return "slim";
    }
}


/**
 * 厘米转换为英寸
 * @param cm
 * @param decimalPlaces
 */
export const cm2inch = (cm: string | number, decimalPlaces = 2): number => {
    const num = typeof cm === 'string' ? parseFloat(cm) : cm;

    if (isNaN(num)) {
        console.warn(`Invalid input for cm2inch: ${cm}`);
        return 0;
    }

    const inch = num / 2.54;
    return parseFloat(inch.toFixed(decimalPlaces));
}

/**
 * 扁平化树结构的辅助函数
 * @param nodes
 */
export const flattenTree = (nodes: any[]): any[] => {
    return nodes.reduce((acc, node) => {
        acc.push(node)
        if (node.children) {
            acc.push(...flattenTree(node.children))
        }
        return acc
    }, [])
}

export const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
        return Promise.resolve(navigator.clipboard.writeText(text))
    }

    // 降级方案：创建临时textarea
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        document.body.appendChild(textarea)
        textarea.select()

        try {
            const success = document.execCommand('copy')
            document.body.removeChild(textarea)
            success ? resolve() : reject(new Error('复制失败'))
        } catch (err) {
            document.body.removeChild(textarea)
            reject(err)
        }
    })
}

