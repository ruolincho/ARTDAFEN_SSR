<template>
  <div class="text-center lg:my-40 my-30">
    <h2 class="text-50">MORE CASE STUDIES</h2>
  </div>
  <!--桌面端视图-->
  <div class="case-list" v-if="appStore.isPc">
    <div class="case-item" v-for="item in themeOptions" :key="item.id">
      <div class="acea-row row-between-wrapper font-500 py-20">
        <span class="uppercase text-26">{{ item.name }}</span>
        <span class="uppercase underline text-20 text-gray-600 cursor-pointer"
              @click="seeMoreSample(item)">see more</span>
      </div>
      <div class="case-content">
        <div class="item" v-for="(sample, index) in item.samples" :key="sample.id"
             @click="showCaseContrast(item.samples, index)">
          <img class="w-full h-full object-cover img-hover"
               v-lazy="imagePrefix(sample.compareImg)"
               :alt="item.name + '_sample'"
          />
        </div>
      </div>
      <el-button
          class="w-full mt-15"
          type="primary"
          size="large"
          @click="chooseTheme(item.id)"
      >
        Customize Now
      </el-button>
    </div>
  </div>
  <!--移动端视图-->
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
          <div class="acea-row row-between-wrapper font-500 py-20">
            <span class="uppercase text-26">{{ item.name }}</span>
            <span class="uppercase underline text-20 text-gray-600 cursor-pointer"
                  @click="seeMoreSample(item)">see more</span>
          </div>
          <div class="case-content">
            <div class="item" v-for="(sample, index) in item.samples" :key="sample.id"
                 @click="showCaseContrast(item.samples, index)">
              <img class="w-full h-full object-cover img-hover"
                   :src="imagePrefix(sample.compareImg)"
                   :alt="item.name + '_sample'"
              />
            </div>
          </div>
          <el-button class="w-full mt-15" type="primary" size="large" @click="chooseTheme(item.id)">
            Customize Now
          </el-button>
        </div>
      </div>
    </swiper-slide>
  </swiper>

  <CasePreview v-model="isShowCaseContrast" :items="caseContrastData" :index="caseIndex"/>
</template>

<script setup lang="ts">
import {generateTitle2Slug} from "~/utils";
import {useAppStore} from "~/stores/modules/app";
import type {IPaint} from "~/api/interface/paint/paint";
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, Pagination} from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {useImage} from "~/composables/useImage";

// 定义 Props
interface Props {
  modelValue: string;
  themeOptions: IPaint.ThemeRow[];
}

const { imagePrefix } = useImage()
const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'more': [item: IPaint.ThemeRow]
  'compare': [item: IPaint.SampleRow[], index: number]
  'choose': [id: string]
}>()

const router = useRouter()
const appStore = useAppStore()
const modules = [Autoplay, Pagination]

// 查看更多风格案例
const seeMoreSample = (item: IPaint.ThemeRow) => {
  const {id, name} = item
  const slug = generateTitle2Slug(name)
  router.push(`/custom-case/${id}/${slug}`)
  emit('more', item)
}

const chooseTheme = (id: string) => {
  emit("update:modelValue", id);
  emit('choose', id)
}

// 查看全部对比图
const caseIndex = ref(-1)
const isShowCaseContrast = ref(false)
const caseContrastData = ref<IPaint.SampleRow[]>([])
const showCaseContrast = (item: IPaint.SampleRow[], index: number) => {
  caseContrastData.value = item
  isShowCaseContrast.value = true
  caseIndex.value = index
  emit('compare', item, index)
}
</script>

<style scoped lang="scss">
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

  @media (max-width: 768px) {
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
  }
</style>