<template>
  <section>
    <div class="container-middle">
      <h1 class="text-30 f-bold title1">Our Return Policy</h1>
      <p class="text-14 text1 mb-15">
        Thank you for shopping with ARTDAFEN.
        We take pride in the quality of our art pieces and want you to be fully satisfied with your purchase. Please read our return and exchange policy carefully.
      </p>

      <h2 class="text-18 f-bold title1">
        1. Returns
      </h2>
      <p class="text-14 text1 mb-15">You may request a return within 14 days of receiving your artwork.</p>
      <p class="text-14 text1 mb-15">To be eligible for a return, items must be unused, in the original packaging, and in the same condition as when you received them.</p>
      <p class="text-14 text1 mb-15">Custom or commissioned artwork is not eligible for return, unless it arrives damaged or defective.</p>

      <h2 class="text-18 f-bold title1">
        2. Exchanges
      </h2>
      <p class="text-14 text1 mb-15">If your artwork arrives damaged or defective, we will gladly offer an exchange for the same item or a replacement of equal value.</p>
      <p class="text-14 text1 mb-15">To request an exchange, please contact us at <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a> within 7 days of delivery, including a photo of the item and its packaging.</p>

      <h2 class="text-18 f-bold title1">
        3. Refunds
      </h2>
      <p class="text-14 text1 mb-15">Once your return is received and inspected, we will notify you of the approval or rejection of your refund.</p>
      <p class="text-14 text1 mb-15">Approved refunds will be processed within 7–10 business days to your original payment method.</p>
      <p class="text-14 text1 mb-15">Shipping costs are non-refundable, except when the return is due to our error (e.g., wrong or damaged item).</p>

      <h2 class="text-18 f-bold title1">
        4. Shipping for Returns
      </h2>
      <p class="text-14 text1 mb-15">Customers are responsible for return shipping, unless the item is defective or incorrect.</p>
      <p class="text-14 text1 mb-15">We recommend using a trackable shipping service; we cannot guarantee that we will receive your returned item otherwise.</p>

      <h2 class="text-18 f-bold title1">
        5. Damaged or Lost Items
      </h2>
      <p class="text-14 text1 mb-15">Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item.</p>
      <p class="text-14 text1 mb-15">We are not responsible for items damaged or lost during return shipping.</p>

      <h2 class="text-18 f-bold title1">
        6. Contact Us
      </h2>
      <p class="text-14 text1 mb-15">For questions regarding returns or exchanges, please email us at <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>.</p>
      <p class="text-14 text1 mb-15">Our support team will respond within 1–2 business days.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import {CONTACT_EMAIL} from "@/config";
import {pageMeta} from "~/config/pageMeta";

useHead(pageMeta["/our-return-policy"] ?? {});

defineOptions({
  name: 'PrivacyPolicy'
})
</script>

<style scoped lang="scss">
.title1 {
  line-height: 35px;
  margin-bottom: 15px;
}

.text1 {
  line-height: 25px;
  text-align: justify;
}

.list-ul {
  padding-left: 1.5rem; /* 视情况添加 */
  &.disc li {
    list-style-type: disc !important;
  }

  &.decimal li {
    list-style-type: decimal !important;
  }

  li {
    list-style-position: outside !important; /* 或 inside，根据你设计需求 */
  }
}

</style>