import { a9 as useCurrencyStore, a4 as useRouter, E as ElInput, ac as __nuxt_component_1, _ as _export_sfc } from "../server.mjs";
/* empty css             */
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "F:/artdafen-ui-ssr/node_modules/hookable/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
import "@vueuse/core";
import "lodash-unified";
import "@vue/shared";
import "@ctrl/tinycolor";
import "axios";
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
      proListRef.value?.search();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_ClientOnly = __nuxt_component_1;
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
export {
  orders as default
};
//# sourceMappingURL=orders-BUh2o3Lh.js.map
