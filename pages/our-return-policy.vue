<template>
  <section>
    <div class="container-middle text-14" style="line-height: 2">
      <h1 class="text-30 f-bold pt-lg-50 py-30">Our Return Policy</h1>
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
        30-Day Return Guarantee
      </h2>
      <p>
        You may request a return within 30 days of delivery, for any reason.
      </p>
      <p>
        We will assist in arranging return shipping. The shipping cost will be your responsibility.
      </p>
      <h2 class="text-18 f-bold my-15">
        Important Return Conditions
      </h2>
      <ul class="list-ul disc">
        <li>
          Return requests must be submitted within <span class="f-bold">30 days</span> of delivery.
        </li>
        <li>
          Once approved, you have <span class="f-bold">14 days</span> to return the artwork.
        </li>
        <li>
          The artwork must be in <span class="f-bold">original condition</span> and securely packaged, ideally in its
          original box.
        </li>
      </ul>
      <h2 class="text-18 f-bold my-15">
        Changed Your Mind?
      </h2>
      <p>
        We understand a piece may not always suit your space, style, or scale.
      </p>
      <p>
        You may return your artwork within 30 days of delivery, with return shipping costs covered by you.
      </p>
      <p>
        Once received in its original condition, a full refund will be promptly issued.
      </p>
      <p>
        Tip: Package the artwork with care to ensure safe transit back to us.
      </p>
      <h2 class="text-18 f-bold my-15">
        Need Assistance?
      </h2>
      <p>
        Our dedicated team is here to support you with any questions regarding returns, exchanges, shipping, or your
        order status.
      </p>
      <h2 class="text-18 f-bold my-15">
        Contact Us
      </h2>
      <ul class="list-ul disc">
        <li>
          <span class="f-bold">Email:</span> <a class="text-secondary"
                                                :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
        </li>
        <li>
          <span class="f-bold">Phone:</span> <a class="text-secondary" :href="`tel:${COUNTRY_CODE}${CUSTOMER_SERVICE}`">{{
            COUNTRY_CODE
          }} {{ CUSTOMER_SERVICE }}</a> (Available Mon-Fri, 9:00 AM - 6:00 PM HKT)
        </li>
      </ul>
      <p>
        <span class="f-bold">Quick Tip:</span>
        When emailing us regarding an existing purchase, please include your <span class="f-bold">Order Number</span>
        (e.g.,
        2511065885200f3adm5vhknb4) in the subject line. This helps us locate your details and serve you faster.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import {resolvePageMeta} from "~/config/pageMeta";
import {COUNTRY_CODE, CUSTOMER_SERVICE, CONTACT_EMAIL} from "~/config";

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