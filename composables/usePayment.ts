import {loadScript, type PayPalNamespace} from '@paypal/paypal-js'
import type {
    PayPalButtonCreateOrder,
    PayPalButtonOnApprove,
    PayPalButtonOnClick,
    PayPalButtonOnInit
} from "@paypal/paypal-js/types/components/buttons"

// ------- PayPal -------
export interface PaypalOptions {
    // 容器ID
    containerId: string
    // 客户端ID
    clientId: string
    // 货币
    currency: string
    // PayPal 创建订单唤起支付回调
    createOrder: PayPalButtonCreateOrder
    // PayPal 支付成功回调
    onApprove: PayPalButtonOnApprove
    // PayPal 初始化回调
    onInit?: PayPalButtonOnInit
    // PayPal 点击支付按钮
    onClick?: PayPalButtonOnClick
}

export async function initPaypal(options: PaypalOptions) {

    const isPayPalButtonMounted = () => {
        if (typeof window === "undefined") return false
        const container = document.querySelector(options.containerId)
        return !!container?.querySelector("iframe")
    }

    if (isPayPalButtonMounted()) return true

    let paypal: PayPalNamespace | null = null

    try {
        paypal = await loadScript({
            clientId: options.clientId,
            currency: options.currency,
            components: ['buttons'],
            disableFunding: ['card']
        })
    } catch (err) {
        console.error("Failed to load PayPal SDK", err)
        return
    }

    if (!paypal) return

    try {
        await paypal.Buttons!({
            createOrder: options.createOrder,
            onApprove: options.onApprove,
            ...(options.onInit ? {onInit: options.onInit} : {}),
            ...(options.onClick ? {onClick: options.onClick} : {}),
        }).render(options.containerId)
    } catch (err) {
        console.error("Failed to render PayPal Buttons", err)
    }
}

// ------- GooglePay 后续开发-------