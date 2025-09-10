import { E as ElSkeleton, a as ElSkeletonItem } from "./skeleton-item-BRULBEUt.js";
import { $ as $http, Z as TRADE_MODULE, a4 as useRouter, a8 as useAppStore, ac as __nuxt_component_1, aF as jumpToUrl, ab as imagePrefix, av as jumpNewWindow, _ as _export_sfc } from "../server.mjs";
import { E as ElTag } from "./index-TgbWtzhx.js";
/* empty css             */
import { defineComponent, reactive, ref, resolveDirective, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, withDirectives, vShow, mergeProps, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper";
/* empty css                        */
/* empty css                        */
import { f as formatTimestamp } from "./format-BLqFJkIL.js";
import { P as ProInfinite } from "./ProInfinite-BqE3Naq0.js";
import "@vue/shared";
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
import "@ctrl/tinycolor";
import "axios";
import "moment";
const getNewsMoreApi = (params) => {
  return $http().post(TRADE_MODULE + `/news/more`, params);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "News"
  },
  __name: "news",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const appStore = useAppStore();
    const modules = [Pagination, Navigation];
    const initParam = reactive({ size: 12 });
    const isTopicSkeleton = ref(true);
    const topicList = ref([]);
    const isLatestSkeleton = ref(true);
    const latestList = ref([]);
    const getNewsMoreList = (params) => getNewsMoreApi(params);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_ClientOnly = __nuxt_component_1;
      const _component_el_tag = ElTag;
      const _directive_aos = resolveDirective("aos");
      _push(`<!--[--><section class="swiper-section" data-v-b1578e2c><div class="container" data-v-b1578e2c><h1 class="my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 font-bold" data-v-b1578e2c>Latest post</h1>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isTopicSkeleton),
        animated: ""
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "44vw" }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_skeleton_item, {
                variant: "image",
                style: { "width": "100%", "height": "44vw" }
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "latest-swiper" }, [
                    createVNode(unref(Swiper), {
                      modules,
                      navigation: { nextEl: ".next", prevEl: ".prev" },
                      pagination: { clickable: true },
                      loop: true
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(topicList), (item) => {
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
                                    class: "w-full",
                                    src: unref(imagePrefix)(item.img),
                                    alt: ""
                                  }, null, 8, ["src"]), [
                                    [vShow, unref(appStore).device === "pc"]
                                  ]),
                                  withDirectives(createVNode("img", {
                                    class: "w-full",
                                    src: unref(imagePrefix)(item.mobileImg),
                                    alt: ""
                                  }, null, 8, ["src"]), [
                                    [vShow, unref(appStore).device === "app"]
                                  ])
                                ], 64)) : createCommentVNode("", true),
                                item.type === "1" ? (openBlock(), createBlock("video", {
                                  key: 1,
                                  class: "w-full",
                                  src: unref(imagePrefix)(item.media),
                                  poster: unref(imagePrefix)(item.img),
                                  autoplay: true,
                                  loop: true,
                                  muted: true,
                                  controls: false,
                                  playsinline: ""
                                }, null, 8, ["src", "poster"])) : createCommentVNode("", true)
                              ], 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "swiper-button next iconfont icon-right" }),
                    createVNode("div", { class: "swiper-button prev iconfont icon-left" })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="single-section" data-v-b1578e2c><div class="container" data-v-b1578e2c>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isLatestSkeleton),
        animated: "",
        count: 2,
        class: "row single-post"
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-6" data-v-b1578e2c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "25vw" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-10" data-v-b1578e2c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, { variant: "h1" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              class: "my-10",
              style: { "width": "50%" }
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "col-6" }, [
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
            _push2(`<div class="row single-post" data-v-b1578e2c${_scopeId}><!--[-->`);
            ssrRenderList(unref(latestList), (item, index) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({
                class: "col-6",
                key: item.id
              }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: index % 2 * 100 })))} data-v-b1578e2c${_scopeId}><div class="single-item cursor-pointer" data-v-b1578e2c${_scopeId}><div class="p-img overflow-hidden" data-v-b1578e2c${_scopeId}><img class="w-full h-full fit-cover img-hover aspect-ratio-16_9"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-b1578e2c${_scopeId}></div><p class="text-22 mt-18 line1" data-v-b1578e2c${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-14 my-10 line2" data-v-b1578e2c${_scopeId}>${ssrInterpolate(item.subtitle)}</p><div class="acea-row row-between-wrapper gap-row-base" data-v-b1578e2c${_scopeId}><div class="acea-row row-middle gap-xs" data-v-b1578e2c${_scopeId}><!--[-->`);
              ssrRenderList(item.labels, (label) => {
                _push2(ssrRenderComponent(_component_el_tag, {
                  type: "info",
                  effect: "plain",
                  key: label
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(label)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(label), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><span class="text-12" data-v-b1578e2c${_scopeId}>${ssrInterpolate(unref(formatTimestamp)(item.createTime, "YYYY.MM.DD"))}</span></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "row single-post" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(latestList), (item, index) => {
                  return withDirectives((openBlock(), createBlock("div", {
                    class: "col-6",
                    key: item.id
                  }, [
                    createVNode("div", {
                      class: "single-item cursor-pointer",
                      onClick: ($event) => unref(jumpNewWindow)(`/news-detail/${item.id}`)
                    }, [
                      createVNode("div", { class: "p-img overflow-hidden" }, [
                        createVNode("img", {
                          class: "w-full h-full fit-cover img-hover aspect-ratio-16_9",
                          src: unref(imagePrefix)(item.img),
                          alt: ""
                        }, null, 8, ["src"])
                      ]),
                      createVNode("p", { class: "text-22 mt-18 line1" }, toDisplayString(item.title), 1),
                      createVNode("p", { class: "text-14 my-10 line2" }, toDisplayString(item.subtitle), 1),
                      createVNode("div", { class: "acea-row row-between-wrapper gap-row-base" }, [
                        createVNode("div", { class: "acea-row row-middle gap-xs" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.labels, (label) => {
                            return openBlock(), createBlock(_component_el_tag, {
                              type: "info",
                              effect: "plain",
                              key: label
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(label), 1)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        createVNode("span", { class: "text-12" }, toDisplayString(unref(formatTimestamp)(item.createTime, "YYYY.MM.DD")), 1)
                      ])
                    ], 8, ["onClick"])
                  ])), [
                    [_directive_aos, { name: "fade-up", delay: index % 2 * 100 }]
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="list-section" data-v-b1578e2c><div class="container" data-v-b1578e2c>`);
      _push(ssrRenderComponent(ProInfinite, {
        ref: "proInfiniteRef",
        "request-api": getNewsMoreList,
        "need-group": true,
        "init-param": unref(initParam)
      }, {
        default: withCtx((scope, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(scope.rows, ([timeStamp, data]) => {
              _push2(`<div data-v-b1578e2c${_scopeId}><h1 class="my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 font-bold" data-v-b1578e2c${_scopeId}>${ssrInterpolate(unref(formatTimestamp)(timeStamp, "MMM YYYY"))}</h1><div class="row news-list" data-v-b1578e2c${_scopeId}><!--[-->`);
              ssrRenderList(data, (item, index) => {
                _push2(`<div${ssrRenderAttrs(mergeProps({
                  class: "col-lg-3 col-md-4 col-6",
                  key: item.id
                }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: index % 4 * 100 })))} data-v-b1578e2c${_scopeId}><div class="news-item cursor-pointer" data-v-b1578e2c${_scopeId}><div class="p-img overflow-hidden" data-v-b1578e2c${_scopeId}><img class="w-full h-full fit-cover img-hover aspect-ratio-16_9"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-b1578e2c${_scopeId}></div><p class="text-22 mt-18 line2" data-v-b1578e2c${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-14 my-10 line3" data-v-b1578e2c${_scopeId}>${ssrInterpolate(item.subtitle || "- -")}</p><div class="acea-row row-middle gap-xs" data-v-b1578e2c${_scopeId}><!--[-->`);
                ssrRenderList(item.labels, (label) => {
                  _push2(ssrRenderComponent(_component_el_tag, {
                    type: "info",
                    effect: "plain",
                    key: label
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(label)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(label), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div><div class="day text-60 f-bold-200" data-v-b1578e2c${_scopeId}>${ssrInterpolate(unref(formatTimestamp)(item.createTime, "DD"))}</div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(scope.rows, ([timeStamp, data]) => {
                return openBlock(), createBlock("div", { key: timeStamp }, [
                  createVNode("h1", { class: "my-md-40 my-20 py-20 border-b-xl border-gray-700 text-26 font-bold" }, toDisplayString(unref(formatTimestamp)(timeStamp, "MMM YYYY")), 1),
                  createVNode("div", { class: "row news-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(data, (item, index) => {
                      return withDirectives((openBlock(), createBlock("div", {
                        class: "col-lg-3 col-md-4 col-6",
                        key: item.id
                      }, [
                        createVNode("div", {
                          class: "news-item cursor-pointer",
                          onClick: ($event) => unref(jumpNewWindow)(`/news-detail/${item.id}`)
                        }, [
                          createVNode("div", { class: "p-img overflow-hidden" }, [
                            createVNode("img", {
                              class: "w-full h-full fit-cover img-hover aspect-ratio-16_9",
                              src: unref(imagePrefix)(item.img),
                              alt: ""
                            }, null, 8, ["src"])
                          ]),
                          createVNode("p", { class: "text-22 mt-18 line2" }, toDisplayString(item.title), 1),
                          createVNode("p", { class: "text-14 my-10 line3" }, toDisplayString(item.subtitle || "- -"), 1),
                          createVNode("div", { class: "acea-row row-middle gap-xs" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(item.labels, (label) => {
                              return openBlock(), createBlock(_component_el_tag, {
                                type: "info",
                                effect: "plain",
                                key: label
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(label), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          createVNode("div", { class: "day text-60 f-bold-200" }, toDisplayString(unref(formatTimestamp)(item.createTime, "DD")), 1)
                        ], 8, ["onClick"])
                      ])), [
                        [_directive_aos, { name: "fade-up", delay: index % 4 * 100 }]
                      ]);
                    }), 128))
                  ])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const news = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b1578e2c"]]);
export {
  news as default
};
//# sourceMappingURL=news-yXeW6LIZ.js.map
