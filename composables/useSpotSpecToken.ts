import {deflateSync, inflateSync, strFromU8, strToU8} from 'fflate'

export type SpecPair = { name: string; val: string }

// URL safe base64
function b64url(bytes: Uint8Array) {
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
    // @ts-ignore
    const b64 = typeof btoa !== 'undefined' ? btoa(bin) : Buffer.from(bin, 'binary').toString('base64')
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64url(s: string) {
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)
    // @ts-ignore
    const bin = typeof atob !== 'undefined' ? atob(b64) : Buffer.from(b64, 'base64').toString('binary')
    const out = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
    return out
}

// 压缩：只存 [ [name,val], ... ] 的二维数组，最短
export function packSpecs(specs: SpecPair[]): string {
    const tuple = specs.map(s => [s.name, s.val])
    const json = JSON.stringify(tuple)
    const u8 = strToU8(json)
    const comp = deflateSync(u8, {level: 9})
    return b64url(comp)
}

// 解压回 [{name,val}]
export function unpackSpecs(token?: string | null): SpecPair[] | null {
    if (!token) return null
    try {
        const raw = inflateSync(fromB64url(token))
        const tuple = JSON.parse(strFromU8(raw)) as [string, string][]
        return tuple.map(([name, val]) => ({name, val}))
    } catch {
        return null
    }
}
