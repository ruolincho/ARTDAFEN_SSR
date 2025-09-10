import { _ as _export_sfc, a as ElButton } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  ...{
    name: "Payments"
  },
  __name: "payments",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "orders-container" }, _attrs))} data-v-019b072e><div class="acea-row row-right mb-30" data-v-019b072e>`);
      _push(ssrRenderComponent(_component_el_button, {
        class: "add-btn",
        type: "primary",
        size: "large"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="iconfont icon-add mr-10" data-v-019b072e${_scopeId}></span> Add New Card `);
          } else {
            return [
              createVNode("span", { class: "iconfont icon-add mr-10" }),
              createTextVNode(" Add New Card ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card-list" data-v-019b072e><!--[-->`);
      ssrRenderList(5, (item, index) => {
        _push(`<div class="card-item acea-row row-middle pb-20 mb-20 border-b-sm border-gray-200" data-v-019b072e><div class="p-img" data-v-019b072e><img class="h-full w-full fit-cover"${ssrRenderAttr("src", `https://picsum.photos/60/60?t=${index + 1}`)} alt="" data-v-019b072e></div><div class="flex-1 mx-20" data-v-019b072e><p class="text-18 f-bold" data-v-019b072e>Master Card</p><p class="text-16 mt-18" data-v-019b072e>3456 7890 0987 6543</p></div>`);
        _push(ssrRenderComponent(_component_el_button, {
          class: "operation-btn",
          size: "large"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Delete`);
            } else {
              return [
                createTextVNode("Delete")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/payments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const payments = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-019b072e"]]);

export { payments as default };
//# sourceMappingURL=payments-B8DQSuby.mjs.map
