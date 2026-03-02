import { joinURL } from 'ufo'
import { defineProvider } from '@nuxt/image/runtime'

export default defineProvider<{ baseURL: string }>({
    getImage(src, { modifiers, baseURL }) {
        const ops: string[] = []

        if (modifiers.width) {
            ops.push(`image/resize,w_${modifiers.width},limit_0`)
        }

        if (modifiers.height) {
            ops.push(`image/resize,h_${modifiers.height},limit_0`)
        }

        return {
            url:
                joinURL(baseURL, src) +
                (ops.length ? `?x-image-process=${ops.join('/')}` : '')
        }
    }
})
