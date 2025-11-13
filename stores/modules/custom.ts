import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import piniaPersistConfig from "../helper/persist";
import type {ICustom} from "~/api/interface/custom/custom";
import type {IPaint} from "~/api/interface/paint/paint";
import Decimal from "decimal.js";

export const useCustomStore = defineStore(
    'custom',
    () => {
        const carts = ref({} as ICustom.ShoppingCartsStorageRow);

        // 添加购物车商品
        function addition(cart: ICustom.ShoppingCartsStorageRow) {
            carts.value = cart
        }

        // 清空购物车
        function clear() {
            carts.value = {} as ICustom.ShoppingCartsStorageRow;
        }

        // 计算总价
        const subtotal = computed(() => {
            return new Decimal(carts.value.actualAmount || 0)
                .mul(carts.value.quantity || 0)
                .toNumber()
        })

        // 计算总数量
        const subtotalQuantity = computed(() => {
            return Number(carts.value.quantity ?? 0)
        })

        // 缓存的主题
        const themeOptions = ref<IPaint.ThemeRow[]>([])

        const setThemeOptions = (data: IPaint.ThemeRow[]) => {
            themeOptions.value = data
        }

        // 缓存的当前视图
        const currentView = ref<null | string>(null)

        const setCurrentView = (view: string) => {
            currentView.value = view
        }

        // 缓存的步骤历史记录
        const viewHistory = ref<string[]>([])

        const setViewHistory = (history: string[]) => {
            viewHistory.value = history
        }

        // 缓存的当前选中的ID集合
        const themeIdMap = ref<string[]>([])

        const setThemeIdMap = (data: string[]) => {
            themeIdMap.value = data
        }

        const clearCache = () => {
            themeOptions.value = []
            themeIdMap.value = []
            currentView.value = null
            viewHistory.value = []
        }

        return {
            carts,
            subtotal,
            addition,
            clear,
            subtotalQuantity,
            themeOptions,
            setThemeOptions,
            currentView,
            setCurrentView,
            viewHistory,
            setViewHistory,
            themeIdMap,
            setThemeIdMap,
            clearCache
        };
    },
    {
        persist: piniaPersistConfig('custom')
    }
);
