import { loadScript, type PayPalNamespace } from '@paypal/paypal-js'
import type { OnApproveActions, OnApproveData } from "@paypal/paypal-js/types/components/buttons"

// ------- PayPal -------
export interface PaypalOptions {
    containerId: string
    clientId: string
    currency: string
    createOrder: () => Promise<string>
    onApprove: (data: OnApproveData, actions: OnApproveActions) => Promise<void>
}

export async function initPaypal(options: PaypalOptions) {
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
        await paypal.Buttons({
            createOrder: options.createOrder,
            onApprove: options.onApprove
        }).render(options.containerId)
    } catch (err) {
        console.error("Failed to render PayPal Buttons", err)
    }
}

// ------- GooglePay 后续开发-------