<template>

  <!--页脚流程-->
  <section class="sec-process py-lg-50 py-30">
    <div class="container">
      <div class="process-list">
        <div class="process-item text-center" v-for="item in PROCESS_LIST" :key="item.title">
          <span class="iconfont" :class="[item.icon]"/>
          <p class="text-20 mt-15">{{ item.title }}</p>
          <p class="text-16 text-gray-500 mt-10">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!--pc-页脚-->
  <AppPcFooter :noticeData="noticeList" :footerMenu="footerList" />
  <!--app-页脚-->
  <AppMobileFooter :noticeData="noticeList" :footerMenu="footerList"/>
</template>

<script setup lang="ts">
import AppPcFooter from './AppPcFooter.vue'
import AppMobileFooter from './AppMobileFooter.vue'
import type {INotice} from "~/api/interface/notice/notice";
import {getNoticeBtoApi} from "~/api/modules/notice/notice";
import {getFaqByQuote} from "~/config/faq";
import type {IHome} from "~/api/interface/home/home";
import {PROCESS_LIST} from "~/constant";

const faqList = getFaqByQuote('footer')

const footerList = ref<IHome.FooterMenuRow[]>([
  {
    name: 'Agreement',
    children: [
      {name: 'Privacy Policy', url: '/privacy-policy'},
      {name: 'Terms of Condition', url: '/terms-and-conditions'},
      // {name: 'Cookies Policy', url: '/cookies-policy'},
      {name: 'Our Return Policy', url: '/our-return-policy'},
      {name: 'Shipping & Delivery', url: '/shipping-and-delivery'},
    ]
  },
  {
    name: 'About us',
    children: [
      {name: 'About ARTDAFEN', url: '/about'},
      {name: 'Trade & Commercial', url: '/trade-commercial'},
      {name: 'Collaborate with Us (For Artists)', url: '/join-as-artist'},
      {name: 'Contact Us', url: '/contact'},
    ]
  },
  // {
  //   name: 'My account',
  //   children: [
  //     {name: 'My Orders', url: '/account/orders'},
  //     {name: 'My Wishlists', url: '/account/favorites'},
  //     {name: 'My Addresses', url: '/account/addresses'},
  //     {name: 'My Profile', url: '/account/profile'},
  //   ]
  // },
  {
    name: 'Faqs',
    children: [...faqList.map(item => ({name: item.title, url: item.url!}))]
  }
])

// 获取公告
const noticeList = ref<INotice.Row[]>([])
const getNoticeBto = async () => {
  const {data} = await getNoticeBtoApi()
  noticeList.value = data
}

onMounted(() => {
  getNoticeBto()
})
</script>

<style scoped lang="scss">
  .sec-process {
    background: #000000;
    color: #fff;
    margin-top: 30px;

    .process-list {
      grid: auto / repeat(4, 1fr);
      gap: 24px;
      align-items: start;
      min-width: 0;
      display: grid;

      .process-item {
        .iconfont {
          color: #b18147;
          font-size: clamp(50px, 5vw, 75px);
        }
      }
    }
  }

  @media (max-width: 991px) {
    .sec-process {
      margin-top: 15px;

      .process-list {
        grid: auto / repeat(2, minmax(0, 1fr));
      }
    }
  }

</style>