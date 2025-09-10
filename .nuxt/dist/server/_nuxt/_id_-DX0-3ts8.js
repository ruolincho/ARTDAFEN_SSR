import { u as useRoute, a4 as useRouter, ap as useRuntimeConfig, Z as TRADE_MODULE, ab as imagePrefix, ac as __nuxt_component_1, _ as _export_sfc } from "../server.mjs";
/* empty css             */
import { defineComponent, toRef, withAsyncContext, reactive, watch, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { f as formatTimestamp } from "./format-BLqFJkIL.js";
import { u as useAsyncData } from "./asyncData-CCFbhCAK.js";
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
import "moment";
import "F:/artdafen-ui-ssr/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "NewsDetail"
  },
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const id = toRef(route.params, "id");
    const { data: newsDetail, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(() => `news-detail-${id.value}`, async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/news/detail/" + id.value);
      return data;
    }, {
      server: true,
      default: () => ({}),
      // 当 id 变化时，自动重新执行（客户端）
      watch: [id]
    })), __temp = await __temp, __restore(), __temp);
    const initParam = reactive({ id: "", categoryId: "", size: 5 });
    watch(() => newsDetail.value, (newVal) => {
      if (newVal) {
        newVal.content = newVal.content.replace(/(<(img|video)[^>]*src=")(?!http)([^"]+")/gi, (match, p1, p2, p3) => {
          return `${p1}${imagePrefix(p3)}`;
        });
        initParam.id = newVal.id;
        initParam.categoryId = newVal.categoryId;
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_1;
      _push(`<!--[--><section class="news-detail" data-v-6e5c6376><div class="container-small" data-v-6e5c6376><div class="text-40 f-bold my-20" data-v-6e5c6376>${ssrInterpolate(unref(newsDetail).title)}</div><div class="text-12 my-20" data-v-6e5c6376>${ssrInterpolate(unref(formatTimestamp)(unref(newsDetail).createTime, "YYYY-MM-DD HH:mm:ss"))}</div><div data-v-6e5c6376>${unref(newsDetail).content ?? ""}</div></div></section>`);
      if (unref(newsDetail).id) {
        _push(`<section class="news-more" data-v-6e5c6376><div class="container-small" data-v-6e5c6376><h1 class="my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 font-bold" data-v-6e5c6376>RECOMMEND</h1>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news-detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6e5c6376"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DX0-3ts8.js.map
