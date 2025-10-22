import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import piniaPersistConfig from "../helper/persist";
import type {IShopping} from "~/api/interface/shopping/shopping";
import {shoppingPreCheckApi} from "~/api/modules/shopping/shopping";
import {isEqual} from "lodash-es";

export const useCartStore = defineStore(
    'cart',
    () => {
        const carts = ref<IShopping.ShoppingCartsStorageRow[]>([]);

        // 可以购买的商品
        const canCarts = computed(() => carts.value.filter(item => item.disable !== true))

        // 添加购物车商品
        function addition(cart: IShopping.ShoppingCartsStorageRow) {
            // 查找购物车中是否已有相同的商品
            const existingItem = carts.value.find(item =>
                item.specsId === cart.specsId &&
                item.dimensionId === cart.dimensionId &&
                isEqual(item.parts, cart.parts)
            );

            // console.log('existingItem', existingItem)

            if (existingItem) {
                // 如果找到相同的商品，则增加数量
                existingItem.quantity += 1;
            } else {
                // 否则，添加新的商品
                carts.value.unshift(cart);
            }
        }

        // 删除购物车商品
        function remove(index: number) {
            carts.value.splice(index, 1)
        }

        // 清空购物车
        function clear() {
            carts.value = [];
        }

        // 计算总价
        const subtotal = computed(() => {
            return carts.value.reduce((acc, cur) => {
                // 将价格转换为分进行计算，避免浮点误差
                const priceCents = Math.round(Number(cur.retailPrice) * 100);
                const quantity = Number(cur.quantity);
                return acc + (priceCents * quantity);
            }, 0) / 100; // 最后再转换回元
        })

        // 计算总数量
        const subtotalQuantity = computed(() => {
            return canCarts.value.reduce((acc, cur) => acc + Number(cur.quantity), 0);
        })

        // 购买前置检测
        const shoppingPreCheck = async () => {
            if (!carts.value.length) {
                return
            }

            const params = carts.value.map(item => {
                return {
                    shopId: item.shopId,
                    techniqueId: item.techniqueId,
                    productId: item.productId,
                    specsId: item.specsId,
                    dimensionId: item.dimensionId,
                    parts: item.parts,
                    quantity: item.quantity,
                    retailPrice: item.retailPrice,
                    redeemPoints: item.redeemPoints,
                }
            }) as IShopping.ShoppingCartsRow[];
            const { data } = await shoppingPreCheckApi(params)

            carts.value.forEach((cart, index) => {
                const checkItem = data.find(i =>
                    i.specsId === cart.specsId &&
                    i.dimensionId === cart.dimensionId &&
                    isEqual(i.parts, cart.parts)
                )
                if (checkItem) {
                    cart.retailPrice = checkItem.retailPrice
                    cart.disable = checkItem.disable
                    cart.retailStock = checkItem.retailStock
                    cart.quantity = cart.quantity > Number(checkItem.retailStock) ? Number(checkItem.retailStock) : cart.quantity
                }
            })
        }

        return {
            carts,
            canCarts,
            subtotal,
            addition,
            remove,
            clear,
            subtotalQuantity,
            shoppingPreCheck,
        };
    },
    {
        persist: piniaPersistConfig('cart')
    }
);
