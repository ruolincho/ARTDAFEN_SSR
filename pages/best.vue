<template>
  <section class="filter-wrapper">
    <div class="container-fluid">
      <div class="acea-row row-between">
        <!-- 左侧筛选区域 PC端-->
        <div class="side-wrapper mr-40 mr-40" v-show="appStore.device === 'pc' && groupList.length">

          <template v-for="group in groupList" :key="group.id">
            <!-- MUTEX -->
            <template v-if="group.config?.type === 'MUTEX'">
              <div class="my-24 pr-4 acea-row row-between-wrapper">
                <span class="text-20 f-bold flex-1">{{ group.name }}</span>
                <span class="text-18 cursor-pointer iconfont" :class="[group.isShow ? 'icon-up' : 'icon-down']"
                      @click="group.isShow = !group.isShow"/>
              </div>
              <div class="side-menu pr-4 border-t-lg border-b-lg border-primary" v-show="group.isShow">
                <div
                  class="menu-item cursor-pointer my-20 "
                  :class="{ on: mutexSelected.id === item.id }"
                  v-for="item in group.children"
                  :key="item.parentId + '_' + item.id"
                  @click="clickMutexType(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </template>

            <!-- GROUP -->
            <template v-if="group.config?.type === 'GROUP'">
              <div class="my-24 pr-4 acea-row row-between-wrapper">
                <span class="text-20 f-bold flex-1">{{ group.name }}</span>
                <span class="text-18 cursor-pointer iconfont" :class="[group.isShow ? 'icon-up' : 'icon-down']"
                      @click="group.isShow = !group.isShow"/>
              </div>
              <div class="side-menu pr-4 border-t-lg border-b-lg border-primary" v-show="group.isShow">
                <div
                  class="menu-item cursor-pointer my-20 line1"
                  :class="{ on: groupSelected.get(item.parentId)?.id === item.id }"
                  v-for="item in group.children"
                  :key="item.parentId + '_' + item.id"
                  @click="clickGroupType(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </template>

            <!-- PRICE -->
            <template v-if="group.config?.type === 'PRICE'">
              <div class="my-24 pr-4 acea-row row-between-wrapper">
                <span class="text-20 f-bold flex-1">{{ group.name }}</span>
                <span class="text-18 cursor-pointer iconfont" :class="[group.isShow ? 'icon-up' : 'icon-down']"
                      @click="group.isShow = !group.isShow"/>
              </div>
              <div class="pr-4" v-show="group.isShow">
                <div
                  class="acea-row row-between-wrapper py-20 border-t-sm cursor-pointer"
                  v-for="item in group.children"
                  :key="item.parentId + '_' + item.id"
                  @click="clickPriceType(item)"
                >
                  <span class="text-16">{{ item.name }}</span>
                  <span
                    class="iconfont text-18"
                    :class="[priceSelected.id === item.id && !isCustomPrice ? 'icon-check-fill text-primary' : 'icon-check text-gray-400']"
                  />
                </div>
                <div class="acea-row row-between-wrapper py-20 border-t-sm border-b-sm cursor-pointer"
                     @click="clickPriceType(undefined)">
                  <span class="text-16">Custom</span>
                  <span
                    class="iconfont text-18"
                    :class="[isCustomPrice ? 'icon-check-fill text-primary' : 'icon-check text-gray-400']"
                  />
                </div>
                <div v-show="isCustomPrice">
                  <div class="text-16 my-20">Min Price</div>
                  <div class="acea-row row-between-wrapper px-15 py-12"
                       :class="[!isCustomPrice ?  'bg-gray-100': 'border-sm']">
                    <input type="text" placeholder="1400" style="width: 60%" v-model="startPrice"
                           :disabled="!isCustomPrice" @blur="onStartPriceBlur">
                    <span class="text-gray-600">{{ currencyStore.getCurrencySymbol }}</span>
                  </div>
                  <div class="text-16 my-20">Max Price</div>
                  <div class="acea-row row-between-wrapper px-15 py-12"
                       :class="[!isCustomPrice ?  'bg-gray-100': 'border-sm']"
                  >
                    <input type="text" placeholder="3400" style="width: 60%" v-model="endPrice"
                           :disabled="!isCustomPrice" @blur="onEndPriceBlur">
                    <span class=" text-gray-600">{{ currencyStore.getCurrencySymbol }}</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- RADIO -->
            <template v-if="group.config?.type === 'RADIO'">
              <div class="my-24 pr-4 acea-row row-between-wrapper">
                <span class="text-20 f-bold flex-1">{{ group.name }}</span>
                <span class="text-18 cursor-pointer iconfont" :class="[group.isShow ? 'icon-up' : 'icon-down']"
                      @click="group.isShow = !group.isShow"/>
              </div>
              <div class="scroll-y pr-4 scroll-custom" v-show="group.isShow" style="max-height: 305px;">
                <div
                  class="acea-row row-between-wrapper py-20 border-t-sm border-b-sm cursor-pointer"
                  v-for="item in group.children"
                  :key="item.parentId + '_' + item.id"
                  @click="clickRadioType(item)"
                >
                  <span class="text-16">{{ item.name }}</span>
                  <span
                    class="iconfont text-18"
                    :class="[radioSelected.get(item.parentId)?.id === item.id ? 'icon-check-fill text-primary' : 'icon-check text-gray-400']"
                  />
                </div>
              </div>
            </template>

            <!-- CHECKBOX -->
            <template v-if="group.config?.type === 'CHECKBOX'">
              <div class="my-24 pr-4 acea-row row-between-wrapper">
                <span class="text-20 f-bold flex-1">{{ group.name }}</span>
                <span class="text-18 cursor-pointer iconfont" :class="[group.isShow ? 'icon-up' : 'icon-down']"
                      @click="group.isShow = !group.isShow"/>
              </div>
              <div class="scroll-y pr-4 scroll-custom" v-show="group.isShow" style="max-height: 305px;">
                <div
                  class="acea-row row-between-wrapper py-20 border-t-sm border-b-sm cursor-pointer"
                  v-for="item in group.children"
                  :key="item.parentId + '_' + item.id"
                  @click="clickCheckoutType(item)"
                >
                  <span class="text-16">{{ item.name }}</span>
                  <span
                    class="iconfont text-18"
                    :class="[checkboxSelected.get(item.parentId)?.includes(item) ? 'icon-checkbox-fill text-primary' : 'icon-checkbox text-gray-400']"
                  />
                </div>
              </div>
            </template>

            <!-- COLOR -->
            <template v-if="group.config?.type === 'COLOR'">
              <div class="my-24 pr-4 acea-row row-between-wrapper">
                <span class="text-20 f-bold flex-1">{{ group.name }}</span>
                <span class="text-18 cursor-pointer iconfont" :class="[group.isShow ? 'icon-up' : 'icon-down']"
                      @click="group.isShow = !group.isShow"/>
              </div>
              <div class="color-list pr-4 scroll-y scroll-custom acea-row" v-show="group.isShow">
                <div
                  class="color-item acea-row row-middle cursor-pointer"
                  v-for="item in group.children"
                  :key="item.parentId + '_' + item.id"
                  @click="clickColorType(item)"
                >
                  <div class="rounded-full border-sm p-2" :class="{ 'border-gray-700': colorSelected?.includes(item) }">
                    <div
                      class="circle rounded-full "
                      :style="{ ...getColorStyle(item.config.color!) }"
                    />
                  </div>
                  <div class="pl-10 text-16 flex-1" :class="{ 'f-bold': colorSelected?.includes(item) }">{{
                      item.name
                    }}
                  </div>
                </div>
              </div>
            </template>

            <!-- ARTIST -->
            <template v-if="group.config?.type === 'ARTIST'">
              <div class="my-24 pr-4 acea-row row-between-wrapper">
                <span class="text-20 f-bold flex-1">{{ group.name }}</span>
                <span class="text-18 cursor-pointer iconfont" :class="[group.isShow ? 'icon-up' : 'icon-down']"
                      @click="group.isShow = !group.isShow"/>
              </div>
              <div class="side-menu pr-4 border-t-lg border-b-lg border-primary" v-show="group.isShow">
                <div
                  class="menu-item cursor-pointer my-20"
                  :class="{ on: artistSelected?.id === item.id }"
                  v-for="item in group.children"
                  :key="item.parentId + '_' + item.id"
                  @click="clickArtistType(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </template>

          </template>

          <div class="acea-row side-button mt-40 pb-40">
            <el-button @click="reset()">Reset</el-button>
            <el-button type="primary" class="flex-1" @click="routerJump()">See all items</el-button>
          </div>
        </div>

        <!-- 右侧主要区域 -->
        <div class="main-wrapper flex-1 pt-sm-24 overflow-hidden">
          <!-- 属性 -->
          <div class="border-sm border-gray-700 acea-row row-between" v-if="attributeList.length">
            <div class="nav-list acea-row flex-1">
              <div
                class="nav-item text-16 py-12 px-20 text-gray-400 cursor-pointer"
                :class="{ on: attributeSelected.includes(item) }"
                v-for="item in attributeList"
                :key="item.id"
                @click="clickAttribute(item)"
              >
                {{ item.values }}
              </div>
            </div>
          </div>

          <!--按钮组 Pc端-->
          <div
            class="my-md-30 my-15 acea-row nowrap gap-column-xs scroll-x scroll-hide"
            v-show="appStore.device === 'pc'"
          >
            <!--价格排序-->
            <el-popover ref="pricePopoverRef" trigger="hover" placement="bottom-start" width="200"
                        :popper-style="{ padding: 0 }">
              <template #reference>
                <el-tag
                  size="large"
                  :type="priceSort !== null ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                  :closable="priceSort !== null"
                  @close="handleSort('PRICE_SORT', null)"
                >
                  <div class="acea-row row-middle">
                    <span>{{ priceSort === '0' ? 'Price Desc' : priceSort === '1' ? 'Price Asc' : 'Price Sort' }}</span>
                    <span v-show="priceSort === null" class="iconfont icon-down text-16 ml-10"/>
                  </div>
                </el-tag>
              </template>
              <div
                class="text-14 cursor-pointer text-center my-15 text-hover"
                v-for="sort in SORT_OPTIONS"
                :key="sort.value"
                @click="handleSort('PRICE_SORT', sort.value)"
              >
                {{ sort.label }}
              </div>
            </el-popover>
            <!--销量排序-->
            <el-popover ref="salesPopoverRef" trigger="hover" placement="bottom-start" width="200"
                        :popper-style="{ padding: 0 }">
              <template #reference>
                <el-tag
                  size="large"
                  :type="salesSort !== null ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                  :closable="salesSort !== null"
                  @close="handleSort('SALES_SORT', null)"
                >
                  <div class="acea-row row-middle">
                    <span>{{ salesSort === '0' ? 'Sales Desc' : salesSort === '1' ? 'Sales Asc' : 'Sales Sort' }}</span>
                    <span v-show="salesSort === null" class="iconfont icon-down text-16 ml-10"/>
                  </div>
                </el-tag>
              </template>
              <div
                class="text-14 cursor-pointer text-center my-15 text-hover"
                v-for="sort in SORT_OPTIONS"
                :key="sort.value"
                @click="handleSort('SALES_SORT', sort.value)"
              >
                {{ sort.label }}
              </div>
            </el-popover>
            <!--工艺筛选-->
            <el-popover ref="techniquePopoverRef" trigger="hover" placement="bottom-start" width="200"
                        :popper-style="{ padding: 0 }" v-if="hasTechniqueFilter">
              <template #reference>
                <el-tag
                  size="large"
                  :type="techniqueSelected.value ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                >
                  <div class="acea-row row-middle">
                    <span>{{ techniqueSelected.value ? techniqueSelected.label : 'Technique' }}</span>
                    <span class="iconfont icon-down text-16 ml-10"/>
                  </div>
                </el-tag>
              </template>
              <div
                class="text-14 cursor-pointer text-center my-15 text-hover"
                v-for="item in TECHNIQUE_OPTIONS"
                :key="item.value"
                @click="handleTechnique(item.value)"
              >
                {{ item.label }}
              </div>
            </el-popover>
            <!--Mutex 选中的值-->
            <el-tag
              v-if="mutexSelected.id"
              size="large"
              type="primary" round effect="dark"
              class="cursor-pointer"
              :closable="false"
              @close="closeMutexTag"
            >
              {{ mutexSelected.name }}
            </el-tag>
            <!--Group 选中的值-->
            <el-tag
              size="large"
              type="primary" round effect="dark"
              v-for="[parentId, item] in Array.from(groupSelected)"
              :key="parentId"
              class="cursor-pointer"
              closable
              @close="closeGroupTag(parentId)"
            >
              {{ item.name }}
            </el-tag>
            <!--Price 选中的值-->
            <el-tag
              size="large"
              v-if="priceSubmitted"
              type="primary" round effect="dark"
              class="cursor-pointer"
              closable
              @close="closePriceTag"
            >
              {{ priceSubmitted }}
            </el-tag>
            <!--Radio 选中的值-->
            <el-tag
              size="large"
              type="primary" round effect="dark"
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
              type="primary" round effect="dark"
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
              type="primary" round effect="dark"
              v-for="(item, index) in colorSubmitted"
              :key="item.id"
              class="cursor-pointer"
              closable
              @close="closeColorTag(item, index)"
            >
              {{ item.name }}
            </el-tag>
            <!--Artist 选中的值-->
            <el-tag
              v-if="artistSelected.id"
              size="large"
              type="primary" round effect="dark"
              class="cursor-pointer"
              closable
              @close="closeArtistTag()"
            >
              {{ artistSelected.name }}
            </el-tag>
          </div>

          <!--筛选区域 App端-->
          <div
            class="my-15 acea-row nowrap gap-column-xs scroll-x scroll-hide"
            v-show="appStore.device === 'app'"
            ref="appFilterRef"
          >
            <!--价格排序-->
            <el-tag
              size="large"
              :type="priceSort !== null ? 'primary' : 'info'" round effect="dark"
              class="cursor-pointer"
              @click="clickAppFilter('PRICE_SORT', 0)"
            >
              {{ priceSort === '0' ? 'Price Desc' : priceSort === '1' ? 'Price Asc' : 'Price Sort' }}
            </el-tag>
            <!--销量排序-->
            <el-tag
              size="large"
              :type="salesSort !== null ? 'primary' : 'info'" round effect="dark"
              class="cursor-pointer"
              @click="clickAppFilter('SALES_SORT', 1)"
            >
              {{ salesSort === '0' ? 'Sales Desc' : salesSort === '1' ? 'Sales Asc' : 'Sales Sort' }}
            </el-tag>
            <!--工艺筛选-->
            <el-tag
              v-if="hasTechniqueFilter"
              size="large"
              :type="techniqueSelected.value ? 'primary' : 'info'" round effect="dark"
              class="cursor-pointer"
              @click="clickAppFilter('TECHNIQUE_SORT', 2)"
            >
              {{ techniqueSelected.value ? techniqueSelected.label : 'Technique' }}
            </el-tag>
            <!--全部的筛选-->
            <template v-for="(group, index) in groupList" :key="group.id">
              <!-- MUTEX -->
              <template v-if="group.config?.type === 'MUTEX'">
                <el-tag
                  size="large"
                  :type="mutexSelected.parentId === group.id ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                  @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ mutexSelected.parentId === group.id && mutexSelected.name || group.name }}
                  <span class="iconfont icon-down text-16"></span>
                </el-tag>
              </template>

              <!-- GROUP -->
              <template v-if="group.config?.type === 'GROUP'">
                <el-tag
                  size="large"
                  :type="groupSelected.has(group.id) ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                  @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ groupSelected.get(group.id)?.name || group.name }}
                  <span class="iconfont icon-down text-16"></span>
                </el-tag>
              </template>

              <!-- PRICE -->
              <template v-if="group.config?.type === 'PRICE'">
                <el-tag
                  size="large"
                  :type="priceSubmitted ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                  @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ priceSubmitted || group.name }}
                  <span class="iconfont icon-down text-16"></span>
                </el-tag>
              </template>

              <!-- RADIO -->
              <template v-if="group.config?.type === 'RADIO'">
                <el-tag
                  size="large"
                  :type="radioSubmitted.findIndex(i => i.parentId === group.id) !== -1 ? 'primary' : 'info'" round
                  effect="dark"
                  class="cursor-pointer"
                  @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ radioSubmitted.find(i => i.parentId === group.id)?.name || group.name }}
                  <span class="iconfont icon-down text-16"></span>
                </el-tag>
              </template>

              <!-- CHECKBOX -->
              <template v-if="group.config?.type === 'CHECKBOX'">
                <el-tag
                  size="large"
                  :type="checkboxSubmitted.findIndex(i => i.parentId === group.id) !== -1 ? 'primary' : 'info'" round
                  effect="dark"
                  class="cursor-pointer"
                  @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ checkboxSubmitted.find(i => i.parentId === group.id)?.name || group.name }}
                  <span class="iconfont icon-down text-16"></span>
                </el-tag>
              </template>

              <!-- COLOR -->
              <template v-if="group.config?.type === 'COLOR'">
                <el-tag
                  size="large"
                  :type="colorSubmitted.length ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                  @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ colorSubmitted[0]?.name || group.name }}
                  <span class="iconfont icon-down text-16"></span>
                </el-tag>
              </template>

              <!-- ARTIST -->
              <template v-if="group.config?.type === 'ARTIST'">
                <el-tag
                  size="large"
                  :type="artistSelected.parentId === group.id ? 'primary' : 'info'" round effect="dark"
                  class="cursor-pointer"
                  @click="clickAppFilter('POPUP', index, group)"
                >
                  {{ group.name }}
                  <span class="iconfont icon-down text-16"></span>
                </el-tag>
              </template>
            </template>
          </div>

          <!--商品数据-->
          <div style="min-height: 50vh" v-loading="loading">
            <div class="row product-list gap-row-base" v-if="productList.length">
              <div class="col-2xl-average col-lg-3 col-md-4 col-6" v-for="(item, index) in productList" :key="item.id">
                <div class="product-item cursor-pointer" @click="jumpToProduct(item)">
                  <div class="img-wrapper bg-gray-100">
                    <img v-lazy="imagePrefix(item.img)" alt="">
                    <div class="tags-wrapper acea-row row-between-wrapper" v-if="item.techniqueId === '3000015'">
                      <div class="p-tag bg-gray-700" v-if="item.status === '0'">For Sale</div>
                      <div class="p-tag bg-error" v-if="item.status === '-1'">Sale Out</div>
                    </div>
                    <div class="operation rounded-full p-5">
                  <span class="iconfont icon-follow text-24 text-primary" v-show="!item.like"
                        @click.stop="productThumbs(item)"></span>
                      <span class="iconfont icon-follow-fill text-24 text-error" v-show="item.like"
                            @click.stop="productThumbs(item)"></span>
                    </div>
                    <div class="num acea-row row-center-wrapper text-20">{{ index + 1 }}</div>
                  </div>
                  <div class="content-wrapper">
                    <p class="my-8 line1">
                  <span class="text-16 f-bold" @click.stop="handleClickArtist(item.creator)">{{
                      item.creator?.name
                    }}</span>
                      <span class="iconfont icon-right text-16"></span>
                    </p>
                    <p class="line2 text-14">{{ item.title }}</p>
                    <p class="text-16 f-bold my-8">{{ currencyStore.formatToCurrency(item.retailPrice) }}</p>
                    <div class="acea-row gap-xs">
                      <div class="p-tag bg-gray-400" v-for="label in item.labels" :key="label">{{ label }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center py-60" v-if="!loading && !productList.length">
              <span class="iconfont icon-empty text-50"></span>
              <p class="text-20 f-bold mt-20">No Data</p>
              <p class="text-14 my-20">No data found, please check the query or try again later.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <ClientOnly>
    <!-- 移动端弹窗筛选 -->
    <Popup v-model="isPopup" v-if="appStore.device === 'app'">
      <template #default>
        <!-- popup 头部 -->
        <div
          class="app-popup-header mt-12 mb-20 acea-row nowrap gap-column-base scroll-x scroll-hide"
          style="white-space: nowrap"
          ref="popupHeaderRef"
        >
          <!-- 价格排序 -->
          <span
            class="head-item"
            :class="{on: sortType === 'PRICE_SORT' }"
            @click="clickPopupHeader(0, priceMenu)"
          >
          Price Sort
        </span>
          <!-- 销量排序 -->
          <span
            class="head-item"
            :class="{on: sortType === 'SALES_SORT' }"
            @click="clickPopupHeader(1, salesMenu)"
          >
          Sales Sort
        </span>
          <!-- 工艺筛选 -->
          <span
            class="head-item"
            :class="{on: sortType === 'TECHNIQUE_SORT' }"
            @click="clickPopupHeader(2, techniqueMenu)"
          >
          Technique
        </span>
          <!-- 菜单标题 -->
          <span
            class="head-item"
            :class="{on: popupCurrentMenu.id === group.id }"
            v-for="(group, index) in groupList"
            :key="group.id"
            @click="clickPopupHeader(index + extraLength, group)"
          >
          {{ group.name }}
        </span>
        </div>

        <!-- SORT -->
        <template v-if="popupCurrentMenu.config?.type === 'SORT'">
          <div
            class="text-20 py-16 border-b-sm border-gray-200"
            :class="[
            (sortType === 'PRICE_SORT' ? priceSort : sortType === 'SALES_SORT' ? salesSort : techniqueSelected.value) === item.config.code
            ? 'text-gray-700'
            : 'text-gray-500'
          ]"
            v-for="item in popupCurrentMenu.children"
            :key="item.parentId + '_' + item.id"
            @click="() => { sortType === 'PRICE_SORT' || sortType === 'SALES_SORT' ? handleSort(sortType!, item.config.code!) : handleTechnique(item.config.code!)}"
          >
            {{ item.name }}
          </div>
        </template>

        <!-- MUTEX -->
        <template v-if="popupCurrentMenu.config?.type === 'MUTEX'">
          <div
            class="text-20 py-16 border-b-sm border-gray-200"
            :class="[mutexSelected.id === item.id ? 'text-gray-700' : 'text-gray-500']"
            v-for="item in popupCurrentMenu.children"
            :key="item.parentId + '_' + item.id"
            @click="clickMutexType(item)"
          >
            {{ item.name }}
          </div>
        </template>

        <!-- GROUP -->
        <template v-if="popupCurrentMenu.config?.type === 'GROUP'">
          <div
            class="text-20 py-16 border-b-sm border-gray-200"
            :class="[groupSelected.get(item.parentId)?.id === item.id ? 'text-gray-700' : 'text-gray-500']"
            v-for="item in popupCurrentMenu.children"
            :key="item.parentId + '_' + item.id"
            @click="clickGroupType(item)"
          >
            {{ item.name }}
          </div>
        </template>

        <!-- PRICE -->
        <template v-if="popupCurrentMenu.config?.type === 'PRICE'">
          <div class="mx-12 price-range-text ">
            <div class="text-center f-bold pt-20 pb-20">
              {{ currencyStore.getCurrencySymbol }}{{ priceRange[0] }} ~ {{
                currencyStore.getCurrencySymbol
              }}{{ priceRange[1] }}
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
              :key="item.parentId + '_' + item.id"
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
            :key="item.parentId + '_' + item.id"
            @click="clickRadioType(item)"
          >
            <span>{{ item.name }}</span>
            <span
              style="font-size: 20px"
              class="iconfont"
              :class="[radioSelected.get(item.parentId)?.id === item.id ? 'icon-check-fill text-primary' : 'icon-check text-gray-400']"
            />
          </div>
        </template>

        <!-- CHECKBOX -->
        <template v-if="popupCurrentMenu.config?.type === 'CHECKBOX'">
          <div
            class="text-20 py-16 border-b-sm border-gray-200 acea-row row-between-wrapper"
            v-for="item in popupCurrentMenu.children"
            :key="item.parentId + '_' + item.id"
            @click="clickCheckoutType(item)"
          >
            <span>{{ item.name }}</span>
            <span
              style="font-size: 20px"
              class="iconfont"
              :class="[checkboxSelected.get(item.parentId)?.includes(item) ? 'icon-checkbox-fill text-primary' : 'icon-checkbox text-gray-400']"
            />
          </div>
        </template>

        <!-- COLOR -->
        <template v-if="popupCurrentMenu.config?.type === 'COLOR'">
          <div class="color-list scroll-y scroll-custom acea-row">
            <div
              class="color-item acea-row row-middle cursor-pointer"
              v-for="item in popupCurrentMenu.children"
              :key="item.parentId + '_' + item.id"
              @click="clickColorType(item)"
            >
              <div class="rounded-full border-sm p-2" :class="{ 'border-gray-700': colorSelected?.includes(item) }">
                <div
                  class="circle rounded-full"
                  :style="{ ...getColorStyle(item.config.color!) }"
                />
              </div>
              <div class="px-10 text-20 flex-1 line1" :class="{ 'f-bold': colorSelected?.includes(item) }">{{
                  item.name
                }}
              </div>
            </div>
          </div>
        </template>

        <!-- ARTIST -->
        <template v-if="popupCurrentMenu.config?.type === 'ARTIST'">
          <div
            class="text-20 py-16 border-b-sm border-gray-200"
            :class="[artistSelected?.id === item.id ? 'text-gray-700' : 'text-gray-500']"
            v-for="item in popupCurrentMenu.children"
            :key="item.parentId + '_' + item.id"
            @click="clickArtistType(item)"
          >
            {{ item.name }}
          </div>
        </template>

      </template>
      <template #footer>

        <div class="mt-20 mb-12 acea-row nowrap gap-column-xs scroll-x scroll-hide">
          <!--价格排序 选中的值-->
          <el-tag
            v-if="priceSort !== null"
            size="large"
            type="primary" round effect="dark"
            class="cursor-pointer"
            :closable="true"
            @close="handleSort('PRICE_SORT', null)"
          >
            {{ priceSort === '0' ? 'Price Desc' : priceSort === '1' ? 'Price Asc' : '' }}
          </el-tag>
          <!--销量排序 选中的值-->
          <el-tag
            v-if="salesSort !== null"
            size="large"
            type="primary" round effect="dark"
            class="cursor-pointer"
            :closable="true"
            @close="handleSort('SALES_SORT', null)"
          >
            {{ salesSort === '0' ? 'Sales Desc' : salesSort === '1' ? 'Sales Asc' : '' }}
          </el-tag>
          <!--工艺筛选 选中的值-->
          <el-tag
            v-if="hasTechniqueFilter && techniqueSelected.value"
            size="large"
            type="primary" round effect="dark"
            class="cursor-pointer"
          >
            {{ techniqueSelected.label }}
          </el-tag>

          <!--Mutex 选中的值-->
          <el-tag
            v-if="mutexSelected.id"
            size="large"
            type="primary" round effect="dark"
            class="cursor-pointer"
            :closable="false"
            @close="closeMutexTag"
          >
            {{ mutexSelected.name }}
          </el-tag>
          <!--Group 选中的值-->
          <el-tag
            size="large"
            type="primary" round effect="dark"
            v-for="[parentId, item] in Array.from(groupSelected)"
            :key="parentId"
            class="cursor-pointer"
            closable
            @close="closeGroupTag(parentId)"
          >
            {{ item.name }}
          </el-tag>
          <!--Price 选中的值-->
          <el-tag
            size="large"
            v-if="priceSubmitted"
            type="primary" round effect="dark"
            class="cursor-pointer"
            closable
            @close="closePriceTag"
          >
            {{ priceSubmitted }}
          </el-tag>
          <!--Radio 选中的值-->
          <el-tag
            size="large"
            type="primary" round effect="dark"
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
            type="primary" round effect="dark"
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
            type="primary" round effect="dark"
            v-for="(item, index) in colorSubmitted"
            :key="item.id"
            class="cursor-pointer"
            closable
            @close="closeColorTag(item, index)"
          >
            {{ item.name }}
          </el-tag>
          <!--Artist 选中的值-->
          <el-tag
            v-if="artistSelected.id"
            size="large"
            type="primary" round effect="dark"
            class="cursor-pointer"
            closable
            @close="closeArtistTag()"
          >
            {{ artistSelected.name }}
          </el-tag>
        </div>

        <div class="acea-row side-button mt-20 mt-20"
             v-if="popupCurrentMenu.config.type !== 'GROUP' && popupCurrentMenu.config.type !== 'ARTIST'">
          <el-button @click="reset()">Reset</el-button>
          <el-button type="primary" class="flex-1" @click="routerJump()">See all items</el-button>
        </div>
      </template>
    </Popup>
  </ClientOnly>

  <LoginWindow ref="loginWindowRef"/>
</template>

<script setup lang="ts">
import {getProductAttributeApi, getProductBestApi, getProductGroupApi} from "~/api/modules/product/product";
import type {IHome} from "~/api/interface/home/home";
import type {IProduct} from "~/api/interface/product/product";
import {debounce, imagePrefix, jumpToProduct} from "~/utils";
import {useAppStore} from "~/stores/modules/app";
import {ElMessage, type ElPopover} from "element-plus";
import {
  gen_ARTIST,
  gen_CHECKBOX,
  gen_COLOR,
  gen_GROUP_RADIO,
  gen_MUTEX,
  gen_path_arr,
  gen_path_obj,
  gen_PRICE
} from "~/utils/product";
import {productThumbsApi} from "~/api/modules/likes/likes";
import {useUserStore} from "~/stores/modules/user";
import LoginWindow from "~/components/LoginWindow.vue";
import {formatInteger} from "~/utils/format";
import {useCurrencyStore} from "~/stores/modules/currency";
import {cloneDeep} from "lodash-es";
import {TECHNIQUE_OPTIONS} from "~/constant";
import {pageMeta} from "~/composables/pageMeta";


defineOptions({
  name: 'Best'
})

onMounted(() => {
  $bus.on('loginSuccess', paramsWatch)
})

onUnmounted(() => {
  $bus.off('loginSuccess', paramsWatch)
})

const {$bus} = useNuxtApp()
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const currencyStore = useCurrencyStore();

useHead(pageMeta[route.path] ?? pageMeta["/best"]);


// 获取左侧筛选数据
const menuId = ref('')
const groupList = ref<IHome.MenuRow[]>([])
const getProductGroup = async () => {
  menuId.value = route.query.menuId as string
  const {data} = await getProductGroupApi({parentId: menuId.value})
  const oldGroups = cloneDeep(groupList.value)
  groupList.value = data.map(newItem => {
    const oldItem = oldGroups.find(old => old.id === newItem.id)
    return {
      ...newItem,
      isShow: oldItem ? oldItem.isShow : true // 已存在的项保留状态，新增项默认true
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

// 获取属性
const attributeList = ref<IProduct.AttributeRow[]>([])
const attributeSelected = ref<IProduct.AttributeRow[]>([])
const getProductAttribute = async (id: string[]) => {
  const {data} = await getProductAttributeApi(id)
  attributeList.value = data
}
// 点击属性
const clickAttribute = (item: IProduct.AttributeRow) => {
  const idx = attributeSelected.value.findIndex(i => i.id === item.id)
  if (idx === -1) {
    attributeSelected.value.push(item)
  } else {
    attributeSelected.value.splice(idx, 1)
  }
  getProductBest()
}

// 点击Mutex类型的选项（这里需要立即更新数据）
const mutexSelected = ref({} as IHome.MenuRow)
const clickMutexType = (item: IHome.MenuRow) => {
  const isSame = mutexSelected.value.id === item.id
  if (isSame) return // 相同的选项不做处理
  mutexSelected.value = item
  const val = mutexSelected.value.config.techniqueId ?? ''
  const cur = TECHNIQUE_OPTIONS.find(item => item.value === val)
  if (cur) techniqueSelected.value = cur
  routerJump(true)
}
// 关闭Mutex类型的选项
const closeMutexTag = () => {
  mutexSelected.value = {} as IHome.MenuRow
  routerJump(true)
}

// 点击Group类型的选项（这里需要立即更新数据）
const groupSelected = ref(new Map<string, IHome.MenuRow>())
const clickGroupType = (item: IHome.MenuRow) => {
  const current = groupSelected.value.get(item.parentId)
  const isSame = current && current.id === item.id
  if (isSame) return // 相同的选项不做处理
  groupSelected.value.set(item.parentId, item)
  routerJump(true)
}
// 关闭Group类型的选项
const closeGroupTag = (parentId: string) => {
  groupSelected.value.delete(parentId)
  routerJump(true)
}

// 点击Artist类型的选项（这里需要立即更新数据）
const artistSelected = ref({} as IHome.MenuRow)
const clickArtistType = (item: IHome.MenuRow) => {
  const isSame = artistSelected.value.id === item.id
  if (isSame) return // 相同的选项不做处理
  artistSelected.value = item
  routerJump(true)
}
// 关闭Artist类型的选项
const closeArtistTag = () => {
  artistSelected.value = {} as IHome.MenuRow
  routerJump(true)
}

// 点击Price类型的选项（这里需要拿到起始和结束的值）(笃定只会返回一个Price)
const isCustomPrice = ref(false) // 是否自定义价格区间
const startPrice = ref('')
const endPrice = ref('')
const priceSelected = ref({} as IHome.MenuRow) // 选中的值
const priceSubmitted = ref('') // 确定提交的数据
const clickPriceType = (item?: IHome.MenuRow, isApp = false) => {
  if (item) {
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
    isCustomPrice.value = true
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


// 点击Radio类型的选项（可以取消选择）
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

// 点击Checkbox类型的选项（这里可以多选）
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

// 点击Color类型的选项（笃定只会返回一个Color）
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

// 筛选可选项
const SORT_OPTIONS = [
  {label: 'Sort By Desc', value: '0'},
  {label: 'Sort By Asc', value: '1'},
]
const sortType = ref<"PRICE_SORT" | "SALES_SORT" | "TECHNIQUE_SORT" | null>(null) // 移动端中SORT类型中筛选的类型
const priceMenu = {
  id: '9999',
  parentId: '0',
  name: 'Price Sort',
  config: {type: 'SORT'},
  children: [
    {
      id: '9998',
      parentId: '9999',
      name: 'Sort By Desc',
      config: {type: 'SORT', code: '0'},
      children: []
    },
    {
      id: '9997',
      parentId: '9999',
      name: 'Sort By Asc',
      config: {type: 'SORT', code: '1'},
      children: []
    }
  ]
} as IHome.MenuRow // 移动端中Popup模拟价格排序的菜单数据
const salesMenu = {
  id: '8888',
  parentId: '0',
  name: 'Sales Sort',
  config: {type: 'SORT'},
  children: [
    {
      id: '8887',
      parentId: '8888',
      name: 'Sort By Desc',
      config: {type: 'SORT', code: '0'},
      children: []
    },
    {
      id: '8886',
      parentId: '8888',
      name: 'Sort By Asc',
      config: {type: 'SORT', code: '1'},
      children: []
    }
  ]
} as IHome.MenuRow // 移动端中Popup模拟销量排序的菜单数据

const pricePopoverRef = ref<InstanceType<typeof ElPopover>>()
const salesPopoverRef = ref<InstanceType<typeof ElPopover>>()
const techniquePopoverRef = ref<InstanceType<typeof ElPopover>>()

const priceSort = ref<null | string>(null) // 价格排序
const salesSort = ref<null | string>(null) // 销量排序

// 点击排序
const handleSort = (type: 'PRICE_SORT' | 'SALES_SORT', value: null | string) => {
  if (type == 'PRICE_SORT') {
    if (priceSort.value === value) return
    priceSort.value = value
    pricePopoverRef.value?.hide()
  }
  if (type == 'SALES_SORT') {
    if (salesSort.value === value) return
    salesSort.value = value
    salesPopoverRef.value?.hide()
  }
  getProductBest()
}

interface OptionType {
  label?: string;
  value?: string;
}

const techniqueMenu = {
  id: '7777',
  parentId: '0',
  name: 'Technique',
  config: {type: 'SORT'},
  children: [
    {
      id: '7776',
      parentId: '7777',
      name: 'Hand-painted oil painting',
      config: {type: 'SORT', code: '3000012'},
      children: []
    },
    {
      id: '7775',
      parentId: '7777',
      name: 'Print painting',
      config: {type: 'SORT', code: '3000013'},
      children: []
    },
    {
      id: '7774',
      parentId: '7777',
      name: 'Relief painting',
      config: {type: 'SORT', code: '3000014'},
      children: []
    },
    {
      id: '7773',
      parentId: '7777',
      name: 'Originals paintings',
      config: {type: 'SORT', code: '3000015'},
      children: []
    }
  ]
} as IHome.MenuRow // 移动端中Popup模拟销量排序的菜单数据
const hasTechniqueFilter = ref(false) // 是否有工艺筛选
const techniqueSelected = ref({} as OptionType) // 选中的工艺类型

// 点击工艺
const handleTechnique = (id: string) => {
  if (id === techniqueSelected.value.value) return
  const cur = TECHNIQUE_OPTIONS.find(item => item.value === id)
  if (cur) {
    techniqueSelected.value = cur
    techniquePopoverRef.value?.hide()
    routerJump(true)
  }
}

// 重置
const reset = () => {
  techniqueSelected.value = {} as OptionType

  mutexSelected.value = {} as IHome.MenuRow

  groupSelected.value.clear()

  priceSelected.value = {} as IHome.MenuRow

  isCustomPrice.value = false
  isSliderPrice.value = false
  startPrice.value = ''
  endPrice.value = ''
  priceSubmitted.value = ''

  radioSelected.value.clear()

  checkboxSelected.value.clear()

  colorSelected.value = []

  // priceSort.value = null
  // salesSort.value = null

  artistSelected.value = {} as IHome.MenuRow

  routerJump(false)
}

/**
 * 获取Best列表
 */
const loading = ref(true)
const productList = ref<General.GoodsItem[]>([])
const getProductBest = async () => {
  // MUTEX
  const mutex = mutexSelected.value

  // 工艺编号
  const techniqueId = techniqueSelected.value.value || null

  // GROUP
  const group = Array.from(groupSelected.value.values())

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

  const categoryIds = [
    ...group.map(item => item.id), // Group类型的选项
    ...radio.map(item => item.id), // Radio类型的选项
    ...checkbox.map(item => item.id), // Checkout类型的选项
    ...color.map(item => item.id), // Color类型的选项
  ]

  if (Object.keys(mutex).length) {
    categoryIds.push(mutex.config?.referenceId || mutex.id) // Mutex类型的选项
  }

  loading.value = true
  const {data} = await getProductBestApi({
    categoryIds,
    attributeValueIds: attributeSelected.value.map(item => item.id),
    priceSort: priceSort.value,
    salesSort: salesSort.value,
    startPrice: start,
    endPrice: end,
    creatorId: artistSelected.value.config?.referenceId || artistSelected.value.id || null,
    techniqueId
  })
  productList.value = data
  isPopup.value = false
  loading.value = false
}

// 移动端价格滑块
const isSliderPrice = ref(false) // 只有触发滑块或者路径参数才会传递给接口
const PRICER_MAX = 1000
const priceRange = ref([0, PRICER_MAX])
const priceRangeChange = () => {
  isSliderPrice.value = true
}

const popupHeaderRef = ref<HTMLElement>()
let popupHeaderItemRect = [] as DOMRect[]
const appFilterRef = ref<HTMLElement>()
let appFilterItemRect = [] as DOMRect[]
const isPopup = ref(false)
const popupCurrentMenu = ref({} as IHome.MenuRow)
// 表示在移动端中PopupHeader中额外的选项数量
const extraLength = computed(() => hasTechniqueFilter.value ? 3 : 2)

// 点击App端的筛选按钮
const clickAppFilter = (type: 'PRICE_SORT' | 'SALES_SORT' | 'TECHNIQUE_SORT' | 'POPUP', index: number, menu?: IHome.MenuRow) => {
  isPopup.value = true

  if (type === 'PRICE_SORT') {
    sortType.value = 'PRICE_SORT'
    menu = priceMenu
    clickPopupHeader(index, menu)
  }

  if (type === 'SALES_SORT') {
    sortType.value = 'SALES_SORT'
    menu = salesMenu
    clickPopupHeader(index, menu)
  }

  if (type === 'TECHNIQUE_SORT') {
    sortType.value = 'TECHNIQUE_SORT'
    menu = techniqueMenu
    clickPopupHeader(index, menu)
  }

  if (type === 'POPUP') {
    sortType.value = null
    clickPopupHeader(index + extraLength.value, menu!)
  }

  nextTick(() => {
    const container = appFilterRef.value
    if (!container) return
    const pageW = document.documentElement.clientWidth
    const idx = type === 'POPUP' ? index + extraLength.value : index
    const currentRect = appFilterItemRect[idx]
    const left = currentRect.left - pageW / 2 + currentRect.width / 2
    container.scrollTo({left, behavior: 'smooth'})
  })
}

// 点击PopupHeader
const clickPopupHeader = (index: number, menu: IHome.MenuRow) => {
  popupCurrentMenu.value = menu

  if (hasTechniqueFilter.value) {
    sortType.value = index === 0 ? 'PRICE_SORT' : index === 1 ? 'SALES_SORT' : index === 2 ? 'TECHNIQUE_SORT' : null

  } else {
    sortType.value = index === 0 ? 'PRICE_SORT' : index === 1 ? 'SALES_SORT' : null
  }

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
    const left = currentRect.left - pageW / 2 + currentRect.width / 2
    container.scrollTo({left, behavior: 'smooth'})
  })
}

// 点击艺术家
const handleClickArtist = (creator: ObjectNode.Creator) => {
  artistSelected.value = {name: creator.name, id: creator.id} as IHome.MenuRow
  routerJump(true)
}

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
 */
const routerJump = (partial = false) => {
  const params: any = {menuId: menuId.value}

  // TECHNIQUE
  const technique = techniqueSelected.value
  if (Object.keys(technique).length) {
    params['TECHNIQUE'] = technique.value
  }

  // MUTEX
  const mutex = mutexSelected.value
  if (Object.keys(mutex).length) {
    Object.assign(params, gen_path_obj(mutex, 'MUTEX'))
  }

  // GROUP
  const group = Array.from(groupSelected.value.values())
  if (group.length) {
    Object.assign(params, gen_path_arr(group, 'GROUP'))
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
  if (!partial) {
    if (appStore.device === 'pc') {
      // 自定义价格区间
      if (isCustomPrice.value) {
        if (!startPrice.value || !endPrice.value || parseInt(startPrice.value) > parseInt(endPrice.value)) {
          return ElMessage.error('Please input valid price range')
        }
        params['startPrice'] = startPrice.value
        params['endPrice'] = endPrice.value
      }
      // 固定价格区间
      else if (priceSelected.value.id) {
        Object.assign(params, gen_path_obj(priceSelected.value, 'PRICE'))
      }
    } else {
      // 只有滑动了或者打开弹出才需要提交
      if (isSliderPrice.value) {
        params['startPrice'] = priceRange.value[0]
        params['endPrice'] = priceRange.value[1]
      }
    }
  } else {
    if (priceSubmitted.value) {
      if (route.query.startPrice && route.query.endPrice) {
        params['startPrice'] = route.query.startPrice as string
        params['endPrice'] = route.query.endPrice as string
      }
      if (route.query.PRICE) {
        params['PRICE'] = route.query.PRICE
      }
    }
  }

  // ARTIST
  const artist = artistSelected.value
  if (artist.id) {
    Object.assign(params, gen_path_obj(artist, 'ARTIST', ['name']))
  }

  router.replace({query: params})
}

/**
 * 监听路由变化
 */
const paramsWatch = async () => {
  await getProductGroup()

  // 是否有工艺筛选
  hasTechniqueFilter.value = !!(route.query.menuId && route.query.menuId !== '1000002');

  // TECHNIQUE
  if (route.query.TECHNIQUE) {
    const val = route.query.TECHNIQUE as string
    const cur = TECHNIQUE_OPTIONS.find(item => item.value === val)
    if (cur) techniqueSelected.value = cur
  } else {
    techniqueSelected.value = {} as OptionType
  }

  // MUTEX类型的值
  if (route.query.MUTEX) {
    mutexSelected.value = gen_MUTEX(groupList.value, route.query.MUTEX as string)!
  } else {
    mutexSelected.value = {} as IHome.MenuRow
  }

  // GROUP类型的值
  if (route.query.GROUP) {
    groupSelected.value = gen_GROUP_RADIO(groupList.value, route.query.GROUP as string)
  } else {
    groupSelected.value.clear()
  }

  // PRICE类型的值（固定区间）
  if (route.query.PRICE) {
    priceSelected.value = gen_PRICE(groupList.value, route.query.PRICE as string)!
    if (appStore.device === 'app') {
      isSliderPrice.value = true
      priceRange.value[0] = Number(priceSelected.value.config.startPrice)
      priceRange.value[1] = Number(priceSelected.value.config.endPrice || PRICER_MAX)
    }
  }
  // PRICE类型的值（指定区间）
  else if (route.query.startPrice && route.query.endPrice) {
    if (appStore.device === 'pc') {
      isCustomPrice.value = true
      startPrice.value = route.query.startPrice as string
      endPrice.value = route.query.endPrice as string
    } else {
      isSliderPrice.value = true
      priceRange.value[0] = Number(route.query.startPrice)
      priceRange.value[1] = Number(route.query.endPrice)
    }
  }

  // RADIO类型的值
  if (route.query.RADIO) {
    radioSelected.value = gen_GROUP_RADIO(groupList.value, route.query.RADIO as string)
  } else {
    radioSelected.value.clear()
  }

  // CHECKBOX类型的值
  if (route.query.CHECKBOX) {
    checkboxSelected.value = gen_CHECKBOX(groupList.value, route.query.CHECKBOX as string)
  } else {
    checkboxSelected.value.clear()
  }

  // COLOR类型的值
  if (route.query.COLOR) {
    colorSelected.value = gen_COLOR(groupList.value, route.query.COLOR as string)
  }

  // ARTIST类型的值
  if (route.query.ARTIST) {
    artistSelected.value = gen_ARTIST(groupList.value, route.query.ARTIST as string)!
  } else {
    artistSelected.value = {} as IHome.MenuRow
  }

  getProductBest()

  const ids: string[] = []
  if (artistSelected.value.id) ids.push(artistSelected.value.id)
  if (mutexSelected.value.id) ids.push(mutexSelected.value.config?.referenceId || mutexSelected.value.id)
  ids.push(...Array.from(groupSelected.value.values()).map(item => item.id))
  getProductAttribute(ids)
}

// 监听路由的变化
if (import.meta.client) {
  watch(
    () => route.fullPath,
    () => {
      paramsWatch()
    },
    {immediate: true}
  )
}

</script>

<style scoped lang="scss">
.filter-wrapper {

  .side-wrapper {
    width: 220px;
    position: relative;
    animation: animation-my5jl 300ms forwards;

    .side-menu {
      .menu-item {
        &.on,
        &:hover {
          font-weight: bold;
        }
      }
    }

    .side-button {
      position: sticky;
      bottom: 0;
      left: 0;
      background: #fff;
    }
  }

  .main-wrapper {

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

    .product-list {

      .product-item {
        .img-wrapper {
          position: relative;
          aspect-ratio: 1 / 1;

          img {
            max-width: 95%;
            max-height: 95%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .tags-wrapper {
            position: absolute;
            left: 10px;
            bottom: 10px;
          }

          .operation {
            position: absolute;
            right: 10px;
            bottom: 10px;
            background: #fff;
          }

          .num {
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
            background: var(--color-primary);
            width: 42px;
            height: 42px;
          }
        }

        .p-tag {
          padding: 4px;
          font-size: 10px;
          color: #fff;
        }
      }
    }
  }
}

.color-list {
  max-height: 300px;
  row-gap: 20px;

  .color-item {
    width: 50%;

    .circle {
      width: 22px;
      height: 22px;
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

@media (max-width: 414px) {
  .filter-wrapper .main-wrapper .product-list .product-item .img-wrapper .num {
    width: 30px;
    height: 30px;
  }
}

@keyframes animation-my5jl {
  0% {
    margin-left: -220px;
    visibility: visible;
  }
  100% {
    margin-left: 0px;
  }
}
</style>