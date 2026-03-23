<template>
  <!--移动端功能区域-->
  <div
      ref="functionalRef"
      class="functional-area"
      v-if="!appStore.isPc && imageUrl && currentView === 'custom'"
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
      <PortraitBar/>
    </div>

    <!-- 主题 -->
    <div class="container" style="min-height: 450px" v-show="currentView === 'theme'" v-loading="themeLoading">
     <template v-if="themeOptions?.length">
       <ThemeChoose
           v-model="themeIdMap[0]"
           :themeOptions="themeOptions"
           @choose="chooseTheme"
       />

       <ThemeCaseStudies
           v-model="themeIdMap[0]"
           :themeOptions="themeOptions"
           @choose="chooseTheme"
       />
     </template>
    </div>

    <!-- 风格 -->
    <div class="container" v-show="currentView === 'style'">
      <StyleChoose
          v-model="themeIdMap[1]"
          :loading="themeLoading"
          :themeOption="currentThemeOption"
          :fileType="fileType"
          :beforeUpload="beforeUpload"
          :uploadChangeWithStyle="chooseStyle"
      />
    </div>

    <!-- 自定义 -->
    <div class="container" v-show="currentView === 'custom'">
      <!--移动端兼容视图-->
      <div class="app-preview"
           id="tour-step-preview-app"
           :style="{margin: '0 -15px', height: '300px', position: appSticky ? 'sticky' : 'relative' }"
           v-if="!appStore.isPc && imageUrl"
           ref="appPreviewRef"
      >
        <div class="img-wrapper acea-row row-center-wrapper flex-1 overflow-hidden">
          <ClientOnly>
            <ImageGenerator
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
                      <img class="w-full" :src="imagePrefix(lastThemeObj.img)" alt="">
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
                <div class="preview-box" id="tour-step-preview-pc">
                  <ClientOnly>
                    <ImageGenerator
                        v-model="generatorImg"
                        v-model:squareImage="squareImageUrl"
                        v-model:pixel="pixel"
                        @change="handleImageChange"
                        @touch-screen="toggleImageViewer"
                        v-bind="imageGeneratorProps"
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
          <div class="spu-spec border-sm step-wrapper">
            <!--没有上传图片-->
            <template v-if="!imageUrl">
              <!--上传图片-->
              <div class="acea-row row-between-wrapper m-md-20 m-15">
                <div class="acea-row row-middle">
                  <span class="text-30 f-bold mr-md-20 mr-10 step-index"></span>
                  <span class="text-26">Upload Your Photo</span>
                  <span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper"
                        @click="showInfo = !showInfo">
                 <span class="pc">{{ showInfo ? 'LESS INFO' : 'MORE INFO' }}</span>
                <span class="iconfont icon-down" :class="{'rotate-180': showInfo}"></span>
              </span>
                </div>
                <div class="text-20 f-bold"></div>
              </div>
              <div class="mx-20 text-16 info-box" v-show="showInfo">
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
              <ComboSkeleton :loading="loadingCombo && !firstLoadCombo">
                <div>
                  <!--工艺/规格选择-->
                  <!-- <CraftSelector
                       v-if="route.params.work === ArtCodeEnum.Painting"
                       tourId="tour-step-craft"
                       v-model="isPrint"
                       :options="craftOptions"
                       @change="chooseTechnique"
                   />-->

                  <!--尺寸选择-->
                  <SizeSelector
                      tourId="tour-step-size"
                      v-model="currentSizeId"
                      :options="sizeOptions"
                      :sizeOption="currentSizeOption"
                      @change="chooseSize"
                  />

                  <!--复杂层度选择-->
                  <ComplexitySelector
                      v-if="route.params.work === ArtCodeEnum.Painting && !isPrint"
                      tourId="tour-step-complexity"
                      :model-value="contentNumber"
                      :themeName="currentThemeOption?.name"
                      :maxNumber="maxNumber"
                      @update:model-value="chooseNumber"
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

                  <!--备注-->
                  <RemarkInput tourId="tour-step-remark" v-model="remark"/>

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
                      <span class="text-26 text-error">{{ formatToCurrency(totalPrice || 0) }}</span>
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
              </ComboSkeleton>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- How it Works -->
    <div class="container" v-show="currentView !== 'custom'">
      <HowItWorks/>
    </div>

    <!-- 底部按钮 -->
    <FootBar
        v-show="route.params.work === ArtCodeEnum.Painting && currentView !== 'theme'"
        :hasContinue="currentView !== 'custom'"
        @back="handleBack"
        @continue="handleContinue"
    />

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

  <!-- 背景墙 -->
  <WallColor :wall-image="generatorImg" ref="wallColorRef" @close="toggleWidget(true)"/>

  <!-- 房间 -->
  <Room :wall-image="generatorImg" ref="roomRef" :pixel="pixel" v-if="generatorImg && reReckon"
        @close="toggleWidget(true)"/>

  <!-- 图片查看器 -->
  <el-image-viewer
      v-if="imgViewVisible"
      :url-list="[generatorImg]"
      @close="toggleImageViewer"
      hide-on-click-modal
  />

  <!-- 图片查看器 -->
  <el-image-viewer
      v-if="exampleViewVisible"
      :url-list="[imagePrefix(TECHNIQUE_EXAMPLE[route.params.work as ArtCodeType]![exampleArrIndex]!.paint)]"
      @close="exampleViewVisible = false"
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
import {getThemeApi} from "~/api/modules/paint/paint";
import type {IPaint} from "~/api/interface/paint/paint";
import type {UploadFile, UploadProps} from "element-plus";
import {ElMessage, ElMessageBox} from "element-plus";
import WallColor from '~/components/WallColor.vue'
import Room from '~/components/Room.vue'
import {calculateShape, flattenTree, getImageSize} from "~/utils";
import {useImage} from "~/composables/useImage";
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
import {TECHNIQUE_EXAMPLE} from "~/constant";
import {useVerticalDrag} from '~/composables/useVerticalDrag'
import HowItWorks from '~/components/Custom/HowItWorks.vue'
import FootBar from '~/components/Custom/FootBar.vue'
import PortraitBar from '~/components/Custom/PortraitBar.vue'
import ThemeChoose from '~/components/Custom/ThemeChoose.vue'
import ThemeCaseStudies from '~/components/Custom/ThemeCaseStudies.vue'
import StyleChoose from '~/components/Custom/StyleChoose.vue'
import SizeSelector from "~/components/Custom/SizeSelector.vue";
import ComplexitySelector from "~/components/Custom/ComplexitySelector.vue";
import FrameSelector from "~/components/Custom/FrameSelector.vue";
import MatSelector from "~/components/Custom/MatSelector.vue";
import RemarkInput from "~/components/Custom/RemarkInput.vue";
import CraftSelector from "~/components/Custom/CraftSelector.vue";
import ComboSkeleton from "~/components/Custom/ComboSkeleton.vue";
import {usePaintCombo} from '~/composables/usePaintCombo'

defineOptions({
  name: 'CustomPaint'
})

const { imagePrefix } = useImage()
const userStore = useUserStore()
const appStore = useAppStore()
const customStore = useCustomStore()
const route = useRoute()
const router = useRouter()
const {formatToCurrency} = useCurrencyStore();
const {saveBase64} = useIndexedDBBase64()
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
  if (localStorage.getItem(APP_HAS_SEEN_CUSTOM_GUIDE) === 'true') return
  beginGuide()
  localStorage.setItem(APP_HAS_SEEN_CUSTOM_GUIDE, 'true')
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

  resetCombo
} = usePaintCombo({
  onGuideInit: initShowGuide,
  getCode: () => finalCode.value,
  getRatio: () => ratio.value,
  getExtraSpecs: () => {
    const extra: Record<string, any> = {}
    // 这里的 route.params 和 lastThemeObj 都是响应式的
    // 当它们改变时，cartSpecsData 会自动重新计算！
    if (route.params.work === ArtCodeEnum.Painting && lastThemeObj.value) {
      extra['Style'] = lastThemeObj.value.name
    }
    return extra
  }
})

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

const showInfo = ref(false)
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

/**
 * 获取组合
 * @param senior - 开启高级比较
 */
const getCombination = async (senior = false) => {
  await fetchCombination(senior)
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
  firstLoadCombo.value = false
  await getCombination()
}

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

const themeIdMap = ref<string[]>([]) // 当前选中的ID集合
const viewHistory = ref<string[]>([]) // 步骤历史记录
const switchStep = (targetView: string) => {
  viewHistory.value.push(currentView.value);
  currentView.value = targetView
  customStore.setCurrentView(currentView.value)
  customStore.setViewHistory(viewHistory.value)
}

// 获取主题数据
const favoriteMainRef = ref<HTMLDivElement>()
const themeLoading = ref(false) // 加载数据中
const themeOptions = ref<IPaint.ThemeRow[]>([]) // 全部主题
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
const currentThemeOption = computed(() => themeOptions.value.find((item: IPaint.ThemeRow) => item.id === themeIdMap.value[0])) // 当前选中的主题
const chooseTheme = (themeId: string) => {
  customStore.setThemeIdMap(themeIdMap.value)
  getTheme(themeId)
  switchStep('style')
}

// 选择风格并上传图片
const chooseStyle = async (file: UploadFile) => {
  customStore.setThemeIdMap(themeIdMap.value)
  imageUrl.value = ''
  switchStep('custom')
  await uploadChange(file)
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

// 复杂程度选择
const maxNumber = 10
const contentNumber = ref(1)
const chooseNumber = (num: number) => {
  const preCode = finalCode.value
  contentNumber.value = num // 手动执行数据更新，需要再更新数据前拿到旧的制程代码
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
  resetCombo()

  currentView.value = 'custom'
  viewHistory.value = []
  themeIdMap.value = []
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

const craftOptions = [
  {label: 'Hand-painted oil painting', value: false},
  {label: 'Print painting', value: true}
]
const isPrint = ref(false) // 工艺是否选中喷绘
const chooseTechnique = () => {
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
  if (import.meta.env.MODE !== 'production') return
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

const appPreviewRef = ref<HTMLElement>()
const appSticky = ref(true)
const openTour = ref(false)
const beginGuide = async () => {
  let top = 0
  if (appStore.isPc) {
    await appStore.forceFoldHeader() // 锁定并折叠，等待动画
  } else {
    top = appPreviewRef.value.offsetHeight
    appSticky.value = false
  }
  window.scrollTo({
    top: top,
    behavior: "instant",
  })
  openTour.value = true
  toggleWidget(false)
}
const handleTouchClose = () => {
  if (appStore.isPc) {
    appStore.cancelForceFoldHeader() // 引导结束，恢复自动控制
  } else {
    appSticky.value = true
  }
  window.scrollTo({
    top: 0,
    behavior: "instant",
  })
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
    createStep(true, appStore.isPc ? '#tour-step-preview-pc' : '#tour-step-preview-app', 'Preview Artwork', 'Get a first look at your core image to ensure it’s exactly how you envision before customizing the details.'),
    // createStep(route.params.work === ArtCodeEnum.Painting, '#tour-step-craft', 'Choose Craftsmanship', 'Select the material and texture that best suits your style.'),
    createStep(true, '#tour-step-size', 'Choose Size', 'Pick the perfect dimensions to fit your space.'),
    createStep(route.params.work === ArtCodeEnum.Painting && !isPrint.value, '#tour-step-complexity', 'Choose Subject Count', 'Specify the number of people or objects in your photo to determine the complexity.'),
    createStep(true, '#tour-step-frame', 'Choose Frame', 'Complete the look with one of our premium frames.'),
    createStep(hasFrame.value && matVisible.value, '#tour-step-mat', 'Mat Customization', 'Select the color and width of your mat to enhance your artwork’s visual balance. A carefully chosen mat frames the image, adds depth, and creates harmony between the artwork and the frame.'),
    createStep(true, '#tour-step-remark', 'Add Notes', 'Instructions for edits, colors, or background changes.'),
  ]
  return steps.filter(Boolean)
})

// 集中管理 ImageGenerator 的所有 props
const imageGeneratorProps = computed(() => {
  return {
    shape: shapeStr.value,
    coreImage: imageUrl.value,
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
    }
  }

  .upload-box :deep(.el-upload) {
    width: 100%;

    &:focus,
    &:active {
      color: unset !important;
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

  @media (max-width: 768px) {
    .case-waterfall {
      column-count: 2;
    }
  }
</style>