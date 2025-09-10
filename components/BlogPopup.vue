<template>
  <div
    v-show="modelValue"
    class="note-detail-mask"
  >
    <div class="note-container animate__zoomIn" v-loading="isLoading">

      <div class="media-container">
        <swiper
          :modules="modules"
          :navigation="true"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="item in noteInfo.banner" :key="item">
            <div class="img-container">
              <img :src="imagePrefix(item)" alt="">
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="interaction-container">
        <div class="author-container scroll-hide">
          <div class="text-18 f-bold mb-10">{{ noteInfo.title }}</div>
          <div class="text-16">{{ noteInfo.content }}</div>
          <div class="text-14 acea-row gap-xs mt-10" v-if="noteInfo?.labels?.length">
            <span class="text-secondary cursor-pointer" v-for="(label, labelIndex) in noteInfo.labels" :key="labelIndex">#{{ label }}</span>
          </div>
          <div class="product-list mt-16" v-if="noteInfo?.products?.length">
            <div class="product-item border-t-sm py-8 acea-row row-middle cursor-pointer" v-for="goods in noteInfo.products.slice(0, moreProduct? -1 : 3)" :key="goods.id" @click.stop="jumpToProduct(goods)">
              <div class="p-img mr-6">
                <img :src="imagePrefix(goods.img)" alt="">
              </div>
              <div class="flex-1 overflow-hidden">
                <p class="line1 text-16">{{ goods.title }}</p>
                <p class="line1 text-14 my-4 text-gray-400">{{ formatAttr(goods.labels) }}</p>
                <p class="text-14">${{ goods.retailPrice }}</p>
              </div>
            </div>
          </div>
          <div class="text-center my-16 cursor-pointer" v-if="noteInfo?.products?.length > 3 && !moreProduct" @click="moreProduct = true">
            <span>Less Product</span>
            <span class="iconfont icon-down ml-4"></span>
          </div>
        </div>
        <div class="bto-container">
          <p>{{ formatTimestamp(noteInfo.createTime, 'MM-DD' ) }}</p>
          <p class="acea-row row-middle">
            <span class="iconfont icon-follow cursor-pointer text-20" v-show="!noteInfo.like" @click.stop="blogThumbs"></span>
            <span class="iconfont icon-follow-fill text-error cursor-pointer text-20" v-show="noteInfo.like" @click.stop="blogThumbs"></span>
            <span class="text-14 ml-4">{{ noteInfo.likeVolume }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="close-circle" @click="close">
      <div class="close">
        <span class="iconfont icon-close text-20"></span>
      </div>
    </div>
    <div class="back-desk" @click="close"></div>
  </div>
</template>

<script setup lang="ts">
import {getBlogDetailApi} from "~/api/modules/blog/blog";
import {formatAttr, imagePrefix, jumpToProduct} from "~/utils";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type {IBlog} from "~/api/interface/blog/blog";
import {formatTimestamp} from "~/utils/format";
import {debounce} from "lodash-es";
import {useUserStore} from "~/stores/modules/user";
import {blogThumbsApi} from "~/api/modules/likes/likes";

defineOptions({
  name: 'BlogPopup',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'noAuth': [];
  'onThumbs': [value: string];
}>();

interface Props {
  modelValue: boolean; // 显示和隐藏的状态
  nid: string; // 文章的id
  nowTime: Date; // 当前时间
}

const props = defineProps<Props>()
const modules = [Pagination, Navigation]
const noteInfo = ref({} as  IBlog.Row)
const userStore = useUserStore()
const moreProduct = ref(false)
const isLoading = ref(false)

watch(
  () => [props.nowTime],
  () => {
    if (props.nid !== null && props.nid !== "") {
      moreProduct.value = false;
      isLoading.value = true;
      getBlogDetailApi(props.nid).then(({ data }) => {
        data.likeVolume = (Number(data.likeVolume) + (data.like ? 1 : 0)).toString()
        noteInfo.value = data;
        isLoading.value = false
      })
    }
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      // 禁用页面滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 启用页面滚动
      document.body.style.overflow = '';
    }
  }
)

const close = () => {
  emit("update:modelValue", false);
}

// 点赞/取消点赞
const blogThumbs = debounce(  async () => {
  if (!userStore.isLogin){
    emit("noAuth")
    return
  }
  await blogThumbsApi({mediaId: noteInfo.value.id, operate: ~~!noteInfo.value.like as Dict.ThumbsOperateType})
  noteInfo.value.like = !noteInfo.value.like
  noteInfo.value.likeVolume = (Number(noteInfo.value.likeVolume) + (noteInfo.value.like ? 1 : -1)).toString()
  emit("onThumbs", props.nid)
}, 300)

</script>

<style scoped lang="scss">
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.animate__zoomIn {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: zoomIn;
}

.note-detail-mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: auto;

  .note-container {
    position: relative;
    margin: auto;
    width: 56%;
    height: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-shadow: 0 8px 64px 0 rgba(0, 0, 0, 0.04), 0 1px 4px 0 rgba(0, 0, 0, 0.02);
    border-radius: 20px;
    background: #f8f8f8;
    z-index: 222;

    .media-container {
      width: 60%;
      height: 100%;
      background: rgba(0, 0, 0, 0.03);
      user-select: none;
      overflow: hidden;
      border-radius: 20px 0 0 20px;
      .swiper {
        width: 100%;
        height: 100%;
        .img-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :deep(.swiper-button-prev),
        :deep(.swiper-button-next){
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
          :deep(.swiper-button-next){
            opacity: 1;
            transform: translateX(0);

            &.swiper-button-disabled {
              opacity: 0.35;
            }
          }
        }

      }
    }

    .interaction-container {
      width: 40%;
      height: 100%;
      border-radius: 0 20px 20px 0;
      background-color: #fff;
      border-left: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;

      .author-container {
        flex: 1;
        position: relative;
        padding: 20px 20px 0;
        overflow: hidden auto;

        .product-list {
          .product-item {
            .p-img {
              width: 60px;
              height: 60px;
            }
          }

        }

      }

      .bto-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #B3B3B3;
        background: #fff;
        padding: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
      }
    }
  }

  .back-desk {
    position: fixed;
    background-color: #f4f4f4;
    opacity: 0.5;
    width: 100vw;
    height: 100vh;
    z-index: 211;
  }

  .close-circle {
    left: 1.3vw;
    top: 1.3vw;
    position: fixed;
    z-index: 222;
    cursor: pointer;

    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      transition: all 0.3s;
      background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04),
      0 1px 2px 0 rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.08);
    }
  }
}

@media (max-width: 991px) {
  .note-detail-mask {

    .note-container {
      width: 100%;
      height: 100%;
      display: block;
      box-shadow: none;
      border-radius: 0;

      .media-container {
        width: 100%;
        height: auto;
        flex-shrink: 0;
        border-radius: 0;

        .swiper{
          aspect-ratio: 1 / 1;

          .img-container {

            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }

      .interaction-container {
        width: 100%;
        height: auto;
        border-radius: 0;
        border-left: none;
      }
    }

  }
}
</style>