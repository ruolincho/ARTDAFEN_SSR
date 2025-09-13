<template>
  <!--pc-底部-->
  <footer class="footer-pc pc">
    <div class="acea-row row-between row-bottom">
      <div>
        <p class="text-14 text-gray-600 my-10">
          Business Hours: Mon-Fri 9:00 AM - 6:00 PM (Lunchtime: 12:00 PM - 1:00 PM)
        </p>
        <el-button type="primary" size="large" @click="router.push('/faq')">
          FAQ
          <span class="iconfont icon-right ml-10"></span>
        </el-button>
        <el-button type="primary" size="large">
          <a :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('One-on-One Consultation')}`">
            One-on-One Consultation
            <span class="iconfont icon-right ml-10"></span>
          </a>
        </el-button>
      </div>
      <div class="social-icon acea-row gap-base">
        <a href="https://www.youtube.com/@artdafen" target="_blank" title="youtube">
          <span class="iconfont icon-Youtube text-30"></span>
        </a>
        <a href="https://www.instagram.com/artdafen/" target="_blank" title="instagram">
          <span class="iconfont icon-instagram text-30"></span>
        </a>
        <a href="https://x.com/artdafen" target="_blank" title="x">
          <span class="iconfont icon-tuite text-30"></span>
        </a>
      </div>
    </div>
    <div class="foot-menu-gap acea-row row-between py-20 my-20 border-t-sm border-b-sm">
      <dl class="foot-menu flex-1 overflow-hidden" v-if="noticeList.length">
        <dt>ANNOUNCEMENT</dt>
        <dd class="cursor-pointer" v-for="item in noticeList" :key="item.id" @click="router.push('/notice')">
          {{ item.title }}
        </dd>
      </dl>
      <div class="acea-row foot-menu-gap">
        <dl class="foot-menu" v-for="(menu, index) in footerList" :key="index">
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
        <a href="https://subang.chemanman.com" target="_blank">
          <img src="~/assets/images/delivery-methods3.png" alt="SuBang">
        </a>
        <a href="https://www.fedex.com" target="_blank">
          <img src="~/assets/images/delivery-methods2.png" alt="FedEx">
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
      <div class="friends-link acea-row row-middle">
        <NuxtLink to="/privacy-policy" class="friends-item">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms-and-conditions" class="friends-item">Terms of Condition</NuxtLink>
        <NuxtLink to="/cookies-policy" class="friends-item">Cookies Policy</NuxtLink>
        <NuxtLink to="/our-return-policy" class="friends-item">Our Return Policy</NuxtLink>
      </div>
      <div class="text-gray-600 mt-10">
        Business Address: Kam Sheung Road, Yuen Long, Hong Kong DD106 Lot 1479C Lot
      </div>
      <div class="text-gray-600 mt-10">
        Email: <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
      </div>
    </div>
  </footer>
  <!--app-底部-->
  <footer class="foot-app app">
    <div class="footer-menu">
      <div class="footer-link">
        <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms-and-conditions">Terms of Condition</NuxtLink>
        <NuxtLink to="/cookies-policy">Cookies Policy</NuxtLink>
        <NuxtLink to="/our-return-policy">Our Return Policy</NuxtLink>
      </div>
      <div class="foot-pad">
        <ul class="footer-item P_parent">
          <li
            class="footer-tit"
            :class="{'on': openIndex === index}"
            v-for="(menu, index) in footerList"
            :key="menu.name"
          >
            <NuxtLink :to="menu.url" v-if="menu.url">{{ menu.name }}</NuxtLink>
            <span v-else>{{ menu.name }}</span>
            <div class="footer-tig P_tig" @click="toggleMenu(index)"></div>
            <ul class="footer_nav2 footer-cont">
              <li v-for="subMenu in menu.children" :key="subMenu.name">
                <NuxtLink :to="subMenu.url" v-if="subMenu.url">{{ subMenu.name }}</NuxtLink>
                <span v-else>{{ subMenu.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bot">
      <div class="partner">
        <p class="mb-10">Cooperative Partner</p>
        <div class="imgs acea-row gap-sm">
          <a href="https://www.paypal.com" target="_blank">
            <img src="~/assets/images/payment-methods.png" alt="payment-methods">
          </a>
          <a href="https://www.ups.com" target="_blank">
            <img src="~/assets/images/delivery-methods1.png" alt="UPS">
          </a>
          <a href="https://subang.chemanman.com" target="_blank">
            <img src="~/assets/images/delivery-methods3.png" alt="SuBang">
          </a>
          <a href="https://www.fedex.com" target="_blank">
            <img src="~/assets/images/delivery-methods2.png" alt="FedEx">
          </a>
          <a href="https://portraitpainting.com" target="_blank">
            <img src="~/assets/images/logo-portrait.png" alt="Portrait">
          </a>
        </div>
      </div>
      <div class="tel">Email Address<a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a></div>
      <p>For some products, Artdafen is not a direct seller, but a sales intermediary. For product information, please
        refer to the specific content on each product page.</p>
    </div>
  </footer>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getNoticeBtoApi} from "~/api/modules/notice/notice";
import type {INotice} from "~/api/interface/notice/notice";
import {CONTACT_EMAIL} from "~/config";

onMounted(() => {
  getNoticeBto()
})

const router = useRouter()

const footerList = ref([
  {
    name: 'ABOUT US',
    url: '/about',
    auth: false,
    children: [
      {name: 'About ART DAFEN', url: '/about'},
      {name: 'Collaborate with Us (For Artists)', url: '/collaboration'},
      {name: 'Contact Us', url: '/contact'},
    ]
  },
  {
    name: 'MY ACCOUNT',
    url: '/account',
    auth: true,
    children: [
      {name: 'My Orders', url: '/account/orders'},
      {name: 'My Wishlists', url: '/account/favorites'},
      {name: 'My Addresses', url: '/account/addresses'},
      {name: 'My Profile', url: '/account/profile'},
    ]
  },
  {
    name: 'FAQS',
    url: '/faq',
    auth: false,
    children: [
      {name: 'Has My Order Been Shipped Yet?', url: '/faq?name=2-1'},
      {name: 'How Do I Return An Item?', url: '/faq?name=4-1'},
      {name: 'Can I Return A Personalized Item?', url: '/faq?name=4-2'},
      {name: 'I Entered the Wrong Shipping Address – What Should I Do?', url: '/faq?name=3-2'},
    ]
  }
])

const openIndex = ref<number | null>(null);
const toggleMenu = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

// 获取公告
const noticeList = ref<INotice.Row[]>([])
const getNoticeBto = async () => {
  const {data} = await getNoticeBtoApi()
  noticeList.value = data
}

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

/*app-底部*/
.foot-app {
  width: 100%;
  background: #111;
  padding: 20px 0;
  margin-top: 20px;

  .footer-menu {
    padding: 0 15px;

    .footer-link {
      padding: 15px 0;
      font-size: 14px;

      a {
        font-size: 14px;
        color: var(--color-gray-600);
        line-height: 24px;
        display: inline-block;

        &:not(:last-of-type) {
          margin-right: 20px;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 14px;
            background: var(--color-gray-600);
          }

        }
      }
    }

    .foot-pad {
      .footer-tit {
        position: relative;
        border-bottom: 1px solid #333;

        > a {
          font-size: 16px;
          color: var(--color-gray-600);
          line-height: 48px;
          margin-right: 48px;
          display: block;
          transition: all 0.4s;
        }

        .footer-tig {
          font-size: 14px;
          color: var(--color-gray-600);
          text-align: right;
          line-height: 48px;
          width: 20px;
          height: 48px;
          position: absolute;
          right: 0px;
          top: 0;
          z-index: 2;

          &::before, &::after {
            content: '';
            background: var(--color-gray-600);
            position: absolute;
            top: 50%;
            transition: all .3s;
            left: 50%;
          }

          &::before {
            width: 18px;
            height: 2px;
            margin-left: -8px;
          }

          &::after {
            width: 2px;
            height: 18px;
            margin-top: -8px;
          }
        }

        .footer-cont {
          display: none;
          padding: 0 15px;

          li {
            a, span {
              font-size: 14px;
              color: var(--color-gray-600);
              line-height: 40px;
              display: block;
              border-bottom: 1px solid #333;
            }

            &:last-child a, &:last-child span {
              border-bottom: none;
            }
          }
        }

        &.on {
          & > a {
            color: var(--color-secondary);
          }

          .footer-tig {
            &::after {
              opacity: 0;
            }

            &::before {
              background: var(--color-secondary);
            }
          }

          .footer-cont {
            display: block;
          }
        }

      }
    }
  }

  .footer-bot {
    padding: 20px 15px;

    .tel {
      color: var(--color-gray-600);
      font-size: 14px;
      margin-bottom: 10px;

      span, a {
        color: var(--color-gray-600);
        display: inline-block;
        font-size: 18px;
        margin-left: 10px;
      }
    }

    .partner {
      margin-bottom: 10px;

      .imgs {
        img {
          height: 30px;
          background: #fff;
        }
      }
    }

    p {
      color: var(--color-gray-600);
      font-size: 14px;
    }
  }
}
</style>