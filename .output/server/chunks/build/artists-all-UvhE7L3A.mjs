import { defineComponent, ref, computed, watch, unref, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { g as getArtistsListBySearchApi } from './artists-BIuv_vJu.mjs';
import { _ as _export_sfc, a4 as useRouter, u as useRoute } from './server.mjs';
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
    name: "ArtistsAll"
  },
  __name: "artists-all",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const artistsList = ref([]);
    const getArtistsListBySearch = async () => {
      const params = { letter: letter.value };
      if (categoryId.value) params.categoryId = categoryId.value;
      const { data } = await getArtistsListBySearchApi(params);
      artistsList.value = data;
    };
    const categoryId = computed(() => {
      return route.query.categoryId;
    });
    const letter = computed(() => {
      return route.query.id;
    });
    watch(
      () => route.fullPath,
      (newId, oldId) => {
        if (newId !== oldId) {
          getArtistsListBySearch();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="sec-head" data-v-0b2439cc><div class="container" data-v-0b2439cc><div class="text-center py-lg-40 py-20 header-section f-bold-500" data-v-0b2439cc><h1 class="text-50 mb-20" data-v-0b2439cc>Browse All &quot;${ssrInterpolate(unref(letter))}&quot; Artists</h1><p class="text-16 text-gray-600 description" data-v-0b2439cc> Our oil paintings are 100% hand-painted on canvas by skilled artists </p><p class="text-16 mt-20" data-v-0b2439cc>BROWSE ARTISTS BY LAST NAME (simply click on the first letter of the artist&#39;s last name)</p></div></div></div><section class="sec-letter" data-v-0b2439cc><div class="container" data-v-0b2439cc><div class="letter-list acea-row row-between-wrapper gap-column-base" data-v-0b2439cc><!--[-->`);
      ssrRenderList(letters, (letter2, index) => {
        _push(`<div class="${ssrRenderClass([{ "on": unref(route).params.id === letter2 }, "letter-item text-22 py-lg-20 py-10 cursor-pointer"])}" data-v-0b2439cc>${ssrInterpolate(letter2)}</div>`);
      });
      _push(`<!--]--></div></div></section><div class="sec-list" data-v-0b2439cc><div class="container" data-v-0b2439cc><div class="row artist-list my-20 gap-row-base" data-v-0b2439cc><!--[-->`);
      ssrRenderList(unref(artistsList), (art) => {
        _push(`<div class="col-lg-3 col-sm-4 col-6" data-v-0b2439cc><div class="artist-item text-20 cursor-pointer line1" data-v-0b2439cc>${ssrInterpolate(art.name)}</div></div>`);
      });
      _push(`<!--]--></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artists-all.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const artistsAll = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0b2439cc"]]);

export { artistsAll as default };
//# sourceMappingURL=artists-all-UvhE7L3A.mjs.map
