import {defineStore} from 'pinia';
import piniaPersistConfig from "../helper/persist";
import {ref} from 'vue';
import type {IHome} from "~/api/interface/home/home";

// 定义面包屑每一项的结构
export interface BreadcrumbItem {
    name: string
    path?: string // 如果该层级可以点击跳转，则传入 path；最后一级通常没有 path
}


// 专门用于筛选 L2 的参数类型列表 (剔除 BEST, LIST, CUSTOM, LINK 等非筛选键)
const L2_FILTER_TYPES = ['GROUP', 'PRICE', 'COLOR', 'RADIO', 'CHECKBOX', 'ARTIST', 'MUTEX']

export const useBreadcrumbStore = defineStore(
    'breadcrumb',
    () => {

        // 核心状态：存储当前的面包屑数组（不包含固定死的 Home）
        const breadcrumbs = ref<BreadcrumbItem[]>([])

        // 设置面包屑
        const setBreadcrumbs = (newItems: BreadcrumbItem[]) => {
            breadcrumbs.value = newItems
        }

        // 清空面包屑（回到首页时可能用到）
        const clearBreadcrumbs = () => {
            breadcrumbs.value = []
        }

        return {
            breadcrumbs,
            setBreadcrumbs,
            clearBreadcrumbs,
        }

    },
    {
        persist: piniaPersistConfig('breadcrumb')
    }
);
