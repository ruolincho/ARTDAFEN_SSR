import { defineComponent, ref, computed, watch, unref, useSSRContext } from 'vue';
import { ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { a as getArtistsListApi } from './artists-BIuv_vJu.mjs';
import { _ as _export_sfc, u as useRoute, a4 as useRouter } from './server.mjs';
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
    name: "Artists"
  },
  __name: "artists-brief",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const artistsList = ref({});
    const getArtistsList = async () => {
      const params = {};
      if (categoryId.value) params.categoryId = categoryId.value;
      const { data } = await getArtistsListApi(params);
      artistsList.value = data;
    };
    const categoryId = computed(() => {
      return route.query.categoryId;
    });
    watch(
      () => route.fullPath,
      (newId, oldId) => {
        if (newId !== oldId) {
          getArtistsList();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><section class="sec-head" data-v-340a8c5f><div class="container" data-v-340a8c5f><div class="text-center py-lg-40 py-20 header-section f-bold-500" data-v-340a8c5f><h1 class="text-50 mb-20" data-v-340a8c5f>Shop by Artist</h1><p class="text-16 text-gray-600 description" data-v-340a8c5f> Our comprehensive website contains over 60,000 oil paintings from thousands of the most widely acclaimed artists the world over. Simply click on your favorite artist and then view all of our museum quality hand-painted oil painting reproductions in one easy and convenient gallery. You may also refine your search by subject, art style, painting orientation, or dominant color. </p><p class="text-16 mt-20" data-v-340a8c5f>BROWSE ARTISTS BY LAST NAME (simply click on the first letter of the artist&#39;s last name)</p></div></div></section><section class="sec-letter" data-v-340a8c5f><div class="container" data-v-340a8c5f><div class="letter-list acea-row row-between-wrapper gap-column-base" data-v-340a8c5f><!--[-->`);
      ssrRenderList(letters, (letter, index) => {
        _push(`<div class="letter-item text-22 py-lg-20 py-10 cursor-pointer" data-v-340a8c5f>${ssrInterpolate(letter)}</div>`);
      });
      _push(`<!--]--></div></div></section><div class="sec-list" data-v-340a8c5f><div class="container" data-v-340a8c5f><div class="row artist-list my-20 gap-row-md" data-v-340a8c5f><!--[-->`);
      ssrRenderList(unref(artistsList), (val, key) => {
        _push(`<div class="col-lg-3 col-sm-4 col-6" data-v-340a8c5f><div class="artist-item pl-25 text-20" data-v-340a8c5f><div class="letter text-22 f-bold" data-v-340a8c5f>${ssrInterpolate(key)}</div><!--[-->`);
        ssrRenderList(val, (art) => {
          _push(`<div class="mb-10 cursor-pointer name line1" data-v-340a8c5f>${ssrInterpolate(art.name)}</div>`);
        });
        _push(`<!--]-->`);
        if (val.length > 4) {
          _push(`<div class="more text-22 f-bold cursor-pointer" data-v-340a8c5f>View All &quot;${ssrInterpolate(key)}&quot; Artists</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artists-brief.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const artistsBrief = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-340a8c5f"]]);

export { artistsBrief as default };
//# sourceMappingURL=artists-brief-DhLAe6FZ.mjs.map
