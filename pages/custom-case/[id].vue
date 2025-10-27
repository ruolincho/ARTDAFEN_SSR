<template>
  <section>
    <div class="container">
      <div class="text-center py-lg-40 py-30">
        <h1 class="text-50">CUSTOM PORTRAIT SHOWCASE — FROM YOUR PHOTO TO ART</h1>
        <p class="mt-20 text-gray-600 text-20 f-bold-500 text-capitalize">
          Discover how an ordinary photo transforms into extraordinary art. <br/> In our Custom Portrait Showcase,
          you’ll see
          real examples of before-and-after results — side-by-side comparisons revealing the remarkable detail, color,
          and emotion that our artists bring to life.
        </p>
      </div>

      <div class="case-waterfall" v-if="caseContrastData.length">
        <div class="item cursor-pointer overflow-hidden" v-for="(sample, index) in caseContrastData" :key="sample.id"
             @click="showCaseContrast(index)">
          <img class="w-full img-hover " :src="imagePrefix(sample.paintImg)" alt="">
        </div>
      </div>

      <div class="text-center py-60" v-else>
        <span class="iconfont icon-empty text-50"></span>
        <p class="text-20 f-bold mt-20">No Data</p>
        <p class="text-14 my-20">No data found, please check the query or try again later.</p>
        <el-button size="large" type="primary" @click="seeMoreSample()">
          TRY AGAIN
        </el-button>
      </div>
    </div>
  </section>

  <!-- 底部按钮 -->
  <div
    class="foot-wrapper"
    :style="{ position: 'sticky' }"
  >
    <div class="container">
      <div class="foot-inner py-20">
        <div class="back-btn acea-row row-middle cursor-pointer" @click="handleBack">
          <span class="iconfont icon-left text-20"></span>
          <span class="text-20 f-bold">Back</span>
        </div>
        <span class="text-20 f-bold">Online proofing | Unlimited revisions | 100% satisfaction before painting</span>
        <el-button
          type="primary"
          size="large"
          @click="handleContinue"
        >
          Continue
        </el-button>
      </div>
    </div>
  </div>

  <ClientOnly>
    <CasePreview v-model="isShowCaseContrast" :items="caseContrastData" :index="caseIndex" />
  </ClientOnly>

</template>

<script setup lang="ts">
import type {IPaint} from "~/api/interface/paint/paint";
import {getSampleApi} from "~/api/modules/paint/paint";
import {imagePrefix} from "~/utils";

onMounted(() => {
  if (route.params.id) seeMoreSample()
})

const {$bus} = useNuxtApp()
const route = useRoute()
const router = useRouter()

// 获取喜欢的风格预览图
const caseContrastData = ref<IPaint.SampleRow[]>([])
const seeMoreSample = async () => {
  const {data} = await getSampleApi(route.params.id as string)
  caseContrastData.value = data
}

const caseIndex = ref(-1)
const isShowCaseContrast = ref(false)
const showCaseContrast = (index: number) => {
  isShowCaseContrast.value = true
  caseIndex.value = index
}

// 返回上一步
const handleBack = () => {
  router.back()
}

// 点击继续（回到定制页面）
const handleContinue = () => {
  handleBack()
  $bus.emit('continueCustomPaint', route.params.id as string)
}

</script>

<style scoped lang="scss">
.portrait-wrapper {
  img {
    height: 60px;
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

@media (max-width: 768px) {
  .case-waterfall {
    column-count: 2;
  }
}

</style>