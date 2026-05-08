<template>
  <section>
    <div class="container-middle text-14" style="line-height: 2">
      <h1 class="text-30 f-bold pt-lg-50 py-30">Our Return Policy</h1>
      <h2 class="text-18 f-bold my-15">
        WHAT IS YOUR RETURN POLICY?
      </h2>
      <p>
        <span class="f-bold">Note on Handmade Variations:</span> Please note that because our oil paintings are 100% hand-painted, slight natural variations in color, brushwork, and texture from the digital reference images are expected. These unique, handmade characteristics represent the human element of authentic art and do not qualify as "defective" or "damaged" items for return purposes. Your final approval of the preview photos serves as confirmation of your satisfaction with the artwork.
      </p>
      <h2 class="text-18 f-bold my-15">
        Returns & Exchanges
      </h2>
      <p>
        <span class="f-bold">ARTDAFEN</span> is dedicated to a seamless art-buying experience. To help you collect with
        confidence, we uphold a clear and simple return and exchange policy that prioritizes your satisfaction and makes
        bringing art into your home worry-free.
      </p>
      <h2 class="text-18 f-bold my-15">
        ARTDAFEN Quality Commitment
      </h2>
      <p>
        At <span class="f-bold">ARTDAFEN</span> we are dedicated to the mastery of museum-quality reproductions. Every
        single piece is 100% hand-painted on canvas by professional artists, strictly rejecting machine printing. While
        we faithfully adhere to the reference imagery, the organic nature of true craftsmanship means that subtle
        nuances in brushwork and color blending are inevitable—these are the very hallmarks of an authentic,
        hand-created work. We uphold a rigorous approval process: our artists will refine the details based on your
        feedback until it meets your standards. We stand firmly behind our work—if the delivered artwork deviates from
        the final image we mutually confirmed, you are guaranteed a full refund.
      </p>
      <h2 class="text-18 f-bold my-15">
        Shipping Damage Protection
      </h2>
      <p>
        In the rare case your painting arrives damaged, we will arrange a complimentary replacement or provide a full
        refund.
      </p>
      <p>
        Please share photos of the damage and packaging so we can assist promptly.
      </p>
      <h2 class="text-18 f-bold my-15">
        Custom Artwork Policy
      </h2>
      <ul class="list-ul disc">
        <li>
          Custom colors or sizes are non-returnable after delivery.
        </li>
      </ul>
      <p>
        Each custom piece is made exclusively for you. As these works cannot be resold, we appreciate your
        understanding.
      </p>
      <h2 class="text-18 f-bold my-15">
        30-Day Return Window
      </h2>
      <p>
        You may return or exchange your artwork within 30 days of the delivery date. After 30 days, we unfortunately cannot offer a refund or exchange. Once your return is initiated, you have 14 days to ship the artwork back to us.
      </p>
      <h2 class="text-18 f-bold my-15">
        How to Initiate a Return
      </h2>
      <p>
        To start a return, please follow these steps:
      </p>
      <ul class="list-ul disc">
        <li>
          Contact our support team at <a class="text-secondary" :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a> with your order number and reason for return.
        </li>
        <li>
          Ensure the artwork is in its original condition and securely packaged, ideally in its original box, to prevent transit damage.
        </li>
        <li>
          Ship the artwork directly to our processing center at the following address:
        </li>
      </ul>
      <p>
        <strong>ARTDAFEN Returns Department</strong> {{ STUDIO_ADDRESS }}
      </p>
      <h2 class="text-18 f-bold my-15">
        Return Shipping Costs
      </h2>
      <p>
        <strong>Changed Your Mind (Buyer's Remorse):</strong> If the artwork does not suit your space or style, you are responsible for covering the return shipping costs.
      </p>
      <p>
        <strong>Damaged or Incorrect Items:</strong> In the rare event your painting arrives damaged, ARTDAFEN will arrange a complimentary replacement or provide a full refund. Please email photos of the damage and packaging to <a class="text-secondary" :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a> so we can assist promptly.
      </p>
      <h2 class="text-18 f-bold my-15">
        Refunds & Fees
      </h2>
      <p>
        <strong>Restocking Fee:</strong> We do not charge any restocking fees.
      </p>
      <p>
        <strong>Processing Time:</strong> Once your return is received and inspected at our Shenzhen facility, we will notify you via email. Approved refunds are automatically processed back to your original payment method within <strong>5 to 7 business days</strong>.
      </p>
      <h2 class="text-18 f-bold my-15">
        Need Assistance?
      </h2>
      <p>
        Our dedicated team is here to support you with any questions regarding returns, exchanges, shipping, or your
        order status.
      </p>
      <p>
        <strong>Quick Tip:</strong> When emailing us regarding an existing purchase, please include your <strong>Order Number</strong> (e.g., 2511065885200f3adm5vhknb4) in the subject line. This helps us locate your details and serve you faster.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import {resolvePageMeta} from "~/config/pageMeta";
import {CONTACT_EMAIL} from "~/config";
import {STUDIO_ADDRESS} from "../config";

useHead(resolvePageMeta("/our-return-policy"));

defineOptions({
  name: 'PrivacyPolicy'
})
</script>

<style scoped lang="scss">
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