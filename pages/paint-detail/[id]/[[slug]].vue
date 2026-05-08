<template>
  <!--规格选择-->
  <section>
    <div class="container">
      <div class="spu-wrapper row pt-md-50">
        <!--预览图栅格-->
        <div class="col-md-6">
          <div :style="{ top: 'var(--header-height)', position: 'sticky' }">
            <div class="spu-preview" ref="spuPreviewRef">
              <div class="thumb-swiper-wrapper">
                <swiper
                    class="thumb-swiper"
                    :modules="modules"
                    @swiper="setThumbsSwiper"
                    slides-per-view="auto"
                    :breakpoints="{
                      0: {
                        direction: 'horizontal',
                        spaceBetween: 10
                      },
                      1261: {
                        direction: 'vertical',
                        autoHeight: true,
                        spaceBetween: 17
                      }
                    }"
                >
                  <swiper-slide>
                    <img class="cursor-pointer w-full h-full fit-contain aspect-ratio" :src="imagePrefix(goodsDetail?.img)" style="user-select: none;"
                         alt=""/>
                  </swiper-slide>
                  <swiper-slide
                      v-for="(banner, index) in banners"
                      :key="index"
                  >
                    <img
                        class="cursor-pointer w-full h-full fit-contain aspect-ratio"
                        :src="imagePrefix(banner)" style="user-select: none;"
                        alt=""
                    />
                  </swiper-slide>
                </swiper>
              </div>
              <div class="main-swiper-wrapper" id="tour-step-preview">
                <swiper
                    class="main-swiper"
                    :modules="modules"
                    :navigation="true"
                    :thumbs="{ swiper: thumbsSwiper }"
                    :loop="false"
                    @slideChange="onSlideChange"
                    @swiper="onSwiper"
                >
                  <swiper-slide>
                    <ClientOnly>
                      <div class="acea-row row-center-wrapper w-full h-full bg-gray-100">
                        <ImageGenerator
                            v-if="goodsDetail.id"
                            v-model="generatorImg"
                            v-model:squareImage="squareImageUrl"
                            v-model:pixel="pixel"
                            @change="handleImageChange"
                            v-bind="imageGeneratorProps"
                        />
                      </div>
                    </ClientOnly>
                  </swiper-slide>
                  <swiper-slide
                      v-for="(banner, index) in banners"
                      :key="index"
                  >
                    <img
                        class="w-full h-full fit-cover"
                        :src="imagePrefix(banner)" alt="banner"
                        style="user-select: none"
                    />
                  </swiper-slide>
                </swiper>
                <ToolFloatBall :actions="tools" :z-index="2" :position="{ bottom: appStore.isPc ? '24px' : '12px', right: appStore.isPc ? '24px' : '12px' }" />
              </div>
            </div>
          </div>
        </div>
        <!--规格选择栅格-->
        <div class="col-md-6">
          <div class="spu-spec">
            <ComboSkeleton :loading="loadingCombo && !firstLoadCombo">
              <div>
                <div class="acea-row row-between-wrapper mb-15 gap-column-base">
                  <h1 class="text-22 flex-1 line2" style="line-height: 1.5">
                    <span class="text-uppercase">{{ goodsDetail.title }}</span>
                    <span>: Hand-painted Oil Painting Reproduction</span>
                  </h1>
                  <SvgIcon
                      :name="isThumbs ? 'follow-fill' : 'follow'"
                      class="text-40 mr-10 cursor-pointer" :class="{'text-error': isThumbs}"
                      @click.prevent.stop="productThumbs()"
                  />
                </div>

                <NuxtLink class="my-15 text-14 cursor-pointer text-underline-hover" :to="handleClickArtist(goodsDetail?.creator!)">by: {{ goodsDetail?.creator?.name }}</NuxtLink>

                <div class="my-15 acea-row row-middle price-wrapper py-10"
                     :style="{ top: 'var(--header-height)' }">
                  <span class="text-28 f-bold mr-10">{{ formatToCurrency(totalPrice || 0) }}</span>
                  <!--<el-tag class="cursor-pointer" type="primary" round effect="dark" v-click-outside="onClickOutside"-->
                  <!--        ref="checkButtonRef">-->
                  <!--  Check-->
                  <!--</el-tag>-->
                  <img class="p-img cursor-pointer" src="~/assets/images/hand-painted.png" alt="hand-painted" v-click-outside="onClickOutside" ref="checkButtonRef">
                </div>

                <p class="text-14 text-gray-400 my-15">
                  All framing includes free canvas stretching, mounting & wall hooks.Your framed oil painting will
                  arrive to your door ready to hang on your wall.
                </p>

                <hr>

                <!--工艺/规格选择-->
                <CraftSelector
                    v-if="specsCombination.length > 1"
                    tourId="tour-step-craft"
                    v-model="currentSpecId"
                    :options="specsCombination"
                    :option="currentSpecOption"
                    label-key="craft"
                    value-key="id"
                    @change="back2First(chooseTechnique, $event)"
                />

                <!--尺寸选择-->
                <SizeSelector
                    tourId="tour-step-size"
                    v-model="currentSizeId"
                    :options="sizeOptions"
                    :sizeOption="currentSizeOption"
                    @change="back2First(chooseSize, $event)"
                />

                <!--画框选择-->
                <FrameSelector
                    tourId="tour-step-frame"
                    v-model="currentFrameId"
                    :options="frameOptions"
                    :sizeOption="currentFrameOption"
                    :price="frameMoney || 0"
                    @change="back2First(chooseFrame, $event)"
                />

                <!--卡纸选择（选择画框并且画框支持和有卡纸选项才有）-->
                <MatSelector
                    v-if="hasFrame && matVisible"
                    tourId="tour-step-mat"
                    v-model:matId="currentMaterialId"
                    v-model:matWidth="currentMaterialWidth"
                    :options="materialOptions"
                    :material-option="currentMaterialOption"
                    @change="slideTo(0)"
                />

                <hr>

                <div class="my-15 text-14">
                  <p>Product Parameter: </p>
                  <p class="mt-10" v-for="(val, key) in specs">{{ key }}: {{ val }}</p>
                </div>

                <hr>

                <div class="text-14 text-gray-400 my-15">
                  All framing includes free canvas stretching, mounting & wall hooks.Your framed
                  oil painting will arrive to your door ready to hang on your wall.
                </div>

                <div class="my-15 acea-row">
                  <el-button
                      class="add-cart__button rounded-none flex-1"
                      size="large"
                      type="primary"
                      @click="addToCart"
                      :disabled="isBan"
                  >
                    {{ isBan ? 'Sold Out' : 'Add To Cart' }}
                  </el-button>
                  <el-button
                      class="rounded-none flex-1"
                      size="large"
                      plain
                      @click="buyNow"
                      :disabled="isBan"
                  >
                    {{ isBan ? 'Sold Out' : 'Buy Now' }}
                  </el-button>
                </div>
              </div>
            </ComboSkeleton>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--Tabs-->
  <section class="sec-tabs mt-sm-30 mt-20">
    <div class="container">
      <ClientOnly>
        <el-tabs v-model="activeTabs" type="border-card">
          <el-tab-pane label="About the Artist" name="artist">
            <!--创作者-->
            <div class="artist-box acea-row gap-base">
              <div class="avatar" v-if="goodsDetail.creator?.portrait">
                <img class="w-full" :src="imagePrefix(goodsDetail.creator?.portrait)" alt="avatar">
              </div>
              <div class="info flex-1 text-gray-600">
                <p class="text-16 f-bold-500">{{ goodsDetail?.creator?.timeline || '--' }}</p>
                <p class="text-20 f-bold-500 text-gray-700 my-10">{{ goodsDetail?.creator?.name || '' }}</p>
                <!--          <p class="text-16 f-bold-500 my-10">19th-Century</p>-->
                <p class="text-16" style="line-height: 1.25rem">{{ goodsDetail?.creator?.intro || '' }}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="`Comment (${commentTotal})`" name="comment" v-if="hasComment">
            <!-- 客户评价 -->
            <ProList
                ref="proListRef"
                :request-api="_getCommentList"
                :initParam="{productId: route.params.id}"
                :requestSuccess="handleCommentRequestSuccess"
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
                    </div>
                  </div>
                </div>
              </template>
            </ProList>
          </el-tab-pane>
          <el-tab-pane label="Payment & Shipping" name="info">
            <div class="info-list">
              <div class="info-item">
                <h2 class="text-20 f-bold">SECURE PAYMENT</h2>
                <p class="text-14 my-20">Use PayPal to ensure the security of your payments</p>
                <div class="imgs acea-row row-middle gap-column-xs">
                  <img style="height: 40px" src="~/assets/images/payment-methods.png" alt="payment-methods">
                </div>
              </div>
              <div class="info-item mt-20">
                <h2 class="text-20 f-bold">WORLDWIDE FREE SHIPPING</h2>
                <p class="text-14 my-20">Express Delivery</p>
                <div class="imgs acea-row row-middle gap-column-xs">
                  <img style="height: 40px" src="~/assets/images/delivery-methods1.png" alt="UPS">
                  <img style="height: 40px" src="~/assets/images/delivery-methods2.png" alt="FedEx">
                  <img style="height: 40px" src="~/assets/images/delivery-methods4.png" alt="DHL">
                </div>
                <div class="mt-20" style="line-height: 1.7">
                  <p>- Worldwide free shipping via premium carriers (FedEx, DHL, UPS)</p>
                  <p>- Express delivery transit time: typically 5–10 business days</p>
                  <p>- Total turnaround (Order to Door): approx. 2–4 weeks, including 5–10 days production time</p>
                </div>
              </div>
              <div class="info-item mt-20">
                <h2 class="text-20 f-bold">GUARANTEE</h2>
                <p class="text-14 my-20">100% Satisfaction</p>
                <div class="imgs acea-row row-middle gap-column-xs">
                  <img style="width: 84px" src="~/assets/images/satisfactionb.png" alt="satisfactionb">
                </div>
                <div class="mt-20" style="line-height: 1.7">
                  <p>- 30-day return policy upon receipt for any unused items</p>
                  <p>- Preview Before Shipping: Approve high-res photos of your art before dispatch</p>
                  <p>- Damage protection: Immediate free replacement for any shipping issues</p>
                  <p>- Museum quality: 100% hand-painted by artists with 20–30 years of experience</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </ClientOnly>
    </div>
  </section>

  <!--产品详情-->
  <section class="sec-desc" :class="{ open: isOpenDesc }" v-if="goodsDetail?.details?.length">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-md border-gray-700 mb-20">Product Description</h1>
      <div class="img-box">
        <div v-for="item in goodsDetail.details" :key="item">
          <ClientOnly v-if="!item.includes('/')">
            <div class="youtube-cover" v-if="!playYoutube">
              <img :src="`https://img.youtube.com/vi/${item}/maxresdefault.jpg`" alt="">
              <svg @click="playYoutube = true" t="1764235842389" class="icon cursor-pointer" viewBox="0 0 1024 1024"
                   version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2875" width="80" height="80">
                <path
                    d="M1013.76 307.264s-9.984-70.570667-40.704-101.632c-38.933333-40.789333-82.56-41.002667-102.592-43.392C727.168 151.893333 512.213333 151.893333 512.213333 151.893333h-0.426666s-214.954667 0-358.250667 10.346667c-20.010667 2.389333-63.658667 2.602667-102.613333 43.392C20.245333 236.693333 10.24 307.264 10.24 307.264S0 390.122667 0 473.002667v77.674666c0 82.858667 10.24 165.738667 10.24 165.738667s9.984 70.570667 40.704 101.632c38.933333 40.789333 90.112 39.509333 112.896 43.776 81.92 7.850667 348.16 10.282667 348.16 10.282667s215.168-0.32 358.464-10.666667c20.010667-2.410667 63.658667-2.602667 102.613333-43.392 30.698667-31.061333 40.704-101.632 40.704-101.632S1024 633.536 1024 550.677333v-77.674666c0-82.88-10.24-165.738667-10.24-165.738667z"
                    fill="#DC2217" p-id="2876"></path>
                <path d="M406.293333 644.821333l-0.064-287.722666 276.693334 144.362666-276.629334 143.36z"
                      fill="#FFFFFF" p-id="2877"></path>
              </svg>
            </div>
            <iframe
                v-else
                width="100%"
                height="562"
                type="text/html"
                :src="youtubeProxyPrefix(item)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
          </ClientOnly>
          <img v-else class="w-full" :src="imagePrefix(item)" alt="">
        </div>
      </div>
      <div class="btn-box">
        <el-button class="w-full mt-20" plain size="large" @click="isOpenDesc = !isOpenDesc">
          {{ isOpenDesc ? 'Hide Product Details' : 'View More Product Details' }}
          <SvgIcon :name="isOpenDesc ? 'up' : 'down'" class="ml-20" />
        </el-button>
      </div>
    </div>
  </section>

  <!-- 质量介绍-->
  <section class="">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-md border-gray-700 mb-20">Commitment to Quality</h1>
      <div class="quality-list row gap-row-base" v-if="appStore.isPc">
        <div class="col-6" v-for="item in QUALITY_LIST" :key="item.desc">
          <div class="quality-item">
            <div class="p-img">
              <img class="w-full" :src="imagePrefix(item.img)" alt="quality">
            </div>
            <div class="p-info flex-1 p-lg-25 p-15">
              <p class="text-22 f-bold p1" v-html="item.title"/>
              <p class="text-16 mt-22 p2">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <ClientOnly v-else>
        <swiper
            :modules="modules"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
            slides-per-view="auto"
            :space-between="15"
            :centered-slides="true"
            :loop="true"
            class="quality-list"
        >
          <swiper-slide v-for="item in QUALITY_LIST" :key="item.desc" style="width: 80%;">
            <div class="quality-item">
              <div class="p-img">
                <img class="w-full" :src="imagePrefix(item.img)" alt="quality">
              </div>
              <div class="p-info flex-1 p-lg-25 p-15">
                <p class="text-22 f-bold p1" v-html="item.title"/>
                <p class="text-16 mt-22 p2">{{ item.desc }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </ClientOnly>
    </div>
  </section>

  <!-- 相关推荐-->
  <section class="" v-if="relatedList.length">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-md border-gray-700 mb-20">Product Related</h1>
      <ClientOnly>
        <div class="recommend-swiper">
          <swiper
              :modules="modules"
              :navigation="{ nextEl: '.related-next', prevEl: '.related-prev' }"
              :pagination="{
          el: '.pagination-related',
          type: 'fraction'
         }"
              :autoplay="{ delay: 5000 }"
              :breakpoints="{
          '1680': { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
          '1260': { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
          '768': { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
          '375': { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
        }"
          >
            <swiper-slide v-for="item in relatedList" :key="item.id">
              <NuxtLink class="explore-item block" :to="productLink(item)" target="_blank">
                <div class="img-wrapper aspect-ratio bg-gray-100" :class="{ 'hover-enabled': !!item.sceneImg }">
                  <img class="img-default" :src="imagePrefix(item.framedImg || item.img)" crossorigin="anonymous" :alt="item.title"/>
                  <img class="img-hover" :src="imagePrefix(item.sceneImg)" v-if="item.sceneImg" crossorigin="anonymous" :alt="item.title"/>
                </div>
                <p class="line1 text-14 my-8">{{ item.title }}</p>
                <p>
                  <span class="text-14 f-bold">{{ formatToCurrency(item.retailPrice) }}</span>
                  <span class="text-gray-400 text-through ml-5 text-12" v-if="item.retailPrice !== item.marketPrice">
                    {{ formatToCurrency(item.marketPrice) }}
                  </span>
                </p>
              </NuxtLink>
            </swiper-slide>
          </swiper>
          <div class="recommend-button swiper-button-next related-next"></div>
          <div class="recommend-button swiper-button-prev related-prev"></div>
          <div class="recommend-pagination swiper-pagination pagination-related"></div>
        </div>
      </ClientOnly>
    </div>
  </section>

  <!-- FQ4-->
  <section>
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-md border-gray-700 mb-20">Frequently Asked Questions</h1>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="subItem in getFaqByQuote('shopping')" :title="subItem.title" :name="subItem.name"
                          :key="subItem.name">
          <template #icon="{ isActive }">
            <p style="margin-left: auto">
              <SvgIcon :name="isActive ? 'reduce' : 'add'" class="text-20 ml-10" />
            </p>
          </template>
          <div class="px-20 py-24" v-html="subItem.content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>

  <!-- 背景墙 -->
  <WallColor :wall-image="generatorImg" ref="wallColorRef" />

  <!-- 房间 -->
  <Room :wall-image="generatorImg" ref="roomRef" :pixel="pixel" v-if="generatorImg && reReckon" />

  <!--  图片查看器 -->
  <el-image-viewer
      v-if="imgViewVisible"
      :url-list="urlList"
      @close="toggleImageViewer"
      hide-on-click-modal
      :initial-index="urlListIndex"
      @switch="handleSwitch"
  >
    <template #toolbar="{ actions, prev, next }">
      <el-icon @click="prev">
        <Back/>
      </el-icon>
      <span class="text-white custom-progress">
        {{ urlListIndex + 1 }} / {{ urlList.length }}
      </span>
      <el-icon @click="next">
        <Right/>
      </el-icon>
      <el-icon @click="actions('zoomOut')">
        <ZoomOut/>
      </el-icon>
      <el-icon @click="actions('zoomIn')">
        <ZoomIn/>
      </el-icon>
    </template>
  </el-image-viewer>

  <!--价格详情弹窗-->
  <el-popover
      ref="checkPopoverRef"
      trigger="click"
      :width="appStore.isPc ? '50vw' : '100vw'"
      placement="bottom"
      title="Price Details"
      :virtual-ref="checkButtonRef"
      :popper-style="{ padding: '20px', 'padding-bottom': '10px'}"
      virtual-triggering
  >
    <div class="acea-row row-between-wrapper text-gray-700 mb-10 py-20">
      <span class="f-bold text-18 flex-1 line1 mr-10">Painting Size Price</span>
      <span class="text-14">{{ formatToCurrency(currentSizeOption?.price || 0) }}</span>
    </div>
    <div class="acea-row row-between-wrapper text-gray-700 py-20 mb-10">
      <span class="f-bold text-18 flex-1 line1 mr-10">Frame Price</span>
      <span class="text-14">{{ formatToCurrency(frameMoney || 0) }}</span>
    </div>
    <div class="acea-row row-between-wrapper text-gray-700 mb-10 py-20" v-if="hasFrame && !!currentMaterialId">
      <span class="f-bold text-18 flex-1 line1 mr-10">Canvas material Price</span>
      <span class="text-14">{{ formatToCurrency(currentMaterialOption?.price || 0) }}</span>
    </div>
  </el-popover>

  <LoginWindow ref="loginWindowRef"/>

  <!--引导-->
  <el-tour v-model="openTour" @close="handleTouchClose" :target-area-clickable="false">
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
    <el-tour-step
        v-for="(step, index) in tourSteps"
        :key="index"
        v-bind="step"
    />
  </el-tour>

  <!--底部预览-->
  <transition name="slide-up">
    <div class="footer-preview acea-row row-middle rounded-md border-sm border-gray-200" v-show="!appStore.isPc && isShowFooterPreview">
      <div class="footer-preview-img" @click="toggleImageViewer('core')">
        <img class="w-full h-full fit-contain" :src="generatorImg" alt="">
      </div>
      <div class="footer-preview-text f-bold" @click="toggleImageViewer('core')">VIEW PREVIEW</div>
      <div class="footer-preview-right" @click="openRoom">
        <SvgIcon name="pictures" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import type SwiperClass from 'swiper'
import {Autoplay, Navigation, Pagination, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {getRelatedRecommendApi} from "~/api/modules/product/product";
import type {IProduct} from "~/api/interface/product/product";
import WallColor from '~/components/WallColor.vue'
import Room from '~/components/Room.vue'
import {debounce, youtubeProxyPrefix, productLink} from "~/utils";
import {useCartStore} from '~/stores/modules/cart'
import type {IShopping} from "~/api/interface/shopping/shopping";
import {ElMessage, type ElPopover} from "element-plus";
import {getIsThumbsApi, productThumbsApi} from "~/api/modules/likes/likes";
import {useAppStore} from "~/stores/modules/app";
import {gen_path_obj} from "~/utils/product";
import LoginWindow from "~/components/LoginWindow.vue";
import {useUserStore} from "~/stores/modules/user";
import {APP_HAS_SEEN_PAINT_GUIDE, COLLECTIONS_URL} from "~/config";
import {getFaqByQuote} from "~/config/faq";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {packQuery} from "~/composables/useQueryShort";
import {useCustomProductJsonLd} from "~/composables/useCustomProductJsonLd";
import type {IMessage} from "~/api/interface/message/message";
import {getCommentList} from "~/api/modules/message/message";
import ProInfinite from "~/components/ProInfinite.vue";
import ProList from "~/components/ProList/index.vue";
import {QUALITY_LIST} from "~/constant";
import SizeSelector from "~/components/Custom/SizeSelector.vue";
import FrameSelector from "~/components/Custom/FrameSelector.vue";
import MatSelector from "~/components/Custom/MatSelector.vue";
import CraftSelector from "~/components/Custom/CraftSelector.vue";
import ComboSkeleton from "~/components/Custom/ComboSkeleton.vue";
import {usePaintCombo} from '~/composables/usePaintCombo'
import {useImage} from "~/composables/useImage";
import {Back, Right, ZoomIn, ZoomOut } from '@element-plus/icons-vue'
import ToolFloatBall from "~/components/ToolFloatBall.vue";
import {useBreadcrumbStore} from "~/stores/modules/breadcrumb";
import type {ObjectNode} from "~/types/global";
import {useLockScroll} from "~/composables/useLockScroll";

defineOptions({
  name: 'PaintDetail'
})

definePageMeta({
  showBreadcrumb: true
})

onMounted(async () => {
  await getCombination() // 获取组合
  await getRelatedRecommend()
  if (userStore.isLogin) {
    await getIsThumbs()
  }
  if (!appStore.isPc) {
    window.addEventListener('scroll', monitorPreview)
  }
  $bus.on('loginSuccess', getIsThumbs)
})

onUnmounted(() => {
  $bus.off('loginSuccess', getIsThumbs)
  if (!appStore.isPc) {
    window.removeEventListener('scroll', monitorPreview)
  }
})

const {imagePrefix} = useImage()
const {$bus} = useNuxtApp()
const userStore = useUserStore()
const appStore = useAppStore()
const cartStore = useCartStore()
const route = useRoute();
const router = useRouter();
const {formatToCurrency, currentCurrency} = useCurrencyStore();
const breadcrumbStore = useBreadcrumbStore()
const origin = useRequestURL().origin

const modules = [Autoplay, Pagination, Navigation, Thumbs]
const thumbsSwiper = ref<SwiperClass>()
const setThumbsSwiper = (swiper: SwiperClass) => thumbsSwiper.value = swiper
const activeName = ref('')
const activeTabs = ref('artist')
const squareImageUrl = ref('') // 1:1图片
const generatorImg = ref('') // 最终图片
const pixel = ref({width: 0, height: 0}) // 最终尺寸
const imgViewVisible = ref(false)

const initShowGuide = () => {
  if (process.server) return;
  if (localStorage.getItem(APP_HAS_SEEN_PAINT_GUIDE) === 'true') return
  beginGuide()
  localStorage.setItem(APP_HAS_SEEN_PAINT_GUIDE, 'true')
}

const {
  loadingCombo, firstLoadCombo,
  sizeOptions, currentSizeId, currentSizeOption,
  frameOptions, currentFrameId, currentFrameOption, isInnerFrame, hasFrame, frameMoney,
  materialOptions, currentMaterialId, currentMaterialOption, currentMaterialWidth, matVisible,
  totalPrice, specs, parts,
  fetchCombination,
  chooseSize,
  chooseFrame,
} = usePaintCombo({
  onGuideInit: initShowGuide,
  getCode: () => currentSpecOption.value!.code!,
  getRatio: () => goodsDetail.value.ratio
})

const reReckon = ref(false) // 重新识别
const handleImageChange = () => {
  reReckon.value = false
  nextTick(() => {
    reReckon.value = true
  })
}

const playYoutube = ref(false)
const isOpenDesc = ref(true) // 是否展开产品详情

// 获取详情
const config = useRuntimeConfig()
const {data: goodsDetail, pending: isSkeleton} = await useAsyncData(
    'goods-detail',
    async () => {
      const {data} = await $fetch<IResultData<IProduct.Row>>(config.public.apiBase + TRADE_MODULE + '/product/detail', {
        method: 'GET',
        params: {
          productId: route.params.id
        },
        headers: {
          'Token': userStore.token || '',
          'X-Currency': currentCurrency
        }
      })
      // if (data.banners && data.banners.length) {
      //   data.banners.shift()
      // }
      return data
    }
)

breadcrumbStore.setBreadcrumbs([{ name: goodsDetail.value?.name }])

const canonicalUrl = `${origin}${route.path}`
const pageTitle = computed(() => `${goodsDetail.value?.title} by ${goodsDetail.value?.creator?.name} Reproduction | Painting Replicas on Canvas`)
const pageDescription = computed(() => {
  const { description = '' } = goodsDetail.value
  if (!description) return ''
  return description.length > 155 ? `${description.substring(0, 155).replace(/\n/g, ' ')}...` : description;
})

useHead({
  title: pageTitle.value,
  meta: [
    ...(pageDescription.value ? [{ name: 'description', content: pageDescription.value }] : []),
    ...(goodsDetail.value?.keywords ? [{ name: 'keywords', content: goodsDetail.value.keywords }] : []),

    { property: 'og:type', content: 'product' },
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:image', content: imagePrefix(goodsDetail.value.img) },
    { property: 'og:url', content: canonicalUrl },
    ...(pageDescription.value ? [{ property: 'og:description', content: pageDescription.value }] : []),

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle.value },
    { name: 'twitter:image', content: `${imagePrefix(goodsDetail.value.img)}` },
    { name: 'twitter:image:alt', content: pageTitle.value },
    ...(pageDescription.value ? [{ property: 'twitter:description', content: pageDescription.value }] : []),
  ],
  link: [
    {rel: 'canonical', href: canonicalUrl},
  ]
})

const {injectProductJsonLd, jsonLd} = useCustomProductJsonLd(goodsDetail.value, {})
injectProductJsonLd()

console.log(' =>', jsonLd.value)

// 选择工艺（只有spec中出现了一个以上的才可以选择工艺）
const specsCombination = computed(() => goodsDetail.value?.specsCombo || []) // 获取Sku
const currentSpecId = ref(route.query.specId || specsCombination.value[0]?.id || '')
const currentSpecOption = computed(() => specsCombination.value.find(item => item.id === currentSpecId.value))
const chooseTechnique = () => {
  getCombination(true)
}

// 下架或者库存不足
const isBan = computed(() => currentSpecOption.value?.status === '1' || parseInt(currentSpecOption.value?.retailStock || '0') < 1)

/**
 * 获取组合
 * @param senior - 开启高级比较
 */
const getCombination = async (senior = false) => {
  await fetchCombination(senior)
}

// 添加购物车
const addToCart = (justAdd = true) => {
  const cartRow: IShopping.ShoppingCartsStorageRow = {
    productId: goodsDetail.value.id, // 商品ID
    techniqueId: goodsDetail.value.techniqueId, // 工艺编号
    title: goodsDetail.value.title, // 商品标题
    deliveryType: goodsDetail.value.deliveryType || '0', // 配送方式
    retailPrice: totalPrice.value, // 商品售价
    redeemPoints: goodsDetail.value.redeemPoints, // 商品积分
    img: goodsDetail.value.img.split('?')[0], // 商品图片
    shopId: goodsDetail.value.merchant?.id, // 商家编号
    specsId: currentSpecId.value, // 商品规格编号
    specs: specs.value, // 商品规格值
    quantity: 1, // 购买数量
    dimensionId: currentSizeId.value, // 尺寸编号
    parts: parts.value, // 商品配件
    selected: true,
    isPriceStale: false
  }
  cartStore.addition(cartRow)
  if (justAdd) {
    ElMessage.success('Add to cart success!')
    $bus.emit('openCartWindow')
  }
}

// 立即购买
const buyNow = () => {
  addToCart(false)
  router.push('/cart')

}

// 价格详情弹窗
const checkButtonRef = ref()
const checkPopoverRef = ref()
const onClickOutside = () => {
  unref(checkPopoverRef).popperRef?.delayHide?.()
}

// 获取相关推荐产品
const relatedList = ref<General.GoodsItem[]>([])
const getRelatedRecommend = async () => {
  const {data} = await getRelatedRecommendApi({
    techniqueId: goodsDetail.value.techniqueId,
    productId: goodsDetail.value.id,
    creatorId: goodsDetail.value.creator.id
  })
  relatedList.value = data
}

// 选择背景墙颜色
const wallColorRef = ref<InstanceType<typeof WallColor>>()
const openWallColor = () => {
  wallColorRef.value?.open()
}

// 选择背景墙颜色
const roomRef = ref<InstanceType<typeof Room>>()
const openRoom = () => {
  roomRef.value?.open()
}

// 是否收藏
const isThumbs = ref(false)
const getIsThumbs = async () => {
  const {data} = await getIsThumbsApi({mediaId: route.params.id, type: '0'})
  isThumbs.value = data
}

// 收藏/取消收藏
const productThumbs = debounce(async () => {
  if (!userStore.isLogin) {
    showLoginWindow()
    return
  }
  await productThumbsApi({mediaId: route.params.id, operate: ~~!isThumbs.value as Dict.ThumbsOperateType})
  isThumbs.value = !isThumbs.value
}, 300)

// 点击艺术家
const handleClickArtist = (creator: ObjectNode.Creator ): string => {
  const q = packQuery({PAGE: 1, SEARCH_TYPE: 'artists'})
  return `${COLLECTIONS_URL}/${creator.slug}?q=${q}`
}

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

// 获取买家秀数据
const _getCommentList = (params: IMessage.CommentQuery) => getCommentList(params)

const hasComment = ref(true) // 刚开始为 true，自动调用组件中的方法。真的没有数据，才会设为 false
const proListRef = ref<InstanceType<typeof ProInfinite>>()
const commentTotal = computed(() => proListRef.value?.pageable?.total || 0)
// 监听请求成功，更新是否显示评论面板
const handleCommentRequestSuccess = () => {
  hasComment.value = commentTotal.value > 0
}

// 查看图片预览
const urlList = ref<string[]>([])
const urlListIndex = ref<number>(0)
const toggleImageViewer = (type?: 'all' | 'core', index?: number) => {
  if (type === 'all') {
    // 在“打开”预览动作发生前，重置 urlListIndex
    if (!imgViewVisible.value) {
      // 如果显式传入了 index 就用传入的，否则默认读取 swiper 当前真实的索引
      urlListIndex.value = index ?? (mainSwiperInstance.value?.activeIndex || 0)
    }
    urlList.value = [generatorImg.value, ...(banners.value.map(i => imagePrefix(i)))]
  } else if (type === 'core') {
    urlList.value = [generatorImg.value]
    urlListIndex.value = 0 // 只有画芯的情况下只展示第0张
  }
  imgViewVisible.value = !imgViewVisible.value
}

const handleSwitch = (index: number) => {
  urlListIndex.value = index
}

const onSlideChange = (swiper: SwiperClass) => {
  urlListIndex.value = swiper.activeIndex
}

const mainSwiperInstance = ref<SwiperClass | null>(null)
const onSwiper = (swiper: SwiperClass) => {
  mainSwiperInstance.value = swiper
}

const slideTo = (index: number) => {
  if (urlListIndex.value === index) return
  mainSwiperInstance.value.slideTo(index)
}

/**
 * @param handle 需要执行的函数
 * @param args 需要传给 handle 的参数（支持多个）
 */
const back2First = <T extends (...args: any[]) => any>(
    handle: T,
    ...args: Parameters<T>
): ReturnType<T> => {

  // 1. 立即执行原函数并传入参数
  const result = handle(...args);

  // 2. 触发副作用
  nextTick(() => {
    slideTo(0);
  });

  return result;
};

const openTour = ref(false)
const beginGuide = async () => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  })
  openTour.value = true
}
const handleTouchClose = () => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  })
}
// 参数顺序：[显示条件, 目标Ref, 标题, 描述, 额外配置(可选)]
const createStep = (condition: boolean, target: any, title: string, description: string, extras: Record<string, any> = {}) => {
  if (!condition) return null
  // 自动组装对象
  return {target, title, description, ...extras}
}
const tourSteps = computed(() => {
  const steps = [
    createStep(true, '#tour-step-preview', 'Preview Artwork', 'Get a first look at your core image to ensure it’s exactly how you envision before customizing the details.'),
    createStep(specsCombination.value.length > 1, '#tour-step-craft', 'Choose Craftsmanship', 'Select the material and texture that best suits your style.'),
    createStep(true, '#tour-step-size', 'Choose Size', 'Pick the perfect dimensions to fit your space.'),
    createStep(true, '#tour-step-frame', 'Choose Frame', 'Complete the look with one of our premium frames.'),
    createStep(hasFrame.value && matVisible.value, '#tour-step-mat', 'Mat Customization', 'Select the color and width of your mat to enhance your artwork’s visual balance. A carefully chosen mat frames the image, adds depth, and creates harmony between the artwork and the frame.'),
  ]
  return steps.filter(Boolean)
})

// 集中管理 ImageGenerator 的所有 props
const imageGeneratorProps = computed(() => {
  return {
    shape: goodsDetail.value.shape,
    coreImage: imagePrefix(goodsDetail.value.img),
    hasMat: hasFrame.value && matVisible.value && !!currentMaterialId.value,
    matThickness: currentMaterialWidth.value.toString(),
    matColor: currentMaterialOption.value?.config?.matColor || '',
    hasFrame: hasFrame.value,
    innerFrame: isInnerFrame.value,
    embeddedFrame: !currentFrameOption.value?.config?.matSupport,
    frameCm: currentFrameOption.value?.config?.thickness,
    sizeCm: {
      width: Number(currentSizeOption.value?.widthInCm || 0),
      length: Number(currentSizeOption.value?.lengthInCm || 0),
    },
    frameCornerImages: [
      imagePrefix(currentFrameOption.value?.config?.lt || ''),
      imagePrefix(currentFrameOption.value?.config?.rt || ''),
      imagePrefix(currentFrameOption.value?.config?.lb || ''),
      imagePrefix(currentFrameOption.value?.config?.rb || ''),
    ],
    frameSideImages: [
      imagePrefix(currentFrameOption.value?.config?.ct || ''),
      imagePrefix(currentFrameOption.value?.config?.cb || ''),
      imagePrefix(currentFrameOption.value?.config?.cl || ''),
      imagePrefix(currentFrameOption.value?.config?.cr || ''),
    ]
  }
})

// 显示移动端底部预览
const isShowFooterPreview = ref(false)
const spuPreviewRef = ref<HTMLElement | null>(null)
const monitorPreview = () => {
  const spuEl = spuPreviewRef.value
  if (!spuEl) return

  const footEl = document.getElementById('foot-mobile')

  const spuRect = spuEl.getBoundingClientRect()

  const root = document.documentElement
  const cssValue = getComputedStyle(root).getPropertyValue('--header-height').trim()
  const headerOffset = parseInt(cssValue, 10) || 0


  // 条件 1: SPU 预览图底部是否已经滚出 Header 底部
  const isSpuPastHeader = spuRect.bottom <= headerOffset

  // 条件 2: 底部导航是否不在视口内
  let isFootNotVisible = true
  if (footEl) {
    const footRect = footEl.getBoundingClientRect()
    // 只要底部导航的顶部进入了视口高度，就判定为可见
    isFootNotVisible = footRect.top > window.innerHeight
  }

  // SPU 滚上去了 且 底部导航还没露头
  isShowFooterPreview.value = isSpuPastHeader && isFootNotVisible
}

const tools = [
  { name: 'guide', label: 'Guide', icon: 'help', handler: () => beginGuide() },
  { name: 'preview', label: 'Preview', icon: 'quanping', handler: () => toggleImageViewer('all') },
  { name: 'wallColor', label: 'WallColor', icon: 'user-defined', handler: () => openWallColor() },
  { name: 'room', label: 'Room', icon: 'pictures', handler: () => openRoom() },
]

const banners = computed(() => {
  const tailImage = ['/static/artdafen/brand-advantages.webp', '/static/artdafen/framing-options.webp']
  const imgs = goodsDetail.value?.banners ?? []
  return [...imgs, ...tailImage]
})

useLockScroll(openTour) // 监听状态变化锁定滚动
</script>

<style scoped lang="scss">
  .footer-preview {
    position: fixed;
    bottom: 16px;
    left: 16px;
    right: 16px;
    z-index: 100;
    background: #fff;
    color: var(--color-primary);
    padding: 8px;

    .footer-preview-img {
      padding: 3px;
      width: 54px;
      height: 54px;
      background: var(--color-gray-100);
    }

    .footer-preview-text {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }

    .footer-preview-right {
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: var(--color-text-primary);
      color: var(--color-bg-primary);
      border-radius: 50%;

      .iconify {
        font-size: 20px;
      }
    }

  }

  /* 进场和离场过程中的动画过渡属性 */
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.3s ease-out; /* 0.3秒的平滑过渡 */
  }

  /* 进场的初始状态 和 离场的最终状态 */
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%); /* 移动到自身高度的下方 (屏幕外部) */
    opacity: 0; /* 如果你想要透明度渐变也可以加上，不需要可以删掉 */
  }

  .spu-wrapper {
    --gutter: var(--gutter-md);

    .spu-preview {
      display: flex;
      justify-content: space-between;
      gap: var(--gutter-base);

      .thumb-swiper-wrapper {
        width: 64px;
        flex-shrink: 0;
        flex-wrap: unset;

        .thumb-swiper {
          width: 100%;
          height: 100%;
          padding-bottom: 20px;

          .swiper-slide {
            position: relative;

            &::after {
              content: '';
              width: 100%;
              height: 2px;
              background: transparent;
              position: absolute;
              left: 0;
              bottom: -10px;
              transition: background-color 0.38s ease;
            }

            &.swiper-slide-thumb-active {
              &::after {
                background: var(--color-primary);
              }
            }

          }
        }

      }

      .main-swiper-wrapper {
        position: relative;
        width: 86.48%;
        aspect-ratio: 1 / 1;

        .main-swiper {
          width: 100%;
          height: 100%;

          :deep(.swiper-button-prev),
          :deep(.swiper-button-next) {
            width: 50%;
            top: 0;
            height: 100%;
            margin-top: 0;

            &::after {
              content: '';
            }

            &.swiper-button-disabled {
              pointer-events: unset;
            }
          }

          :deep(.swiper-button-prev) {
            left: 0;
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='48' height='48'%3E%3Ccircle cx='512' cy='512' r='512' fill='%23FFFFFF'/%3E%3Cpath transform='translate(256,256) scale(0.5)' d='M623.5 718.5c14.1 14.1 14.1 36.9 0 50.9-7 7-16.2 10.5-25.5 10.5s-18.4-3.5-25.5-10.5L340.6 537.5c-14.1-14.1-14.1-36.9 0-50.9l232-232c14.1-14.1 36.9-14.1 50.9 0 14.1 14.1 14.1 36.9 0 50.9L416.9 512l206.6 206.5z' fill='%23333333'/%3E%3C/svg%3E") 16 16, pointer;
          }

          :deep(.swiper-button-next) {
            right: 0;
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='48' height='48'%3E%3Ccircle cx='512' cy='512' r='512' fill='%23FFFFFF'/%3E%3Cpath transform='translate(256,256) scale(0.5)' d='M400.5 305.5c-14.1-14.1-14.1-36.9 0-50.9 14.1-14.1 36.9-14.1 50.9 0l232 231.9c14.1 14.1 14.1 36.9 0 50.9l-231.9 232c-7 7-16.2 10.5-25.5 10.5s-18.4-3.5-25.5-10.5c-14.1-14.1-14.1-36.9 0-50.9L607.1 512z' fill='%23333333'/%3E%3C/svg%3E") 16 16, pointer;
          }
        }

      }

    }

    .spu-spec {
      .price-wrapper {
        background: #fff;
        position: sticky;
        z-index: 10;

        .p-img {
          height: 30px;
        }
      }
    }
  }

  .recommend-swiper {
    position: relative;

    .swiper {
      padding-bottom: 105px;
    }

    .recommend-pagination {
      color: var(--color-gray-600);
      font-size: 30px;
      bottom: 30px;

      :deep(.swiper-pagination-current) {
        color: var(--color-gray-700)
      }
    }

    :deep(.swiper-pagination-lock) {
      display: block !important;
    }

    .recommend-button {
      --swiper-navigation-color: var(--color-primary);
      top: unset;
      bottom: 30px;
      width: 45px;
      height: 45px;
      z-index: 11;
      text-align: center;

      &::after {
        font-size: 18px;
        line-height: 45px;
      }

      &.swiper-button-prev {
        left: 40%;
      }

      &.swiper-button-next {
        right: 40%;
      }
    }

    .explore-item {
      .img-wrapper {
        position: relative;

        img {
          max-width: 95%;
          max-height: 95%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.38s ease-in-out;
        }

        .img-default {
          opacity: 1;
        }

        .img-hover {
          opacity: 0;
        }

        &.hover-enabled:hover {
          .img-hover {
            opacity: 1;
          }
          .img-default {
            opacity: 0;
          }
        }
      }
    }
  }

  .artist-box .avatar {
    min-width: 100px;
    width: 13.15%;
  }

  .sec-desc {
    .img-box {
      max-width: 1000px;
      max-height: 562px;
      overflow: hidden;
      margin: 0 auto;

      .youtube-cover {
        position: relative;
        min-height: 200px;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .btn-box {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;

      &::after {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 100%;
        height: 160px;
        background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
        content: "";
      }
    }

    &.open {
      .img-box {
        max-height: unset;
      }

      .btn-box::after {
        display: none;
      }
    }
  }

  .quality-list {
    .quality-item {
      background: var(--color-gray-100);
      height: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .p-img {
        width: 57.8%;
      }

      .p-info {
        .p1 {
          position: relative;

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 5.46vw;
            height: 3px;
            background: #8c3030;
          }
        }

        .p2 {
          line-height: 1.6;
        }
      }
    }

  }

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

  :deep(.swiper-pagination-lock),
  :deep(.swiper-button-lock) {
    display: flex !important;
  }

  @media (max-width: 1260px) {
    .spu-wrapper {
      .spu-preview {

        flex-direction: column;

        .thumb-swiper-wrapper {
          order: 2;
          width: 100%;
          margin-bottom: 15px;

          .thumb-swiper {
            box-sizing: content-box;
            padding-bottom: 10px;

            .swiper-slide {
              width: 64px;

              &::after {
                height: 2px;
                left: 0;
                bottom: -6px;
              }
            }
          }
        }

        .main-swiper-wrapper {
          width: 100%;
        }
      }
    }

    .recommend-swiper {

      .swiper {
        padding-bottom: 80px;
      }

      .recommend-pagination {
        font-size: 15px;
      }

      .recommend-button {
        width: 22px;
        height: 22px;

        &::after {
          font-size: 10px;
          line-height: 22px;
        }

        &.swiper-button-prev {
          left: 20%;
        }

        &.swiper-button-next {
          right: 20%;
        }
      }
    }

    .reviews-list {
      column-count: 3; /* 列数 */
      column-gap: 20px; /* 列间距 */

      .reviews-item {
        margin-bottom: 20px; /* 项目间距 */
      }
    }

  }

  @media (max-width: 991px) {
    .spu-wrapper {
      --gutter: var(--gutter-base);

      .spu-preview .main-swiper-wrapper {

        .main-swiper {
          :deep(.swiper-button-prev),
          :deep(.swiper-button-next) {
            display: none;
          }
        }
      }
    }

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

    .quality-list {
      .quality-item {
        display: block;


        .p-img {
          width: 100%;
        }

        .p-info {
          width: 100%;


          .p1 {

            &::after {
              bottom: -8px;
              width: 50px;
              height: 2px;
            }

            :deep(br) {
              display: none;
            }
          }
        }
      }

    }
  }

  @media (max-width: 768px) {
    .sec-desc {
      .img-box {

        .youtube-cover {
          min-height: unset;

          svg {
            width: 50px;
          }
        }

        iframe {
          height: 450px;
        }
      }
    }
  }

  @media (max-width: 414px) {
    .sec-desc {
      .img-box {

        iframe {
          height: 300px;
        }
      }
    }
  }
</style>

<style>
  .custom-progress {
    font-size: 16px;
    user-select: none;
    white-space: nowrap
  }

  .el-image-viewer__mask {
    background-color: #fff !important;
    opacity: 1;
  }
  @media (max-width: 768px) {
    .el-image-viewer__wrapper .el-image-viewer__prev,
    .el-image-viewer__wrapper .el-image-viewer__next {
      display: none !important;
    }

    .custom-progress {
      font-size: 14px;
    }
  }
</style>