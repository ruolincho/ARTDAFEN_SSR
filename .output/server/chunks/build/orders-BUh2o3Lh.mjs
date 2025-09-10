import { _ as _export_sfc, a9 as useCurrencyStore, a4 as useRouter, E as ElInput, ac as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
    name: "Orders"
  },
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    useCurrencyStore();
    useRouter();
    const initParam = reactive({ status: "0", keyword: "", size: 3 });
    const proListRef = ref();
    const handleSearch = () => {
      var _a;
      (_a = proListRef.value) == null ? void 0 : _a.search();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_ClientOnly = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "orders-container" }, _attrs))} data-v-e7c59b21><div class="acea-row row-right mb-lg-30 mb-15" data-v-e7c59b21>`);
      _push(ssrRenderComponent(_component_el_input, {
        class: "search-input",
        type: "text",
        modelValue: unref(initParam).keyword,
        "onUpdate:modelValue": ($event) => unref(initParam).keyword = $event,
        size: "large",
        onKeyup: handleSearch,
        placeholder: "Search...",
        clearable: ""
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="iconfont icon-search text-24 text-primary" data-v-e7c59b21${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "iconfont icon-search text-24 text-primary" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7c59b21"]]);

export { orders as default };
//# sourceMappingURL=orders-BUh2o3Lh.mjs.map
