import { defineComponent, ref, computed, watch, unref, useSSRContext } from "vue";
import { ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { a4 as useRouter, u as useRoute, aX as getHomeArtistsApi, _ as _export_sfc } from "../server.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ArtistsTop"
  },
  __name: "artists-top",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const artistsList = ref([]);
    const getHomeArtists = async () => {
      const { data } = await getHomeArtistsApi({ categoryId: categoryId.value });
      artistsList.value = data;
    };
    const categoryId = computed(() => {
      return route.query.categoryId;
    });
    watch(
      () => route.fullPath,
      (newId, oldId) => {
        if (newId !== oldId) {
          getHomeArtists();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="sec-head" data-v-5c046ae0><div class="container" data-v-5c046ae0><div class="text-center py-lg-40 py-20 header-section f-bold-500" data-v-5c046ae0><h1 class="text-50 mb-20" data-v-5c046ae0>Browse Top &quot;50&quot; Artists</h1><p class="text-16 text-gray-600 description" data-v-5c046ae0> Our oil paintings are 100% hand-painted on canvas by skilled artists </p><p class="text-16 mt-20" data-v-5c046ae0>BROWSE ARTISTS BY LAST NAME (simply click on the first letter of the artist&#39;s last name)</p></div></div></div><div class="sec-list" data-v-5c046ae0><div class="container" data-v-5c046ae0><div class="row artist-list my-20 gap-row-base" data-v-5c046ae0><!--[-->`);
      ssrRenderList(unref(artistsList), (art) => {
        _push(`<div class="col-lg-3 col-sm-4 col-6" data-v-5c046ae0><div class="artist-item text-20 cursor-pointer line1" data-v-5c046ae0>${ssrInterpolate(art.name)}</div></div>`);
      });
      _push(`<!--]--></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artists-top.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const artistsTop = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c046ae0"]]);
export {
  artistsTop as default
};
//# sourceMappingURL=artists-top-G-D6EVX1.js.map
