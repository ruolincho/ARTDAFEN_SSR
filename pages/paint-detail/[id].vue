<template>
  <!--规格选择-->
  <section>
    <!-- 移动兼容 -->
    <div class="app-preview aspect-ratio" v-if="!appStore.isPc">
      <div class="img-wrapper acea-row row-center-wrapper flex-1 scroll-y">
        <ClientOnly>
          <ImageGenerator
            v-if="goodsDetail.id"
            v-model="generatorImg"
            v-model:pixel="pixel"
            :shape="goodsDetail.shape"
            :core-image="imagePrefix(goodsDetail.img)"
            :has-mat="hasFrame && matVisible && !!currentMaterialId"
            :mat-thickness="currentMaterialWidth.toString()"
            :mat-color="currentMaterialOption?.config?.matColor || ''"
            :has-frame="hasFrame"
            :inner-frame="isInnerFrame"
            :embedded-frame="!currentFrameOption?.config?.matSupport!"
            :frame-cm="currentFrameOption?.config?.thickness!"
            :size-cm="{
                    width: Number(currentSizeOption?.widthInCm!),
                    length: Number(currentSizeOption?.lengthInCm!),
                  }"
            :frame-corner-images="[
                    imagePrefix(currentFrameOption?.config?.lt!),
                    imagePrefix(currentFrameOption?.config?.rt!),
                    imagePrefix(currentFrameOption?.config?.lb!),
                    imagePrefix(currentFrameOption?.config?.rb!),
                  ]"
            :frame-side-images="[
                    imagePrefix(currentFrameOption?.config?.ct!),
                    imagePrefix(currentFrameOption?.config?.cb!),
                    imagePrefix(currentFrameOption?.config?.cl!),
                    imagePrefix(currentFrameOption?.config?.cr!),
                  ]"
            @change="handleImageChange"
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
      </div>
      <div class="btn" @click="imgViewVisible = true">PREVIEW</div>
    </div>
    <div class="app-title px-20 pt-20 acea-row row-between-wrapper" v-if="!appStore.isPc">
      <p style="font-size: 20px;" class="f-bold-500 flex-1 mr-10">{{ goodsDetail.title }}</p>
      <span class="iconfont icon-follow text-40 mr-10 cursor-pointer" v-show="!isThumbs" @click="productThumbs"/>
      <span class="iconfont icon-follow-fill text-40 mr-10 cursor-pointer text-error" v-show="isThumbs"
            @click="productThumbs"/>
    </div>

    <div class="container">
      <div class="spu-wrapper row pt-md-50 pt-20">
        <div class="col-sm-7" v-if="appStore.isPc">
          <el-skeleton :loading="isSkeleton" animated>
            <template #template>
              <el-skeleton-item variant="image" style="width: 100%; height: 34vw"/>
              <div class="acea-row my-10">
                <el-skeleton-item class="mr-10" variant="image" style="width: 4vw; height: 4vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 4vw; height: 4vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 4vw; height: 4vw; "/>
              </div>
              <div>
                <el-skeleton-item variant="h1" style="width: 20%;"/>
              </div>
              <div>
                <el-skeleton-item variant="p" style="width: 30%;"/>
              </div>
              <div>
                <el-skeleton-item variant="p" style="width: 20%;"/>
              </div>
            </template>
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
                    <span v-if="goodsDetail.techniqueId === '3000012'">Hand-painted oil painting</span>
                    <span v-if="goodsDetail.techniqueId === '3000013'">Print painting</span>
                    <span v-if="goodsDetail.techniqueId === '3000014'">Relief painting</span>
                  </p>
                </div>
                <div>
                  <span class="iconfont icon-follow text-40 mr-10 cursor-pointer" v-show="!isThumbs"
                        @click="productThumbs"/>
                  <span class="iconfont icon-follow-fill text-40 mr-10 cursor-pointer text-error" v-show="isThumbs"
                        @click="productThumbs"/>
                  <span class="iconfont icon-quanping text-40 cursor-pointer" @click="imgViewVisible = true"></span>
                </div>
              </div>
              <div class="preview-box">
                <ClientOnly>
                  <ImageGenerator
                    v-if="goodsDetail.id"
                    v-model="generatorImg"
                    v-model:pixel="pixel"
                    :shape="goodsDetail.shape"
                    :core-image="imagePrefix(goodsDetail.img)"
                    :has-mat="hasFrame && matVisible && !!currentMaterialId"
                    :mat-thickness="currentMaterialWidth.toString()"
                    :mat-color="currentMaterialOption?.config?.matColor || ''"
                    :has-frame="hasFrame"
                    :inner-frame="isInnerFrame"
                    :embedded-frame="!currentFrameOption?.config?.matSupport!"
                    :frame-cm="currentFrameOption?.config?.thickness!"
                    :size-cm="{
                    width: Number(currentSizeOption?.widthInCm!),
                    length: Number(currentSizeOption?.lengthInCm!),
                  }"
                    :frame-corner-images="[
                    imagePrefix(currentFrameOption?.config?.lt!),
                    imagePrefix(currentFrameOption?.config?.rt!),
                    imagePrefix(currentFrameOption?.config?.lb!),
                    imagePrefix(currentFrameOption?.config?.rb!),
                  ]"
                    :frame-side-images="[
                    imagePrefix(currentFrameOption?.config?.ct!),
                    imagePrefix(currentFrameOption?.config?.cb!),
                    imagePrefix(currentFrameOption?.config?.cl!),
                    imagePrefix(currentFrameOption?.config?.cr!),
                  ]"
                    @change="handleImageChange"
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
              </div>
            </div>
          </el-skeleton>
        </div>
        <div class="col-sm-5">
          <el-skeleton :loading="isSkeleton" animated>
            <template #template>
              <div>
                <el-skeleton-item variant="h1" style="width: 50%;"/>
              </div>
              <div class="my-10">
                <el-skeleton-item variant="h1" style="width: 20%;"/>
              </div>
              <div class="acea-row my-10">
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item variant="image" style="width: 8vw; height: 8vw; "/>
              </div>
              <div class="my-10">
                <el-skeleton-item variant="h1" style="width: 20%;"/>
              </div>
              <div class="acea-row my-10">
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item class="mr-10" variant="image" style="width: 8vw; height: 8vw; "/>
                <el-skeleton-item variant="image" style="width: 8vw; height: 8vw; "/>
              </div>
              <div class="acea-row row-right my-10">
                <el-skeleton-item variant="p" style="width: 30%;"/>
              </div>
              <div class="my-10">
                <el-skeleton-item variant="p" style="width: 100%; height: 5vh;"/>
              </div>
            </template>
            <div class="spu-spec border-sm">

              <!--工艺/规格选择-->
              <template v-if="specsCombination.length > 1">
                <div class="acea-row row-between-wrapper p-md-20 p-15">
                  <div class="acea-row row-middle flex-1 mr-10">
                    <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                    <span class="text-26">Choose a Craft</span>
                  </div>
                </div>
                <div class="p-md-20 p-15">
                  <div class="width-list row">
                    <div
                      class="col-6"
                      v-for="item in specsCombination"
                      :key="item.id"
                    >
                      <div
                        class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"
                        :class="{'border-gray-700': currentSpecId === item.id}"
                        @click="chooseTechnique(item)"
                      >
                        {{ item.craft }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <!--尺寸选择-->
              <div class="acea-row row-between-wrapper p-md-20 p-15">
                <div class="acea-row row-middle flex-1 mr-10">
                  <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                  <span class="text-26">Choose a Size</span>
                  <span class="text-26 text-gray-400 pc">&nbsp;&nbsp;(inches)</span>
                </div>
                <div class="text-20 f-bold">{{ currencyStore.formatToCurrency(currentSizeOption?.price || 0) }}</div>
              </div>
              <div class="p-md-20 p-15">
                <el-select
                  class="custom-select"
                  v-model="currentSizeId"
                  placeholder="Please Select Size"
                  size="large"
                  @change="chooseSize"
                >
                  <el-option
                    v-for="item in sizeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <div class="option-item acea-row row-between-wrapper">
                      <span>{{ item.name }}</span>
                      <span>{{ currencyStore.formatToCurrency(item.price || 0) }}</span>
                    </div>
                  </el-option>
                  <template #prefix>
                    <div class="size-prefix"></div>
                  </template>
                </el-select>
              </div>
              <div class="px-md-20 px-15 py-10 text-20">
                <span class="iconfont icon-info-fill text-20 mr-6"></span>
                <span class="f-bold">Note:</span>
                To order a custom size, <a :href="`mailto:${CONTACT_EMAIL}`" class="text-underline cursor-pointer">click
                here</a>. Our artists will create a painting in any size you require.
              </div>

              <!--画框选择-->
              <div class="acea-row row-between-wrapper p-md-20 p-15">
                <div class="acea-row row-middle flex-1 mr-10">
                  <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                  <span class="text-26">Choose a Frame</span>
                  <span class="text-26 text-gray-400 pc">&nbsp;&nbsp;(100+ styles)</span>
                </div>
                <div class="text-20 f-bold">{{ currencyStore.formatToCurrency(frameMoney || 0) }}</div>
              </div>
              <div class="p-md-20 p-15">
                <div class="frame-scroll scroll-y border-sm p-10">
                  <div class="frame-list row">
                    <div class="col-2xl-2 col-xl-average col-md-3 col-sm-4 col-xs-3 col-4"
                         v-for="(item, index) in frameOptions" :key="item.id">
                      <div
                        class="frame-item text-14 bg-gray-100 p-5 cursor-pointer"
                        :class="{ on: currentFrameId === item.id }"
                        @click="chooseFrame(item)"
                      >
                        <div class="frame-box">
                          <div class="frame-img aspect-ratio">
                            <img class="w-full h-full fit-cover" :src="imagePrefix(item.img!)" alt="">
                          </div>
                          <p class="line2 mt-10 frame-name">{{ item.name }}</p>
                          <p class="f-bold-500 frame-money">
                            {{ currencyStore.formatToCurrency((Number(item.price) + Number(item.surcharge)) || 0) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--卡纸选择（选择画框并且画框支持和有卡纸选项才有）-->
              <template v-if="hasFrame && matVisible">
                <div class="acea-row row-between-wrapper p-md-20 p-15">
                  <div class="acea-row row-middle flex-1 mr-10">
                    <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                    <span class="text-26">Choose a Canvas material</span>
                  </div>
                  <div class="text-20 f-bold">
                    {{ currencyStore.formatToCurrency(currentMaterialOption?.price || 0) }}
                  </div>
                </div>
                <div class="p-md-20 p-15">
                  <div class="material-wrapper border-sm p-md-20 p-15">
                    <div class="acea-row row-middle text-20 f-bold-500">
                      <p class="mr-xl-40 mr-20">Mat Color</p>
                      <p class="flex-1 line1">Crisp Bright White</p>
                    </div>
                    <div class="color-list my-md-20 my-15">
                      <div
                        class="color-item rounded-full cursor-pointer"
                        :class="{on: currentMaterialId === item.id}"
                        :style="{background: item.config?.matColor}"
                        v-for="(item, index) in materialOptions"
                        :key="index"
                        @click="chooseMatColor(item)"
                      >
                        <span v-if="item.id === ''" class="iconfont icon-close"></span>
                      </div>
                    </div>
                    <template v-if="currentMaterialWidthOption.length">
                      <div class="acea-row row-middle text-20 f-bold-500">
                        <p class="mr-xl-40 mr-20">Mat Width</p>
                        <p class="flex-1 line1">Increasing the mat width mayaffectthe frame price.</p>
                      </div>
                      <div class="width-list row mt-md-20 mt-15">
                        <div
                          class="col-average"
                          v-for="(item, index) in currentMaterialWidthOption"
                          :key="index"
                        >
                          <div
                            class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"
                            :class="{'border-gray-700': currentMaterialWidth === item.matWidth}"
                            @click="chooseMatWidth(item.matWidth!)"
                          >
                            {{ item.matWidth }}″
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>

              <div class="acea-row row-middle px-md-20 px-15 py-10">
                <span class="iconfont icon-info-fill text-20"></span>
                <span class="ml-6 text-20 text-underline cursor-pointer flex-1 line1"
                      @click="centerDialogVisible = true">
              <span class="f-bold">Click here:</span>
              Summary of differences.
            </span>
              </div>
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
                  >
                Check
              </span>
                </p>
                <p class="f-bold">Total：<span
                  class="text-26 text-error">{{ currencyStore.formatToCurrency(totalPrice || 0) }}</span></p>
              </div>
              <el-button style="border-radius: 0" class="w-full add-cart__button" size="large" type="danger" @click="addToCart"
                         :disabled="isBan">{{ isBan ? 'Sold Out' : 'Add To Cart' }}
              </el-button>
            </div>
          </el-skeleton>
        </div>
      </div>
    </div>
  </section>

  <!--创作者-->
  <section class="mt-lg-60 mt-sm-20" v-if="goodsDetail.creator">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">About the Artist</h1>

      <div class="artist-box acea-row gap-base">
        <div class="avatar" v-if="goodsDetail.creator?.portrait">
          <img class="w-full" :src="imagePrefix(goodsDetail.creator?.portrait)" alt="avatar">
        </div>
        <div class="info flex-1 text-gray-600">
          <p class="text-16 f-bold-500">{{ goodsDetail.creator?.timeline || '--' }}</p>
          <p class="text-20 f-bold-500 text-gray-700 my-10">{{ goodsDetail.creator?.name }}</p>
          <!--          <p class="text-16 f-bold-500 my-10">19th-Century</p>-->
          <p class="text-18">{{ goodsDetail.creator?.intro }}</p>
        </div>
      </div>

    </div>
  </section>

  <!-- 质量介绍-->
  <section class="mt-lg-60 mt-sm-20">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Commitment to Quality</h1>
      <div class="quality-list">
        <div class="quality-item acea-row gap-base">
          <div class="p-img">
            <img class="w-full" src="~/assets/images/quality1.png" alt="">
          </div>
          <div class="info flex-1">
            <p class="text-20 f-bold-500">High-Quality Framed Art Prints</p>
            <p class="mt-10 text-16 text-gray-600">
              Our high-end framed wall art is printed on premium paper using non-toxic, archival inks that protect
              against
              UV light to resist fading. Experience unmatched quality and style as you choose from a wide range of
              designs
              to enhance your room décor.
            </p>
          </div>
        </div>

        <div class="quality-item acea-row gap-base">
          <div class="p-img">
            <img class="w-full" src="~/assets/images/quality2.png" alt="">
          </div>
          <div class="info flex-1">
            <p class="text-20 f-bold-500">Professionally Crafted Framed Wall Art</p>
            <p class="mt-10 text-16 text-gray-600">
              Attention to detail is at the heart of our process, as we exclusively use 100% solid wood frames that
              include 4-ply white core matboard and durable, frame-grade clear acrylic for clarity, long-lasting
              protection of the artwork and unrivaled quality.
              With a thoughtfully selected frame and mat combination, this piece is designed to complement your art and
              create a visually appealing display.
            </p>
          </div>
        </div>

        <div class="quality-item acea-row gap-base">
          <div class="p-img">
            <img class="w-full" src="~/assets/images/quality3.png" alt="">
          </div>
          <div class="info flex-1">
            <p class="text-20 f-bold-500">Easy-to-Hang & Ready-to-Display Artwork</p>
            <p class="mt-10 text-16 text-gray-600">
              Each framed art piece comes with hanging hardware affixed to the back of the frame, allowing for easy and
              convenient installation. Handcrafted in the USA.
              Ready to display right out of the box.
              Handcrafted in the USA.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 相关推荐-->
  <section class="mt-lg-60 mt-sm-20" v-if="relatedList.length">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Product Related</h1>
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
              <div class="explore-item cursor-pointer" @click="jumpToProduct(item)">
                <div class="aspect-ratio">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" alt=""/>
                </div>
                <p class="line1 text-14 my-8">{{ item.title }}</p>
                <p class="text-12 f-bold">{{ currencyStore.formatToCurrency(item.retailPrice || 0) }}</p>
              </div>
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
  <section class="mt-lg-60 mt-sm-20" v-if="goodsDetail?.brand?.id">
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
        <img class="w-full pc" :src="imagePrefix(goodsDetail?.brand?.background)" alt="">
        <img class="w-full app" :src="imagePrefix(goodsDetail?.brand?.img)" alt="">
      </div>
      <ClientOnly>
        <div class="recommend-swiper">
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
              <div class="explore-item cursor-pointer" @click="jumpToProduct(item)">
                <div class="aspect-ratio">
                  <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" alt=""/>
                </div>
                <p class="line1 text-14 my-8">{{ item.title }}</p>
                <p class="text-12 f-bold">{{ item.retailPrice }}</p>
              </div>
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
  <section class="mt-lg-60 mt-sm-20">
    <div class="container">
      <h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20">Frequently Asked Questions</h1>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="subItem in shoppingFaq" :title="subItem.title" :name="subItem.name"
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

  <!-- 客户评价 -->
  <section class="mt-lg-60 mt-sm-20" v-show="commentTotal > 0">
    <div class="container">
      <div class="py-sm-30 py-20 acea-row row-middle">
        <span class="text-26 f-bold mr-10">Comment({{ commentTotal }})</span>
      </div>
      <ProInfinite
        ref="proInfiniteRef"
        :request-api="_getCommentList"
        :initParam="{productId: route.params.id}"
      >
        <template #default="scope">
          <div class="reviews-list">
            <div class="reviews-item" v-for="item in scope.rows" :key="item.id">
              <img class="w-full" :src="imagePrefix(item.img)" :alt="item.name">
              <div class="p-content border-sm">
                <div class="p-10">
                  <p class="text-18 f-bold-500">{{ item.name }}</p>
                  <p class="text-12 f-bold-500 text-gray-400 my-md-10 my-5">{{ formatTimestamp(item.createTime, 'YYYY/MM/DD') }}</p>
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
      </ProInfinite>
    </div>
  </section>

  <el-dialog v-model="centerDialogVisible" title="Summary of Differences" width="720" center>
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <template #footer>
      <el-button @click="centerDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>
    </template>
  </el-dialog>

  <ClientOnly>
    <!-- 背景墙 -->
    <WallColor :wall-image="generatorImg" ref="wallColorRef"/>
  </ClientOnly>

  <ClientOnly>
    <!-- 房间 -->
    <Room :wall-image="generatorImg" ref="roomRef" :pixel="pixel" v-if="generatorImg && reReckon"/>
  </ClientOnly>

  <ClientOnly>
    <!--  图片查看器 -->
    <el-image-viewer v-if="imgViewVisible" :url-list="[generatorImg]" @close="imgViewVisible = false"/>
  </ClientOnly>

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
      <span class="text-14">{{ currencyStore.formatToCurrency(currentSizeOption?.price || 0) }}</span>
    </div>
    <div class="acea-row row-between-wrapper text-gray-700 py-20 mb-10">
      <span class="f-bold text-18 flex-1 line1 mr-10">Frame Price</span>
      <span class="text-14">{{ currencyStore.formatToCurrency(frameMoney || 0) }}</span>
    </div>
    <div class="acea-row row-between-wrapper text-gray-700 mb-10 py-20" v-if="hasFrame && !!currentMaterialId">
      <span class="f-bold text-18 flex-1 line1 mr-10">Canvas material Price</span>
      <span class="text-14">{{ currencyStore.formatToCurrency(currentMaterialOption?.price || 0) }}</span>
    </div>
  </el-popover>

  <LoginWindow ref="loginWindowRef"/>
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
import {cm2inch, debounce, imagePrefix, jumpToProduct} from "~/utils";
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
import {CONTACT_EMAIL, PRODUCT_URL} from "~/config";
import {shoppingFaq} from "~/config/faq";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {packQuery} from "~/composables/useQueryShort";
import {useCustomProductJsonLd} from "~/composables/useCustomProductJsonLd";
import type {IMessage} from "~/api/interface/message/message";
import {getCommentList} from "~/api/modules/message/message";
import ProInfinite from "~/components/ProInfinite.vue";
import {formatTimestamp} from "~/utils/format";

defineOptions({
  name: 'PaintDetail'
})

onMounted(async () => {
  await getSpecsList() // 获取Spec列表
  await getCombination() // 获取组合
  if (goodsDetail.value.brand?.id) await getBrandRecommend() // 获取品牌推荐
  await getRelatedRecommend()
  generateStepIndex() // 确保在数据加载完成后调用
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
const currencyStore = useCurrencyStore();

const modules = [Autoplay, Pagination, Navigation]
const activeName = ref('')
const generatorImg = ref('') // 最终图片
const pixel = ref({width: 0, height: 0}) // 最终尺寸
const imgViewVisible = ref(false)
const centerDialogVisible = ref(false)

// 生成步骤索引
const generateStepIndex = () => {
  nextTick(() => {
    const el = document.documentElement.getElementsByClassName('step-index')
    Array.from(el).forEach((item, index) => {
      item.textContent = `STEP ${index + 1}:`
    })
  })
}

const reReckon = ref(false) // 重新识别
const handleImageChange = () => {
  reReckon.value = false
  nextTick(() => {
    reReckon.value = true
  })
}

// 获取详情
const config = useRuntimeConfig()
const {data: goodsDetail, pending: isSkeleton} = await useAsyncData('goods-detail', async () => {
  const {data} = await $fetch<IResultData<IProduct.Row>>(config.public.apiBase + TRADE_MODULE + '/product/detail', {
    method: 'GET',
    params: {
      productId: route.params.id
    },
    headers: {
      'Token': userStore.token || '',
      'X-Currency': currencyStore.currentCurrency
    }
  })
  return data
})

useHead({
  title: `${goodsDetail.value?.name || ''} - ${config.public?.siteName}`,
})

const { injectProductJsonLd, jsonLd } = useCustomProductJsonLd(goodsDetail.value, {})
injectProductJsonLd()

console.log('injectProductJsonLd=>', jsonLd.value)

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
const chooseTechnique = (item: ISpecs.Row) => {
  if (currentSpecId.value === item.id) return
  currentSpecId.value = item.id
  getCombination(true)
}

// 下架或者库存不足
const isBan = computed(() => currentSpecOption.value?.status === '1' || parseInt(currentSpecOption.value?.retailStock || '0') < 1)

let loaded = false
/**
 * 获取组合
 * @param senior - 开启高级比较
 */
const getCombination = async (senior = false) => {
  const {data} = await getCombinationApi({
    code: currentSpecOption.value!.code!,
    ratio: goodsDetail.value.ratio,
    dimensionId: currentSizeId.value || null,
  })
  sizeOptions.value = data.size || [] // 尺寸选项
  innerFrame.value = data.parts.inner_frame[0] // 内框单项
  frameOptions.value = [
    notFrame,
    innerFrame.value,
    ...data.parts?.frame || [],
  ] // 画框选项

  // 是否可以选择卡纸
  hasMat.value = !!data.parts?.mat?.length
  if (hasMat.value) {
    materialOptions.value = [
      ...data.parts.mat,
      noMat
    ] // 卡纸选项
  }

  // 默认选中尺寸
  function selectSize() {
    const defaultSelect = sizeOptions.value.find(item => item.selected === '1') // 拿到默认选中的尺寸选项
    if (defaultSelect) {
      currentSizeId.value = defaultSelect.id // 选中
    } else {
      currentSizeId.value = sizeOptions.value[0].id // 拿到第一个尺寸ID
    }
  }

  // 第一次加载默认选中
  if (!loaded) {
    selectSize()

    // const innerFrameId = innerFrame.value.id || '' // 拿到内框ID
    // if (innerFrameId) { // 有内框默认选中内框
    //   currentFrameId.value = innerFrameId
    // } else {
    //   currentFrameId.value = frameOptions.value[0].id // 拿到第一个画框ID
    // }

    if (hasMat.value) {
      currentMaterialId.value = materialOptions.value[0].id // 拿到第一个卡纸ID
      chooseMatWidth(materialOptions.value[0].specs![0]?.matWidth || '') // 拿到第一个卡纸宽度
    }
  }

  // 高级比较
  if (senior) {
    if (currentSizeId.value) {
      const findTheSize = sizeOptions.value.findIndex(item => item.id === currentSizeId.value)
      if (findTheSize === -1) {
        selectSize()
      }
    }

    if (currentFrameId.value) {
      const findTheFrame = frameOptions.value.findIndex(item => item.id === currentFrameId.value)
      if (findTheFrame === -1) {
        currentFrameId.value = ''
      }
    }

    if (!hasMat.value || !currentFrameOption.value?.config?.matSupport) {
      currentMaterialId.value = ''
      chooseMatWidth('')
    } else {
      currentMaterialId.value = materialOptions.value[0].id // 拿到第一个卡纸ID
      chooseMatWidth(materialOptions.value[0].specs![0]?.matWidth || '') // 拿到第一个卡纸宽度
    }
  }

  loaded = true
  generateStepIndex()
}

// 选择的尺寸Id
const currentSizeId = ref('')
// 尺寸选项
const sizeOptions = ref<IPaint.CombinationParts[]>([])
// 当前尺寸选项
const currentSizeOption = computed(() => sizeOptions.value.find(item => item.id === currentSizeId.value))
const chooseSize = () => {
  getCombination()
}

// 无框单项
const notFrame = {id: '', name: 'No Frame (Rolled in a Tube)', price: '0.00', img: '/trade/paint/frame/NOT/img.webp'}
// 内框单项
const innerFrame = ref({} as IPaint.CombinationParts)
// 选择的画框Id
const currentFrameId = ref('')
// 画框选项
const frameOptions = ref<IPaint.CombinationParts[]>([])
// 当前画框选项
const currentFrameOption = computed(() => frameOptions.value.find(item => item.id === currentFrameId.value))
const isInnerFrame = computed(() => currentFrameId.value === innerFrame.value.id)

// 选择画框
const chooseFrame = (item: IPaint.CombinationParts) => {
  currentFrameId.value = item.id
  generateStepIndex()
  if (hasMat.value) {
    // 画框不支持卡纸
    if (!item.config?.matSupport) {
      currentMaterialId.value = ''
      chooseMatWidth('')
    } else if (currentMaterialId.value === '') {
      currentMaterialId.value = materialOptions.value[0].id // 拿到第一个卡纸ID
      chooseMatWidth(materialOptions.value[0].specs![0]?.matWidth || '') // 拿到第一个卡纸宽度
    }
  }
}

// 画框金额，如果没选择卡纸就需要加内框的金额
const frameMoney = computed(() => {
  const price = Number(currentFrameOption.value?.price) || 0 // 当前框的价格
  const surcharge = Number(currentFrameOption.value?.surcharge) || 0 // 当前框的手续费
  if (!hasFrame.value) { // 卷轴直接返回金额
    return price + surcharge
  } else {
    if (currentMaterialId.value === '') { // 没有选择卡纸
      return price + surcharge + Number((innerFrame.value?.price || 0))
    } else {
      return price  + surcharge
    }
  }
})
// 是否有画框
const hasFrame = computed(() => !isInnerFrame.value && currentFrameId.value !== '')

// 无卡纸单项
const noMat = {id: '', name: 'No Mat', price: '0.00', specs: []}
// 是否可以选择卡纸
const hasMat = ref(false)
// 选择的卡纸Id
const currentMaterialId = ref('')
// 卡纸选项
const materialOptions = ref<IPaint.CombinationParts[]>([])
// 当前卡纸选项
const currentMaterialOption = computed(() => materialOptions.value.find(item => item.id === currentMaterialId.value))
// 选择卡纸颜色
const chooseMatColor = (item: IPaint.CombinationParts) => {
  currentMaterialId.value = item.id
  if (!!item.id) {
    if (!currentMaterialWidth.value) {
      chooseMatWidth(currentMaterialOption.value!.specs![0].matWidth!)
    }
  } else {
    chooseMatWidth('')
  }
}
// 当前卡纸宽度选项
const currentMaterialWidth = ref('')
// 当前卡纸宽度选项
const currentMaterialWidthOption = computed(() => currentMaterialOption.value?.specs || [])
// 选择卡纸宽度
const chooseMatWidth = (width: string) => {
  currentMaterialWidth.value = width
}
// 是否有卡纸选项（多了个画框配置中是否支持卡纸）
const matVisible = computed(() => {
  return currentFrameOption.value.config?.matSupport && hasMat.value
})

// 总价
const totalPrice = computed(() => {
  const sizePrice = currentSizeOption.value?.price || 0
  const framePrice = frameMoney.value || 0
  const matPrice = !!currentMaterialId.value && hasFrame.value ? (currentMaterialOption.value?.price || 0) : 0
  return Number(sizePrice) + Number(framePrice) + Number(matPrice)
})

// 商品规格值
const specs = computed(() => {
  let currentFrameName = currentFrameOption.value?.name
  const thickness = currentFrameOption.value?.config?.thickness
  if (thickness) currentFrameName += ' (' + cm2inch(thickness) + ' in wide)'
  const specs: Record<string, any> = {
    'Painting Size': currentSizeOption.value?.name, // 尺寸名称
    'Frame': !hasFrame.value ? currentFrameName : currentMaterialId.value === '' ? currentFrameName + ', ' + innerFrame.value?.name : currentFrameName, // 画框名称
  }
  if (hasFrame.value && !!currentMaterialId.value) {
    specs['Mounting On'] = 'Moisture Proof Backboard, Glass, Mat' // 玻璃、背板
    specs['Mat Color'] = currentMaterialOption.value?.name // 卡纸颜色
    specs['Mat Width'] = currentMaterialWidth.value + '″' // 卡纸宽度
  }
  return specs
})

// 商品配件
const parts = computed(() => {
  const parts: Record<string, any> = {}
  if (currentFrameId.value !== '') {
    parts[currentFrameId.value] = {}
    if (hasFrame.value && currentMaterialId.value === '') parts[innerFrame.value.id] = {}
  }
  if (hasFrame.value && !!currentMaterialId.value) parts[currentMaterialId.value] = {
    'Mounting On': 'Moisture Proof Backboard, Glass, Mat',
    'Mat Width': currentMaterialWidth.value + '″',
  }
  return parts
})

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

const proInfiniteRef = ref<InstanceType<typeof ProInfinite>>()

const commentTotal = computed(() => {
  return proInfiniteRef.value?.pageable?.total || 0
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
      //height: 790px;
      min-height: 26vw;
      //aspect-ratio: 75 / 79;
      padding: 5% 0;
    }
  }

  .spu-spec {

    .frame-scroll {
      max-height: 427px;

      .frame-list {
        row-gap: var(--gutter-base);

        .frame-item {
          position: relative;
          background: var(--color-gray-100);
          height: 100%;

          .frame-box {
            padding-bottom: 25px;

            .frame-money {
              position: absolute;
              left: 5px;
              bottom: 5px;
            }
          }

          &.on {
            background: var(--color-gray-700);
            color: #fff;
          }
        }
      }
    }

    .color-list {
      display: grid;
      grid-template-columns: repeat(8, 34px);
      row-gap: 20px;
      width: 100%;
      justify-content: space-between;

      .color-item {
        width: 34px;
        height: 34px;
        color: var(--color-gray-400);
        border: var(--border-width-md) solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;

        .iconfont {
          font-size: 28px;
        }

        &.on {
          border-color: var(--color-gray-700);
          color: var(--color-gray-700);
        }
      }
    }

    .width-list {
      --gutter: var(--gutter-base);
      row-gap: var(--gutter);

      .width-item {
        width: 100%;
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

.quality-list {
  .quality-item {
    align-items: center;

    .p-img {
      min-width: 100px;
      width: 10.52%;
    }
  }

  .quality-item + .quality-item {
    margin-top: var(--gutter-base);
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
  .spu-wrapper .spu-spec {
    .frame-scroll {
      max-height: 400px;
    }

    .color-list {
      grid-template-columns: repeat(6, 25px);
      row-gap: var(--gutter-sm);;

      .color-item {
        width: 25px;
        height: 25px;

        .iconfont {
          font-size: 16px;
        }
      }
    }

    .width-list {
      --gutter: var(--gutter-sm);
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
}

@media (max-width: 768px) {
  .quality-list .quality-item {
    align-items: flex-start;
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
}
</style>