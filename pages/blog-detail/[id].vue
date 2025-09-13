<template>
  <section class="sec-imgs mt-20">
    <div class="container-small">
      <div class="swiper-box">
        <swiper
          class="img-swiper"
          :modules="modules"
          :navigation="true"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="item in blogDetail?.banner" :key="item">
            <img v-lazy="imagePrefix(item)" alt="">
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>

  <section class="sec-content">
    <div class="container-small">
      <div class="interaction-container">
        <div class="author-container">
          <h1 class="text-30 f-bold my-20">{{ blogDetail?.title }}</h1>
          <div class="text-18">{{ blogDetail?.content }}</div>
          <div class="text-14 acea-row gap-xs mt-10" v-if="blogDetail?.labels?.length">
            <span class="text-secondary cursor-pointer" v-for="(label, labelIndex) in blogDetail.labels"
                  :key="labelIndex">#{{ label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-rec" v-if="blogDetail?.products.length">
    <div class="container-small">
      <h1 class="my-20 py-20 border-b-xl border-gray-700 text-26 font-bold">RELATED PRODUCTS</h1>
      <div class="row product-list gap-row-base">
        <div class="col-sm-3 col-6" v-for="item in blogDetail?.products" :key="item.id">
          <NuxtLink :to="productLink(item)" target="_blank" class="product-item">
            <div class="img-wrapper bg-gray-100">
              <img v-lazy="imagePrefix(item.img)" :alt="item.title">
            </div>
            <div class="content-wrapper">
              <h1 class="line2 text-14">{{ item.title }}</h1>
              <p class="text-16 f-bold my-8">{{ currencyStore.formatToCurrency(item.retailPrice) }}</p>
              <div class="acea-row gap-xs">
                <div class="p-tag bg-gray-400" v-for="label in item.labels" :key="label">{{ label }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import type {IBlog} from "~/api/interface/blog/blog";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {imagePrefix, jumpToProduct, productLink} from "~/utils";
import {useCurrencyStore} from "~/stores/modules/currency";

const currencyStore = useCurrencyStore()
const route = useRoute()
const modules = [Pagination, Navigation]

const {data: blogDetail} = await useAsyncData('blog-detail', async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IBlog.Row>>(config.public.apiBase + TRADE_MODULE + '/blog/detail/' + route.params.id)
  return data
})

</script>

<style scoped lang="scss">
.sec-imgs {
  .swiper-box {
    height: 600px;
    background: rgba(0, 0, 0, 0.03);

    .img-swiper {
      height: 100%;

      :deep(.swiper-wrapper) {

        .swiper-slide {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }

      :deep(.swiper-button-prev),
      :deep(.swiper-button-next) {
        width: 30px;
        height: 30px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 100%;
        transition: all 0.3s;
        opacity: 0;

        &::after {
          font-size: 12px;
          color: #fff;
        }
      }

      :deep(.swiper-button-prev) {
        transform: translateX(-20px);
      }

      :deep(.swiper-button-next) {
        transform: translateX(20px);
      }

      :deep(.swiper-pagination-bullet) {
        width: 8px;
        height: 8px;
      }

      &:hover {
        :deep(.swiper-button-prev),
        :deep(.swiper-button-next) {
          opacity: 1;
          transform: translateX(0);

          &.swiper-button-disabled {
            opacity: 0.35;
          }
        }
      }
    }
  }
}

.product-list {

  .product-item {
    display: block;
    .img-wrapper {
      position: relative;
      aspect-ratio: 1 / 1;

      img {
        max-width: 95%;
        max-height: 95%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .tags-wrapper {
        position: absolute;
        left: 10px;
        bottom: 10px;
      }

      .operation {
        position: absolute;
        right: 10px;
        bottom: 10px;
        background: #fff;
      }

      .num {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        background: var(--color-primary);
        width: 42px;
        height: 42px;
      }
    }

    .p-tag {
      padding: 4px;
      font-size: 10px;
      color: #fff;
    }
  }
}
</style>