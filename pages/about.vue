<template>
  <section class="banner-section" :style="{ backgroundImage: `url(${bannerImage})` }"></section>

  <section class="intro-section">
    <div class="intro-box acea-row">
      <div class="intro-box-left border-r-sm">
        <div class="acea-row row-middle row-column f-bold-500 viscosity">
          <div>
            <p class="text-50" v-aos="'zoom-in-up'">ABOUT<br/> ART<br/> DAFEN</p>
            <p class="text-16 text-gray-600 mt-10" v-aos="'zoom-in-up'">
              Since 1989 · <br/>
              Reimagined 2020<br/>
              Classic × Original<br/>
              Art That Lights Up Life<br/>
            </p>
          </div>
        </div>
      </div>
      <div class="intro-box-right">
        <div class="max-wrap">
          <div class="app-title text-50 f-bold-500 mb-40 text-center" v-aos="'fade-up'">ABOUT ART DAF EN</div>
          <div class="text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" v-aos="'fade-up'">
            WHERE IT ALL BEGAN: THE ROOTS OF DAFEN
          </div>
          <p class="text-22" v-aos="'fade-up'">
            In 1989, Hong Kong art dealer Mr. Huang Jiang came to Dafen Village in Shenzhen’s Longgang District. Drawn by affordable rents and its proximity to the Shenzhen Special Economic Zone, he set up an oil painting workshop and recruited painters to replicate artworks for overseas markets.
            <br/><br/>
            Mr. Huang is widely recognized as the founding figure of Dafen’s oil painting industry. He was the inaugural chairman of the Dafen Fine Arts Industry Association and later honored as its lifelong honorary president.
            <br/><br/>
            In its early years, Dafen’s art industry operated under a “processing with supplied materials” model—mass-producing replica oil paintings mainly for Europe, America, and the Middle East. As demand increased, apprentices, painters, and art school graduates gathered in Dafen, forming a complete industrial chain that included production, sales, and logistics.
          </p>
          <br/><br/>
          <br/><br/>
          <div class="text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" v-aos="'fade-up'">
            A NEW CHAPTER: TRANSFORMATION THROUGH CREATIVITY
          </div>
          <p class="text-22" v-aos="'fade-up'">
            In the early 2000s, Dafen began a transformation. With support from government initiatives, the village gradually shifted from mass replication toward cultivating original art. Cultural events, exhibitions, and art festivals brought new vitality to the community, drawing in artists with creative aspirations.
            <br/><br/>
            In 2004, Dafen was officially named a “National Cultural Industry Demonstration Base” by China’s Ministry of Culture. While replication remained important, new art forms like sculpture, printmaking, and artistic derivatives emerged. Dafen evolved into a vibrant hub where tradition met innovation, changing from a simple oil painting village into a true art community.
          </p>
          <br/><br/>
          <br/><br/>
          <div class="text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" v-aos="'fade-up'">
            FOUNDER’S STORY: FROM DAFEN TO THE WORLD
          </div>
          <p class="text-22" v-aos="'fade-up'">
            Since 2004, Mr. Zhou Feng has been deeply rooted in Dafen’s art ecosystem. That year, he founded Fine Art Studio, followed by Shenzhen Fine Art Co., Ltd. in 2006 and Hong Kong’s Yagene International Art Co., Limited in 2009.
            <br/><br/>
            Over the past two decades, he has been a witness, a practitioner, a driving force, and a guiding figure in Dafen’s transformation from a center of replica oil painting to a hub of artistic innovation.
            <br/><br/>
            In 2016, Mr. Zhou was appointed Chairman of the Dafen Fine Arts Industry Association. Under his leadership, Dafen accelerated its digital transformation by launching an e-commerce service center that brought the industry online and expanded its global reach. He also formed international exhibition delegations that connected Dafen’s top artworks directly with global audiences, elevating the village onto the world art stage.
            <br/><br/>
            Today, Dafen Oil Painting Village is home to over 30,000 art professionals, including more than 8,000 skilled painters and 1,200 original artists. Its thriving ecosystem generates billions of yuan in annual value and has become a cultural tourism destination that welcomes visitors from around the world.
          </p>
          <br/><br/>
          <img class="w-full" :src="imagePrefix('/static/artdafen/about-story1.webp')" alt="Zhou Feng" v-aos="'fade-up'">
          <br/><br/>
          <br/><br/>
          <div class="text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" v-aos="'fade-up'">
            THE BIRTH OF ART DAFEN
          </div>
          <p class="text-22" v-aos="'fade-up'">
            The founding of Art Dafen draws inspiration from the philosophy of Leonardo da Vinci, whose dedication to exploring nature and blending art with science resonates deeply with the spirit of Dafen’s artists. In this land shaped by creativity and craftsmanship, Mr. Zhou Feng found a vision that aligned with these timeless values.
            <br/><br/>
            In 2020, after years of dedication and preparation, Mr. Zhou officially established the Art Dafen brand and launched the online platform artdafen.com. The brand’s mission is to promote skilled craftsmanship, support visionary artists, and bring original, high-quality art into everyday life.
            <br/><br/>
            The name “Art Dafen” pays tribute to its birthplace, Dafen Village, while also echoing the name “da Vinci,” the Renaissance master who symbolizes the fusion of art and science. This meaningful connection reflects the brand’s goal to bridge East and West, tradition and innovation, and to redefine how art enriches modern global living.
          </p>
          <br/><br/>
          <br/><br/>
          <div class="text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" v-aos="'fade-up'">
            FROM TRADITION TO INNOVATION IN EVERYDAY LIFE
          </div>
          <p class="text-22" v-aos="'fade-up'">
            Art Dafen believes that art should extend beyond galleries and museums to inspire everyday life. By transforming classical artistry into tableware, clothing, art derivatives, and lifestyle products, the brand helps people rediscover beauty in the objects they use daily.
            <br/><br/>
            Through collaborations with contemporary artists, Art Dafen experiments with new materials and visual styles, creating original works that blend Eastern aesthetics with global sensibilities.
            <br/><br/>
            The brand is also committed to education and outreach, striving to make art approachable and accessible to people from all backgrounds while inspiring the next generation of creators.
          </p>
          <br/><br/>
          <br/><br/>
          <div class="text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" v-aos="'fade-up'">
            ART IN EVERYDAY LIFE
          </div>
          <p class="text-22" v-aos="'fade-up'">
            We believe art should not be confined to galleries or museums—it should inspire everyday living. At Art Dafen, we transform classical art languages into lifestyle objects, home décor, and cultural products, awakening a global appreciation for beauty through design and creativity.
          </p>
          <br/><br/>
          <br/><br/>
          <div class="text-22 f-bold-500 text-gray-600 pb-20 mb-20 border-b-md border-gray-600" v-aos="'fade-up'">
            GLOBAL COLLABORATION AND CULTURAL EXCHANGE
          </div>
          <p class="text-22" v-aos="'fade-up'">
            Rooted in Eastern artistry, Art Dafen embraces a global outlook. The brand partners with artists and designers from Europe, North America, Southeast Asia, and the Middle East to foster meaningful cross-cultural collaboration.
            <br/><br/>
            Art Dafen’s works have been showcased in international exhibitions and found places in homes and public spaces worldwide, carrying the spirit of Dafen across borders.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="vision-section border-t-sm border-b-sm">
    <h2 class="text-50 f-bold-500 mb-40 text-center" v-aos="'fade-up'">OUR VISION</h2>
    <p class="text-22 desc text-center" v-aos="'fade-up'">
      Art Dafen’s vision is to help the world discover Dafen through art and to make “Dafen” a recognized name in the history of the global art industry. The brand connects cultures, transcends boundaries, and embodies the spirit of craftsmanship that defines its story. Above all, Art Dafen aims to foster a global community where creativity and culture inspire ongoing dialogue and collaboration.
    </p>
  </section>

  <section class="intro-section">
    <div class="intro-box acea-row">
      <div class="intro-box-left border-r-sm">
        <div class="acea-row row-middle row-column f-bold-500 viscosity">
          <p class="text-50" v-aos="'zoom-in-up'">INDUSTRY<br/>RECOGNITION</p>
          <p class="text-16 text-gray-600 mt-10" v-aos="'zoom-in-up'"></p>
        </div>
      </div>
      <div class="intro-box-right">
        <div class="max-wrap">
          <div class="app-title text-50 f-bold-500 mb-40 text-center" v-aos="'fade-up'">HONORS</div>
          <p class="text-22" v-aos="'fade-up'">
            Over the years, Mr. Zhou Feng and his affiliated companies have earned wide recognition for their contributions to the art industry, both in China and internationally. Their leadership and innovation have been acknowledged through the following roles and honors:
          </p>
          <br/>
          <ul class="text-22 list-ul disc" v-aos="'fade-up'">
            <li>Chairman and Honorary Chairman Unit of the Shenzhen Dafen Fine Arts Industry Association</li>
            <li>Official Operator of the Oil Painting Trade Promotion Center at the Shenzhen National Cultural Trade Base</li>
            <li>Designated Operator of the Cultural and Art Industry Service Center under the National Art Authentication and Registration Program</li>
            <li>Executive Chairman Unit of the Shenzhen Creative Design Intellectual Property Promotion Association</li>
            <li>Operator of the Material Selection Center for the Shenzhen Interior Designers Association</li>
            <li>Honorary Supporter of the internationally recognized IDEA-TOPS Design Awards</li>
          </ul>
          <div class="mt-40 py-10 px-25" v-aos="'fade-up'">
            <div class="album-group">
              <img :src="imagePrefix('/static/artdafen/about-honor1.webp')" alt="honor1">
              <img :src="imagePrefix('/static/artdafen/about-honor2.webp')" alt="honor2">
            </div>
          </div>
          <p class="text-16 text-gray-600 f-bold-500" v-aos="'fade-up'">
            Oil Painting Trade Promotion Center, National Cultural Trade Base (Shenzhen)
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="partner-section">
    <div class="partner-box">
      <h2 class="text-50 f-bold-500 text-center mb-lg-80 mb-40" v-aos="'fade-up'">INTERNATIONAL PARTNERS</h2>
      <ClientOnly>
        <div class="explore-swiper" v-aos="'fade-up'">
          <swiper
            class="pb-lg-80 pb-60"
            :modules="modules"
            :navigation="{ nextEl: '.explore-next', prevEl: '.explore-prev' }"
            :pagination="{ clickable: true}"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :loop="false"
            :breakpoints="{
          '1680': { slidesPerView: 5, spaceBetween: 40, slidesPerGroup: 5 },
          '1460': { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 },
          '1260': { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
          '414': { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
        }"
          >
            <swiper-slide v-for="(item, index) in partnerData" :key="item.id">
              <div
                class="explore-item text-center p-10 border-sm border-gray-200 cursor-pointer select-none"
              >
                <div class="aspect-ratio">
                  <img class="w-full h-full fit-cover" :src="item.img" alt=""/>
                </div>
                <p class="line2 text-14 mt-15" style="word-break: break-word; min-height: 34px;">{{ item.title }}</p>
              </div>
            </swiper-slide>
          </swiper>
          <div class="explore-button explore-next swiper-button-next"></div>
          <div class="explore-button explore-prev swiper-button-prev"></div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay, Navigation, Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {imagePrefix} from "~/utils";
import {pageMeta} from "~/config/pageMeta";

const bannerImage = imagePrefix('/static/artdafen/about-banner.webp');
const modules = [Autoplay, Pagination, Navigation]

const route = useRoute()
useHead(pageMeta[route.path] ?? pageMeta["/about"]);

const partnerData = ref([
  {
    id: 1,
    img: imagePrefix('/static/artdafen/about-partner1.webp'),
    title: 'President of the French Fine Arts Association, Rémi Ayrong',
  },
  {
    id: 2,
    img: imagePrefix('/static/artdafen/about-partner2.webp'),
    title: 'Russian artist Tatyana Livova',
  },
  {
    id: 3,
    img: imagePrefix('/static/artdafen/about-partner3.webp'),
    title: 'French Art Fund',
  },
  {
    id: 4,
    img: imagePrefix('/static/artdafen/about-partner4.webp'),
    title: 'President of Claremont University’s Art Institute, USA',
  },
  {
    id: 5,
    img: imagePrefix('/static/artdafen/about-partner5.webp'),
    title: 'Singapore TV Station',
  },
  {
    id: 6,
    img: imagePrefix('/static/artdafen/about-partner6.webp'),
    title: 'Peng Wenbin, Artistic Director of the Guangzhou Art Fair',
  },
  {
    id: 7,
    img: imagePrefix('/static/artdafen/about-partner7.webp'),
    title: 'Korean artist Park Jeolhwan',
  },
  {
    id: 8,
    img: imagePrefix('/static/artdafen/about-partner8.webp'),
    title: 'Hollywood Director Mike',
  },
  {
    id: 9,
    img: imagePrefix('/static/artdafen/about-partner9.webp'),
    title: 'Russian artist Elena',
  },
  {
    id: 10,
    img: imagePrefix('/static/artdafen/about-partner10.webp'),
    title: 'Artist - French artist Mike',
  },
  {
    id: 11,
    img: imagePrefix('/static/artdafen/about-partner11.webp'),
    title: 'Artist - Italian sculptor Giuseppe Angelo',
  },
  {
    id: 12,
    img: imagePrefix('/static/artdafen/about-partner12.webp'),
    title: 'Belarusian artist Kaliya',
  },
  {
    id: 13,
    img: imagePrefix('/static/artdafen/about-partner13.webp'),
    title: 'Danish artist Peter Ilersted',
  },
  {
    id: 14,
    img: imagePrefix('/static/artdafen/about-partner14.webp'),
    title: 'Russian artist Sergey',
  },
  {
    id: 15,
    img: imagePrefix('/static/artdafen/about-partner15.webp'),
    title: 'John Hawkins - Father of the Global Creative Industries, Renowned British Expert in Creative Cultural Industries',
  }
])

</script>


<style scoped lang="scss">
.banner-section {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: top center;
}

.intro-section {
  .intro-box {
    .intro-box-left {
      width: 32.29%;
      padding: 6.25vw 0;

      .viscosity {
        position: sticky;
        top: 150px;
      }
    }

    .intro-box-right {
      width: 67.71%;
      padding: 6.25vw 0;

      .app-title {
        display: none;
      }

      .max-wrap {
        max-width: 845px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .album-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        img {
          width: calc(50% - 5px);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .intro-section .intro-box {
    .intro-box-left {
      display: none;
    }

    .intro-box-right {
      width: 100%;

      .app-title {
        display: block;
      }
    }
  }
}

.vision-section {
  padding: 6.25vw 0;

  .desc {
    max-width: 1006px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.partner-section {
  color: #fff;
  background: #000;
  padding: 6.25vw 0;

  .partner-box {
    max-width: 1640px;
    margin: 0 auto;
    padding: 0 20px;

    .explore-swiper {
      position: relative;
      padding: 0 6.8vw;

      .swiper {
        :deep(.swiper-pagination) {
          bottom: 0;
          top: unset;

          .swiper-pagination-bullet {
            background: var(--color-gray-600);

            &.swiper-pagination-bullet-active {
              background: #fff;
            }
          }
        }
      }

      .explore-button {
        --swiper-navigation-color: #fff;
        top: calc(50% - 50px);
        width: clamp(26px, 2.60vw, 50px);
        height: clamp(26px, 2.60vw, 50px);

        &::after {
          font-size: clamp(26px, 2.60vw, 50px);
        }

        &.explore-prev {
          left: 1.04vw;
        }

        &.explore-next {
          right: 1.04vw;
        }
      }
    }
  }
}

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

  li + li {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .partner-section {
    margin-bottom: -20px;
  }
}

@media (min-width: 1024px) {
  .banner-section {
    background-attachment: fixed;
  }
}
</style>