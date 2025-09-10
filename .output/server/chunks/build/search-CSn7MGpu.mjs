import { E as ElAutocomplete, g as getSearchCompletionApi, d as deleteSearchHistoryApi } from './search-C8_J8OkW.mjs';
import { E as ElTag } from './index-TgbWtzhx.mjs';
import { _ as _export_sfc, a3 as useUserStore, a4 as useRouter, ax as PRODUCT_URL } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { g as gen_path_obj } from './product-DJnmy_Y8.mjs';
import 'lodash-unified';
import '@vueuse/core';
import './scrollbar-BAU7-sWB.mjs';
import '@vue/shared';
import './popper-BevOnpDk.mjs';
import '@popperjs/core';
import './index-QxVyGfSM.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'consola';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import '@ctrl/tinycolor';
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const router = useRouter();
    const searchRef = ref();
    const keyword = ref("");
    const historyList = ref([]);
    const removeHistory = async (item, index) => {
      await deleteSearchHistoryApi([item]);
      historyList.value.splice(index, 1);
    };
    const everyoneList = ref([]);
    const hotList = ref([]);
    const clickKeyword = (item) => {
      startJump(item);
    };
    const search2 = () => {
      if (keyword.value) router.push({ path: PRODUCT_URL, query: { KEYWORD: keyword.value } });
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
        cb(lastValidData.value || [emptyData]);
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
      const _component_el_tag = ElTag;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "search-wrapper" }, _attrs))} data-v-5d2ce6ff><div class="iconfont icon-close text-40 cursor-pointer close-btn" data-v-5d2ce6ff></div><div class="acea-row row-right" data-v-5d2ce6ff><div class="search-box" data-v-5d2ce6ff>`);
      _push(ssrRenderComponent(_component_el_autocomplete, {
        ref_key: "searchRef",
        ref: searchRef,
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
            _push2(`<span class="iconfont icon-search text-40 cursor-pointer text-gray-700" data-v-5d2ce6ff${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", {
                class: "iconfont icon-search text-40 cursor-pointer text-gray-700",
                onClick: search2
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(userStore).isLogin) {
        _push(`<!--[--><div class="py-10 acea-row row-between-wrapper" data-v-5d2ce6ff><span class="text-26 f-bold" data-v-5d2ce6ff>History search</span>`);
        if (unref(historyList).length) {
          _push(`<span class="iconfont icon-delete text-20 cursor-pointer" data-v-5d2ce6ff></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(historyList).length) {
          _push(`<div class="acea-row gap-sm pb-10 border-b-sm border-gray-200" data-v-5d2ce6ff><!--[-->`);
          ssrRenderList(unref(historyList), (item, index) => {
            _push(ssrRenderComponent(_component_el_tag, {
              key: index,
              size: "large",
              type: "info",
              round: "",
              class: "cursor-pointer",
              closable: "",
              onClose: ($event) => removeHistory(item, index),
              onClick: ($event) => clickKeyword(item)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.keyword)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.keyword), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-center py-20" data-v-5d2ce6ff><p class="text-20 f-bold mt-20" data-v-5d2ce6ff>No Search History</p><p class="text-14 my-20" data-v-5d2ce6ff>You haven\u2019t searched for anything yet. Start exploring and discover products you\u2019ll love!</p></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (unref(everyoneList).length) {
        _push(`<!--[--><div class="py-10 acea-row row-between-wrapper" data-v-5d2ce6ff><span class="text-26 f-bold" data-v-5d2ce6ff>Everyone search</span><span class="iconfont icon-change text-20 cursor-pointer" data-v-5d2ce6ff></span></div><div class="row gap-row-base" data-v-5d2ce6ff><!--[-->`);
        ssrRenderList(unref(everyoneList), (item, index) => {
          _push(`<div class="col-6" data-v-5d2ce6ff><span class="cursor-pointer text-16" data-v-5d2ce6ff>${ssrInterpolate(item.keyword)}</span></div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hotList).length) {
        _push(`<!--[--><div class="py-10 acea-row row-between-wrapper" data-v-5d2ce6ff><span class="text-26 f-bold" data-v-5d2ce6ff>Hot search</span><span class="text-gray-400" data-v-5d2ce6ff>Latest Data</span></div><div class="row gap-row-base" data-v-5d2ce6ff><!--[-->`);
        ssrRenderList(unref(hotList), (item, index) => {
          _push(`<div class="col-6" data-v-5d2ce6ff><span class="cursor-pointer text-16" data-v-5d2ce6ff><span class="mr-10" data-v-5d2ce6ff>${ssrInterpolate(index + 1)}</span><span data-v-5d2ce6ff>${ssrInterpolate(item.keyword)}</span></span></div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const search = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5d2ce6ff"]]);

export { search as default };
//# sourceMappingURL=search-CSn7MGpu.mjs.map
