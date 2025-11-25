<template>
  <section class="sec-banner my-md-40 my-20">
    <div class="container">
      <img class="w-full" :src="imagePrefix('/static/artdafen/reviews-banner.webp')" alt="customer reviews">
    </div>
  </section>

  <section class="sec-reviews">
    <div class="container">
      <ProInfinite
        :request-api="_getCommentList"
      >
        <template #default="scope">
          <div class="reviews-list">
            <div class="reviews-item" v-for="item in scope.rows" :key="item.id">
              <img class="w-full" :src="imagePrefix(item.img)" :alt="item.name">
              <div class="p-content border-sm">
                <div class="p-10">
                  <p class="text-18 f-bold-500 mb-md-10 mb-5">{{ item.name }}</p>
<!--                  <p class="text-12 f-bold-500 text-gray-400 my-md-10 my-5">{{ formatTimestamp(item.createTime, 'YYYY/MM/DD') }}</p>-->
                  <el-rate
                    v-model="item.rating"
                    disabled
                    size="small"
                    style="height: auto"
                  />
                  <p class="text-16 mt-md-10 mt-5" style="line-height: 1.5">{{ item.content }}</p>
                </div>
                <div class="product-list" v-if="item.product">
                  <div
                    class="product-item border-t-sm p-10 acea-row row-middle cursor-pointer"
                    @click="jumpToProduct(item.product)"
                  >
                    <div class="p-img mr-6">
                      <img class="aspect-ratio fit-cover" :src="imagePrefix(item.product.img)" :alt="item.product.title">
                    </div>
                    <div class="flex-1 overflow-hidden">
                      <p class="line3 text-14">{{ item.product.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ProInfinite>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProInfinite from "~/components/ProInfinite.vue";
import type {IMessage} from "~/api/interface/message/message";
import {getCommentList} from "~/api/modules/message/message";
import {imagePrefix, jumpToProduct} from "~/utils";
import {formatTimestamp} from "~/utils/format";


// 获取买家秀数据
const _getCommentList = (params: IMessage.CommentQuery) => getCommentList(params)

</script>

<style scoped lang="scss">
.sec-reviews {
  .reviews-list {
    column-count: 4; /* 列数 */
    column-gap: 26px; /* 列间距 */

    .reviews-item {
      break-inside: avoid; /* 防止内容被分割到不同列 */
      margin-bottom: 26px; /* 项目间距 */
      display: block;

      .product-list {

        .product-item {
          .p-img {
            width: 48px;
            height: 48px;
          }
        }

      }

    }
  }
}

@media (max-width: 1260px) {
  .sec-reviews {
    .reviews-list {
      column-count: 3; /* 列数 */
      column-gap: 20px; /* 列间距 */

      .reviews-item {
        margin-bottom: 20px; /* 项目间距 */
      }
    }
  }
}

@media (max-width: 991px) {
  .sec-reviews {
    .reviews-list {
      column-count: 2; /* 列数 */
      column-gap: 15px; /* 列间距 */

      .reviews-item {
        margin-bottom: 15px; /* 项目间距 */

        .product-list {

          .product-item {
            .p-img {
              width: 35px;
              height: 35px;
            }
          }

        }
      }
    }
  }
}
</style>