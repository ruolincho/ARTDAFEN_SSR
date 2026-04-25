<template>
  <footer class="footer-pc">
    <div class="acea-row row-between row-bottom">
      <div>
        <p class="text-14 text-gray-600 my-10">
          Business Hours: Mon-Fri 9:00 AM - 6:30 PM (Lunchtime: 12:00 PM - 1:30 PM)
        </p>
        <el-button type="primary" size="large">
          <a href="/faq">
            FAQ
            <span class="iconfont icon-right ml-10"></span>
          </a>
        </el-button>
        <el-button type="primary" size="large">
          <a :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('One-on-One Consultation')}`">
            One-on-One Consultation
            <span class="iconfont icon-right ml-10"></span>
          </a>
        </el-button>
        <!--<el-button type="primary" size="large">-->
        <!--  <a href="https://www.trustpilot.com/review/artdafen.com" target="_blank" rel="noopener">-->
        <!--    <span class="iconfont icon-favorites-fill"></span>-->
        <!--    Check our reviews on Trustpilot-->
        <!--    <span class="iconfont icon-right ml-10"></span>-->
        <!--  </a>-->
        <!--</el-button>-->
      </div>
      <div class="social-icon acea-row gap-base">
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
    </div>
    <div class="foot-menu-gap acea-row row-between py-20 my-20 border-t-sm border-b-sm">
      <dl class="foot-menu flex-1 overflow-hidden" v-if="noticeData.length">
        <dt>ANNOUNCEMENT</dt>
        <dd v-for="item in noticeData" :key="item.id">
          <NuxtLink to="/notice">
            {{ item.title }}
          </NuxtLink>
        </dd>
      </dl>
      <div class="acea-row foot-menu-gap">
        <dl class="foot-menu" v-for="menu in footerMenu" :key="menu.name">
          <dt>{{ menu.name }}</dt>
          <dd v-for="(subMenu, subIndex) in menu.children" :key="subIndex">
            <NuxtLink :to="subMenu.url" v-if="subMenu.url">{{ subMenu.name }}</NuxtLink>
            <span v-else>{{ subMenu.name }}</span>
          </dd>
        </dl>
      </div>
    </div>
    <div class="foot-partner mb-20">
      <p class="f-bold text-20 mb-20">Cooperative Partner</p>
      <div class="imgs acea-row gap-base">
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
          <img src="~/assets/images/delivery-methods4.png" alt="DHL">
        </a>
        <a href="https://portraitpainting.com" target="_blank">
          <img src="~/assets/images/logo-portrait.png" alt="Portrait">
        </a>
      </div>
      <NuxtLink class="logo-footer" to="/">
        <img src="~/assets/images/logo-footer.png" alt="logo-footer"/>
      </NuxtLink>
    </div>
    <div class="foot-information">
      <!--<div class="friends-link acea-row row-middle">-->
      <!--  <NuxtLink to="/privacy-policy" class="friends-item">Privacy Policy</NuxtLink>-->
      <!--  <NuxtLink to="/terms-and-conditions" class="friends-item">Terms of Condition</NuxtLink>-->
      <!--  <NuxtLink to="/cookies-policy" class="friends-item">Cookies Policy</NuxtLink>-->
      <!--  <NuxtLink to="/our-return-policy" class="friends-item">Our Return Policy</NuxtLink>-->
      <!--</div>-->
      <div class="text-gray-600 mt-10">
        Our Studio & Fulfillment: {{ STUDIO_ADDRESS }}
      </div>
      <div class="text-gray-600 mt-10">
        Registered Office: {{ REGISTERED_ADDRESS }}
      </div>
      <div class="text-gray-600 mt-10">
        Phone: <a :href="`tel:${COUNTRY_CODE}${CUSTOMER_SERVICE}`">{{ COUNTRY_CODE }} {{ CUSTOMER_SERVICE }}</a>
      </div>
      <div class="text-gray-600 mt-10">
        Email: <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
      </div>
    </div>
    <div class="copyright mt-10 text-gray-600" style="line-height: 1.7">
      © 2014-{{ new Date().getFullYear() }} ARTDAFEN.COM Museum-caliber oil painting reproductions, exclusively available online. <br />
      According to the intellectual property rights, we will only sell artworks in the public domain which means the original artists died no less than 70 years. If you find any paintings listed may have copyright problem, please contact us to remove.
    </div>
  </footer>
</template>

<script setup lang="ts">
import type {INotice} from "~/api/interface/notice/notice";
import type {IHome} from "~/api/interface/home/home";
import { CONTACT_EMAIL, COUNTRY_CODE, CUSTOMER_SERVICE, STUDIO_ADDRESS, REGISTERED_ADDRESS } from "~/config";
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
  .footer-pc {
    padding: 40px;
    background: #ffffff;

    .fork {
      width: 180px;
      height: 29px;
    }

    .foot-menu-gap {
      gap: 60px;
    }

    .foot-menu {
      font-size: 14px;

      dt {
        font-weight: 500;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      dd {
        font-weight: 400;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      dd + dd {
        margin-top: 10px;
      }
    }

    .foot-partner {
      position: relative;
      padding-right: 260px;

      .imgs {
        img {
          height: 42px;
        }
      }

      .logo-footer {
        position: absolute;
        right: 0;
        top: 0;

        img {
          width: auto;
          height: 50px;
        }
      }
    }

    .foot-information {

      .friends-link {
        .friends-item {
          font-size: 16px;

          &:not(:last-of-type)::after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 11px;
            margin: -1px 10px 1px;
            vertical-align: middle;
            background: var(--color-primary);
          }
        }
      }

    }

    .social-icon {
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
  }

  @media (max-width: 1680px) {
    .footer-pc {
      padding: 35px;

      .foot-menu-gap {
        gap: 40px;
      }
    }
  }

  @media (max-width: 1460px) {
    .footer-pc {
      padding: 30px;

      .foot-menu {
        font-size: 12px;
      }

      .foot-information .friends-link .friends-item {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 1260px) {
    .footer-pc {
      padding: 20px;

      .foot-menu-gap {
        gap: 20px;
      }
    }
  }

  /* 小屏幕 ( <= 991px ) 直接隐藏整个 PC Footer */
  @media (max-width: 991px) {
    .footer-pc {
      display: none !important;
    }
  }
</style>