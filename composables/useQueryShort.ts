import {deflateSync, inflateSync, strFromU8, strToU8} from 'fflate'
import type {ISearch} from "~/api/interface/search/search";

export type QueryParams = {
    MENU_ID?: string
    TECHNIQUE?: string
    MUTEX?: string
    CHECKBOX?: string
    COLOR?: string
    PRICE?: string
    ARTIST?: string
    GROUP?: string
    RADIO?: string
    BRAND?: string
    KEYWORD?: string
    SEARCH_TYPE?: ISearch.KeywordType
    START_PRICE?: string
    END_PRICE?: string
    SORT?: string
    PAGE?: string
    SHAPE?: string
}

// 将原有的key映射到新的key
const KMAP: Record<string, string> = {
    MENU_ID: 'a',
    MUTEX: 'b',
    TECHNIQUE: 'c',
    CHECKBOX: 'd',
    COLOR: 'e',
    PRICE: 'f',
    ARTIST: 'g',
    SHAPE: 'h',
    GROUP: 'k',
    RADIO: 'l',
    BRAND: 'm',
    KEYWORD: 'n',
    SEARCH_TYPE: 'o',
    START_PRICE: 'p',
    END_PRICE: 'q',
    SORT: 's',
    PAGE: 't',
/*------------------------------------------------------------------------------------------------*/
    parentId: 'x',
    id: 'y',
    name: 'z'
};

// 将新的key映射到原有的key
const RMAP = Object.fromEntries(Object.entries(KMAP).map(([k, v]) => [v, k]));

// 对象数组 → 元组数组
const TUPLE_ARRAY_KEYS = new Set(['d', 'e', 'k', 'l']);   // CHECKBOX, COLOR, GROUP, RADIO
// 单个对象 → 单元组
const TUPLE_OBJECT_KEYS = new Set(['b', 'f', 'g', 'm', 's', 'h']); // MUTEX, PRICE, ARTIST, BRAND, SORT, SHAPE

// 压缩键名
function shrinkKeys(obj: any): any {
    if (Array.isArray(obj)) return obj.map(shrinkKeys);
    if (obj && typeof obj === 'object') {
        const out: any = {};
        for (const [k, v] of Object.entries(obj)) out[KMAP[k] ?? k] = shrinkKeys(v);
        return out;
    }
    return obj;
}

// 还原键名
function restoreKeys(obj: any): any {
    if (Array.isArray(obj)) return obj.map(restoreKeys);
    if (obj && typeof obj === 'object') {
        const out: any = {};
        for (const [k, v] of Object.entries(obj)) out[RMAP[k] ?? k] = restoreKeys(v);
        return out;
    }
    return obj;
}

// 对值做结构压缩
function shrinkValuesDeep(obj: any): any {
    if (Array.isArray(obj)) return obj.map(shrinkValuesDeep);
    if (obj && typeof obj === 'object') {
        const out: any = {};
        for (const [k, v] of Object.entries(obj)) {
            if (TUPLE_ARRAY_KEYS.has(k) && Array.isArray(v)) {
                out[k] = v.map((it: any) => Array.isArray(it) ? it : [it?.h ?? it?.parentId, it?.i ?? it?.id, (it?.j ?? it?.name) ?? undefined].filter(x => x !== undefined));
            } else if (TUPLE_OBJECT_KEYS.has(k) && v && typeof v === 'object' && !Array.isArray(v)) {
                const val = v as Record<string, any>;
                out[k] = [val?.h ?? val?.parentId, val?.i ?? val?.id, (val?.j ?? val?.name) ?? undefined].filter(x => x !== undefined);
            } else {
                out[k] = shrinkValuesDeep(v);
            }
        }
        return out;
    }
    return obj;
}

// 结构还原
function restoreValuesDeep(obj: any): any {
    if (Array.isArray(obj)) return obj.map(restoreValuesDeep);
    if (obj && typeof obj === 'object') {
        const out: any = {};
        for (const [k, v] of Object.entries(obj)) {
            if (TUPLE_ARRAY_KEYS.has(k) && Array.isArray(v)) {
                out[k] = v.map((arr: any) => {
                    if (!Array.isArray(arr)) return arr;
                    const o: any = {};
                    if (arr.length > 0) o.h = arr[0];
                    if (arr.length > 1) o.i = arr[1];
                    if (arr.length > 2) o.j = arr[2];
                    return o;
                });
            } else if (TUPLE_OBJECT_KEYS.has(k) && Array.isArray(v)) {
                const a: any[] = v;
                const o: any = {};
                if (a.length > 0) o.h = a[0];
                if (a.length > 1) o.i = a[1];
                if (a.length > 2) o.j = a[2];
                out[k] = o;
            } else {
                out[k] = restoreValuesDeep(v);
            }
        }
        return out;
    }
    return obj;
}

// URL-safe base64 helpers
function b64urlFromBytes(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
    const b64 = typeof btoa !== 'undefined' ? btoa(binary) : (globalThis as any).Buffer.from(binary, 'binary').toString('base64');
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function bytesFromB64url(s: string): Uint8Array {
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
    const binary = typeof atob !== 'undefined' ? atob(b64) : (globalThis as any).Buffer.from(b64, 'base64').toString('binary');
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
    return out;
}

// 压缩查询参数
export function packQuery(obj: Record<string, any>): string {
    const withShortKeys = shrinkKeys(obj);
    const valueCompacted = shrinkValuesDeep(withShortKeys);
    const jsonMin = JSON.stringify(valueCompacted);
    const u8 = strToU8(jsonMin);
    const compressed = deflateSync(u8, {level: 9});
    return b64urlFromBytes(compressed);
}

// 解压查询参数
export function unpackQuery<T = any>(token?: string | null): T | null {
    if (!token) return null;
    try {
        const bytes = bytesFromB64url(token);
        const u8 = inflateSync(bytes);
        const json = strFromU8(u8);
        const withTuplesRestored = restoreValuesDeep(JSON.parse(json));
        const restored = restoreKeys(withTuplesRestored);
        // Map h/i/j back to parentId/id/name
        const fix = (x: any): any => {
            if (Array.isArray(x)) return x.map(fix);
            if (x && typeof x === 'object') {
                const o: any = {};
                for (const [k, v] of Object.entries(x)) {
                    if (k === 'h') o.parentId = v;
                    else if (k === 'i') o.id = v;
                    else if (k === 'j') o.name = v;
                    else o[k] = fix(v);
                }
                return o;
            }
            return x;
        };
        return fix(restored) as T;
    } catch {
        return null;
    }
}
