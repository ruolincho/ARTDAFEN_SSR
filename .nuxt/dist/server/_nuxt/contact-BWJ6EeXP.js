import { a as ElButton, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
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
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const pointList = ref([
      {
        detail: "Kam Sheung Road, Yuen Long, Hong Kong DD106 Lot 1479C Lot",
        tel: "",
        email: "info@artdafen.com"
      },
      {
        detail: "103, 1st Floor, Dafen Oil Painting Trading Plaza, Buji Street, Longgang District, Shenzhen",
        tel: "",
        email: "infocn@artdafen.com"
      },
      {
        detail: "111 Morgan Street, Room 323, Stamford CT 06905",
        tel: "",
        email: "infous@artdafen.com"
      },
      {
        detail: "23 Rue du Bois Joli,44200 Nantes",
        tel: "(213)656-3859",
        email: "infofr@artdafen.com"
      },
      {
        detail: "unit 5-6, Wellington house, Camden street, Brighton, East Sussex BN41 1DU, UK",
        tel: "",
        email: "infouk@artdafen.com"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      _push(`<!--[--><section class="contact-section" data-v-1c9fb63e><div class="container" data-v-1c9fb63e><h2 class="text-26 f-bold pt-lg-50 pt-30" data-v-1c9fb63e>Contact Us</h2><p class="text-16 text-gray-600 my-20" data-v-1c9fb63e> ARTDAFEN is a curated online platform for art transactions, introducing a wide range of domestic and international brands. If you are interested in having your brand listed on our platform, working with us as a partner, or inquiring about bulk purchases or consulting, please fill out the appropriate form for each case. </p><h3 class="text-20 f-bold-500 my-20" data-v-1c9fb63e>Brand Entry Procedure</h3><ul class="list-ul decimal my-20" data-v-1c9fb63e><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>Submit an entry application.</li><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>Our team will review your application. (If your brand/category fits our direction, we will contact you via phone or email.) </li><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>Proceed with the agreement process once all entry conditions are confirmed. </li></ul><h3 class="text-20 f-bold-500 my-20" data-v-1c9fb63e>※ Important Notes on Brand Entry</h3><ul class="list-ul decimal my-20" data-v-1c9fb63e><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>ARTDAFEN only accepts brands that align with our business direction and sales strategy. </li><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>Only after reviewing your application can we determine whether a brand is eligible to enter and proceed with the agreement. Inquiries via individual emails or mail are not accept. </li><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>Brands involved in categories such as agency distribution, home goods, wholesale, and private labels that do not align with ARTDAFEN’s business direction will not be accepted. (For imported goods, import declaration and certification must be available.) </li><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>If your team cannot handle key operational tasks (such as product registration, delivery, and CS) or assign a dedicated manager, your application may be declined. </li></ul><h3 class="text-20 f-bold-500 my-20" data-v-1c9fb63e>※ For bulk purchase inquiries, please include [brand/product introduction], intended items, quantity, and preferred delivery date.</h3><ul class="list-ul my-20" data-v-1c9fb63e><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>We appreciate your interest in ARTDAFEN and value your proposal.</li><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>Our team will review your proposal in the order received.</li><li class="text-16 text-gray-600 mb-10" data-v-1c9fb63e>If we determine that there is potential for collaboration, we will contact you within a week. If progress is difficult at this time, we may not be able to respond individually—we thank you for your understanding. </li></ul><div class="text-60 text-center f-bold-500 border-t-xl border-gray-700 py-lg-40 py-20" data-v-1c9fb63e><p class="my-lg-60 my-30" data-v-1c9fb63e>info@artdafen.com</p></div></div></section><div class="info-section" data-v-1c9fb63e><div class="container" data-v-1c9fb63e><div class="info-list row" data-v-1c9fb63e><!--[-->`);
      ssrRenderList(unref(pointList), (item, index) => {
        _push(`<div class="col-sm-6" data-v-1c9fb63e><div class="info-item shadow-md" data-v-1c9fb63e><div class="icon-wrapper" data-v-1c9fb63e><span class="iconfont icon-rengongkefu" data-v-1c9fb63e></span></div><div class="content-wrapper" data-v-1c9fb63e><p class="text-18 f-bold-600" data-v-1c9fb63e>Call us now</p><p class="text-14 text-gray-600 mt-8 mb-12 desc" data-v-1c9fb63e>${ssrInterpolate(item.detail)}</p><p class="text-24 mb-24" data-v-1c9fb63e>${ssrInterpolate(item.email)}</p>`);
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          size: "large"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` CALL NOW <span class="iconfont icon-right ml-10" data-v-1c9fb63e${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(" CALL NOW "),
                createVNode("span", { class: "iconfont icon-right ml-10" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c9fb63e"]]);
export {
  contact as default
};
//# sourceMappingURL=contact-BWJ6EeXP.js.map
