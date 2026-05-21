<template>
  <section class="list-section">
    <div class="container">

      <el-skeleton :loading="pending" animated :count="2">
        <template #template>
          <div class="w-full row">
            <div class="col-4" v-for="item in 3" :key="item">
              <el-skeleton-item variant="image" class="aspect-video" style="width: 100%; height: unset;"/>
              <div class="py-10">
                <el-skeleton-item variant="h1"/>
                <el-skeleton-item variant="p" class="my-10" style="width: 50%"/>
              </div>
            </div>
          </div>
        </template>
        <div class="zone-list">
          <NuxtLink
              class="zone-item my-20 block"
              v-for="(item, index) in pageData.records" :key="item.id"
              :to="`/zone-detail/${item.id}/${item.slug}`"
          >
            <div class="images">

              <template v-if="index % 2 === 0">
                <div class="image-box overflow-hidden">
                  <img
                      class="w-full h-full object-cover"
                      :src="imagePrefix(item.img)"
                      :alt="item.title"
                  />
                  <div class="link-box acea-row row-center-wrapper">
                    <SvgIcon name="link" class="text-20" />
                  </div>
                </div>
              </template>

              <template v-if="index % 2 === 1">
                <template v-for="(banner, bIndex) in item.banners" :key="bIndex">
                  <div class="image-box overflow-hidden" v-if="bIndex <= 2">
                    <img
                        class="w-full h-full object-cover"
                        :src="imagePrefix(banner)"
                        :alt="item.title"
                    />
                    <div class="link-box acea-row row-center-wrapper">
                      <SvgIcon name="link" class="text-20" />
                    </div>
                  </div>
                </template>
              </template>
            </div>
            <div class="content-box mt-20">
              <h2 class="title text-30 font-500">{{ item.title }}</h2>
              <p class="subtitle text-22 mt-5">{{ item.name }}</p>
            </div>
          </NuxtLink>
        </div>
      </el-skeleton>

      <div class="lg:py-40 py-20">
        <SeoPagination :current="currentPage" :totalPages="totalPages" basePath="/zone" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useSeoPaginationLogic} from "~/composables/useSeoPaginationLogic";
import type {IProduct} from "~/api/interface/product/product";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {ZONE_LIST_SIZE} from "~/config";
import {useImage} from "~/composables/useImage";

definePageMeta({
  scrollToTop: false // 再次确认禁用了默认滚动
})

const { imagePrefix } = useImage()

const {pageData, currentPage, totalPages, pending} = await useSeoPaginationLogic<IProduct.ZoneRow>(
    {
      apiPath: `${TRADE_MODULE}/product/zone/list`,
      baseRoute: '/zone',
      uniqueKey: 'zone-more',
      pageSize: ZONE_LIST_SIZE,
    },
)

</script>

<style lang="scss" scoped>
  .list-section {
    .zone-list {
      .zone-item {

        .images {
          display: flex;
          flex-wrap: nowrap;
          gap: 20px;

          .image-box {
            position: relative;
            width: 100%;

            .link-box {
              position: absolute;
              left: 30px;
              bottom: 30px;
              width: 40px;
              height: 40px;
              background: #fff;
              border-radius: 50%;
              color: #000;
            }

          }

          @media (max-width: 768px) {

            gap: 15px;

            .image-box {
              .link-box {
                left: 15px;
                bottom: 15px;
                width: 30px;
                height: 30px;
              }
            }

          }

          @media (max-width: 414px) {

            gap: 10px;

            .image-box {
              .link-box {
                left: 10px;
                bottom: 10px;
                width: 25px;
                height: 25px;
              }
            }

          }
        }

        .content-box {
          text-align: center;

          .title {
          }

          .subtitle {
          }
        }

      }
    }

  }
</style>