import { a2 as useNuxtApp, u as useRoute, a4 as useRouter, a3 as useUserStore, a9 as useCurrencyStore, ab as imagePrefix, ac as __nuxt_component_1, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, resolveDirective, unref, useSSRContext } from "vue";
import { ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { L as LoginWindow } from "./LoginWindow-8pCArWXq.js";
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
import "@vueuse/core";
import "lodash-unified";
import "@vue/shared";
import "@ctrl/tinycolor";
import "axios";
import "./dialog-DQju9U68.js";
import "./index-QxVyGfSM.js";
import "./form-item-BeekeJ4U.js";
import "async-validator";
import "./nuxt-link-DR_c-RpP.js";
import "./divider-DgH3PmJB.js";
import "./logo-DzgOjlOk.js";
import "./google-CA8l_UnH.js";
import "./useAuth-Dm_6RpzH.js";
import "./custom-CnGfPiQ8.js";
import "./index-BuIDaW2O.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const { $bus } = useNuxtApp();
    const route = useRoute();
    useRouter();
    useUserStore();
    useCurrencyStore();
    const artistDetail = ref({});
    ref();
    ref({
      creatorId: route.params.id,
      size: 25
    });
    const loginWindowRef = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_1;
      resolveDirective("lazy");
      resolveDirective("no-click-when-selected");
      _push(`<!--[--><section class="mt-lg-60 mt-sm-20" data-v-1ac0949f><div class="container" data-v-1ac0949f><div class="artist-wrapper row gap-row-base" data-v-1ac0949f><div class="col-md-6" data-v-1ac0949f>`);
      if (unref(artistDetail)?.portrait) {
        _push(`<div class="avatar" data-v-1ac0949f><img class="w-full"${ssrRenderAttr("src", unref(imagePrefix)(unref(artistDetail)?.portrait))} alt="avatar" data-v-1ac0949f></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-22 f-bold-500 my-20 text-underline cursor-pointer" data-v-1ac0949f>${ssrInterpolate(unref(artistDetail)?.name)}</p><p class="text-16 f-bold-500 my-20" data-v-1ac0949f>${ssrInterpolate(unref(artistDetail)?.location)}</p><p class="text-18" data-v-1ac0949f>${ssrInterpolate(unref(artistDetail)?.intro)}</p></div>`);
      if (unref(artistDetail)?.detail) {
        _push(`<div class="col-md-6" data-v-1ac0949f><!--[-->`);
        ssrRenderList(unref(artistDetail).detail, (val, key) => {
          _push(`<!--[--><p class="text-22 f-bold" data-v-1ac0949f>${ssrInterpolate(key)}</p><!--[-->`);
          ssrRenderList(val, (val2, key2) => {
            _push(`<div class="text-18 mt-md-20 mt-15" style="${ssrRenderStyle({ "white-space": "pre-line" })}" data-v-1ac0949f>${ssrInterpolate(val2)}</div>`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="sec-desc mt-lg-60 mt-sm-20" data-v-1ac0949f><div class="container" data-v-1ac0949f><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-1ac0949f>Art Work</h1>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artist-detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ac0949f"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-Vshplt_p.js.map
