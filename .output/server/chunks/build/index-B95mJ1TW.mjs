import { c as buildAssetsURL } from '../routes/renderer.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './skeleton-item-BRULBEUt.mjs';
import { _ as _export_sfc, ab as imagePrefix, u as useRoute, a4 as useRouter, a8 as useAppStore, a9 as useCurrencyStore, a3 as useUserStore, aF as jumpToUrl, au as jumpToProduct, a as ElButton, ap as useRuntimeConfig, Z as TRADE_MODULE, ax as PRODUCT_URL, aI as BEST_URL, b as ElMessage, aH as copyToClipboard, $ as $http } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, resolveDirective, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, withDirectives, vShow, renderList, mergeProps, toDisplayString, withModifiers, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { g as gen_path_obj } from './product-DJnmy_Y8.mjs';
import { a as subscribeForRealName } from './message-DIUxZVmi.mjs';
import { u as useCustomStore } from './custom-CnGfPiQ8.mjs';
import { L as LoginWindow } from './LoginWindow-8pCArWXq.mjs';
import { E as ElDialog } from './dialog-DQju9U68.mjs';
import { u as useAsyncData } from './asyncData-CCFbhCAK.mjs';
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
import '@vue/shared';
import 'pinia';
import 'vue-router';
import '@vueuse/core';
import 'lodash-unified';
import '@ctrl/tinycolor';
import 'axios';
import './form-item-BeekeJ4U.mjs';
import 'async-validator';
import './nuxt-link-DR_c-RpP.mjs';
import './divider-DgH3PmJB.mjs';
import './logo-DzgOjlOk.mjs';
import './google-CA8l_UnH.mjs';
import './useAuth-Dm_6RpzH.mjs';
import './index-BuIDaW2O.mjs';
import './index-QxVyGfSM.mjs';

const _imports_0 = "" + buildAssetsURL("logo2.Fus64NH7.png");
const getCouponDetailApi = (id) => {
  return $http().get(TRADE_MODULE + `/coupon/detail/${id}`);
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PromoCode",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const router = useRouter();
    const visible = ref(false);
    const copyCode = (text) => {
      copyToClipboard(text).then(() => {
        ElMessage.success("Copy successful");
        router.replace("/");
      }).catch(() => {
        ElMessage.error("Copy failed");
      });
    };
    const open = async (id) => {
      await getCouponDetail(id);
    };
    const couponDetail = ref({});
    const getCouponDetail = async (id) => {
      try {
        const { data } = await getCouponDetailApi(id);
        couponDetail.value = data;
        visible.value = true;
      } catch (error) {
        router.replace("/");
      }
    };
    __expose({
      open
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: unref(visible),
        "onUpdate:modelValue": ($event) => isRef(visible) ? visible.value = $event : null,
        width: "665px",
        class: "promo-dialog",
        "show-close": false
      }, _attrs), {
        header: withCtx(({ close, titleId, titleClass }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="acea-row row-right"${_scopeId}><span class="iconfont icon-close text-20 cursor-pointer"${_scopeId}></span></div>`);
          } else {
            return [
              createVNode("div", { class: "acea-row row-right" }, [
                createVNode("span", {
                  class: "iconfont icon-close text-20 cursor-pointer",
                  onClick: close
                }, null, 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="text-center text-gray-700"${_scopeId}><p class="text-16 text-gray-600 f-bold-500"${_scopeId}>Exclusive Offer From:</p><img${ssrRenderAttr("src", _imports_0)} alt="logo" class="inline-block mt-20" style="${ssrRenderStyle({ "height": "46px" })}"${_scopeId}><p class="text-30 f-bold-500 my-20"${_scopeId}>Get ${ssrInterpolate((_a = unref(couponDetail)) == null ? void 0 : _a.discountRate)} off your order</p><p class="text-20 f-bold-500"${_scopeId}>${ssrInterpolate((_b = unref(couponDetail)) == null ? void 0 : _b.expire)} ${ssrInterpolate((_c = unref(couponDetail)) == null ? void 0 : _c.unit)} Only - ${ssrInterpolate((_d = unref(couponDetail)) == null ? void 0 : _d.startTime)} - ${ssrInterpolate((_e = unref(couponDetail)) == null ? void 0 : _e.endTime)} HKT</p><div class="acea-row row-between-wrapper border-sm border-dashed my-20 pl-22 pr-8 py-8 rounded-sm"${_scopeId}><span class="text-26 f-bold-500 text-uppercase line1 flex-1 text-left mr-10"${_scopeId}>${ssrInterpolate((_f = unref(couponDetail)) == null ? void 0 : _f.code)}</span>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              size: "large",
              onClick: ($event) => {
                var _a2;
                return copyCode((_a2 = unref(couponDetail)) == null ? void 0 : _a2.code);
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="iconfont icon-cut mr-10 text-20"${_scopeId2}></span> Copy Code `);
                } else {
                  return [
                    createVNode("span", { class: "iconfont icon-cut mr-10 text-20" }),
                    createTextVNode(" Copy Code ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><p class="text-14 text-gray-600 cursor-pointer"${_scopeId}>Click to copy code</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center text-gray-700" }, [
                createVNode("p", { class: "text-16 text-gray-600 f-bold-500" }, "Exclusive Offer From:"),
                createVNode("img", {
                  src: _imports_0,
                  alt: "logo",
                  class: "inline-block mt-20",
                  style: { "height": "46px" }
                }),
                createVNode("p", { class: "text-30 f-bold-500 my-20" }, "Get " + toDisplayString((_g = unref(couponDetail)) == null ? void 0 : _g.discountRate) + " off your order", 1),
                createVNode("p", { class: "text-20 f-bold-500" }, toDisplayString((_h = unref(couponDetail)) == null ? void 0 : _h.expire) + " " + toDisplayString((_i = unref(couponDetail)) == null ? void 0 : _i.unit) + " Only - " + toDisplayString((_j = unref(couponDetail)) == null ? void 0 : _j.startTime) + " - " + toDisplayString((_k = unref(couponDetail)) == null ? void 0 : _k.endTime) + " HKT", 1),
                createVNode("div", { class: "acea-row row-between-wrapper border-sm border-dashed my-20 pl-22 pr-8 py-8 rounded-sm" }, [
                  createVNode("span", { class: "text-26 f-bold-500 text-uppercase line1 flex-1 text-left mr-10" }, toDisplayString((_l = unref(couponDetail)) == null ? void 0 : _l.code), 1),
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "large",
                    onClick: ($event) => {
                      var _a2;
                      return copyCode((_a2 = unref(couponDetail)) == null ? void 0 : _a2.code);
                    }
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "iconfont icon-cut mr-10 text-20" }),
                      createTextVNode(" Copy Code ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode("p", {
                  class: "text-14 text-gray-600 cursor-pointer",
                  onClick: ($event) => {
                    var _a2;
                    return copyCode((_a2 = unref(couponDetail)) == null ? void 0 : _a2.code);
                  }
                }, "Click to copy code", 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PromoCode.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PromoCode = Object.assign(_sfc_main$1, { __name: "PromoCode" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Home"
  },
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const contactImage = imagePrefix("/static/artdafen/contact-bg.webp");
    useRoute();
    const router = useRouter();
    const appStore = useAppStore();
    useCustomStore();
    const currencyStore = useCurrencyStore();
    const userStore = useUserStore();
    const modules = [Autoplay, Pagination, Navigation];
    const isSkeleton2Explore = ref(true);
    const handleClickArtist = (creator) => {
      router.push({
        path: PRODUCT_URL,
        query: gen_path_obj(creator, "ARTIST", ["name"])
      });
    };
    const { data: homeData, pending: isSkeleton } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("homeData", async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/home/ad");
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const topicData = computed(() => {
      var _a;
      return ((_a = homeData.value) != null ? _a : []).filter((i) => i.tags === "index:topic");
    });
    const roomData = computed(() => {
      var _a;
      return ((_a = homeData.value) != null ? _a : []).filter((i) => i.tags === "index:room");
    });
    const styleData = computed(() => {
      var _a;
      return ((_a = homeData.value) != null ? _a : []).filter((i) => i.tags === "index:style");
    });
    const disCoverData = computed(() => {
      var _a;
      return ((_a = homeData.value) != null ? _a : []).filter((i) => i.tags === "index:discover");
    });
    const officialData = computed(() => {
      var _a;
      return ((_a = homeData.value) != null ? _a : []).filter((i) => i.tags === "index:official");
    });
    const exploreData = ref([]);
    const handleSeeMoreBest = () => {
      router.push({
        path: BEST_URL,
        query: { menuId: "1000001" }
      });
    };
    const { data: artistsData, pending: isSkeleton2Artists } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("artistsData", async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/home/artists");
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const handleSubscribe = async () => {
      if (userStore.userInfo.subscribe === "0") return;
      if (!userStore.isLogin) return showLoginWindow();
      await subscribeForRealName();
      ElMessage.success("Subscription successful");
      userStore.updateSubscribe("0");
    };
    const loginWindowRef = ref();
    const showLoginWindow = () => {
      var _a;
      (_a = loginWindowRef.value) == null ? void 0 : _a.open();
    };
    const promoCodeRef = ref();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_button = ElButton;
      const _directive_aos = resolveDirective("aos");
      let _temp0;
      _push(`<!--[--><section class="sec-banner" data-v-db538c5d>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: ""
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "31vw" }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_skeleton_item, {
                variant: "image",
                style: { "width": "100%", "height": "31vw" }
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Swiper), {
              modules,
              pagination: { clickable: true },
              autoplay: { delay: 2500, disableOnInteraction: false }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(topicData), (item) => {
                    _push3(ssrRenderComponent(unref(SwiperSlide), {
                      key: item.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="cursor-pointer" data-v-db538c5d${_scopeId3}>`);
                          if (item.type === "0") {
                            _push4(`<!--[--><img class="banner-img"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" style="${ssrRenderStyle(unref(appStore).device === "pc" ? null : { display: "none" })}" data-v-db538c5d${_scopeId3}><img class="banner-img"${ssrRenderAttr("src", unref(imagePrefix)(item.mobileImg))} alt="" style="${ssrRenderStyle(unref(appStore).device === "app" ? null : { display: "none" })}" data-v-db538c5d${_scopeId3}><!--]-->`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (item.type === "1") {
                            _push4(`<video${ssrRenderAttr("src", unref(imagePrefix)(item.media))}${ssrRenderAttr("poster", unref(imagePrefix)(item.img))}${ssrIncludeBooleanAttr(true) ? " autoplay" : ""}${ssrIncludeBooleanAttr(true) ? " loop" : ""}${ssrIncludeBooleanAttr(true) ? " muted" : ""}${ssrIncludeBooleanAttr(false) ? " controls" : ""} data-v-db538c5d${_scopeId3}></video>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => unref(jumpToUrl)(item.url),
                              class: "cursor-pointer"
                            }, [
                              item.type === "0" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                withDirectives(createVNode("img", {
                                  class: "banner-img",
                                  src: unref(imagePrefix)(item.img),
                                  alt: ""
                                }, null, 8, ["src"]), [
                                  [vShow, unref(appStore).device === "pc"]
                                ]),
                                withDirectives(createVNode("img", {
                                  class: "banner-img",
                                  src: unref(imagePrefix)(item.mobileImg),
                                  alt: ""
                                }, null, 8, ["src"]), [
                                  [vShow, unref(appStore).device === "app"]
                                ])
                              ], 64)) : createCommentVNode("", true),
                              item.type === "1" ? (openBlock(), createBlock("video", {
                                key: 1,
                                src: unref(imagePrefix)(item.media),
                                poster: unref(imagePrefix)(item.img),
                                autoplay: true,
                                loop: true,
                                muted: true,
                                controls: false
                              }, null, 8, ["src", "poster"])) : createCommentVNode("", true)
                            ], 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(topicData), (item) => {
                      return openBlock(), createBlock(unref(SwiperSlide), {
                        key: item.id
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => unref(jumpToUrl)(item.url),
                            class: "cursor-pointer"
                          }, [
                            item.type === "0" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              withDirectives(createVNode("img", {
                                class: "banner-img",
                                src: unref(imagePrefix)(item.img),
                                alt: ""
                              }, null, 8, ["src"]), [
                                [vShow, unref(appStore).device === "pc"]
                              ]),
                              withDirectives(createVNode("img", {
                                class: "banner-img",
                                src: unref(imagePrefix)(item.mobileImg),
                                alt: ""
                              }, null, 8, ["src"]), [
                                [vShow, unref(appStore).device === "app"]
                              ])
                            ], 64)) : createCommentVNode("", true),
                            item.type === "1" ? (openBlock(), createBlock("video", {
                              key: 1,
                              src: unref(imagePrefix)(item.media),
                              poster: unref(imagePrefix)(item.img),
                              autoplay: true,
                              loop: true,
                              muted: true,
                              controls: false
                            }, null, 8, ["src", "poster"])) : createCommentVNode("", true)
                          ], 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Swiper), {
                modules,
                pagination: { clickable: true },
                autoplay: { delay: 2500, disableOnInteraction: false }
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(topicData), (item) => {
                    return openBlock(), createBlock(unref(SwiperSlide), {
                      key: item.id
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => unref(jumpToUrl)(item.url),
                          class: "cursor-pointer"
                        }, [
                          item.type === "0" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            withDirectives(createVNode("img", {
                              class: "banner-img",
                              src: unref(imagePrefix)(item.img),
                              alt: ""
                            }, null, 8, ["src"]), [
                              [vShow, unref(appStore).device === "pc"]
                            ]),
                            withDirectives(createVNode("img", {
                              class: "banner-img",
                              src: unref(imagePrefix)(item.mobileImg),
                              alt: ""
                            }, null, 8, ["src"]), [
                              [vShow, unref(appStore).device === "app"]
                            ])
                          ], 64)) : createCommentVNode("", true),
                          item.type === "1" ? (openBlock(), createBlock("video", {
                            key: 1,
                            src: unref(imagePrefix)(item.media),
                            poster: unref(imagePrefix)(item.img),
                            autoplay: true,
                            loop: true,
                            muted: true,
                            controls: false
                          }, null, 8, ["src", "poster"])) : createCommentVNode("", true)
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="sec-welcome" data-v-db538c5d><div class="container" data-v-db538c5d><div${ssrRenderAttrs(mergeProps({ class: "text-center py-lg-40 py-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><h1 class="text-50" data-v-db538c5d>ARTDAFEN.COM</h1><p class="mt-20 text-gray-600 text-16 f-bold-500" style="${ssrRenderStyle({ "max-width": "608px", "margin": "auto" })}" data-v-db538c5d> Since 1989 \xB7 Reimagined 2020 </p></div>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: "",
        count: 4,
        class: "row gap-row-base"
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-xl-3 col-md-4 col-6" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "25vw" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-10" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, { variant: "h1" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              class: "my-10",
              style: { "width": "50%" }
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "col-xl-3 col-md-4 col-6" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "25vw" }
                }),
                createVNode("div", { class: "py-10" }, [
                  createVNode(_component_el_skeleton_item, { variant: "h1" }),
                  createVNode(_component_el_skeleton_item, {
                    variant: "p",
                    class: "my-10",
                    style: { "width": "50%" }
                  })
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row gap-row-base" data-v-db538c5d${_scopeId}><!--[-->`);
            ssrRenderList(unref(officialData), (item, index2) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({
                class: "col-sm-4 col-6",
                key: item.id
              }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: index2 * 100 })))} data-v-db538c5d${_scopeId}><div class="cursor-pointer" data-v-db538c5d${_scopeId}><div class="border-sm border-gray-200 overflow-hidden bg-gray-200" data-v-db538c5d${_scopeId}><img class="w-full img-hover"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-db538c5d${_scopeId}></div><div class="content-wrapper p-10 bg-gray-100" data-v-db538c5d${_scopeId}><p class="line1 text-28 f-bold" data-v-db538c5d${_scopeId}>${ssrInterpolate(item.name)}</p><p class="line2 text-16 my-10" data-v-db538c5d${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-16 f-bold-500 text-underline" data-v-db538c5d${_scopeId}>SHOP NOW</p></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "row gap-row-base" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(officialData), (item, index2) => {
                  return withDirectives((openBlock(), createBlock("div", {
                    class: "col-sm-4 col-6",
                    key: item.id
                  }, [
                    createVNode("div", {
                      class: "cursor-pointer",
                      onClick: ($event) => unref(jumpToUrl)(item.url)
                    }, [
                      createVNode("div", { class: "border-sm border-gray-200 overflow-hidden bg-gray-200" }, [
                        createVNode("img", {
                          class: "w-full img-hover",
                          src: unref(imagePrefix)(item.img),
                          alt: ""
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "content-wrapper p-10 bg-gray-100" }, [
                        createVNode("p", { class: "line1 text-28 f-bold" }, toDisplayString(item.name), 1),
                        createVNode("p", { class: "line2 text-16 my-10" }, toDisplayString(item.title), 1),
                        createVNode("p", { class: "text-16 f-bold-500 text-underline" }, "SHOP NOW")
                      ])
                    ], 8, ["onClick"])
                  ])), [
                    [_directive_aos, { name: "fade-up", delay: index2 * 100 }]
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="sec-art" data-v-db538c5d><div class="container" data-v-db538c5d><div${ssrRenderAttrs(mergeProps({ class: "make-wrapper" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><div class="make-box flex-1 bg-gray-100 p-md-40 p-20" data-v-db538c5d><p class="text-18 f-bold" data-v-db538c5d>MAKE YOUR MEMORIES LAST</p><p class="text-60 f-bold my-20" data-v-db538c5d>Photo To Art</p><p class="text-22" data-v-db538c5d>Easily Transform Life&#39;s Real Moments Into A <br data-v-db538c5d> Masterpiece \u2014 Made Just For You.</p></div><img class="cover cursor-pointer"${ssrRenderAttr("src", unref(imagePrefix)("/static/artdafen/make.webp"))} alt="" data-v-db538c5d></div><div${ssrRenderAttrs(mergeProps({ class: "bespoke-wrapper" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><img class="cover"${ssrRenderAttr("src", unref(imagePrefix)("/static/artdafen/bespoke.webp"))} alt="bespoke" data-v-db538c5d><div class="content" data-v-db538c5d><div data-v-db538c5d><h2 class="text-40" data-v-db538c5d>The Essence of Quality</h2><p class="text-20 mt-20" data-v-db538c5d>Every painting is meticulously crafted and rigorously inspected before it reaches you</p></div><div class="problem-list row" data-v-db538c5d><div class="col-6" data-v-db538c5d><div class="problem-item" data-v-db538c5d><p class="text-20 f-bold-500" data-v-db538c5d>Custom Frame Selection</p><p class="text-16 text-gray-600 mt-20" data-v-db538c5d> Choose from an extensive range of frame styles, finishes, and sizes to complement your d\xE9cor perfectly. </p></div></div><div class="col-6" data-v-db538c5d><div class="problem-item" data-v-db538c5d><p class="text-20 f-bold-500" data-v-db538c5d>Real-Time Scene Swap</p><p class="text-16 text-gray-600 mt-20" data-v-db538c5d> Visualize your artwork instantly in living rooms, bedrooms, or gallery settings to find the perfect fit. </p></div></div><div class="col-6" data-v-db538c5d><div class="problem-item" data-v-db538c5d><p class="text-20 f-bold-500" data-v-db538c5d>True-Scale Visualization</p><p class="text-16 text-gray-600 mt-20" data-v-db538c5d> See your artwork at true scale alongside furniture and d\xE9cor for precise sizing. </p></div></div><div class="col-6" data-v-db538c5d><div class="problem-item" data-v-db538c5d><p class="text-20 f-bold-500" data-v-db538c5d>Interactive Resize &amp; Crop</p><p class="text-16 text-gray-600 mt-20" data-v-db538c5d> Easily resize or crop your artwork without losing quality, ensuring it\u2019s just right. </p></div></div><div class="col-6" data-v-db538c5d><div class="problem-item" data-v-db538c5d><p class="text-20 f-bold-500" data-v-db538c5d>Dynamic Style Filters</p><p class="text-16 text-gray-600 mt-20" data-v-db538c5d> Experiment with matting, wall colors, and lighting presets to achieve perfect aesthetic harmony. </p></div></div><div class="col-6" data-v-db538c5d><div class="problem-item" data-v-db538c5d><p class="text-20 f-bold-500" data-v-db538c5d>One-Click Save &amp; Order</p><p class="text-16 text-gray-600 mt-20" data-v-db538c5d> Create shareable mock-ups and place your order seamlessly in just one click. </p></div></div></div></div></div></div></section><section class="sec-welcome" data-v-db538c5d><div class="container" data-v-db538c5d><div${ssrRenderAttrs(mergeProps({ class: "text-center py-lg-40 py-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><h1 class="text-50" data-v-db538c5d>LIFESTYLE SPACE</h1><p class="mt-20 text-gray-600 text-16 f-bold-500" style="${ssrRenderStyle({ "max-width": "608px", "margin": "auto" })}" data-v-db538c5d> Art That Lights Up Life </p></div>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: "",
        count: 4,
        class: "row gap-row-base"
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-xl-3 col-md-4 col-6" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "25vw" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-10" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, { variant: "h1" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              class: "my-10",
              style: { "width": "50%" }
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "col-xl-3 col-md-4 col-6" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "25vw" }
                }),
                createVNode("div", { class: "py-10" }, [
                  createVNode(_component_el_skeleton_item, { variant: "h1" }),
                  createVNode(_component_el_skeleton_item, {
                    variant: "p",
                    class: "my-10",
                    style: { "width": "50%" }
                  })
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row gap-row-base" data-v-db538c5d${_scopeId}><!--[-->`);
            ssrRenderList(unref(roomData), (item, index2) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({
                class: "col-md-3 col-6",
                key: item.id
              }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: index2 * 100 })))} data-v-db538c5d${_scopeId}><div class="cursor-pointer" data-v-db538c5d${_scopeId}><div class="border-sm border-gray-200 overflow-hidden bg-gray-200" data-v-db538c5d${_scopeId}><img class="w-full img-hover"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-db538c5d${_scopeId}></div><div class="content-wrapper p-10 bg-gray-100" data-v-db538c5d${_scopeId}><p class="line1 text-28 f-bold" data-v-db538c5d${_scopeId}>${ssrInterpolate(item.name)}</p><p class="line2 text-16 my-10" data-v-db538c5d${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-16 f-bold-500 text-underline" data-v-db538c5d${_scopeId}>SHOP NOW</p></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "row gap-row-base" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(roomData), (item, index2) => {
                  return withDirectives((openBlock(), createBlock("div", {
                    class: "col-md-3 col-6",
                    key: item.id
                  }, [
                    createVNode("div", {
                      class: "cursor-pointer",
                      onClick: ($event) => unref(jumpToUrl)(item.url)
                    }, [
                      createVNode("div", { class: "border-sm border-gray-200 overflow-hidden bg-gray-200" }, [
                        createVNode("img", {
                          class: "w-full img-hover",
                          src: unref(imagePrefix)(item.img),
                          alt: ""
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "content-wrapper p-10 bg-gray-100" }, [
                        createVNode("p", { class: "line1 text-28 f-bold" }, toDisplayString(item.name), 1),
                        createVNode("p", { class: "line2 text-16 my-10" }, toDisplayString(item.title), 1),
                        createVNode("p", { class: "text-16 f-bold-500 text-underline" }, "SHOP NOW")
                      ])
                    ], 8, ["onClick"])
                  ])), [
                    [_directive_aos, { name: "fade-up", delay: index2 * 100 }]
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="sec-explore" data-v-db538c5d><div class="container" data-v-db538c5d><div${ssrRenderAttrs(mergeProps({ class: "text-center py-lg-40 py-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><h1 class="text-50" data-v-db538c5d>THE 100 MOST POPULAR WORKS OF ART</h1></div>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: isSkeleton2Explore.value,
        animated: ""
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "19vw" }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_skeleton_item, {
                variant: "image",
                style: { "width": "100%", "height": "19vw" }
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "explore-swiper" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Swiper), {
              class: "pb-lg-60 pb-40",
              modules,
              navigation: true,
              pagination: { clickable: true, type: "progressbar" },
              autoplay: { delay: 2500, disableOnInteraction: false },
              loop: true,
              breakpoints: {
                "1460": { slidesPerView: 5, spaceBetween: 40, slidesPerGroup: 5 },
                "991": { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 },
                "600": { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
                "100": { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 }
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(exploreData.value, (item) => {
                    _push3(ssrRenderComponent(unref(SwiperSlide), {
                      key: item.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b;
                        if (_push4) {
                          _push4(`<div class="explore-item text-center border-sm border-gray-200 cursor-pointer select-none" data-v-db538c5d${_scopeId3}><div class="img-wrapper bg-gray-100" data-v-db538c5d${_scopeId3}><img${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-db538c5d${_scopeId3}></div><h1 class="mt-15 line1 px-10" data-v-db538c5d${_scopeId3}><span class="text-16 f-bold-500 text-underline" data-v-db538c5d${_scopeId3}>${ssrInterpolate((_a2 = item.creator) == null ? void 0 : _a2.name)}</span><span class="iconfont icon-right text-16" data-v-db538c5d${_scopeId3}></span></h1><p class="line1 text-14 my-15 px-10" style="${ssrRenderStyle({ "word-break": "break-word" })}" data-v-db538c5d${_scopeId3}>${ssrInterpolate(item.title)}</p><p class="text-16 f-bold px-10 pb-10" data-v-db538c5d${_scopeId3}>${ssrInterpolate(unref(currencyStore).formatToCurrency(item.retailPrice))}</p></div>`);
                        } else {
                          return [
                            createVNode("div", {
                              class: "explore-item text-center border-sm border-gray-200 cursor-pointer select-none",
                              onClick: ($event) => unref(jumpToProduct)(item)
                            }, [
                              createVNode("div", { class: "img-wrapper bg-gray-100" }, [
                                createVNode("img", {
                                  src: unref(imagePrefix)(item.img),
                                  alt: ""
                                }, null, 8, ["src"])
                              ]),
                              createVNode("h1", { class: "mt-15 line1 px-10" }, [
                                createVNode("span", {
                                  class: "text-16 f-bold-500 text-underline",
                                  onClick: withModifiers(($event) => handleClickArtist(item.creator), ["stop"])
                                }, toDisplayString((_b = item.creator) == null ? void 0 : _b.name), 9, ["onClick"]),
                                createVNode("span", { class: "iconfont icon-right text-16" })
                              ]),
                              createVNode("p", {
                                class: "line1 text-14 my-15 px-10",
                                style: { "word-break": "break-word" }
                              }, toDisplayString(item.title), 1),
                              createVNode("p", { class: "text-16 f-bold px-10 pb-10" }, toDisplayString(unref(currencyStore).formatToCurrency(item.retailPrice)), 1)
                            ], 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(exploreData.value, (item) => {
                      return openBlock(), createBlock(unref(SwiperSlide), {
                        key: item.id
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createVNode("div", {
                              class: "explore-item text-center border-sm border-gray-200 cursor-pointer select-none",
                              onClick: ($event) => unref(jumpToProduct)(item)
                            }, [
                              createVNode("div", { class: "img-wrapper bg-gray-100" }, [
                                createVNode("img", {
                                  src: unref(imagePrefix)(item.img),
                                  alt: ""
                                }, null, 8, ["src"])
                              ]),
                              createVNode("h1", { class: "mt-15 line1 px-10" }, [
                                createVNode("span", {
                                  class: "text-16 f-bold-500 text-underline",
                                  onClick: withModifiers(($event) => handleClickArtist(item.creator), ["stop"])
                                }, toDisplayString((_a2 = item.creator) == null ? void 0 : _a2.name), 9, ["onClick"]),
                                createVNode("span", { class: "iconfont icon-right text-16" })
                              ]),
                              createVNode("p", {
                                class: "line1 text-14 my-15 px-10",
                                style: { "word-break": "break-word" }
                              }, toDisplayString(item.title), 1),
                              createVNode("p", { class: "text-16 f-bold px-10 pb-10" }, toDisplayString(unref(currencyStore).formatToCurrency(item.retailPrice)), 1)
                            ], 8, ["onClick"])
                          ];
                        }),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="acea-row row-center-wrapper pt-lg-40 pt-30" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              class: "home-button",
              plain: "",
              onClick: handleSeeMoreBest
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`SEE MORE`);
                } else {
                  return [
                    createTextVNode("SEE MORE")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "explore-swiper" }, [
                createVNode(unref(Swiper), {
                  class: "pb-lg-60 pb-40",
                  modules,
                  navigation: true,
                  pagination: { clickable: true, type: "progressbar" },
                  autoplay: { delay: 2500, disableOnInteraction: false },
                  loop: true,
                  breakpoints: {
                    "1460": { slidesPerView: 5, spaceBetween: 40, slidesPerGroup: 5 },
                    "991": { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 },
                    "600": { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
                    "100": { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 }
                  }
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(exploreData.value, (item) => {
                      return openBlock(), createBlock(unref(SwiperSlide), {
                        key: item.id
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createVNode("div", {
                              class: "explore-item text-center border-sm border-gray-200 cursor-pointer select-none",
                              onClick: ($event) => unref(jumpToProduct)(item)
                            }, [
                              createVNode("div", { class: "img-wrapper bg-gray-100" }, [
                                createVNode("img", {
                                  src: unref(imagePrefix)(item.img),
                                  alt: ""
                                }, null, 8, ["src"])
                              ]),
                              createVNode("h1", { class: "mt-15 line1 px-10" }, [
                                createVNode("span", {
                                  class: "text-16 f-bold-500 text-underline",
                                  onClick: withModifiers(($event) => handleClickArtist(item.creator), ["stop"])
                                }, toDisplayString((_a2 = item.creator) == null ? void 0 : _a2.name), 9, ["onClick"]),
                                createVNode("span", { class: "iconfont icon-right text-16" })
                              ]),
                              createVNode("p", {
                                class: "line1 text-14 my-15 px-10",
                                style: { "word-break": "break-word" }
                              }, toDisplayString(item.title), 1),
                              createVNode("p", { class: "text-16 f-bold px-10 pb-10" }, toDisplayString(unref(currencyStore).formatToCurrency(item.retailPrice)), 1)
                            ], 8, ["onClick"])
                          ];
                        }),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "acea-row row-center-wrapper pt-lg-40 pt-30" }, [
                  createVNode(_component_el_button, {
                    class: "home-button",
                    plain: "",
                    onClick: handleSeeMoreBest
                  }, {
                    default: withCtx(() => [
                      createTextVNode("SEE MORE")
                    ]),
                    _: 1
                  })
                ])
              ])), [
                [_directive_aos, "fade-up"]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="sec-elevating" data-v-db538c5d><div class="container" data-v-db538c5d><div${ssrRenderAttrs(mergeProps({ class: "text-center py-lg-40 py-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><h1 class="text-50" data-v-db538c5d>ELEVATING YOUR STYLE GAME</h1><p class="mt-20 text-gray-600 text-16 f-bold-500" style="${ssrRenderStyle({ "max-width": "608px", "margin": "auto" })}" data-v-db538c5d> Discover the Perfect Blend of Comfort and Trend with Our Exclusive Collection. Explore Deals on print, Trendy Play, and More! </p></div>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: "",
        count: 3,
        class: "row gap-row-base"
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-md-4 col-6" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "25vw" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-center" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              class: "mt-20",
              style: { "width": "50%" }
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "col-md-4 col-6" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "25vw" }
                }),
                createVNode("div", { class: "text-center" }, [
                  createVNode(_component_el_skeleton_item, {
                    variant: "p",
                    class: "mt-20",
                    style: { "width": "50%" }
                  })
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row elevating-list" data-v-db538c5d${_scopeId}><!--[-->`);
            ssrRenderList(unref(disCoverData), (item, index2) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({
                class: "col-md-4 col-6",
                key: item.id
              }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: index2 % 3 * 100 })))} data-v-db538c5d${_scopeId}><div class="cursor-pointer" data-v-db538c5d${_scopeId}><div class="overflow-hidden" data-v-db538c5d${_scopeId}><img class="w-full img-hover"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-db538c5d${_scopeId}></div><p class="text-center text-30 f-bold-500 mt-20" data-v-db538c5d${_scopeId}>${ssrInterpolate(item.name)}</p></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "row elevating-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(disCoverData), (item, index2) => {
                  return withDirectives((openBlock(), createBlock("div", {
                    class: "col-md-4 col-6",
                    key: item.id
                  }, [
                    createVNode("div", {
                      class: "cursor-pointer",
                      onClick: ($event) => unref(jumpToUrl)(item == null ? void 0 : item.url)
                    }, [
                      createVNode("div", { class: "overflow-hidden" }, [
                        createVNode("img", {
                          class: "w-full img-hover",
                          src: unref(imagePrefix)(item.img),
                          alt: ""
                        }, null, 8, ["src"])
                      ]),
                      createVNode("p", { class: "text-center text-30 f-bold-500 mt-20" }, toDisplayString(item.name), 1)
                    ], 8, ["onClick"])
                  ])), [
                    [_directive_aos, { name: "fade-up", delay: index2 % 3 * 100 }]
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="sec-artist" data-v-db538c5d><div class="container" data-v-db538c5d><div class="artist-wrapper" data-v-db538c5d><div${ssrRenderAttrs(mergeProps({ class: "content" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><h1 class="text-50" data-v-db538c5d>TOP 50 ARTIST</h1>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton2Artists),
        animated: "",
        count: 4,
        class: "my-30"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row artist-list" data-v-db538c5d${_scopeId}><!--[-->`);
            ssrRenderList(unref(artistsData), (item) => {
              _push2(`<div class="col-sm-4 col-6" data-v-db538c5d${_scopeId}><div class="artist-item text-20" data-v-db538c5d${_scopeId}><p class="cursor-pointer mb-10 line1" data-v-db538c5d${_scopeId}>${ssrInterpolate(item.name)}</p></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "row artist-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(artistsData), (item) => {
                  return openBlock(), createBlock("div", {
                    class: "col-sm-4 col-6",
                    key: item.id
                  }, [
                    createVNode("div", { class: "artist-item text-20" }, [
                      createVNode("p", {
                        class: "cursor-pointer mb-10 line1",
                        onClick: ($event) => handleClickArtist(item)
                      }, toDisplayString(item.name), 9, ["onClick"])
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="view-all" data-v-db538c5d>`);
      _push(ssrRenderComponent(_component_el_button, {
        class: "home-button",
        plain: "",
        onClick: ($event) => unref(router).push("/artists-brief")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`VIEW ALL ARTISTS`);
          } else {
            return [
              createTextVNode("VIEW ALL ARTISTS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><img${ssrRenderAttrs(_temp0 = mergeProps({
        class: "cover",
        src: unref(imagePrefix)("/static/artdafen/artists.webp"),
        alt: "cover"
      }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</div></div></section><section class="sec-style" data-v-db538c5d><div class="container" data-v-db538c5d><div${ssrRenderAttrs(mergeProps({ class: "text-center py-lg-40 py-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-db538c5d><h1 class="text-50" data-v-db538c5d>MORE STYLE</h1></div>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: "",
        count: 8,
        class: "row gap-row-base"
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-xl-3 col-md-4 col-6" data-v-db538c5d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "12vw" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "col-xl-3 col-md-4 col-6" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "12vw" }
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row gap-row-base categories-list" data-v-db538c5d${_scopeId}><!--[-->`);
            ssrRenderList(unref(styleData), (item, index2) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({
                class: "col-xl-3 col-md-4 col-6",
                key: item.id
              }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: index2 % 4 * 100 })))} data-v-db538c5d${_scopeId}><div class="categories-item cursor-pointer overflow-hidden" data-v-db538c5d${_scopeId}><img class="w-full h-full fit-cover"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-db538c5d${_scopeId}><p class="categories-text text-26 f-bold text-white text-center" data-v-db538c5d${_scopeId}>${ssrInterpolate(item.name)}</p></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "row gap-row-base categories-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(styleData), (item, index2) => {
                  return withDirectives((openBlock(), createBlock("div", {
                    class: "col-xl-3 col-md-4 col-6",
                    key: item.id
                  }, [
                    createVNode("div", {
                      class: "categories-item cursor-pointer overflow-hidden",
                      onClick: ($event) => unref(jumpToUrl)(item.url)
                    }, [
                      createVNode("img", {
                        class: "w-full h-full fit-cover",
                        src: unref(imagePrefix)(item.img),
                        alt: ""
                      }, null, 8, ["src"]),
                      createVNode("p", { class: "categories-text text-26 f-bold text-white text-center" }, toDisplayString(item.name), 1)
                    ], 8, ["onClick"])
                  ])), [
                    [_directive_aos, { name: "fade-up", delay: index2 % 4 * 100 }]
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="sec-contact" data-v-db538c5d><div class="container-fluid" data-v-db538c5d><div class="contact-container" data-v-db538c5d><div class="contact-bg" style="${ssrRenderStyle({ backgroundImage: `url(${unref(contactImage)})` })}" data-v-db538c5d></div><div class="contact-wrapper text-center" data-v-db538c5d><h1 class="text-46 f-bold-500 mb-20" data-v-db538c5d>Keep up with the latest at ArtDaFen.com.<br data-v-db538c5d>Sign up now &amp; get 15% off* your purchase of $99 or more!</h1><div class="contact-buttons acea-row row-column gap-row-base" data-v-db538c5d>`);
      _push(ssrRenderComponent(_component_el_button, {
        size: "large",
        type: "primary",
        onClick: handleSubscribe
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(userStore).isLogin) {
              _push2(`<!--[-->${ssrInterpolate(unref(userStore).userInfo.subscribe === "1" ? "Subscribe" : "You Have Been Subscribed")}<!--]-->`);
            } else {
              _push2(`<!--[-->Sign Up<!--]-->`);
            }
          } else {
            return [
              unref(userStore).isLogin ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(unref(userStore).userInfo.subscribe === "1" ? "Subscribe" : "You Have Been Subscribed"), 1)
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createTextVNode("Sign Up")
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-16" data-v-db538c5d> INSTANTLY ACCESS THE LATEST FASHION TRENDS AND EXCLUSIVE DEALS ON OUR SITE.DISCOVER YOUR PERFECT STYLE IN A FEW CLICKS! </p></div></div></div></section>`);
      _push(ssrRenderComponent(LoginWindow, {
        ref_key: "loginWindowRef",
        ref: loginWindowRef
      }, null, _parent));
      _push(ssrRenderComponent(PromoCode, {
        ref_key: "promoCodeRef",
        ref: promoCodeRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-db538c5d"]]);

export { index as default };
//# sourceMappingURL=index-B95mJ1TW.mjs.map
