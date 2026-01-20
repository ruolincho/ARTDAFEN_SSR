<template>
  <!--移动端功能区域-->
  <div
      ref="functionalRef"
      class="functional-area"
      v-if="!appStore.isPc && imageUrl"
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
    <el-upload
        class="upload-box"
        :accept="fileType.join(',')"
        :before-upload="beforeUpload"
        :on-change="uploadChange"
        :auto-upload="false"
        :show-file-list="false"
    >
      <span class="iconfont icon-upload-pictures"></span>
    </el-upload>
    <span class="split"></span>
    <span class="iconfont icon-help" @click="beginGuide"></span>
  </div>

  <!--规格选择-->
  <section>
    <!--portrait-->
    <div class="container" v-show="!(currentView === 'custom')">
      <div class="my-md-50 my-25 portrait-wrapper acea-row row-center-wrapper gap-column-md gap-row-sm">
        <img src="~/assets/images/logo-portrait.png" alt="logo-portrait">
        <h1 class="text-20 text-center" v-if="appStore.isPc">
          Your exclusive art customization service is now available. Discover timeless creations.
        </h1>
      </div>
    </div>

    <!-- 主题 -->
    <div class="container" v-show="currentView === 'theme'">
      <div class="text-center my-lg-40 my-30">
        <h2 class="text-50">TRANSFORM YOUR PHOTOS INTO STUNNING ARTWORKS</h2>
        <p class="mt-20 text-gray-600 text-20 f-bold-500">
          With Our Artists' Creation, Any Photo Can Be Turned Into An Elaborately Crafted Artwork. Choose From A Variety
          Of Unique Styles You Desire, And You'll Get Professional-Grade Results.
        </p>
      </div>

      <div class="row gap-row-base style-list">
        <div class="col-lg-average col-md-3 col-sm-4 col-6" v-for="item in themeOptions" :key="item.id">
          <div class="style-item" :class="{on: themeIdMap[0] === item.id}" @click="chooseTheme(item.id)">
            <img class="p-img aspect-ratio" :src="imagePrefix(item.img)" alt="">
            <p class="p-text text-30">{{ item.name }}</p>
            <div class="p-btn border-white border-md">CUSTOMIZE NOW</div>
          </div>
        </div>
      </div>

      <div class="text-center my-lg-40 my-30">
        <h2 class="text-50">MORE CASE STUDIES</h2>
      </div>

      <div class="case-list" v-if="appStore.isPc">
        <div class="case-item" v-for="item in themeOptions" :key="item.id">
          <div class="acea-row row-between-wrapper f-bold-500 py-20">
            <span class="text-uppercase text-26">{{ item.name }}</span>
            <span class="text-uppercase text-underline text-20 text-gray-600 cursor-pointer"
                  @click="seeMoreSample(item)">see more</span>
          </div>
          <div class="case-content">
            <div class="item" v-for="(sample, index) in item.samples" :key="sample.id"
                 @click="showCaseContrast(item.samples, index)">
              <img class="w-full h-full fit-cover img-hover"
                   :src="imagePrefix(sample.compareImg)"
                   :alt="item.name + '_sample'"
              />
            </div>
          </div>
          <el-button class="w-full mt-15" type="primary" size="large" @click="chooseTheme(item.id)">Customize Now
          </el-button>
        </div>
      </div>

      <swiper
          v-else
          :modules="modules"
          :autoplay="{ delay: 2500, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          style="padding-bottom: 40px;"
      >
        <swiper-slide v-for="item in themeOptions" :key="item.id">
          <div class="case-list">
            <div class="case-item">
              <div class="acea-row row-between-wrapper f-bold-500 py-20">
                <span class="text-uppercase text-26">{{ item.name }}</span>
                <span class="text-uppercase text-underline text-20 text-gray-600 cursor-pointer"
                      @click="seeMoreSample(item)">see more</span>
              </div>
              <div class="case-content">
                <div class="item" v-for="(sample, index) in item.samples" :key="sample.id"
                     @click="showCaseContrast(item.samples, index)">
                  <img class="w-full h-full fit-cover img-hover"
                       :src="imagePrefix(sample.compareImg)"
                       :alt="item.name + '_sample'"
                  />
                </div>
              </div>
              <el-button class="w-full mt-15" type="primary" size="large" @click="chooseTheme(item.id)">Customize Now
              </el-button>
            </div>
          </div>
        </swiper-slide>
      </swiper>


    </div>

    <!-- 风格 -->
    <div class="container" v-show="currentView === 'style'">
      <div class="text-center my-lg-40 my-30">
        <h2 class="text-50">CHOOSE YOUR FAVORITE STYLE</h2>
        <p class="mt-20 text-gray-600 text-20 f-bold-500">
          Discover the perfect look for every moment. From soft aesthetics to dramatic fantasy, transform your photos
          with unique textures designed to inspire.
        </p>
      </div>
      <div ref="favoriteMainRef" style="min-height: 450px" v-loading="themeLoading">
        <div class="row favorite-list gap-row-base" v-show="currentThemeOption?.children?.length">
          <div class="col-lg-3 col-sm-4 col-6" v-for="item in currentThemeOption?.children" :key="item.id">
            <div
                class="favorite-item cursor-pointer" :class="{ 'on': themeIdMap[1] === item.id }"
                @click="chooseStyle(item.id)"
            >
              <img class="w-full aspect-ratio" :src="imagePrefix(item.img)" alt="">
              <p class="p-title text-28 line1 p-sm-15 p-10">{{ item.name }}</p>
              <div class="p-content p-sm-15 p-10">
                <p class="p-text text-22 line1">{{ item.name }}</p>
                <div class="p-desc">
                  <p class="text-20 line5">{{ item.intro }}</p>
                </div>
                <div class="text-14 p-btn py-sm-10 px-sm-20 py-5 px-10">CUSTOMIZE NOW</div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center py-60" v-show="!themeLoading && !currentThemeOption?.children?.length">
          <span class="iconfont icon-empty text-50"></span>
          <p class="text-20 f-bold mt-20">No Data</p>
          <p class="text-14 my-20">No data found, please check the query or try again later.</p>
        </div>
      </div>
    </div>

    <!-- 自定义 -->
    <div class="container" v-show="currentView === 'custom'">
      <!--移动端兼容视图-->
      <div class="app-preview" :style="{margin: '0 -15px', height: '300px', position: appSticky ? 'sticky' : 'relative' }"
           v-if="!appStore.isPc && imageUrl">
        <div class="img-wrapper acea-row row-center-wrapper flex-1 overflow-hidden">
          <ClientOnly>
            <ImageGenerator
                v-model="generatorImg"
                v-model:squareImage="squareImageUrl"
                v-model:pixel="pixel"
                :shape="shapeStr"
                :core-image="imageUrl"
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
                @touch-screen="toggleImageViewer"
            />
          </ClientOnly>
        </div>
      </div>

      <div class="spu-wrapper row mt-lg-40 mt-md-30 mt-15">
        <!--预览图栅格-->
        <div class="col-sm-7">
          <ClientOnly>
            <!--示例图-->
            <div class="example-preview sticky-column" v-if="!imageUrl">
              <template v-if="route.params.work === ArtCodeEnum.Painting && lastThemeObj">
                <div class="p-md-20 p-15 border-sm acea-row row-center-wrapper">
                  <div class="favorite-list" style="max-width: 450px">
                    <div class="favorite-item">
                      <img class="w-full aspect-ratio" :src="imagePrefix(lastThemeObj.img)" alt="">
                      <p class="p-title text-28 line1 p-sm-15 p-10">{{ lastThemeObj.name }}</p>
                      <div class="tips text-20 p-8 f-bold">EXAMPLE IMAGE</div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="example-preview-box row"
                     v-for="(example, index) in TECHNIQUE_EXAMPLE[route.params.work as ArtCodeType]"
                     :key="index">
                  <div class="col-6">
                    <img :src="imagePrefix(example.photo)" alt="">
                    <p class="text-center text-16 my-15">Actual Photo</p>
                  </div>
                  <div class="col-6">
                    <img :src="imagePrefix(example.paint)" alt="">
                    <p class="acea-row row-center-wrapper text-16 my-15 cursor-pointer text-secondary"
                       @click="handleExample(index)">
                      <span class="iconfont icon-search text-18 mr-4"></span>
                      <span>Oil Painting</span>
                    </p>
                  </div>
                </div>
              </template>
            </div>
            <!--预览图-->
            <template v-else>
              <div class="spu-preview border-sm sticky-column" v-if="appStore.isPc">
                <div class="p-md-20 p-15 border-b-sm">
                  <p class="text-22 f-bold-500">Photos to Paintings</p>
                  <p class="mt-10 text-18">Commission a museum quality hand-painted oil painting from your family
                    photo!</p>
                </div>
                <div class="preview-box">
                  <ClientOnly>
                    <ImageGenerator
                        v-model="generatorImg"
                        v-model:squareImage="squareImageUrl"
                        v-model:pixel="pixel"
                        :shape="shapeStr"
                        :core-image="imageUrl"
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
                        @touch-screen="toggleImageViewer"
                    />
                  </ClientOnly>
                </div>
                <div class="acea-row row-evenly py-md-20 py-15" v-show="appStore.isPc">
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
                <div class="m-md-20 m-15">
                  <el-upload
                      class="upload-box"
                      :accept="fileType.join(',')"
                      :before-upload="beforeUpload"
                      :on-change="uploadChange"
                      :auto-upload="false"
                      :show-file-list="false"
                  >
                    <el-button class="w-full" size="large" type="primary">Re-upload the image</el-button>
                  </el-upload>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
        <!--规格选择栅格-->
        <div class="col-sm-5">
          <div class="spu-spec border-sm">
            <!--没有上传图片-->
            <template v-if="!imageUrl">
              <!--上传图片-->
              <div class="acea-row row-between-wrapper m-md-20 m-15">
                <div class="acea-row row-middle">
                  <span class="text-30 f-bold mr-md-20 mr-10 step-index">STEP 1:</span>
                  <span class="text-26">Upload Your Photo</span>
                  <span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                        @click="openInfo(3)">
                 <span class="pc">{{ moreInfoVisible[3] ? 'LESS INFO' : 'MORE INFO' }}</span>
                <span class="iconfont icon-down" :class="{'rotate-180': moreInfoVisible[3]}"></span>
              </span>
                </div>
                <div class="text-20 f-bold"></div>
              </div>
              <div class="mx-20 text-16 info-box" v-show="moreInfoVisible[3]">
                <p class="p-15 bg-gray-200">
                  The most convenient method in sending us your photo is to upload the photo from a picture file on your
                  computer. You can easily upload a scanned or digital photo stored on your computer by simply clicking
                  on
                  the “Choose File” button shown below and finding the file on your computer that contains your photo.
                  Double click on the file name for your photo and then the photo name will be displayed.
                </p>
              </div>
              <div class="m-md-20 m-15">
                <el-upload
                    class="upload-box"
                    :accept="fileType.join(',')"
                    :before-upload="beforeUpload"
                    :on-change="uploadChange"
                    :auto-upload="false"
                    :show-file-list="false"
                >
                  <el-button class="w-full" size="large" type="primary">Choose File</el-button>
                  <template #tip>
                    <div class="mt-10">{{ fileType.join(' , ') }} files with a size less than {{ fileSize }}MB.</div>
                  </template>
                </el-upload>
                <!--                <el-button v-else class="w-full" size="large" type="primary" @click="showLoginWindow">-->
                <!--                  Choose File-->
                <!--                </el-button>-->
              </div>

              <!--说明-->
              <div class="m-md-20 m-15 text-16 text-gray-600">
                You may also send us your photo(s) by attaching them to an email and sending it to: <a
                  :href="`mailto:${CONTACT_EMAIL}`" class="text-underline text-secondary">{{ CONTACT_EMAIL }}</a>.
                Please
                include your full name and phone number in the email. We will contact you promptly if we have any
                questions regarding your custom oil painting.
              </div>
              <div class="px-md-20 px-15 py-10 text-20">
                <span class="iconfont icon-info-fill text-20 mr-6"></span>
                <span class="f-bold">IMPORTANT NOTE:</span>
                Our artists can combine two or more photos into a single oil painting. If you plan to send us multiple
                photos, please provide a detailed explanation of which elements from each photo you’d like the artist to
                incorporate into the final painting.
                <br/><br/>
                It is crucial that the photo(s) you send us are high-resolution and detailed—ideally, larger than 200KB.
                The quality of the photo you provide will directly affect the final outcome of the portrait. A
                high-quality photo is essential for the artist to capture all the fine details in the painting.
              </div>
              <div class="px-md-20 px-15 py-10 text-20">
                <span class="iconfont icon-info-fill text-20 mr-6"></span>
                <span class="f-bold">Copyright:</span>
                You must either be the sole owner of the copyright for the photo or have the copyright owner’s
                permission to use the photo for the creation of an oil painting. please refer to the "photograph
                release" section in our terms of use agreement for more details.
              </div>
            </template>

            <!--有上传图片-->
            <template v-else>
              <el-skeleton :loading="loadingCombo && !firstLoadCombo" animated>
                <template #template>
                  <div class="m-md-20 m-15">
                    <el-skeleton-item variant="h1" style="width: 100%;"/>
                  </div>
                  <div class="m-md-20 m-15">
                    <el-skeleton-item variant="p" style="width: 100%; height: 45px"/>
                  </div>
                  <div class="m-md-20 m-15">
                    <el-skeleton-item variant="h1" style="width: 100%;"/>
                  </div>
                  <div class="m-md-20 m-15 row">
                    <div class="col-3" v-for="item in 4" :key="item">
                      <el-skeleton-item variant="image" :style="{width: '100%', height: appStore.isPc ? '5vw' : '15vw'}"/>
                      <div class="py-5">
                        <el-skeleton-item variant="h1"/>
                        <el-skeleton-item variant="p" class="mt-5" style="width: 50%"/>
                      </div>
                    </div>
                  </div>
                  <div class="m-md-20 m-15">
                    <el-skeleton-item variant="p" style="width: 100%;"/>
                    <el-skeleton-item variant="p" style="width: 100%;"/>
                    <el-skeleton-item variant="p" style="width: 100%;"/>
                  </div>
                  <div class="acea-row row-right m-md-20 m-15">
                    <el-skeleton-item variant="p" style="width: 30%;"/>
                  </div>
                  <div class="m-md-20 m-15">
                    <el-skeleton-item variant="p" style="width: 100%;"/>
                    <el-skeleton-item variant="p" style="width: 100%;"/>
                  </div>
                  <div class="m-md-20 m-15">
                    <el-skeleton-item variant="button" style="width: 100%; height: 40px;"/>
                  </div>
                </template>
                <div>

                  <!--工艺/规格选择-->
                  <!--<template v-if="route.params.work === ArtCodeEnum.Painting">
                    <div class="acea-row row-between-wrapper m-md-20 m-15">
                      <div class="acea-row row-middle flex-1 mr-10">
                        <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                        <span class="text-26">Choose a Craft</span>
                      </div>
                    </div>
                    <div class="m-md-20 m-15" ref="chooseTechniqueRef">
                      <div class="width-list row">
                        <div class="col-6">
                          <div
                            class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"
                            :class="{'border-gray-700': !isPrint}"
                            @click="chooseTechnique(false)"
                          >
                            <pre>Hand-painted oil painting</pre>
                          </div>
                        </div>
                        <div class="col-6">
                          <div
                            class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"
                            :class="{'border-gray-700': isPrint}"
                            @click="chooseTechnique(true)"
                          >
                            <pre>Print painting</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>-->

                  <!--尺寸选择-->
                  <template v-if="true">
                    <div class="acea-row row-between-wrapper m-md-20 m-15">
                      <div class="acea-row row-middle">
                        <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                        <span class="text-26">Choose a Size</span>
                        <span
                            class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                            @click="openInfo(0)"
                        >
                      <span class="pc">{{ moreInfoVisible[0] ? 'LESS INFO' : 'MORE INFO' }}</span>
                      <span class="iconfont icon-down" :class="{'rotate-180': moreInfoVisible[0]}"></span>
                    </span>
                        <!--                  <span class="text-26 text-gray-400 pc">&nbsp;&nbsp;(inches)</span>-->
                      </div>
                      <div class="text-20 f-bold">{{ currencyStore.formatToCurrency(currentSizeOption?.price || 0) }}</div>
                    </div>
                    <div class="mx-20 text-16 info-box" v-show="moreInfoVisible[0]">
                      <p class="p-15 bg-gray-200">
                        To order a custom size,
                        <a :href="`mailto:${CONTACT_EMAIL}`" class="text-underline cursor-pointer">click here</a>.
                        Our artists will create a painting in any size you require.
                      </p>
                    </div>
                    <div class="m-md-20 m-15" ref="chooseSizeRef">
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
                  </template>

                  <!--复杂层度选择-->
                  <template v-if="route.params.work === ArtCodeEnum.Painting && !isPrint">
                    <div class="acea-row row-between-wrapper m-md-20 m-15">
                      <div class="acea-row row-middle">
                        <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                        <span class="text-26">Count of {{ currentThemeOption?.name }}</span>
                        <span
                            class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                            @click="openInfo(1)"
                        >
                      <span class="pc">{{ moreInfoVisible[1] ? 'LESS INFO' : 'MORE INFO' }}</span>
                      <span class="iconfont icon-down" :class="{'rotate-180': moreInfoVisible[1]}"></span>
                    </span>
                      </div>
                      <div class="text-20 f-bold"></div>
                    </div>
                    <div class="mx-20 text-16 info-box" v-show="moreInfoVisible[1]">
                      <p class="p-15 bg-gray-200">
                        Please select the number of figures in your photo. Each person or pet/animal in a photo would be
                        counted
                        as one figure. Houses, cars, boats and travel scenery would each count as one figure.
                      </p>
                    </div>

                    <!-- Pc端复杂程度选择 -->
                    <div class="m-md-20 m-15" v-if="appStore.isPc">
                      <div class="width-list row" ref="numberPcRef">
                        <div
                            class="col-xl-average col-md-3 col-xs-4 col-6"
                            v-for="(item, index) in maxNumber"
                            :key="index"
                        >
                          <div
                              class="width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-20"
                              :class="{'border-gray-700': contentNumber === item}"
                              @click="chooseNumber(item)"
                          >
                            <pre>{{ item }}</pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 移动端复杂程度选择 -->
                    <div class="px-20 acea-row row-between-wrapper gap-base" ref="numberAppRef" v-else>
                      <div class="flex-1">
                        <el-slider
                            :show-tooltip="false"
                            v-model="contentNumberSet"
                            :step="1"
                            :max="maxNumber"
                            :min="1"
                            show-stops
                        />
                      </div>
                      <div class="flex-auto f-bold">{{ contentNumber }}</div>
                    </div>

                  </template>

                  <!--画框选择-->
                  <template v-if="true">
                    <div class="acea-row row-between-wrapper m-md-20 m-15">
                      <div class="acea-row row-middle">
                        <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                        <span class="text-26">Choose a Frame</span>
                        <!--                  <span class="text-26 text-gray-400 pc">&nbsp;&nbsp;(100+ styles)</span>-->
                      </div>
                      <div class="text-20 f-bold">{{ currencyStore.formatToCurrency(frameMoney || 0) }}</div>
                    </div>
                    <div class="m-md-20 m-15" ref="chooseFrameRef">
                      <div class="frame-scroll border-sm p-10">
                        <div class="frame-list">
                          <div
                              v-for="(item, index) in frameOptions" :key="item.id"
                              class="frame-item text-14 bg-gray-100 p-5 cursor-pointer"
                              :class="{ on: currentFrameId === item.id }"
                              @click="chooseFrame(item)"
                          >
                            <div class="frame-box">
                              <div class="frame-img aspect-ratio">
                                <img class="w-full h-full fit-cover" :src="imagePrefix(item.img!)" :alt="item.name">
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
                  </template>

                  <!--卡纸选择（选择画框并且画框支持和有卡纸选项才有）-->
                  <template v-if="hasFrame && matVisible">
                    <div class="acea-row row-between-wrapper m-md-20 m-15">
                      <div class="acea-row row-middle">
                        <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                        <span class="text-26">Choose a Canvas material</span>
                      </div>
                      <div class="text-20 f-bold">
                        {{ currencyStore.formatToCurrency(currentMaterialOption?.price || 0) }}
                      </div>
                    </div>
                    <div class="m-md-20 m-15">
                      <div class="material-wrapper border-sm p-md-20 p-15">
                        <div class="acea-row row-middle text-20 f-bold-500">
                          <p class="mr-xl-40 mr-20">Mat Color</p>
                          <p class="flex-1 line1">Crisp Bright White</p>
                        </div>
                        <div class="color-list my-md-20 my-15" ref="chooseMatColorRef">
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
                          <div class="width-list row mt-md-20 mt-15" ref="chooseMatWidthRef">
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

                  <!--备注-->
                  <div class="acea-row row-between-wrapper m-md-20 m-15">
                    <div class="acea-row row-middle">
                      <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                      <span class="text-26">Additional Notes</span>
                      <span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                            @click="openInfo(2)"
                      >
                <span class="pc">{{ moreInfoVisible[2] ? 'LESS INFO' : 'MORE INFO' }}</span>
                <span class="iconfont icon-down" :class="{'rotate-180': moreInfoVisible[2]}"></span>
              </span>
                    </div>
                    <div class="text-20 f-bold"></div>
                  </div>
                  <div class="mx-20 text-16 info-box" v-show="moreInfoVisible[2]">
                    <p class="p-15 bg-gray-200">
                      Here is where you can convey any special requests to the artist, such as removing certain aspects in
                      the
                      photo or specific color and background preferences.
                    </p>
                  </div>
                  <div class="m-md-20 m-15" ref="remarkRef">
                    <el-input
                        type="textarea"
                        v-model="remark"
                        placeholder="Please enter any additional instructions"
                        :rows="appStore.isPc ? 8 : 3"
                    />
                  </div>

                  <!--Summary-->
                  <!--<div class="acea-row row-middle px-md-20 px-15 py-10">
                    <span class="iconfont icon-info-fill text-20" />
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
                      <span class="text-26 text-error">{{ currencyStore.formatToCurrency(totalPrice || 0) }}</span>
                    </p>
                  </div>
                  <el-button
                      class="w-full add-cart__button rounded-none"
                      size="large"
                      type="danger"
                      @click="addToCart"
                  >
                    Add To Cart
                  </el-button>
                </div>
              </el-skeleton>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- How it Works -->
    <div class="container" v-show="currentView !== 'custom'">
      <p class="text-60 f-bold-500 text-center my-md-50 my-25">How it Works:</p>
      <div class="my-md-50 my-25">
        <div class="row works-list gap-row-base" v-if="appStore.isPc">
          <div class="col-lg-3 col-sm-6" v-for="item in HOW_IT_WORKS" :key="item.title">
            <div class="works-item">
              <p class="acea-row row-between-wrapper">
                <span class="text-26 f-bold">{{ item.title }}</span>
                <span class="iconfont text-50" :class="item.icon"/>
              </p>
              <p class="text-20 mt-20">{{ item.desc }}</p>
            </div>
          </div>
        </div>
        <swiper
            v-else
            slides-per-view="auto"
            :space-between="15"
            :centered-slides="true"
            :loop="true"
        >
          <swiper-slide v-for="(item, index) in HOW_IT_WORKS" :key="item.title" style="width: 80%;">
            <div class="works-item text-center relative bg-gray-100 p-10 rounded-md">
              <span class="iconfont" :class="item.icon" style="font-size: 40px;"/>
              <p class="text-26 f-bold my-20">{{ item.title }}</p>
              <p class="text-20">{{ item.desc }}</p>
              <div class="serial">{{ index + 1 }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 底部按钮 -->
    <!--:style="{ position: currentView === 'custom' ? 'relative' : 'sticky' }"-->
    <div
        class="foot-wrapper py-20"
        v-if="route.params.work === ArtCodeEnum.Painting && currentView !== 'theme'"
        :class="{ 'has-continue': currentView !== 'custom' }"
    >
      <div class="container">
        <div class="foot-inner">
          <div class="back-btn acea-row row-middle cursor-pointer" @click="handleBack">
            <span class="iconfont icon-left text-20"></span>
            <span class="text-20 f-bold">Back</span>
          </div>
          <div class="foot-center">
            <div class="foot-text text-20 f-bold text-center line1">Physically Hand-painted by Artists (Zero Printing)
            </div>
            <el-button class="foot-btn" type="primary" size="large" @click="handleContinue"
                       v-if="currentView !== 'custom'">Continue
            </el-button>
          </div>
        </div>
      </div>
    </div>

  </section>

  <ClientOnly>
    <CasePreview v-model="isShowCaseContrast" :items="caseContrastData" :index="caseIndex"/>
  </ClientOnly>

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
    <WallColor :wall-image="generatorImg" ref="wallColorRef" @close="toggleWidget(true)"/>
  </ClientOnly>

  <ClientOnly>
    <!-- 房间 -->
    <Room :wall-image="generatorImg" ref="roomRef" :pixel="pixel" v-if="generatorImg && reReckon" @close="toggleWidget(true)"/>
  </ClientOnly>

  <!-- 图片查看器 -->
  <el-image-viewer
      v-if="imgViewVisible"
      :url-list="[generatorImg]"
      @close="toggleImageViewer"
      hide-on-click-modal
  />

  <ClientOnly>
    <!-- 图片查看器 -->
    <el-image-viewer
        v-if="exampleViewVisible"
        :url-list="[imagePrefix(TECHNIQUE_EXAMPLE[route.params.work as ArtCodeType]![exampleArrIndex]!.paint)]"
        @close="exampleViewVisible = false"
        hide-on-click-modal
    />
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
import {getCombinationApi, getThemeApi} from "~/api/modules/paint/paint";
import type {IPaint} from "~/api/interface/paint/paint";
import type {UploadFile, UploadProps} from "element-plus";
import {ElMessage, ElMessageBox} from "element-plus";
import WallColor from '~/components/WallColor.vue'
import Room from '~/components/Room.vue'
import {calculateShape, cm2inch, flattenTree, getImageSize, imagePrefix, debounce, generateTitle2Slug} from "~/utils";
import type {ICustom} from "~/api/interface/custom/custom";
import {useCustomStore} from "~/stores/modules/custom";
import {useAppStore} from "~/stores/modules/app";
import LoginWindow from "~/components/LoginWindow.vue";
import {useUserStore} from "~/stores/modules/user";
import {CONTACT_EMAIL, APP_HAS_SEEN_CUSTOM_GUIDE} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {findClosestMatch} from "~/utils/calculateShape";
import {ArtCodeEnum, type ArtCodeType} from "~/types/enumeration";
import {rangeVerify} from "~/utils/matchingInterval";
import {resolvePageMeta, mergeHeadWithLodash} from "~/config/pageMeta";
import {useIndexedDBBase64} from '~/composables/useIndexedDBBase64'
import {TECHNIQUE_EXAMPLE, HOW_IT_WORKS} from "~/constant";
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {useVerticalDrag} from '~/composables/useVerticalDrag'

defineOptions({
  name: 'CustomPaint'
})

definePageMeta({
  isShowActivity: true
})

const {$bus} = useNuxtApp()
const userStore = useUserStore()
const appStore = useAppStore()
const customStore = useCustomStore()
const route = useRoute()
const router = useRouter()
const currencyStore = useCurrencyStore();
const {saveBase64} = useIndexedDBBase64()
const modules = [Autoplay, Pagination]
const functionalRef = ref<HTMLElement | null>(null)
const {
  top: functionalTop,
  enableTransition,
  onTouchStart,
  onTouchMove,
  onTouchEnd
} = useVerticalDrag(functionalRef, {initialTop: 100})

onMounted(() => {
  // 在手绘工艺下，默认选中主题
  const {work, themeId} = route.params
  if (work === ArtCodeEnum.Painting && themeId) {
    getTheme(themeId)
    currentView.value = 'style'
    viewHistory.value = ['theme']
    themeIdMap.value = [themeId]
    customStore.setCurrentView(currentView.value)
    customStore.setViewHistory(viewHistory.value)
    customStore.setThemeIdMap(themeIdMap.value)
    router.replace(`/custom-paint/${work}`)
  }
})

const moreInfoVisible = ref([false, false, false, false])
const currentView = ref('custom')
const origin = useRequestURL().origin

useHead(mergeHeadWithLodash(
    resolvePageMeta("/custom-paint", route.params.work),
    {
      link: [
        {rel: 'canonical', href: `${origin}/custom-paint/${route.params.work}`}
      ],
      meta: [
        {name: 'robots', content: route.params.themeId ? 'noindex, follow' : 'index, follow'}
      ]
    }
))

const reReckon = ref(false) // 重新识别
const handleImageChange = () => {
  reReckon.value = false
  nextTick(() => {
    reReckon.value = true
  })
}

const squareImageUrl = ref('') // 1:1图片
const generatorImg = ref('') // 最终图片
const pixel = ref({width: 0, height: 0}) // 最终尺寸
const imgViewVisible = ref(false)
const centerDialogVisible = ref(false)
const remark = ref('') // 备注
const exampleViewVisible = ref(false)
const exampleArrIndex = ref(0)
const handleExample = (index: number) => {
  exampleArrIndex.value = index;
  exampleViewVisible.value = true
}
const openInfo = (index: number) => {
  moreInfoVisible.value[index] = !moreInfoVisible.value[index]
}

let firstLoadCombo = false
const loadingCombo = ref(false) // 组合加载中

/**
 * 获取组合
 * @param senior - 开启高级比较
 */
const getCombination = async (senior = false) => {
  loadingCombo.value = true
  const {data} = await getCombinationApi({
    code: finalCode.value,
    ratio: ratio.value,
    dimensionId: currentSizeId.value || null,
  })
  sizeOptions.value = data.size // 尺寸选项
  innerFrame.value = data.parts.inner_frame[0] // 内框单项
  frameOptions.value = [
    notFrame,
    innerFrame.value,
    ...data.parts?.frame,
  ] // 画框选项

  // 是否可以选择卡纸
  hasMat.value = !!data.parts?.mat?.length
  if (hasMat.value) {
    materialOptions.value = [
      ...data.parts?.mat || [],
      noMat
    ] // 卡纸选项
  } else {
    materialOptions.value = [] // 卡纸选项
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
  if (!firstLoadCombo) {
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

  !firstLoadCombo && initShowGuide() // 开启引导

  firstLoadCombo = true
  loadingCombo.value = false
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
      return price + surcharge
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

// 允许上传的文件类型
const fileType = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg']
const fileSize = 15
const imageUrl = ref('')

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload: UploadProps['beforeUpload'] = rawFile => {
  const imgSize = rawFile.size / 1024 / 1024 < fileSize;
  const imgType = fileType.includes(rawFile.type);
  if (!imgType) ElMessage.warning('The uploaded image does not conform to the required format!');
  if (!imgSize) ElMessage.warning(`The size of the uploaded image cannot exceed ${fileSize}MB！`);
  return imgType && imgSize;
};

/**
 * @description 监听图片上传
 * */
const uploadChange = async (file: UploadFile) => {
  const {width, height} = await getImageSize(file)
  shapeStr.value = calculateShape({width, height})
  ratio.value = findClosestMatch(width, height)
  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result as string;
  };
  reader.readAsDataURL(file.raw as Blob); // 把 File 转成 base64
  firstLoadCombo = false
  await getCombination()
}
// 是否有卡纸选项（多了个画框配置中是否支持卡纸）
const matVisible = computed(() => {
  return currentFrameOption.value?.config?.matSupport && hasMat.value
})

// 总价
const totalPrice = computed(() => {
  const sizePrice = currentSizeOption.value?.price || 0
  const framePrice = frameMoney.value || 0
  const matPrice = !!currentMaterialId.value && hasFrame.value ? (currentMaterialOption.value?.price || 0) : 0
  return Number(sizePrice) + Number(framePrice) + Number(matPrice)
})

// 当前选择的形状
const shapeStr = ref<Dict.ShapeType>('slim')
const ratio = ref('')

// 价格详情弹窗
const checkButtonRef = ref()
const checkPopoverRef = ref()
const onClickOutside = () => {
  unref(checkPopoverRef).popperRef?.delayHide?.()
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

// 生成步骤索引
const generateStepIndex = () => {
  if (!import.meta.client) return
  nextTick(() => {
    const el = document.documentElement.getElementsByClassName('step-index')
    Array.from(el).forEach((item, index) => {
      item.textContent = `STEP ${index + 1}:`
    })
  })
}

const themeIdMap = ref<string[]>([]) // 当前选中的ID集合
const viewHistory = ref<string[]>([]) // 步骤历史记录
const switchStep = (targetView: string) => {
  viewHistory.value.push(currentView.value);
  currentView.value = targetView
  customStore.setCurrentView(currentView.value)
  customStore.setViewHistory(viewHistory.value)
}

// 获取主题
const favoriteMainRef = ref<HTMLDivElement>()
const themeLoading = ref(false)
const themeOptions = ref<IPaint.ThemeRow[]>([])
const getTheme = async (id: string) => {
  themeLoading.value = true
  const {data} = await getThemeApi(id)
  themeLoading.value = false
  if (id === '0') {
    themeOptions.value = data
  } else {
    // 查找匹配节点并更新children
    const allNodes = flattenTree(themeOptions.value)
    const targetNode = allNodes.find(n => n.id === id)
    if (targetNode) {
      targetNode.children = data
      themeOptions.value = [...themeOptions.value] // 触发响应式更新
    }
  }
  customStore.setThemeOptions(themeOptions.value)
  return []
}

// 选择主题
const currentThemeOption = computed(() => themeOptions.value.find(item => item.id === themeIdMap.value[0]))
const chooseTheme = (themeId: string) => {
  setThemeIdMap(themeId, 0)
  getTheme(themeId)
  switchStep('style')
}

// 选择风格
const chooseStyle = (styleId: string) => {
  if (themeIdMap.value[1] === styleId) {
    switchStep('custom')
  } else {
    setThemeIdMap(styleId, 1)
    imageUrl.value = ''
  }
}

const setThemeIdMap = (id: string, index: number) => {
  themeIdMap.value[index] = id
  customStore.setThemeIdMap(themeIdMap.value)
}

// 获取人头数量应该获取的Code选项
const getFavoriteReference = computed(() => {
  if (!lastThemeObj.value) return null
  const reference = lastThemeObj.value.reference || []
  if (!reference.length) return null;
  for (const item of reference) {
    if (rangeVerify(contentNumber.value, item.contentInterval)) {
      return item
    }
  }
  return null
})

// 获取喜欢的风格预览图
const seeMoreSample = async (item: IPaint.ThemeRow) => {
  const { id, name } = item
  const slug = generateTitle2Slug(name)
  router.push(`/custom-case/${id}/${slug}`)
}

const caseIndex = ref(-1)
const isShowCaseContrast = ref(false)
const caseContrastData = ref<IPaint.SampleRow[]>([])
const showCaseContrast = (item: IPaint.SampleRow[], index: number) => {
  caseContrastData.value = item
  isShowCaseContrast.value = true
  caseIndex.value = index
}

// 复杂程度选择
const maxNumber = 10
const contentNumber = ref(1)
const contentNumberSet = computed({
  get: () => contentNumber.value,
  set: debounce((val: number) => {
    chooseNumber(val)
  }, 150)
})
const chooseNumber = (num: number) => {
  const preCode = finalCode.value
  contentNumber.value = num
  if (preCode !== getFavoriteReference.value.code) {
    getCombination()
  }
}

// 点击继续
const handleContinue = () => {
  if (currentView.value === 'style') {
    if (!themeIdMap.value[1]) {

      ElMessageBox.alert('Please choose a style you love before moving to the next step!', 'Style Required', {
        callback: () => {
          const offset = document.getElementById('header-placeholder')!.getBoundingClientRect().height
          const top = favoriteMainRef.value?.getBoundingClientRect().top + window.scrollY - offset

          window.scrollTo({
            top,
            behavior: 'smooth'
          })

        }
      })
      return
    } else {
      switchStep('custom')
      return
    }
  }
}

// 返回上一步
const handleBack = () => {
  // 没有视图历史就不用处理了
  if (viewHistory.value.length <= 0) return

  // 1. 删除最后一个视图，并更新当前 view
  currentView.value = viewHistory.value.pop()
  customStore.setCurrentView(currentView.value)
  customStore.setViewHistory(viewHistory.value)

  // 2. 保证 themeIdMap 和 viewHistory 长度一致
  //    - 如果一样长 → pop() 删除最后一个即可
  //    - 如果 theme 比 view 多 → 截取至相同长度
  if (themeIdMap.value.length > viewHistory.value.length) {
    themeIdMap.value.length = viewHistory.value.length
  } else {
    themeIdMap.value.pop()
  }
  customStore.setThemeIdMap(themeIdMap.value)
}

// 重置
const reset = () => {
  firstLoadCombo = false
  imageUrl.value = ''
  generatorImg.value = ''
  currentSizeId.value = ''
  currentFrameId.value = ''
  currentMaterialId.value = ''

  currentView.value = 'custom'
  viewHistory.value = []
  themeIdMap.value = []
  caseContrastData.value = []
  contentNumber.value = 1
  isPrint.value = false

  if (route.params.work !== ArtCodeEnum.Painting) {
    currentView.value = 'custom'
  } else {
    currentView.value = customStore.currentView || 'theme'
    viewHistory.value = customStore.viewHistory || []
    themeIdMap.value = customStore.themeIdMap || []

    if (customStore.themeOptions.length) {
      themeOptions.value = customStore.themeOptions
    } else {
      getTheme('0')
    }
  }
}

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
  if (route.params.work === ArtCodeEnum.Painting && lastThemeObj.value) {
    specs['Style'] = lastThemeObj.value.name
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
    'Mat width': currentMaterialWidth.value + '″',
  }
  return parts
})

const isPrint = ref(false) // 工艺是否选中喷绘
const chooseTechnique = (flag: boolean) => {
  isPrint.value = flag
  getCombination(true)
}

// 最后选择的主题
const lastThemeObj = computed(() => {
  const lastId = themeIdMap.value[themeIdMap.value.length - 1]  // 获取到最后一个ID
  if (!lastId) return {}
  const allNodes = flattenTree(themeOptions.value)
  const targetNode = allNodes.find(n => n.id === lastId)
  return targetNode || {}
})

// 最终提交到后台的Code
const finalCode = computed(() => {
  const {work} = route.params;
  const isPainting = work === ArtCodeEnum.Painting;
  if (isPainting && isPrint.value) return ArtCodeEnum.Prints;
  if (isPainting && getFavoriteReference.value) return getFavoriteReference.value.code;
  return work;
})

// 添加购物车
const addToCart = () => {
  if (!imageUrl.value) return ElMessage.warning('Please upload the image first!')

  // if (!userStore.isLogin) {
  //   showLoginWindow()
  //   return
  // }

  // 存进 IndexedDB，值保存健名到 pinia
  const previewIndexDbKey = `preview-${Date.now()}`, originalIndexDbKey = `original-${Date.now()}`;
  saveBase64(previewIndexDbKey, generatorImg.value)
  saveBase64(originalIndexDbKey, imageUrl.value)

  const cartRow: ICustom.ShoppingCartsStorageRow = {
    code: finalCode.value, // 画芯代码
    previewImg: previewIndexDbKey, // 预览图片（只保存 IndexedDB 键）
    originalImg: originalIndexDbKey, // 原图 （只保存 IndexedDB 键）
    title: 'Photo to art', // 商品标题
    specs: specs.value, // 商品规格值
    dimensionId: currentSizeId.value, // 尺寸编号
    parts: parts.value, // 商品配件
    quantity: 1, // 购买数量
    actualAmount: totalPrice.value, // 实际支付金额
    remark: remark.value, // 备注
    contentNumber: contentNumber.value || null, // 人头数量
    themeId: lastThemeObj.value.id || null,
  }

  customStore.addition(cartRow)

  router.push('/checkout-custom')
}

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

const toggleImageViewer = () => {
  toggleWidget(imgViewVisible.value)
  imgViewVisible.value = !imgViewVisible.value
}

const toggleWidget = (flag: boolean) => {
  if (flag) {
    window.Tawk_API.showWidget()
  } else {
    window.Tawk_API.hideWidget();
  }
}

watch(() => route.fullPath,
    () => {
      reset()
    }, {immediate: true}
)

watch(() => currentView.value, () => {
  if (process.server) return
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })
})

const appSticky = ref(true)
const openTour = ref(false)
const chooseTechniqueRef = ref<HTMLElement | null>(null)
const chooseSizeRef = ref<HTMLElement | null>(null)
const numberPcRef = ref<HTMLElement | null>(null)
const numberAppRef = ref<HTMLElement | null>(null)
const chooseFrameRef = ref<HTMLElement | null>(null)
const chooseMatColorRef = ref<HTMLElement | null>(null)
const chooseMatWidthRef = ref<HTMLElement | null>(null)
const remarkRef = ref<HTMLElement | null>(null)
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
const initShowGuide = () => {
  if (process.server) return;
  if (localStorage.getItem(APP_HAS_SEEN_CUSTOM_GUIDE) === 'true') return
  beginGuide()
  localStorage.setItem(APP_HAS_SEEN_CUSTOM_GUIDE, 'true')
}
// 参数顺序：[显示条件, 目标Ref, 标题, 描述, 额外配置(可选)]
const createStep = (condition: boolean, target: any, title: string, description: string, extras: Record<string, any> = {}) => {
  if (!condition) return null
  // 自动组装对象
  return { target, title, description, ...extras }
}
const tourSteps = computed(() => {
  const steps = [
    createStep(false, chooseTechniqueRef.value, 'Choose Craftsmanship', 'Select the material and texture that best suits your style.'),
    createStep(true, chooseSizeRef.value, 'Choose Size', 'Pick the perfect dimensions to fit your space.'),
    createStep(route.params.work === ArtCodeEnum.Painting && !isPrint.value,appStore.isPc ? numberPcRef.value : numberAppRef.value,'Choose Subject Count','Specify the number of people or objects in your photo to determine the complexity.' ),
    createStep(true, chooseFrameRef.value, 'Choose Frame', 'Complete the look with one of our premium frames.'),
    createStep(hasFrame.value && matVisible.value, chooseMatColorRef.value, 'Choose Mat Color', 'Choose a mat tone that perfectly compliments your image.'),
    createStep(hasFrame.value && matVisible.value && (currentMaterialWidthOption.value?.length > 0), chooseMatWidthRef.value,'Choose Mat Width','Set the thickness of the mat border to balance your artwork within the frame.'),
    createStep(true, remarkRef.value, 'Add Notes', 'Instructions for edits, colors, or background changes.'),
  ]
  return steps.filter(Boolean)
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

  .portrait-wrapper {
    img {
      height: 60px;
    }
  }

  .spu-wrapper {
    position: relative;
    row-gap: var(--gutter-base);

    .sticky-column {
      position: sticky;
      top: 150px;
      z-index: 10;
    }

    .spu-preview {
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
      overflow: hidden;

      .frame-scroll {
        max-height: 427px;
        overflow: auto;

        .frame-list {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-gap: 10px;

          .frame-item {
            position: relative;
            background: var(--color-gray-100);

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

  .upload-box :deep(.el-upload) {
    width: 100%;

    &:focus,
    &:active {
      color: unset !important;
    }
  }

  .works-list {
    --gutter: var(--gutter-xl);
  }

  .works-item {
    position: relative;
    overflow: hidden;

    .serial {
      position: absolute;
      //z-index: -1;
      font-size: 100px;
      left: 50%;
      top: 50%;
      color: rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }

  .style-list {
    .style-item {
      position: relative;
      overflow: hidden;
      cursor: pointer;

      .p-img {
        width: 100%;
        transition: all 0.3s ease-in-out;
      }

      .p-text {
        position: absolute;
        z-index: 3;
        left: 0;
        top: 32%;
        width: 100%;
        text-align: center;
        color: #fff;
        font-weight: 500;
      }

      .p-btn {
        position: absolute;
        z-index: 3;
        left: 50%;
        bottom: 8.57%;
        transform: translateX(-50%);
        color: #fff;
        font-weight: 500;
        padding: 3.43%;
        white-space: nowrap;
      }

      &::before {
        content: "";
        position: absolute;
        z-index: 2;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
      }

      &:hover {
        .p-img {
          transform: scale(1.1);
        }
      }
    }
  }

  .case-list {
    .case-item {
      .case-content {
        display: grid;
        grid-column-gap: 15px;
        grid-row-gap: 15px;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(5, 1fr);
        width: 100%;
        height: 31.04vw;

        .item {
          border-radius: 1px;
          overflow: hidden;
          cursor: pointer;
        }

        .item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 3;
        }

        .item:nth-child(2) {
          grid-area: 1 / 3 / 2 / 5;
        }

        .item:nth-child(3) {
          grid-area: 1 / 5 / 2 / 6;
        }

        .item:nth-child(4) {
          grid-area: 2 / 3 / 3 / 4;
        }

        .item:nth-child(5) {
          grid-area: 2 / 4 / 3 / 6;
        }
      }
    }

    .case-item:nth-child(even) {
      .case-content {

        .item:nth-child(1) {
          grid-area: 1 / 1 / 2 / 3;
        }

        .item:nth-child(2) {
          grid-area: 1 / 3 / 2 / 4;
        }

        .item:nth-child(3) {
          grid-area: 2 / 1 / 3 / 2;
        }

        .item:nth-child(4) {
          grid-area: 2 / 2 / 3 / 4;
        }

        .item:nth-child(5) {
          grid-area: 1 / 4 / 3 / 6
        }
      }
    }
  }

  .favorite-list {
    .favorite-item {
      position: relative;
      overflow: hidden;

      .p-title {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        background: rgba(0, 0, 0, 0.30);
        font-weight: bold;
      }

      .p-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.6);
        transition: all ease-in-out 0.3s;

        .p-text {
          width: 100%;
          text-align: center;
          color: #fff;
          font-weight: bold;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease-in-out 0.3s;
        }

        .p-desc {
          flex: 1;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;

          p {
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.5s ease-in-out 0.3s;
            word-break: break-all;
          }
        }

        .p-btn {
          display: inline-block;
          margin: auto;
          color: #fff;
          border: 1px solid #fff;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease-in-out 0.3s;
        }
      }

      .tips {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(15px);

        //left: 50%;
        //top: 50%;
        //transform: translate(-50%, -50%) rotate(-45deg);
        //color: rgba(255, 255, 255, 0.6);
        //text-shadow: -2px 2px 3px rgba(90, 85, 85, 0.6);
      }

      &.on {

        .p-title {
          display: none;
        }

        .p-content {
          top: 0;

          .p-text {
            opacity: 1;
            transform: translateY(0);
          }

          .p-desc {
            p {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .p-btn {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
  }

  .foot-wrapper {
    position: sticky;
    z-index: 22;
    bottom: 0;
    left: 0;
    background: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);

    .foot-inner {
      position: relative;

      .back-btn {
        position: absolute;
        left: 0;
        top: 0;
      }

      .foot-center {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .foot-text {
          padding: 0 60px;
          max-width: 600px;
        }
      }
    }

    &.has-continue {
      .foot-inner {

        .back-btn {
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }


  }

  .case-waterfall {
    column-count: 3;
    column-gap: 15px;

    .item {
      break-inside: avoid; /* 防止内容被分割到不同列 */
      margin-bottom: 15px;
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

  @media (max-width: 1460px) {
    .spu-wrapper .spu-spec {
      .frame-scroll {
        .frame-list {
          grid-template-columns: repeat(5, 1fr);
          grid-gap: 5px;
        }
      }
    }

    .works-list {
      --gutter: var(--gutter-lg);
    }
  }

  @media (max-width: 1260px) {
    .spu-wrapper .spu-spec {
      .frame-scroll {
        max-height: 350px;

        .frame-list {
          grid-template-columns: repeat(4, 1fr);
        }
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

    .works-list {
      --gutter: var(--gutter-md);
    }
  }

  @media (max-width: 991px) {
    .works-list {
      --gutter: var(--gutter-base);
    }
  }

  @media (max-width: 768px) {
    .spu-wrapper .spu-spec {
      .frame-scroll {
        max-height: unset;

        .frame-list {
          display: flex;
          grid-template-columns: unset;
          flex-wrap: nowrap;

          .frame-item {
            width: 65px;
            flex-shrink: 0;
          }

        }
      }
    }

    .foot-wrapper {

      .foot-inner {
        .foot-center {
          flex-direction: column;
          row-gap: 20px;

          .foot-text {
            padding: 0 30px;
            order: 2;
          }

          .foot-btn {
            order: 1;
          }
        }
      }

      &.has-continue {
        .foot-inner {
          .back-btn {
            top: 11px;
            transform: unset;
          }
        }
      }
    }

    .case-list .case-item {
      .case-content {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(5, 1fr);
        height: 150.4vw;
        grid-column-gap: 8px;
        grid-row-gap: 8px;

        .item:nth-child(1) {
          grid-area: 1 / 1 / 4 / 7;
        }

        .item:nth-child(2) {
          grid-area: 4 / 1 / 5 / 5;
        }

        .item:nth-child(3) {
          grid-area: 4 / 5 / 5 / 7;
        }

        .item:nth-child(4) {
          grid-area: 5 / 1 / 6 / 3;
        }

        .item:nth-child(5) {
          grid-area: 5 / 3 / 6 / 7;
        }
      }

      &:nth-child(even) .case-content {

        .item:nth-child(1) {
          grid-area: 4 / 3 / 5 / 7;
        }

        .item:nth-child(2) {
          grid-area: 4 / 1 / 5 / 3;
        }

        .item:nth-child(3) {
          grid-area: 5 / 5 / 6 / 7;
        }

        .item:nth-child(4) {
          grid-area: 5 / 1 / 6 / 5;
        }

        .item:nth-child(5) {
          grid-area: 1 / 1 / 4 / 7;

        }
      }
    }

    .case-waterfall {
      column-count: 2;
    }
  }

  @media (max-width: 414px) {
    .foot-wrapper .foot-inner .foot-center .foot-text {
      max-width: 270px;
      padding: 0 20px;
    }
  }
</style>