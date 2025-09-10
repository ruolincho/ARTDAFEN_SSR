import type {HttpClient} from "./interface";

/** 在可用 Nuxt 上下文的地方调用，返回插件注入的 Axios 实例 */
export const $http = () => useNuxtApp().$http as HttpClient