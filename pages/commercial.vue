<template>
  <section class="sec-banner">
    <a :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('TRADE PRO')}`" class="block">
      <img :src="imagePrefix('/static/artdafen/program-1-1.webp')" alt="banner" class="pc">
      <img :src="imagePrefix('/static/artdafen/program-1-2.webp')" alt="banner" class="app">
    </a>
  </section>

  <section class="sec-case">
    <div class="container">
      <h1 class="text-50 font-bold text-center py-lg-60 py-40" >Case Studies</h1>
      <div class="case-swiper-wrapper" >
        <swiper
            class="case-swiper"
            :modules="modules"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :loop="true"
            :lazy="true"
            :breakpoints="{
            '1260': { slidesPerView: 4, spaceBetween: 20 },
            '768': { slidesPerView: 3, spaceBetween: 15 },
            '414': { slidesPerView: 2, spaceBetween: 10 },
          }"
        >
          <swiper-slide v-for="(item, index) in CASE_LIST" :key="item.id" :lazy="true">
            <div class="case-item">
              <div class="border-sm border-gray-200 overflow-hidden bg-gray-200">
                <img class="w-full img-hover" :src="imagePrefix(item.img)" :alt="item.name"/>
              </div>
              <div class="content-wrapper p-15 bg-gray-200 f-bold">
                <p class="line1 text-24">{{ item.title }}</p>
                <p class="line2 text-16 my-10">{{ item.size }}</p>
                <p class="text-16">{{ item.name }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

  </section>

  <section class="sec-history">
    <div class="container">
      <h1 class="text-50 font-bold text-center py-lg-60 py-40" >History & Heritage: The Dafen Legend Since 1989</h1>
      <div class="history-swiper-wrapper" >
        <swiper
            class="history-swiper"
            :modules="modules"
            :lazy="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :loop="false"
            :breakpoints="{
            '1260': { slidesPerView: 5, spaceBetween: 80 },
            '768': { slidesPerView: 3, spaceBetween: 50 },
            '414': { slidesPerView: 2, spaceBetween: 30 },
          }"
        >
          <swiper-slide v-for="(item, index) in HISTORY_LIST" :key="item.id" :lazy="true">
            <div class="history-item">
              <div class="circle"></div>
              <div class="text-center mt-25">
                <div class="year text-24 f-bold">{{ item.year }}</div>
                <div class="title text-24 f-bold my-15">{{ item.title }}</div>
                <div class="content text-16">{{ item.content }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>

  <section class="sec-museum">
    <div class="container">
      <h1 class="text-50 font-bold text-center py-lg-60 py-40" >Museum Quality. 100% Hand-Painted.</h1>
      <img :src="imagePrefix('/static/artdafen/program-2.webp')" alt="museum-img" >
      <div class="museum-wrapper" >
        <img class="cover" :src="imagePrefix('/static/artdafen/program-3.webp')" alt="bespoke">
        <div class="content text-center">
          <p class="text-40 f-bold mb-48">Premium Material Standards</p>
          <p class="text-24" style="line-height: 2;">Canvas & Frame: 400gsm heavy-duty linen canvas on solid wood inner frames for lasting durability.</p>
          <p class="text-24" style="line-height: 2;">Eco-Friendly Paints: Certified non-toxic pigments that are safe, pollution-free, and vibrant.</p>
          <p class="text-24" style="line-height: 2;">Custom Framing: A diverse selection of 100+ solid wood frames with expert craftsmanship.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-choose pb-lg-60 pb-40">
    <div class="container">
      <h1 class="text-50 font-bold text-center py-lg-60 py-40 text-white" >Why Choose ARTDAFEN</h1>
      <div class="row process-list gap-row-base" >
        <div class="col-xs-4 col-12" v-for="item in WHY_CHOOSE_LIST2" :key="item.title">
          <div class="process-item text-center text-white" >
            <span class="iconfont text-60" :class="[item.icon]"/>
            <p class="mt-xs-30 mt-15 content">
              <span class="text-26 f-bold">{{ item.title }}: </span>
              <span class="text-22">{{ item.desc }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {imagePrefix} from '~/utils'
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay, Navigation, Pagination, Lazy} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {HISTORY_LIST, CASE_LIST, WHY_CHOOSE_LIST2} from "~/constant";
import {CONTACT_EMAIL} from "~/config";

const modules = [Autoplay, Pagination, Navigation, Lazy]

const caseList = [
  {
    id: '1',
    img: imagePrefix('/trade/advertisement/2025/08/06/1763756679263330304/d01a86a0f2d249c6a0f48f43be2b17fe.webp'),
    title: 'The Carter Houston TX',
    size: '180*180',
    name: 'untitled no. 1 (gold)'
  },
  {
    id: '2',
    img: imagePrefix('/trade/advertisement/2025/08/06/1763756679263330304/d01a86a0f2d249c6a0f48f43be2b17fe.webp'),
    title: 'The Carter Houston TX',
    size: '180*180',
    name: 'untitled no. 1 (gold)'
  },
  {
    id: '3',
    img: imagePrefix('/trade/advertisement/2025/08/06/1763756679263330304/d01a86a0f2d249c6a0f48f43be2b17fe.webp'),
    title: 'The Carter Houston TX',
    size: '180*180',
    name: 'untitled no. 1 (gold)'
  },
  {
    id: '4',
    img: imagePrefix('/trade/advertisement/2025/08/06/1763756679263330304/d01a86a0f2d249c6a0f48f43be2b17fe.webp'),
    title: 'The Carter Houston TX',
    size: '180*180',
    name: 'untitled no. 1 (gold)'
  },
  {
    id: '5',
    img: imagePrefix('/trade/advertisement/2025/08/06/1763756679263330304/d01a86a0f2d249c6a0f48f43be2b17fe.webp'),
    title: 'The Carter Houston TX',
    size: '180*180',
    name: 'untitled no. 1 (gold)'
  },
  {
    id: '6',
    img: imagePrefix('/trade/advertisement/2025/08/06/1763756679263330304/d01a86a0f2d249c6a0f48f43be2b17fe.webp'),
    title: 'The Carter Houston TX',
    size: '180*180',
    name: 'untitled no. 1 (gold)'
  },
]

</script>

<style scoped lang="scss">
  .sec-history{
    .history-swiper-wrapper {
      position: relative;
      .history-item {
        .circle {
          width: 26px;
          height: 26px;
          background: #c0b08b;
          border-radius: 50%;
          margin: auto;
        }
      }

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 0;
        top: 13px;
        left: 0;
        border: 2px dotted #000;
      }
    }
  }

  .sec-museum {
    .museum-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      column-gap: 30px;
      padding: 7.55vw 0;

      .cover {
        width: 63.75%;
        flex-shrink: 0;
      }

      .content {
        flex: 1;

      }

    }
  }
  
  .sec-choose {
    background: #4d4d4d;

    .process-list {

      .process-item {
        .iconfont {
          color: #b1a383;
          font-size: clamp(80px, 10.41vw, 200px);
        }
        .content {
          max-width: 320px;
          margin: auto;
        }
      }
    }
  }
  
  @media (max-width: 991px) {
    .sec-museum .museum-wrapper {
      flex-wrap: wrap;
      column-gap: unset;
      row-gap: var(--gutter-base);
      .cover {
        width: 100%;
        order: 1;
      }
      .content {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    .sec-choose {
      margin-bottom: -20px;
    }
  }
</style>