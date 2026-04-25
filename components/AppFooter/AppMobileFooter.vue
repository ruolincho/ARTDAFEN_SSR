<template>
  <footer class="foot-mobile">
    <div class="footer__block-list">
      <div class="footer__block footer__block--text">
        <p class="footer__block-title">ARTDAFEN Vision &amp; Mission</p>
        <div class="prose text-subdued">
          <p>ARTDAFEN brings exquisite oil paintings into your world, transforming spaces with evocative,
            gallery-quality art. We offer a curated collection from the heart of the Dafen community, featuring diverse
            styles and subjects perfect for homes, offices, and beyond. Elevate your everyday and reimagine your world
            with art that inspires connection and creativity.</p>
        </div>
      </div>
      <div
          class="footer__block"
          :class="[index === footerMenu.length - 1 ? 'footer__block--text' : 'footer__block--menu']"
          v-for="(menu, index) in footerMenu" :key="menu.name"
      >
        <p class="footer__block-title">{{ menu.name }}</p>
        <ul class="v-stack" role="list">
          <li v-for="subMenu in menu.children" :key="subMenu.name">
            <NuxtLink class="v-stack-link" :to="subMenu.url" v-if="subMenu.url">{{ subMenu.name }}</NuxtLink>
            <span class="v-stack-link" v-else>{{ subMenu.name }}</span>
          </li>
        </ul>
      </div>
      <div class="footer__block footer__block--text">
        <p class="footer__block-title">Contact</p>
        <div class="prose text-subdued">
          <p>
            Email: <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
          </p>
          <p>
            Phone: <a :href="`tel:${COUNTRY_CODE}${CUSTOMER_SERVICE}`">{{ COUNTRY_CODE }} {{ CUSTOMER_SERVICE }}</a>
          </p>
          <p>
            Business Hours: Mon-Fri 9:00 AM - 6:30 PM (Lunchtime: 12:00 PM - 1:30 PM)
          </p>
          <p>Physical address</p>
          <p>Our Studio & Fulfillment: {{ STUDIO_ADDRESS }}</p>
          <p>Registered Office: {{ REGISTERED_ADDRESS }}</p>
        </div>
      </div>
    </div>
    <div class="social-list my-30 acea-row gap-sm">
      <a
          class="social-item"
          :href="item.url"
          target="_blank"
          v-for="item in SOCIAL_LIST" :key="item.name"
          :title="item.name"
      >
        <span class="iconfont" :class="[item.icon]"></span>
      </a>
    </div>
    <div class="partner-list my-30 acea-row gap-sm">
      <a href="https://www.paypal.com" target="_blank">
        <img src="~/assets/images/payment-methods.png" alt="payment-methods">
      </a>
      <a href="https://www.ups.com" target="_blank">
        <img src="~/assets/images/delivery-methods1.png" alt="UPS">
      </a>
      <!--<a href="https://subang.chemanman.com" target="_blank">-->
      <!--  <img src="~/assets/images/delivery-methods3.png" alt="SuBang">-->
      <!--</a>-->
      <a href="https://www.fedex.com" target="_blank">
        <img src="~/assets/images/delivery-methods2.png" alt="FedEx">
      </a>
      <a href="https://www.dhl.com" target="_blank">
        <img src="~/assets/images/delivery-methods4.png" alt="FedEx">
      </a>
      <a href="https://portraitpainting.com" target="_blank">
        <img src="~/assets/images/logo-portrait.png" alt="Portrait">
      </a>
    </div>
    <div class="footer__copyright">
      <p>
        © 2014-{{ new Date().getFullYear() }} ARTDAFEN.COM Museum-caliber oil painting reproductions, exclusively
        available online.
      </p>
      <p>
        According to the intellectual property rights, we will only sell artworks in the public domain which means the
        original artists died no less than 70 years. If you find any paintings listed may have copyright problem, please
        contact us to remove.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type {INotice} from "~/api/interface/notice/notice";
import type {IHome} from "~/api/interface/home/home";
import {CONTACT_EMAIL, COUNTRY_CODE, CUSTOMER_SERVICE, STUDIO_ADDRESS, REGISTERED_ADDRESS} from "~/config";
import {SOCIAL_LIST} from "~/constant";


const props = defineProps({
  noticeData: {
    type: Array as () => INotice.Row[],
    default: () => []
  },
  footerMenu: {
    type: Array as () => IHome.FooterMenuRow[],
    default: () => []
  }
})
</script>

<style scoped lang="scss">

  .foot-mobile {
    padding: 45px 15px;
    line-height: 18px;
    font-size: 11px;
    color: #111111;

    .footer__block-list {
      display: grid;
      gap: 30px;
      align-items: start;
      justify-content: start;
      grid: auto-flow dense / repeat(2, minmax(0, 1fr));

      .footer__block {
        gap: 16px;
        display: grid;

        &.footer__block--text {
          grid-column: span 2;
        }

        &.footer__block--menu {
          max-width: 250px;
        }

        .footer__block-title {
          font-weight: 700;
        }

        .prose * + :is(p,div,ul,ol) {
          margin-block-start: 12px;
        }

        .text-subdued {
          color: var(--color-gray-400);
        }

        .v-stack {
          display: grid;
          gap: 12px;

          .v-stack-link {
            overflow-wrap: anywhere;
            display: inline-block;
            color: var(--color-gray-400);
            opacity: .7;
            transition: opacity .2s ease-in-out;
          }
        }
      }
    }

    .social-list {

      .social-item {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: #000;
        color: #fff;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;

        .iconfont {
          font-size: 20px;
        }

      }
    }

    .partner-list {

      img {
        height: 22px;
      }
    }

    .footer__copyright {
      color: var(--color-gray-400);
      display: grid;
      gap: 4px;
    }

  }

  /* 小屏幕 ( >= 991px ) 直接隐藏整个 PC Footer */
  @media (min-width: 992px) {
    .foot-mobile {
      display: none !important;
    }
  }
</style>