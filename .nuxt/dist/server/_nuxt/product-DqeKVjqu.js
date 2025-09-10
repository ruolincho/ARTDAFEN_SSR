import { E as ElAutocomplete, g as getSearchCompletionApi } from "./search-C8_J8OkW.js";
import { a2 as useNuxtApp, u as useRoute, a4 as useRouter, a8 as useAppStore, a3 as useUserStore, a9 as useCurrencyStore, a as ElButton, ac as __nuxt_component_1, b as ElMessage, ax as PRODUCT_URL, _ as _export_sfc } from "../server.mjs";
import { E as ElPopover } from "./popover-Z4OiMpEN.js";
import { E as ElTag } from "./index-TgbWtzhx.js";
import "./scrollbar-BAU7-sWB.js";
import "./popper-BevOnpDk.js";
/* empty css             */
import { T as TECHNIQUE_OPTIONS } from "./index-Bkzo_h1w.js";
/* empty css                      */
import { defineComponent, ref, reactive, computed, resolveDirective, unref, isRef, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, withDirectives, vShow, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { g as gen_path_obj, a as gen_path_arr } from "./product-DJnmy_Y8.js";
import { L as LoginWindow } from "./LoginWindow-8pCArWXq.js";
import "moment";
import "lodash-unified";
import "@vueuse/core";
import "@vue/shared";
import "F:/artdafen-ui-ssr/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "F:/artdafen-ui-ssr/node_modules/hookable/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/unctx/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/h3/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/ufo/dist/index.mjs";
import "pinia";
import "F:/artdafen-ui-ssr/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "F:/artdafen-ui-ssr/node_modules/radix3/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/destr/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/ohash/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/klona/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/@unhead/vue/dist/index.mjs";
import "@ctrl/tinycolor";
import "axios";
import "@popperjs/core";
import "./index-QxVyGfSM.js";
import "./dialog-DQju9U68.js";
import "./form-item-BeekeJ4U.js";
import "async-validator";
import "./nuxt-link-DR_c-RpP.js";
import "./divider-DgH3PmJB.js";
import "./logo-DzgOjlOk.js";
import "./google-CA8l_UnH.js";
import "./useAuth-Dm_6RpzH.js";
import "./custom-CnGfPiQ8.js";
import "./index-BuIDaW2O.js";
const PRICER_MAX = 1e3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ProductList"
  },
  __name: "product",
  __ssrInlineRender: true,
  setup(__props) {
    const { $bus } = useNuxtApp();
    const route = useRoute();
    const router = useRouter();
    const appStore = useAppStore();
    useUserStore();
    const currencyStore = useCurrencyStore();
    const proListRef = ref();
    const initParam = reactive({
      size: 50,
      categoryIds: [],
      attributeValueIds: [],
      creatorId: null,
      brandId: null,
      keyword: null,
      priceSort: null,
      salesSort: null,
      startPrice: null,
      endPrice: null,
      techniqueId: null,
      searchType: null
    });
    const everyoneList = ref([]);
    const menuId = ref("");
    const groupList = ref([]);
    const attributeList = ref([]);
    const attributeSelected = ref([]);
    const mutexSelected = ref({});
    const closeMutexTag = () => {
      mutexSelected.value = {};
      routerJump(true);
    };
    const groupSelected = ref(/* @__PURE__ */ new Map());
    const closeGroupTag = (parentId) => {
      groupSelected.value.delete(parentId);
      routerJump(true);
    };
    const artistSelected = ref({});
    const closeArtistTag = () => {
      artistSelected.value = {};
      searchType.value = "";
      routerJump(true);
    };
    const brandSelected = ref({});
    const closeBrandTag = () => {
      brandSelected.value = {};
      searchType.value = "";
      routerJump(true);
    };
    const searchType = ref("");
    const keyword = ref("");
    const isCustomPrice = ref(false);
    const startPrice = ref("");
    const endPrice = ref("");
    const priceSelected = ref({});
    const priceSubmitted = ref("");
    const closePriceTag = () => {
      isSliderPrice.value = false;
      isCustomPrice.value = false;
      startPrice.value = "";
      endPrice.value = "";
      priceSelected.value = {};
      priceSubmitted.value = "";
      if (appStore.device === "pc") routerJump(true);
    };
    const radioSelected = ref(/* @__PURE__ */ new Map());
    const radioSubmitted = ref([]);
    const closeRadioTag = (item, index) => {
      radioSelected.value.delete(item.parentId);
      radioSubmitted.value.splice(index, 1);
      if (appStore.device === "pc") routerJump(true);
    };
    const checkboxSelected = ref(/* @__PURE__ */ new Map());
    const checkboxSubmitted = ref([]);
    const closeCheckboxTag = (item, index) => {
      const parentId = item.parentId;
      const currentArr = checkboxSelected.value.get(parentId) ?? [];
      const idx = currentArr.findIndex((i) => i.id === item.id);
      if (idx !== -1) {
        currentArr.splice(idx, 1);
        checkboxSelected.value.set(parentId, [...currentArr]);
      }
      checkboxSubmitted.value.splice(index, 1);
      if (appStore.device === "pc") routerJump(true);
    };
    const colorSelected = ref([]);
    const colorSubmitted = ref([]);
    const closeColorTag = (item, index) => {
      const idx = colorSelected.value.findIndex((i) => i.id === item.id);
      if (idx !== -1) {
        colorSelected.value.splice(idx, 1);
      }
      colorSubmitted.value.splice(index, 1);
      if (appStore.device === "pc") routerJump(true);
    };
    const getColorStyle = (colorStr) => {
      if (colorStr.includes("&")) {
        const [c1, c2] = colorStr.split("&");
        return {
          background: `linear-gradient(120deg, ${c1} 0%, ${c1} 49%, ${c2} 50%, ${c2} 100%)`
        };
      } else {
        return {
          background: colorStr
        };
      }
    };
    const SORT_OPTIONS = [
      { label: "Sort By Desc", value: "0" },
      { label: "Sort By Asc", value: "1" }
    ];
    const sortType = ref(null);
    const priceMenu = {
      id: "9999",
      parentId: "0",
      name: "Price Sort",
      config: { type: "SORT" },
      children: [
        {
          id: "9998",
          parentId: "9999",
          name: "Sort By Desc",
          config: { type: "SORT", code: "0" },
          children: []
        },
        {
          id: "9997",
          parentId: "9999",
          name: "Sort By Asc",
          config: { type: "SORT", code: "1" },
          children: []
        }
      ]
    };
    const salesMenu = {
      id: "8888",
      parentId: "0",
      name: "Sales Sort",
      config: { type: "SORT" },
      children: [
        {
          id: "8887",
          parentId: "8888",
          name: "Sort By Desc",
          config: { type: "SORT", code: "0" },
          children: []
        },
        {
          id: "8886",
          parentId: "8888",
          name: "Sort By Asc",
          config: { type: "SORT", code: "1" },
          children: []
        }
      ]
    };
    const pricePopoverRef = ref();
    const salesPopoverRef = ref();
    const techniquePopoverRef = ref();
    const priceSort = ref(null);
    const salesSort = ref(null);
    const handleSort = (type, value) => {
      if (type == "PRICE_SORT") {
        if (priceSort.value === value) return;
        priceSort.value = value;
        pricePopoverRef.value?.hide();
      }
      if (type == "SALES_SORT") {
        if (salesSort.value === value) return;
        salesSort.value = value;
        salesPopoverRef.value?.hide();
      }
      getProductBest();
    };
    const techniqueMenu = {
      id: "7777",
      parentId: "0",
      name: "Technique",
      config: { type: "SORT" },
      children: [
        {
          id: "7776",
          parentId: "7777",
          name: "Hand-painted oil painting",
          config: { type: "SORT", code: "3000012" },
          children: []
        },
        {
          id: "7775",
          parentId: "7777",
          name: "Print painting",
          config: { type: "SORT", code: "3000013" },
          children: []
        },
        {
          id: "7774",
          parentId: "7777",
          name: "Relief painting",
          config: { type: "SORT", code: "3000014" },
          children: []
        },
        {
          id: "7773",
          parentId: "7777",
          name: "Originals paintings",
          config: { type: "SORT", code: "3000015" },
          children: []
        }
      ]
    };
    const hasTechniqueFilter = ref(false);
    const techniqueSelected = ref({});
    const handleTechnique = (id) => {
      if (id === techniqueSelected.value.value) return;
      const cur = TECHNIQUE_OPTIONS.find((item) => item.value === id);
      if (cur) {
        techniqueSelected.value = cur;
        techniquePopoverRef.value?.hide();
        routerJump(true);
      }
    };
    const reset = () => {
      techniqueSelected.value = {};
      mutexSelected.value = {};
      groupSelected.value.clear();
      priceSelected.value = {};
      isCustomPrice.value = false;
      isSliderPrice.value = false;
      startPrice.value = "";
      endPrice.value = "";
      priceSubmitted.value = "";
      radioSelected.value.clear();
      checkboxSelected.value.clear();
      colorSelected.value = [];
      brandSelected.value = {};
      artistSelected.value = {};
      routerJump(false);
    };
    const getProductBest = async () => {
      const mutex = mutexSelected.value;
      const techniqueId = techniqueSelected.value.value || null;
      const group = Array.from(groupSelected.value.values());
      const radio = Array.from(radioSelected.value.values());
      radioSubmitted.value = [...radio];
      const checkbox = Array.from(checkboxSelected.value.values()).flat();
      checkboxSubmitted.value = [...checkbox];
      let start = null;
      let end = null;
      if (appStore.device === "pc") {
        if (isCustomPrice.value) {
          priceSubmitted.value = `${startPrice.value}-${endPrice.value}`;
          start = startPrice.value;
          end = endPrice.value;
        } else if (priceSelected.value.id) {
          priceSubmitted.value = priceSelected.value.name;
          start = priceSelected.value.config.startPrice;
          end = priceSelected.value.config.endPrice;
        }
      } else {
        if (isSliderPrice.value) {
          priceSubmitted.value = priceRange.value.join("-");
          start = priceRange.value[0];
          end = priceRange.value[1];
        }
      }
      const color = colorSelected.value;
      colorSubmitted.value = [...color];
      initParam.categoryIds = [
        ...group.map((item) => item.id),
        // Group类型的选项
        ...radio.map((item) => item.id),
        // Radio类型的选项
        ...checkbox.map((item) => item.id),
        // Checkout类型的选项
        ...color.map((item) => item.id)
        // Color类型的选项
      ];
      if (Object.keys(mutex).length) {
        initParam.categoryIds.push(mutex.config?.referenceId || mutex.id);
      }
      initParam.attributeValueIds = attributeSelected.value.map((item) => item.id);
      initParam.priceSort = priceSort.value;
      initParam.salesSort = salesSort.value;
      initParam.startPrice = start;
      initParam.endPrice = end;
      initParam.creatorId = artistSelected.value.config?.referenceId || artistSelected.value.id || null;
      initParam.brandId = brandSelected.value.id || null;
      initParam.keyword = keyword.value || null;
      initParam.techniqueId = techniqueId;
      initParam.searchType = searchType.value || null;
      proListRef.value?.search();
      isPopup.value = false;
    };
    const isSliderPrice = ref(false);
    const priceRange = ref([0, PRICER_MAX]);
    const popupHeaderRef = ref();
    let popupHeaderItemRect = [];
    const appFilterRef = ref();
    let appFilterItemRect = [];
    const isPopup = ref(false);
    const popupCurrentMenu = ref({});
    const extraLength = computed(() => hasTechniqueFilter.value ? 3 : 2);
    const clickAppFilter = (type, index, menu) => {
      isPopup.value = true;
      if (type === "PRICE_SORT") {
        sortType.value = "PRICE_SORT";
        menu = priceMenu;
        clickPopupHeader(index, menu);
      }
      if (type === "SALES_SORT") {
        sortType.value = "SALES_SORT";
        menu = salesMenu;
        clickPopupHeader(index, menu);
      }
      if (type === "TECHNIQUE_SORT") {
        sortType.value = "TECHNIQUE_SORT";
        menu = techniqueMenu;
        clickPopupHeader(index, menu);
      }
      if (type === "POPUP") {
        sortType.value = null;
        clickPopupHeader(index + extraLength.value, menu);
      }
      nextTick(() => {
        const container = appFilterRef.value;
        if (!container) return;
        const pageW = (void 0).documentElement.clientWidth;
        const idx = type === "POPUP" ? index + extraLength.value : index;
        const currentRect = appFilterItemRect[idx];
        const left = currentRect.left - pageW / 2 + currentRect.width / 2;
        container.scrollTo({ left, behavior: "smooth" });
      });
    };
    const clickPopupHeader = (index, menu) => {
      popupCurrentMenu.value = menu;
      if (hasTechniqueFilter.value) {
        sortType.value = index === 0 ? "PRICE_SORT" : index === 1 ? "SALES_SORT" : index === 2 ? "TECHNIQUE_SORT" : null;
      } else {
        sortType.value = index === 0 ? "PRICE_SORT" : index === 1 ? "SALES_SORT" : null;
      }
      nextTick(() => {
        const container = popupHeaderRef.value;
        if (!container) return;
        if (!popupHeaderItemRect.length) {
          Array.from(container?.children ?? []).forEach((node, index2) => {
            popupHeaderItemRect[index2] = node.getBoundingClientRect();
          });
        }
        const pageW = (void 0).documentElement.clientWidth;
        const currentRect = popupHeaderItemRect[index];
        const left = currentRect.left - pageW / 2 + currentRect.width / 2;
        container.scrollTo({ left, behavior: "smooth" });
      });
    };
    const loginWindowRef = ref();
    const routerJump = (partial = false) => {
      const params = { menuId: menuId.value };
      const technique = techniqueSelected.value;
      if (Object.keys(technique).length) {
        params["TECHNIQUE"] = technique.value;
      }
      const mutex = mutexSelected.value;
      if (Object.keys(mutex).length) {
        Object.assign(params, gen_path_obj(mutex, "MUTEX"));
      }
      const group = Array.from(groupSelected.value.values());
      if (group.length) {
        Object.assign(params, gen_path_arr(group, "GROUP"));
      }
      const radio = partial ? radioSubmitted.value : Array.from(radioSelected.value.values());
      if (radio.length) {
        Object.assign(params, gen_path_arr(radio, "RADIO"));
      }
      const checkbox = partial ? checkboxSubmitted.value : Array.from(checkboxSelected.value.values()).flat();
      if (checkbox.length) {
        Object.assign(params, gen_path_arr(checkbox, "CHECKBOX"));
      }
      const color = partial ? colorSubmitted.value : colorSelected.value;
      if (color.length) {
        Object.assign(params, gen_path_arr(color, "COLOR"));
      }
      if (!partial) {
        if (appStore.device === "pc") {
          if (isCustomPrice.value) {
            if (!startPrice.value || !endPrice.value || parseInt(startPrice.value) > parseInt(endPrice.value)) {
              return ElMessage.error("Please input valid price range");
            }
            params["startPrice"] = startPrice.value;
            params["endPrice"] = endPrice.value;
          } else if (priceSelected.value.id) {
            Object.assign(params, gen_path_obj(priceSelected.value, "PRICE"));
          }
        } else {
          if (isSliderPrice.value) {
            params["startPrice"] = priceRange.value[0];
            params["endPrice"] = priceRange.value[1];
          }
        }
      } else {
        if (priceSubmitted.value) {
          if (route.query.startPrice && route.query.endPrice) {
            params["startPrice"] = route.query.startPrice;
            params["endPrice"] = route.query.endPrice;
          }
          if (route.query.PRICE) {
            params["PRICE"] = route.query.PRICE;
          }
        }
      }
      const artist = artistSelected.value;
      if (artist.id) {
        Object.assign(params, gen_path_obj(artist, "ARTIST", ["name"]));
      }
      const brand = brandSelected.value;
      if (brand.id) {
        Object.assign(params, gen_path_obj(brand, "BRAND", ["name"]));
      }
      const keywordStr = keyword.value;
      if (keywordStr) {
        params["KEYWORD"] = keywordStr;
      }
      if (searchType.value) {
        params["searchType"] = searchType.value;
      }
      router.replace({ query: params });
    };
    const search = () => {
      if (keyword.value && keyword.value !== route.query.KEYWORD) router.push({
        path: PRODUCT_URL,
        query: { KEYWORD: keyword.value }
      });
      if (!keyword.value) {
        routerJump(false);
      }
    };
    const lastValidData = ref([]);
    const emptyData = { id: "9999999999999", keyword: "no search results found...", type: "notData" };
    const searchCompletionList = async (queryString, cb) => {
      if (queryString.length < 4) {
        return cb(lastValidData.value || [emptyData]);
      }
      try {
        const { data } = await getSearchCompletionApi(queryString);
        if (!data.length) {
          data.push(emptyData);
        }
        cb(data);
        lastValidData.value = data;
      } catch (e) {
        cb(lastValidData.value || []);
      }
    };
    let prevKeyword = "";
    const handleClickSearchCompletion = (item) => {
      if (item.id === emptyData.id) {
        return keyword.value = prevKeyword;
      }
      startJump(item);
    };
    const handleInput = (text) => {
      if (text !== emptyData.keyword) prevKeyword = text;
    };
    const startJump = (rawItem) => {
      if (rawItem.type === "product") {
        router.push({ path: PRODUCT_URL, query: { KEYWORD: rawItem.keyword } });
      }
      if (rawItem.type === "artists") {
        router.push({
          path: PRODUCT_URL,
          query: Object.assign(
            {},
            gen_path_obj({ name: rawItem.keyword, id: rawItem.id }, "ARTIST", ["name"]),
            { SEARCH_TYPE: rawItem.type, KEYWORD: rawItem.keyword }
          )
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_autocomplete = ElAutocomplete;
      const _component_el_button = ElButton;
      const _component_el_popover = ElPopover;
      const _component_el_tag = ElTag;
      const _component_ClientOnly = __nuxt_component_1;
      resolveDirective("lazy");
      resolveDirective("no-click-when-selected");
      _push(`<!--[-->`);
      if (unref(route).query.KEYWORD) {
        _push(`<section class="search-wrapper" data-v-4c6eb877><div class="container-fluid" data-v-4c6eb877><div class="search-box" data-v-4c6eb877>`);
        _push(ssrRenderComponent(_component_el_autocomplete, {
          ref: "searchRef",
          modelValue: unref(keyword),
          "onUpdate:modelValue": ($event) => isRef(keyword) ? keyword.value = $event : null,
          "value-key": "keyword",
          placeholder: "Search...",
          "fetch-suggestions": searchCompletionList,
          debounce: 450,
          "trigger-on-focus": false,
          onSelect: handleClickSearchCompletion,
          onClick: () => {
          },
          "hide-loading": true,
          onInput: handleInput
        }, {
          suffix: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="iconfont icon-search text-40 cursor-pointer text-gray-700" data-v-4c6eb877${_scopeId}></span>`);
            } else {
              return [
                createVNode("span", {
                  class: "iconfont icon-search text-40 cursor-pointer text-gray-700",
                  onClick: search
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(everyoneList).length) {
          _push(`<div class="acea-row mt-15 gap-column-base" data-v-4c6eb877><div class="text-14 f-bold" data-v-4c6eb877>Everyone search</div><div class="acea-row gap-base flex-1" data-v-4c6eb877><!--[-->`);
          ssrRenderList(unref(everyoneList), (item, index) => {
            _push(`<span class="cursor-pointer text-14" data-v-4c6eb877>${ssrInterpolate(item.keyword)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="filter-wrapper" data-v-4c6eb877><div class="container-fluid" data-v-4c6eb877><div class="acea-row row-between" data-v-4c6eb877><div class="side-wrapper mr-40 mr-40" style="${ssrRenderStyle(unref(appStore).device === "pc" && unref(groupList).length ? null : { display: "none" })}" data-v-4c6eb877><!--[-->`);
      ssrRenderList(unref(groupList), (group) => {
        _push(`<!--[-->`);
        if (group.config?.type === "MUTEX") {
          _push(`<!--[--><div class="my-24 pr-4 acea-row row-between-wrapper" data-v-4c6eb877><span class="text-20 f-bold flex-1" data-v-4c6eb877>${ssrInterpolate(group.name)}</span><span class="${ssrRenderClass([[group.isShow ? "icon-up" : "icon-down"], "text-18 cursor-pointer iconfont"])}" data-v-4c6eb877></span></div><div class="side-menu pr-4 border-t-lg border-b-lg border-primary" style="${ssrRenderStyle(group.isShow ? null : { display: "none" })}" data-v-4c6eb877><!--[-->`);
          ssrRenderList(group.children, (item) => {
            _push(`<div class="${ssrRenderClass([{ on: unref(mutexSelected).id === item.id }, "menu-item cursor-pointer my-20"])}" data-v-4c6eb877>${ssrInterpolate(item.name)}</div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "GROUP") {
          _push(`<!--[--><div class="my-24 pr-4 acea-row row-between-wrapper" data-v-4c6eb877><span class="text-20 f-bold flex-1" data-v-4c6eb877>${ssrInterpolate(group.name)}</span><span class="${ssrRenderClass([[group.isShow ? "icon-up" : "icon-down"], "text-18 cursor-pointer iconfont"])}" data-v-4c6eb877></span></div><div class="side-menu pr-4 border-t-lg border-b-lg border-primary" style="${ssrRenderStyle(group.isShow ? null : { display: "none" })}" data-v-4c6eb877><!--[-->`);
          ssrRenderList(group.children, (item) => {
            _push(`<div class="${ssrRenderClass([{ on: unref(groupSelected).get(item.parentId)?.id === item.id }, "menu-item cursor-pointer my-20 line1"])}" data-v-4c6eb877>${ssrInterpolate(item.name)}</div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "PRICE") {
          _push(`<!--[--><div class="my-24 pr-4 acea-row row-between-wrapper" data-v-4c6eb877><span class="text-20 f-bold flex-1" data-v-4c6eb877>${ssrInterpolate(group.name)}</span><span class="${ssrRenderClass([[group.isShow ? "icon-up" : "icon-down"], "text-18 cursor-pointer iconfont"])}" data-v-4c6eb877></span></div><div class="pr-4" style="${ssrRenderStyle(group.isShow ? null : { display: "none" })}" data-v-4c6eb877><!--[-->`);
          ssrRenderList(group.children, (item) => {
            _push(`<div class="acea-row row-between-wrapper py-20 border-t-sm cursor-pointer" data-v-4c6eb877><span class="text-16" data-v-4c6eb877>${ssrInterpolate(item.name)}</span><span class="${ssrRenderClass([[unref(priceSelected).id === item.id && !unref(isCustomPrice) ? "icon-check-fill text-primary" : "icon-check text-gray-400"], "iconfont text-18"])}" data-v-4c6eb877></span></div>`);
          });
          _push(`<!--]--><div class="acea-row row-between-wrapper py-20 border-t-sm border-b-sm cursor-pointer" data-v-4c6eb877><span class="text-16" data-v-4c6eb877>Custom</span><span class="${ssrRenderClass([[unref(isCustomPrice) ? "icon-check-fill text-primary" : "icon-check text-gray-400"], "iconfont text-18"])}" data-v-4c6eb877></span></div><div style="${ssrRenderStyle(unref(isCustomPrice) ? null : { display: "none" })}" data-v-4c6eb877><div class="text-16 my-20" data-v-4c6eb877>Min Price</div><div class="${ssrRenderClass([[!unref(isCustomPrice) ? "bg-gray-100" : "border-sm"], "acea-row row-between-wrapper px-15 py-12"])}" data-v-4c6eb877><input type="text" placeholder="1400" style="${ssrRenderStyle({ "width": "60%" })}"${ssrRenderAttr("value", unref(startPrice))}${ssrIncludeBooleanAttr(!unref(isCustomPrice)) ? " disabled" : ""} data-v-4c6eb877><span class="text-gray-600" data-v-4c6eb877>${ssrInterpolate(unref(currencyStore).getCurrencySymbol)}</span></div><div class="text-16 my-20" data-v-4c6eb877>Max Price</div><div class="${ssrRenderClass([[!unref(isCustomPrice) ? "bg-gray-100" : "border-sm"], "acea-row row-between-wrapper px-15 py-12"])}" data-v-4c6eb877><input type="text" placeholder="3400" style="${ssrRenderStyle({ "width": "60%" })}"${ssrRenderAttr("value", unref(endPrice))}${ssrIncludeBooleanAttr(!unref(isCustomPrice)) ? " disabled" : ""} data-v-4c6eb877><span class="text-gray-600" data-v-4c6eb877>${ssrInterpolate(unref(currencyStore).getCurrencySymbol)}</span></div></div></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "RADIO") {
          _push(`<!--[--><div class="my-24 pr-4 acea-row row-between-wrapper" data-v-4c6eb877><span class="text-20 f-bold flex-1" data-v-4c6eb877>${ssrInterpolate(group.name)}</span><span class="${ssrRenderClass([[group.isShow ? "icon-up" : "icon-down"], "text-18 cursor-pointer iconfont"])}" data-v-4c6eb877></span></div><div class="scroll-y pr-4 scroll-custom" style="${ssrRenderStyle([
            group.isShow ? null : { display: "none" },
            { "max-height": "305px" }
          ])}" data-v-4c6eb877><!--[-->`);
          ssrRenderList(group.children, (item) => {
            _push(`<div class="acea-row row-between-wrapper py-20 border-t-sm border-b-sm cursor-pointer" data-v-4c6eb877><span class="text-16" data-v-4c6eb877>${ssrInterpolate(item.name)}</span><span class="${ssrRenderClass([[unref(radioSelected).get(item.parentId)?.id === item.id ? "icon-check-fill text-primary" : "icon-check text-gray-400"], "iconfont text-18"])}" data-v-4c6eb877></span></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "CHECKBOX") {
          _push(`<!--[--><div class="my-24 pr-4 acea-row row-between-wrapper" data-v-4c6eb877><span class="text-20 f-bold flex-1" data-v-4c6eb877>${ssrInterpolate(group.name)}</span><span class="${ssrRenderClass([[group.isShow ? "icon-up" : "icon-down"], "text-18 cursor-pointer iconfont"])}" data-v-4c6eb877></span></div><div class="scroll-y pr-4 scroll-custom" style="${ssrRenderStyle([
            group.isShow ? null : { display: "none" },
            { "max-height": "305px" }
          ])}" data-v-4c6eb877><!--[-->`);
          ssrRenderList(group.children, (item) => {
            _push(`<div class="acea-row row-between-wrapper py-20 border-t-sm border-b-sm cursor-pointer" data-v-4c6eb877><span class="text-16" data-v-4c6eb877>${ssrInterpolate(item.name)}</span><span class="${ssrRenderClass([[unref(checkboxSelected).get(item.parentId)?.includes(item) ? "icon-checkbox-fill text-primary" : "icon-checkbox text-gray-400"], "iconfont text-18"])}" data-v-4c6eb877></span></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "COLOR") {
          _push(`<!--[--><div class="my-24 pr-4 acea-row row-between-wrapper" data-v-4c6eb877><span class="text-20 f-bold flex-1" data-v-4c6eb877>${ssrInterpolate(group.name)}</span><span class="${ssrRenderClass([[group.isShow ? "icon-up" : "icon-down"], "text-18 cursor-pointer iconfont"])}" data-v-4c6eb877></span></div><div class="color-list pr-4 scroll-y scroll-custom acea-row" style="${ssrRenderStyle(group.isShow ? null : { display: "none" })}" data-v-4c6eb877><!--[-->`);
          ssrRenderList(group.children, (item) => {
            _push(`<div class="color-item acea-row row-middle cursor-pointer" data-v-4c6eb877><div class="${ssrRenderClass([{ "border-gray-700": unref(colorSelected)?.includes(item) }, "rounded-full border-sm p-2"])}" data-v-4c6eb877><div class="circle rounded-full" style="${ssrRenderStyle({ ...getColorStyle(item.config.color) })}" data-v-4c6eb877></div></div><div class="${ssrRenderClass([{ "f-bold": unref(colorSelected)?.includes(item) }, "pl-10 text-16 flex-1"])}" data-v-4c6eb877>${ssrInterpolate(item.name)}</div></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "ARTIST") {
          _push(`<!--[--><div class="my-24 pr-4 acea-row row-between-wrapper" data-v-4c6eb877><span class="text-20 f-bold flex-1" data-v-4c6eb877>${ssrInterpolate(group.name)}</span><span class="${ssrRenderClass([[group.isShow ? "icon-up" : "icon-down"], "text-18 cursor-pointer iconfont"])}" data-v-4c6eb877></span></div><div class="side-menu pr-4 border-t-lg border-b-lg border-primary" style="${ssrRenderStyle(group.isShow ? null : { display: "none" })}" data-v-4c6eb877><!--[-->`);
          ssrRenderList(group.children, (item) => {
            _push(`<div class="${ssrRenderClass([{ on: unref(artistSelected)?.id === item.id }, "menu-item cursor-pointer my-20"])}" data-v-4c6eb877>${ssrInterpolate(item.name)}</div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--><div class="acea-row side-button mt-40 pb-40" data-v-4c6eb877>`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => reset()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Reset`);
          } else {
            return [
              createTextVNode("Reset")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        class: "flex-1",
        onClick: ($event) => routerJump()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`See all items`);
          } else {
            return [
              createTextVNode("See all items")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="main-wrapper flex-1 pt-sm-24 overflow-hidden" data-v-4c6eb877>`);
      if (unref(attributeList).length) {
        _push(`<div class="border-sm border-gray-700 acea-row row-between" data-v-4c6eb877><div class="nav-list acea-row flex-1" data-v-4c6eb877><!--[-->`);
        ssrRenderList(unref(attributeList), (item) => {
          _push(`<div class="${ssrRenderClass([{ on: unref(attributeSelected).includes(item) }, "nav-item text-16 py-12 px-20 text-gray-400 cursor-pointer"])}" data-v-4c6eb877>${ssrInterpolate(item.values)}</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="my-md-30 my-15 acea-row nowrap gap-column-xs scroll-x scroll-hide" style="${ssrRenderStyle(unref(appStore).device === "pc" ? null : { display: "none" })}" data-v-4c6eb877>`);
      _push(ssrRenderComponent(_component_el_popover, {
        ref_key: "pricePopoverRef",
        ref: pricePopoverRef,
        trigger: "hover",
        placement: "bottom-start",
        width: "200",
        "popper-style": { padding: 0 }
      }, {
        reference: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_tag, {
              size: "large",
              type: unref(priceSort) !== null ? "primary" : "info",
              round: "",
              effect: "dark",
              class: "cursor-pointer",
              closable: unref(priceSort) !== null,
              onClose: ($event) => handleSort("PRICE_SORT", null)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="acea-row row-middle" data-v-4c6eb877${_scopeId2}><span data-v-4c6eb877${_scopeId2}>${ssrInterpolate(unref(priceSort) === "0" ? "Price Desc" : unref(priceSort) === "1" ? "Price Asc" : "Price Sort")}</span><span style="${ssrRenderStyle(unref(priceSort) === null ? null : { display: "none" })}" class="iconfont icon-down text-16 ml-10" data-v-4c6eb877${_scopeId2}></span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "acea-row row-middle" }, [
                      createVNode("span", null, toDisplayString(unref(priceSort) === "0" ? "Price Desc" : unref(priceSort) === "1" ? "Price Asc" : "Price Sort"), 1),
                      withDirectives(createVNode("span", { class: "iconfont icon-down text-16 ml-10" }, null, 512), [
                        [vShow, unref(priceSort) === null]
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_tag, {
                size: "large",
                type: unref(priceSort) !== null ? "primary" : "info",
                round: "",
                effect: "dark",
                class: "cursor-pointer",
                closable: unref(priceSort) !== null,
                onClose: ($event) => handleSort("PRICE_SORT", null)
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "acea-row row-middle" }, [
                    createVNode("span", null, toDisplayString(unref(priceSort) === "0" ? "Price Desc" : unref(priceSort) === "1" ? "Price Asc" : "Price Sort"), 1),
                    withDirectives(createVNode("span", { class: "iconfont icon-down text-16 ml-10" }, null, 512), [
                      [vShow, unref(priceSort) === null]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["type", "closable", "onClose"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(SORT_OPTIONS, (sort) => {
              _push2(`<div class="text-14 cursor-pointer text-center my-15 text-hover" data-v-4c6eb877${_scopeId}>${ssrInterpolate(sort.label)}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(SORT_OPTIONS, (sort) => {
                return createVNode("div", {
                  class: "text-14 cursor-pointer text-center my-15 text-hover",
                  key: sort.value,
                  onClick: ($event) => handleSort("PRICE_SORT", sort.value)
                }, toDisplayString(sort.label), 9, ["onClick"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_popover, {
        ref_key: "salesPopoverRef",
        ref: salesPopoverRef,
        trigger: "hover",
        placement: "bottom-start",
        width: "200",
        "popper-style": { padding: 0 }
      }, {
        reference: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_tag, {
              size: "large",
              type: unref(salesSort) !== null ? "primary" : "info",
              round: "",
              effect: "dark",
              class: "cursor-pointer",
              closable: unref(salesSort) !== null,
              onClose: ($event) => handleSort("SALES_SORT", null)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="acea-row row-middle" data-v-4c6eb877${_scopeId2}><span data-v-4c6eb877${_scopeId2}>${ssrInterpolate(unref(salesSort) === "0" ? "Sales Desc" : unref(salesSort) === "1" ? "Sales Asc" : "Sales Sort")}</span><span style="${ssrRenderStyle(unref(salesSort) === null ? null : { display: "none" })}" class="iconfont icon-down text-16 ml-10" data-v-4c6eb877${_scopeId2}></span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "acea-row row-middle" }, [
                      createVNode("span", null, toDisplayString(unref(salesSort) === "0" ? "Sales Desc" : unref(salesSort) === "1" ? "Sales Asc" : "Sales Sort"), 1),
                      withDirectives(createVNode("span", { class: "iconfont icon-down text-16 ml-10" }, null, 512), [
                        [vShow, unref(salesSort) === null]
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_tag, {
                size: "large",
                type: unref(salesSort) !== null ? "primary" : "info",
                round: "",
                effect: "dark",
                class: "cursor-pointer",
                closable: unref(salesSort) !== null,
                onClose: ($event) => handleSort("SALES_SORT", null)
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "acea-row row-middle" }, [
                    createVNode("span", null, toDisplayString(unref(salesSort) === "0" ? "Sales Desc" : unref(salesSort) === "1" ? "Sales Asc" : "Sales Sort"), 1),
                    withDirectives(createVNode("span", { class: "iconfont icon-down text-16 ml-10" }, null, 512), [
                      [vShow, unref(salesSort) === null]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["type", "closable", "onClose"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(SORT_OPTIONS, (sort) => {
              _push2(`<div class="text-14 cursor-pointer text-center my-15 text-hover" data-v-4c6eb877${_scopeId}>${ssrInterpolate(sort.label)}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(SORT_OPTIONS, (sort) => {
                return createVNode("div", {
                  class: "text-14 cursor-pointer text-center my-15 text-hover",
                  key: sort.value,
                  onClick: ($event) => handleSort("SALES_SORT", sort.value)
                }, toDisplayString(sort.label), 9, ["onClick"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(hasTechniqueFilter)) {
        _push(ssrRenderComponent(_component_el_popover, {
          ref_key: "techniquePopoverRef",
          ref: techniquePopoverRef,
          trigger: "hover",
          placement: "bottom-start",
          width: "200",
          "popper-style": { padding: 0 }
        }, {
          reference: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tag, {
                size: "large",
                type: unref(techniqueSelected).value ? "primary" : "info",
                round: "",
                effect: "dark",
                class: "cursor-pointer"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="acea-row row-middle" data-v-4c6eb877${_scopeId2}><span data-v-4c6eb877${_scopeId2}>${ssrInterpolate(unref(techniqueSelected).value ? unref(techniqueSelected).label : "Technique")}</span><span class="iconfont icon-down text-16 ml-10" data-v-4c6eb877${_scopeId2}></span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "acea-row row-middle" }, [
                        createVNode("span", null, toDisplayString(unref(techniqueSelected).value ? unref(techniqueSelected).label : "Technique"), 1),
                        createVNode("span", { class: "iconfont icon-down text-16 ml-10" })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tag, {
                  size: "large",
                  type: unref(techniqueSelected).value ? "primary" : "info",
                  round: "",
                  effect: "dark",
                  class: "cursor-pointer"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "acea-row row-middle" }, [
                      createVNode("span", null, toDisplayString(unref(techniqueSelected).value ? unref(techniqueSelected).label : "Technique"), 1),
                      createVNode("span", { class: "iconfont icon-down text-16 ml-10" })
                    ])
                  ]),
                  _: 1
                }, 8, ["type"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(TECHNIQUE_OPTIONS), (item) => {
                _push2(`<div class="text-14 cursor-pointer text-center my-15 text-hover" data-v-4c6eb877${_scopeId}>${ssrInterpolate(item.label)}</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(TECHNIQUE_OPTIONS), (item) => {
                  return openBlock(), createBlock("div", {
                    class: "text-14 cursor-pointer text-center my-15 text-hover",
                    key: item.value,
                    onClick: ($event) => handleTechnique(item.value)
                  }, toDisplayString(item.label), 9, ["onClick"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(mutexSelected).id) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          class: "cursor-pointer",
          closable: false,
          onClose: closeMutexTag
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(mutexSelected).name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(mutexSelected).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(Array.from(unref(groupSelected)), ([parentId, item]) => {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          key: parentId,
          class: "cursor-pointer",
          closable: "",
          onClose: ($event) => closeGroupTag(parentId)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (unref(priceSubmitted)) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          class: "cursor-pointer",
          closable: "",
          onClose: closePriceTag
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(priceSubmitted))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(priceSubmitted)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(radioSubmitted), (item, index) => {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          key: item.id,
          class: "cursor-pointer",
          closable: "",
          onClose: ($event) => closeRadioTag(item, index)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(checkboxSubmitted), (item, index) => {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          key: item.id,
          class: "cursor-pointer",
          closable: "",
          onClose: ($event) => closeCheckboxTag(item, index)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(colorSubmitted), (item, index) => {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          key: item.id,
          class: "cursor-pointer",
          closable: "",
          onClose: ($event) => closeColorTag(item, index)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (unref(artistSelected).id) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          class: "cursor-pointer",
          closable: "",
          onClose: ($event) => closeArtistTag()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(artistSelected).name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(artistSelected).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(brandSelected).id) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: "primary",
          round: "",
          effect: "dark",
          class: "cursor-pointer",
          closable: "",
          onClose: ($event) => closeBrandTag()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(brandSelected).name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(brandSelected).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="my-15 acea-row nowrap gap-column-xs scroll-x scroll-hide" style="${ssrRenderStyle(unref(appStore).device === "app" ? null : { display: "none" })}" data-v-4c6eb877>`);
      _push(ssrRenderComponent(_component_el_tag, {
        size: "large",
        type: unref(priceSort) !== null ? "primary" : "info",
        round: "",
        effect: "dark",
        class: "cursor-pointer",
        onClick: ($event) => clickAppFilter("PRICE_SORT", 0)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(priceSort) === "0" ? "Price Desc" : unref(priceSort) === "1" ? "Price Asc" : "Price Sort")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(priceSort) === "0" ? "Price Desc" : unref(priceSort) === "1" ? "Price Asc" : "Price Sort"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_tag, {
        size: "large",
        type: unref(salesSort) !== null ? "primary" : "info",
        round: "",
        effect: "dark",
        class: "cursor-pointer",
        onClick: ($event) => clickAppFilter("SALES_SORT", 1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(salesSort) === "0" ? "Sales Desc" : unref(salesSort) === "1" ? "Sales Asc" : "Sales Sort")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(salesSort) === "0" ? "Sales Desc" : unref(salesSort) === "1" ? "Sales Asc" : "Sales Sort"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(hasTechniqueFilter)) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "large",
          type: unref(techniqueSelected).value ? "primary" : "info",
          round: "",
          effect: "dark",
          class: "cursor-pointer",
          onClick: ($event) => clickAppFilter("TECHNIQUE_SORT", 2)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(techniqueSelected).value ? unref(techniqueSelected).label : "Technique")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(techniqueSelected).value ? unref(techniqueSelected).label : "Technique"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(groupList), (group, index) => {
        _push(`<!--[-->`);
        if (group.config?.type === "MUTEX") {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "large",
            type: unref(mutexSelected).parentId === group.id ? "primary" : "info",
            round: "",
            effect: "dark",
            class: "cursor-pointer",
            onClick: ($event) => clickAppFilter("POPUP", index, group)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(mutexSelected).parentId === group.id && unref(mutexSelected).name || group.name)} <span class="iconfont icon-down text-16" data-v-4c6eb877${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(mutexSelected).parentId === group.id && unref(mutexSelected).name || group.name) + " ", 1),
                  createVNode("span", { class: "iconfont icon-down text-16" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "GROUP") {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "large",
            type: unref(groupSelected).has(group.id) ? "primary" : "info",
            round: "",
            effect: "dark",
            class: "cursor-pointer",
            onClick: ($event) => clickAppFilter("POPUP", index, group)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(groupSelected).get(group.id)?.name || group.name)} <span class="iconfont icon-down text-16" data-v-4c6eb877${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(groupSelected).get(group.id)?.name || group.name) + " ", 1),
                  createVNode("span", { class: "iconfont icon-down text-16" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "PRICE") {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "large",
            type: unref(priceSubmitted) ? "primary" : "info",
            round: "",
            effect: "dark",
            class: "cursor-pointer",
            onClick: ($event) => clickAppFilter("POPUP", index, group)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(priceSubmitted) || group.name)} <span class="iconfont icon-down text-16" data-v-4c6eb877${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(priceSubmitted) || group.name) + " ", 1),
                  createVNode("span", { class: "iconfont icon-down text-16" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "RADIO") {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "large",
            type: unref(radioSubmitted).findIndex((i) => i.parentId === group.id) !== -1 ? "primary" : "info",
            round: "",
            effect: "dark",
            class: "cursor-pointer",
            onClick: ($event) => clickAppFilter("POPUP", index, group)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(radioSubmitted).find((i) => i.parentId === group.id)?.name || group.name)} <span class="iconfont icon-down text-16" data-v-4c6eb877${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(radioSubmitted).find((i) => i.parentId === group.id)?.name || group.name) + " ", 1),
                  createVNode("span", { class: "iconfont icon-down text-16" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "CHECKBOX") {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "large",
            type: unref(checkboxSubmitted).findIndex((i) => i.parentId === group.id) !== -1 ? "primary" : "info",
            round: "",
            effect: "dark",
            class: "cursor-pointer",
            onClick: ($event) => clickAppFilter("POPUP", index, group)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(checkboxSubmitted).find((i) => i.parentId === group.id)?.name || group.name)} <span class="iconfont icon-down text-16" data-v-4c6eb877${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(checkboxSubmitted).find((i) => i.parentId === group.id)?.name || group.name) + " ", 1),
                  createVNode("span", { class: "iconfont icon-down text-16" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "COLOR") {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "large",
            type: unref(colorSubmitted).length ? "primary" : "info",
            round: "",
            effect: "dark",
            class: "cursor-pointer",
            onClick: ($event) => clickAppFilter("POPUP", index, group)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(colorSubmitted)[0]?.name || group.name)} <span class="iconfont icon-down text-16" data-v-4c6eb877${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(colorSubmitted)[0]?.name || group.name) + " ", 1),
                  createVNode("span", { class: "iconfont icon-down text-16" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (group.config?.type === "ARTIST") {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "large",
            type: unref(artistSelected).parentId === group.id ? "primary" : "info",
            round: "",
            effect: "dark",
            class: "cursor-pointer",
            onClick: ($event) => clickAppFilter("POPUP", index, group)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(group.name)} <span class="iconfont icon-down text-16" data-v-4c6eb877${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(group.name) + " ", 1),
                  createVNode("span", { class: "iconfont icon-down text-16" })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(LoginWindow, {
        ref_key: "loginWindowRef",
        ref: loginWindowRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const product = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c6eb877"]]);
export {
  product as default
};
//# sourceMappingURL=product-DqeKVjqu.js.map
