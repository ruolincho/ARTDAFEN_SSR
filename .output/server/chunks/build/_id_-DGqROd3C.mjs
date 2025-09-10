import { defineComponent, withAsyncContext, resolveDirective, unref, withCtx, mergeProps, withDirectives, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _export_sfc, a9 as useCurrencyStore, u as useRoute, ab as imagePrefix, ap as useRuntimeConfig, Z as TRADE_MODULE } from './server.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const currencyStore = useCurrencyStore();
    const route = useRoute();
    const modules = [Pagination, Navigation];
    const { data: blogDetail } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("blog-detail", async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/blog/detail/" + route.params.id);
      return data;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _directive_lazy = resolveDirective("lazy");
      let _temp0, _temp1;
      _push(`<!--[--><section class="sec-imgs mt-20" data-v-531c4183><div class="container-small" data-v-531c4183><div class="swiper-box" data-v-531c4183>`);
      _push(ssrRenderComponent(unref(Swiper), {
        class: "img-swiper",
        modules,
        navigation: true,
        pagination: { clickable: true }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList((_a2 = unref(blogDetail)) == null ? void 0 : _a2.banner, (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), { key: item }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a3;
                  if (_push3) {
                    _push3(`<img${ssrRenderAttrs(_temp0 = mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, unref(imagePrefix)(item))))} data-v-531c4183${_scopeId2}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a3 = _temp0.innerHTML) != null ? _a3 : ""}`);
                  } else {
                    return [
                      withDirectives(createVNode("img", { alt: "" }, null, 512), [
                        [_directive_lazy, unref(imagePrefix)(item)]
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList((_b2 = unref(blogDetail)) == null ? void 0 : _b2.banner, (item) => {
                return openBlock(), createBlock(unref(SwiperSlide), { key: item }, {
                  default: withCtx(() => [
                    withDirectives(createVNode("img", { alt: "" }, null, 512), [
                      [_directive_lazy, unref(imagePrefix)(item)]
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="sec-content" data-v-531c4183><div class="container-small" data-v-531c4183><div class="interaction-container" data-v-531c4183><div class="author-container" data-v-531c4183><div class="text-30 f-bold my-20" data-v-531c4183>${ssrInterpolate((_a = unref(blogDetail)) == null ? void 0 : _a.title)}</div><div class="text-18" data-v-531c4183>${ssrInterpolate((_b = unref(blogDetail)) == null ? void 0 : _b.content)}</div>`);
      if ((_d = (_c = unref(blogDetail)) == null ? void 0 : _c.labels) == null ? void 0 : _d.length) {
        _push(`<div class="text-14 acea-row gap-xs mt-10" data-v-531c4183><!--[-->`);
        ssrRenderList(unref(blogDetail).labels, (label, labelIndex) => {
          _push(`<span class="text-secondary cursor-pointer" data-v-531c4183>${ssrInterpolate(label)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section>`);
      if ((_e = unref(blogDetail)) == null ? void 0 : _e.products.length) {
        _push(`<section class="sec-rec" data-v-531c4183><div class="container-small" data-v-531c4183><h1 class="my-20 py-20 border-b-xl border-gray-700 text-26 font-bold" data-v-531c4183>RELATED PRODUCTS</h1><div class="row product-list gap-row-base" data-v-531c4183><!--[-->`);
        ssrRenderList((_f = unref(blogDetail)) == null ? void 0 : _f.products, (item, index) => {
          var _a2;
          _push(`<div class="col-sm-3 col-6" data-v-531c4183><div class="product-item cursor-pointer" data-v-531c4183><div class="img-wrapper bg-gray-100" data-v-531c4183><img${ssrRenderAttrs(_temp1 = mergeProps({ alt: "" }, ssrGetDirectiveProps(_ctx, _directive_lazy, unref(imagePrefix)(item.img))))} data-v-531c4183>${"textContent" in _temp1 ? ssrInterpolate(_temp1.textContent) : (_a2 = _temp1.innerHTML) != null ? _a2 : ""}</div><div class="content-wrapper" data-v-531c4183><p class="line2 text-14" data-v-531c4183>${ssrInterpolate(item.title)}</p><p class="text-16 f-bold my-8" data-v-531c4183>${ssrInterpolate(unref(currencyStore).formatToCurrency(item.retailPrice))}</p><div class="acea-row gap-xs" data-v-531c4183><!--[-->`);
          ssrRenderList(item.labels, (label) => {
            _push(`<div class="p-tag bg-gray-400" data-v-531c4183>${ssrInterpolate(label)}</div>`);
          });
          _push(`<!--]--></div></div></div></div>`);
        });
        _push(`<!--]--></div></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog-detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-531c4183"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DGqROd3C.mjs.map
