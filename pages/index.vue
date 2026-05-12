<template>
  <!-- Banner -->
  <section class="sec-banner">
    <div class="banner-swiper">
      <swiper
          :modules="modules"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 2500, disableOnInteraction: false }"
          :loop="true"
          :lazy="true"
      >
        <swiper-slide class="cursor-pointer" v-for="item in topicData" :key="item.id" :lazy="true">
          <!-- 图片 -->
          <template v-if="item.type === '0'">
            <NuxtLink :to="item.url" :target="isExternal(item.url) ? '_blank' : '_self'">
              <picture>
                <!-- Mobile -->
                <source
                    media="(max-width: 768px)"
                    :srcset="getMobileSrcset(item.mobileImg).srcset"
                    sizes="100vw"
                />
                <!-- PC -->
                <source
                    media="(min-width: 769px)"
                    :srcset="getPcSrcset(item.img).srcset"
                    sizes="100vw"
                />
                <!-- fallback img -->
                <img
                    :src="getPcSrcset(item.img).src"
                    :alt="item.title"
                    class="w-full h-auto fit-cover"
                    loading="lazy"
                />
              </picture>
            </NuxtLink>
          </template>
          <!-- 视频 -->
          <template v-if="item.type === '1'">
            <div class="video-box w-full h-full">
              <video
                  class="w-full h-full fit-cover"
                  :src="imagePrefix(item.media)"
                  :poster="imagePrefix(item.img)"
                  :autoplay="true"
                  :loop="true"
                  :muted="true"
                  :controls="false"
                  playsinline
              />
            </div>
          </template>
        </swiper-slide>
      </swiper>
    </div>
  </section>

  <!-- MUSEUM-QUALITY -->
  <section class="sec-quality">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h2 class="text-50">MUSEUM-QUALITY OIL PAINTING REPRODUCTIONS</h2>
        <p class="mt-20 text-gray-600 text-16 f-bold-500 text-capitalize" style="max-width: 608px; margin: auto">
          Bring the museum home
        </p>
      </div>
      <div class="quality-wrapper" v-aos="'fade-up'">
        <div class="quality-video">
          <ClientOnly>
            <div class="youtube-cover w-full h-full" v-if="!playYoutube">
              <img :src="`https://img.youtube.com/vi/${'Brh1ESlRJ0s'}/maxresdefault.jpg`" alt="">
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
                height="374"
                type="text/html"
                :src="youtubeProxyPrefix('Brh1ESlRJ0s')"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
          </ClientOnly>
        </div>
        <div class="quality-content">
          <p class="text-18" style="line-height: 2" v-if="appStore.isPc">
            Beyond the flatness of a print lies the soul of a brushstroke. At ARTDAFEN, every piece is hand-crafted with
            passion. We unite the master artisans of Dafen Village to bring you authentic, textured oil
            paintings—gallery quality, without the gallery markup.
          </p>
          <div class="row quality-list mt-25">
            <div class="col-6">
              <div class="quality-item">
                <SvgIcon name="palette" class="text-60 mr-10" />
                <p class="" style="line-height: 2">
                  <span class="f-bold text-16">Dafen Origin: </span>
                  <span class="text-14">Authentic craftsmanship from the global art hub.</span>
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="quality-item">
                <SvgIcon name="edit-document" class="text-60 mr-10" />
                <p class="" style="line-height: 2">
                  <span class="f-bold text-16">Master Artists: </span>
                  <span class="text-14">Created by painters with 20+ years of expertise.</span>
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="quality-item">
                <SvgIcon name="draw" class="text-60 mr-10" />
                <p class="" style="line-height: 2">
                  <span class="f-bold text-16">Zero Prints: </span>
                  <span class="text-14">100% hand-painted with rich, authentic texture.</span>
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="quality-item">
                <SvgIcon name="scroll-document" class="text-60 mr-10" />
                <p class="" style="line-height: 2">
                  <span class="f-bold text-16">Archival Quality: </span>
                  <span class="text-14">Eco-friendly paints on 400gsm linen canvas.</span>
                </p>
              </div>
            </div>
          </div>
          <NuxtLink
              :to="COLLECTIONS_URL"
              class="block mt-25">
            <el-button type="primary" size="large" class="w-full">
              VIEW AVAILABLE WORKS
            </el-button>
          </NuxtLink>

          <div class="acea-row row-evenly text-12 mt-25" v-if="appStore.isPc">
            <span>DAFEN HERITAGE</span>
            <span>GALLERY GRADE</span>
            <span>TRUE BRUSHSTROKE</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--SHOP BY VIBE-->
  <section class="sec-elevating">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h2 class="text-50">SHOP BY VIBE</h2>
        <p class="mt-20 text-gray-600 text-16 f-bold-500 text-capitalize" style="max-width: 608px; margin: auto">
          Find the aesthetic that speaks to your soul. From Minimalist calm to Dopamine energy, explore curated collections tailored to every mood and atmosphere.
        </p>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="appStore.isPc ? 3 : 1" class="row gap-row-base">
        <template #template>
          <div class="col-sm-4 col-12">
            <el-skeleton-item variant="image" class="w-full h-auto aspect-ratio-3_4" />
            <div class="text-center">
              <el-skeleton-item variant="p" class="mt-20 w-half" />
            </div>
          </div>
        </template>
        <div class="row elevating-list" v-if="appStore.isPc">
          <div
              class="col-sm-4 col-12"
              v-for="(item, index) in disVibeData" :key="item.id"
              v-aos="{ name: 'fade-up', delay: index % 3 * 100}"
          >
            <NuxtLink class="block" :to="item?.url || '/'">
              <div class="overflow-hidden bg-gray-100 aspect-ratio-3_4">
                <el-image class="w-full h-full img-hover" fit="cover" :src="imagePrefix(item.img)" :alt="item.name" lazy />
              </div>
              <p class="text-center text-30 f-bold-500 mt-20">{{ item.name }}</p>
            </NuxtLink>
          </div>
        </div>
        <swiper
            v-else
            :modules="modules"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
            slides-per-view="auto"
            :space-between="15"
            :centered-slides="true"
            :loop="true"
            v-aos="'fade-up'"
        >
          <swiper-slide v-for="item in disVibeData" :key="item.id" style="width: 80%;">
            <NuxtLink class="block" :to="item?.url || '/'">
              <div class="overflow-hidden bg-gray-100 aspect-ratio-3_4">
                <el-image class="w-full h-full img-hover" fit="cover" :src="imagePrefix(item.img)" :alt="item.name" lazy />
              </div>
              <p class="text-center text-30 f-bold-500 mt-20">{{ item.name }}</p>
            </NuxtLink>
          </swiper-slide>
        </swiper>
      </el-skeleton>
    </div>
  </section>

  <!--OFFICIAL-->
  <!--  <section class="sec-welcome">
      <div class="container">
        <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
          <h1 class="text-50">ARTDAFEN.COM</h1>
          <p class="mt-20 text-gray-600 text-16 f-bold-500 text-capitalize" style="max-width: 608px; margin: auto">
            Since 1989 · Reimagined 2020
          </p>
        </div>
        <el-skeleton :loading="isSkeleton" animated :count="3" class="row gap-row-base">
          <template #template>
            <div class="col-sm-4 col-12">
              <el-skeleton-item variant="image" style="width: 100%; height: 25vw"/>
              <div class="py-10">
                <el-skeleton-item variant="h1"/>
                <el-skeleton-item variant="p" class="my-10" style="width: 50%"/>
              </div>
            </div>
          </template>
          <div class="row gap-row-base">
            <div
              class="col-sm-4 col-12"
              v-for="(item, index) in officialData"
              :key="item.id"
              v-aos="{ name: 'fade-up', delay: index * 100}"
            >
              <div class="cursor-pointer" @click="jumpToUrl(item.url)">
                <div class="border-sm border-gray-200 overflow-hidden bg-gray-200">
                  <img class="w-full img-hover" :src="imagePrefix(item.img)" :alt="item.name"/>
                </div>
                <div class="content-wrapper p-10 bg-gray-100">
                  <p class="line1 text-28 f-bold">{{ item.name }}</p>
                  <p class="line2 text-16 my-10">{{ item.title }}</p>
                  <p class="text-16 f-bold-500 text-underline">SHOP NOW</p>
                </div>
              </div>
            </div>
          </div>
        </el-skeleton>
      </div>
    </section>-->

  <!-- PHOTO TO ART -->
  <section class="sec-art">
    <div class="container">
      <NuxtLink class="make-wrapper" v-aos="'fade-up'" :to="`/custom-paint/${ArtCodeEnum.Painting}`"
                @click="goCustomPaint">
        <div class="make-box flex-1 bg-gray-100 p-md-40 p-20">
          <p class="text-18 f-bold">MAKE YOUR MEMORIES LAST</p>
          <p class="text-60 f-bold my-20">Photo To Art</p>
          <p class="text-22">Easily Transform Life's Real Moments Into A <br> Masterpiece — Made Just For You.</p>
        </div>
        <NuxtImg
            class="cover"
            src="/static/artdafen/make.webp"
            provider="huaweiObs"
            sizes="xs:100vw sm:100vw md:50vw lg:900px"
            alt="make"
        />
      </NuxtLink>
      <div class="bespoke-wrapper" v-aos="'fade-up'" v-if="appStore.isPc">
        <NuxtImg
            class="cover"
            src="/static/artdafen/bespoke.webp"
            provider="huaweiObs"
            sizes="xs:100vw sm:100vw md:50vw lg:800px"
            alt="bespoke"
        />
        <div class="content overflow-hidden">
          <div>
            <h2 class="text-40">The Essence of Quality</h2>
            <p class="text-20 mt-20">
              Every painting is meticulously crafted and rigorously inspected before it reaches you
            </p>
          </div>
          <div class="problem-list row">
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Custom Frame Selection</p>
                <p class="text-16 text-gray-600 mt-20">
                  Choose from an extensive range of frame styles, finishes, and sizes to complement your décor
                  perfectly.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Real-Time Scene Swap</p>
                <p class="text-16 text-gray-600 mt-20">
                  Visualize your artwork instantly in living rooms, bedrooms, or gallery settings to find the perfect
                  fit.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">True-Scale Visualization</p>
                <p class="text-16 text-gray-600 mt-20">
                  See your artwork at true scale alongside furniture and décor for precise sizing.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Interactive Resize & Crop</p>
                <p class="text-16 text-gray-600 mt-20">
                  Easily resize or crop your artwork without losing quality, ensuring it’s just right.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">Dynamic Style Filters</p>
                <p class="text-16 text-gray-600 mt-20">
                  Experiment with matting, wall colors, and lighting presets to achieve perfect aesthetic harmony.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="problem-item">
                <p class="text-20 f-bold-500">One-Click Save & Order</p>
                <p class="text-16 text-gray-600 mt-20">
                  Create shareable mock-ups and place your order seamlessly in just one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--WELCOME-->
  <section class="sec-welcome">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h2 class="text-50">LIFESTYLE SPACE</h2>
        <p class="mt-20 text-gray-600 text-16 f-bold-500 text-capitalize" style="max-width: 608px; margin: auto">
          Oil Painting Art Village
        </p>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="appStore.isPc ? 4 : 1" class="row gap-row-base">
        <template #template>
          <div class="col-md-3 col-sm-6 col-12">
            <el-skeleton-item variant="image" class="w-full h-auto aspect-ratio-3_4" />
            <div class="py-10">
              <el-skeleton-item variant="h1"/>
              <el-skeleton-item variant="p" class="my-10 w-half" />
            </div>
          </div>
        </template>
        <div class="row gap-row-base" v-if="appStore.isPc">
          <div
              class="col-md-3 col-6"
              v-for="(item, index) in roomData"
              :key="item.id"
              v-aos="{ name: 'fade-up', delay: index * 100}"
          >
            <NuxtLink class="block" :to="item.url">
              <div class="overflow-hidden bg-gray-100 aspect-ratio-3_4">
                <el-image class="w-full h-full img-hover" fit="cover" :src="imagePrefix(item.img)" :alt="item.name" lazy />
              </div>
              <div class="content-wrapper p-10 bg-gray-100">
                <p class="line1 text-28 f-bold">{{ item.name }}</p>
                <p class="line2 text-16 my-10">{{ item.title }}</p>
                <p class="text-16 f-bold-500 text-underline">SHOP NOW</p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <swiper
            v-else
            :modules="modules"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
            slides-per-view="auto"
            :space-between="15"
            :centered-slides="true"
            :loop="true"
            v-aos="'fade-up'"
        >
          <swiper-slide v-for="item in roomData" :key="item.id" style="width: 80%;">
            <NuxtLink class="block" :to="item.url">
              <div class="overflow-hidden bg-gray-100 aspect-ratio-3_4">
                <el-image class="w-full h-full img-hover" fit="cover" :src="imagePrefix(item.img)" :alt="item.name" lazy />
              </div>
              <div class="content-wrapper p-10 bg-gray-100">
                <p class="line1 text-28 f-bold">{{ item.name }}</p>
                <p class="line2 text-16 my-10">{{ item.title }}</p>
                <p class="text-16 f-bold-500 text-underline">SHOP NOW</p>
              </div>
            </NuxtLink>
          </swiper-slide>
        </swiper>
      </el-skeleton>
    </div>
  </section>

  <!--100 MOST ART-->
  <section class="sec-explore mt-lg-40 mt-30">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h2 class="text-50">THE 100 MOST POPULAR WORKS OF ART</h2>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="appStore.isPc ? 12 : 6" class="row gap-row-base">
        <template #template>
          <div class="col-lg-2 col-md-average col-sm-3 col-xs-4 col-6">
            <div class="text-center w-full">
              <el-skeleton-item variant="image" class="w-full h-auto aspect-ratio" />
              <el-skeleton-item variant="text" class="mt-15 w-half"/>
            </div>
          </div>
        </template>
        <div class="row product-list gap-row-base">
          <template v-for="(item, index) in exploreData" :key="item.id">
            <div class="col-lg-2 col-md-average col-sm-3 col-xs-4 col-6" v-if="appStore.isPc || index < 6">
              <div
                  class="product-item"
                  v-aos="{ name: 'fade-up', delay: index % 6 * 100}"
              >
                <NuxtLink class="img-wrapper bg-gray-200 aspect-ratio block overflow-hidden" :to="productLink(item)">
                  <el-image class="w-full h-full img-hover" fit="cover" :src="imagePrefix(item.img)" crossorigin="anonymous" :alt="`Hand-painted ${item.title} oil painting reproduction by ${item.creator?.name}`" lazy />
                </NuxtLink>
                <div class="content-wrapper">
                  <NuxtLink class="my-10 line1 block text-hover" :to="handleClickArtist(item.creator)">
                    <span class="text-16 f-bold">{{ item.creator?.name }}</span>
                    <SvgIcon name="right" />
                  </NuxtLink>
                  <NuxtLink class="line2 text-14 block text-hover" :to="productLink(item)">{{ item.title }}</NuxtLink>
                  <p class="my-10">
                    <span class="text-16 f-bold">{{ formatToCurrency(item.retailPrice) }}</span>
                    <span class="text-gray-400 text-through ml-5 text-14" v-if="item.retailPrice !== item.marketPrice">{{ formatToCurrency(item.marketPrice) }}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </el-skeleton>
      <div class="acea-row row-center-wrapper py-lg-40 py-30" v-aos="'fade-up'">
        <NuxtLink :to="COLLECTIONS_URL + '/curator\'s-choice' + '?q=' + packQuery({MENU_ID: '2000014'})">
          <el-button class="home-button" plain>SEE MORE</el-button>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- WHY CHOOSE ARTDAFEN? -->
  <section class="sec-choose">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h2 class="text-50">WHY CHOOSE ARTDAFEN?</h2>
        <p class="mt-20 text-gray-600 text-16 f-bold-500 text-capitalize" style="max-width: 608px; margin: auto">
          Crafted stroke by stroke by real artists. No printing involved
        </p>
      </div>

      <div class="row gap-row-base" v-if="appStore.isPc">
        <div
            class="col-4"
            v-aos="{ name: 'fade-up', delay: index * 100}"
            v-for="(item, index) in WHY_CHOOSE_LIST" :key="item.title"
        >
          <div class="text-center">
            <div class="aspect-ratio-16_9 overflow-hidden bg-gray-100">
              <el-image class="w-full h-full" fit="cover" :src="imagePrefix(item.img)" :alt="item.title" lazy />
            </div>
            <div>
              <p class="text-24 f-bold my-md-20 my-15">{{ item.title }}</p>
              <p class="text-18" style="line-height: 1.7;">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <swiper
          v-else
          :modules="modules"
          :autoplay="{ delay: 2500, disableOnInteraction: false }"
          slides-per-view="auto"
          :space-between="15"
          :centered-slides="true"
          :loop="true"
          :lazy="true"
          v-aos="'fade-up'"
      >
        <swiper-slide v-for="item in WHY_CHOOSE_LIST" :key="item.title" style="width: 80%;" :lazy="true">
          <div class="text-center">
            <div class="aspect-ratio-16_9 overflow-hidden bg-gray-100">
              <el-image class="w-full h-full" fit="cover" :src="imagePrefix(item.img)" :alt="item.title" lazy />
            </div>
            <div>
              <p class="text-24 f-bold my-md-20 my-15">{{ item.title }}</p>
              <p class="text-18" style="line-height: 1.7;">{{ item.desc }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>

  <!-- TOP ARTIST -->
  <section class="sec-artist mt-lg-40 mt-30">
    <div class="container">
      <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
        <h2 class="text-50">MOST FAMOUS ARTISTS</h2>
      </div>
      <el-skeleton :loading="isSkeleton" animated :count="appStore.isPc ? 12 : 9" class="row gap-row-base">
        <template #template>
          <div class="col-4 col-sm-3 col-md-average col-lg-2">
            <div class="text-center w-full">
              <el-skeleton-item variant="circle" style="margin: auto; width: 80%; aspect-ratio: 1/1;"/>
              <el-skeleton-item variant="text" style="width: 50%" class="mt-15"/>
            </div>
          </div>
        </template>
        <div class="row artist-list gap-row-base">
          <template v-for="(item, index) in artistsData" :key="item.id">
            <div class="col-4 col-sm-3 col-md-average col-lg-2" v-if="appStore.isPc || index < 9">
              <NuxtLink
                  :to="`/artist-detail/${item.id}/${item.slug}`"
                  class="artist-item block"
                  v-aos="{ name: 'fade-up', delay: index % 6 * 100}"
              >
                <div class="img-wrapper rounded-full aspect-ratio overflow-hidden">
                  <el-image class="w-full h-full img-hover" fit="cover" :src="imagePrefix(item.portrait)" :alt="item.name" lazy />
                </div>
                <p class="text-center text-20 f-bold-500 mt-15 line1">{{ item.name }}</p>
              </NuxtLink>
            </div>
          </template>
        </div>
      </el-skeleton>
      <div class="acea-row row-center-wrapper py-lg-40 py-30" v-aos="'fade-up'">
        <NuxtLink to="/artists-brief">
          <el-button class="home-button" plain>VIEW ALL ARTISTS</el-button>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!--STYLE-->
  <!--  <section class="sec-style ">
      <div class="container">
        <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
          <h2 class="text-50">MORE STYLE</h2>
        </div>
        <el-skeleton :loading="isSkeleton" animated :count="8" class="row gap-row-base">
          <template #template>
            <div class="col-xl-3 col-md-4 col-6">
              <el-skeleton-item variant="image" style="width: 100%; height: 12vw"/>
            </div>
          </template>
          <div class="row gap-row-base categories-list">
            <div
              class="col-xl-3 col-md-4 col-6"
              v-for="(item, index) in styleData"
              :key="item.id"
              v-aos="{ name: 'fade-up', delay: index % 4 * 100}"
            >
              <div class="categories-item cursor-pointer overflow-hidden" @click="jumpToUrl(item.url)">
                <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.name">
                <p class="categories-text text-26 f-bold text-white text-center">{{ item.name }}</p>
              </div>
            </div>
          </div>
        </el-skeleton>
      </div>
    </section>-->

  <!--WHAT CUSTOMERS SAY-->
  <!--<section class="sec-review">
    <div class="text-center py-lg-40 py-30" v-aos="'fade-up'">
      <h2 class="text-50">WHAT CUSTOMERS SAY</h2>
    </div>

    <el-skeleton :loading="isSkeletonComment" animated :count="4" class="review-skeleton">
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%; height: 17vw"/>
      </template>
      <swiper
          class="review-swiper"
          :slidesPerView="'auto'"
          :spaceBetween="4"
          :centeredSlides="true"
          :loop="true"
          :lazy="true"
          :autoplay="{ delay: 3000 }"
          :modules="modules"
          :navigation="true"
          v-aos="'fade-up'"
      >
        <swiper-slide v-for="item in commentData" :key="item.id" :lazy="true">
          <div class="review-item h-full w-full">
            <img class="w-full h-full fit-cover" :src="imagePrefix(item.img)" :alt="item.name" loading="lazy">
            <div class="p-content acea-row row-column nowrap p-20">
              <div class="flex-1">
                <p class="text-18 f-bold-500 mb-md-10 mb-5">{{ item.name }}</p>
                &lt;!&ndash;                <p class="text-12 f-bold-500 text-gray-400 my-md-10 my-5">{{ formatTimestamp(item.createTime, 'YYYY/MM/DD') }}</p>&ndash;&gt;
                <el-rate
                    v-model="item.rating"
                    disabled
                    size="small"
                    style="height: auto"
                />
                <p class="text-16 mt-md-10 mt-5 line4" style="line-height: 1.5">{{ item.content }}</p>
              </div>
              <el-button color="#fff" size="large" @click="router.push('/customer-reviews')">
                View All Testimonials
                <SvgIcon name="right" class="ml-10" />
              </el-button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </el-skeleton>
  </section>-->

  <!--CONTACT-->
  <section class="sec-contact">
    <div class="container-fluid">
      <div class="scroll-container">
        <div class="scroll-track">
          <img
              v-for="i in 4"
              :key="i"
              :src="getResponsiveImage(contactImage).src"
              :srcset="getResponsiveImage(contactImage).srcset"
              sizes="100vw"
              alt="background"
              class="scroll-img"
              decoding="async"
          />
        </div>
      </div>
      <div class="contact-container">
        <div class="contact-wrapper text-center">
          <h2 class="text-46 f-bold-500 mb-20">Keep up with the latest at ArtDaFen.com.<br/>Sign up now & get 15% off*
            your purchase of $99 or more!</h2>
          <div class="contact-buttons acea-row row-column gap-row-base">
            <el-button size="large" type="primary" @click="handleSubscribe">
              <template v-if="userStore.isLogin">
                {{ userStore.userInfo.subscribe === '1' ? 'Subscribe' : 'You Have Been Subscribed' }}
              </template>
              <template v-else>Sign Up</template>
            </el-button>
          </div>
          <p class="text-16 mt-20">
            INSTANTLY ACCESS THE LATEST FASHION TRENDS AND EXCLUSIVE DEALS ON OUR
            SITE.DISCOVER YOUR PERFECT STYLE IN A FEW CLICKS!
          </p>
          <template v-if="userStore.isLogin && userStore.userInfo.subscribe === '1'">
            <el-checkbox v-model="agree" size="large">I agree to receive marketing communications, including the latest news, art magazine issues, and event promotions.</el-checkbox>
            <p class="text-14">Tips: You can unsubscribe at any time. For more details, review our <NuxtLink to="/privacy-policy" class="text-secondary">Privacy Policy</NuxtLink>.</p>
          </template>
        </div>
      </div>
    </div>
  </section>

  <LoginWindow ref="loginWindowRef"/>

  <PromoCode ref="promoCodeRef"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, Navigation, Pagination, Lazy} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {useAppStore} from "~/stores/modules/app";
import {productLink, youtubeProxyPrefix, isExternal} from "~/utils";
import {COLLECTIONS_URL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import type {IArtists} from "~/api/interface/artists/artists";
import type {IHome} from "~/api/interface/home/home";
import {ElMessage, ElMessageBox} from "element-plus";
import {subscribeForRealName, getLatestComment} from "~/api/modules/message/message";
import {useCustomStore} from "~/stores/modules/custom";
import type {IResultData} from "~/api/interface";
import {TRADE_MODULE} from "~/api/helper/prefix";
import {ArtCodeEnum} from "~/types/enumeration";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import PromoCode from "~/components/PromoCode.vue";
import {resolvePageMeta} from "~/config/pageMeta";
import {packQuery} from "~/composables/useQueryShort";
import type {IMessage} from "~/api/interface/message/message";
import {WHY_CHOOSE_LIST} from "~/constant";
import {useImage} from "~/composables/useImage";

defineOptions({
  name: 'Home'
})

definePageMeta({
  isShowActivity: true
})

onMounted(() => {
  // getHomeExplore()
  _getLatestComment()
  if (route.query.couponId) showPromoCode(route.query.couponId)
})

const { imagePrefix, getPcSrcset, getMobileSrcset, getResponsiveImage } = useImage()
const contactImage = '/static/artdafen/contact-bg.webp';
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const customStore = useCustomStore()
const { formatToCurrency, currentCurrency } = useCurrencyStore();
const userStore = useUserStore()
const modules = [Autoplay, Pagination, Navigation, Lazy]
const playYoutube = ref(false)
const agree = ref(false)

useHead(resolvePageMeta("/"));

// 点击艺术家
const handleClickArtist = (creator: IArtists.Row) => {
  const q = packQuery({PAGE: 1, SEARCH_TYPE: 'artists'})
  return `${COLLECTIONS_URL}/${creator.slug}?q=${q}`
}

// 获取首页数据
const {data: homeData, pending: isSkeleton} = await useAsyncData('homeData', async () => {
  const config = useRuntimeConfig()
  const {data} = await $fetch<IResultData<IHome.HomeDataRow>>(config.public.apiBase + TRADE_MODULE + '/home/data', {
    method: 'GET',
    headers: {
      'Token': userStore.token || '',
      'X-Currency': currentCurrency
    }
  })
  return data
})

const topicData = computed(() => (homeData.value?.ad ?? []).filter(i => i.tags === 'index:topic'))
const roomData = computed(() => (homeData.value?.ad ?? []).filter(i => i.tags === 'index:room'))
const styleData = computed(() => (homeData.value?.ad ?? []).filter(i => i.tags === 'index:style'))
const disVibeData = computed(() => (homeData.value?.ad ?? []).filter(i => i.tags === 'index:vibe'))
const officialData = computed(() => (homeData.value?.ad ?? []).filter(i => i.tags === 'index:official'))
const exploreData = computed(() => (homeData.value?.product ?? [])) // Top 100 作品
const artistsData = computed(() => (homeData.value?.artists ?? [])) // Top 50 艺术家

// 消息订阅
const handleSubscribe = async () => {
  if (!userStore.isLogin) return showLoginWindow()
  if (userStore.userInfo.subscribe === '0') return
  else if (!agree.value) {
    ElMessageBox.confirm('Please agree to the terms and conditions to subscribe.', 'Tips', {
      confirmButtonText: 'Agree',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }).then(() => agree.value = true)
    return
  }
  await subscribeForRealName()
  ElMessage.success('Subscription successful，Please pay attention to the email.')
  userStore.updateSubscribe('0')
}

const goCustomPaint = () => {
  customStore.clearCache()
}

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

const promoCodeRef = ref<InstanceType<typeof PromoCode>>()
const showPromoCode = (id: string) => {
  promoCodeRef.value?.open(id)
}

// 获取买家秀
const commentData = ref<IMessage.CommentRes[]>([])
const isSkeletonComment = ref(true)
const _getLatestComment = async () => {
  const {data} = await getLatestComment()
  commentData.value = data.map(item => ({...item, rating: Number(item.rating)}))
  isSkeletonComment.value = false
}
</script>

<style scoped lang="scss">
  .home-button {
    padding: 20px 40px !important;
    height: auto !important;
  }

  .sec-banner {
    .banner-swiper {
      position: relative;

      :deep(.swiper) {
        background-color: var(--color-bg-secondary);
        aspect-ratio: 1920 / 598;

        .swiper-slide {
          height: auto;

          .video-box {
            position: relative;
            background: red;

            video {
              position: absolute;
              top: 0;
              left: 0;
            }

            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
            }
          }

        }
      }
    }
  }

  .sec-elevating {
    .elevating-list {
      --gutter: var(--gutter-md);
      row-gap: var(--gutter-md);
    }
  }

  .sec-explore {
    background: var(--color-gray-100);

    .product-list {
      .product-item {
        .img-wrapper {
          box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  .sec-artist {
    background: var(--color-gray-100);

    .artist-list {
      .artist-item {
        .img-wrapper {
          margin: auto;
          width: 80%;
        }
      }
    }
  }

  .sec-art {
    .make-wrapper {
      display: flex;
      margin: 3.125vw 0;

      .make-box {
        display: flex;
        justify-content: center;
        flex-direction: column;

      }

      .cover {
        width: 59.21%;
        flex-shrink: 0;
      }
    }

    .bespoke-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      column-gap: 5.20vw;

      .cover {
        width: 46.71%;
        flex-shrink: 0;
      }

      .content {
        .problem-list {
          margin-top: var(--gutter-xl);
          --gutter: var(--gutter-xl);
          row-gap: var(--gutter-xl);
        }
      }

    }
  }

  .sec-style {
    .categories-list {

      .categories-item {
        position: relative;
        overflow: hidden;

        img {
          transition: transform 0.3s ease-in-out;
        }

        .categories-text {
          position: absolute;
          bottom: 40px;
          left: 40px;
          right: 40px;
          z-index: 1;
          transition: all 0.3s ease-in-out;
        }

        &::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          pointer-events: none;
          transition: all 0.3s ease-in-out;
        }

        &:hover {

          img {
            transform: scale(1.1);
          }

          .categories-text {
            bottom: 50%;
            transform: translateY(50%);
          }

          &::after {
            background: rgba(0, 0, 0, 0.4);
          }

        }
      }
    }
  }

  .sec-contact {
    .scroll-container {
      width: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      right: 0;
      top: 10%;
      bottom: 10%;
      mask: radial-gradient(50% 50% at 50% 50%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
      opacity: 0.35;

      .scroll-track {
        display: flex;
        width: max-content;
        height: 100%;
        animation: infiniteScroll 30s linear infinite;
        will-change: transform;

        .scroll-img {
          height: 100%;
          width: auto;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
      }
    }

    @keyframes infiniteScroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-25%);
      }
    }

    .contact-container {
      position: relative;
      height: 26.04vw;
      min-height: 350px;
      overflow: hidden;
      margin-bottom: -30px;

      .contact-wrapper {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .contact-buttons {
          max-width: 546px;
          margin: auto;

          .el-button {
            margin-left: 0 !important;
          }
        }

        > p {
          max-width: 607px;
          margin: auto;
        }
      }

      .email-input :deep(.el-input__inner) {
        text-align: center;
      }
    }
  }

  .sec-review {
    .review-swiper {

      --swiper-navigation-color: #fff;
      --swiper-navigation-size: 30px;

      :deep(.swiper-slide) {
        width: 340px;
        aspect-ratio: 1 / 1;

        &.swiper-slide-active .review-item .p-content {
          top: 0;
        }
      }

      :deep(.swiper-button-prev) {
        left: clamp(15px, 3.125vw, 60px);
      }

      :deep(.swiper-button-next) {
        right: clamp(15px, 3.125vw, 60px);
      }

      :deep(.swiper-button-prev),
      :deep(.swiper-button-next) {
        background: var(--color-primary);
        width: 58px;
        height: 90px;
        margin-top: 0;
        transform: translateY(-50%);
      }

      .review-item {
        position: relative;
        display: block;
        overflow: hidden;

        .p-content {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 100%;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          transition: top .38s ease-in;
        }

        &:hover {
          .p-content {
            top: 0;
          }
        }

      }
    }
  }

  .review-skeleton {
    display: flex;
    gap: 4px;
  }

  .sec-quality {
    .quality-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      column-gap: 2.52vw;

      .quality-video {
        width: 43.75%;
        flex-shrink: 0;
        background: var(--color-bg-secondary);
        aspect-ratio: 16 / 9;

        .youtube-cover {
          position: relative;

          svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.38s ease-in-out;

            &:hover {
              transform: translate(-50%, -50%) scale(1.2);
            }
          }
        }
      }

      .quality-content {
        flex: 1;

        .quality-list {
          row-gap: var(--gutter-md);

          .quality-item {
            display: flex;
            align-items: center;
          }
        }
      }

    }
  }

  @media (max-width: 1260px) {
    .sec-style .categories-list .categories-item .categories-text {
      bottom: 20px;
      left: 20px;
      right: 20px;
    }

    .sec-elevating {
      .elevating-list {
        --gutter: var(--gutter-base);
        row-gap: var(--gutter-base);
      }
    }
  }

  @media (max-width: 991px) {
    .sec-explore {
      .explore-swiper {
        .swiper {
          --swiper-navigation-size: 20px;

          :deep(.swiper-button-prev),
          :deep(.swiper-button-next) {
            width: 38px;
            height: 60px;
          }
        }
      }
    }

    .sec-art {
      .make-wrapper {
        flex-wrap: wrap;

        .cover {
          width: 100%;
        }

        .make-box {
          width: 100%;
        }
      }

      .bespoke-wrapper {
        flex-wrap: wrap;
        column-gap: unset;
        row-gap: var(--gutter-base);

        .cover {
          width: 100%;
        }

        .content {
          width: 100%;

          .problem-list {
            margin-top: var(--gutter-base);
            --gutter: var(--gutter-base);
            row-gap: var(--gutter-base);
          }
        }
      }
    }

    .sec-review {
      .review-swiper {
        --swiper-navigation-size: 20px;

        :deep(.swiper-slide) {
          width: 250px;
          aspect-ratio: 1 / 1;
        }

        :deep(.swiper-button-prev),
        :deep(.swiper-button-next) {
          width: 38px;
          height: 60px;
        }
      }
    }

    .sec-quality {
      .quality-wrapper {
        flex-wrap: wrap;
        column-gap: unset;
        row-gap: var(--gutter-base);

        .quality-video {
          width: 100%;
        }

        .quality-content {
          width: 100%;

          .quality-list {
            row-gap: var(--gutter-sm);

            .quality-item {
              flex-direction: column;
              row-gap: var(--gutter-sm);
              text-align: center;
            }
          }
        }

      }
    }

    .contact-container {
      margin-bottom: -15px;
    }
  }

  @media (max-width: 768px) {
    .sec-banner {
      .banner-swiper {
        :deep(.swiper) {
          aspect-ratio: 750 / 782;

        }
      }
    }

    .sec-artist {
      .artist-list {
        .artist-item {
          .img-wrapper {
            width: 100%;
          }
        }
      }
    }

    .sec-quality {
      .quality-wrapper {

        .quality-video {
          .youtube-cover {

            svg {
              width: 50px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 414px) {

    .sec-banner {
      .banner-swiper {
        :deep(.swiper) {
          max-height: unset;
        }

      }
    }
  }

</style>
