<template>
  <!--移动端功能区域-->
  <div
      ref="functionalRef"
      class="functional-area"
      v-if="!appStore.isPc"
      :style="{
      top: functionalTop + 'px',
      transition: enableTransition ? 'top 0.25s cubic-bezier(.25,.8,.25,1)' : 'none'
    }"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      @click.stop
  >
    <span class="iconfont icon-user-defined" @click="openWallColor"></span>
    <span class="split"></span>
    <span class="iconfont icon-pictures" @click="openRoom"></span>
    <span class="split"></span>
    <span class="iconfont icon-quanping" @click="toggleImageViewer"></span>
    <span class="split"></span>
    <span class="iconfont icon-help" @click="beginGuide"></span>
  </div>

  <!--规格选择-->
  <section>
    <div class="container">
      <!--移动端兼容视图-->
      <div class="app-preview"
           :style="{margin: '0 -15px', height: '300px', position: appSticky ? 'sticky' : 'relative' }"
           v-if="!appStore.isPc">
        <div class="img-wrapper acea-row row-center-wrapper flex-1 overflow-hidden">
          <ClientOnly>
            <ImageGenerator
                v-if="goodsDetail.id"
                v-model="generatorImg"
                v-model:squareImage="squareImageUrl"
                v-model:pixel="pixel"
                @change="handleImageChange"
                @touch-screen="toggleImageViewer"
                v-bind="imageGeneratorProps"
            />
          </ClientOnly>
        </div>
      </div>
      <!-- 移动端兼容标题 -->
      <div class="app-title pt-20 acea-row row-between-wrapper" v-if="!appStore.isPc">
        <p style="font-size: 20px;" class="f-bold-500 flex-1 mr-10">{{ goodsDetail.title }}</p>
        <span class="iconfont icon-follow text-40 mr-10 cursor-pointer" v-show="!isThumbs" @click="productThumbs"/>
        <span class="iconfont icon-follow-fill text-40 mr-10 cursor-pointer text-error" v-show="isThumbs"
              @click="productThumbs"/>
      </div>

      <div class="spu-wrapper row pt-md-50 pt-20">
        <!--预览图栅格-->
        <div class="col-sm-7" v-if="appStore.isPc">
          <!--预览图-->
          <div class="spu-preview border-sm">
            <div class="p-md-20 p-15 border-b-sm">
              <p class="text-22 f-bold-500">{{ goodsDetail.title }}</p>
            </div>
            <div class="acea-row row-between-wrapper p-md-20 p-15">
              <div>
                <p class="text-22 f-bold-500 cursor-pointer text-underline" @click="handleClickArtist">
                  by:{{ goodsDetail.creator?.name }}</p>
                <p class="text-18 text-gray-600 mt-10">
                  <span v-if="goodsDetail.techniqueId === TechniqueCodeEnum.Painting">Hand-painted replica</span>
                  <span v-if="goodsDetail.techniqueId === TechniqueCodeEnum.Prints">Print painting</span>
                  <span v-if="goodsDetail.techniqueId === TechniqueCodeEnum.Relief">Relief painting</span>
                </p>
              </div>
              <div>
                  <span class="iconfont icon-follow text-40 mr-10 cursor-pointer" v-show="!isThumbs"
                        @click="productThumbs"/>
                <span class="iconfont icon-follow-fill text-40 mr-10 cursor-pointer text-error" v-show="isThumbs"
                      @click="productThumbs"/>
                <span class="iconfont icon-quanping text-40 cursor-pointer" @click="toggleImageViewer"></span>
              </div>
            </div>
            <div class="preview-box">
              <ClientOnly>
                <ImageGenerator
                    v-if="goodsDetail.id"
                    v-model="generatorImg"
                    v-model:squareImage="squareImageUrl"
                    v-model:pixel="pixel"
                    @change="handleImageChange"
                    @touch-screen="toggleImageViewer"
                    v-bind="imageGeneratorProps"
                />
              </ClientOnly>
            </div>
            <div class="acea-row row-evenly py-20">
              <div class="acea-row row-middle cursor-pointer" @click="openWallColor">
                <span class="iconfont icon-user-defined text-20"></span>
                <span class="text-14 ml-10">SELECT WALL COLOR</span>
              </div>
              <div class="acea-row row-middle cursor-pointer" @click="openRoom">
                <span class="iconfont icon-pictures text-20"></span>
                <span class="text-14 ml-10">VIEW PAINTING IN A ROOM</span>
              </div>
              <div class="acea-row row-middle cursor-pointer" @click="beginGuide">
                <span class="iconfont icon-help text-20"></span>
                <span class="text-14 ml-10">GUIDE</span>
              </div>
            </div>
          </div>
        </div>
        <!--规格选择栅格-->
        <div class="col-sm-5">
          <div class="spu-spec border-sm step-wrapper">
            <ComboSkeleton :loading="loadingCombo && !firstLoadCombo">
              <div>
                <!--工艺/规格选择-->
                <CraftSelector
                    v-if="specsCombination.length > 1"
                    tourId="tour-step-craft"
                    v-model="currentSpecId"
                    :options="specsCombination"
                    label-key="craft"
                    value-key="id"
                    @change="chooseTechnique"
                />

                <!--尺寸选择-->
                <SizeSelector
                    tourId="tour-step-size"
                    v-model="currentSizeId"
                    :options="sizeOptions"
                    :sizeOption="currentSizeOption"
                    @change="chooseSize"
                />

                <!--画框选择-->
                <FrameSelector
                    tourId="tour-step-frame"
                    v-model="currentFrameId"
                    :options="frameOptions"
                    :sizeOption="currentFrameOption"
                    @change="chooseFrame"
                    :price="frameMoney || 0"
                />

                <!--卡纸选择（选择画框并且画框支持和有卡纸选项才有）-->
                <MatSelector
                    v-if="hasFrame && matVisible"
                    tourId="tour-step-mat"
                    v-model:matId="currentMaterialId"
                    v-model:matWidth="currentMaterialWidth"
                    :options="materialOptions"
                    :material-option="currentMaterialOption"
                />

                <!--Summary-->
                <!--<div class="acea-row row-middle px-md-20 px-15 py-10">
                  <span class="iconfont icon-info-fill text-20"/>
                  <p class="ml-6 text-20 flex-1 line1">
                    <span class="cursor-pointer text-underline" @click="centerDialogVisible = true">
                      <b class="f-bold">Click here:</b>Summary of differences.
                    </span>
                  </p>
                </div>-->

                <div class="p-md-20 p-15 f-bold-500 text-16 border-t-sm">
                  <p>Product Parameter</p>
                  <p class="mt-10" v-for="(val, key) in specs">{{ key }}: {{ val }}</p>
                </div>
                <div class="border-t-sm p-md-20 p-15 text-16 f-bold-500">
                  All framing includes free canvas stretching, mounting & wall hooks.Your framed
                  oil painting will arrive to your door ready to hang on your wall.
                </div>
                <div class="p-md-20 p-15 acea-row row-between-wrapper text-20 bg-gray-100">
                  <p class="f-bold-500">
                    Price Details
                    <span
                        class="text-underline cursor-pointer"
                        ref="checkButtonRef"
                        v-click-outside="onClickOutside"
                    >Check</span>
                  </p>
                  <p class="f-bold">
                    Total：
                    <span class="text-26 text-error">{{ formatToCurrency(totalPrice || 0) }}</span>
                  </p>
                </div>
                <el-button
                    class="w-full add-cart__button rounded-none"
                    size="large"
                    type="danger"
                    @click="addToCart"
                    :disabled="isBan"
                >
                  {{ isBan ? 'Sold Out' : 'Add To Cart' }}
                </el-button>
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
                <p class="text-18">{{ goodsDetail?.creator?.intro || '' }}</p>
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
                  <p>- Express delivery transit time: typically 5–8 business days</p>
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
          <span class="iconfont ml-20" :class="isOpenDesc ? 'icon-up' : 'icon-down'"></span>
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
                <div class="aspect-ratio">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.title"/>
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

  <!-- 品牌-->
  <section class="" v-if="goodsDetail?.brand?.id">
    <div class="container">
      <div class="brand-topic mb-20">
        <div class="brand-topic-caption text-white text-26">
          <p>{{ goodsDetail?.brand?.name }}</p>
          <p class="text-60 f-bold my-xs-20 my-15">{{ goodsDetail?.brand?.title }}</p>
          <p>{{ goodsDetail?.brand?.intro }}</p>
        </div>
        <button class="caption-btn text-28 p-xs-20 p-15" @click="handleClickBrand">
          Brand Home
          <span class="iconfont icon-right-arrow text-28 ml-xs-60 ml-30"></span>
        </button>
        <img class="w-full pc" :src="imagePrefix(goodsDetail?.brand?.background)" alt="brand">
        <img class="w-full app" :src="imagePrefix(goodsDetail?.brand?.img)" alt="brand">
      </div>
      <ClientOnly>
        <div class="recommend-swiper" v-if="brandRecList.length">
          <swiper
              :modules="modules"
              :navigation="{ nextEl: '.brand-next', prevEl: '.brand-prev' }"
              :pagination="{
                el: '.pagination-brand',
                type: 'fraction'
               }"
              :autoplay="{ delay: 5000 }"
              :breakpoints="{
                '1680': { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
                '1460': { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
                '1260': { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
                '375': { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
              }"
          >
            <swiper-slide v-for="item in brandRecList" :key="item.id">
              <NuxtLink class="explore-item block" :to="productLink(item)" target="_blank">
                <div class="aspect-ratio">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.title"/>
                </div>
                <p class="line1 text-14 my-8">{{ item.title }}</p>
                <p class="text-12 f-bold">{{ item.retailPrice }}</p>
              </NuxtLink>
            </swiper-slide>
          </swiper>
          <div class="recommend-button swiper-button-next brand-next"></div>
          <div class="recommend-button swiper-button-prev brand-prev"></div>
          <div class="recommend-pagination swiper-pagination pagination-brand"></div>
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
            <p style="margin-left:  auto">
              <span class="iconfont text-20 ml-10" :class="isActive ? 'icon-reduce' : 'icon-add'"></span>
            </p>
          </template>
          <div class="px-20 py-24" v-html="subItem.content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="sec-process py-lg-40 py-20 mt-20">
    <div class="container">
      <div class="process-list">
        <div class="process-item text-center" v-for="item in PROCESS_LIST" :key="item.title">
          <span class="iconfont text-60" :class="[item.icon]"/>
          <p class="text-24 mt-20">{{ item.title }}</p>
          <p class="text-20 text-gray-500 mt-10">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <el-dialog v-model="centerDialogVisible" title="Summary of Differences" width="720" center>
    <span>
      It should be noted that the content will not be aligned in center by default
    </span>
    <template #footer>
      <el-button @click="centerDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>
    </template>
  </el-dialog>

  <!-- 背景墙 -->
  <WallColor :wall-image="generatorImg" ref="wallColorRef" @close="toggleWidget(true)"/>

  <!-- 房间 -->
  <Room :wall-image="generatorImg" ref="roomRef" :pixel="pixel" v-if="generatorImg && reReckon"
        @close="toggleWidget(true)"/>

  <!--  图片查看器 -->
  <el-image-viewer
      v-if="imgViewVisible"
      :url-list="[generatorImg]"
      @close="toggleImageViewer"
      hide-on-click-modal
  />

  <!--价格详情弹窗-->
  <el-popover
      ref="checkPopoverRef"
      trigger="click"
      width="50vw"
      placement="top"
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
  <el-tour v-model="openTour" @close="handleTouchClose">
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
    <el-tour-step
        v-for="(step, index) in tourSteps"
        :key="index"
        v-bind="step"
    />
  </el-tour>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, Navigation, Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {getBrandRecommendApi, getRelatedRecommendApi} from "~/api/modules/product/product";
import {getCombinationApi} from "~/api/modules/paint/paint";
import type {IPaint} from "~/api/interface/paint/paint";
import type {IProduct} from "~/api/interface/product/product";
import WallColor from '~/components/WallColor.vue'
import Room from '~/components/Room.vue'
import {cm2inch, debounce, imagePrefix, youtubeProxyPrefix, productLink} from "~/utils";
import {useCartStore} from '~/stores/modules/cart'
import type {IShopping} from "~/api/interface/shopping/shopping";
import {getSpecsListApi} from "~/api/modules/specs/specs";
import type {ISpecs} from "~/api/interface/specs/specs";
import {ElMessage, type ElPopover} from "element-plus";
import {getIsThumbsApi, productThumbsApi} from "~/api/modules/likes/likes";
import {useAppStore} from "~/stores/modules/app";
import {gen_path_obj} from "~/utils/product";
import LoginWindow from "~/components/LoginWindow.vue";
import {useUserStore} from "~/stores/modules/user";
import {CONTACT_EMAIL, PRODUCT_URL, APP_HAS_SEEN_PAINT_GUIDE} from "~/config";
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
import {TechniqueCodeEnum} from "~/types/enumeration";
import {useVerticalDrag} from '~/composables/useVerticalDrag'
import {QUALITY_LIST, PROCESS_LIST} from "~/constant";
import SizeSelector from "~/components/Custom/SizeSelector.vue";
import FrameSelector from "~/components/Custom/FrameSelector.vue";
import MatSelector from "~/components/Custom/MatSelector.vue";
import CraftSelector from "~/components/Custom/CraftSelector.vue";
import ComboSkeleton from "~/components/Custom/ComboSkeleton.vue";
import {usePaintCombo} from '~/composables/usePaintCombo'

defineOptions({
  name: 'PaintDetail'
})

definePageMeta({
  isShowActivity: true
})

onMounted(async () => {
  await getSpecsList() // 获取Spec列表
  await getCombination() // 获取组合
  if (goodsDetail.value.brand?.id) await getBrandRecommend() // 获取品牌推荐
  await getRelatedRecommend()
  if (userStore.isLogin) {
    await getIsThumbs()
  }
  $bus.on('loginSuccess', getIsThumbs)
})

onUnmounted(() => {
  $bus.off('loginSuccess', getIsThumbs)
})

const {$bus} = useNuxtApp()
const userStore = useUserStore()
const appStore = useAppStore()
const cartStore = useCartStore()
const route = useRoute();
const router = useRouter();
const {formatToCurrency, currentCurrency} = useCurrencyStore();

const modules = [Autoplay, Pagination, Navigation]
const activeName = ref('')
const activeTabs = ref('artist')
const squareImageUrl = ref('') // 1:1图片
const generatorImg = ref('') // 最终图片
const pixel = ref({width: 0, height: 0}) // 最终尺寸
const imgViewVisible = ref(false)
const centerDialogVisible = ref(false)
const functionalRef = ref<HTMLElement | null>(null)
const {
  top: functionalTop,
  enableTransition,
  onTouchStart,
  onTouchMove,
  onTouchEnd
} = useVerticalDrag(functionalRef, {initialTop: 100})

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
      return data
    }
)

useHead({
  title: `${goodsDetail.value?.name || ''} - ${config.public?.siteName}`,
})

const {injectProductJsonLd, jsonLd} = useCustomProductJsonLd(goodsDetail.value, {})
injectProductJsonLd()

console.log(' =>', jsonLd.value)

// 获取SKu
const specsCombination = ref<ISpecs.Row[]>([])
const getSpecsList = async () => {
  const {data} = await getSpecsListApi(route.params.id)
  specsCombination.value = data
  currentSpecId.value = route.query.specId as string || data[0]?.id
}

// 选择工艺（只有spec中出现了一个以上的才可以选择工艺）
const currentSpecId = ref('')
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
const addToCart = () => {
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
  ElMessage.success('Add to cart success!')
  $bus.emit('openCartWindow')
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

// 获取品牌推荐产品
const brandRecList = ref<General.GoodsItem[]>([])
const getBrandRecommend = async () => {
  const {data} = await getBrandRecommendApi({
    brandId: goodsDetail.value.brand.id,
    productId: goodsDetail.value.id,
  })
  brandRecList.value = data
}

// 选择背景墙颜色
const wallColorRef = ref<InstanceType<typeof WallColor>>()
const openWallColor = () => {
  toggleWidget(false)
  wallColorRef.value?.open()
}

// 选择背景墙颜色
const roomRef = ref<InstanceType<typeof Room>>()
const openRoom = () => {
  toggleWidget(false)
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
const handleClickArtist = () => {
  router.push({
    path: PRODUCT_URL,
    query: {q: packQuery(gen_path_obj(goodsDetail.value.creator, 'ARTIST', ['name']))}
  })
}

// 点击品牌
const handleClickBrand = () => {
  router.push({
    path: PRODUCT_URL,
    query: {q: packQuery(gen_path_obj(goodsDetail.value.brand, 'BRAND', ['name']))}
  })
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

const toggleImageViewer = () => {
  toggleWidget(imgViewVisible.value)
  imgViewVisible.value = !imgViewVisible.value
}

const toggleWidget = (flag: boolean) => {
  if (import.meta.env.MODE !== 'production') return
  if (flag) {
    window.Tawk_API.showWidget()
  } else {
    window.Tawk_API.hideWidget();
  }
}

const appSticky = ref(true)
const openTour = ref(false)
const beginGuide = async () => {
  if (appStore.isPc) {
    await appStore.forceFoldHeader() // 锁定并折叠，等待动画
  } else {
    appSticky.value = false
  }
  openTour.value = true
  toggleWidget(false)
}
const handleTouchClose = () => {
  if (appStore.isPc) {
    appStore.cancelForceFoldHeader() // 引导结束，恢复自动控制
  } else {
    appSticky.value = true
  }
  toggleWidget(true)
}
// 参数顺序：[显示条件, 目标Ref, 标题, 描述, 额外配置(可选)]
const createStep = (condition: boolean, target: any, title: string, description: string, extras: Record<string, any> = {}) => {
  if (!condition) return null
  // 自动组装对象
  return {target, title, description, ...extras}
}
const tourSteps = computed(() => {
  const steps = [
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
</script>

<style scoped lang="scss">

  /*移动端视图*/
  .app-preview {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 50px;
    background: #fff;
    z-index: 119;

    .btn {
      width: 100%;
      height: 37px;
      background: var(--color-primary);
      color: #fff;
      text-align: center;
      line-height: 37px;
    }
  }

  .spu-wrapper {
    row-gap: var(--gutter-base);

    .spu-preview {
      position: sticky;
      top: 150px;

      .preview-box {
        position: relative;
        width: 100%;
        height: 26vw;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .spu-spec {
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
  }

  .brand-topic {
    position: relative;

    .brand-topic-caption {
      position: absolute;
      z-index: 1;
      left: 60px;
      top: 60px;
    }

    .caption-btn {
      position: absolute;
      z-index: 2;
      border: var(--border-width-sm) solid #fff;
      color: #fff;
      cursor: pointer;
      left: 60px;
      bottom: 60px;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
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

  .sec-process {
    background: #262626;
    color: #fff;

    .process-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: var(--gutter-base);

      .process-item {
        .iconfont {
          color: #b18147;
          font-size: clamp(50px, 5vw, 100px);
        }
      }
    }
  }

  .functional-area {
    position: fixed;
    z-index: 120;
    top: 100px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 5px;
    border-radius: 100px;
    background: var(--color-gray-700);
    color: var(--color-gray-400);
    gap: 10px;
    user-select: none;
    touch-action: none;

    .iconfont {
      font-size: 20px;
    }

    .split {
      width: 10px;
      height: 1px;
      background: var(--color-gray-300);
      transform: scaleY(0.5);
      transform-origin: center; /* 确保缩放后仍然居中 */
    }
  }

  @media (max-width: 1260px) {

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

    .brand-topic {
      .brand-topic-caption {
        left: 30px;
        top: 30px;
      }

      .caption-btn {
        left: 30px;
        bottom: 30px;
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

    .sec-process {
      margin-bottom: -20px;

      .process-list {
        gap: var(--gutter-base) 0;

        .process-item {
          width: 50%;
          flex-shrink: 0;
        }
      }
    }
  }

  @media (max-width: 414px) {
    .brand-topic {
      .brand-topic-caption {
        left: 20px;
        top: 20px;
      }

      .caption-btn {
        left: 20px;
        bottom: 20px;
      }
    }

    .sec-desc {
      .img-box {

        iframe {
          height: 300px;
        }
      }
    }
  }
</style>