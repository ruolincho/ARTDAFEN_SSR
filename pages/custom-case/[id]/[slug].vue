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
      <DataState :loading="themeLoading" :is-empty="caseContrastData.length === 0">
        <div class="case-waterfall">
          <div class="item cursor-pointer overflow-hidden" v-for="(sample, index) in caseContrastData" :key="sample.id"
               @click="showCaseContrast(index)">
            <img class="w-full img-hover" :src="imagePrefix(sample.paintImg)" alt="sample">
          </div>
        </div>
      </DataState>
    </div>
  </section>

  <!-- 底部按钮 -->
  <FootBar
      @back="handleBack"
      @continue="handleContinue"
      :hasContinue="true"
  />

  <ClientOnly>
    <CasePreview v-model="isShowCaseContrast" :items="caseContrastData" :index="caseIndex" />
  </ClientOnly>

</template>

<script setup lang="ts">
import type {IPaint} from "~/api/interface/paint/paint";
import {getSampleApi} from "~/api/modules/paint/paint";
import {useImage} from "~/composables/useImage";
import {ArtCodeEnum} from "~/types/enumeration";
import FootBar from '~/components/Custom/FootBar.vue'
import {mergeHeadWithLodash, resolvePageMeta} from "~/config/pageMeta";

onMounted(() => {
  if (route.params.id) seeMoreSample()
})

const { imagePrefix } = useImage()
const {$bus} = useNuxtApp()
const route = useRoute()
const router = useRouter()
const origin = useRequestURL().origin

// 获取喜欢的风格预览图
const themeLoading = ref(false)
const caseContrastData = ref<IPaint.SampleRow[]>([])
const seeMoreSample = async () => {
  themeLoading.value = true
  const {data} = await getSampleApi(route.params.id as string)
  caseContrastData.value = data
  themeLoading.value = false
}

useHead(mergeHeadWithLodash(
    resolvePageMeta("/custom-case", route.params.slug as string),
    {
      link: [
        {rel: 'canonical', href: `${origin}${route.path}`},
      ]
    }
))

const caseIndex = ref(-1)
const isShowCaseContrast = ref(false)
const showCaseContrast = (index: number) => {
  isShowCaseContrast.value = true
  caseIndex.value = index
}

// 返回上一步
const handleBack = () => {
  router.replace({
    path: `/custom-paint/${ArtCodeEnum.Painting}`
  })
}

// 点击继续（回到定制页面）
const handleContinue = () => {
  router.replace({
    path: `/custom-paint/${ArtCodeEnum.Painting}/${route.params.id}`
  })
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

@media (max-width: 768px) {
  .case-waterfall {
    column-count: 2;
  }
}
</style>