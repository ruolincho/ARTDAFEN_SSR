import { $ as $http, Z as TRADE_MODULE, a3 as useUserStore, aa as vLoading, ab as imagePrefix, as as formatAttr, _ as _export_sfc, a4 as useRouter, a9 as useCurrencyStore, at as debounce$1, au as jumpToProduct, av as jumpNewWindow } from "../server.mjs";
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext, createCommentVNode, toDisplayString, withDirectives, withModifiers, vShow } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper";
/* empty css                        */
/* empty css                        */
import { f as formatTimestamp } from "./format-BLqFJkIL.js";
import { debounce } from "lodash-es";
import { b as blogThumbsApi } from "./likes-CD9WoB9V.js";
import { L as LoginWindow } from "./LoginWindow-8pCArWXq.js";
import { P as ProInfinite } from "./ProInfinite-BqE3Naq0.js";
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
import "./dialog-DQju9U68.js";
import "./index-QxVyGfSM.js";
import "./form-item-BeekeJ4U.js";
import "async-validator";
import "./nuxt-link-DR_c-RpP.js";
import "./divider-DgH3PmJB.js";
import "./logo-DzgOjlOk.js";
import "./google-CA8l_UnH.js";
import "./useAuth-Dm_6RpzH.js";
import "./custom-CnGfPiQ8.js";
import "./index-BuIDaW2O.js";
const getBlogListApi = (params) => {
  return $http().post(TRADE_MODULE + `/blog/example`, params);
};
const getBlogDetailApi = (id) => {
  return $http().get(TRADE_MODULE + `/blog/detail/${id}`);
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "BlogPopup"
  },
  __name: "BlogPopup",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    nid: {},
    nowTime: {}
  },
  emits: ["update:modelValue", "noAuth", "onThumbs"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const modules = [Pagination, Navigation];
    const noteInfo = ref({});
    const userStore = useUserStore();
    const moreProduct = ref(false);
    const isLoading = ref(false);
    watch(
      () => [props.nowTime],
      () => {
        if (props.nid !== null && props.nid !== "") {
          moreProduct.value = false;
          isLoading.value = true;
          getBlogDetailApi(props.nid).then(({ data }) => {
            data.likeVolume = (Number(data.likeVolume) + (data.like ? 1 : 0)).toString();
            noteInfo.value = data;
            isLoading.value = false;
          });
        }
      }
    );
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          (void 0).body.style.overflow = "hidden";
        } else {
          (void 0).body.style.overflow = "";
        }
      }
    );
    debounce(async () => {
      if (!userStore.isLogin) {
        emit("noAuth");
        return;
      }
      await blogThumbsApi({ mediaId: noteInfo.value.id, operate: ~~!noteInfo.value.like });
      noteInfo.value.like = !noteInfo.value.like;
      noteInfo.value.likeVolume = (Number(noteInfo.value.likeVolume) + (noteInfo.value.like ? 1 : -1)).toString();
      emit("onThumbs", props.nid);
    }, 300);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: _ctx.modelValue ? null : { display: "none" },
        class: "note-detail-mask"
      }, _attrs))} data-v-84668cc8><div${ssrRenderAttrs(mergeProps({ class: "note-container animate__zoomIn" }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(isLoading))))} data-v-84668cc8><div class="media-container" data-v-84668cc8>`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        navigation: true,
        pagination: { clickable: true }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(noteInfo).banner, (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), { key: item }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="img-container" data-v-84668cc8${_scopeId2}><img${ssrRenderAttr("src", unref(imagePrefix)(item))} alt="" data-v-84668cc8${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "img-container" }, [
                        createVNode("img", {
                          src: unref(imagePrefix)(item),
                          alt: ""
                        }, null, 8, ["src"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(noteInfo).banner, (item) => {
                return openBlock(), createBlock(unref(SwiperSlide), { key: item }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "img-container" }, [
                      createVNode("img", {
                        src: unref(imagePrefix)(item),
                        alt: ""
                      }, null, 8, ["src"])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="interaction-container" data-v-84668cc8><div class="author-container scroll-hide" data-v-84668cc8><div class="text-18 f-bold mb-10" data-v-84668cc8>${ssrInterpolate(unref(noteInfo).title)}</div><div class="text-16" data-v-84668cc8>${ssrInterpolate(unref(noteInfo).content)}</div>`);
      if (unref(noteInfo)?.labels?.length) {
        _push(`<div class="text-14 acea-row gap-xs mt-10" data-v-84668cc8><!--[-->`);
        ssrRenderList(unref(noteInfo).labels, (label, labelIndex) => {
          _push(`<span class="text-secondary cursor-pointer" data-v-84668cc8>#${ssrInterpolate(label)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(noteInfo)?.products?.length) {
        _push(`<div class="product-list mt-16" data-v-84668cc8><!--[-->`);
        ssrRenderList(unref(noteInfo).products.slice(0, unref(moreProduct) ? -1 : 3), (goods) => {
          _push(`<div class="product-item border-t-sm py-8 acea-row row-middle cursor-pointer" data-v-84668cc8><div class="p-img mr-6" data-v-84668cc8><img${ssrRenderAttr("src", unref(imagePrefix)(goods.img))} alt="" data-v-84668cc8></div><div class="flex-1 overflow-hidden" data-v-84668cc8><p class="line1 text-16" data-v-84668cc8>${ssrInterpolate(goods.title)}</p><p class="line1 text-14 my-4 text-gray-400" data-v-84668cc8>${ssrInterpolate(unref(formatAttr)(goods.labels))}</p><p class="text-14" data-v-84668cc8>$${ssrInterpolate(goods.retailPrice)}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(noteInfo)?.products?.length > 3 && !unref(moreProduct)) {
        _push(`<div class="text-center my-16 cursor-pointer" data-v-84668cc8><span data-v-84668cc8>Less Product</span><span class="iconfont icon-down ml-4" data-v-84668cc8></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bto-container" data-v-84668cc8><p data-v-84668cc8>${ssrInterpolate(unref(formatTimestamp)(unref(noteInfo).createTime, "MM-DD"))}</p><p class="acea-row row-middle" data-v-84668cc8><span class="iconfont icon-follow cursor-pointer text-20" style="${ssrRenderStyle(!unref(noteInfo).like ? null : { display: "none" })}" data-v-84668cc8></span><span class="iconfont icon-follow-fill text-error cursor-pointer text-20" style="${ssrRenderStyle(unref(noteInfo).like ? null : { display: "none" })}" data-v-84668cc8></span><span class="text-14 ml-4" data-v-84668cc8>${ssrInterpolate(unref(noteInfo).likeVolume)}</span></p></div></div></div><div class="close-circle" data-v-84668cc8><div class="close" data-v-84668cc8><span class="iconfont icon-close text-20" data-v-84668cc8></span></div></div><div class="back-desk" data-v-84668cc8></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogPopup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-84668cc8"]]), { __name: "BlogPopup" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Blog"
  },
  __name: "blog",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const currencyStore = useCurrencyStore();
    const userStore = useUserStore();
    const mainShow = ref(false);
    const nid = ref("");
    const getBlogList1 = (params) => getBlogListApi(params);
    const dataCallback = (data) => {
      data.records.forEach((item) => {
        item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : 0)).toString();
      });
      return data;
    };
    const blogThumbs = debounce$1(async (item) => {
      if (!userStore.isLogin) {
        showLoginWindow();
        return;
      }
      await blogThumbsApi({ mediaId: item.id, operate: ~~!item.like });
      item.like = !item.like;
      item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : -1)).toString();
    }, 300);
    const proInfiniteRef = ref();
    const onThumbs = (id) => {
      const list = proInfiniteRef.value?.tableData || [];
      const item = list.find((item2) => item2.id === id);
      if (!item) return;
      item.like = !item.like;
      item.likeVolume = (Number(item.likeVolume) + (item.like ? 1 : -1)).toString();
    };
    const toDetail = (noteId) => {
      jumpNewWindow(`/blog-detail/${noteId}`);
    };
    const loginWindowRef = ref();
    const showLoginWindow = () => {
      loginWindowRef.value?.open();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlogPopup = __nuxt_component_0;
      _push(`<!--[--><section class="blog-section" data-v-3e692c3a><div class="container" data-v-3e692c3a>`);
      _push(ssrRenderComponent(ProInfinite, {
        ref_key: "proInfiniteRef",
        ref: proInfiniteRef,
        "request-api": getBlogList1,
        "data-callback": dataCallback
      }, {
        default: withCtx((scope, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="blog-list mt-md-40 mt-20" data-v-3e692c3a${_scopeId}><!--[-->`);
            ssrRenderList(scope.rows, (item) => {
              _push2(`<div class="blog-item cursor-pointer" data-v-3e692c3a${_scopeId}><div class="overflow-hidden" data-v-3e692c3a${_scopeId}><img class="w-full img-hover"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-3e692c3a${_scopeId}></div><div class="acea-row row-between-wrapper mt-16 mb-10" data-v-3e692c3a${_scopeId}><p class="text-22 f-bold-500 flex-1 line2 border-r-sm pr-md-20 pr-10" data-v-3e692c3a${_scopeId}>${ssrInterpolate(item.title)}</p><div class="text-center px-md-20 px-10 text-gray-400" data-v-3e692c3a${_scopeId}><span class="iconfont icon-follow cursor-pointer text-20" style="${ssrRenderStyle(!item.like ? null : { display: "none" })}" data-v-3e692c3a${_scopeId}></span><span class="iconfont icon-follow-fill text-error cursor-pointer text-20" style="${ssrRenderStyle(item.like ? null : { display: "none" })}" data-v-3e692c3a${_scopeId}></span><p class="text-14 mt-2" data-v-3e692c3a${_scopeId}>${ssrInterpolate(item.likeVolume)}</p></div></div>`);
              if (item.labels.length) {
                _push2(`<div class="text-14 acea-row gap-xs" data-v-3e692c3a${_scopeId}><!--[-->`);
                ssrRenderList(item.labels, (label, labelIndex) => {
                  _push2(`<span class="text-secondary cursor-pointer" data-v-3e692c3a${_scopeId}>#${ssrInterpolate(label)}</span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.products.length) {
                _push2(`<div class="product-list mt-16" data-v-3e692c3a${_scopeId}><!--[-->`);
                ssrRenderList(item.products, (goods) => {
                  _push2(`<div class="product-item border-t-sm py-8 acea-row row-middle" data-v-3e692c3a${_scopeId}><div class="p-img mr-6" data-v-3e692c3a${_scopeId}><img${ssrRenderAttr("src", unref(imagePrefix)(goods.img))} alt="" data-v-3e692c3a${_scopeId}></div><div class="flex-1 overflow-hidden" data-v-3e692c3a${_scopeId}><p class="line1 text-16" data-v-3e692c3a${_scopeId}>${ssrInterpolate(goods.title)}</p><p class="line1 text-14 my-4 text-gray-400" data-v-3e692c3a${_scopeId}>${ssrInterpolate(unref(formatAttr)(goods.labels))}</p><p class="text-14" data-v-3e692c3a${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(goods.retailPrice))}</p></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "blog-list mt-md-40 mt-20" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(scope.rows, (item) => {
                  return openBlock(), createBlock("div", {
                    class: "blog-item cursor-pointer",
                    key: item.id,
                    onClick: ($event) => toDetail(item.id)
                  }, [
                    createVNode("div", { class: "overflow-hidden" }, [
                      createVNode("img", {
                        class: "w-full img-hover",
                        src: unref(imagePrefix)(item.img),
                        alt: ""
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "acea-row row-between-wrapper mt-16 mb-10" }, [
                      createVNode("p", { class: "text-22 f-bold-500 flex-1 line2 border-r-sm pr-md-20 pr-10" }, toDisplayString(item.title), 1),
                      createVNode("div", { class: "text-center px-md-20 px-10 text-gray-400" }, [
                        withDirectives(createVNode("span", {
                          class: "iconfont icon-follow cursor-pointer text-20",
                          onClick: withModifiers(($event) => unref(blogThumbs)(item), ["stop"])
                        }, null, 8, ["onClick"]), [
                          [vShow, !item.like]
                        ]),
                        withDirectives(createVNode("span", {
                          class: "iconfont icon-follow-fill text-error cursor-pointer text-20",
                          onClick: withModifiers(($event) => unref(blogThumbs)(item), ["stop"])
                        }, null, 8, ["onClick"]), [
                          [vShow, item.like]
                        ]),
                        createVNode("p", { class: "text-14 mt-2" }, toDisplayString(item.likeVolume), 1)
                      ])
                    ]),
                    item.labels.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-14 acea-row gap-xs"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(item.labels, (label, labelIndex) => {
                        return openBlock(), createBlock("span", {
                          class: "text-secondary cursor-pointer",
                          key: labelIndex,
                          onClick: withModifiers(() => {
                          }, ["stop"])
                        }, "#" + toDisplayString(label), 9, ["onClick"]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    item.products.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "product-list mt-16"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(item.products, (goods) => {
                        return openBlock(), createBlock("div", {
                          class: "product-item border-t-sm py-8 acea-row row-middle",
                          key: goods.id,
                          onClick: withModifiers(($event) => unref(jumpToProduct)(goods), ["stop"])
                        }, [
                          createVNode("div", { class: "p-img mr-6" }, [
                            createVNode("img", {
                              src: unref(imagePrefix)(goods.img),
                              alt: ""
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "flex-1 overflow-hidden" }, [
                            createVNode("p", { class: "line1 text-16" }, toDisplayString(goods.title), 1),
                            createVNode("p", { class: "line1 text-14 my-4 text-gray-400" }, toDisplayString(unref(formatAttr)(goods.labels)), 1),
                            createVNode("p", { class: "text-14" }, toDisplayString(unref(currencyStore).formatToCurrency(goods.retailPrice)), 1)
                          ])
                        ], 8, ["onClick"]);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ], 8, ["onClick"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(LoginWindow, {
        ref_key: "loginWindowRef",
        ref: loginWindowRef
      }, null, _parent));
      _push(ssrRenderComponent(_component_BlogPopup, {
        modelValue: mainShow.value,
        "onUpdate:modelValue": ($event) => mainShow.value = $event,
        nid: nid.value,
        nowTime: /* @__PURE__ */ new Date(),
        onNoAuth: showLoginWindow,
        onOnThumbs: onThumbs
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e692c3a"]]);
export {
  blog as default
};
//# sourceMappingURL=blog-CCSHw_r5.js.map
