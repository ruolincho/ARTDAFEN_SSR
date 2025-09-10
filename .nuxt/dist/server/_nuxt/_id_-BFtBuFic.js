import { E as ElSkeleton, a as ElSkeletonItem } from "./skeleton-item-BRULBEUt.js";
import { a2 as useNuxtApp, a3 as useUserStore, aw as useCartStore, u as useRoute, a4 as useRouter, a9 as useCurrencyStore, ap as useRuntimeConfig, Z as TRADE_MODULE, ac as __nuxt_component_1, ab as imagePrefix, a as ElButton, at as debounce, b as ElMessage, ax as PRODUCT_URL, _ as _export_sfc } from "../server.mjs";
import { E as ElCollapse, s as shoppingFaq, a as ElCollapseItem } from "./faq-DxITp9IQ.js";
import { defineComponent, ref, withAsyncContext, computed, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, createTextVNode, withDirectives, vShow, isRef, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation, Thumbs } from "swiper";
/* empty css                        */
/* empty css                        */
import { p as productThumbsApi } from "./likes-CD9WoB9V.js";
import { g as gen_path_obj } from "./product-DJnmy_Y8.js";
import { L as LoginWindow } from "./LoginWindow-8pCArWXq.js";
import { u as useAsyncData } from "./asyncData-CCFbhCAK.js";
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
import "F:/artdafen-ui-ssr/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "SpotDetail"
  },
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $bus } = useNuxtApp();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const route = useRoute();
    const router = useRouter();
    const currencyStore = useCurrencyStore();
    const modules = [Autoplay, Pagination, Navigation, Thumbs];
    const activeName = ref("");
    const isOpenDesc = ref(false);
    const { data: goodsDetail, pending: isSkeleton } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("goods-detail", async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/product/detail", { params: { productId: route.params.id } });
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const specsCombination = ref([]);
    const specsList = ref({});
    const subIndex = ref([]);
    const shopItemInfo = ref({});
    const mySpecsList = ref([]);
    const selectedCombination = ref({});
    const selectArr = ref([]);
    computed(() => Object.values(selectedCombination.value).join(" "));
    const checkInpath = (clickIndex) => {
      const MY_SPECS_LIST = mySpecsList.value;
      for (let i = 0, len = MY_SPECS_LIST.length; i < len; i++) {
        let len2 = MY_SPECS_LIST[i].list.length;
        for (let j = 0; j < len2; j++) {
          let choosed_copy = [...selectArr.value];
          choosed_copy[i] = MY_SPECS_LIST[i].list[j].val;
          let choosed_copy2 = choosed_copy.filter((item) => item !== "" && typeof item !== "undefined");
          if (Object.prototype.hasOwnProperty.call(shopItemInfo.value, getArrayToSting(choosed_copy2))) {
            MY_SPECS_LIST[i].list[j].isDisabled = true;
          } else {
            MY_SPECS_LIST[i].list[j].isDisabled = false;
          }
        }
      }
    };
    const getArrayToSting = (arr) => {
      let str = "";
      arr.map((item, index) => {
        item = item.replace(/\./g, "。");
        if (index == 0) {
          str += item;
        } else {
          str += "," + item;
        }
      });
      return str;
    };
    const handleSelectSpecs = (value, index1, index2, specsKey) => {
      if (selectArr.value[index1] != value.val) {
        selectArr.value[index1] = value.val;
        subIndex.value[index1] = index2;
        selectedCombination.value[specsKey] = value.val;
      } else {
        selectArr.value[index1] = "";
        subIndex.value[index1] = -1;
        selectedCombination.value[specsKey] = "";
      }
      checkInpath();
    };
    const chooseComplete = computed(() => {
      const attrNum = Object.values(specsList.value).length;
      let selectedNum = 0;
      selectArr.value.forEach((val) => {
        val && selectedNum++;
      });
      return attrNum === selectedNum;
    });
    const chooseCompleteSku = computed(() => {
      if (chooseComplete.value) {
        const key = JSON.stringify(selectedCombination.value);
        let result = null;
        specsCombination.value.forEach((item) => {
          if (JSON.stringify(item.specs) === key) {
            result = item;
          }
        });
        return result;
      }
      return null;
    });
    const currentPrice = computed(() => {
      if (chooseComplete.value) {
        if (chooseCompleteSku.value) {
          return chooseCompleteSku.value.retailPrice;
        }
      }
      return goodsDetail.value.retailPrice;
    });
    const stockNum = computed(() => {
      if (chooseComplete.value) {
        if (chooseCompleteSku.value) {
          return parseInt(chooseCompleteSku.value.retailStock);
        }
      }
      return 0;
    });
    const isShelves = computed(() => {
      if (chooseComplete.value) {
        if (chooseCompleteSku.value) {
          return chooseCompleteSku.value.status == "1";
        }
      }
      return false;
    });
    const addToCart = () => {
      const currentSku = JSON.parse(JSON.stringify(chooseCompleteSku.value));
      const currentSpecs = JSON.parse(JSON.stringify(selectedCombination.value));
      const cartRow = {
        productId: goodsDetail.value.id,
        // 商品ID
        techniqueId: goodsDetail.value.techniqueId,
        // 工艺编号
        title: goodsDetail.value.title,
        // 商品标题
        deliveryType: goodsDetail.value.deliveryType || "0",
        // 配送方式
        retailPrice: currentSku.retailPrice,
        // 商品售价
        redeemPoints: currentSku.redeemPoints,
        // 商品积分
        img: currentSku.img,
        // 商品图片
        shopId: goodsDetail.value.merchant?.id,
        // 商家编号
        specsId: currentSku.id,
        // 商品规格编号
        specs: currentSpecs,
        // 商品规格值
        quantity: 1,
        // 购买数量
        dimensionId: null,
        parts: null
      };
      cartStore.addition(cartRow);
      ElMessage.success("Add to cart success!");
      $bus.emit("openCartWindow");
    };
    const thumbsSwiper = ref();
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    const relatedList = ref([]);
    ref([]);
    const isThumbs = ref(false);
    const productThumbs = debounce(async () => {
      if (!userStore.isLogin) {
        showLoginWindow();
        return;
      }
      await productThumbsApi({ mediaId: route.params.id, operate: ~~!isThumbs.value });
      isThumbs.value = !isThumbs.value;
    }, 300);
    const handleClickArtist = () => {
      router.push({
        path: PRODUCT_URL,
        query: gen_path_obj(goodsDetail.value.creator, "ARTIST", ["name"])
      });
    };
    const loginWindowRef = ref();
    const showLoginWindow = () => {
      loginWindowRef.value?.open();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_ClientOnly = __nuxt_component_1;
      const _component_el_button = ElButton;
      const _component_el_collapse = ElCollapse;
      const _component_el_collapse_item = ElCollapseItem;
      _push(`<!--[--><section data-v-0fc991c3><div class="container-middle" data-v-0fc991c3><div class="spu-wrapper row pt-md-50 pt-20" data-v-0fc991c3><div class="col-md-6" data-v-0fc991c3>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: ""
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "34vw" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="acea-row my-10" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "4vw", "height": "4vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "4vw", "height": "4vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "4vw", "height": "4vw" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "20%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              style: { "width": "30%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              style: { "width": "20%" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_el_skeleton_item, {
                variant: "image",
                style: { "width": "100%", "height": "34vw" }
              }),
              createVNode("div", { class: "acea-row my-10" }, [
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "4vw", "height": "4vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "4vw", "height": "4vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "4vw", "height": "4vw" }
                })
              ]),
              createVNode("div", null, [
                createVNode(_component_el_skeleton_item, {
                  variant: "h1",
                  style: { "width": "20%" }
                })
              ]),
              createVNode("div", null, [
                createVNode(_component_el_skeleton_item, {
                  variant: "p",
                  style: { "width": "30%" }
                })
              ]),
              createVNode("div", null, [
                createVNode(_component_el_skeleton_item, {
                  variant: "p",
                  style: { "width": "20%" }
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="spu-preview" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`<div class="p-20 f-bold-500 text-16 border-sm" data-v-0fc991c3${_scopeId}><p data-v-0fc991c3${_scopeId}>Product Parameter</p><!--[-->`);
            ssrRenderList(unref(selectedCombination), (val, key) => {
              _push2(`<p class="mt-10" data-v-0fc991c3${_scopeId}>${ssrInterpolate(key)}: ${ssrInterpolate(val)}</p>`);
            });
            _push2(`<!--]-->`);
            if (Object.keys(unref(goodsDetail).attributes).length) {
              _push2(`<!--[--><p class="mt-10" data-v-0fc991c3${_scopeId}>Product Attribute</p><!--[-->`);
              ssrRenderList(unref(goodsDetail).attributes, (val, key) => {
                _push2(`<p class="mt-10" data-v-0fc991c3${_scopeId}>${ssrInterpolate(key)}: `);
                if (Array.isArray(val)) {
                  _push2(`<!--[-->${ssrInterpolate(val.join(" / "))}<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p>`);
              });
              _push2(`<!--]--><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "spu-preview" }, [
                createVNode(_component_ClientOnly, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "thumb-wrapper" }, [
                      createVNode(unref(Swiper), {
                        class: "main-swiper",
                        modules,
                        "space-between": 10,
                        navigation: true,
                        thumbs: { swiper: unref(thumbsSwiper) }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(goodsDetail).banners, (banner, index) => {
                            return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "w-full h-full acea-row row-center-wrapper" }, [
                                  createVNode("img", {
                                    src: unref(imagePrefix)(banner),
                                    alt: "",
                                    style: { "user-select": "none", "max-height": "100%", "max-width": "100%" }
                                  }, null, 8, ["src"])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["thumbs"]),
                      createVNode(unref(Swiper), {
                        class: "thumb-swiper my-10",
                        modules,
                        "space-between": 10,
                        "slides-per-view": 5,
                        "watch-slides-progress": true,
                        "prevent-clicks": false,
                        "prevent-clicks-propagation": false,
                        onSwiper: setThumbsSwiper,
                        breakpoints: {
                          "414": { slidesPerView: 7 }
                        }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(goodsDetail).banners, (banner, index) => {
                            return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "w-full h-full acea-row row-center-wrapper" }, [
                                  createVNode("img", {
                                    src: unref(imagePrefix)(banner),
                                    alt: "",
                                    style: { "user-select": "none", "max-height": "100%", "max-width": "100%" }
                                  }, null, 8, ["src"])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "p-20 f-bold-500 text-16 border-sm" }, [
                  createVNode("p", null, "Product Parameter"),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedCombination), (val, key) => {
                    return openBlock(), createBlock("p", { class: "mt-10" }, toDisplayString(key) + ": " + toDisplayString(val), 1);
                  }), 256)),
                  Object.keys(unref(goodsDetail).attributes).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("p", { class: "mt-10" }, "Product Attribute"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(goodsDetail).attributes, (val, key) => {
                      return openBlock(), createBlock("p", {
                        key: _ctx.index,
                        class: "mt-10"
                      }, [
                        createTextVNode(toDisplayString(key) + ": ", 1),
                        Array.isArray(val) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(toDisplayString(val.join(" / ")), 1)
                        ], 64)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ], 64)) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-md-6" data-v-0fc991c3>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: ""
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "50%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="my-10" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "20%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="acea-row my-10" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="my-10" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "20%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="acea-row my-10" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              class: "mr-10",
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "8vw", "height": "8vw" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="acea-row row-right my-10" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              style: { "width": "30%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="my-10" data-v-0fc991c3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              style: { "width": "100%", "height": "5vh" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_el_skeleton_item, {
                  variant: "h1",
                  style: { "width": "50%" }
                })
              ]),
              createVNode("div", { class: "my-10" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "h1",
                  style: { "width": "20%" }
                })
              ]),
              createVNode("div", { class: "acea-row my-10" }, [
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                })
              ]),
              createVNode("div", { class: "my-10" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "h1",
                  style: { "width": "20%" }
                })
              ]),
              createVNode("div", { class: "acea-row my-10" }, [
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  class: "mr-10",
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                }),
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "8vw", "height": "8vw" }
                })
              ]),
              createVNode("div", { class: "acea-row row-right my-10" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "p",
                  style: { "width": "30%" }
                })
              ]),
              createVNode("div", { class: "my-10" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "p",
                  style: { "width": "100%", "height": "5vh" }
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="spu-spec" data-v-0fc991c3${_scopeId}><div class="acea-row row-center-wrapper border-t-md border-gray-700" data-v-0fc991c3${_scopeId}><span class="flex-1 border-r-md border-gray-700 py-20 text-20 f-bold-500" data-v-0fc991c3${_scopeId}>${ssrInterpolate(unref(goodsDetail).title)}</span><span class="iconfont icon-follow text-24 px-20 cursor-pointer" style="${ssrRenderStyle(!unref(isThumbs) ? null : { display: "none" })}" data-v-0fc991c3${_scopeId}></span><span class="iconfont icon-follow-fill text-24 px-20 cursor-pointer text-error" style="${ssrRenderStyle(unref(isThumbs) ? null : { display: "none" })}" data-v-0fc991c3${_scopeId}></span></div><div class="text-14 cursor-pointer text-underline" data-v-0fc991c3${_scopeId}> by:${ssrInterpolate(unref(goodsDetail).creator?.name)}</div><!--[-->`);
            ssrRenderList(unref(mySpecsList), (item, index1) => {
              _push2(`<div class="sku-wrapper" data-v-0fc991c3${_scopeId}><div class="f-bold text-20 py-24" data-v-0fc991c3${_scopeId}>${ssrInterpolate(item.name)}</div><div class="row sku-list" data-v-0fc991c3${_scopeId}><!--[-->`);
              ssrRenderList(item.list, (item_value, index2) => {
                _push2(`<div class="col-md-3 col-4" data-v-0fc991c3${_scopeId}><div class="${ssrRenderClass([{
                  "sku-disabled": !item_value.isDisabled,
                  "sku-selected": unref(selectArr)[index1] == item_value.val,
                  "border-gray-700": unref(selectArr)[index1] == item_value.val
                }, "sku-item border-sm cursor-pointer"])}" data-v-0fc991c3${_scopeId}>`);
                if (item_value.img) {
                  _push2(`<div class="sku-img aspect-ratio" data-v-0fc991c3${_scopeId}><img class="w-full h-full fit-cover"${ssrRenderAttr("src", unref(imagePrefix)(item_value.img))} alt="" data-v-0fc991c3${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<p class="line1 my-10 mx-20 text-center text-18" data-v-0fc991c3${_scopeId}>${ssrInterpolate(item_value.val)}</p></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--><div class="p-20 mt-20 acea-row row-right text-20 bg-gray-100" data-v-0fc991c3${_scopeId}><p class="f-bold" data-v-0fc991c3${_scopeId}>Total：<span class="text-26 text-error" data-v-0fc991c3${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(currentPrice) || 0))}</span></p></div>`);
            _push2(ssrRenderComponent(_component_el_button, {
              class: "w-full",
              size: "large",
              type: "danger",
              onClick: addToCart,
              disabled: !unref(chooseComplete) || unref(stockNum) == 0 || unref(isShelves) == true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add To Cart `);
                } else {
                  return [
                    createTextVNode("Add To Cart ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "spu-spec" }, [
                createVNode("div", { class: "acea-row row-center-wrapper border-t-md border-gray-700" }, [
                  createVNode("span", { class: "flex-1 border-r-md border-gray-700 py-20 text-20 f-bold-500" }, toDisplayString(unref(goodsDetail).title), 1),
                  withDirectives(createVNode("span", {
                    class: "iconfont icon-follow text-24 px-20 cursor-pointer",
                    onClick: unref(productThumbs)
                  }, null, 8, ["onClick"]), [
                    [vShow, !unref(isThumbs)]
                  ]),
                  withDirectives(createVNode("span", {
                    class: "iconfont icon-follow-fill text-24 px-20 cursor-pointer text-error",
                    onClick: unref(productThumbs)
                  }, null, 8, ["onClick"]), [
                    [vShow, unref(isThumbs)]
                  ])
                ]),
                createVNode("div", {
                  class: "text-14 cursor-pointer text-underline",
                  onClick: handleClickArtist
                }, " by:" + toDisplayString(unref(goodsDetail).creator?.name), 1),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(mySpecsList), (item, index1) => {
                  return openBlock(), createBlock("div", {
                    class: "sku-wrapper",
                    key: index1
                  }, [
                    createVNode("div", { class: "f-bold text-20 py-24" }, toDisplayString(item.name), 1),
                    createVNode("div", { class: "row sku-list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(item.list, (item_value, index2) => {
                        return openBlock(), createBlock("div", {
                          class: "col-md-3 col-4",
                          key: index2
                        }, [
                          createVNode("div", {
                            class: ["sku-item border-sm cursor-pointer", {
                              "sku-disabled": !item_value.isDisabled,
                              "sku-selected": unref(selectArr)[index1] == item_value.val,
                              "border-gray-700": unref(selectArr)[index1] == item_value.val
                            }],
                            onClick: ($event) => handleSelectSpecs(item_value, index1, index2, item.name)
                          }, [
                            item_value.img ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "sku-img aspect-ratio"
                            }, [
                              createVNode("img", {
                                class: "w-full h-full fit-cover",
                                src: unref(imagePrefix)(item_value.img),
                                alt: ""
                              }, null, 8, ["src"])
                            ])) : createCommentVNode("", true),
                            createVNode("p", { class: "line1 my-10 mx-20 text-center text-18" }, toDisplayString(item_value.val), 1)
                          ], 10, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ]);
                }), 128)),
                createVNode("div", { class: "p-20 mt-20 acea-row row-right text-20 bg-gray-100" }, [
                  createVNode("p", { class: "f-bold" }, [
                    createTextVNode("Total："),
                    createVNode("span", { class: "text-26 text-error" }, toDisplayString(unref(currencyStore).formatToCurrency(unref(currentPrice) || 0)), 1)
                  ])
                ]),
                createVNode(_component_el_button, {
                  class: "w-full",
                  size: "large",
                  type: "danger",
                  onClick: addToCart,
                  disabled: !unref(chooseComplete) || unref(stockNum) == 0 || unref(isShelves) == true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Add To Cart ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
      if (unref(goodsDetail).creator) {
        _push(`<section class="mt-lg-60 mt-sm-20" data-v-0fc991c3><div class="container-middle" data-v-0fc991c3><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-0fc991c3>About the Artist</h1><div class="artist-box acea-row gap-base" data-v-0fc991c3>`);
        if (unref(goodsDetail).creator?.portrait) {
          _push(`<div class="avatar" data-v-0fc991c3><img class="w-full"${ssrRenderAttr("src", unref(imagePrefix)(unref(goodsDetail).creator?.portrait))} alt="avatar" data-v-0fc991c3></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="info flex-1 text-gray-600" data-v-0fc991c3><p class="text-16 f-bold-500" data-v-0fc991c3>${ssrInterpolate(unref(goodsDetail).creator?.timeline || "--")}</p><p class="text-20 f-bold-500 text-gray-700 my-10" data-v-0fc991c3>${ssrInterpolate(unref(goodsDetail).creator?.name)}</p><p class="text-18" data-v-0fc991c3>${ssrInterpolate(unref(goodsDetail).creator?.intro)}</p></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(goodsDetail)?.details?.length) {
        _push(`<section class="${ssrRenderClass([{ open: unref(isOpenDesc) }, "sec-desc mt-lg-60 mt-sm-20"])}" data-v-0fc991c3><div class="container-middle" data-v-0fc991c3><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-0fc991c3>Product Description</h1><div class="img-box" data-v-0fc991c3><!--[-->`);
        ssrRenderList(unref(goodsDetail).details, (item) => {
          _push(`<img class="w-full"${ssrRenderAttr("src", unref(imagePrefix)(item))} alt="" data-v-0fc991c3>`);
        });
        _push(`<!--]--></div><div class="btn-box" data-v-0fc991c3>`);
        _push(ssrRenderComponent(_component_el_button, {
          class: "w-full mt-20",
          plain: "",
          size: "large",
          onClick: ($event) => isOpenDesc.value = !unref(isOpenDesc)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(isOpenDesc) ? "Hide Product Details" : "View More Product Details")} <span class="${ssrRenderClass([unref(isOpenDesc) ? "icon-up" : "icon-down", "iconfont ml-20"])}" data-v-0fc991c3${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(isOpenDesc) ? "Hide Product Details" : "View More Product Details") + " ", 1),
                createVNode("span", {
                  class: ["iconfont ml-20", unref(isOpenDesc) ? "icon-up" : "icon-down"]
                }, null, 2)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(relatedList).length) {
        _push(`<section class="mt-lg-60 mt-sm-20" data-v-0fc991c3><div class="container-middle" data-v-0fc991c3><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-0fc991c3>Product Related</h1>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(goodsDetail)?.brand?.id) {
        _push(`<section class="mt-lg-60 mt-sm-20" data-v-0fc991c3><div class="container-middle" data-v-0fc991c3><div class="brand-topic mb-20" data-v-0fc991c3><div class="brand-topic-caption text-white text-26" data-v-0fc991c3><p data-v-0fc991c3>${ssrInterpolate(unref(goodsDetail)?.brand?.name)}</p><p class="text-60 f-bold my-xs-20 my-15" data-v-0fc991c3>${ssrInterpolate(unref(goodsDetail)?.brand?.title)}</p><p data-v-0fc991c3>${ssrInterpolate(unref(goodsDetail)?.brand?.intro)}</p></div><button class="caption-btn text-28 p-xs-20 p-15" data-v-0fc991c3> Brand Home <span class="iconfont icon-right-arrow text-28 ml-xs-60 ml-30" data-v-0fc991c3></span></button><img class="w-full pc"${ssrRenderAttr("src", unref(imagePrefix)(unref(goodsDetail)?.brand?.background))} alt="" data-v-0fc991c3><img class="w-full app"${ssrRenderAttr("src", unref(imagePrefix)(unref(goodsDetail)?.brand?.img))} alt="" data-v-0fc991c3></div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="mt-lg-60 mt-sm-20" data-v-0fc991c3><div class="container-middle" data-v-0fc991c3><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-0fc991c3>Frequently Asked Questions</h1>`);
      _push(ssrRenderComponent(_component_el_collapse, {
        modelValue: unref(activeName),
        "onUpdate:modelValue": ($event) => isRef(activeName) ? activeName.value = $event : null,
        accordion: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(shoppingFaq), (subItem) => {
              _push2(ssrRenderComponent(_component_el_collapse_item, {
                title: subItem.title,
                name: subItem.name,
                key: subItem.name
              }, {
                icon: withCtx(({ isActive }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p style="${ssrRenderStyle({ "margin-left": "auto" })}" data-v-0fc991c3${_scopeId2}><span class="${ssrRenderClass([isActive ? "icon-reduce" : "icon-add", "iconfont text-20 ml-10"])}" data-v-0fc991c3${_scopeId2}></span></p>`);
                  } else {
                    return [
                      createVNode("p", { style: { "margin-left": "auto" } }, [
                        createVNode("span", {
                          class: ["iconfont text-20 ml-10", isActive ? "icon-reduce" : "icon-add"]
                        }, null, 2)
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="px-20 py-24" data-v-0fc991c3${_scopeId2}>${subItem.content ?? ""}</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "px-20 py-24",
                        innerHTML: subItem.content
                      }, null, 8, ["innerHTML"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(shoppingFaq), (subItem) => {
                return openBlock(), createBlock(_component_el_collapse_item, {
                  title: subItem.title,
                  name: subItem.name,
                  key: subItem.name
                }, {
                  icon: withCtx(({ isActive }) => [
                    createVNode("p", { style: { "margin-left": "auto" } }, [
                      createVNode("span", {
                        class: ["iconfont text-20 ml-10", isActive ? "icon-reduce" : "icon-add"]
                      }, null, 2)
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode("div", {
                      class: "px-20 py-24",
                      innerHTML: subItem.content
                    }, null, 8, ["innerHTML"])
                  ]),
                  _: 2
                }, 1032, ["title", "name"]);
              }), 128))
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/spot-detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0fc991c3"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-BFtBuFic.js.map
