import {defineStore} from 'pinia';
import piniaPersistConfig from "../helper/persist";
import {computed, ref} from "vue";
import {getCurrencyApi} from "~/api/modules/home/home";
import type {IHome} from "~/api/interface/home/home";
import {useCartStore} from "~/stores/modules/cart";

export const useCurrencyStore = defineStore(
    'currency',
    () => {

        const symbols: Record<string, string> = {
            "CHF": "CHF", "MXN": "$", "CLP": "$", "ZAR": "R", "THB": "฿",
            "AUD": "$", "ILS": "₪", "JPY": "¥", "PLN": "zł", "GBP": "£",
            "HUF": "Ft", "PHP": "₱", "RUB": "₽", "TWD": "NT$", "HKD": "$",
            "EUR": "€", "DKK": "kr", "CAD": "$", "USD": "$", "NOK": "kr",
            "SGD": "$", "CZK": "Kč", "SEK": "kr", "NZD": "$", "ANG": "ƒ",
            "BRL": "R$", "KRW": "₩"
        }

        const currentCurrency = ref<string>('USD')

        const currencyList = ref<IHome.CurrencyRow[]>()

        const getCurrency = async () => {
            const {data} = await getCurrencyApi()
            currencyList.value = data.map(item => ({
                ...item,
                symbol: symbols[item.code] || ''
            }));
        }

        const setCurrentCurrency = async (currency: string) => {
            currentCurrency.value = currency
            const currencyCookie = useCookie('currency_code', {
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 3, // 3天
                // httpOnly: true // 如果需要前端也读取，就不要设 httpOnly；如需更安全策略，请改为后端 Set-Cookie
            })
            currencyCookie.value = currency
            if (import.meta.client) {
                const cartStore = useCartStore()
                await cartStore.shoppingPreCheck()
                // 重新加载页面
                window.location.reload()
            }
        }

        /**
         * 获取当前货币符号
         */
        const getCurrencySymbol = computed(() => {
            if (!import.meta.client) return ''
            const code = currentCurrency.value
            const parts = new Intl.NumberFormat(navigator.language, {
                style: 'currency',
                currency: code,
                currencyDisplay: 'symbol'
            }).formatToParts(1);
            return parts.find(p => p.type === 'currency')?.value ?? code
        })

        /**
         * 格式化金额
         * @param value 金额值
         * @param code 货币代码，默认当前货币
         */
        const formatToCurrency = (value: string | number, code?: string) => {
            if (!import.meta.client) return ''

            // 转换输入为数字
            const num = typeof value === 'string' ? parseFloat(value) : value;
            if (isNaN(num)) {
                throw new Error('Invalid number format');
            }

            // 判断是否为整数
            const isInteger = Number.isInteger(num);

            // 使用toLocaleString方法格式化数字为金额格式
            return num.toLocaleString(navigator.language, {
                style: 'currency',
                currency: code || currentCurrency.value,
                minimumFractionDigits: isInteger ? 0 : 2,
                maximumFractionDigits: 2,
            });
        }

        return {
            currentCurrency,
            currencyList,
            getCurrency,
            setCurrentCurrency,
            formatToCurrency,
            getCurrencySymbol,
        };
    },
    {
        persist: piniaPersistConfig('currency')
    }
);
