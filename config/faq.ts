import {CONTACT_EMAIL, COUNTRY_CODE, CUSTOMER_SERVICE} from "~/config";

export const QUOTE_TYPES = ['shopping', 'footer'] as const;

export type QuoteType = typeof QUOTE_TYPES[number];

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
    quote?: QuoteType[];
    /* 链接 */
    url?: string;
}

export const faqList: FaqCategory[] = [
    {
        name: '1',
        headTitle: 'PAYMENTS',
        list: [
            {
                name: '1-1',
                title: 'WHAT PAYMENT METHODS DO YOU ACCEPT?',
                url: '/faq?name=1-1',
                content: `
          <p>
            We securely accept payments via <strong>PayPal</strong> and all major
            <strong>Credit & Debit Cards</strong>. Your transaction security is our top priority.
          </p>
        `
            },
            {
                name: '1-2',
                title: 'I AM HAVING TROUBLE COMPLETINGTING MY PAYMENT. WHAT SHOULD I DO?',
                url: '/faq?name=1-2',
                content: `
          <p>
            We apologize for the inconvenience. Please try using an alternative card
            or payment method. If the issue persists, please contact our support team at
            <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
              ${CONTACT_EMAIL}
            </a>
            or call us at
            <a class="text-secondary" href="tel:${COUNTRY_CODE}${CUSTOMER_SERVICE}">
              ${COUNTRY_CODE} ${CUSTOMER_SERVICE}
            </a>.
            We will assist you promptly to resolve the issue.
          </p>
        `
            }
        ]
    },
    {
        name: '2',
        headTitle: 'SHIPPING & DELIVERY',
        list: [
            {
                name: '2-1',
                title: 'HOW ARE THE ARTWORKS PACKAGED?',
                url: '/faq?name=2-1',
                quote: ['shopping'],
                content: `
          <p>
            At ARTDAFEN, we treat packaging with the same precision as the painting itself. We adhere to a strict protocol to ensure your art arrives in pristine condition:
          </p>
          <ul>
            <li style="list-style: disc; list-style-position: inside;"><strong>Rolled Canvas (Tube):</strong> Shipped in a heavy-duty, crush-resistant tube. Ideal for keeping shipping costs low. You can have it stretched or framed locally.</li>
            <li style="list-style: disc; list-style-position: inside;"><strong>Stretched / Framed Art (Box):</strong> Protected with corner guards, wrapped in bubble wrap, and shipped in a reinforced cardboard box with ample cushioning to keep it safe and flat.</li>
            <li style="list-style: disc; list-style-position: inside;"><strong>Sculptures & Large Works (Crate)</strong> For bespoke sculptures, large-scale installations, or heavy pieces, we build custom wooden crates designed for global transit, tightly sealed to withstand the journey.</li>
          </ul>
        `
            },
            {
                name: '2-2',
                title: 'WHO DELIVERS & WHERE DO YOU SHIP?',
                url: '/faq?name=2-2',
                quote: ['shopping'],
                content: `
          <p>
            We deliver almost everywhere—from New York to Dubai. We work with premium carriers such as <strong>FedEx</strong>, <strong>DHL</strong>, and <strong>UPS</strong>. For extra-large sculptures or outdoor installations, we coordinate with specialist logistics partners to ensure safe handling.
          </p>
        `
            },
            {
                name: '2-3',
                title: 'HOW MUCH IS SHIPPING & HOW LONG DOES IT TAKE?',
                url: '/faq?name=2-3',
                quote: ['footer', 'shopping'],
                content: `
          <p>
            Shipping is <strong>100% Free Worldwide</strong>. The price you see is the price you pay.
          </p>
          <p>
            Typically shipping takes <strong>5–8 business days</strong> via express carriers (after production is complete). Note: Custom sculptures or large mixed-media works may require additional transit time due to crate handling.
          </p>
        `
            },
            {
                name: '2-4',
                title: 'IS THE DELIVERY INSURED?',
                url: '/faq?name=2-4',
                quote: ['shopping'],
                content: `
          <p>
            Yes, absolutely. ARTDAFEN provides <strong>full transit insurance</strong> for every shipment, including high-value sculptures and bulk orders. Your investment is protected from our studio in Hong Kong to your doorstep at no extra cost.
          </p>
        `
            },
            {
                name: '2-5',
                title: 'DOES FREE SHIPPING INCLUDE CUSTOMS DUTIES?',
                url: '/faq?name=2-5',
                quote: ['footer', 'shopping'],
                content: `
          <p>
          Our free shipping covers the transport costs, but customs duties and import taxes are the responsibility of the customer. Most small orders arrive without fees, but regulations vary by country. If you need assistance with customs documentation, please contact us at <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.
          </p>
        `
            },
            {
                name: '2-6',
                title: 'MY ORDER ARRIVED DAMAGED. WHAT SHOULD I DO?',
                url: '/faq?name=2-6',
                quote: ['shopping'],
                content: `
          <p>
            We are heartbroken if your art arrives in anything less than perfect condition. Please notify us via email at <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> within 3 days of delivery. Kindly attach photos of the packaging and the damage. We will prioritize sending you a replacement free of charge immediately.
          </p>
        `
            },
            {
                name: '2-7',
                title: 'CAN I REQUEST AN EXPEDITED DELIVERY?',
                url: '/faq?name=2-7',
                content: `
          <p>
           We understand that art is often a gift for a special occasion—whether it’s a birthday, an anniversary, or a grand opening event. At Artdafen, we will do our absolute best to meet your deadline.
          </p>
          <p>
          If you are in a rush, <strong>please contact us immediately</strong> before or shortly after placing your order. Here is how we can help:
</p>
 <ul>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>Priority Queue:</strong> We can prioritize your commission in our artist’s schedule.
</li>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>Express Shipping:</strong> We can upgrade your delivery method to the fastest courier available.
</li>
          </ul>
          <p>
          Note: While we can speed up the process, we never compromise on the necessary drying time of the oil paint to ensure your artwork arrives in perfect condition.
</p>
        `
            },


        ]
    },
    {
        name: '3',
        headTitle: 'ARTWORK & CUSTOMIZATION',
        list: [
            {
                name: '3-1',
                title: 'YOUR VISION, OUR MASTERPIECE — DO YOU ACCEPT CUSTOM REQUESTS?',
                url: '/faq?name=3-1',
                content: `
            <p>
            Yes. At ARTDAFEN, we bridge the gap between imagination and reality. We provide a one-stop solution for high-end art:
            </p>
          <ul>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>Photo to Painting:</strong> Turn your cherished memories—portraits, pets, or landscapes—into handmade oil paintings.
</li>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>Unlisted Works:</strong> Can't find what you're looking for? We can recreate museum-quality reproductions of almost any artwork in history.
</li>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>Mixed Media & Textural Art:</strong> We push boundaries by combining materials like metal, resin, wood, fabric, and acrylics to create 3D relief art and heavy-texture abstracts.
            <li style="list-style: disc; list-style-position: inside;">
            <strong>Bespoke Sculptures:</strong> Looking for something dimensional? We specialize in high-fidelity sculpture reproductions, from tabletop decor to large-scale outdoor installations.
          </ul>
          <p>
            Send your request to 
            <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
              ${CONTACT_EMAIL}
            </a>
            to get a custom quote.
          </p>
        `
            },
            {
                name: '3-2',
                title: 'HOW LONG DOES IT TAKE TO CREATE MY ARTWORK?',
                url: '/faq?name=3-2',
                content: `
          <p>
           Quality takes time. Our typical <strong> Production & Approval cycle is 5–10 business days</strong> for oil paintings. For mixed media art or custom sculptures, the timeline may vary based on complexity. We will provide a specific timeline with your quote.
          </p>
        `
            },
            {
                name: '3-3',
                title: 'WILL I SEE THE WORK BEFORE IT SHIPS?',
                url: '/faq?name=3-3',
                quote: ['footer'],
                content: `
          <p>
          <strong>Yes, always</strong>. At Artdafen, transparency is part of our DNA. We don't believe in "blind boxes."
</p>
           <ul>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>Standard Procedure:</strong> You don’t need to ask for it. Once our artist finishes your commission, our studio team will take high-resolution photos of the artwork (including close-ups of the brushwork) and email them to you for approval.
            </li>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>You Have the Final Say:</strong> We only ship the painting after you have given us the green light. If you feel a detail needs adjustment, our artists will modify it until you are satisfied.
            </li>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>Better in Person: </strong> While our photos are high-definition, please keep in mind that a camera cannot fully capture the soul of an oil painting. The layered texture, the play of light on the pigment, and the vibrancy of the colors are always more stunning when viewed with the naked eye.
            </li>
          </ul>
        `
            },
            {
                name: '3-4',
                title: 'WHAT TECHNIQUES DO YOU USE?',
                url: '/faq?name=3-4',
                content: `
          <p>
          For oil paintings, our artists strictly employ the classical <strong>Three-Layer Technique</strong> (Underpainting, Modeling, and Glazing), allowing for proper oxidation between stages.
</p>
          <p>
           Note on Framing: If you select a Solid Wood frame, it must undergo mandatory fumigation and quarantine inspection for export compliance.
          </p>
        `
            },
            {
                name: '3-5',
                title: 'DOES A LOWER PRICE MEAN I’M COMPROMISING ON QUALITY?',
                url: '/faq?name=3-5',
                content: `
          <p>
            Absolutely not. At Artdafen, we follow First Principles thinking to redefine how art is sold. We strip away the "noise" and focus only on what truly matters: the canvas, the paint, and the artist's skill.
          </p>
          <p>
            Here is why our prices are affordable, yet our quality is uncompromising:
          </p>
          <ul>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>First Principles Pricing (Real Value Only):</strong> Unlike traditional galleries that mark up prices to cover expensive real estate and agents, we boil the cost down to its fundamental truths. You are paying strictly for <strong>premium materials and the artist's time</strong>. By removing the middlemen and operating directly from "Studio to Wall," we pass the savings entirely to you.
</li>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>See the Magic Happen (YouTube Proof):</strong> We believe in radical transparency. Don't just take our word for it—watch us work. We regularly post <strong>full-process painting videos on our YouTube channel</strong>, showing how a blank canvas transforms into a masterpiece, stroke by stroke. This is our way of proving that every piece is 100% hand-painted with dedication and soul.
</li>
            <li style="list-style: disc; list-style-position: inside;">
            <strong>Experienced Artists, No Factories:</strong> We are a collective of passionate artists and space decoration specialists. We reject assembly-line production. Every painting is handled by a professional artist who understands texture, light, and composition.
</li>
 <li style="list-style: disc; list-style-position: inside;">
            <strong>Preview Before You Commit:</strong> To give you total peace of mind, we offer a <strong>Photo Preview Service</strong>. Before we ship, we send you high-resolution photos of your actual painting. We only ship when you are fully satisfied with the details.
</li>
          </ul>
          <p>
          <strong>In short: You get museum-quality art, priced by logic, not by luxury markups.</strong>
</p>
        `
            },
            {
                name: '3-6',
                title: 'WHO ARE THE ARTISTS BEHIND ARTDAFEN?',
                url: '/faq?name=3-6',
                content: `
          <p>
At Artdafen, we are not mere resellers; we are deeply rooted in the heart of the global art community. We collaborate exclusively with the <strong>elite tier of artists from the legendary Dafen Oil Painting Village</strong>—the world's epicenter of oil painting.
</p>
<p>
Here is how we distinguish our quality from the mass market:
</p>
           <ul>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>The Top 1% Talent: </strong> While Dafen is home to thousands of painters, we only work with the "Old Masters" of the village. Most of our contracted artists have <strong>20 to 30 years of experience</strong>. We strictly refuse to use art students, apprentices, or factory lines.
            </li>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>Specialization (One Artist, One Style):</strong> We believe in the power of focus. We assign orders based on specific domains. An artist who specializes in <strong>Impressionism (like Van Gogh or Monet)</strong> will not paint a <strong>Classical Portrait</strong>.
                <ul style="padding-left: 20px;">
                    <li style="list-style: circle; list-style-position: inside;">
                      A landscape expert paints landscapes.
                    </li>
                    <li style="list-style: circle; list-style-position: inside;">
                      A portrait master paints faces. This "Single Responsibility" approach ensures that the artist working on your order is a true expert in that specific style, capturing the authentic brushwork and soul of the original masterpiece.
                    </li>
              </ul>
            </li>
          </ul>
        `
            },
        ]
    },
    {
        name: '4',
        headTitle: 'ORDERS',
        list: [
            {
                name: '4-1',
                title: "I HAVEN'T RECEIVED MY CONFIRMATION EMAIL.",
                url: '/faq?name=4-1',
                content: `
          <p>
            If you haven't received an email, please check your spam/junk folder.
          </p>
          <p>
            <strong>Tip:</strong> Search your inbox for "ARTDAFEN" or your Order Number. If you still cannot find it, please contact us at 
            <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
              ${CONTACT_EMAIL}
            </a>.
          </p>
        `
            },
            {
                name: '4-2',
                title: 'I ENTERED THE WRONG ADDRESS. CAN I CHANGE IT?',
                url: '/faq?name=4-2',
                content: `
          <p>
            Please contact us <strong>immediately</strong> via email
            <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
              ${CONTACT_EMAIL}
            </a>
            or call
            <a class="text-secondary" href="tel:${COUNTRY_CODE}${CUSTOMER_SERVICE}">
              ${COUNTRY_CODE} ${CUSTOMER_SERVICE}
            </a>.
            As long as the item has not yet been dispatched, we can update your shipping details.
          </p>
        `
            },
            {
                name: '4-3',
                title: 'MY ORDER IS MISSING ITEMS.',
                url: '/faq?name=4-3',
                content: `
          <p>
          We ship multiple items together whenever possible, but sometimes they are shipped in separate packages (e.g., a rolled canvas and a framed piece). Please contact us at <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
              ${CONTACT_EMAIL}
            </a> with your order details to confirm the status.
          </p>
        `
            }
        ]
    },
    {
        name: '5',
        headTitle: 'RETURNS & REFUNDS',
        list: [
            {
                name: '5-1',
                title: 'WHAT IS YOUR RETURN POLICY?',
                url: '/faq?name=5-1',
                quote: ['footer'],
                content: `
          <p>
            We want you to love your art. If you are not fully satisfied, you may return unused items in their original packaging within <strong>30 days</strong> of delivery. Please email us at <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
              ${CONTACT_EMAIL}
            </a> to initiate a return. Return shipping costs are the customer's responsibility unless the item is damaged.
          </p>
        `
            },
            {
                name: '5-2',
                title: 'CAN I RETURN CUSTOM OR SCULPTURE ORDERS?',
                url: '/faq?name=5-2',
                content: `
          <p>
            Personalized items, bespoke sculptures, and custom commissions are final sale due to their unique nature. However, if there is a defect or quality issue, please let us know immediately so we can resolve it.
          </p>
        `
            }
        ]
    },
    {
        name: '6',
        headTitle: 'HELP & WHOLESALE',
        list: [
            {
                name: '6-1',
                title: 'HOW DO I CONTACT CUSTOMER SUPPORT?',
                url: '/faq?name=6-1',
                content: `
           <p>
           Our dedicated team is here to support you with any questions regarding returns, shipping, or your order status.
           </p>
           
           <ul>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>Email:</strong>
                <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
                  ${CONTACT_EMAIL}
                </a>
            </li>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>Phone:</strong>
                <a class="text-secondary" href="tel:${COUNTRY_CODE}${CUSTOMER_SERVICE}">
              ${COUNTRY_CODE} ${CUSTOMER_SERVICE}
            </a>
            </li>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>Address:</strong>
                Kam Sheung Road, Yuen Long, Hong Kong (DD106 Lot 1479C)
            </li>
            <li style="list-style: disc; list-style-position: inside;">
                <strong>Service Hours:</strong>
                Mon-Fri, 9:00 AM - 6:00 PM (HKT)
            </li>
          </ul>
          <p>
            <strong>Quick Tip:</strong> When emailing us regarding an existing purchase, please include your <strong>Order Number</strong> (e.g., 251106588...) in the subject line. This helps us locate your details instantly.
          </p>
        `
            },
            {
                name: '6-2',
                title: 'WHOLESALE & BULK ORDERS',
                url: '/faq?name=6-2',
                content: `
          <p>
            Ready to scale? Whether you are sourcing for a boutique hotel or curating a private collection, we support bulk purchasing with consistent quality. Please send your project details to <a class="text-secondary" href="mailto:${CONTACT_EMAIL}">
              ${CONTACT_EMAIL}
            </a> including:          
          </p>
          <ul>
            <li style="list-style: disc; list-style-position: inside;">Brand/Company Introduction</li>
            <li style="list-style: disc; list-style-position: inside;">Estimated Quantity</li>
            <li style="list-style: disc; list-style-position: inside;">Project Deadline</li>
          </ul>
          <p>
            Let’s create something extraordinary together.
          </p>
        `
            }
        ]
    }
];

/**
 * 获取指定引用类型的常见问题列表
 * @param quote 引用类型或引用类型数组
 * @returns 常见问题项数组
 */
export function getFaqByQuote(quote: QuoteType | QuoteType[]) {
    const quoteList = Array.isArray(quote) ? quote : [quote];

    return faqList
        .flatMap(category => category.list)
        .filter(item => item.quote?.some(q => quoteList.includes(q)));
}