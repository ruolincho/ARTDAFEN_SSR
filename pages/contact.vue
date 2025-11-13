<template>
  <section class="contact-section">
    <div class="container">
      <h1 class="text-26 f-bold pt-lg-50 pt-30">Contact Us</h1>
      <p class="text-16 text-gray-600 my-20">
        ARTDAFEN is a curated online platform for art transactions, introducing a wide range of domestic and
        international brands. If you are interested in having your brand listed on our platform, working with us as a
        partner, or inquiring about bulk purchases or consulting, please fill out the appropriate form for each case.
      </p>
      <h2 class="text-20 f-bold-500 my-20">Brand Entry Procedure</h2>
      <ul class="list-ul decimal my-20">
        <li class="text-16 text-gray-600 mb-10">Submit an entry application.</li>
        <li class="text-16 text-gray-600 mb-10">Our team will review your application. (If your brand/category fits our
          direction, we will contact you via
          phone or email.)
        </li>
        <li class="text-16 text-gray-600 mb-10">Proceed with the agreement process once all entry conditions are
          confirmed.
        </li>
      </ul>
      <h2 class="text-20 f-bold-500 my-20">※ Important Notes on Brand Entry</h2>
      <ul class="list-ul decimal my-20">
        <li class="text-16 text-gray-600 mb-10">ARTDAFEN only accepts brands that align with our business direction and
          sales strategy.
        </li>
        <li class="text-16 text-gray-600 mb-10">Only after reviewing your application can we determine whether a brand
          is eligible to enter and proceed with the agreement. Inquiries via individual emails or mail are not accept.
        </li>
        <li class="text-16 text-gray-600 mb-10">Brands involved in categories such as agency distribution, home goods,
          wholesale, and private labels that do not align with ARTDAFEN’s business direction will not be accepted. (For
          imported goods, import declaration and certification must be available.)
        </li>
        <li class="text-16 text-gray-600 mb-10">If your team cannot handle key operational tasks (such as product
          registration, delivery, and CS) or assign a dedicated manager, your application may be declined.
        </li>
      </ul>
      <h2 class="text-20 f-bold-500 my-20">※ For bulk purchase inquiries, please include [brand/product introduction],
        intended items, quantity, and preferred delivery date.</h2>
      <ul class="list-ul my-20">
        <li class="text-16 text-gray-600 mb-10">We appreciate your interest in ARTDAFEN and value your proposal.</li>
        <li class="text-16 text-gray-600 mb-10">Our team will review your proposal in the order received.</li>
        <li class="text-16 text-gray-600 mb-10">If we determine that there is potential for collaboration, we will
          contact you within a week. If progress is difficult at this time, we may not be able to respond
          individually—we thank you for your understanding.
        </li>
      </ul>
      <div class="text-60 text-center f-bold-500 border-t-xl border-gray-700 py-lg-40 py-20">
        <p class="my-lg-60 my-30">info@artdafen.com</p>
      </div>
    </div>
  </section>

  <div class="info-section">
    <div class="container">
      <div class="info-list row">
        <div class="col-sm-6" v-for="(item, index) in pointList" :key="index">
          <div class="info-item shadow-md">
            <div class="icon-wrapper">
              <span class="iconfont icon-rengongkefu"></span>
            </div>
            <div class="content-wrapper">
              <p class="text-18 f-bold-600">Call us now</p>
              <p class="text-14 text-gray-600 mt-8 mb-12 desc">{{ item.detail }}</p>
              <p class="text-24 mb-24">{{ item.email }}</p>
              <el-button type="primary" size="large">
                CALL NOW
                <span class="iconfont icon-right ml-10"></span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {pageMeta} from "~/config/pageMeta";

useHead(pageMeta["/contact"] ?? {});

const pointList = ref([
  {
    detail: 'Kam Sheung Road, Yuen Long, Hong Kong DD106 Lot 1479C Lot',
    tel: '',
    email: 'info@artdafen.com',
  },
  {
    detail: '103, 1st Floor, Dafen Oil Painting Trading Plaza, Buji Street, Longgang District, Shenzhen',
    tel: '',
    email: 'infocn@artdafen.com',
  },
  {
    detail: '111 Morgan Street, Room 323, Stamford CT 06905',
    tel: '',
    email: 'infous@artdafen.com',
  },
  {
    detail: '23 Rue du Bois Joli,44200 Nantes',
    tel: '(213)656-3859',
    email: 'infofr@artdafen.com',
  },
  {
    detail: 'unit 5-6, Wellington house, Camden street, Brighton, East Sussex BN41 1DU, UK',
    tel: '',
    email: 'infouk@artdafen.com',
  }
])
</script>

<style scoped lang="scss">
.contact-section {
  .list-ul {
    &.disc li {
      list-style-type: disc !important;
    }

    &.decimal li {
      list-style-type: decimal !important;
    }

    li {
      list-style-position: inside !important; /* 或 outside，根据你设计需求 */
    }
  }
}

.info-section {
  padding: clamp(30px, 3.75vw, 72px) 0;
  background: #fafafa;

  .info-list {
    --gutter: var(--gutter-md);
    row-gap: var(--gutter);

    .info-item {
      display: flex;
      background: #fff;
      padding: 32px;

      .icon-wrapper {
        width: 96px;
        height: 96px;
        line-height: 96px;
        background: #e6e6e6;
        text-align: center;
        margin-right: 24px;

        .iconfont {
          font-size: 48px;
        }
      }

      .content-wrapper {
        flex: 1;

        .desc {
          max-width: 352px;
        }
      }
    }

  }
}

@media (max-width: 1260px) {
  .info-section {
    .info-list {
      --gutter: 25px;
    }
  }
}

@media (max-width: 991px) {
  .info-section {
    .info-list {
      --gutter: 15px;
    }
  }
}

@media (max-width: 768px) {
  .info-section {
    margin-bottom: -20px;
  }
}
</style>