import defaultImg from '~/assets/images/placeholder-image.webp'

export const useImage = () => {
    const config = useRuntimeConfig() // 整个组件生命周期只执行一次
    const obsUrl = config.public.obsUrl || ''

    /**
     * 图片添加服务器前缀
     * @param path
     */
    const imagePrefix = (path?: string | null) => {
        if (!path) return defaultImg
        if (path.startsWith('http')) return path
        return obsUrl + path
    }

    /**
     * 图片取消服务器前缀
     * @param path
     */
    const imageUnPrefix = (path: string = '') => {
        return path.replace(obsUrl, '')
    }

    const getMobileSrcset = (imgPath: string) => {
        imgPath = imagePrefix(imgPath)
        const widths = [414, 768]
        const srcset = widths
            .map(w => `${imgPath}?x-image-process=image/resize,w_${w},limit_0 ${w}w`)
            .join(', ')
        return { srcset, src: `${imgPath}?x-image-process=image/resize,w_768,limit_0` }
    }

    function getPcSrcset(imgPath: string) {
        imgPath = imagePrefix(imgPath)
        const widths = [992, 1260, 1460, 1680, 1920]
        const srcset = widths
            .map(w => `${imgPath}?x-image-process=image/resize,w_${w},limit_0 ${w}w`)
            .join(', ')
        return { srcset, src: `${imgPath}?x-image-process=image/resize,w_1260,limit_0` }
    }

   return {
       imagePrefix,
       imageUnPrefix,
       getMobileSrcset,
       getPcSrcset
   }
}