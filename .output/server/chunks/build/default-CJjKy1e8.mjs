import { c as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_1$1 } from './nuxt-link-DR_c-RpP.mjs';
import { a8 as useAppStore, _ as _export_sfc, a3 as useUserStore, a9 as useCurrencyStore, aw as useCartStore, a4 as useRouter, u as useRoute, ac as __nuxt_component_1$2, a as ElButton, o as CONTACT_EMAIL, ap as useRuntimeConfig, Z as TRADE_MODULE, aI as BEST_URL, ax as PRODUCT_URL, ab as imagePrefix, as as formatAttr } from './server.mjs';
import { E as ElDivider } from './divider-DgH3PmJB.mjs';
import { E as ElPopover } from './popover-Z4OiMpEN.mjs';
import { defineComponent, ref, withAsyncContext, computed, resolveDirective, withCtx, createVNode, createTextVNode, unref, mergeProps, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0$1 } from './logo-DzgOjlOk.mjs';
import { throttle } from 'lodash-es';
import { u as useCustomStore } from './custom-CnGfPiQ8.mjs';
import { u as useAsyncData } from './asyncData-CCFbhCAK.mjs';
import { _ as _imports_4 } from './logo-portrait-Bv-x2szr.mjs';
import 'vue-bundle-renderer/runtime';
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
import './popper-BevOnpDk.mjs';
import '@popperjs/core';
import './index-QxVyGfSM.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CartWindow",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const cartStore = useCartStore();
    const currencyStore = useCurrencyStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8" }, _attrs))} data-v-6b9e72b2><div class="shopping-bag-wrapper" data-v-6b9e72b2>`);
      if (unref(cartStore).carts.length) {
        _push(`<!--[--><p class="text-16 mb-20" data-v-6b9e72b2>You have ${ssrInterpolate(unref(cartStore).subtotalQuantity)} items in your cart</p><div class="shopping-bag-scroll scroll-y scroll-hide" data-v-6b9e72b2><div class="shopping-bag-list" data-v-6b9e72b2><!--[-->`);
        ssrRenderList(unref(cartStore).carts, (item, index) => {
          _push(`<div class="shopping-bag-item acea-row row-middle pb-20 border-b-sm border-gray-200" data-v-6b9e72b2><div class="${ssrRenderClass([{ disabled: item.disable }, "p-img mr-10 border-sm"])}" data-v-6b9e72b2><img class="w-full h-full fit-contain"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-6b9e72b2><p class="tip text-14 py-3 text-center" data-v-6b9e72b2>sell out</p></div><div class="flex-1 text-16 overflow-hidden" data-v-6b9e72b2><p class="line1" data-v-6b9e72b2>${ssrInterpolate(item.title)}</p><p class="f-bold my-5" data-v-6b9e72b2>${ssrInterpolate(item.quantity)} \xD7 ${ssrInterpolate(unref(currencyStore).formatToCurrency(item.retailPrice))}</p><div class="acea-row row-between-wrapper overflow-hidden" data-v-6b9e72b2><p class="flex-1 line1 mr-10" data-v-6b9e72b2>${ssrInterpolate(unref(formatAttr)(item.specs))}</p><span class="iconfont icon-delete text-20 cursor-pointer" data-v-6b9e72b2></span></div></div></div>`);
        });
        _push(`<!--]--></div></div><div class="acea-row row-between-wrapper py-20 text-16 f-bold" data-v-6b9e72b2><p data-v-6b9e72b2>Subtotal</p><p data-v-6b9e72b2>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(cartStore).subtotal))}</p></div>`);
        _push(ssrRenderComponent(_component_el_button, {
          class: "w-full",
          size: "large",
          type: "primary",
          onClick: ($event) => unref(router).push("/cart")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Checkout`);
            } else {
              return [
                createTextVNode("Checkout")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<div class="text-center" data-v-6b9e72b2><p class="mb-15" data-v-6b9e72b2>Your Cart is Empty.</p>`);
        _push(ssrRenderComponent(_component_el_button, {
          size: "large",
          type: "primary",
          onClick: ($event) => unref(router).push(unref(PRODUCT_URL))
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`START SHOPPING`);
            } else {
              return [
                createTextVNode("START SHOPPING")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartWindow.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-6b9e72b2"]]), { __name: "CartWindow" });
const _imports_1$1 = "data:image/png;base64,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";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pcHeaderRef = ref();
    const pcPlaceHeight = ref(218);
    throttle(() => {
      if (pcHeaderRef.value && appStore.isPc) {
        pcPlaceHeight.value = pcHeaderRef.value.offsetHeight;
      }
    }, 300);
    const userStore = useUserStore();
    const appStore = useAppStore();
    const currencyStore = useCurrencyStore();
    const cartStore = useCartStore();
    useCustomStore();
    useRouter();
    const route = useRoute();
    const openMenu = ref(false);
    const openIndex = ref(null);
    const openLangApp = ref(false);
    const { data: headerList } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("header-menu", async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/home/menu");
      data.forEach((item) => {
        if (item.config.type === "BEST") {
          item.path = [`${BEST_URL}_${item.id}`];
        }
        if (item.config.type === "LIST") {
          item.path = [`${PRODUCT_URL}_${item.id}`];
        }
        if (item.config.type === "ARTIST") {
          item.path = [`${PRODUCT_URL}_${item.id}`, "/artists-brief", "/artists-all", "/artists-top"];
        }
        if (item.config.type === "CUSTOM") {
          item.path = ["/custom-paint"];
        }
      });
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const isScrollingPositive = ref(false);
    const cartButtonRef = ref();
    const cartPopoverRef = ref();
    const onClickOutside = () => {
      var _a, _b;
      (_b = (_a = unref(cartPopoverRef).popperRef) == null ? void 0 : _a.delayHide) == null ? void 0 : _b.call(_a);
    };
    const activeNavIndex = ref(null);
    const isDropdownVisible = ref(false);
    computed(() => headerList.value[activeNavIndex.value]);
    const currentRouteText = computed(() => {
      let path = route.path;
      if (route.query.menuId) {
        path += `_${route.query.menuId}`;
      }
      return path;
    });
    const handleOpenCart = () => {
      cartStore.shoppingPreCheck();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$1;
      const _component_ClientOnly = __nuxt_component_1$2;
      const _component_el_divider = ElDivider;
      const _component_el_popover = ElPopover;
      const _component_CartWindow = __nuxt_component_4;
      const _directive_click_outside = resolveDirective("click-outside");
      _push(`<!--[--><header class="${ssrRenderClass([{ "fold": isScrollingPositive.value }, "header-pc pc"])}" data-v-7545298f><div class="header-wrapper" data-v-7545298f><div class="left" data-v-7545298f><div class="logo-wrapper acea-row row-middle" data-v-7545298f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "logo-link",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="logo-img"${ssrRenderAttr("src", _imports_0$1)} alt="logo" data-v-7545298f${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "logo-img",
                src: _imports_0$1,
                alt: "logo"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<img class="logo-text"${ssrRenderAttr("src", _imports_1$1)} alt="slogan" data-v-7545298f></div><div class="nav-wrapper" data-v-7545298f><div class="website" data-v-7545298f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "website-name",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ARTDAFEN.COM`);
          } else {
            return [
              createTextVNode("ARTDAFEN.COM")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="nav-menu acea-row row-middle" data-v-7545298f><div class="nav-list acea-row row-middle" data-v-7545298f><!--[-->`);
      ssrRenderList(unref(headerList), (menu, index) => {
        var _a;
        _push(`<div class="nav-item" data-v-7545298f><span class="${ssrRenderClass([{ "on": activeNavIndex.value === index || ((_a = menu.path) == null ? void 0 : _a.includes(currentRouteText.value)) }, "nav-link cursor-pointer"])}" data-v-7545298f>${ssrInterpolate(menu.name)}</span></div>`);
      });
      _push(`<!--]--><div class="split" data-v-7545298f></div><div class="nav-item side" data-v-7545298f><span class="${ssrRenderClass([{ "on": currentRouteText.value === "/news" }, "nav-link cursor-pointer"])}" data-v-7545298f> NEWS </span></div><div class="nav-item side" data-v-7545298f><span class="${ssrRenderClass([{ "on": currentRouteText.value === "/blog" }, "nav-link cursor-pointer"])}" data-v-7545298f> BLOG </span></div></div></div></div></div><div class="operation-wrapper acea-row row-column row-bottom" data-v-7545298f><div class="operation-list acea-row row-middle" data-v-7545298f>`);
      if (unref(userStore).isLogin) {
        _push(`<div class="operation-item acea-row row-middle" data-v-7545298f><span class="iconfont icon-customer" data-v-7545298f></span><span class="operation-text" data-v-7545298f>MY PAGE</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(userStore).isLogin) {
        _push(`<div class="operation-item acea-row row-middle" data-v-7545298f><span class="iconfont icon-follow" data-v-7545298f></span><span class="operation-text" data-v-7545298f>MY LIKE</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "operation-item acea-row row-middle",
        ref_key: "cartButtonRef",
        ref: cartButtonRef
      }, ssrGetDirectiveProps(_ctx, _directive_click_outside, onClickOutside)))} data-v-7545298f><span class="iconfont icon-shopping-bag" data-v-7545298f></span><span class="operation-text" data-v-7545298f>SHOPPING CART</span></div>`);
      if (!unref(userStore).isLogin) {
        _push(`<div class="operation-item acea-row row-middle" data-v-7545298f><span class="iconfont icon-login" data-v-7545298f></span><span class="operation-text" data-v-7545298f>LOGIN</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="operation-item acea-row row-middle currency" data-v-7545298f><span class="operation-text" data-v-7545298f>${ssrInterpolate(unref(currencyStore).currentCurrency)}</span><span class="iconfont icon-down" data-v-7545298f></span><ul class="currency-list" data-v-7545298f><!--[-->`);
      ssrRenderList(unref(currencyStore).currencyList, (item) => {
        _push(`<li data-v-7545298f>${ssrInterpolate(item.code)} - ${ssrInterpolate(item.name)}</li>`);
      });
      _push(`<!--]--></ul></div></div><div class="iconfont icon-search" data-v-7545298f></div></div>`);
      if (isDropdownVisible.value) {
        _push(`<div class="drop-wrapper border-t-sm" data-v-7545298f>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mask" style="${ssrRenderStyle(isDropdownVisible.value ? null : { display: "none" })}" data-v-7545298f></div></div></header><div style="${ssrRenderStyle([
        { height: pcPlaceHeight.value + "px", transition: "height 0.3s ease" },
        unref(appStore).isPc ? null : { display: "none" }
      ])}" data-v-7545298f></div><header class="${ssrRenderClass([{ "open-menu": openMenu.value }, "header-app app"])}" data-v-7545298f><div class="navbar-app" data-v-7545298f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "logo",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0$1)} data-v-7545298f${_scopeId}>`);
          } else {
            return [
              createVNode("img", { src: _imports_0$1 })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="operating-area" data-v-7545298f><span class="iconfont icon-search" data-v-7545298f></span><span class="iconfont icon-shopping-bag" data-v-7545298f></span>`);
      if (unref(userStore).isLogin) {
        _push(`<span class="iconfont icon-customer" data-v-7545298f></span>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(userStore).isLogin) {
        _push(`<span class="iconfont icon-login" data-v-7545298f></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass([[openMenu.value ? "icon-close" : "icon-editor-right-alignment"], "iconfont"])}" data-v-7545298f></span></div></div><div class="nav-menu" data-v-7545298f><ul class="nav-list" data-v-7545298f><!--[-->`);
      ssrRenderList(unref(headerList), (menu, index) => {
        var _a, _b;
        _push(`<li class="${ssrRenderClass([{ active: (_a = menu.path) == null ? void 0 : _a.includes(currentRouteText.value), open: openIndex.value === index }, "P_parent"])}" data-v-7545298f><div class="cate-item" data-v-7545298f><div class="category-a" data-v-7545298f>${ssrInterpolate(menu.name)}</div>`);
        if ((_b = menu.children) == null ? void 0 : _b.length) {
          _push(`<div class="category-tig P_tig" data-v-7545298f><span data-v-7545298f><i class="iconfont icon-down" data-v-7545298f></i></span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="category-cont P_slide" data-v-7545298f><div class="category-pad" data-v-7545298f><!--[-->`);
        ssrRenderList(menu.children, (subMenu) => {
          _push(`<div class="pad-a" data-v-7545298f>${ssrInterpolate(subMenu.name)}</div>`);
        });
        _push(`<!--]--></div></div></li>`);
      });
      _push(`<!--]--><li class="${ssrRenderClass([{ open: currentRouteText.value === "/news" }, "P_parent"])}" data-v-7545298f><div class="cate-item" data-v-7545298f><div class="category-a" data-v-7545298f>NEWS</div></div></li><li class="${ssrRenderClass([{ open: currentRouteText.value === "/blog" }, "P_parent"])}" data-v-7545298f><div class="cate-item" data-v-7545298f><div class="category-a" data-v-7545298f>BLOG</div></div></li></ul>`);
      _push(ssrRenderComponent(_component_el_divider, { "border-style": "solid" }, null, _parent));
      _push(`<ul class="nav-list" data-v-7545298f><li class="${ssrRenderClass([{ open: openLangApp.value }, "P_parent"])}" data-v-7545298f><div class="cate-item" data-v-7545298f><div class="category-a" data-v-7545298f>${ssrInterpolate(unref(currencyStore).currentCurrency)}</div><div class="category-tig P_tig" data-v-7545298f><span data-v-7545298f><i class="iconfont icon-down" data-v-7545298f></i></span></div></div><div class="category-cont P_slide" data-v-7545298f><div class="category-pad" data-v-7545298f><!--[-->`);
      ssrRenderList(unref(currencyStore).currencyList, (item) => {
        _push(`<div class="pad-a" data-v-7545298f>${ssrInterpolate(item.code)} - ${ssrInterpolate(item.name)}</div>`);
      });
      _push(`<!--]--></div></div></li></ul></div></header><div style="${ssrRenderStyle([
        { height: "50px" },
        !unref(appStore).isPc ? null : { display: "none" }
      ])}" data-v-7545298f></div>`);
      _push(ssrRenderComponent(_component_el_popover, {
        ref_key: "cartPopoverRef",
        ref: cartPopoverRef,
        placement: "bottom-end",
        width: "381px",
        trigger: "click",
        "virtual-ref": cartButtonRef.value,
        "virtual-triggering": "",
        onShow: handleOpenCart
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CartWindow, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CartWindow)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-7545298f"]]), { __name: "AppHeader" });
const _imports_0 = "data:image/png;base64,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";
const _imports_1 = "data:image/png;base64,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";
const _imports_2 = "data:image/png;base64,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";
const _imports_3 = "" + buildAssetsURL("delivery-methods2.BUPgx6Lu.png");
const _imports_5 = "" + buildAssetsURL("logo-footer.Dn55ZkbT.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const footerList = ref([
      {
        name: "ABOUT US",
        url: "/about",
        auth: false,
        children: [
          { name: "About ART DAFEN", url: "/about" },
          { name: "Collaborate with Us (For Artists)", url: "/collaboration" },
          { name: "Contact Us", url: "/contact" }
        ]
      },
      {
        name: "MY ACCOUNT",
        url: "/account",
        auth: true,
        children: [
          { name: "My Orders", url: "/account/orders" },
          { name: "My Wishlists", url: "/account/favorites" },
          { name: "My Addresses", url: "/account/addresses" },
          { name: "My Profile", url: "/account/profile" }
        ]
      },
      {
        name: "FAQS",
        url: "/faq",
        auth: false,
        children: [
          { name: "Has My Order Been Shipped Yet?", url: "/faq?name=2-1" },
          { name: "How Do I Return An Item?", url: "/faq?name=4-1" },
          { name: "Can I Return A Personalized Item?", url: "/faq?name=4-2" },
          { name: "I Entered the Wrong Shipping Address \u2013 What Should I Do?", url: "/faq?name=3-2" }
        ]
      }
    ]);
    const openIndex = ref(null);
    const noticeList = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<!--[--><footer class="footer-pc pc" data-v-0c385ad9><div class="acea-row row-between row-bottom" data-v-0c385ad9><div data-v-0c385ad9><p class="text-14 text-gray-600 my-10" data-v-0c385ad9> Business Hours: Mon-Fri 9:00 AM - 6:00 PM (Lunchtime: 12:00 PM - 1:00 PM) </p>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large",
        onClick: ($event) => unref(router).push("/faq")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` FAQ <span class="iconfont icon-right ml-10" data-v-0c385ad9${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" FAQ "),
              createVNode("span", { class: "iconfont icon-right ml-10" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}?subject=${encodeURIComponent("One-on-One Consultation")}`)} data-v-0c385ad9${_scopeId}> One-on-One Consultation <span class="iconfont icon-right ml-10" data-v-0c385ad9${_scopeId}></span></a>`);
          } else {
            return [
              createVNode("a", {
                href: `mailto:${unref(CONTACT_EMAIL)}?subject=${encodeURIComponent("One-on-One Consultation")}`
              }, [
                createTextVNode(" One-on-One Consultation "),
                createVNode("span", { class: "iconfont icon-right ml-10" })
              ], 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="social-icon acea-row gap-base" data-v-0c385ad9><a href="https://www.youtube.com/@artdafen" target="_blank" title="youtube" data-v-0c385ad9><span class="iconfont icon-Youtube text-30" data-v-0c385ad9></span></a><a href="https://www.instagram.com/artdafen/" target="_blank" title="instagram" data-v-0c385ad9><span class="iconfont icon-instagram text-30" data-v-0c385ad9></span></a><a href="https://x.com/artdafen" target="_blank" title="x" data-v-0c385ad9><span class="iconfont icon-tuite text-30" data-v-0c385ad9></span></a></div></div><div class="foot-menu-gap acea-row row-between py-20 my-20 border-t-sm border-b-sm" data-v-0c385ad9>`);
      if (noticeList.value.length) {
        _push(`<dl class="foot-menu flex-1 overflow-hidden" data-v-0c385ad9><dt data-v-0c385ad9>ANNOUNCEMENT</dt><!--[-->`);
        ssrRenderList(noticeList.value, (item) => {
          _push(`<dd class="cursor-pointer" data-v-0c385ad9>${ssrInterpolate(item.title)}</dd>`);
        });
        _push(`<!--]--></dl>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="acea-row foot-menu-gap" data-v-0c385ad9><!--[-->`);
      ssrRenderList(footerList.value, (menu, index) => {
        _push(`<dl class="foot-menu" data-v-0c385ad9><dt data-v-0c385ad9>${ssrInterpolate(menu.name)}</dt><!--[-->`);
        ssrRenderList(menu.children, (subMenu, subIndex) => {
          _push(`<dd data-v-0c385ad9>`);
          if (subMenu.url) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: subMenu.url
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(subMenu.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(subMenu.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<span data-v-0c385ad9>${ssrInterpolate(subMenu.name)}</span>`);
          }
          _push(`</dd>`);
        });
        _push(`<!--]--></dl>`);
      });
      _push(`<!--]--></div></div><div class="foot-partner mb-20" data-v-0c385ad9><p class="f-bold text-20 mb-20" data-v-0c385ad9>Cooperative Partner</p><div class="imgs acea-row gap-base" data-v-0c385ad9><a href="https://www.paypal.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_0)} alt="payment-methods" data-v-0c385ad9></a><a href="https://www.ups.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_1)} alt="UPS" data-v-0c385ad9></a><a href="https://subang.chemanman.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_2)} alt="SuBang" data-v-0c385ad9></a><a href="https://www.fedex.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_3)} alt="FedEx" data-v-0c385ad9></a><a href="https://portraitpainting.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_4)} alt="Portrait" data-v-0c385ad9></a></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "logo-footer",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_5)} alt="logo-footer" data-v-0c385ad9${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_5,
                alt: "logo-footer"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="foot-information" data-v-0c385ad9><div class="friends-link acea-row row-middle" data-v-0c385ad9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy-policy",
        class: "friends-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms-and-conditions",
        class: "friends-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Condition`);
          } else {
            return [
              createTextVNode("Terms of Condition")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cookies-policy",
        class: "friends-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cookies Policy`);
          } else {
            return [
              createTextVNode("Cookies Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-gray-600 mt-10" data-v-0c385ad9> Business Address: Kam Sheung Road, Yuen Long, Hong Kong DD106 Lot 1479C Lot </div><div class="text-gray-600 mt-10" data-v-0c385ad9> Email: <a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}`)} data-v-0c385ad9>${ssrInterpolate(unref(CONTACT_EMAIL))}</a></div></div></footer><footer class="foot-app app" data-v-0c385ad9><div class="footer-menu" data-v-0c385ad9><div class="footer-link" data-v-0c385ad9>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/privacy-policy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/terms-and-conditions" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Condition`);
          } else {
            return [
              createTextVNode("Terms of Condition")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/cookies-policy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cookies Policy`);
          } else {
            return [
              createTextVNode("Cookies Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="foot-pad" data-v-0c385ad9><ul class="footer-item P_parent" data-v-0c385ad9><!--[-->`);
      ssrRenderList(footerList.value, (menu, index) => {
        _push(`<li class="${ssrRenderClass([{ "on": openIndex.value === index }, "footer-tit"])}" data-v-0c385ad9>`);
        if (menu.url) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: menu.url
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(menu.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(menu.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span data-v-0c385ad9>${ssrInterpolate(menu.name)}</span>`);
        }
        _push(`<div class="footer-tig P_tig" data-v-0c385ad9></div><ul class="footer_nav2 footer-cont" data-v-0c385ad9><!--[-->`);
        ssrRenderList(menu.children, (subMenu) => {
          _push(`<li data-v-0c385ad9>`);
          if (subMenu.url) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: subMenu.url
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(subMenu.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(subMenu.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<span data-v-0c385ad9>${ssrInterpolate(subMenu.name)}</span>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="footer-bot" data-v-0c385ad9><div class="partner" data-v-0c385ad9><p class="mb-10" data-v-0c385ad9>Cooperative Partner</p><div class="imgs acea-row gap-sm" data-v-0c385ad9><a href="https://www.paypal.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_0)} alt="payment-methods" data-v-0c385ad9></a><a href="https://www.ups.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_1)} alt="UPS" data-v-0c385ad9></a><a href="https://subang.chemanman.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_2)} alt="SuBang" data-v-0c385ad9></a><a href="https://www.fedex.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_3)} alt="FedEx" data-v-0c385ad9></a><a href="https://portraitpainting.com" target="_blank" data-v-0c385ad9><img${ssrRenderAttr("src", _imports_4)} alt="Portrait" data-v-0c385ad9></a></div></div><div class="tel" data-v-0c385ad9>Email Address<a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}`)} data-v-0c385ad9>${ssrInterpolate(unref(CONTACT_EMAIL))}</a></div><p data-v-0c385ad9>For some products, Artdafen is not a direct seller, but a sales intermediary. For product information, please refer to the specific content on each product page.</p></div></footer><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-0c385ad9"]]), { __name: "AppFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useAppStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_AppFooter = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="main">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CJjKy1e8.mjs.map
