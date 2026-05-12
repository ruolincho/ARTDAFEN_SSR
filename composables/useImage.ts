import defaultImg from '~/assets/images/placeholder-image.webp'

export const useImage = () => {
    const config = useRuntimeConfig() // 整个组件生命周期只执行一次
    const obsUrl = config.public.obsUrl || ''

    const mobileBreakpoint = [414, 768]
    const pcBreakpoint = [992, 1260, 1460, 1680, 1920]

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
        const srcset = mobileBreakpoint
            .map(w => `${imgPath}?x-image-process=image/resize,w_${w},limit_0 ${w}w`)
            .join(', ')
        return { srcset, src: `${imgPath}?x-image-process=image/resize,w_768,limit_0` }
    }

    const getPcSrcset = (imgPath: string) => {
        imgPath = imagePrefix(imgPath)
        const srcset = pcBreakpoint
            .map(w => `${imgPath}?x-image-process=image/resize,w_${w},limit_0 ${w}w`)
            .join(', ')
        return { srcset, src: `${imgPath}?x-image-process=image/resize,w_1260,limit_0` }
    }

    const getResponsiveImage = (imgPath: string) => {
        imgPath = imagePrefix(imgPath);
        // 合并移动端和 PC 端的所有断点宽度
        const srcset = mobileBreakpoint.concat(pcBreakpoint)
            .map(w => `${imgPath}?x-image-process=image/resize,w_${w},limit_0/format,webp ${w}w`)
            .join(', ');

        return {
            srcset,
            // fallback src: 给不支持 srcset 的极老浏览器使用，给个中等尺寸即可
            src: `${imgPath}?x-image-process=image/resize,w_1260,limit_0/format,webp`
        };
    }

   return {
       imagePrefix,
       imageUnPrefix,
       getMobileSrcset,
       getPcSrcset,
       getResponsiveImage,
   }
}