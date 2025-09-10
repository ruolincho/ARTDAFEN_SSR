import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { u as useRoute, a9 as useCurrencyStore, ab as imagePrefix, _ as _export_sfc } from "../server.mjs";
import "F:/artdafen-ui-ssr/node_modules/hookable/dist/index.mjs";
import { a as formatPayChannel, f as formatTimestamp } from "./format-BLqFJkIL.js";
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
import "moment";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "OrderDetail "
  },
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const currencyStore = useCurrencyStore();
    const currencyCode = ref("USD");
    const orderDetail = ref({});
    const generateList = computed(() => [...orderDetail.value?.orderItems || [], ...orderDetail.value?.gifts || []]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-8c134af9><h1 class="text-40 f-bold-500 py-lg-50 py-30" data-v-8c134af9>Review Your Order</h1><div class="cart-container acea-row row-between row-top" data-v-8c134af9><div class="review-container pr-md-30" data-v-8c134af9><div class="text-20 f-bold py-20" data-v-8c134af9>Order Item List</div><div class="review-list" data-v-8c134af9><!--[-->`);
      ssrRenderList(unref(generateList), (item, index) => {
        _push(`<div class="review-item acea-row gap-base" data-v-8c134af9><div class="p-img" data-v-8c134af9><div class="aspect-ratio p-10 border-sm border-gray-200" data-v-8c134af9><img class="w-full h-full fit-contain"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-8c134af9></div></div><div class="p-cont flex-1" data-v-8c134af9><div class="acea-row row-between-wrapper gap-base mb-10" data-v-8c134af9><p class="text-16 f-bold-500 flex-1" data-v-8c134af9>${ssrInterpolate(item.title)}</p></div><p class="text-14 f-bold" data-v-8c134af9>${ssrInterpolate(item.quantity)} × ${ssrInterpolate(unref(currencyStore).formatToCurrency(item.unitPrice, unref(currencyCode)))}</p><!--[-->`);
        ssrRenderList(item.specs, (v, k) => {
          _push(`<p class="text-14 text-gray-500 mt-4" data-v-8c134af9>${ssrInterpolate(k)}: ${ssrInterpolate(v)}</p>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><div class="text-20 f-bold py-20" data-v-8c134af9>Shipping Address</div><div class="border-b-sm border-gray-200 my-20 pb-20" data-v-8c134af9><p class="text-20 f-bold" data-v-8c134af9>${ssrInterpolate(unref(orderDetail)?.address?.name)}</p><p class="text-14 mt-20" data-v-8c134af9>${ssrInterpolate(unref(orderDetail)?.address?.detail)}, ${ssrInterpolate(unref(orderDetail)?.address?.country)}, ${ssrInterpolate(unref(orderDetail)?.address?.state)}, ${ssrInterpolate(unref(orderDetail)?.address?.city)}, ${ssrInterpolate(unref(orderDetail)?.address?.zip)}</p></div><div class="text-20 f-bold py-20" data-v-8c134af9>Payment Method</div><div class="border-b-sm border-gray-200 my-20 pb-20 text-20 acea-row row-between-wrapper" data-v-8c134af9><p class="f-bold" data-v-8c134af9>${ssrInterpolate(unref(formatPayChannel)(unref(orderDetail)?.order?.payChannel))}</p><p data-v-8c134af9>${ssrInterpolate(unref(formatTimestamp)(unref(orderDetail)?.order?.payTime))}</p></div></div><div class="review-summary shadow-lg p-20" data-v-8c134af9><div class="acea-row row-between-wrapper text-16 f-bold pb-20 mb-20 border-b-sm border-gray-200" data-v-8c134af9><span data-v-8c134af9>Subtotal</span><span data-v-8c134af9>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(orderDetail)?.order?.originalAmount || 0, unref(currencyCode)))}</span></div><div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper" data-v-8c134af9><span data-v-8c134af9>Delivery Amount</span><span data-v-8c134af9>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(orderDetail)?.order?.deliveryAmount || 0, unref(currencyCode)))}</span></div><div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper" data-v-8c134af9><span data-v-8c134af9>Discount Amount</span><span data-v-8c134af9>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(orderDetail)?.order?.discountAmount || 0, unref(currencyCode)))}</span></div><div class="acea-row row-between-wrapper text-16 f-bold pt-20 mt-20 border-t-sm border-gray-200 text-error" data-v-8c134af9><span data-v-8c134af9>Grand Total</span><span data-v-8c134af9>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(orderDetail)?.order?.actualAmount || 0, unref(currencyCode)))}</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/order-detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c134af9"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-Dx1MNV0S.js.map
