<template>
  <section class="sec-banner">
    <a :href="`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('TRADE PRO')}`" class="block">
      <img :src="imagePrefix('/static/artdafen/program-1-1.webp')" alt="banner" class="pc">
      <img :src="imagePrefix('/static/artdafen/program-1-2.webp')" alt="banner" class="app">
    </a>
  </section>

  <section class="sec-case">
    <div class="container">
      <h1 class="text-50 font-bold text-center py-lg-60 py-40">Case Studies</h1>
      <div class="case-swiper-wrapper">
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
      <h1 class="text-50 font-bold text-center py-lg-60 py-40">History & Heritage: The Dafen Legend Since 1989</h1>
      <div class="history-swiper-wrapper">
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
      <h1 class="text-50 font-bold text-center py-lg-60 py-40">Museum Quality. 100% Hand-Painted.</h1>
      <img v-if="appStore.isPc" :src="imagePrefix('/static/artdafen/program-2_pc.webp')"
           alt="Museum Quality. 100% Hand-Painted.">
      <img v-else :src="imagePrefix('/static/artdafen/program-2_app.webp')" alt="Museum Quality. 100% Hand-Painted.">
      <div class="museum-wrapper">
        <img class="cover fit-contain" :src="imagePrefix('/static/artdafen/program-3.webp')" alt="bespoke">
        <div class="content text-center acea-row row-column-between gap-row-base">
          <p class="text-30 f-bold">Premium Material Standards</p>
          <div>
            <p class="text-26" style="line-height: 2;">Canvas & Frame: 400gsm heavy-duty linen canvas on solid wood
              inner frames for lasting durability.</p>
            <p class="text-26" style="line-height: 2;">Eco-Friendly Paints: Certified non-toxic pigments that are safe,
              pollution-free, and vibrant.</p>
            <p class="text-26" style="line-height: 2;">Custom Framing: A diverse selection of 100+ solid wood frames
              with expert craftsmanship.</p>
          </div>
        </div>
      </div>
      <div class="trusted-wrapper">
        <div class="content text-center acea-row row-column-between gap-row-base">
          <p class="text-30 f-bold">Your Trusted Physical Partner in Art Manufacturing</p>
          <div>
            <p class="text-26" style="line-height: 2;">Step inside ArtDaFen. Unlike dropshippers, we own our
              infrastructure. From our dedicated artisan studios and modern corporate offices to our immersive physical
              showrooms, we control every link in the supply chain. Partner with a supplier you can see, verify, and
              trust.</p>
          </div>
        </div>
        <div class="view">
          <div class="large overflow-hidden">
            <img class="w-full h-full fit-cover img-hover" :src="imagePrefix('/static/artdafen/program-4.webp')" alt="">
          </div>
          <div class="combination-wrapper">
            <div class="combination-item">
              <div class="middle overflow-hidden">
                <img class="w-full h-full fit-cover img-hover" :src="imagePrefix('/static/artdafen/program-5.webp')"
                     alt="">
              </div>
              <div class="small overflow-hidden">
                <img class="w-full h-full fit-cover img-hover" :src="imagePrefix('/static/artdafen/program-6.webp')"
                     alt="">
              </div>
            </div>
            <div class="combination-item reverse">
              <div class="middle overflow-hidden">
                <img class="w-full h-full fit-cover img-hover" :src="imagePrefix('/static/artdafen/program-8.webp')"
                     alt="">
              </div>
              <div class="small overflow-hidden">
                <img class="w-full h-full fit-cover img-hover" :src="imagePrefix('/static/artdafen/program-7.webp')"
                     alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-contact">
    <div class="contact-container">
      <div class="scroll-container company-scroll">
        <div class="scroll-track">
          <img
              v-for="i in 4"
              :key="i"
              :src="getResponsiveImage(partnerImage).src"
              :srcset="getResponsiveImage(partnerImage).srcset"
              sizes="100vw"
              alt="background"
              class="scroll-img"
              decoding="async"
          />
        </div>
      </div>
      <div class="scroll-container artist-scroll">
        <div class="scroll-track">
          <img
              v-for="i in 4"
              :key="i"
              :src="getResponsiveImage(artistImage).src"
              :srcset="getResponsiveImage(artistImage).srcset"
              sizes="100vw"
              alt="background"
              class="scroll-img"
              decoding="async"
          />
        </div>
      </div>
      <div class="contact-wrapper text-center px-15">
        <p class="text-40">Trusted by Industry Leaders, Crafted by Global Artists.</p>
        <p class="text-40">The preferred art partner for top-tier furniture brands and interior design firms.</p>
      </div>
    </div>
  </section>

  <section class="sec-choose">
    <div class="container">
      <div class="choose-wrapper acea-row">
        <div class="process-box flex-1">
          <h1 class="text-50 font-bold mb-20">Why Choose ARTDAFEN</h1>
          <div class="process-list">
            <div
                class="process-item acea-row row-center-wrapper bg-gray-200 rounded-md overflow-hidden p-20 gap-base"
                v-for="item in WHY_CHOOSE_LIST2" :key="item.title"
            >
              <SvgIcon :name="item.icon" class="text-60"/>
              <p class="content flex-1">
                <span class="text-26 f-bold">{{ item.title }}: </span>
                <span class="text-22">{{ item.desc }}</span>
              </p>
            </div>
          </div>
        </div>
        <div
            class="content-box flex-1 bg-gray-200 rounded-md overflow-hidden p-20 text-center acea-row row-column row-center">
          <p class="text-40 font-bold">
            Partner with ArtDaFen for VIP 1-on-1 concierge service. <br/>
            Sign up today and enjoy a 20% welcome discount on qualified wholesale purchases.
          </p>
          <div class="py-30">
            <el-button size="large" type="danger">
              <a :href="`mailto:${CONTACT_EMAIL}`">
                Inquire Now
              </a>
            </el-button>
          </div>
          <p class="text-20">Instantly access curated art collections and exclusive trade deals.</p>
          <p class="text-20">Streamline your sourcing with our professional platform.</p>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">
import {useImage} from "~/composables/useImage";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay, Navigation, Pagination, Lazy} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {HISTORY_LIST, CASE_LIST, WHY_CHOOSE_LIST2} from "~/constant";
import {CONTACT_EMAIL} from "~/config";
import {useAppStore} from "~/stores/modules/app";
import {resolvePageMeta} from "~/config/pageMeta";

useHead(resolvePageMeta("/trade-commercial"));

const modules = [Autoplay, Pagination, Navigation, Lazy]
const {imagePrefix, getResponsiveImage} = useImage()
const appStore = useAppStore()
const partnerImage = '/static/artdafen/partner-bg.webp';
const artistImage = '/static/artdafen/artist-bg.webp';
</script>

<style scoped lang="scss">
  .sec-history {
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
      justify-content: space-between;
      column-gap: 30px;
      margin: 5.20vw 0;

      .cover {
        width: 63.75%;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
      }

    }

    .trusted-wrapper {
      display: flex;
      justify-content: space-between;
      column-gap: 30px;
      margin: 5.20vw 0;

      .view {
        flex-shrink: 0;
        width: 53.125vw;
        max-height: 512px;
        display: flex;
        gap: 20px;

        .large {
          height: 100%;
          width: 100%;
          max-width: 414px;
        }

        .combination-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;

          .combination-item {
            flex: 1;
            display: flex;
            gap: 20px;
            overflow: hidden;

            &.reverse {
              flex-direction: row-reverse;
            }

            .middle {
              width: 57.34%;
            }

            .small {
              width: 42.66%;
            }
          }
        }
      }

      .content {
        flex: 1;
      }

    }
  }

  .sec-contact {
    margin: 5.20vw 0;

    .contact-container {
      position: relative;
      height: 680px;
      overflow: hidden;

      .scroll-container {
        width: 100%;
        height: 49%;
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        opacity: 0.35;

        &.company-scroll {
          top: 0;
          .scroll-track {
            animation: infiniteScroll 60s linear infinite;
          }
        }

        &.artist-scroll {
          bottom: 0;
          .scroll-track {
            animation: infiniteScroll 60s linear infinite reverse;
          }
        }


        .scroll-track {
          display: flex;
          width: max-content;
          height: 100%;
          will-change: transform;

          .scroll-img {
            height: 100%;
            width: auto;
            object-fit: cover;
            display: block;
            pointer-events: none;
          }
        }
      }

      @keyframes infiniteScroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-25%);
        }
      }




      .contact-wrapper {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .sec-choose {
    margin: 5.20vw 0;

    .choose-wrapper {
      gap: 40px;

      .process-box {
        .process-list {
          .process-item {
            .iconify {
              color: #b18147;
              font-size: clamp(80px, 10.41vw, 120px);
            }
          }

          .process-item + .process-item {
            margin-top: 10px;
          }
        }
      }

      .content-box {
        .el-button {
          max-width: 550px;
          width: 100%;
          height: 60px;
        }
      }
    }
  }

  @media (max-width: 1260px) {
    .sec-museum .trusted-wrapper .view {
      gap: var(--gutter-base);

      .combination-wrapper {
        gap: var(--gutter-base);

        .combination-item {
          gap: var(--gutter-base);
        }
      }
    }
  }

  @media (max-width: 991px) {
    .sec-museum {
      .museum-wrapper {
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

      .trusted-wrapper {
        flex-wrap: wrap;
        column-gap: unset;
        row-gap: var(--gutter-base);

        .cover {
          width: 100%;
        }

        .view {
          width: 100%;
        }
      }
    }

    .sec-choose {
      margin: 5.20vw 0;

      .choose-wrapper {
        flex-direction: column;
        gap: 10px;

        h1 {
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .sec-contact .contact-container {
      height: 350px;
    }
  }

  @media (max-width: 414px) {
    .sec-museum .trusted-wrapper .view {
      gap: var(--gutter-sm);

      .combination-wrapper {
        gap: var(--gutter-sm);

        .combination-item {
          gap: var(--gutter-sm);
        }
      }
    }
  }

  @keyframes bg-scroll {
    from {
      background-position-x: 0;
    }
    to {
      background-position-x: calc(var(--scroll-distance) * -1);
    }
  }
</style>