/**
 * useIndexedDBBase64.ts
 * 通用 IndexedDB Base64 存储工具（兼容 Nuxt SSR）
 */

export function useIndexedDBBase64(dbName = 'AppDB', storeName = 'base64') {
    const isClient = typeof window !== 'undefined' && typeof indexedDB !== 'undefined'

    /** 打开数据库（仅客户端） */
    const openDB = (): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            if (!isClient) {
                reject(new Error('IndexedDB is not available during SSR'))
                return
            }

            const request = indexedDB.open(dbName, 1)

            request.onerror = () => reject(request.error)
            request.onupgradeneeded = () => {
                const db = request.result
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName)
                }
            }
            request.onsuccess = () => resolve(request.result)
        })
    }

    /** 存储 base64 */
    const saveBase64 = async (key: string, base64: string): Promise<void> => {
        if (!isClient) return
        const db = await openDB()
        const tx = db.transaction(storeName, 'readwrite')
        tx.objectStore(storeName).put(base64, key)
        return new Promise((resolve, reject) => {
            tx.oncomplete = () => resolve()
            tx.onerror = () => reject(tx.error)
        })
    }

    /** 读取 base64 */
    const getBase64 = async (key: string): Promise<string | null> => {
        if (!isClient) return null
        const db = await openDB()
        const tx = db.transaction(storeName, 'readonly')
        const request = tx.objectStore(storeName).get(key)
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result || null)
            request.onerror = () => resolve(null)
        })
    }

    /** 删除指定项 */
    const removeBase64 = async (key: string): Promise<void> => {
        if (!isClient) return
        const db = await openDB()
        const tx = db.transaction(storeName, 'readwrite')
        tx.objectStore(storeName).delete(key)
    }

    /** 清空所有 */
    const clearAll = async (): Promise<void> => {
        if (!isClient) return
        const db = await openDB()
        const tx = db.transaction(storeName, 'readwrite')
        tx.objectStore(storeName).clear()
    }

    return {
        isClient,
        saveBase64,
        getBase64,
        removeBase64,
        clearAll,
    }
}
