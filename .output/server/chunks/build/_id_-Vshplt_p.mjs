import { _ as _export_sfc, a2 as useNuxtApp, u as useRoute, a4 as useRouter, a3 as useUserStore, a9 as useCurrencyStore, ab as imagePrefix, ac as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, ref, resolveDirective, unref, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { L as LoginWindow } from './LoginWindow-8pCArWXq.mjs';
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
import './dialog-DQju9U68.mjs';
import './index-QxVyGfSM.mjs';
import './form-item-BeekeJ4U.mjs';
import 'async-validator';
import './nuxt-link-DR_c-RpP.mjs';
import './divider-DgH3PmJB.mjs';
import './logo-DzgOjlOk.mjs';
import './google-CA8l_UnH.mjs';
import './useAuth-Dm_6RpzH.mjs';
import './custom-CnGfPiQ8.mjs';
import './index-BuIDaW2O.mjs';

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
      var _a, _b, _c, _d, _e, _f;
      const _component_ClientOnly = __nuxt_component_1$2;
      resolveDirective("lazy");
      resolveDirective("no-click-when-selected");
      _push(`<!--[--><section class="mt-lg-60 mt-sm-20" data-v-1ac0949f><div class="container" data-v-1ac0949f><div class="artist-wrapper row gap-row-base" data-v-1ac0949f><div class="col-md-6" data-v-1ac0949f>`);
      if ((_a = unref(artistDetail)) == null ? void 0 : _a.portrait) {
        _push(`<div class="avatar" data-v-1ac0949f><img class="w-full"${ssrRenderAttr("src", unref(imagePrefix)((_b = unref(artistDetail)) == null ? void 0 : _b.portrait))} alt="avatar" data-v-1ac0949f></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-22 f-bold-500 my-20 text-underline cursor-pointer" data-v-1ac0949f>${ssrInterpolate((_c = unref(artistDetail)) == null ? void 0 : _c.name)}</p><p class="text-16 f-bold-500 my-20" data-v-1ac0949f>${ssrInterpolate((_d = unref(artistDetail)) == null ? void 0 : _d.location)}</p><p class="text-18" data-v-1ac0949f>${ssrInterpolate((_e = unref(artistDetail)) == null ? void 0 : _e.intro)}</p></div>`);
      if ((_f = unref(artistDetail)) == null ? void 0 : _f.detail) {
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

export { _id_ as default };
//# sourceMappingURL=_id_-Vshplt_p.mjs.map
