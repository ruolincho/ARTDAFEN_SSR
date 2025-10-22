import JSEncrypt from 'jsencrypt'
import {getPublicKeyApi} from "~/api/modules/oauth/oauth";

export class Encrypt {
    private publicKey: string
    private instance: JSEncrypt

    constructor() {
        this.publicKey = ''
        this.instance = new JSEncrypt()
    }

    /**
     * 获取公钥
     */
    getKey() {
        return new Promise<string>((resolve, reject) => {
            getPublicKeyApi()
                .then((res) => {
                    this.publicKey = res.data
                    this.setKey()
                    resolve(this.publicKey)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /**
     * 设置公钥
     */
    setKey() {
        this.instance.setPublicKey(this.publicKey)
    }

    /**
     * 验证是否有公钥
     */
    verifyKey() {
        return new Promise<string>((resolve, reject) => {
            if (!this.publicKey) {
                this.getKey()
                    .then((key) => {
                        resolve(key)
                    })
                    .catch(() => {
                        return reject()
                    })
            } else {
                resolve(this.publicKey)
            }
        })
    }

    /**
     * 加密
     */
    encrypt(val: string) {
        return new Promise<string>((resolve, reject) => {
            this.verifyKey()
                .then(() => {
                    const encrypted = this.instance.encrypt(val) as string
                    resolve(encrypted)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

export default defineNuxtPlugin(() => {
    // 仅在客户端使用 jsencrypt
    const encryptor = new Encrypt()

    // 提供统一注入：useNuxtApp().$encrypt
    return {
        provide: {
            encrypt: encryptor,
        }
    }
})
