<template>
  <section class="contact-section">
    <div class="container" style="line-height: 2">
      <h1 class="text-30 font-bold lg:pt-50 py-30">Contact Us</h1>
      <p class="text-16 text-gray-600">
        <span class="text-gray-700 font-bold">Your Vision, Our Masterpiece — Any Medium, Any Size.</span> <br/>
        At <span class="text-gray-700 font-bold">ARTDAFEN</span>, we bridge the gap between imagination and reality.
        Whether you are sourcing for a boutique hotel or
        curating a private collection, we provide a one-stop solution for high-end art. <br/>
      </p>
      <p class="text-16 text-gray-600">
        <span class="text-gray-700 font-bold">Custom Oil Paintings</span> Can't find what you're looking for? Send us a
        request.
      </p>
      <ul class="list-ul disc">
        <li class="text-16 text-gray-600">
          <span class="text-gray-700 font-bold">Unlisted Works:</span> We recreate museum-quality reproductions of any
          artwork in history.
        </li>
        <li class="text-16 text-gray-600">
          <span class="text-gray-700 font-bold">Photo to Painting:</span> Turn your cherished memories—portraits, pets, or
          landscapes—into handmade oil paintings.
        </li>
      </ul>
      <p class="text-16 text-gray-600">
        <span class="text-gray-700 font-bold">Mixed Media & Textural Art</span> Beyond canvas. We push the boundaries of
        traditional art by combining diverse materials — <span class="text-gray-700 font-bold">metal, resin, wood, fabric, and acrylics</span>.
      </p>
      <ul class="list-ul disc">
        <li class="text-16 text-gray-600">
          <span class="text-gray-700 font-bold">Rich Textures:</span> Create depth and character with 3D relief art and
          heavy-texture abstracts.
        </li>
        <li class="text-16 text-gray-600">
          <span class="text-gray-700 font-bold">Modern Aesthetics:</span> Perfect for contemporary luxury interiors that
          demand a unique tactile experience.
        </li>
      </ul>
      <p class="text-16 text-gray-600">
        <span class="text-gray-700 font-bold">Bespoke Sculptures</span> Looking for something dimensional? We specialize in
        high-fidelity sculpture reproductions. From classic statues to modern designs, we craft works in any size, from
        tabletop decor to large-scale outdoor installations.
      </p>
      <p class="text-16 text-gray-600">
        <span class="text-gray-700 font-bold">Wholesale & Bulk Orders</span> Ready to scale? We support bulk purchasing
        with consistent quality across all categories. Please send us your project details (Brand Intro, Quantity,
        Deadline), and let’s create something extraordinary together.
      </p>
      <p class="text-16 text-gray-600">
        <span class="text-gray-700 font-bold">Get Your Custom Quote</span>
      </p>
      <div class="text-60 text-center font-500 border-t-4  border-primary lg:mt-40 mt-20">
        <p class="lg:my-60 my-30">{{ CONTACT_EMAIL }}</p>
      </div>
    </div>
  </section>

  <section class="info-section">
    <div class="container">
      <div class="info-list row">
        <div class="col-sm-6" v-for="(item, index) in pointList" :key="index">
          <div class="info-item shadow-md">
            <div class="icon-wrapper acea-row row-center-wrapper">
              <SvgIcon name="rengongkefu" />
            </div>
            <div class="content-wrapper">
              <p class="text-18 font-600">Call us now</p>
              <p class="text-14 text-gray-600 mt-8 mb-12 desc">{{ item.detail }}</p>
              <p class="text-24 mb-24">
                <a :href="`mailto:${item.email}`">{{ item.email }}</a>
              </p>
              <p class="text-24 mb-24" v-if="item.tel">
                <a :href="`tel:${item.tel}`">{{ item.tel }}</a>
              </p>
              <el-button type="primary" size="large" :disabled="!item.tel">
                <a :href="item.tel ? `tel:${item.tel}` : 'void:0'">
                  CALL NOW
                  <SvgIcon name="right" class="ml-10" />
                </a>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {resolvePageMeta} from "~/config/pageMeta";
import {CONTACT_EMAIL} from "~/config";
import {COUNTRY_CODE, CUSTOMER_SERVICE, REGISTERED_ADDRESS, STUDIO_ADDRESS} from "../config";

useHead(resolvePageMeta("/contact"));

const pointList = ref([
  {
    detail: `${STUDIO_ADDRESS} / ${REGISTERED_ADDRESS}`,
    tel: `${COUNTRY_CODE} ${CUSTOMER_SERVICE}`,
    email: `${CONTACT_EMAIL}`,
  },
  // {
  //   detail: '103, 1st Floor, Dafen Oil Painting Trading Plaza, Buji Street, Longgang District, Shenzhen',
  //   tel: '',
  //   email: 'infocn@artdafen.com',
  // },
  // {
  //   detail: '111 Morgan Street, Room 323, Stamford CT 06905',
  //   tel: '',
  //   email: 'infous@artdafen.com',
  // },
  // {
  //   detail: '23 Rue du Bois Joli,44200 Nantes',
  //   tel: '(213)656-3859',
  //   email: 'infofr@artdafen.com',
  // },
  // {
  //   detail: 'unit 5-6, Wellington house, Camden street, Brighton, East Sussex BN41 1DU, UK',
  //   tel: '',
  //   email: 'infouk@artdafen.com',
  // }
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
  margin-bottom: -30px;

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
        background: #e6e6e6;
        margin-right: 24px;

        .iconify {
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
    margin-bottom: -15px;

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