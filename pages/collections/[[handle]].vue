<template>
  <!--锚点-->
  <div id="list-anchor"></div>

  <!-- 标题 -->
  <section class="title-wrapper pt-15" v-if="pageSeo">
    <div class="container-fluid">
      <div class="title-box text-center">
        <h1 class="text-60 f-bold-500">{{ pageSeo.name }}</h1>
        <p class="mt-10 text-gray-500" style="line-height: 1.7">{{ pageSeo.description }}</p>
      </div>
    </div>
  </section>

  <!-- 关键字搜索 -->
  <section class="search-wrapper" v-if="routerParams.KEYWORD">
    <div class="container-fluid">
      <div class="search-header pt-md-30 pt-15">
        <div class="input-wrapper">
          <input
              ref="searchInputRef"
              v-model="keyword"
              type="text"
              class="search-input"
              placeholder="Search for..."
              @keydown.enter="onSearch"
          >
        </div>
        <button class="search-btn" @click="onSearch">
          <SvgIcon name="search" />
        </button>
      </div>
    </div>
  </section>

  <!-- 主内容 -->
  <section class="filter-wrapper">
    <div class="container-fluid">
      <div class="acea-row row-between">
        <!-- 左侧筛选区域 PC端-->
        <transition name="slide-fade">
          <div class="side-wrapper mr-40" v-show="appStore.device === 'pc' && groupList.length && isFilter">

            <!--后台返回的筛选-->
            <div class="side-menu scroll-custom">
              <div class="py-md-30 py-15 f-bold text-30">
                FILTERS
              </div>
              <template v-for="group in groupList" :key="group.id">
                <!-- PRICE -->
                <template v-if="group.config?.type === 'PRICE'">
                  <Expandable v-model="group.isShow" :title="group.name">
                    <div class="pr-4">
                      <div class="acea-row row-column gap-row-sm">
                        <div
                            class="acea-row row-middle cursor-pointer"
                            v-for="item in group.children"
                            :key="item.id"
                            @click="clickPriceType(item)"
                        >
                          <SvgIcon
                              class="text-18"
                              :class="[priceSelected.id === item.id && !isCustomPrice ? 'text-primary' : 'text-gray-400']"
                              :name="priceSelected.id === item.id && !isCustomPrice ? 'check-fill' : 'check'"
                          />
                          <span class="text-14 pl-12">{{ item.name }}</span>
                        </div>
                        <div class="acea-row row-middle cursor-pointer" @click="clickPriceType(undefined)">
                          <SvgIcon
                              class="text-18"
                              :class="[isCustomPrice ? 'text-primary' : 'text-gray-400']"
                              :name="isCustomPrice ? 'check-fill' : 'check'"
                          />
                          <span class="text-14 pl-12">Custom</span>
                        </div>
                        <div v-show="isCustomPrice">
                          <div class="text-14 my-10">Min Price</div>
                          <div class="acea-row row-between-wrapper px-15 py-12"
                               :class="[!isCustomPrice ?  'bg-gray-100': 'border-sm']">
                            <input type="text" placeholder="1400" style="width: 60%" v-model="startPrice"
                                   :disabled="!isCustomPrice" @blur="onStartPriceBlur">
                            <span class="text-gray-600">{{ getCurrencySymbol }}</span>
                          </div>
                          <div class="text-14 my-10">Max Price</div>
                          <div class="acea-row row-between-wrapper px-15 py-12"
                               :class="[!isCustomPrice ?  'bg-gray-100': 'border-sm']"
                          >
                            <input type="text" placeholder="3400" style="width: 60%" v-model="endPrice"
                                   :disabled="!isCustomPrice" @blur="onEndPriceBlur">
                            <span class=" text-gray-600">{{ getCurrencySymbol }}</span>
                          </div>
                        </div>
                      </div>


                    </div>
                  </Expandable>
                </template>

                <!-- RADIO -->
                <template v-if="group.config?.type === 'RADIO'">
                  <Expandable v-model="group.isShow" :title="group.name">
                    <div class="scroll-y pr-4 scroll-custom">
                      <div class="acea-row row-column gap-row-sm">
                        <div
                            class="acea-row row-middle cursor-pointer"
                            v-for="item in group.children"
                            :key="item.id"
                            @click="clickRadioType(item)"
                        >
                          <SvgIcon
                              class="text-18"
                              :class="[radioSelected.get(item.parentId)?.id === item.id ? 'text-primary' : 'text-gray-400']"
                              :name="radioSelected.get(item.parentId)?.id === item.id ? 'check-fill' : 'check'"
                          />
                          <span class="text-14 pl-12">{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                  </Expandable>
                </template>

                <!-- CHECKBOX -->
                <template v-if="group.config?.type === 'CHECKBOX'">
                  <Expandable v-model="group.isShow" :title="group.name">
                    <div class="scroll-y pr-4 scroll-custom">
                      <div class="acea-row row-column gap-row-sm">
                        <div
                            class="acea-row row-middle cursor-pointer"
                            v-for="item in group.children"
                            :key="item.id"
                            @click="clickCheckoutType(item)"
                        >
                          <SvgIcon
                              class="text-18"
                              :class="[checkboxSelected.get(item.parentId)?.includes(item) ? 'text-primary' : 'text-gray-400']"
                              :name="checkboxSelected.get(item.parentId)?.includes(item) ? 'checkbox-fill' : 'checkbox'"
                          />
                          <span class="text-14 pl-12">{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                  </Expandable>
                </template>

                <!-- COLOR -->
                <template v-if="group.config?.type === 'COLOR'">
                  <Expandable v-model="group.isShow" :title="group.name">
                    <div class="scroll-y pr-4 scroll-custom">
                      <div class="color-list acea-row row-middle gap-sm">
                        <div
                            class="color-item cursor-pointer"
                            :class="{ 'active': colorSelected?.includes(item) }"
                            v-for="item in group.children"
                            :key="item.id"
                            @click="clickColorType(item)"
                        >
                          <el-tooltip :content="item.name" placement="top" :hide-after="100">
                            <div class="circle rounded-full" :style="{ ...getColorStyle(item.config.color!) }"/>
                          </el-tooltip>
                        </div>
                      </div>
                    </div>
                  </Expandable>
                </template>

                <!-- SHAPE -->
                <template v-if="group.config?.type === 'SHAPE'">
                  <Expandable v-model="group.isShow" :title="group.name">
                    <div class="scroll-y pr-4 scroll-custom">
                      <div class="acea-row row-column gap-row-sm">
                        <div
                            class="acea-row row-middle cursor-pointer"
                            v-for="item in group.children"
                            :key="item.id"
                            @click="clickShapeType(item)"
                        >
                          <SvgIcon
                              class="text-18"
                              :class="[shapeSelected?.id === item.id ? 'text-primary' : 'text-gray-400']"
                              :name="shapeSelected?.id === item.id ? 'check-fill' : 'check'"
                          />
                          <span class="text-14 pl-12">{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                  </Expandable>
                </template>
              </template>
              <hr class="border-t-sm"></hr>
            </div>

            <div class="acea-row nowrap side-button py-20">
              <el-button @click="reset()">Reset</el-button>
              <el-button type="primary" class="flex-1" @click="routerJump()">See all items</el-button>
            </div>
          </div>
        </transition>
        <!-- 右侧主要区域 -->
        <div class="main-wrapper flex-1">

          <!--排序按钮 Pc端-->
          <div
              class="py-md-30 py-15 acea-row row-right row-middle gap-column-base"
              v-show="appStore.device === 'pc'"
          >
            <!--展示过滤选项-->
            <div class="loc-group" :class="{ 'active' : isFilter }" @click="isFilter = !isFilter">
              <div class="loc-current">
                <span><span class="loc-text">{{ isFilter ? 'Hide' : 'Show' }} Filters</span></span>
                <span class="loc-arrow"><SvgIcon name="editor-left-alignment" /></span>
              </div>
            </div>

            <!--排序选项-->
            <div class="loc-group" :class="{ 'active' : isSort }" @click="isSort = !isSort" ref="containerRef">
              <div class="loc-current">
                <span><strong>Sort by:</strong> <span class="loc-text">
                  {{ sortSelected.name || 'Default' }}</span>
                </span>
                <span class="loc-arrow"><SvgIcon name="down" /></span>
              </div>
              <div class="loc-dropdown">
                <ul class="loc-list">
                  <li
                      class="loc-item"
                      :class="{ active: sortSelected.id === item.id }"
                      v-for="item in SORT_MENU.children" :key="item.id"
                      @click.stop="handleSort(item)"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!--按钮组 Pc端-->
          <div class="acea-row gap-xs row-middle pb-md-30 pb-15" v-show="appStore.device === 'pc'">
            <!--Shape 选中的值-->
            <el-tag
                v-if="shapeSubmitted.id"
                size="large"
                type="info" round
                class="cursor-pointer"
                :closable="true"
                @close="closeShapeTag"
            >
              {{ shapeSubmitted.name }}
              <template v-if="isDev"> - {{ shapeSubmitted.id }}</template>
            </el-tag>
            <!--Price 选中的值-->
            <el-tag
                size="large"
                v-if="priceSubmitted"
                type="info" round
                class="cursor-pointer"
                closable
                @close="closePriceTag"
            >
              {{ priceSubmitted }}
            </el-tag>
            <!--Radio 选中的值-->
            <el-tag
                size="large"
                type="info" round
                v-for="(item, index) in radioSubmitted"
                :key="item.id"
                class="cursor-pointer"
                closable
                @close="closeRadioTag(item, index)"
            >
              {{ item.name }}
              <template v-if="isDev"> - {{ item.id }}</template>
            </el-tag>
            <!--Checkout 选中的值-->
            <el-tag
                size="large"
                type="info" round
                v-for="(item, index) in checkboxSubmitted"
                :key="item.id"
                class="cursor-pointer"
                closable
                @close="closeCheckboxTag(item, index)"
            >
              {{ item.name }}
              <template v-if="isDev"> - {{ item.id }}</template>
            </el-tag>
            <!--Color 选中的值-->
            <el-tag
                size="large"
                type="info" round
                v-for="(item, index) in colorSubmitted"
                :key="item.id"
                class="cursor-pointer"
                closable
                @close="closeColorTag(item, index)"
            >
              {{ item.name }}
              <template v-if="isDev"> - {{ item.id }}</template>
            </el-tag>
            <!--Artist 选中的值-->
            <el-tag
                v-if="artistSelected.id"
                size="large"
                type="info" round
                class="cursor-pointer"
                closable
                @close="closeArtistTag()"
            >
              {{ artistSelected.name }}
              <template v-if="isDev"> - {{ artistSelected.id }}</template>
            </el-tag>
            <div class="cursor-pointer text-underline" @click="reset" v-if="hasFilterSelected">Clear all</div>
          </div>
          <!--筛选区域 App端-->
          <div
              class="buttons-wrapper p-15 acea-row nowrap gap-column-xs scroll-x scroll-hide"
              v-show="appStore.device === 'app'"
              ref="appFilterRef"
              :style="{ top: 'var(--header-height)', margin: '0 -15px' }"
          >

            <!--排序-->
            <el-tag
                size="large"
                type="primary" round effect="plain"
                class="cursor-pointer"
                @click="clickAppFilter('SORT', 0)"
            >
              Sort by: {{ sortSelected.name ?? 'Default' }}
            </el-tag>
            <!--全部的筛选-->
            <template v-for="(group, index) in groupList" :key="group.id">
              <!-- PRICE -->
              <template v-if="group.config?.type === 'PRICE'">
                <el-tag
                    size="large"
                    type="primary" round effect="plain"
                    class="cursor-pointer"
                    @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ group.name }}
                  <template v-if="priceSubmitted"> (1)</template>
                  <SvgIcon name="down" />
                </el-tag>
              </template>

              <!-- RADIO -->
              <template v-if="group.config?.type === 'RADIO'">
                <el-tag
                    size="large"
                    type="primary" round effect="plain"
                    class="cursor-pointer"
                    @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ group.name }}
                  <template v-if="countsMap[group.config?.type][group.id] > 0">
                    ({{ countsMap[group.config?.type][group.id] }})
                  </template>
                  <SvgIcon name="down" />
                </el-tag>
              </template>

              <!-- CHECKBOX -->
              <template v-if="group.config?.type === 'CHECKBOX'">
                <el-tag
                    size="large"
                    type="primary" round effect="plain"
                    class="cursor-pointer"
                    @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ group.name }}
                  <template v-if="countsMap[group.config?.type][group.id] > 0">
                    ({{ countsMap[group.config?.type][group.id] }})
                  </template>
                  <SvgIcon name="down" />
                </el-tag>
              </template>

              <!-- COLOR -->
              <template v-if="group.config?.type === 'COLOR'">
                <el-tag
                    size="large"
                    type="primary" round effect="plain"
                    class="cursor-pointer"
                    @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ group.name }}
                  <template v-if="countsMap[group.config?.type][group.id] > 0">
                    ({{ countsMap[group.config?.type][group.id] }})
                  </template>
                  <SvgIcon name="down" />
                </el-tag>
              </template>

              <!-- SHAPE -->
              <template v-if="group.config?.type === 'SHAPE'">
                <el-tag
                    size="large"
                    type="primary" round effect="plain"
                    class="cursor-pointer"
                    @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ group.name }}
                  <template v-if="shapeSubmitted.id"> (1)</template>
                  <SvgIcon name="down" />
                </el-tag>
              </template>
            </template>
          </div>

          <ClientOnly>
            <!--商品数据-->
            <ProList
                ref="proListRef"
                :request-api="getProductListApiFn"
                :init-param="initParam"
                :request-auto="false"
                :handle-current-change="handleCurrentChange"
                :requestSuccess="executeScroll"
                :scrollAuto="false"
            >
              <template #default="scope">
                <div class="row product-list gap-row-base">
                  <div class="col-2xl-average col-lg-3 col-md-4 col-6" v-for="(item, index) in scope.rows"
                       :key="item.id">
                    <GoodsItem :item="item" @thumbsClick="productThumbs" :clickArtistFn="handleClickArtist"/>
                  </div>
                </div>
              </template>
            </ProList>

            <!--推荐数据-->
            <template v-if="isShowRecommended">
              <h1 class="py-sm-30 py-20 text-26 f-bold border-b-md border-gray-700 mb-20">Product Related</h1>
              <ProList
                  ref="proListRecommendedRef"
                  :request-api="getProductRecommendedList"
                  :init-param="initParam"
                  :request-auto="true"
              >
                <template #default="scope">
                  <div class="row product-list gap-row-base">
                    <div class="col-2xl-average col-lg-3 col-md-4 col-6" v-for="item in scope.rows" :key="item.id">
                      <GoodsItem :item="item" @thumbsClick="productThumbs" :clickArtistFn="handleClickArtist"/>
                    </div>
                  </div>
                </template>
                <template #empty>
                  <div class="text-center py-60">
                    <SvgIcon name="empty" class="text-50" />
                    <p class="text-20 f-bold mt-20">No Data</p>
                    <p class="text-14 my-20">No data found, please check the query or try again later.</p>
                  </div>
                </template>
              </ProList>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>

  <!-- 移动端弹窗筛选 -->
  <Popup v-model="isPopup" v-if="appStore.device === 'app'">
    <template #default>
      <!-- popup 头部 -->
      <div
          class="app-popup-header mt-12 mb-20 acea-row nowrap gap-column-base scroll-x scroll-hide"
          style="white-space: nowrap"
          ref="popupHeaderRef"
      >
        <!-- 排序 -->
        <span
            class="head-item"
            :class="{on: popupCurrentMenu.id === '9999' }"
            @click="clickPopupHeader(0, SORT_MENU)"
        >
        By Sort
      </span>
        <!-- 菜单标题 -->
        <span
            class="head-item"
            :class="{on: popupCurrentMenu.id === group.id }"
            v-for="(group, index) in groupList" :key="group.id"
            @click="clickPopupHeader(index + extraLength, group)"
        >
        {{ group.name }}
      </span>
      </div>

      <div>
        <!-- SORT -->
        <template v-if="popupCurrentMenu.config?.type === 'SORT'">
          <div
              class="text-20 py-16 border-b-sm border-gray-200"
              :class="[sortSelected.id === item.id? 'text-gray-700': 'text-gray-500']"
              v-for="item in popupCurrentMenu.children"
              :key="item.id"
              @click="handleSort(item)"
          >
            {{ item.name }}
          </div>
        </template>

        <!-- PRICE -->
        <template v-if="popupCurrentMenu.config?.type === 'PRICE'">
          <div class="mx-12 price-range-text ">
            <div class="text-center f-bold pt-20 pb-20">
              {{ getCurrencySymbol }}{{ priceRange[0] }} ~ {{ getCurrencySymbol }}{{ priceRange[1] }}
              <template v-if="priceRange[1] >= PRICER_MAX">+</template>
            </div>
            <el-slider
                v-model="priceRange"
                range
                :max="PRICER_MAX"
                :show-tooltip="false"
                @change="priceRangeChange"
            />
          </div>

          <div class="acea-row gap-xs mt-20">
            <el-tag
                size="large"
                type="info"
                round
                v-for="item in popupCurrentMenu.children"
                :key="item.id"
                @click="clickPriceType(item, true)"
            >
              {{ item.name }}
            </el-tag>

          </div>
        </template>

        <!-- RADIO -->
        <template v-if="popupCurrentMenu.config?.type === 'RADIO'">
          <div
              class="text-20 py-16 border-b-sm border-gray-200 acea-row row-between-wrapper"
              v-for="item in popupCurrentMenu.children"
              :key="item.id"
              @click="clickRadioType(item)"
          >
            <span>{{ item.name }}</span>
            <SvgIcon
                :name="radioSelected.get(item.parentId)?.id === item.id ? 'check-fill' : 'check'"
                style="font-size: 20px"
                :class="[radioSelected.get(item.parentId)?.id === item.id ? 'text-primary' : 'text-gray-400']"
            />
          </div>
        </template>

        <!-- CHECKBOX -->
        <template v-if="popupCurrentMenu.config?.type === 'CHECKBOX'">
          <div
              class="text-20 py-16 border-b-sm border-gray-200 acea-row row-between-wrapper"
              v-for="item in popupCurrentMenu.children"
              :key="item.id"
              @click="clickCheckoutType(item)"
          >
            <span>{{ item.name }}</span>
            <SvgIcon
                :name="checkboxSelected.get(item.parentId)?.includes(item) ? 'checkbox-fill' : 'checkbox'"
                style="font-size: 20px"
                :class="[checkboxSelected.get(item.parentId)?.includes(item) ? 'text-primary' : 'text-gray-400']"
            />
          </div>
        </template>

        <!-- COLOR -->
        <template v-if="popupCurrentMenu.config?.type === 'COLOR'">
          <div class="scroll-y pr-4 scroll-custom">
            <div class="color-list acea-row row-middle gap-sm">
              <div
                  class="color-item cursor-pointer"
                  :class="{ 'active': colorSelected?.includes(item) }"
                  v-for="item in popupCurrentMenu.children"
                  :key="item.id"
                  @click="clickColorType(item)"
              >
                <div class="circle rounded-full" :style="{ ...getColorStyle(item.config.color!) }"/>
              </div>
            </div>
          </div>
        </template>

        <!-- SHAPE -->
        <template v-if="popupCurrentMenu.config?.type === 'SHAPE'">
          <div
              class="text-20 py-16 border-b-sm border-gray-200 acea-row row-between-wrapper"
              v-for="item in popupCurrentMenu.children"
              :key="item.id"
              @click="clickShapeType(item)"
          >
            <span>{{ item.name }}</span>
            <SvgIcon
                :name="shapeSelected?.id === item.id ? 'check-fill' : 'check'"
                style="font-size: 20px"
                :class="[shapeSelected?.id === item.id ? 'text-primary' : 'text-gray-400']"
            />
          </div>
        </template>
      </div>
    </template>
    <template #footer>
      <div class="mt-20 mb-12 acea-row nowrap gap-column-xs scroll-x scroll-hide">
        <!--排序 选中的值-->
        <el-tag
            v-if="sortSelected.id"
            size="large"
            type="info" round
            class="cursor-pointer"
            :closable="true"
            @close="handleSort({} as IHome.MenuRow)"
        >
          {{ sortSelected.name }}
        </el-tag>
        <!--Price 选中的值-->
        <el-tag
            size="large"
            v-if="priceSubmitted"
            type="info" round
            class="cursor-pointer"
            closable
            @close="closePriceTag"
        >
          {{ priceSubmitted }}
        </el-tag>
        <!--Radio 选中的值-->
        <el-tag
            size="large"
            type="info" round
            v-for="(item, index) in radioSubmitted"
            :key="item.id"
            class="cursor-pointer"
            closable
            @close="closeRadioTag(item, index)"
        >
          {{ item.name }}
        </el-tag>
        <!--Checkout 选中的值-->
        <el-tag
            size="large"
            type="info" round
            v-for="(item, index) in checkboxSubmitted"
            :key="item.id"
            class="cursor-pointer"
            closable
            @close="closeCheckboxTag(item, index)"
        >
          {{ item.name }}
        </el-tag>
        <!--Color 选中的值-->
        <el-tag
            size="large"
            type="info" round
            v-for="(item, index) in colorSubmitted"
            :key="item.id"
            class="cursor-pointer"
            closable
            @close="closeColorTag(item, index)"
        >
          {{ item.name }}
        </el-tag>
        <!--Shape 选中的值-->
        <el-tag
            size="large"
            type="info" round
            v-if="shapeSubmitted.id"
            class="cursor-pointer"
            closable
            @close="closeShapeTag()"
        >
          {{ shapeSubmitted.name }}
        </el-tag>
        <!--Artist 选中的值-->
        <el-tag
            v-if="artistSelected.id"
            size="large"
            type="info" round
            class="cursor-pointer"
            closable
            @close="closeArtistTag()"
        >
          {{ artistSelected.name }}
        </el-tag>
      </div>

      <div class="acea-row side-button mt-20 mt-20">
        <el-button @click="reset()">Reset</el-button>
        <el-button type="primary" class="flex-1" @click="routerJump()">See all items</el-button>
      </div>
    </template>
  </Popup>

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {
  getProductGroupApi,
  getProductListApi,
  getProductRecommendedListApi
} from "~/api/modules/product/product";
import type {IHome} from "~/api/interface/home/home";
import type {IProduct} from "~/api/interface/product/product";
import {debounce} from "~/utils";
import {useAppStore} from "~/stores/modules/app";
import {ElMessage} from "element-plus";
import ProList from "~/components/ProList/index.vue";
import {
  gen_path_arr,
  gen_path_obj,
  process_ARTIST,
  process_CHECKBOX,
  process_COLOR,
  process_GROUP_RADIO,
  process_MUTEX,
  process_PRICE,
  process_SORT
} from "~/utils/product";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import {productThumbsApi} from "~/api/modules/likes/likes";
import {formatInteger} from "~/utils/format";
import {useCurrencyStore} from "~/stores/modules/currency";
import {cloneDeep} from "lodash-es";
import {SORT_MENU} from "~/constant";
import {resolvePageMeta, mergeHeadWithLodash} from "~/config/pageMeta";
import {unpackQuery, packQuery, type QueryParams} from '~/composables/useQueryShort'
import type {ObjectNode} from "~/types/global";
import {useBreadcrumbStore, type BreadcrumbItem} from "~/stores/modules/breadcrumb";
import type {ISearch} from "~/api/interface/search/search";
import {getSearchSeoApi} from "~/api/modules/search/search";

defineOptions({
  name: 'ProductList'
})

definePageMeta({
  isShowActivity: true,
  showBreadcrumb: true
})

onMounted(() => {
  $bus.on('loginSuccess', paramsWatch)
  paramsWatch()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  $bus.off('loginSuccess', paramsWatch)
  document.removeEventListener('click', handleClickOutside)
})

const {$bus} = useNuxtApp()
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const {getCurrencySymbol} = useCurrencyStore();
const origin = useRequestURL().origin
const breadcrumbStore = useBreadcrumbStore()
const isDev = import.meta.env.DEV // 区分环境
const isFilter = ref(true)
const initPage = ref(true)
const proListRef = ref<InstanceType<typeof ProList>>();
const getProductListApiFn = (params: IProduct.ListQuery) => getProductListApi(params)
const initParam = reactive<any>({
  size: 50,
  categoryIds: [],
  attributeValueIds: [],
  keyword: null,
  searchType: null,
  sort: '0',
  startPrice: null,
  endPrice: null,
  shape: null,
  creatorId: null,
})

// 当前页码
const pageSelected = ref<number | null>(null)

// 获取左侧筛选数据
const menuId = ref<string | null>(null)
const groupList = ref<IHome.MenuRow[]>([])
const getProductGroup = async (id?: string) => {
  if (menuId.value === id) return // 相同的 ID 不会多次触发
  menuId.value = id || ''
  const {data} = await getProductGroupApi({parentId: menuId.value})
  const oldGroups = cloneDeep(groupList.value)
  groupList.value = data.map(newItem => {
    const oldItem = oldGroups.find(old => old.id === newItem.id)
    return {
      ...newItem,
      isShow: oldItem ? oldItem.isShow : false // 已存在的项保留状态，新增项默认true
    } as IHome.MenuRow
  })

  if (appStore.device === 'app') {
    nextTick(() => {
      const container = appFilterRef.value
      if (!container) return
      // 只获取一次
      if (!appFilterItemRect.length) {
        Array.from(container?.children ?? []).forEach((node, index) => {
          appFilterItemRect[index] = node.getBoundingClientRect()
        })
      }
    })
  }
}

// 搜索框逻辑
const searchType = ref<ISearch.KeywordType | null>(null)
const keyword = ref('')
const activeKeyword = ref('')
const onSearch = () => {
  if (proListRef.value?.loading) return
  activeKeyword.value = keyword.value
  searchType.value = 'product'
  routerJump(true, true)
}

// ------ 点击Artist类型的选项（这里需要立即更新数据） ------
const artistSelected = ref({} as IHome.MenuRow)
// 关闭Artist类型的选项
const closeArtistTag = () => {
  artistSelected.value = {} as IHome.MenuRow
  routerJump(true)
}

// ------ 点击Price类型的选项（这里需要拿到起始和结束的值）(笃定只会返回一个Price) ------
const isCustomPrice = ref(false) // 是否自定义价格区间
const startPrice = ref('')
const endPrice = ref('')
const priceSelected = ref({} as IHome.MenuRow) // 选中的值
const priceSubmitted = ref('') // 确定提交的数据
const clickPriceType = (item?: IHome.MenuRow, isApp = false) => {
  if (item) {
    const isSame = priceSelected.value.id === item.id
    if (isSame) {
      priceSelected.value = {} as IHome.MenuRow
      return
    }
    priceSelected.value = item
    isCustomPrice.value = false
    startPrice.value = ''
    endPrice.value = ''
    // 移动端的筛选附加逻辑
    if (isApp) {
      isSliderPrice.value = true
      priceRange.value[0] = Number(item.config.startPrice)
      priceRange.value[1] = Number(item.config.endPrice || PRICER_MAX)
    }
  }
  // 点击自定义价格区间
  else {
    priceSelected.value = {} as IHome.MenuRow
    isCustomPrice.value = !isCustomPrice.value
  }
}
// 关闭Price类型的选项
const closePriceTag = () => {
  isSliderPrice.value = false
  isCustomPrice.value = false
  startPrice.value = ''
  endPrice.value = ''
  priceSelected.value = {} as IHome.MenuRow
  priceSubmitted.value = ''
  if (appStore.device === 'pc') routerJump(true)
}
const onStartPriceBlur = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  if (value === '') return
  startPrice.value = formatInteger(value)
}
const onEndPriceBlur = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  if (value === '') return
  endPrice.value = formatInteger(value)
}

// ------ 点击Radio类型的选项（可以取消选择）------
const radioSelected = ref(new Map<string, IHome.MenuRow>())
const radioSubmitted = ref<IHome.MenuRow[]>([]) // 确定提交的数据
const clickRadioType = (item: IHome.MenuRow) => {
  const current = radioSelected.value.get(item.parentId)
  const isSame = current && current.id === item.id
  if (isSame) {
    radioSelected.value.delete(item.parentId)
  } else {
    radioSelected.value.set(item.parentId, item)
  }
}
// 关闭Radio类型的选项
const closeRadioTag = (item: IHome.MenuRow, index: number) => {
  radioSelected.value.delete(item.parentId)
  radioSubmitted.value.splice(index, 1)
  if (appStore.device === 'pc') routerJump(true)
}

// ------ 点击Checkbox类型的选项（这里可以多选）------
const checkboxSelected = ref(new Map<string, IHome.MenuRow[]>())
const checkboxSubmitted = ref<IHome.MenuRow[]>([]) // 确定提交的数据
const clickCheckoutType = (item: IHome.MenuRow) => {
  const parentId = item.parentId
  const currentArr = checkboxSelected.value.get(parentId) ?? []
  const idx = currentArr.findIndex(i => i.id === item.id)
  if (idx === -1) {
    currentArr.push(item)
  } else {
    currentArr.splice(idx, 1)
  }
  checkboxSelected.value.set(parentId, [...currentArr]) // 触发响应式更新
}
// 关闭Checkbox类型的选项
const closeCheckboxTag = (item: IHome.MenuRow, index: number) => {
  const parentId = item.parentId
  const currentArr = checkboxSelected.value.get(parentId) ?? []
  const idx = currentArr.findIndex(i => i.id === item.id)
  if (idx !== -1) {
    currentArr.splice(idx, 1)
    checkboxSelected.value.set(parentId, [...currentArr])
  }
  checkboxSubmitted.value.splice(index, 1)
  if (appStore.device === 'pc') routerJump(true)
}

// ------ 点击Shape类型的选项（笃定只会返回一个Shape）------
const shapeSelected = ref({} as IHome.MenuRow)
const shapeSubmitted = ref({} as IHome.MenuRow) // 确定提交的数据
const clickShapeType = (item: IHome.MenuRow) => {
  const isSame = shapeSelected.value.id === item.id
  if (isSame) {
    shapeSelected.value = {} as IHome.MenuRow
    return
  }
  shapeSelected.value = item
}
// 关闭Shape类型的选项
const closeShapeTag = () => {
  shapeSelected.value = {} as IHome.MenuRow
  shapeSubmitted.value = {} as IHome.MenuRow
  routerJump(true)
}

// ------ 点击Color类型的选项（笃定只会返回一个Color）------
const colorSelected = ref<IHome.MenuRow[]>([])
const colorSubmitted = ref<IHome.MenuRow[]>([]) // 确定提交的数据
const clickColorType = (item: IHome.MenuRow) => {
  const idx = colorSelected.value.findIndex(i => i.id === item.id)
  if (idx === -1) {
    colorSelected.value.push(item)
  } else {
    colorSelected.value.splice(idx, 1)
  }
}
// 关闭Color类型的选项
const closeColorTag = (item: IHome.MenuRow, index: number) => {
  const idx = colorSelected.value.findIndex(i => i.id === item.id)
  if (idx !== -1) {
    colorSelected.value.splice(idx, 1)
  }
  colorSubmitted.value.splice(index, 1)
  if (appStore.device === 'pc') routerJump(true)
}
// 获取颜色样式
const getColorStyle = (colorStr: string) => {
  if (colorStr.includes('&')) {
    const [c1, c2] = colorStr.split('&')
    return {
      background: `linear-gradient(120deg, ${c1} 0%, ${c1} 49%, ${c2} 50%, ${c2} 100%)`,
    }
  } else {
    return {
      background: colorStr,
    }
  }
}

// ------ 排序------
const containerRef = ref<HTMLElement | null>(null)
const isSort = ref(false)
const sortSelected = ref({} as IHome.MenuRow) // 排序选中的值
const handleSort = (menu: IHome.MenuRow) => {
  if (sortSelected.value?.id === menu?.id) return
  sortSelected.value = menu
  isSort.value = false
  routerJump(true)
}

// 移动端价格滑块
const isSliderPrice = ref(false) // 只有触发滑块或者路径参数才会传递给接口
const PRICER_MAX = 1000
const priceRange = ref([0, PRICER_MAX])
const priceRangeChange = () => { isSliderPrice.value = true }

// 移动弹出层
const popupHeaderRef = ref<HTMLElement>()
let popupHeaderItemRect = [] as DOMRect[]
const appFilterRef = ref<HTMLElement>()
let appFilterItemRect = [] as DOMRect[]
const isPopup = ref(false)
const popupCurrentMenu = ref({} as IHome.MenuRow)
const extraLength = ref(1) // 表示在移动端中PopupHeader中额外的选项数量，目前只有一个是追加的排序

// 点击App端的筛选按钮
const clickAppFilter = (type: 'SORT' | 'POPUP', index: number, menu?: IHome.MenuRow) => {
  isPopup.value = true

  if (type === 'SORT') {
    menu = SORT_MENU
    clickPopupHeader(index, menu)
  }

  if (type === 'POPUP') {
    clickPopupHeader(index + extraLength.value, menu!)
  }

  nextTick(() => {
    const container = appFilterRef.value
    if (!container) return
    const pageW = document.documentElement.clientWidth
    const idx = type === 'POPUP' ? index + extraLength.value : index
    const currentRect = appFilterItemRect[idx]
    const left = currentRect!.left - pageW / 2 + currentRect!.width / 2
    container.scrollTo({left, behavior: 'smooth'})
  })
}

// 点击PopupHeader
const clickPopupHeader = (index: number, menu: IHome.MenuRow) => {
  popupCurrentMenu.value = menu

  nextTick(() => {
    const container = popupHeaderRef.value
    if (!container) return
    // 只获取一次
    if (!popupHeaderItemRect.length) {
      Array.from(container?.children ?? []).forEach((node, index) => {
        popupHeaderItemRect[index] = node.getBoundingClientRect()
      })
    }
    const pageW = document.documentElement.clientWidth
    const currentRect = popupHeaderItemRect[index]
    const left = currentRect!.left - pageW / 2 + currentRect!.width / 2
    container.scrollTo({left, behavior: 'smooth'})
  })
}

// 重置
const reset = () => {
  shapeSelected.value = {} as IHome.MenuRow

  priceSelected.value = {} as IHome.MenuRow

  isCustomPrice.value = false
  isSliderPrice.value = false
  startPrice.value = ''
  endPrice.value = ''
  priceSubmitted.value = ''

  radioSelected.value.clear()

  checkboxSelected.value.clear()

  colorSelected.value = []

  artistSelected.value = {} as IHome.MenuRow

  sortSelected.value = {} as IHome.MenuRow

  pageSelected.value = null

  routerJump(false)
}

// 获取产品列表
const getProductList = async () => {

  // SHAPE
  const shape = shapeSelected.value
  shapeSubmitted.value = shape || {}

  // RADIO
  const radio = Array.from(radioSelected.value.values())
  radioSubmitted.value = [...radio]

  // CHECKBOX
  const checkbox = Array.from(checkboxSelected.value.values()).flat()
  checkboxSubmitted.value = [...checkbox]

  // PRICE
  let start = null
  let end = null

  // PC
  if (appStore.device === 'pc') {
    // 自定义价格区间
    if (isCustomPrice.value) {
      priceSubmitted.value = `${startPrice.value}-${endPrice.value}`
      start = startPrice.value
      end = endPrice.value
    }
    // 固定价格区间
    else if (priceSelected.value.id) {
      priceSubmitted.value = priceSelected.value.name
      start = priceSelected.value.config.startPrice
      end = priceSelected.value.config.endPrice
    }
  }
  // APP
  else {
    if (isSliderPrice.value) {
      priceSubmitted.value = priceRange.value.join('-')
      start = priceRange.value[0]
      end = priceRange.value[1]
    }
  }

  // COLOR
  const color = colorSelected.value
  colorSubmitted.value = [...color]

  // PAGE
  const page = pageSelected.value

  initParam.categoryIds = [
    ...radio.map(item => item.id), // Radio类型的选项
    ...checkbox.map(item => item.id), // Checkout类型的选项
    ...color.map(item => item.id), // Color类型的选项
  ]
  initParam.sort = sortSelected.value?.config?.code ?? null
  initParam.shape = shape?.config?.referenceId ?? null
  initParam.startPrice = start
  initParam.endPrice = end
  initParam.creatorId = artistSelected.value.config?.referenceId || artistSelected.value.id || null
  initParam.keyword = handleStr.value || activeKeyword.value || null // 这里的逻辑很奇怪，产品的关键词和菜单共用一个，使用 searchType 区分类型
  initParam.searchType = searchType.value || null
  initParam.page = page || 1
  await nextTick()
  proListRef.value?.search(initPage.value);
  isPopup.value = false
}

// 点击艺术家
const handleClickArtist = (creator: ObjectNode.Creator) => {
  artistSelected.value = {name: creator.name, id: creator.id} as IHome.MenuRow
  routerJump(true)
}

// 是否有筛选值的计算属性（选中总数必须大于1）
const hasFilterSelected = computed<boolean>(() => {
  // 将每个维度的判断结果转换为 1（已选） 或 0（未选）
  const shapeCount = Object.keys(shapeSubmitted.value).length > 0 ? 1 : 0
  const artistCount = Object.keys(artistSelected.value).length > 0 ? 1 : 0
  const priceCount = priceSubmitted.value !== '' ? 1 : 0

  // 对于数组
  const radioCount = radioSubmitted.value.length
  const checkboxCount = checkboxSubmitted.value.length
  const colorCount = colorSubmitted.value.length

  // 计算激活的筛选维度总和
  const totalCount = shapeCount + artistCount + priceCount + radioCount + checkboxCount + colorCount

  // 大于1个维度才为 true
  return totalCount > 1
})

// 收藏/取消收藏
const productThumbs = debounce(async (item) => {
  if (!userStore.isLogin) {
    showLoginWindow()
    return
  }
  await productThumbsApi({mediaId: item.id, operate: ~~!item.like as Dict.ThumbsOperateType})
  item.like = !item.like
}, 300)

const loginWindowRef = ref<InstanceType<typeof LoginWindow>>()
const showLoginWindow = () => {
  loginWindowRef.value?.open()
}

/**
 * 路由跳转
 * @param partial (用于局部更新，只会传递提交过的数据,主要用于关闭tag的时候使用)
 * @param initPageFlag (是否初始化页码为1)
 */
const routerJump = (partial = false, initPageFlag = true) => {
  const {START_PRICE, END_PRICE, PRICE} = routerParams.value

  const params: any = {MENU_ID: menuId.value}

  // SORT
  const sort = sortSelected.value
  if (Object.keys(sort).length) {
    Object.assign(params, gen_path_obj(sort, 'SORT'))
  }

  // SHAPE
  const shape = partial ? shapeSubmitted.value : shapeSelected.value
  if (Object.keys(shape).length) {
    Object.assign(params, gen_path_obj(shape, 'SHAPE'))
  }

  // RADIO
  const radio = partial ? radioSubmitted.value : Array.from(radioSelected.value.values())
  if (radio.length) {
    Object.assign(params, gen_path_arr(radio, 'RADIO'))
  }

  // CHECKBOX
  const checkbox = partial ? checkboxSubmitted.value : Array.from(checkboxSelected.value.values()).flat()
  if (checkbox.length) {
    Object.assign(params, gen_path_arr(checkbox, 'CHECKBOX'))
  }

  // COLOR
  const color = partial ? colorSubmitted.value : colorSelected.value
  if (color.length) {
    Object.assign(params, gen_path_arr(color, 'COLOR'))
  }

  // PRICE
  if (partial) {
    if (priceSubmitted.value) {
      if (START_PRICE && END_PRICE) {
        params['START_PRICE'] = START_PRICE
        params['END_PRICE'] = END_PRICE
      }
      if (PRICE) {
        params['PRICE'] = PRICE
      }
    }
  } else {
    if (appStore.device === 'pc') {
      // 自定义价格区间
      if (isCustomPrice.value) {
        if (!startPrice.value || !endPrice.value || parseInt(startPrice.value) > parseInt(endPrice.value)) {
          return ElMessage.error('Please input valid price range')
        }
        params['START_PRICE'] = startPrice.value
        params['END_PRICE'] = endPrice.value
      }
      // 固定价格区间
      else if (priceSelected.value.id) {
        Object.assign(params, gen_path_obj(priceSelected.value, 'PRICE'))
      }
    } else {
      // 只有滑动了或者打开弹出才需要提交
      if (isSliderPrice.value) {
        params['START_PRICE'] = priceRange.value[0]
        params['END_PRICE'] = priceRange.value[1]
      }
    }
  }

  // ARTIST
  const artist = artistSelected.value
  if (artist.id) {
    Object.assign(params, gen_path_obj(artist, 'ARTIST', ['name']))
  }

  // KEYWORD
  const currentKeyword = activeKeyword.value
  if (currentKeyword) {
    params['KEYWORD'] = currentKeyword
  }

  // 搜索类型
  if (searchType.value) {
    params['SEARCH_TYPE'] = searchType.value
  }

  if (initPageFlag) {
    params['PAGE'] = 1
  } else if (pageSelected.value) {
    params['PAGE'] = pageSelected.value
  }

  const q = packQuery(params)
  router.replace({query: {q}})
}

// 自定义分页页码监听
const handleCurrentChange = (val: number) => {
  pageSelected.value = val
  routerJump(true, false)
}

const handleStr = ref<string | null>(null)
const routerParams = ref({} as QueryParams)
/**
 * 监听路由变化
 */
const paramsWatch = async () => {
  if (route.query.q) routerParams.value = unpackQuery(route.query.q)
  console.log(routerParams.value)
  const {
    PRICE,
    START_PRICE,
    END_PRICE,
    RADIO,
    CHECKBOX,
    COLOR,
    ARTIST,
    KEYWORD,
    SEARCH_TYPE,
    PAGE,
    SHAPE,
    SORT,
    MENU_ID
  } = routerParams.value

  // 判断当前路由是否包含了必须依赖 groupList 进行解析的参数
  // 注意：SHAPE / PRICE / RADIO / CHECKBOX / COLOR / ARTIST 依赖到查字典
  const needsDictionaryMapping = PRICE || SHAPE || RADIO || CHECKBOX || COLOR || ARTIST;

  // 触发获取字典的请求，并把 Promise 存起来，而不是直接 await
  const fetchGroupPromise = getProductGroup(MENU_ID)

  //【核心按需阻塞】只有携带了复杂参数，才等待字典返回
  if (needsDictionaryMapping) {
    await fetchGroupPromise
  }

  // SHAPE
  if (SHAPE) {
    shapeSelected.value = process_MUTEX(groupList.value, SHAPE)
  } else {
    shapeSelected.value = {} as IHome.MenuRow
  }

  // PAGE
  if (PAGE) {
    pageSelected.value = Number(PAGE)
    initPage.value = false
  } else {
    initPage.value = true
  }

  // SORT
  if (SORT) {
    sortSelected.value = process_SORT([SORT_MENU], SORT)
  } else {
    sortSelected.value = {} as IHome.MenuRow
  }

  // PRICE类型的值（固定区间）
  if (PRICE) {
    priceSelected.value = process_PRICE(groupList.value, PRICE)!
    if (appStore.device === 'app') {
      isSliderPrice.value = true
      priceRange.value[0] = Number(priceSelected.value.config.startPrice)
      priceRange.value[1] = Number(priceSelected.value.config.endPrice || PRICER_MAX)
    }
  }
  // PRICE类型的值（指定区间）
  else if (START_PRICE && END_PRICE) {
    if (appStore.device === 'pc') {
      isCustomPrice.value = true
      startPrice.value = START_PRICE
      endPrice.value = END_PRICE
    } else {
      isSliderPrice.value = true
      priceRange.value[0] = Number(START_PRICE)
      priceRange.value[1] = Number(END_PRICE)
    }
  }

  // RADIO类型的值
  if (RADIO) {
    radioSelected.value = process_GROUP_RADIO(groupList.value, RADIO)
  } else {
    radioSelected.value.clear()
  }

  // CHECKBOX类型的值
  if (CHECKBOX) {
    checkboxSelected.value = process_CHECKBOX(groupList.value, CHECKBOX)
  } else {
    checkboxSelected.value.clear()
  }

  // COLOR类型的值
  if (COLOR) {
    colorSelected.value = process_COLOR(groupList.value, COLOR)
  } else {
    colorSelected.value = []
  }

  // ARTIST类型的值
  if (ARTIST) {
    artistSelected.value = process_ARTIST(groupList.value, ARTIST)
  } else {
    artistSelected.value = {} as IHome.MenuRow
  }

  // 关键词
  if (KEYWORD) {
    keyword.value = KEYWORD
    activeKeyword.value = KEYWORD
  } else {
    keyword.value = ''
    activeKeyword.value = ''
  }

  // 从搜索页面过来的类型
  if (SEARCH_TYPE) {
    searchType.value = SEARCH_TYPE
  } else {
    searchType.value = null
  }

  // 获取SEO相关数据
  const currentHandle = route.params.handle
  if (!currentHandle) {
    handleStr.value = null
  } if (currentHandle !== handleStr.value) {
    handleStr.value = currentHandle as string
    getSearchSeo()
  }

  getProductList()
}

// ⬇️ 定义滚动动作
const executeScroll = () => {
  if (!process.client) return

  // 使用 requestAnimationFrame 确保在浏览器渲染下一帧时执行，防止 DOM 还没准备好
  requestAnimationFrame(() => {
    const anchor = document.getElementById('list-anchor')

    if (anchor) {
      // 偏移量计算
      const root = document.documentElement
      const cssValue = getComputedStyle(root).getPropertyValue('--header-height').trim()
      const headerOffset = parseInt(cssValue, 10) || 0
      const elementPosition = anchor.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition - 15,
        behavior: 'smooth' // 建议用 auto (瞬间)，配合骨架屏体验更好；smooth 可能会有视觉上的拉扯
      })
    }
  })
}

// 监听生成面包屑
/**
 * 根据 menuId 查找该项及其所有父级，并直接转换为面包屑所需的数据结构
 * @param menuList - 菜单数据源
 * @param menuId - 目标菜单 id
 * @returns 包含从根节点到目标节点的 BreadcrumbItem 数组，未找到则返回空数组
 */
const getBreadcrumbList = (menuList: IHome.MenuRow[], menuId: string): BreadcrumbItem[] => {
  for (const currentItem of menuList) {
    // 1. 如果当前节点就是目标节点，将其转换为 BreadcrumbItem 并作为数组第一项返回
    if (currentItem.id === menuId) {
      return [{name: currentItem.name}];
    }

    // 2. 如果当前节点有子节点，进入递归
    if (currentItem.children && Array.isArray(currentItem.children)) {
      const childPath = getBreadcrumbList(currentItem.children, menuId);

      // 3. 如果子节点中找到了路径，将当前节点也转换为 BreadcrumbItem，并拼接到路径最前面
      if (childPath.length > 0) {
        return [{name: currentItem.name}, ...childPath];
      }
    }
  }

  // 4. 当前分支没找到，返回空数组
  return [];
};
watch(
    () => [route.query.q, appStore.menuList],
    ([newQ, newMenuData]) => {
      // 只有当参数和菜单数据都准备好的时候，才去调用 Store 生成面包屑
      if (newQ && newMenuData && (newMenuData as any[]).length > 0) {
        const {MENU_ID} = unpackQuery(route.query.q)
        const breadcrumbs = getBreadcrumbList(appStore.menuList, MENU_ID)
        if (breadcrumbs && breadcrumbs.length > 0) breadcrumbStore.setBreadcrumbs(breadcrumbs)
        else breadcrumbStore.clearBreadcrumbs()
      }
    },
    {immediate: true}
)

// ------ 获取推荐数据，只有在 search 没有数据的情况下调用 ------
const isShowRecommended = ref(false)
const proListRecommendedRef = ref<InstanceType<typeof ProList>>();
const getProductRecommendedList = (params: IProduct.ListQuery) => getProductRecommendedListApi(params)
const commentTotal = computed(() => proListRef.value?.pageable?.total)
watch(
    () => commentTotal.value,
    (total: number) => {
      if (proListRef.value?.requestFinished && total <= 0) {
        isShowRecommended.value = true
      } else {
        isShowRecommended.value = false
      }
    }
)

// ------ 获取页面的标题和描述 ------
const pageSeo = ref<ISearch.SearchSeoRow | null>(null)
const getSearchSeo = async () => {
  const {data} = await getSearchSeoApi({ slug: handleStr.value!, type: searchType.value })
  pageSeo.value = data
}

// ------ 构建聚合计算属性 ------
type CountsMapType = Record<Dict.CategoryType, Record<string, number>>;
const countsMap = computed<CountsMapType>(() => {
  // 【安全机制 1】：初始化结构！
  // 预先占位第一层级的 key，确保 countsMap['RADIO'] 永远是一个对象，而不是 undefined
  const map: CountsMapType = {
    RADIO: {},
    CHECKBOX: {},
    COLOR: {}
  };

  // 封装一个通用的统计函数
  const populateMap = (type: Dict.CategoryType, dataArray: IHome.MenuRow[] | null | undefined) => {
    // 【安全机制 2】：防止传入的 dataArray 是 null 或 undefined
    if (!dataArray || !Array.isArray(dataArray)) return;

    dataArray.forEach(item => {
      // 【安全机制 3】：确保 item 和 parentId 存在
      if (item && item.parentId) {
        map[type][item.parentId] = (map[type][item.parentId] || 0) + 1;
      }
    });
  };

  // 分别统计各个数据源
  populateMap('RADIO', radioSubmitted.value);
  populateMap('CHECKBOX', checkboxSubmitted.value);
  populateMap('COLOR', colorSubmitted.value);

  return map;
});

// ------ SEO ------
const canonicalUrl = `${origin}${route.path}`
useHead(computed(() => {
  return mergeHeadWithLodash(
      resolvePageMeta("/collections"),
      {
        ...(pageSeo.value?.name && {title: `${pageSeo.value.name} - Hand-Painted Canvas Art | ARTDAFEN`}),
        meta: [
          {
            name: 'robots',
            content: 'index, follow'
          },
          ...(pageSeo.value?.description ? [{name: 'description', content: pageSeo.value.description}] : [])
        ],

        link: [{rel: 'canonical', href: canonicalUrl}]
      }
  );
}));

// 点击外部自动收起
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isSort.value = false
  }
}

// 监听路由的变化
if (import.meta.client) {
  watch(
      () => route.fullPath,
      () => {
        paramsWatch()
      },
      {immediate: false}
  )
  // watch(
  //     () => route.params.handle,
  //     (handle: string) => {
  //       console.log('handle', handle)
  //       console.log('searchType', searchType.value)
  //       if (handle) getSearchSeo()
  //       else pageSeo.value = null
  //     },
  //     {immediate: true}
  // )
}
</script>

<style scoped lang="scss">
  /* 单个设置组 (相对定位，用于包裹下拉框) */
  .loc-group {
    position: relative;
    cursor: pointer;

    /* 当前显示的文字 */
    .loc-current {
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;

      .loc-text {
        color: #666;
        transition: color 0.2s;
      }

      .loc-arrow {
        background: var(--el-color-info);
        color: var(--el-color-white);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        transition: all 0.2s;

        .iconify {
          font-size: 12px;
        }
      }
    }

    /* 激活状态 */
    &.active {
      .loc-current {
        .loc-text {
          color: #000;
          text-decoration: underline; /* 悬停时加下划线提示可点击 */
          transition: color 0.2s;
        }

        .loc-arrow {
          background: var(--el-color-primary);
          transform: rotate(180deg);
        }
      }

      /* 鼠标悬停时显示下拉面板 */
      .loc-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(10px); /* 向上滑入 */
      }
    }

    /* --- 悬停下拉面板 --- */
    .loc-dropdown {
      position: absolute;
      top: 100%; /* 贴在文字正下方 */
      right: 0;
      transform: translateY(25px); /* 稍微往下偏移 */
      background: #fff;
      border: 1px solid #eee;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999;
      max-height: 320px; /* 大约能显示 8-10 个选项的高度 */
      overflow-y: auto;
      /* Firefox 浏览器的极简滚动条支持 */
      scrollbar-width: thin;
      scrollbar-color: #e0e0e0 transparent;

      /* =========================================
       Webkit (Chrome/Safari/Edge) 自定义优雅滚动条
       ========================================= */
      &::-webkit-scrollbar {
        width: 4px; /* 极细的宽度，不抢视觉焦点 */
      }

      &::-webkit-scrollbar-track {
        background: transparent; /* 轨道透明 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: #e0e0e0; /* 浅灰色滑块 */
        border-radius: 4px; /* 圆角显得更精致 */

        &:hover {
          background-color: #bdbdbd; /* 鼠标悬停在滚动条上时稍微加深 */
        }
      }
    }
  }

  /* 下拉列表样式 */
  .loc-list {
    list-style: none;
    margin: 0;
    padding: 8px 0;

    .loc-item {
      padding: 8px 20px;
      font-size: 13px;
      font-weight: 400;
      color: #666;
      white-space: nowrap;
      transition: all 0.15s;

      &:hover {
        background: #f9f9f9;
        color: #000;
      }

      /* 当前选中的项加粗变成黑色 */
      &.active {
        font-weight: 600;
        color: #000;
      }
    }
  }

  .search-wrapper {
    .search-header {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #111;
      padding-bottom: 15px;
      flex-shrink: 0;

      .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;

        .search-input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 1.2rem;
          color: #333;
          background: transparent;
          padding-right: 50px; // 为清空按钮留位置

          &::placeholder {
            color: #999;
          }
        }
      }

      .search-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #333;
        margin-left: 15px;

        .iconify {
          font-size: 24px;
        }
      }
    }
  }

  .filter-wrapper {

    .side-wrapper {
      width: 220px;
      height: calc(100vh - 80px);
      position: sticky;
      top: 80px;
      display: flex;
      flex-direction: column;


      .side-menu {
        overflow: hidden auto;
        padding-right: 6px;
      }

      .side-button {
        position: sticky;
        bottom: 0;
        left: 0;
        background: #fff;
      }

      .ttt {
        //width: 100%;
        //height: calc(100vh - 80px);
        //overflow-y: auto;
        //position: sticky;
        //top: 80px;
        //padding-right: 10px;
      }
    }

    .main-wrapper {
      width: 100%;
      min-width: 0;

      .buttons-wrapper {
        position: sticky;
        top: 0;
        z-index: 10;
        background: #fff;
      }

      .nav-list {

        .nav-item {
          position: relative;

          &.on {
            font-weight: bold;
            color: var(--color-primary);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            height: 19px;
            width: 1px;
            background: var(--color-gray-400);
          }

        }
      }
    }
  }

  .color-list {

    .color-item {
      width: 35px;
      height: 35px;
      flex-shrink: 0;

      .circle {
        position: relative;
        width: 26px;
        height: 26px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-origin: center;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-origin: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid var(--color-primary);
          transition: all 0.2s;
          opacity: 0;
        }
      }

      &.active .circle::before {
        width: 34px;
        height: 34px;
        opacity: 1;
      }
    }
  }

  .app-popup-header {
    .head-item {
      color: var(--color-gray-500);

      &.on {
        font-weight: bold;
        color: var(--color-primary);
      }
    }
  }

  .price-range-text {
    font-size: 20px;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    /* 恢复使用 margin-left 动画，让文档流平滑改变，带动右侧内容 */
    /* 同时保留 opacity 增加淡入淡出效果 */
    transition: margin-left 200ms ease-out, opacity 200ms ease-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    margin-left: -220px;
    opacity: 0;
  }

  .slide-fade-enter-to,
  .slide-fade-leave-from {
    margin-left: 0;
    opacity: 1;
  }
</style>