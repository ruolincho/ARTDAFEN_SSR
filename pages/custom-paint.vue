<template>
  <!--规格选择-->
  <section>
    <div class="container">
      <div class="my-md-50 my-25 portrait-wrapper acea-row row-center-wrapper gap-column-md gap-row-sm">
        <img src="~/assets/images/logo-portrait.png" alt="logo-portrait">
        <span
          class="text-20">Your exclusive art customization service is now available. Discover timeless creations.</span>
      </div>
    </div>

    <!-- 主题 -->
    <div class="container" v-show="currentView === 'theme'">
      <div class="text-center py-lg-40 py-30">
        <h1 class="text-50">TRANSFORM YOUR PHOTOS INTO STUNNING ARTWORKS</h1>
        <p class="mt-20 text-gray-600 text-20 f-bold-500">
          With Our Artists' Creation, Any Photo Can Be Turned Into An Elaborately Crafted Artwork. Choose From A Variety
          Of Unique Styles You Desire, And You'll Get Professional-Grade Results.
        </p>
      </div>

      <div class="row gap-row-base style-list">
        <div class="col-lg-average col-md-3 col-sm-4 col-6" v-for="item in themeOptions" :key="item.id">
          <div class="style-item" :class="{on: themeIdMap[0] === item.id}" @click="chooseTheme(item, 0)">
            <img class="p-img aspect-ratio" :src="imagePrefix(item.img)" alt="">
            <p class="p-text text-30">{{ item.name }}</p>
            <div class="p-btn border-white border-md">CUSTOMIZE NOW</div>
          </div>
        </div>
      </div>

      <div class="text-center py-lg-40 py-30">
        <h1 class="text-50">MORE CASE STUDIES</h1>
      </div>

      <div class="case-list">
        <div class="case-item" v-for="item in themeOptions" :key="item.id">
          <div class="acea-row row-between-wrapper f-bold-500 py-20">
            <span class="text-uppercase text-26">{{ item.name }}</span>
            <span class="text-uppercase text-underline text-20 text-gray-600 cursor-pointer"
                  @click="seeMoreSample(item.id)">see more</span>
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
          <el-button class="w-full mt-15" type="primary" size="large" @click="chooseTheme(item)">Customize Now
          </el-button>
        </div>
      </div>
    </div>

    <!-- 全部案例 -->
    <div class="container" v-show="currentView === 'case'">
      <div class="text-center py-lg-40 py-30">
        <h1 class="text-50">CUSTOM PORTRAIT SHOWCASE — FROM YOUR PHOTO TO ART</h1>
        <p class="mt-20 text-gray-600 text-20 f-bold-500 text-capitalize">
          Discover how an ordinary photo transforms into extraordinary art. <br/> In our Custom Portrait Showcase,
          you’ll see
          real examples of before-and-after results — side-by-side comparisons revealing the remarkable detail, color,
          and emotion that our artists bring to life.
        </p>
      </div>
      <div class="case-waterfall">
        <div class="item cursor-pointer overflow-hidden" v-for="(sample, index) in caseContrastData" :key="sample.id"
             @click="showCaseContrast(caseContrastData, index)">
          <img class="w-full img-hover " :src="imagePrefix(sample.paintImg)" alt="">
        </div>
      </div>
    </div>

    <!-- 风格 -->
    <div class="container" v-show="currentView === 'style'">
      <div class="text-center py-lg-40 py-30">
        <h1 class="text-50">CHOOSE YOUR FAVORITE STYLE</h1>
        <p class="mt-20 text-gray-600 text-20 f-bold-500">
          From Classic Oil Paintings, Artist Styles, Disney Magic, Modern Anime Aesthetics, Vibrant Anime Styles, Dreamy
          Ghibli Styles, Big-Eye Portrait Styles To Modern Retro Styles, Browse Our Rich Collection Of Styles. Each
          Effect Is Carefully Designed And Created To Endow Your Photos With A Unique Texture — Whether You're Pursuing
          A Soft Aesthetic Vibe Or A Dramatic Fantasy Feel. Find The Perfect Transformation And Creation Method For Your
          Photos.
        </p>
      </div>
      <div class="row favorite-list gap-row-base">
        <div class="col-lg-3 col-sm-4 col-6" v-for="item in currentThemeOption?.children" :key="item.id">
          <div class="favorite-item" :class="{ 'on': themeIdMap[1] === item.id }" @click="chooseStyle(item)">
            <img class="w-full aspect-ratio" :src="imagePrefix(item.img)" alt="">
            <p class="p-text text-28 line1 p-sm-20 p-15">{{ item.name }}</p>
            <div class="p-content">
              <p class="text-24 line5">{{ item.intro }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义 -->
    <div class="container" v-show="currentView === 'custom'">
      <ClientOnly>
        <!--移动端-->
        <div class="app-preview aspect-ratio" style="" v-if="!appStore.isPc && imageUrl">
          <div class="img-wrapper acea-row row-center-wrapper flex-1 scroll-y">
            <ImageGenerator
              v-model="generatorImg"
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
            />
          </div>
          <el-upload
            class="upload-box"
            :accept="fileType.join(',')"
            :before-upload="beforeUpload"
            :on-change="uploadChange"
            :auto-upload="false"
            :show-file-list="false"
          >
            <div class="btn">Re-upload the image</div>
          </el-upload>
        </div>
      </ClientOnly>

      <div class="spu-wrapper row">
        <div class="col-sm-6">
          <ClientOnly>
            <!--示例图-->
            <div class="example-preview sticky-column" v-if="!imageUrl">
              <template v-if="route.query.work === ArtCode.Painting && lastThemeObj">
                <div class="p-md-20 p-15 border-sm acea-row row-center-wrapper">
                  <div class="favorite-list" style="max-width: 450px">
                    <div class="favorite-item">
                      <img class="w-full aspect-ratio" :src="imagePrefix(lastThemeObj.img)" alt="">
                      <p class="p-text text-28 line1 p-sm-20 p-15">{{ lastThemeObj.name }}</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="example-preview-box row" v-for="(example, index) in exampleArr[route.query.work as CodeType]"
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
                </div>
                <div class="p-md-20 p-15">
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
        <div class="col-sm-6">
          <div class="spu-spec border-sm">
            <!--没有上传图片-->
            <template v-if="!imageUrl">
              <!--上传图片-->
              <div class="acea-row row-between-wrapper p-md-20 p-15">
                <div class="acea-row row-middle">
                  <span class="text-30 f-bold mr-md-20 mr-10 step-index">STEP 1:</span>
                  <span class="text-26">Upload Your Photo</span>
                  <span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                        @click="openInfo(3)">
                 <span class="pc">{{ moreInfoVisible[3] ? 'LESS INFO' : 'MORE INFO' }}</span>
                <span class="iconfont icon-down"></span>
              </span>
                </div>
                <div class="text-20 f-bold"></div>
              </div>
              <div class="mx-20 text-16 info-box" :style="{ maxHeight: moreInfoVisible[3] ? '1000px' : '0px' }">
                <p class="p-15 bg-gray-200">
                  The most convenient method in sending us your photo is to upload the photo from a picture file on your
                  computer. You can easily upload a scanned or digital photo stored on your computer by simply clicking
                  on
                  the “Choose File” button shown below and finding the file on your computer that contains your photo.
                  Double click on the file name for your photo and then the photo name will be displayed.
                </p>
              </div>
              <div class="p-md-20 p-15">
                <el-upload
                  v-if="userStore.isLogin"
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
                <el-button v-else class="w-full" size="large" type="primary" @click="showLoginWindow">Choose File
                </el-button>
              </div>

              <!--说明-->
              <div class="p-md-20 p-15 text-16 text-gray-600">
                You may also send us your photo(s) by attaching them to an email and sending it to: <a
                :href="`mailto:${CONTACT_EMAIL}`" class="text-underline text-secondary">{{ CONTACT_EMAIL }}</a>. Please
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
              <!--工艺/规格选择-->
              <template v-if="route.query.work === ArtCode.Painting">
                <div class="acea-row row-between-wrapper p-md-20 p-15">
                  <div class="acea-row row-middle flex-1 mr-10">
                    <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                    <span class="text-26">Choose a Craft</span>
                  </div>
                </div>
                <div class="p-md-20 p-15">
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
              </template>

              <!--尺寸选择-->
              <div class="acea-row row-between-wrapper p-md-20 p-15">
                <div class="acea-row row-middle">
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

              <!--复杂层度选择-->
              <template v-if="route.query.work === ArtCode.Painting && !isPrint">
                <div class="acea-row row-between-wrapper p-20">
                  <div class="acea-row row-middle">
                    <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                    <span class="text-26">Number of {{ currentThemeOption?.name }} in Your Photo</span>
                    <span
                      class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                      @click="openInfo(1)"
                    >
                  <span class="pc">{{ moreInfoVisible[1] ? 'LESS INFO' : 'MORE INFO' }}</span>
                    <span class="iconfont icon-down"></span>
                  </span>
                  </div>
                  <div class="text-20 f-bold"></div>
                </div>
                <div class="mx-20 text-16 info-box" :style="{ maxHeight: moreInfoVisible[1] ? '1000px' : '0px' }">
                  <p class="p-15 bg-gray-200">
                    Please select the number of figures in your photo. Each person or pet/animal in a photo would be
                    counted
                    as one figure. Houses, cars, boats and travel scenery would each count as one figure.
                  </p>
                </div>
                <div class="p-20">
                  <div class="width-list row">
                    <div
                      class="col-xl-average col-md-3 col-xs-4 col-6"
                      v-for="(item, index) in 10"
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
              </template>

              <!--备注-->
              <div class="acea-row row-between-wrapper p-md-20 p-15">
                <div class="acea-row row-middle">
                  <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                  <span class="text-26">Additional Notes</span>
                  <span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                        @click="openInfo(2)"
                  >
                <span class="pc">{{ moreInfoVisible[2] ? 'LESS INFO' : 'MORE INFO' }}</span>
                <span class="iconfont icon-down"></span>
              </span>
                </div>
                <div class="text-20 f-bold"></div>
              </div>
              <div class="mx-20 text-16 info-box" :style="{ maxHeight: moreInfoVisible[2] ? '1000px' : '0px' }">
                <p class="p-15 bg-gray-200">
                  Here is where you can convey any special requests to the artist, such as removing certain aspects in
                  the
                  photo or specific color and background preferences.
                </p>
              </div>
              <div class="p-md-20 p-15">
                <el-input
                  type="textarea"
                  v-model="remark"
                  placeholder="Please enter any additional instructions"
                  :rows="8"
                />
              </div>

              <!--画框-->
              <div class="acea-row row-between-wrapper p-md-20 p-15">
                <div class="acea-row row-middle">
                  <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                  <span class="text-26">Choose a Frame</span>
                  <span class="text-26 text-gray-400 pc">&nbsp;&nbsp;(100+ styles)</span>
                </div>
                <div class="text-20 f-bold">{{ currencyStore.formatToCurrency(frameMoney || 0) }}</div>
              </div>
              <div class="p-md-20 p-15">
                <div class="frame-scroll scroll-y border-sm p-10">
                  <div class="frame-list row">
                    <div class="col-2xl-2 col-xl-average col-md-3 col-xs-3 col-4"
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
                            {{ currencyStore.formatToCurrency(Number(item.price) + Number(item.surcharge) || 0) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--卡纸选择（选择画框并且画框支持和有卡纸选项才有）-->
              <template v-if="hasFrame && matVisible">
                <div class="acea-row row-between-wrapper p-md-20 p-15">
                  <div class="acea-row row-middle">
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
              <el-button class="w-full" size="large" type="danger" @click="addToCart">Add To Cart</el-button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- How it Works -->
    <div class="container" v-show="currentView !== 'custom'">
      <p class="text-60 f-bold-500 text-center my-md-50 my-25">How it Works:</p>
      <div class="row works-list gap-row-base  my-md-50 my-25">
        <div class="col-lg-3 col-md-6">
          <div>
            <p class="acea-row row-between-wrapper">
              <span class="text-26 f-bold">Choose Subject</span>
              <span class="iconfont icon-album text-50"/>
            </p>
            <p class="text-20 mt-20">
              Pick your most cherished Subject(s). For best quality, choose an image that is clear, in focus,
              and large enough to see the details.
            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div>
            <p class="acea-row row-between-wrapper">
              <span class="text-26 f-bold">Choose Style</span>
              <span class="iconfont icon-magic-pen text-50"/>
            </p>
            <p class="text-20 mt-20">
              Pick the medium for your artist to use when creating your portrait, from charcoal to oils. Then choose
              your desired background.
            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div>
            <p class="acea-row row-between-wrapper">
              <span class="text-26 f-bold">Upload Photos</span>
              <span class="iconfont icon-upload-pictures text-50"/>
            </p>
            <p class="text-20 mt-20">
              Upload your photos when you place your order or send them to us by email. You can even request to
              combine multiple images into one.
            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div>
            <p class="acea-row row-between-wrapper">
              <span class="text-26 f-bold">Place Order</span>
              <span class="iconfont icon-color-palette text-50"/>
            </p>
            <p class="text-20 mt-20">
              After checkout, you will receive an order number and a detailed email with what to expect next. Time to
              get excited about your custom portrait!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div
      class="foot-wrapper"
      :style="{ position: currentView === 'custom' ? 'relative' : 'sticky' }"
      v-if="route.query.work === ArtCode.Painting && currentView !== 'theme'"
    >
      <div class="container">
        <div class="foot-inner py-20">
          <div class="back-btn acea-row row-middle cursor-pointer" @click="handleBack" v-show="currentView !== 'theme'">
            <span class="iconfont icon-left text-20"></span>
            <span class="text-20 f-bold">Back</span>
          </div>
          <span class="text-20 f-bold">Online proofing | Unlimited revisions | 100% satisfaction before painting</span>
          <el-button
            type="primary"
            size="large"
            @click="handleContinue"
            v-if="currentView !== 'custom'"
          >
            Continue
          </el-button>
        </div>
      </div>
    </div>
  </section>

  <ClientOnly>
    <div class="case-preview" v-show="isShowCaseContrast">
      <div class="wrapper">
        <div class="main-swiper-wrapper">
          <swiper
            class="main-swiper"
            :modules="modules"
            :navigation="{ nextEl: '.main-next', prevEl: '.main-prev' }"
            :thumbs="{ swiper: thumbsSwiper }"
            @swiper="onSwiper"
          >
            <swiper-slide
              v-for="item in caseContrastData"
              :key="item.id + '_main'"
            >
              <div class="contrast-wrapper">
                <div class="contrast-item">
                  <div class="header text-18 py-12 line1">🖼️ OUR PAINTING</div>
                  <div class="content">
                    <img class="w-full h-full fit-cover" :src="imagePrefix(item.paintImg)" alt=""/>
                  </div>
                </div>
                <div class="contrast-item">
                  <div class="header text-18 py-12 line1">📸 ORIGINAL PHOTO</div>
                  <div class="content">
                    <img class="w-full h-full fit-cover" :src="imagePrefix(item.actualImg)" alt=""/>
                  </div>
                </div>
              </div>

            </swiper-slide>
          </swiper>
          <div class="main-button main-next swiper-button-next"></div>
          <div class="main-button main-prev swiper-button-prev"></div>
        </div>
        <div class="thumb-swiper-wrapper" v-if="appStore.isPc">
          <swiper
            class="thumb-swiper"
            :modules="modules"
            :space-between="10"
            @swiper="setThumbsSwiper"
            :breakpoints="{
            767: {
              slidesPerView: 5,
            },
            990: {
              slidesPerView: 6,
            },
            1260: {
              slidesPerView: 8,
            },
          }"
          >
            <swiper-slide
              v-for="item in caseContrastData"
              :key="item.id + '_thumb'"
            >
              <img class="w-full h-full fit-cover" :src="imagePrefix(item.paintImg)" alt=""/>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="close cursor-pointer" @click="isShowCaseContrast = false">
        <span class="iconfont icon-error-fill text-30"></span>
      </div>
    </div>
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
    <WallColor :wall-image="generatorImg" ref="wallColorRef"/>
  </ClientOnly>

  <ClientOnly>
    <!-- 房间 -->
    <Room :wall-image="generatorImg" ref="roomRef" :pixel="pixel" v-if="generatorImg && reReckon"/>
  </ClientOnly>

  <!-- 图片查看器 -->
  <el-image-viewer v-if="imgViewVisible" :url-list="[generatorImg]" @close="imgViewVisible = false"/>

  <ClientOnly>
    <!-- 图片查看器 -->
    <el-image-viewer
      v-if="exampleViewVisible"
      :url-list="[imagePrefix(exampleArr[route.query.work as CodeType][exampleArrIndex].paint)]"
      @close="exampleViewVisible = false"
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
</template>

<script setup lang="ts">
import {getCombinationApi, getSampleApi, getThemeApi} from "~/api/modules/paint/paint";
import type {IPaint} from "~/api/interface/paint/paint";
import type {UploadFile, UploadProps} from "element-plus";
import {ElMessage} from "element-plus";
import WallColor from '~/components/WallColor.vue'
import Room from '~/components/Room.vue'
import {calculateShape, cm2inch, flattenTree, getImageSize, imagePrefix} from "~/utils";
import type {ICustom} from "~/api/interface/custom/custom";
import {useCustomStore} from "~/stores/modules/custom";
import {useAppStore} from "~/stores/modules/app";
import LoginWindow from "~/components/LoginWindow.vue";
import {useUserStore} from "~/stores/modules/user";
import {CONTACT_EMAIL} from "~/config";
import {useCurrencyStore} from "~/stores/modules/currency";
import {findClosestMatch} from "~/utils/calculateShape";
import {ArtCode, type CodeType} from "~/types/enumeration.d";
import {rangeVerify} from "~/utils/matchingInterval";
import {Swiper, SwiperSlide} from 'swiper/vue'
import type {Swiper as SwiperClass} from 'swiper'
import {Autoplay, Navigation, Pagination, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineOptions({
  name: 'CustomPaint'
})

onMounted(() => {

})

const userStore = useUserStore()
const appStore = useAppStore()
const customStore = useCustomStore()
const route = useRoute()
const router = useRouter()
const currencyStore = useCurrencyStore();

const moreInfoVisible = ref([false, false, false, false])

const currentView = ref('custom')
const contentNumber = ref(1)

const paintingDefault = [
  {
    photo: '/static/custom/example/hand/example_photo1.png',
    paint: '/static/custom/example/hand/example_paint1.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo2.png',
    paint: '/static/custom/example/hand/example_paint2.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo3.png',
    paint: '/static/custom/example/hand/example_paint3.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo4.png',
    paint: '/static/custom/example/hand/example_paint4.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo5.png',
    paint: '/static/custom/example/hand/example_paint5.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo6.png',
    paint: '/static/custom/example/hand/example_paint6.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo7.png',
    paint: '/static/custom/example/hand/example_paint7.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo8.png',
    paint: '/static/custom/example/hand/example_paint8.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo9.png',
    paint: '/static/custom/example/hand/example_paint9.png',
  },
  {
    photo: '/static/custom/example/hand/example_photo10.png',
    paint: '/static/custom/example/hand/example_paint10.png',
  }
]
const exampleArr = ref<Record<CodeType, { photo: string, paint: string }[]>>({
  [ArtCode.Painting]: paintingDefault,
  [ArtCode.Prints]: [
    {
      photo: '/static/custom/example/print/example_photo1.webp',
      paint: '/static/custom/example/print/example_paint1.webp',
    },
    {
      photo: '/static/custom/example/print/example_photo2.webp',
      paint: '/static/custom/example/print/example_paint2.webp',
    },
    {
      photo: '/static/custom/example/print/example_photo3.webp',
      paint: '/static/custom/example/print/example_paint3.webp',
    },
    {
      photo: '/static/custom/example/print/example_photo4.webp',
      paint: '/static/custom/example/print/example_paint4.webp',
    },
    {
      photo: '/static/custom/example/print/example_photo5.webp',
      paint: '/static/custom/example/print/example_paint5.webp',
    },
  ],
  [ArtCode.Certificates]: [
    {
      photo: '/static/custom/example/certificate/example_photo1.webp',
      paint: '/static/custom/example/certificate/example_paint1.webp',
    },
    {
      photo: '/static/custom/example/certificate/example_photo2.webp',
      paint: '/static/custom/example/certificate/example_paint2.webp',
    },
    {
      photo: '/static/custom/example/certificate/example_photo3.webp',
      paint: '/static/custom/example/certificate/example_paint3.webp',
    },
    {
      photo: '/static/custom/example/certificate/example_photo4.webp',
      paint: '/static/custom/example/certificate/example_paint4.webp',
    },
  ],
})

const reReckon = ref(false) // 重新识别
const handleImageChange = () => {
  reReckon.value = false
  nextTick(() => {
    reReckon.value = true
  })
}

const modules = [Autoplay, Pagination, Navigation, Thumbs]
const thumbsSwiper = ref<SwiperClass>()
const mainSwiperInstance = ref()
const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}
const onSwiper = (swiper: SwiperClass) => {
  mainSwiperInstance.value = swiper
}
const slideTo = (index: number) => {
  mainSwiperInstance.value.slideTo(index)
}

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

let loaded = false
/**
 * 获取组合
 * @param senior - 开启高级比较
 */
const getCombination = async (senior = false) => {
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
  loaded = false
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
  wallColorRef.value?.open()
}

// 选择背景墙颜色
const roomRef = ref<InstanceType<typeof Room>>()
const openRoom = () => {
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
const themeOptions = ref<IPaint.ThemeRow[]>([])
const getTheme = async (id: string) => {
  const {data} = await getThemeApi(id)
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
const chooseTheme = (theme: IPaint.ThemeRow | string) => {
  let id = ''
  if (typeof theme === 'string') id = theme
  else id = theme.id
  setThemeIdMap(id, 0)
  getTheme(id)
  switchStep('style')
}

// 选择风格
const chooseStyle = (theme: IPaint.ThemeRow) => {
  if (themeIdMap.value[1] === theme.id) {
    switchStep('custom')
  } else {
    setThemeIdMap(theme.id, 1)
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
const seeMoreSample = async (themeId: string) => {
  const {data} = await getSampleApi(themeId)
  caseContrastData.value = data
  switchStep('case')
  customStore.setCaseContrastData(data)
}

const isShowCaseContrast = ref(false)
const caseContrastData = ref<IPaint.SampleRow[]>([])
const showCaseContrast = (item: IPaint.SampleRow[], index: number) => {
  caseContrastData.value = item
  isShowCaseContrast.value = true
  slideTo(index)
}

const chooseNumber = (num: number) => {
  const preCode = finalCode.value
  contentNumber.value = num
  if (preCode !== getFavoriteReference.value.code) {
    getCombination()
  }
}

// 点击继续
const handleContinue = () => {
  if (currentView.value === 'case') {
    const themeId = caseContrastData.value[0]!.themeId
    chooseTheme(themeId)
    return
  }

  if (currentView.value === 'style') {
    if (!themeIdMap.value[1]) {
      ElMessage.warning('Please choose your favorite style!')
      return
    } else {
      switchStep('custom')
      return
    }
  }

}

// 返回上一步
const handleBack = () => {
  if (viewHistory.value.length > 0) {
    currentView.value = viewHistory.value.pop();
    customStore.setCurrentView(currentView.value)
    customStore.setViewHistory(viewHistory.value)
  }
}

// 重置
const reset = () => {
  loaded = false
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

  if (route.query.work !== ArtCode.Painting) {
    currentView.value = 'custom'
  } else {
    currentView.value = customStore.currentView || 'theme'
    viewHistory.value = customStore.viewHistory || []
    themeIdMap.value = customStore.themeIdMap || []
    caseContrastData.value = customStore.caseContrastData || []

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
  if (route.query.work === ArtCode.Painting && lastThemeObj.value) {
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
  const {work} = route.query;
  const isPainting = work === ArtCode.Painting;
  if (isPainting && isPrint.value) return '40USD-M2';
  if (isPainting && getFavoriteReference.value) return getFavoriteReference.value.code;
  return work;
})

// 添加购物车
const addToCart = () => {
  if (!imageUrl.value) return ElMessage.warning('Please upload the image first!')

  if (!userStore.isLogin) {
    showLoginWindow()
    return
  }

  const cartRow: ICustom.ShoppingCartsStorageRow = {
    code: finalCode.value, // 画芯代码
    previewImg: generatorImg.value, // 预览图片
    originalImg: imageUrl.value, // 原图
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

watch(() => route.fullPath,
  () => {
    reset()
  }, {immediate: true}
)

watch(() => currentView.value, () => {
  if (!import.meta.client) return
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })
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
      //height: 790px;
      min-height: 26vw;
      //aspect-ratio: 75 / 79;
      padding: 5% 0;
    }
  }

  .spu-spec {
    overflow: hidden;

    .info-box {
      overflow: hidden;
      height: auto;
      max-height: 0;
      transition: max-height 0.3s ease-in-out;
    }

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

.upload-box :deep(.el-upload) {
  width: 100%;
}

.works-list {
  --gutter: var(--gutter-xl);
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
    cursor: pointer;
    overflow: hidden;

    .p-text {
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.30);
      font-weight: bold;
      text-decoration: underline;
    }

    .p-content {
      position: absolute;
      left: 0;
      top: 100%;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.60);
      padding: 25% 20px 0;
      text-align: center;
      color: #fff;
      transition: all 0.3s ease-in-out;

      p {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease-in-out 0.2s;
      }
    }

    &.on {
      .p-text {
        background: transparent;
      }

      .p-content {
        top: 0;

        p {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}

.foot-wrapper {
  z-index: 5;
  bottom: 0;
  left: 0;
  background: #fff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);

  .foot-inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
  }

  .back-btn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
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

.case-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgba(0, 0, 0, .85);

  .wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;

    .main-swiper-wrapper {
      position: relative;
      max-width: 700px;
      width: 100%;

      .main-swiper {
        height: 100%;
        //aspect-ratio: 1 / 0.85;

        :deep(.swiper-slide) {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .contrast-wrapper {
            display: flex;

            .contrast-item {
              flex: 1;
              flex-shrink: 0;
              display: flex;
              flex-direction: column;

              .header {
                text-align: center;
                color: #fff;
                background: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
              }

              .content {
                flex: 1;
                overflow: hidden;
                flex-shrink: 0;
                max-height: 460px;
              }
            }
          }
        }
      }

      .main-button {
        --swiper-navigation-color: #fff;
        top: calc(50%);
        width: clamp(26px, 2.60vw, 50px);
        height: clamp(26px, 2.60vw, 50px);
        transform: translateY(-50%);

        &::after {
          font-size: clamp(26px, 2.60vw, 30px);
        }

        &.main-prev {
          left: -15%;
        }

        &.main-next {
          right: -15%;
        }
      }
    }

    .thumb-swiper-wrapper {
      max-width: 1180px;
      padding: 0 50px;
      width: 100%;

      .thumb-swiper {
        .swiper-slide {
          aspect-ratio: 1 / 1;
          cursor: pointer;
          opacity: .5;

          &.swiper-slide-thumb-active,
          &:hover {
            opacity: 1;
          }
        }
      }
    }

  }

  .close {
    position: absolute;
    right: 2vw;
    top: 2vw;
    font-size: 30px;
    color: #fff;
  }
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

  .favorite-list .favorite-item .p-content {
    padding-top: 15%;
  }
}

@media (max-width: 991px) {
  .works-list {
    --gutter: var(--gutter-base);
  }
}

@media (max-width: 768px) {
  .foot-wrapper .foot-inner {
    flex-direction: column;
    gap: 20px;

    .f-bold {
      order: 1;
    }

    .back-btn {
      top: 30px;
      transform: unset;
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

  .case-preview .wrapper .main-swiper-wrapper {
    padding: 0 15px;

    .main-button {
      top: -30px;
      transform: unset;

      &::after {
        font-size: 16px;
      }

      &.main-prev {
        left: 0;
      }

      &.main-next {
        left: 40px;
        right: unset;
      }
    }
  }
}
</style>