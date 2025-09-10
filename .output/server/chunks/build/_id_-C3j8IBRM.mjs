import { _ as _export_sfc, u as useRoute, a4 as useRouter, a9 as useCurrencyStore, ac as __nuxt_component_1$2, o as CONTACT_EMAIL, ab as imagePrefix, a as ElButton, ap as useRuntimeConfig, Z as TRADE_MODULE } from './server.mjs';
import { E as ElTag } from './index-TgbWtzhx.mjs';
import { defineComponent, ref, withAsyncContext, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-CCFbhCAK.mjs';
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
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import '@ctrl/tinycolor';
import 'axios';

const mailBody = `I hope this message finds you well.
I am very interested in your artwork"[Artwork Title]"([attach image or link if possible]) and would like to inquire about its availability and pricing.
Could you kindly provide the following information: 
1.Selling price (including or excluding framing and shipping)
2.Dimensions, medium, and year of creation
3.Whether it comes with the artist's signature and a certificate of authenticity
4.Payment and delivery options
5.Shipping and insurance arrangements (especially for international delivery)
My expected budget range is [USD____ - USD____]. If there are similar works in the same size and style within this range, I would be happy to consider them as well.
I look forward to your reply and hope to discuss further.`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const currencyStore = useCurrencyStore();
    const isOpenDesc = ref(false);
    const { data: goodsDetail } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("goods-detail", async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/product/detail", { params: { productId: route.params.id } });
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const currentSpecId = ref("");
    const specsCombination = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const _component_ClientOnly = __nuxt_component_1$2;
      const _component_el_tag = ElTag;
      const _component_el_button = ElButton;
      _push(`<!--[--><section data-v-7c8a59e3><div class="container" data-v-7c8a59e3><div class="spu-wrapper row gap-row-base pt-md-50 pt-20" data-v-7c8a59e3><div class="col-md-6" data-v-7c8a59e3><div class="spu-preview" data-v-7c8a59e3><div class="aspect-ratio acea-row row-center-wrapper" data-v-7c8a59e3>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div></div><div class="col-md-6" data-v-7c8a59e3><div class="spu-spec" data-v-7c8a59e3><p class="text-20 text-error" data-v-7c8a59e3>Transaction Price</p><div class="acea-row row-between row-bottom mt-10 mb-40" data-v-7c8a59e3><span class="text-60 f-bold-500" data-v-7c8a59e3>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(goodsDetail).retailPrice || 0))}</span>`);
      if (unref(goodsDetail).status === "-1") {
        _push(ssrRenderComponent(_component_el_tag, {
          type: "danger",
          effect: "dark"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sale Out`);
            } else {
              return [
                createTextVNode("Sale Out")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(goodsDetail).status === "0") {
        _push(ssrRenderComponent(_component_el_tag, {
          type: "primary",
          effect: "dark"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`For Sale`);
            } else {
              return [
                createTextVNode("For Sale")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(goodsDetail).status === "0") {
        _push(`<a class="block text-center bg-gray-700 text-white rounded-sm py-xl-20 py-md-15 py-10 text-20"${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}?subject=${encodeURIComponent("Initiate A Quotation")}&body=${encodeURIComponent(mailBody)}`)} data-v-7c8a59e3> Initiate A Quotation </a>`);
      } else {
        _push(`<div class="row" data-v-7c8a59e3><!--[-->`);
        ssrRenderList(unref(specsCombination), (item) => {
          _push(`<div class="col-6" data-v-7c8a59e3><div class="${ssrRenderClass([[unref(currentSpecId) === item.id && "bg-gray-700 text-white"], "border-sm border-gray-700 cursor-pointer text-20 py-xl-20 py-md-15 py-10 text-center text-capitalize"])}" data-v-7c8a59e3> View ${ssrInterpolate(item.craft)} <br data-v-7c8a59e3> Replicas </div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="py-20 mt-20 border-b-md border-gray-700 text-18 f-bold" data-v-7c8a59e3> About Original Painting </div><ul class="text-gray-600 py-20" data-v-7c8a59e3><li class="text-14" data-v-7c8a59e3>Returns and refu possible within 7 days from the date of receiving the product.</li><li class="text-14 mt-10" data-v-7c8a59e3>Returns and refunds are possible within 7 days from the date of receiving the product. possible within 7 days from the date of receiving the product. </li></ul><div data-v-7c8a59e3><div class="row text-26 f-bold mb-40" data-v-7c8a59e3><div class="col-3" data-v-7c8a59e3>Title</div><div class="col-9" data-v-7c8a59e3>${ssrInterpolate(unref(goodsDetail).title || "-")}</div></div>`);
      if (unref(goodsDetail).creator) {
        _push(`<div class="row text-22" data-v-7c8a59e3><div class="col-3" data-v-7c8a59e3>Creator</div><div class="col-9" data-v-7c8a59e3><span class="text-underline cursor-pointer" data-v-7c8a59e3>${ssrInterpolate(((_b = (_a = unref(goodsDetail)) == null ? void 0 : _a.creator) == null ? void 0 : _b.name) || "-")}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(goodsDetail).attributes, (val, key) => {
        _push(`<div class="row text-22 mt-20" data-v-7c8a59e3><div class="col-3 text-capitalize" data-v-7c8a59e3>${ssrInterpolate(key)}</div><div class="col-9" data-v-7c8a59e3>`);
        if (Array.isArray(val)) {
          _push(`<!--[-->${ssrInterpolate(val.join(" / "))}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
      if (unref(goodsDetail).creator) {
        _push(`<section class="mt-lg-60 mt-sm-20" data-v-7c8a59e3><div class="container" data-v-7c8a59e3><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-7c8a59e3>About the Artist</h1><div class="artist-wrapper row gap-row-base" data-v-7c8a59e3><div class="col-md-6" data-v-7c8a59e3>`);
        if ((_d = (_c = unref(goodsDetail)) == null ? void 0 : _c.creator) == null ? void 0 : _d.portrait) {
          _push(`<div class="avatar" data-v-7c8a59e3><img class="w-full"${ssrRenderAttr("src", unref(imagePrefix)((_f = (_e = unref(goodsDetail)) == null ? void 0 : _e.creator) == null ? void 0 : _f.portrait))} alt="avatar" data-v-7c8a59e3></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-22 f-bold-500 my-20 text-underline cursor-pointer" data-v-7c8a59e3>${ssrInterpolate((_h = (_g = unref(goodsDetail)) == null ? void 0 : _g.creator) == null ? void 0 : _h.name)}</p><p class="text-16 f-bold-500 my-20" data-v-7c8a59e3>${ssrInterpolate((_j = (_i = unref(goodsDetail)) == null ? void 0 : _i.creator) == null ? void 0 : _j.region)}</p><p class="text-18" data-v-7c8a59e3>${ssrInterpolate((_l = (_k = unref(goodsDetail)) == null ? void 0 : _k.creator) == null ? void 0 : _l.intro)}</p></div>`);
        if ((_n = (_m = unref(goodsDetail)) == null ? void 0 : _m.creator) == null ? void 0 : _n.detail) {
          _push(`<div class="col-md-6" data-v-7c8a59e3><!--[-->`);
          ssrRenderList(unref(goodsDetail).creator.detail, (val, key) => {
            _push(`<!--[--><p class="text-22 f-bold" data-v-7c8a59e3>${ssrInterpolate(key)}</p><!--[-->`);
            ssrRenderList(val, (val2, key2) => {
              _push(`<div class="text-18 mt-md-20 mt-15" style="${ssrRenderStyle({ "white-space": "pre-line" })}" data-v-7c8a59e3>${ssrInterpolate(val2)}</div>`);
            });
            _push(`<!--]--><!--]-->`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if ((_p = (_o = unref(goodsDetail)) == null ? void 0 : _o.details) == null ? void 0 : _p.length) {
        _push(`<section class="${ssrRenderClass([{ open: unref(isOpenDesc) }, "sec-desc mt-lg-60 mt-sm-20"])}" data-v-7c8a59e3><div class="container" data-v-7c8a59e3><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-7c8a59e3>Product Description</h1><div class="img-box" data-v-7c8a59e3><!--[-->`);
        ssrRenderList(unref(goodsDetail).details, (item) => {
          _push(`<div data-v-7c8a59e3>`);
          {
            _push(`<!---->`);
          }
          if (item.includes("https://www.youtube.com/embed/")) {
            _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
          } else {
            _push(`<img class="w-full"${ssrRenderAttr("src", unref(imagePrefix)(item))} alt="" data-v-7c8a59e3>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="btn-box" data-v-7c8a59e3>`);
        _push(ssrRenderComponent(_component_el_button, {
          class: "w-full mt-20",
          plain: "",
          size: "large",
          onClick: ($event) => isOpenDesc.value = !unref(isOpenDesc)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(isOpenDesc) ? "Hide Product Details" : "View More Product Details")} <span class="${ssrRenderClass([unref(isOpenDesc) ? "icon-up" : "icon-down", "iconfont ml-20"])}" data-v-7c8a59e3${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(isOpenDesc) ? "Hide Product Details" : "View More Product Details") + " ", 1),
                createVNode("span", {
                  class: ["iconfont ml-20", unref(isOpenDesc) ? "icon-up" : "icon-down"]
                }, null, 2)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/original-detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7c8a59e3"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-C3j8IBRM.mjs.map
