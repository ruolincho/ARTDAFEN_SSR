<template>
  <section class="sec-banner">
    <img :src="imagePrefix('/static/artdafen/about-banner.webp')" alt="banner">
  </section>

  <section class="sec-wallpaper">
    <section class="sec-about">
      <div class="part-box acea-row">
        <div class="part-large border-r-sm border-b-sm border-gray-700">
          <div class="slogan acea-row row-center-wrapper row-column">
            <h1 class="text-white f-bold">ABOUT<br/>ART<br/>DAFEN</h1>
          </div>
        </div>
        <div class="part-auto border-r-sm border-b-sm border-gray-700 ">
          <div class="slogan2 w-full h-full acea-row row-column row-center-wrapper">
            <p class="text-30">Since 1989 · Reimagined 2020</p>
            <p class="text-30">Masterpieces for millions, not millions for a masterpiece.</p>
          </div>
        </div>
        <div class="part-small border-b-sm border-gray-700"></div>
      </div>
    </section>

    <section class="sec-history">
      <div class="part-box acea-row">
        <div class="part-large border-r-sm border-b-sm border-gray-700">
          <div class="intro-box acea-row row-column">
            <img class="w-full" :src="imagePrefix('/static/artdafen/about-1.webp')" alt="Dafeng Oil Painting Village"
            >
            <div class="p-box text-30 text-white f-bold-200 flex-1 acea-row row-column row-center-wrapper">
              <p style="line-height: 1.7">
                Operated proudly by YAGENE INTERNATIONAL ART CO., LIMITED, <strong>Artdafen</strong> is your direct link to <strong>Dafen Village</strong>, the world’s leading center for art. Building upon an artistic heritage that dates back to 1989, our modern mission remains unchanged: offering strict "<strong>Museum-Quality Reproductions</strong>" to art lovers worldwide.
                By <strong>eliminating all intermediaries</strong>, we guarantee <strong>authentic, handcrafted artistry</strong> at true <strong>source-factory value</strong>.
              </p>
            </div>
            <img class="w-full" :src="imagePrefix('/static/artdafen/about-7.webp')" alt="Dafeng Oil Painting Village"
            >
          </div>
        </div>
        <div class="part-auto border-r-sm border-b-sm border-g  ray-700">
          <div class="history-list">
            <div class="history-item" v-for="(item, index) in HISTORY_LIST" :key="item.id" :data-index="index"
            >
              <div class="img-box">
                <img :src="imagePrefix(item.img)" :alt="item.title" :style="{ zIndex: HISTORY_LIST.length - index }">
              </div>
              <div class="year-box">
                <div class="circle"></div>
                <div class="text-30 f-bold">{{ item.year }}</div>
              </div>
              <div class="content-box">
                <p class="text-26 f-bold">{{ item.title }}</p>
                <p class="text-16 mt-5 flex-1">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="part-small border-r-sm border-b-sm border-gray-700"></div>
      </div>
    </section>

    <section class="sec-relax">
      <div class="part-box acea-row">
        <div class="part-auto border-r-sm border-b-sm border-gray-700 acea-row row-center-wrapper">
          <div class="w-full">
            <div class="content-box acea-row row-between-wrapper">
              <p class="text-30 text-center">
                The Texture of Quality <br>
                Left: Archival Linen <br>
                Right: Standard Cotton
              </p>
              <img class="w-full" :src="imagePrefix('/static/artdafen/about-2.webp')" alt="The Texture of Quality"
              >
            </div>
            <div class="content-box acea-row row-between-wrapper">
              <p class="text-30 text-center">
                Art That Breathes Safety <br>
                Left: Eco-Friendly – Non-toxic <br>
                Right: Standard Oils
              </p>
              <img class="w-full" :src="imagePrefix('/static/artdafen/about-3.webp')" alt="Art That Breathes Safety">
            </div>
            <div class="content-box acea-row row-between-wrapper">
              <p class="text-30 text-center">
                Artisan Framing & Custom Selection
                Precision-cut. Hand-
                sanded. Tailored for you.
              </p>
              <img class="w-full" :src="imagePrefix('/static/artdafen/about-4.webp')" alt="Artisan Framing"
              >
            </div>
          </div>
        </div>
        <div class="part-large border-r-sm border-b-sm border-gray-700">
          <div class="intro-box acea-row row-column">
            <div class="p-box text-30 text-white f-bold-200 flex-1 acea-row row-column row-center-wrapper">
              <p style="line-height: 1.7">
                Premium Materials & Exquisite Craftsmanship We create on <strong>400gsm heavy-duty Linen Canvas</strong>
                using vibrant, <strong>Eco-friendly paints</strong> for archival quality. Each solid wood frame
                undergoes precise corner cutting and meticulous hand-sanding for a flawless finish. With our
                diverse <strong>"Custom Frame Selection,"</strong> we tailor the perfect presentation for your space.
                <br><br>
                *CE & EN 71-3 Eco-Paints
                Certified Non-Toxic: Meets EU Toy Safety Standards (EN 71-3) – No Heavy Metals, No Odor.
              </p>
            </div>
          </div>
        </div>
        <div class="part-small"></div>
      </div>
    </section>

    <section class="sec-reality">
      <div class="part-box acea-row">
        <div class="part-large border-r-sm border-b-sm border-gray-700">
          <div class="intro-box acea-row row-column">
            <div class="p-box text-30 text-white f-bold-200 flex-1 acea-row row-column row-center-wrapper">
              <p style="line-height: 1.7">
                <strong>Real Studio. Real People. Real Art.</strong> We refuse to use generic stock photos. What you see
                here is our actual production floor in Dafen Village—the heartbeat of our brand. We are not just a
                website; we are a team of <strong>Elite Painters</strong>, each with over <strong>20 years of
                mastery</strong>. Every stroke is applied by a human hand, ensuring <strong>100% Hand-Painted</strong>
                authenticity with zero prints. This is where your masterpiece comes to life.
              </p>
            </div>
          </div>
        </div>
        <div class="part-auto border-r-sm border-b-sm border-gray-700 acea-row row-center-wrapper">
          <div class="content-box m-10">
            <div class="acea-row row-center">
              <p class="text-24">Multiple dedicated studios ensure fast, meticulous framing for any type of art.</p>
            </div>
            <img class="w-full" :src="imagePrefix('/static/artdafen/about-5.webp')" alt="">
            <div class="acea-row row-center">
              <p class="text-24">Guaranteed 100% hand-painted and museum-quality, crafted by our extensive team of
                experienced artists.</p>
            </div>
            <img class="w-full" :src="imagePrefix('/static/artdafen/about-6.webp')" alt="">
          </div>
        </div>
        <div class="part-small border-b-sm border-gray-700"></div>
      </div>
    </section>

    <section class="sec-honor">
      <div class="part-box acea-row">
        <div class="part-auto border-r-sm border-b-sm border-gray-700 acea-row row-center-wrapper">
          <div class="honor-swiper-wrapper">
            <swiper
                class="honor-swiper"
                :modules="modules"
                :navigation="{ nextEl: '.honor-next', prevEl: '.honor-prev' }"
                :autoplay="{ delay: 5000, disableOnInteraction: false }"
                :loop="true"
                :lazy="true"
            >
              <swiper-slide v-for="(item, index) in HONOR_LIST" :key="item.id" :lazy="true">
                <div>
                  <img :src="imagePrefix(item.img)" :alt="item.name"/>
                  <p class="text-center mt-15 text-16">{{ item.name }}</p>
                </div>
              </swiper-slide>
            </swiper>
            <div class="acea-row row-center-wrapper mt-15 gap-base">
              <div class="honor-button honor-prev"><span class="iconfont icon-left text-white text-24"></span></div>
              <div class="honor-button honor-next"><span class="iconfont icon-right text-white text-24"></span></div>
            </div>
          </div>
        </div>
        <div class="part-large border-r-sm border-b-sm border-gray-700">
          <div class="intro-box acea-row row-column">
            <div class="p-box text-30 text-white f-bold-200 flex-1 acea-row row-column row-center-wrapper">
              <p style="line-height: 1.7">
                As a <strong>registered art enterprise</strong> operating within Dafen’s <strong>National Demonstration Base</strong>, we pride ourselves
                on elevating industry standards. We lead through <strong>transparent business practices</strong>, clear customer
                policies, and <strong>rigorous in-house quality control</strong>. This solid foundation guarantees our clients unwavering
                trust, reliable <strong>after-sales support</strong>, and the consistent delivery of museum-grade artwork for every home
                we touch.
              </p>
            </div>
          </div>
        </div>
        <div class="part-small border-b-sm border-gray-700"></div>
      </div>

    </section>
  </section>

  <section class="sec-artists">
    <h2 class="text-50 f-bold-500 text-center mb-lg-80 mb-40 text-white">WHO WE ARE</h2>
    <div class="artists-swiper-wrapper">
      <swiper
          class="artists-swiper"
          :modules="modules"
          :navigation="{ nextEl: '.artists-next', prevEl: '.artists-prev' }"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :lazy="true"
          :loop="true"
      >
        <swiper-slide v-for="(item, index) in ARTISTS_LIST" :key="item.id" :lazy="true">
          <div class="artists-item acea-row">
            <div class="p-img">
              <img class="w-full h-full fit-cover" :src="imagePrefix(item.portrait)" :alt="item.name"/>
            </div>
            <div class="p-cont text-white text-center acea-row row-center-wrapper">
              <div>
                <p class="text-40">{{ item.name }}</p>
                <p class="text-24 mt-15" style="line-height: 1.5">{{ item.intro }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="acea-row row-center-wrapper mt-15 gap-base">
        <div class="artists-button artists-prev"><span class="iconfont icon-left text-white text-24"></span></div>
        <div class="artists-button artists-next"><span class="iconfont icon-right text-white text-24"></span></div>
      </div>
    </div>
  </section>

  <section class="sec-partner">
    <h2 class="text-50 f-bold-500 text-center mb-lg-80 mb-40">INTERNATIONAL PARTNERS</h2>
    <div class="explore-swiper-wrapper">
      <swiper
          :modules="modules"
          :navigation="{ nextEl: '.explore-next', prevEl: '.explore-prev' }"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :loop="true"
          :lazy="true"
          :breakpoints="{
          '1680': { slidesPerView: 5, spaceBetween: 40, slidesPerGroup: 5 },
          '1460': { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 },
          '1260': { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
          '414': { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
        }"
      >
        <swiper-slide v-for="(item, index) in PARTNER_LIST" :key="item.id" :lazy="true">
          <div
              class="explore-item text-center p-10 border-sm border-gray-200 cursor-pointer select-none"
          >
            <div class="aspect-ratio">
              <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.title"/>
            </div>
            <p class="line2 text-14 mt-15" style="word-break: break-word; min-height: 34px;">{{ item.title }}</p>
          </div>
        </swiper-slide>
      </swiper>
      <div class="acea-row row-center-wrapper mt-15 gap-base">
        <div class="explore-button explore-prev"><span class="iconfont icon-left text-white text-24"></span></div>
        <div class="explore-button explore-next"><span class="iconfont icon-right text-white text-24"></span></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay, Navigation, Pagination, Lazy} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {resolvePageMeta, mergeHeadWithLodash} from "~/config/pageMeta";
import {ARTISTS_LIST, HONOR_LIST, HISTORY_LIST, PARTNER_LIST} from "~/constant";
import {useImage} from "~/composables/useImage";

const modules = [Autoplay, Pagination, Navigation, Lazy]
const {imagePrefix} = useImage()
const route = useRoute()
const origin = useRequestURL().origin

useHead(mergeHeadWithLodash(
    resolvePageMeta("/about"),
    {
      link: [
        {rel: 'canonical', href: `${origin}${route.path}`},
      ]
    }
))
</script>

<style scoped lang="scss">

  .text-30 {
    font-size: clamp(18px, 1.56vw, 30px);
  }

  .text-26 {
    font-size: clamp(16px, 1.35vw, 26px);
  }

  .text-24 {
    font-size: clamp(14px, 1.25vw, 24px);
  }

  .text-16 {
    font-size: clamp(12px, 0.83vw, 16px);
  }

  .sec-banner {
    position: sticky;
    top: 0;
  }

  .sec-wallpaper {
    position: relative;
    z-index: 2;
    background-image: url("~/assets/images/about-bg.png");
    background-repeat: repeat;
  }

  .part-box {
    .part-large {
      width: 29.89%;
    }

    .part-auto {
      width: auto;
      flex: 1;
      overflow: hidden;
    }

    .part-small {
      width: 8.90%;
    }
  }

  .sec-about {
    .slogan {
      padding: 3.64vw 0;
      background: rgba(51, 51, 51, 0.9);
      height: 100%;

      h1 {
        font-size: clamp(20px, 2.60vw, 50px);
      }
    }

    .part-small {
      background: rgba(230, 184, 72, 0.9);
    }
  }

  .sec-history {
    .intro-box {
      height: 100%;

      .p-box {
        background: rgba(167, 48, 48, 0.9);
        padding: 20px;
      }
    }

    .history-list {
      position: relative;
      padding-top: 1.56vw;
      overflow: hidden;

      .history-item {
        display: flex;
        align-items: center;
        padding: 0 4.16vw 0 6.25vw;

        .img-box {
          margin-right: 2.86vw;

          img {
            position: relative;
            filter: drop-shadow(0.52vw -1.56vw 0 var(--color));
            width: 13.54vw;
          }
        }

        .year-box {
          display: flex;
          align-items: center;
          gap: 0.78vw;
          margin-top: -0.78vw;
          width: 6.77vw;

          .circle {
            position: relative;
            width: 1.71vw;
            height: 1.71vw;
            background: #fff;
            border-radius: 50%;
            flex-shrink: 0;

            &::after {
              content: '';
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 50%;
              height: 50%;
              border-radius: 50%;
              background: var(--color);
            }
          }
        }

        .content-box {
          position: relative;
          padding-left: 1.71vw;
          margin-left: 1.71vw;
          margin-top: -0.78vw;
          flex: 1;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.52vw;
            height: 100%;
            background: var(--color);
          }
        }

        &:nth-child(5n + 1) {
          --color: #7b874c;
        }

        &:nth-child(5n + 2) {
          --color: #4d4d4d;
        }

        &:nth-child(5n + 3) {
          --color: #e6b848;
        }

        &:nth-child(5n + 4) {
          --color: #a73030;
        }

        &:nth-child(5n + 5) {
          --color: #2f68bb;
        }
      }

      .history-item + .history-item {
        margin-top: 10px;
      }

      &::before {
        content: '';
        position: absolute;
        left: 38.38%;
        top: 0;
        width: 0;
        height: 100%;
        border: 2px dotted #000;
      }
    }

  }

  .sec-relax {
    .intro-box {
      height: 100%;

      .p-box {
        background: rgba(47, 104, 187, 0.9);
        padding: 20px;
      }
    }

    .content-box {
      margin: 2.08vw 3.64vw;

      p {
        max-width: 19.89vw;
      }

      img {
        max-width: 29.11vw;
        flex-shrink: 0;
      }

      &:nth-child(2n) {
        flex-direction: row-reverse;
      }
    }

    .part-small {
      background: rgba(230, 184, 72, 0.9);
    }
  }

  .sec-reality {
    .intro-box {
      height: 100%;

      .p-box {
        background: rgba(51, 51, 51, 0.9);
        padding: 20px;
      }
    }

    .content-box {
      p {
        margin: 1.82vw 0;
        max-width: 47.34vw;
        position: relative;
        line-height: 1;
        word-break: break-all;

        &::after {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          left: calc(100% + 10px);
          top: calc(clamp(5px, 1vw, 10px) / 2);
          border: clamp(5px, 1vw, 10px) solid transparent;
          border-top-color: #333333;
          vertical-align: middle;
        }
      }
    }

    .part-small {
      position: relative;

      &::after,
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 50%;
      }

      &::after {
        background: rgba(230, 184, 72, 0.9);
        top: 0;
      }

      &::before {
        background: rgba(47, 104, 187, 0.9);
        bottom: 0;
      }

    }
  }

  .sec-honor {
    .intro-box {
      height: 100%;

      .p-box {
        background: rgba(167, 48, 48, 0.9);
        padding: 20px;
      }
    }

    .honor-swiper-wrapper {
      max-width: 40%;
      margin: 0 auto;
      position: relative;

      .honor-button {
        position: absolute;
        width: clamp(33px, 2.60vw, 50px);
        height: clamp(33px, 2.60vw, 50px);
        background: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        transform: translateY(-50%);
      }

      .honor-prev {
        left: calc(clamp(-50px, -2.60vw, -33px) + clamp(-50px, -2.60vw, -33px) / 2);
      }

      .honor-next {
        right: calc(clamp(-50px, -2.60vw, -33px) + clamp(-50px, -2.60vw, -33px) / 2);
      }

    }

  }

  .sec-artists {
    position: relative;
    z-index: 2;
    background: #4d4d4d;
    padding: 6.25vw 0;

    .artists-swiper-wrapper {
      max-width: 47%;
      margin: 0 auto;
      position: relative;

      .artists-swiper .swiper-slide {
        height: auto;
      }

      .artists-item {
        border-radius: 20px;
        overflow: hidden;
        height: 100%;

        .p-img {
          width: 34%;
        }

        .p-cont {
          width: 66%;
          background: #333333;
          padding: 15px 2.86vw;
        }
      }

      .artists-button {
        position: absolute;
        width: clamp(33px, 2.60vw, 50px);
        height: clamp(33px, 2.60vw, 50px);
        background: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        transform: translateY(-50%);
      }

      .artists-prev {
        left: calc(clamp(-50px, -2.60vw, -33px) + clamp(-50px, -2.60vw, -33px) / 2);
      }

      .artists-next {
        right: calc(clamp(-50px, -2.60vw, -33px) + clamp(-50px, -2.60vw, -33px) / 2);
      }
    }
  }

  .sec-partner {
    position: relative;
    z-index: 2;
    color: #fff;
    background: #000;
    padding: 6.25vw 0;

    .explore-swiper-wrapper {
      position: relative;
      max-width: 70%;
      margin: auto;

      .explore-button {
        position: absolute;
        width: clamp(33px, 2.60vw, 50px);
        height: clamp(33px, 2.60vw, 50px);
        background: #4d4d4d;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        transform: translateY(-50%);
      }

      .explore-prev {
        left: calc(clamp(-50px, -2.60vw, -33px) + clamp(-50px, -2.60vw, -33px) / 2);
      }

      .explore-next {
        right: calc(clamp(-50px, -2.60vw, -33px) + clamp(-50px, -2.60vw, -33px) / 2);
      }
    }

    .partner-box {
      max-width: 1640px;
      margin: 0 auto;
      padding: 0 20px;


    }
  }

  @media (max-width: 991px) {
    .sec-history .history-list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 0;

      .history-item {
        flex-direction: column;
        padding: 20px;
        margin-top: 0 !important;
        width: 50%;

        .img-box {
          margin-right: 0;

          img {
            width: 150px;
          }
        }

        .year-box {
          width: auto;
          margin: 15px 0;

          .circle {
            display: none;
          }
        }

        .content-box {
          margin-top: 0;
          margin-left: 0;
        }

      }

      &::before {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    .part-box {
      .part-large {
        width: 100%;
      }

      .part-auto {
        width: 100%;
      }

      .part-small {
        display: none;
      }
    }

    .sec-about {

      .part-box {
        .part-large, .part-auto {
          width: 50%;
        }
      }

      .slogan, .slogan2 {
        padding: 20px;
        text-align: center;
      }
    }

    .sec-relax {

      .part-box .part-auto {
        order: 1;
      }

      .content-box {
        margin: 15px;

        p {
          padding: 0 10px;
        }

        p, img {
          width: 50%;
          max-width: unset;
        }
      }
    }

    .sec-reality .content-box p {
      margin: 15px 0;
      max-width: 80%;
    }

    .sec-honor {
      .part-box .part-auto {
        order: 1;
      }

      .honor-swiper-wrapper {
        max-width: 50%;
        padding: 15px;
      }
    }

    .sec-partner {
      margin-bottom: -20px;
    }
  }

  @media (max-width: 600px) {

    .sec-artists .artists-swiper-wrapper {
      max-width: 100%;
      padding: 0 15px;

      .artists-item {
        flex-direction: column;

        .p-img {
          width: 100%;
          height: 400px;
        }

        .p-cont {
          width: 100%;
          flex: 1;
        }
      }

      .artists-button {
        position: static;
        left: 0;
        right: 0;
        top: 0;
        transform: translateY(0);
      }
    }

    .sec-honor .honor-swiper-wrapper {
      max-width: 100%;

      .honor-button {
        position: static;
        left: 0;
        right: 0;
        top: 0;
        transform: translateY(0);
      }
    }

    .sec-partner .explore-swiper-wrapper {
      max-width: 100%;
      padding: 0 15px;

      .explore-button {
        position: static;
        left: 0;
        right: 0;
        top: 0;
        transform: translateY(0);
      }
    }
  }
</style>