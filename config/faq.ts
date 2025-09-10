import {CONTACT_EMAIL} from "@/config/index.ts";

export interface FaqCategory {
    /* 唯一标识 */
    name: string;
    /* 聚合标题 */
    headTitle: string;
    /* 聚合项 */
    list: FaqItem[];
}

export interface FaqItem {
    /* 唯一标识 */
    name: string;
    /* 标题 */
    title: string;
    /* 富文本 */
    content: string;
    /* 引用的页面,是一个数组，可以有多个，比如['shopping'] */
    quote?: Array<'shopping'>;
}

export const faqList: FaqCategory[] = [
    {
        name: '1',
        headTitle: 'PAYMENTS',
        list: [
            {
                name: '1-1',
                title: 'WHAT PAYMENT METHODS DO YOU ACCEPT?',
                content: '<p>We accept payments via PayPal and Credit Cards.</p>'
            },
            {
                name: '1-2',
                title: 'I AM HAVING TROUBLE COMPLETING MY PAYMENT. WHAT SHOULD I DO?',
                content: `We apologize for the inconvenience. Please attempt an alternative payment method, or contact us directly at ${CONTACT_EMAIL} for assistance. We will respond promptly to resolve the issue.</p>`
            }
        ]
    },
    {
        name: '2',
        headTitle: 'DELIVERY',
        list: [
            {
                name: '2-1',
                title: 'HAS MY ORDER BEEN SHIPPED YET?',
                content: `<p>All orders are typically processed and shipped within 1-5 business days. You will receive an automated shipping notification email once your order has been dispatched. If you have not received a shipping notification after 7 business days, please contact us at ${CONTACT_EMAIL}.</p>`,
                quote: ['shopping']
            },
            {
                name: '2-2',
                title: 'HOW CAN I TRACK MY PACKAGE?',
                content: `<p>Upon shipment of your order, you will receive a separate email containing your tracking information. For any inquiries regarding your tracking details, please email us at ${CONTACT_EMAIL}.</p>`
            },
            {
                name: '2-3',
                title: 'WHEN WILL I RECEIVE MY ORDER?',
                content: '<p>Delivery times vary depending on the destination country. Typically, orders are delivered within 1-2 weeks after the shipping notification email is sent. The provided tracking information will show the current status and any potential delays. Should you have any concerns about your shipment\'s progress, please do not hesitate to contact us.</p>'
            },
            {
                name: '2-4',
                title: 'MY ORDER IS DELAYED. WHAT SHOULD I DO?',
                content: `<p>Please consult the tracking information provided in your shipping notification email for the most current status and any updates regarding delays. If the tracking details are unclear or you have specific concerns about your shipment, please contact us at ${CONTACT_EMAIL}.</p>`
            },
            {
                name: '2-5',
                title: 'MY ORDER ARRIVED DAMAGED. WHAT SHOULD I DO?',
                content:
                    `
                        <p>We sincerely apologize for this situation. To facilitate a resolution, please notify us via email at ${CONTACT_EMAIL} within 3 days of delivery. Kindly provide the following documentation to process your replacement:</p>
                        <br/>
                        <ol>
                            <li>Photograph of the damaged external packaging with shipping label clearly visible</li>
                            <li>Image showing the interior of the damaged package</li>
                            <li>Clear overview photograph of the damaged product</li>
                            <li>Detailed images highlighting specific damage areas</li>
                        </ol>
                        <br/>
                        <p>These materials are required for our claims process with the shipping carrier. Upon receipt and verification of the documentation, we will initiate your replacement shipment immediately. </p>
                    `
            },
            {
                name: '2-6',
                title: 'HOW ARE ART PRINTS SHIPPED?',
                content: '<p>All art prints are sold unframed (standard) and are securely packaged using protective materials to ensure safe transit. </p>'
            },
            {
                name: '2-7',
                title: 'IS PACKAGE ARRIVAL GUARANTEED?',
                content: `<p>Yes, we guarantee the safe arrival of your package. In the rare event of loss or damage during transit, we will either issue a full refund or dispatch a replacement. If you experience any such issue, please contact us at ${CONTACT_EMAIL}.</p>`
            },
            {
                name: '2-8',
                title: 'DOES FREE SHIPPING MEAN THERE ARE NO CUSTOMS DUTIES OR TAXES?',
                content: `<p>Our shipping is free of charge; however, it does not include customs duties or import taxes. While most shipments do not incur additional charges, this depends on the regulations of your local customs authority. If you are required to pay duties or taxes and need assistance, please feel free to reach out to us at ${CONTACT_EMAIL}.</p>`
            },
        ]
    },
    {
        name: '3',
        headTitle: 'ORDERS',
        list: [
            {
                name: '3-1',
                title: 'I HAVEN\'T RECEIVED MY ORDER CONFIRMATION / SHIPPING NOTIFICATION.',
                content: `<p>If our emails are not appearing in your inbox, please first check your spam folder. Alternatively, your email address may have been entered incorrectly during checkout. If neither scenario applies, please contact us immediately at ${CONTACT_EMAIL} for order verification. </p>`,
                quote: ['shopping']
            },
            {
                name: '3-2',
                title: 'I PROVIDED AN INCORRECT SHIPPING ADDRESS. HOW CAN I CORRECT THIS? ',
                content: `<p>For address modifications, please email us at ${CONTACT_EMAIL} as soon as possible.</p>`,
            },
            {
                name: '3-3',
                title: 'MY ORDER IS MISSING ITEMS. WHAT IS THE RESOLUTION PROCESS? ',
                content: `<p>We sincerely apologize for this oversight. Please contact us immediately at ${CONTACT_EMAIL} with your order details. We will investigate and resolve the matter promptly.</p>`
            },
            {
                name: '3-4',
                title: 'I PURCHASED A PRE-ORDER ITEM. WHEN WILL IT SHIP?',
                content: `<p>The expected shipping timeframe for pre-order items is clearly indicated on each product page. If your item has not shipped by the specified date, please contact us at ${CONTACT_EMAIL} for assistance.</p>`
            }
        ]
    },
    {
        name: '4',
        headTitle: 'RETURNS & REFUNDS',
        list: [
            {
                name: '4-1',
                title: 'HOW DO I RETURN AN ITEM?',
                content: ` <p>If you are not fully satisfied with your purchase, you may return unused items in their original packaging within 14 days of delivery. Please initiate your return by emailing us at ${CONTACT_EMAIL} to receive authorization and return instructions. Return shipping costs are the customer's responsibility. Refunds will be processed as soon as we receive your returned package. Note: Returns initiated after 14 days cannot be accepted.</p>`,
                quote: ['shopping']
            },
            {
                name: '4-2',
                title: 'CAN I RETURN A PERSONALIZED ITEM?',
                content: '<p>Personalized items are final sale and cannot be returned or refunded due to their bespoke nature.</p>',
                quote: ['shopping']
            },
            {
                name: '4-3',
                title: 'WHAT SHOULD I DO IF MY REFUND IS INCORRECT?',
                content: `<p>We apologize for any discrepancy in your refund. Please contact us immediately at ${CONTACT_EMAIL} with your order details. We will investigate and resolve this matter promptly.</p>`
            },
            {
                name: '4-4',
                title: 'CAN I GET A PRICE ADJUSTMENT IF MY PURCHASE GOES ON SALE?',
                content: '<p>We do not offer retroactive price adjustments or partial refunds for items purchased prior to sale periods.</p>'
            }
        ]
    },
    {
        name: '5',
        headTitle: 'PRODUCT & STOCK',
        list: [
            {
                name: '5-1',
                title: 'DO YOU ACCEPT REQUESTS FOR CUSTOM ARTWORK?',
                content: `<p>Custom sizing may be available for select art prints upon request. Please contact us at ${CONTACT_EMAIL} with your specifications. Important: Custom commissions require additional fees and are non-returnable.</p>`
            },
            {
                name: '5-2',
                title: 'WILL SOLD-OUT ITEMS BE RESTOCKED?',
                content: `<p>While limited edition items typically will not be restocked, we periodically replenish popular designs based on demand. For availability inquiries about specific items, please contact us at ${CONTACT_EMAIL}. We\'ll gladly provide restock updates when available.</p>`
            },
        ]
    },
    {
        name: '6',
        headTitle: 'WHOLESALE',
        list: [
            {
                name: '6-1',
                title: 'WHOLESALE INQUIRIES',
                content: `<p>We welcome interest in stocking our art products! For wholesale opportunities, please contact our sales team at ${CONTACT_EMAIL}. We'll promptly send you the information.</p>`
            }
        ]
    },
]

export const shoppingFaq = faqList
    .flatMap(category => category.list)
    .filter(item => item.quote?.includes('shopping'));