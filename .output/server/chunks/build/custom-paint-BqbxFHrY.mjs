import { _ as _export_sfc, a3 as useUserStore, a8 as useAppStore, u as useRoute, a4 as useRouter, a9 as useCurrencyStore, b3 as cm2inch, b4 as flattenTree, ab as imagePrefix, a as ElButton, ac as __nuxt_component_1$2, o as CONTACT_EMAIL, E as ElInput, w as withInstall, b5 as getImageSize, b6 as calculateShape, b as ElMessage, g as _export_sfc$1, i as isNumber, c as buildProps, aY as scale_to_original_default, aZ as full_screen_default, B as useLocale, e as useNamespace, S as useZIndex, T as ElFocusTrap, l as ElIcon, a1 as close_default, a_ as arrow_left_default, h as arrow_right_default, a$ as zoom_out_default, aS as zoom_in_default, b0 as refresh_left_default, b1 as refresh_right_default, d as definePropType, m as mutable, b2 as keysOf } from './server.mjs';
import { E as ElUpload } from './progress-BLBrRfja.mjs';
import { E as ElSelect, a as ElOption } from './select-BBb6v1ax.mjs';
import { E as ElDialog } from './dialog-DQju9U68.mjs';
import { defineComponent, ref, computed, watch, resolveDirective, unref, withCtx, createTextVNode, createVNode, toDisplayString, isRef, createBlock, openBlock, Fragment, renderList, mergeProps, createCommentVNode, markRaw, effectScope, shallowRef, nextTick, Transition, createElementVNode, normalizeStyle, normalizeClass, createElementBlock, renderSlot, withModifiers, resolveDynamicComponent, useSSRContext } from 'vue';
import { useEventListener } from '@vueuse/core';
import { throttle } from 'lodash-unified';
import { E as ElTeleport } from './index-QxVyGfSM.mjs';
import { E as ElPopover } from './popover-Z4OiMpEN.mjs';
import { g as getThemeApi, a as getCombinationApi } from './paint-B_vqKQsu.mjs';
import { ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _imports_4 } from './logo-portrait-Bv-x2szr.mjs';
import { u as useCustomStore } from './custom-CnGfPiQ8.mjs';
import { L as LoginWindow } from './LoginWindow-8pCArWXq.mjs';
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
import '@vue/shared';
import '@ctrl/tinycolor';
import 'axios';
import './popper-BevOnpDk.mjs';
import '@popperjs/core';
import './scrollbar-BAU7-sWB.mjs';
import './index-TgbWtzhx.mjs';
import './form-item-BeekeJ4U.mjs';
import 'async-validator';
import './nuxt-link-DR_c-RpP.mjs';
import './divider-DgH3PmJB.mjs';
import './logo-DzgOjlOk.mjs';
import './google-CA8l_UnH.mjs';
import './useAuth-Dm_6RpzH.mjs';
import './index-BuIDaW2O.mjs';

const imageViewerProps = buildProps({
  urlList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  hideOnClickModal: Boolean,
  teleported: Boolean,
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  zoomRate: {
    type: Number,
    default: 1.2
  },
  minScale: {
    type: Number,
    default: 0.2
  },
  maxScale: {
    type: Number,
    default: 7
  },
  showProgress: Boolean,
  crossorigin: {
    type: definePropType(String)
  }
});
const imageViewerEmits = {
  close: () => true,
  switch: (index) => isNumber(index),
  rotate: (deg) => isNumber(deg)
};
const __default__ = defineComponent({
  name: "ElImageViewer"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: imageViewerProps,
  emits: imageViewerEmits,
  setup(__props, { expose, emit }) {
    var _a;
    const props = __props;
    const modes = {
      CONTAIN: {
        name: "contain",
        icon: markRaw(full_screen_default)
      },
      ORIGINAL: {
        name: "original",
        icon: markRaw(scale_to_original_default)
      }
    };
    let prevOverflow = "";
    const { t } = useLocale();
    const ns = useNamespace("image-viewer");
    const { nextZIndex } = useZIndex();
    const wrapper = ref();
    const imgRefs = ref([]);
    const scopeEventListener = effectScope();
    const loading = ref(true);
    const activeIndex = ref(props.initialIndex);
    const mode = shallowRef(modes.CONTAIN);
    const transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    });
    const zIndex = ref((_a = props.zIndex) != null ? _a : nextZIndex());
    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });
    const isFirst = computed(() => activeIndex.value === 0);
    const isLast = computed(() => activeIndex.value === props.urlList.length - 1);
    const currentImg = computed(() => props.urlList[activeIndex.value]);
    const arrowPrevKls = computed(() => [
      ns.e("btn"),
      ns.e("prev"),
      ns.is("disabled", !props.infinite && isFirst.value)
    ]);
    const arrowNextKls = computed(() => [
      ns.e("btn"),
      ns.e("next"),
      ns.is("disabled", !props.infinite && isLast.value)
    ]);
    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;
      const radian = deg * Math.PI / 180;
      const cosRadian = Math.cos(radian);
      const sinRadian = Math.sin(radian);
      translateX = translateX * cosRadian + translateY * sinRadian;
      translateY = translateY * cosRadian - offsetX / scale * sinRadian;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? "transform .3s" : ""
      };
      if (mode.value.name === modes.CONTAIN.name) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    });
    const progress = computed(() => `${activeIndex.value + 1} / ${props.urlList.length}`);
    function hide() {
      unregisterEventListener();
      (void 0).body.style.overflow = prevOverflow;
      emit("close");
    }
    function unregisterEventListener() {
      scopeEventListener.stop();
    }
    function handleImgLoad() {
      loading.value = false;
    }
    function handleImgError(e) {
      loading.value = false;
      e.target.alt = t("el.image.error");
    }
    function handleMouseDown(e) {
      if (loading.value || e.button !== 0 || !wrapper.value)
        return;
      transform.value.enableTransition = false;
      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;
      const dragHandler = throttle((ev) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY
        };
      });
      const removeMousemove = useEventListener(void 0, "mousemove", dragHandler);
      useEventListener(void 0, "mouseup", () => {
        removeMousemove();
      });
      e.preventDefault();
    }
    function reset() {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }
    function toggleMode() {
      if (loading.value)
        return;
      const modeNames = keysOf(modes);
      const modeValues = Object.values(modes);
      const currentMode = mode.value.name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.value = modes[modeNames[nextIndex]];
      reset();
    }
    function setActiveItem(index) {
      const len = props.urlList.length;
      activeIndex.value = (index + len) % len;
    }
    function prev() {
      if (isFirst.value && !props.infinite)
        return;
      setActiveItem(activeIndex.value - 1);
    }
    function next() {
      if (isLast.value && !props.infinite)
        return;
      setActiveItem(activeIndex.value + 1);
    }
    function handleActions(action, options = {}) {
      if (loading.value)
        return;
      const { minScale, maxScale } = props;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: props.zoomRate,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      switch (action) {
        case "zoomOut":
          if (transform.value.scale > minScale) {
            transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
          }
          break;
        case "zoomIn":
          if (transform.value.scale < maxScale) {
            transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
          }
          break;
        case "clockwise":
          transform.value.deg += rotateDeg;
          emit("rotate", transform.value.deg);
          break;
        case "anticlockwise":
          transform.value.deg -= rotateDeg;
          emit("rotate", transform.value.deg);
          break;
      }
      transform.value.enableTransition = enableTransition;
    }
    function onFocusoutPrevented(event) {
      var _a2;
      if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
        event.preventDefault();
      }
    }
    function onCloseRequested() {
      if (props.closeOnPressEscape) {
        hide();
      }
    }
    watch(currentImg, () => {
      nextTick(() => {
        const $img = imgRefs.value[0];
        if (!($img == null ? void 0 : $img.complete)) {
          loading.value = true;
        }
      });
    });
    watch(activeIndex, (val) => {
      reset();
      emit("switch", val);
    });
    expose({
      setActiveItem
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        to: "body",
        disabled: !_ctx.teleported
      }, {
        default: withCtx(() => [
          createVNode(Transition, {
            name: "viewer-fade",
            appear: ""
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                ref_key: "wrapper",
                ref: wrapper,
                tabindex: -1,
                class: normalizeClass(unref(ns).e("wrapper")),
                style: normalizeStyle({ zIndex: zIndex.value })
              }, [
                createVNode(unref(ElFocusTrap), {
                  loop: "",
                  trapped: "",
                  "focus-trap-el": wrapper.value,
                  "focus-start-el": "container",
                  onFocusoutPrevented,
                  onReleaseRequested: onCloseRequested
                }, {
                  default: withCtx(() => [
                    createElementVNode("div", {
                      class: normalizeClass(unref(ns).e("mask")),
                      onClick: withModifiers(($event) => _ctx.hideOnClickModal && hide(), ["self"])
                    }, null, 10, ["onClick"]),
                    createCommentVNode(" CLOSE "),
                    createElementVNode("span", {
                      class: normalizeClass([unref(ns).e("btn"), unref(ns).e("close")]),
                      onClick: hide
                    }, [
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(close_default))
                        ]),
                        _: 1
                      })
                    ], 2),
                    createCommentVNode(" ARROW "),
                    !unref(isSingle) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createElementVNode("span", {
                        class: normalizeClass(unref(arrowPrevKls)),
                        onClick: prev
                      }, [
                        createVNode(unref(ElIcon), null, {
                          default: withCtx(() => [
                            createVNode(unref(arrow_left_default))
                          ]),
                          _: 1
                        })
                      ], 2),
                      createElementVNode("span", {
                        class: normalizeClass(unref(arrowNextKls)),
                        onClick: next
                      }, [
                        createVNode(unref(ElIcon), null, {
                          default: withCtx(() => [
                            createVNode(unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 2)
                    ], 64)) : createCommentVNode("v-if", true),
                    _ctx.$slots.progress || _ctx.showProgress ? (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass([unref(ns).e("btn"), unref(ns).e("progress")])
                    }, [
                      renderSlot(_ctx.$slots, "progress", {
                        activeIndex: activeIndex.value,
                        total: _ctx.urlList.length
                      }, () => [
                        createTextVNode(toDisplayString(unref(progress)), 1)
                      ])
                    ], 2)) : createCommentVNode("v-if", true),
                    createCommentVNode(" ACTIONS "),
                    createElementVNode("div", {
                      class: normalizeClass([unref(ns).e("btn"), unref(ns).e("actions")])
                    }, [
                      createElementVNode("div", {
                        class: normalizeClass(unref(ns).e("actions__inner"))
                      }, [
                        renderSlot(_ctx.$slots, "toolbar", {
                          actions: handleActions,
                          prev,
                          next,
                          reset: toggleMode,
                          activeIndex: activeIndex.value,
                          setActiveItem
                        }, () => [
                          createVNode(unref(ElIcon), {
                            onClick: ($event) => handleActions("zoomOut")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(zoom_out_default))
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(ElIcon), {
                            onClick: ($event) => handleActions("zoomIn")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(zoom_in_default))
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createElementVNode("i", {
                            class: normalizeClass(unref(ns).e("actions__divider"))
                          }, null, 2),
                          createVNode(unref(ElIcon), { onClick: toggleMode }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(unref(mode).icon)))
                            ]),
                            _: 1
                          }),
                          createElementVNode("i", {
                            class: normalizeClass(unref(ns).e("actions__divider"))
                          }, null, 2),
                          createVNode(unref(ElIcon), {
                            onClick: ($event) => handleActions("anticlockwise")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(refresh_left_default))
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(ElIcon), {
                            onClick: ($event) => handleActions("clockwise")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(refresh_right_default))
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ], 2)
                    ], 2),
                    createCommentVNode(" CANVAS "),
                    createElementVNode("div", {
                      class: normalizeClass(unref(ns).e("canvas"))
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.urlList, (url, i) => {
                        return openBlock(), createElementBlock(Fragment, { key: i }, [
                          i === activeIndex.value ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            ref_for: true,
                            ref: (el) => imgRefs.value[i] = el,
                            src: url,
                            style: normalizeStyle(unref(imgStyle)),
                            class: normalizeClass(unref(ns).e("img")),
                            crossorigin: _ctx.crossorigin,
                            onLoad: handleImgLoad,
                            onError: handleImgError,
                            onMousedown: handleMouseDown
                          }, null, 46, ["src", "crossorigin"])) : createCommentVNode("v-if", true)
                        ], 64);
                      }), 128))
                    ], 2),
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }, 8, ["focus-trap-el"])
              ], 6)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["disabled"]);
    };
  }
});
var ImageViewer = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "image-viewer.vue"]]);
const ElImageViewer = withInstall(ImageViewer);
var ArtCode = /* @__PURE__ */ ((ArtCode2) => {
  ArtCode2["Painting"] = "HPOP";
  ArtCode2["Prints"] = "40USD-M2";
  ArtCode2["Certificates"] = "CTS";
  return ArtCode2;
})(ArtCode || {});
const ShapeRatios = {
  LANDSCAPE: {
    "3/2": 3 / 2,
    "4/3": 4 / 3,
    "5/3": 5 / 3
  },
  PORTRAIT: {
    "2/3": 2 / 3,
    "3/4": 3 / 4,
    "3/5": 3 / 5
  },
  PANORAMIC: {
    "2/1": 2,
    "3/1": 3,
    "4/1": 4
  },
  SQUARE: {
    "1/1": 1
  },
  SLIM: {
    "1/2": 1 / 2,
    "1/3": 1 / 3,
    "1/4": 1 / 4
  }
};
function findClosestMatch(width, height) {
  if (height === 0) throw new Error("Image height cannot be zero.");
  const ratio = width / height;
  const allRatios = Object.values(ShapeRatios).flatMap((ratioMap) => Object.entries(ratioMap));
  const closest = allRatios.reduce((prev, curr) => {
    const prevDiff = Math.abs(ratio - prev[1]);
    const currDiff = Math.abs(ratio - curr[1]);
    return currDiff < prevDiff ? curr : prev;
  });
  return closest[0];
}
const FULL_RANGE = /^[\[\(]\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*[\)\]]$/;
const LEFT_OPEN = /^[\[\(]\s*(-?\d+(?:\.\d+)?)\s*,\s*[\)\]]$/;
const RIGHT_OPEN = /^[\[\(]\s*,\s*(-?\d+(?:\.\d+)?)\s*[\)\]]$/;
function isValidNumRange(str) {
  const s = str.trim();
  return FULL_RANGE.test(s) || LEFT_OPEN.test(s) || RIGHT_OPEN.test(s);
}
function rangeVerify(value, rangeStr) {
  if (!isValidNumRange(rangeStr)) {
    return false;
  }
  const str = rangeStr.trim();
  let match;
  match = str.match(FULL_RANGE);
  if (match) {
    const leftInclusive = str[0] === "[";
    const rightInclusive = str[str.length - 1] === "]";
    const lower = parseFloat(match[1]);
    const upper = parseFloat(match[2]);
    if (lower > upper) return false;
    const leftOk = leftInclusive ? value >= lower : value > lower;
    const rightOk = rightInclusive ? value <= upper : value < upper;
    return leftOk && rightOk;
  }
  match = str.match(RIGHT_OPEN);
  if (match) {
    const upperInclusive = str[str.length - 1] === "]";
    const upper = parseFloat(match[1]);
    return upperInclusive ? value <= upper : value < upper;
  }
  match = str.match(LEFT_OPEN);
  if (match) {
    const leftInclusive = str[0] === "[";
    const lower = parseFloat(match[1]);
    return leftInclusive ? value >= lower : value > lower;
  }
  return false;
}
const fileSize = 15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "CustomPaint"
  },
  __name: "custom-paint",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    useAppStore();
    const customStore = useCustomStore();
    const route = useRoute();
    const router = useRouter();
    const currencyStore = useCurrencyStore();
    const moreInfoVisible = ref([false, false, false, false]);
    const currentView = ref("custom");
    const contentNumber = ref(1);
    const paintingDefault = [
      {
        photo: "/static/custom/example/hand/example_photo1.png",
        paint: "/static/custom/example/hand/example_paint1.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo2.png",
        paint: "/static/custom/example/hand/example_paint2.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo3.png",
        paint: "/static/custom/example/hand/example_paint3.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo4.png",
        paint: "/static/custom/example/hand/example_paint4.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo5.png",
        paint: "/static/custom/example/hand/example_paint5.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo6.png",
        paint: "/static/custom/example/hand/example_paint6.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo7.png",
        paint: "/static/custom/example/hand/example_paint7.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo8.png",
        paint: "/static/custom/example/hand/example_paint8.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo9.png",
        paint: "/static/custom/example/hand/example_paint9.png"
      },
      {
        photo: "/static/custom/example/hand/example_photo10.png",
        paint: "/static/custom/example/hand/example_paint10.png"
      }
    ];
    ref({
      [ArtCode.Painting]: paintingDefault,
      [ArtCode.Prints]: [
        {
          photo: "/static/custom/example/print/example_photo1.webp",
          paint: "/static/custom/example/print/example_paint1.webp"
        },
        {
          photo: "/static/custom/example/print/example_photo2.webp",
          paint: "/static/custom/example/print/example_paint2.webp"
        },
        {
          photo: "/static/custom/example/print/example_photo3.webp",
          paint: "/static/custom/example/print/example_paint3.webp"
        },
        {
          photo: "/static/custom/example/print/example_photo4.webp",
          paint: "/static/custom/example/print/example_paint4.webp"
        },
        {
          photo: "/static/custom/example/print/example_photo5.webp",
          paint: "/static/custom/example/print/example_paint5.webp"
        }
      ],
      [ArtCode.Certificates]: [
        {
          photo: "/static/custom/example/certificate/example_photo1.webp",
          paint: "/static/custom/example/certificate/example_paint1.webp"
        },
        {
          photo: "/static/custom/example/certificate/example_photo2.webp",
          paint: "/static/custom/example/certificate/example_paint2.webp"
        },
        {
          photo: "/static/custom/example/certificate/example_photo3.webp",
          paint: "/static/custom/example/certificate/example_paint3.webp"
        },
        {
          photo: "/static/custom/example/certificate/example_photo4.webp",
          paint: "/static/custom/example/certificate/example_paint4.webp"
        }
      ]
    });
    ref(false);
    ref();
    ref();
    const generatorImg = ref("");
    ref({ width: 0, height: 0 });
    const imgViewVisible = ref(false);
    const centerDialogVisible = ref(false);
    const remark = ref("");
    ref(false);
    ref(0);
    let loaded = false;
    const getCombination = async (senior = false) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const { data } = await getCombinationApi({
        code: finalCode.value,
        ratio: ratio.value,
        dimensionId: currentSizeId.value || null
      });
      sizeOptions.value = data.size;
      innerFrame.value = data.parts.inner_frame[0];
      frameOptions.value = [
        notFrame,
        innerFrame.value,
        ...(_a = data.parts) == null ? void 0 : _a.frame
      ];
      hasMat.value = !!((_c = (_b = data.parts) == null ? void 0 : _b.mat) == null ? void 0 : _c.length);
      if (hasMat.value) {
        materialOptions.value = [
          ...((_d = data.parts) == null ? void 0 : _d.mat) || [],
          noMat
        ];
      } else {
        materialOptions.value = [];
      }
      function selectSize() {
        const defaultSelect = sizeOptions.value.find((item) => item.selected === "1");
        if (defaultSelect) {
          currentSizeId.value = defaultSelect.id;
        } else {
          currentSizeId.value = sizeOptions.value[0].id;
        }
      }
      if (!loaded) {
        selectSize();
        if (hasMat.value) {
          currentMaterialId.value = materialOptions.value[0].id;
          chooseMatWidth(((_e = materialOptions.value[0].specs[0]) == null ? void 0 : _e.matWidth) || "");
        }
      }
      if (senior) {
        if (currentSizeId.value) {
          const findTheSize = sizeOptions.value.findIndex((item) => item.id === currentSizeId.value);
          if (findTheSize === -1) {
            selectSize();
          }
        }
        if (currentFrameId.value) {
          const findTheFrame = frameOptions.value.findIndex((item) => item.id === currentFrameId.value);
          if (findTheFrame === -1) {
            currentFrameId.value = "";
          }
        }
        if (!hasMat.value || !((_g = (_f = currentFrameOption.value) == null ? void 0 : _f.config) == null ? void 0 : _g.matSupport)) {
          currentMaterialId.value = "";
          chooseMatWidth("");
        } else {
          currentMaterialId.value = materialOptions.value[0].id;
          chooseMatWidth(((_h = materialOptions.value[0].specs[0]) == null ? void 0 : _h.matWidth) || "");
        }
      }
      loaded = true;
    };
    const currentSizeId = ref("");
    const sizeOptions = ref([]);
    const currentSizeOption = computed(() => sizeOptions.value.find((item) => item.id === currentSizeId.value));
    const chooseSize = () => {
      getCombination();
    };
    const notFrame = { id: "", name: "No Frame (Rolled in a Tube)", price: "0.00", img: "/trade/paint/frame/NOT/img.webp" };
    const innerFrame = ref({});
    const currentFrameId = ref("");
    const frameOptions = ref([]);
    const currentFrameOption = computed(() => frameOptions.value.find((item) => item.id === currentFrameId.value));
    const isInnerFrame = computed(() => currentFrameId.value === innerFrame.value.id);
    const frameMoney = computed(() => {
      var _a, _b, _c;
      const price = Number((_a = currentFrameOption.value) == null ? void 0 : _a.price) || 0;
      const surcharge = Number((_b = currentFrameOption.value) == null ? void 0 : _b.surcharge) || 0;
      if (!hasFrame.value) {
        return price + surcharge;
      } else {
        if (currentMaterialId.value === "") {
          return price + surcharge + Number(((_c = innerFrame.value) == null ? void 0 : _c.price) || 0);
        } else {
          return price + surcharge;
        }
      }
    });
    const hasFrame = computed(() => !isInnerFrame.value && currentFrameId.value !== "");
    const noMat = { id: "", name: "No Mat", price: "0.00", specs: [] };
    const hasMat = ref(false);
    const currentMaterialId = ref("");
    const materialOptions = ref([]);
    const currentMaterialOption = computed(() => materialOptions.value.find((item) => item.id === currentMaterialId.value));
    const currentMaterialWidth = ref("");
    const currentMaterialWidthOption = computed(() => {
      var _a;
      return ((_a = currentMaterialOption.value) == null ? void 0 : _a.specs) || [];
    });
    const chooseMatWidth = (width) => {
      currentMaterialWidth.value = width;
    };
    const fileType = ["image/webp", "image/png", "image/jpg", "image/jpeg"];
    const imageUrl = ref("");
    const beforeUpload = (rawFile) => {
      const imgSize = rawFile.size / 1024 / 1024 < fileSize;
      const imgType = fileType.includes(rawFile.type);
      if (!imgType) ElMessage.warning("The uploaded image does not conform to the required format!");
      if (!imgSize) ElMessage.warning(`The size of the uploaded image cannot exceed ${fileSize}MB\uFF01`);
      return imgType && imgSize;
    };
    const uploadChange = async (file) => {
      const { width, height } = await getImageSize(file);
      shapeStr.value = calculateShape({ width, height });
      ratio.value = findClosestMatch(width, height);
      const reader = new FileReader();
      reader.onload = () => {
        imageUrl.value = reader.result;
      };
      reader.readAsDataURL(file.raw);
      loaded = false;
      await getCombination();
    };
    const matVisible = computed(() => {
      var _a, _b;
      return ((_b = (_a = currentFrameOption.value) == null ? void 0 : _a.config) == null ? void 0 : _b.matSupport) && hasMat.value;
    });
    const totalPrice = computed(() => {
      var _a, _b;
      const sizePrice = ((_a = currentSizeOption.value) == null ? void 0 : _a.price) || 0;
      const framePrice = frameMoney.value || 0;
      const matPrice = !!currentMaterialId.value && hasFrame.value ? ((_b = currentMaterialOption.value) == null ? void 0 : _b.price) || 0 : 0;
      return Number(sizePrice) + Number(framePrice) + Number(matPrice);
    });
    const shapeStr = ref("slim");
    const ratio = ref("");
    const checkButtonRef = ref();
    const checkPopoverRef = ref();
    const onClickOutside = () => {
      var _a, _b;
      (_b = (_a = unref(checkPopoverRef).popperRef) == null ? void 0 : _a.delayHide) == null ? void 0 : _b.call(_a);
    };
    ref();
    ref();
    const themeIdMap = ref([]);
    const viewHistory = ref([]);
    const switchStep = (targetView) => {
      viewHistory.value.push(currentView.value);
      currentView.value = targetView;
      customStore.setCurrentView(currentView.value);
      customStore.setViewHistory(viewHistory.value);
    };
    const themeOptions = ref([]);
    const getTheme = async (id) => {
      const { data } = await getThemeApi(id);
      if (id === "0") {
        themeOptions.value = data;
      } else {
        const allNodes = flattenTree(themeOptions.value);
        const targetNode = allNodes.find((n) => n.id === id);
        if (targetNode) {
          targetNode.children = data;
          themeOptions.value = [...themeOptions.value];
        }
      }
      customStore.setThemeOptions(themeOptions.value);
      return [];
    };
    const currentThemeOption = computed(() => themeOptions.value.find((item) => item.id === themeIdMap.value[0]));
    const chooseTheme = (theme) => {
      let id = "";
      if (typeof theme === "string") id = theme;
      else id = theme.id;
      setThemeIdMap(id, 0);
      getTheme(id);
      switchStep("style");
    };
    const setThemeIdMap = (id, index) => {
      themeIdMap.value[index] = id;
      customStore.setThemeIdMap(themeIdMap.value);
    };
    const getFavoriteReference = computed(() => {
      if (!lastThemeObj.value) return null;
      const reference = lastThemeObj.value.reference || [];
      if (!reference.length) return null;
      for (const item of reference) {
        if (rangeVerify(contentNumber.value, item.contentInterval)) {
          return item;
        }
      }
      return null;
    });
    ref(false);
    const caseContrastData = ref([]);
    const handleContinue = () => {
      if (currentView.value === "case") {
        const themeId = caseContrastData.value[0].themeId;
        chooseTheme(themeId);
        return;
      }
      if (currentView.value === "style") {
        if (!themeIdMap.value[1]) {
          ElMessage.warning("Please choose your favorite style!");
          return;
        } else {
          switchStep("custom");
          return;
        }
      }
    };
    const reset = () => {
      loaded = false;
      imageUrl.value = "";
      generatorImg.value = "";
      currentSizeId.value = "";
      currentFrameId.value = "";
      currentMaterialId.value = "";
      currentView.value = "custom";
      viewHistory.value = [];
      themeIdMap.value = [];
      caseContrastData.value = [];
      contentNumber.value = 1;
      isPrint.value = false;
      if (route.query.work !== ArtCode.Painting) {
        currentView.value = "custom";
      } else {
        currentView.value = customStore.currentView || "theme";
        viewHistory.value = customStore.viewHistory || [];
        themeIdMap.value = customStore.themeIdMap || [];
        caseContrastData.value = customStore.caseContrastData || [];
        if (customStore.themeOptions.length) {
          themeOptions.value = customStore.themeOptions;
        } else {
          getTheme("0");
        }
      }
    };
    const specs = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      let currentFrameName = (_a = currentFrameOption.value) == null ? void 0 : _a.name;
      const thickness = (_c = (_b = currentFrameOption.value) == null ? void 0 : _b.config) == null ? void 0 : _c.thickness;
      if (thickness) currentFrameName += " (" + cm2inch(thickness) + " in wide)";
      const specs2 = {
        "Painting Size": (_d = currentSizeOption.value) == null ? void 0 : _d.name,
        // 尺寸名称
        "Frame": !hasFrame.value ? currentFrameName : currentMaterialId.value === "" ? currentFrameName + ", " + ((_e = innerFrame.value) == null ? void 0 : _e.name) : currentFrameName
        // 画框名称
      };
      if (hasFrame.value && !!currentMaterialId.value) {
        specs2["Mounting On"] = "Moisture Proof Backboard, Glass, Mat";
        specs2["Mat Color"] = (_f = currentMaterialOption.value) == null ? void 0 : _f.name;
        specs2["Mat Width"] = currentMaterialWidth.value + "\u2033";
      }
      if (route.query.work === ArtCode.Painting && lastThemeObj.value) {
        specs2["Style"] = lastThemeObj.value.name;
      }
      return specs2;
    });
    const parts = computed(() => {
      const parts2 = {};
      if (currentFrameId.value !== "") {
        parts2[currentFrameId.value] = {};
        if (hasFrame.value && currentMaterialId.value === "") parts2[innerFrame.value.id] = {};
      }
      if (hasFrame.value && !!currentMaterialId.value) parts2[currentMaterialId.value] = {
        "Mounting On": "Moisture Proof Backboard, Glass, Mat",
        "Mat width": currentMaterialWidth.value + "\u2033"
      };
      return parts2;
    });
    const isPrint = ref(false);
    const lastThemeObj = computed(() => {
      const lastId = themeIdMap.value[themeIdMap.value.length - 1];
      if (!lastId) return {};
      const allNodes = flattenTree(themeOptions.value);
      const targetNode = allNodes.find((n) => n.id === lastId);
      return targetNode || {};
    });
    const finalCode = computed(() => {
      const { work } = route.query;
      const isPainting = work === ArtCode.Painting;
      if (isPainting && isPrint.value) return "40USD-M2";
      if (isPainting && getFavoriteReference.value) return getFavoriteReference.value.code;
      return work;
    });
    const addToCart = () => {
      if (!imageUrl.value) return ElMessage.warning("Please upload the image first!");
      if (!userStore.isLogin) {
        showLoginWindow();
        return;
      }
      const cartRow = {
        code: finalCode.value,
        // 画芯代码
        previewImg: generatorImg.value,
        // 预览图片
        originalImg: imageUrl.value,
        // 原图
        title: "Photo to art",
        // 商品标题
        specs: specs.value,
        // 商品规格值
        dimensionId: currentSizeId.value,
        // 尺寸编号
        parts: parts.value,
        // 商品配件
        quantity: 1,
        // 购买数量
        actualAmount: totalPrice.value,
        // 实际支付金额
        remark: remark.value,
        // 备注
        contentNumber: contentNumber.value || null,
        // 人头数量
        themeId: lastThemeObj.value.id || null
      };
      customStore.addition(cartRow);
      router.push("/checkout-custom");
    };
    const loginWindowRef = ref();
    const showLoginWindow = () => {
      var _a;
      (_a = loginWindowRef.value) == null ? void 0 : _a.open();
    };
    watch(
      () => route.fullPath,
      () => {
        reset();
      },
      { immediate: true }
    );
    watch(() => currentView.value, () => {
      return;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_el_button = ElButton;
      const _component_ClientOnly = __nuxt_component_1$2;
      const _component_el_upload = ElUpload;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_dialog = ElDialog;
      const _component_el_image_viewer = ElImageViewer;
      const _component_el_popover = ElPopover;
      const _directive_click_outside = resolveDirective("click-outside");
      _push(`<!--[--><section data-v-2ea98105><div class="container" data-v-2ea98105><div class="my-md-50 my-25 portrait-wrapper acea-row row-center-wrapper gap-column-md gap-row-sm" data-v-2ea98105><img${ssrRenderAttr("src", _imports_4)} alt="logo-portrait" data-v-2ea98105><span class="text-20" data-v-2ea98105>Your exclusive art customization service is now available. Discover timeless creations.</span></div></div><div class="container" style="${ssrRenderStyle(unref(currentView) === "theme" ? null : { display: "none" })}" data-v-2ea98105><div class="text-center py-lg-40 py-30" data-v-2ea98105><h1 class="text-50" data-v-2ea98105>TRANSFORM YOUR PHOTOS INTO STUNNING ARTWORKS</h1><p class="mt-20 text-gray-600 text-20 f-bold-500" data-v-2ea98105> With Our Artists&#39; Creation, Any Photo Can Be Turned Into An Elaborately Crafted Artwork. Choose From A Variety Of Unique Styles You Desire, And You&#39;ll Get Professional-Grade Results. </p></div><div class="row gap-row-base style-list" data-v-2ea98105><!--[-->`);
      ssrRenderList(unref(themeOptions), (item) => {
        _push(`<div class="col-lg-average col-md-3 col-sm-4 col-6" data-v-2ea98105><div class="${ssrRenderClass([{ on: unref(themeIdMap)[0] === item.id }, "style-item"])}" data-v-2ea98105><img class="p-img aspect-ratio"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-2ea98105><p class="p-text text-30" data-v-2ea98105>${ssrInterpolate(item.name)}</p><div class="p-btn border-white border-md" data-v-2ea98105>CUSTOMIZE NOW</div></div></div>`);
      });
      _push(`<!--]--></div><div class="text-center py-lg-40 py-30" data-v-2ea98105><h1 class="text-50" data-v-2ea98105>MORE CASE STUDIES</h1></div><div class="case-list" data-v-2ea98105><!--[-->`);
      ssrRenderList(unref(themeOptions), (item) => {
        _push(`<div class="case-item" data-v-2ea98105><div class="acea-row row-between-wrapper f-bold-500 py-20" data-v-2ea98105><span class="text-uppercase text-26" data-v-2ea98105>${ssrInterpolate(item.name)}</span><span class="text-uppercase text-underline text-20 text-gray-600 cursor-pointer" data-v-2ea98105>see more</span></div><div class="case-content" data-v-2ea98105><!--[-->`);
        ssrRenderList(item.samples, (sample, index) => {
          _push(`<div class="item" data-v-2ea98105><img class="w-full h-full fit-cover img-hover"${ssrRenderAttr("src", unref(imagePrefix)(sample.compareImg))}${ssrRenderAttr("alt", item.name + "_sample")} data-v-2ea98105></div>`);
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_el_button, {
          class: "w-full mt-15",
          type: "primary",
          size: "large",
          onClick: ($event) => chooseTheme(item)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Customize Now `);
            } else {
              return [
                createTextVNode("Customize Now ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="container" style="${ssrRenderStyle(unref(currentView) === "case" ? null : { display: "none" })}" data-v-2ea98105><div class="text-center py-lg-40 py-30" data-v-2ea98105><h1 class="text-50" data-v-2ea98105>CUSTOM PORTRAIT SHOWCASE \u2014 FROM YOUR PHOTO TO ART</h1><p class="mt-20 text-gray-600 text-20 f-bold-500 text-capitalize" data-v-2ea98105> Discover how an ordinary photo transforms into extraordinary art. <br data-v-2ea98105> In our Custom Portrait Showcase, you\u2019ll see real examples of before-and-after results \u2014 side-by-side comparisons revealing the remarkable detail, color, and emotion that our artists bring to life. </p></div><div class="case-waterfall" data-v-2ea98105><!--[-->`);
      ssrRenderList(unref(caseContrastData), (sample, index) => {
        _push(`<div class="item cursor-pointer overflow-hidden" data-v-2ea98105><img class="w-full img-hover"${ssrRenderAttr("src", unref(imagePrefix)(sample.paintImg))} alt="" data-v-2ea98105></div>`);
      });
      _push(`<!--]--></div></div><div class="container" style="${ssrRenderStyle(unref(currentView) === "style" ? null : { display: "none" })}" data-v-2ea98105><div class="text-center py-lg-40 py-30" data-v-2ea98105><h1 class="text-50" data-v-2ea98105>CHOOSE YOUR FAVORITE STYLE</h1><p class="mt-20 text-gray-600 text-20 f-bold-500" data-v-2ea98105> From Classic Oil Paintings, Artist Styles, Disney Magic, Modern Anime Aesthetics, Vibrant Anime Styles, Dreamy Ghibli Styles, Big-Eye Portrait Styles To Modern Retro Styles, Browse Our Rich Collection Of Styles. Each Effect Is Carefully Designed And Created To Endow Your Photos With A Unique Texture \u2014 Whether You&#39;re Pursuing A Soft Aesthetic Vibe Or A Dramatic Fantasy Feel. Find The Perfect Transformation And Creation Method For Your Photos. </p></div><div class="row favorite-list gap-row-base" data-v-2ea98105><!--[-->`);
      ssrRenderList((_a = unref(currentThemeOption)) == null ? void 0 : _a.children, (item) => {
        _push(`<div class="col-lg-3 col-sm-4 col-6" data-v-2ea98105><div class="${ssrRenderClass([{ "on": unref(themeIdMap)[1] === item.id }, "favorite-item"])}" data-v-2ea98105><img class="w-full aspect-ratio"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-2ea98105><p class="p-text text-28 line1 p-sm-20 p-15" data-v-2ea98105>${ssrInterpolate(item.name)}</p><div class="p-content" data-v-2ea98105><p class="text-24 line5" data-v-2ea98105>${ssrInterpolate(item.intro)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="container" style="${ssrRenderStyle(unref(currentView) === "custom" ? null : { display: "none" })}" data-v-2ea98105>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="spu-wrapper row" data-v-2ea98105><div class="col-sm-6" data-v-2ea98105>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div><div class="col-sm-6" data-v-2ea98105><div class="spu-spec border-sm" data-v-2ea98105>`);
      if (!unref(imageUrl)) {
        _push(`<!--[--><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-2ea98105><div class="acea-row row-middle" data-v-2ea98105><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-2ea98105>STEP 1:</span><span class="text-26" data-v-2ea98105>Upload Your Photo</span><span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper" data-v-2ea98105><span class="pc" data-v-2ea98105>${ssrInterpolate(unref(moreInfoVisible)[3] ? "LESS INFO" : "MORE INFO")}</span><span class="iconfont icon-down" data-v-2ea98105></span></span></div><div class="text-20 f-bold" data-v-2ea98105></div></div><div class="mx-20 text-16 info-box" style="${ssrRenderStyle({ maxHeight: unref(moreInfoVisible)[3] ? "1000px" : "0px" })}" data-v-2ea98105><p class="p-15 bg-gray-200" data-v-2ea98105> The most convenient method in sending us your photo is to upload the photo from a picture file on your computer. You can easily upload a scanned or digital photo stored on your computer by simply clicking on the \u201CChoose File\u201D button shown below and finding the file on your computer that contains your photo. Double click on the file name for your photo and then the photo name will be displayed. </p></div><div class="p-md-20 p-15" data-v-2ea98105>`);
        if (unref(userStore).isLogin) {
          _push(ssrRenderComponent(_component_el_upload, {
            class: "upload-box",
            accept: fileType.join(","),
            "before-upload": beforeUpload,
            "on-change": uploadChange,
            "auto-upload": false,
            "show-file-list": false
          }, {
            tip: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="mt-10" data-v-2ea98105${_scopeId}>${ssrInterpolate(fileType.join(" , "))} files with a size less than ${ssrInterpolate(fileSize)}MB.</div>`);
              } else {
                return [
                  createVNode("div", { class: "mt-10" }, toDisplayString(fileType.join(" , ")) + " files with a size less than " + toDisplayString(fileSize) + "MB.", 1)
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_button, {
                  class: "w-full",
                  size: "large",
                  type: "primary"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Choose File`);
                    } else {
                      return [
                        createTextVNode("Choose File")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_button, {
                    class: "w-full",
                    size: "large",
                    type: "primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Choose File")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_el_button, {
            class: "w-full",
            size: "large",
            type: "primary",
            onClick: showLoginWindow
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Choose File `);
              } else {
                return [
                  createTextVNode("Choose File ")
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div><div class="p-md-20 p-15 text-16 text-gray-600" data-v-2ea98105> You may also send us your photo(s) by attaching them to an email and sending it to: <a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}`)} class="text-underline text-secondary" data-v-2ea98105>${ssrInterpolate(unref(CONTACT_EMAIL))}</a>. Please include your full name and phone number in the email. We will contact you promptly if we have any questions regarding your custom oil painting. </div><div class="px-md-20 px-15 py-10 text-20" data-v-2ea98105><span class="iconfont icon-info-fill text-20 mr-6" data-v-2ea98105></span><span class="f-bold" data-v-2ea98105>IMPORTANT NOTE:</span> Our artists can combine two or more photos into a single oil painting. If you plan to send us multiple photos, please provide a detailed explanation of which elements from each photo you\u2019d like the artist to incorporate into the final painting. <br data-v-2ea98105><br data-v-2ea98105> It is crucial that the photo(s) you send us are high-resolution and detailed\u2014ideally, larger than 200KB. The quality of the photo you provide will directly affect the final outcome of the portrait. A high-quality photo is essential for the artist to capture all the fine details in the painting. </div><div class="px-md-20 px-15 py-10 text-20" data-v-2ea98105><span class="iconfont icon-info-fill text-20 mr-6" data-v-2ea98105></span><span class="f-bold" data-v-2ea98105>Copyright:</span> You must either be the sole owner of the copyright for the photo or have the copyright owner\u2019s permission to use the photo for the creation of an oil painting. please refer to the &quot;photograph release&quot; section in our terms of use agreement for more details. </div><!--]-->`);
      } else {
        _push(`<!--[-->`);
        if (unref(route).query.work === unref(ArtCode).Painting) {
          _push(`<!--[--><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-2ea98105><div class="acea-row row-middle flex-1 mr-10" data-v-2ea98105><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-2ea98105></span><span class="text-26" data-v-2ea98105>Choose a Craft</span></div></div><div class="p-md-20 p-15" data-v-2ea98105><div class="width-list row" data-v-2ea98105><div class="col-6" data-v-2ea98105><div class="${ssrRenderClass([{ "border-gray-700": !unref(isPrint) }, "width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"])}" data-v-2ea98105><pre data-v-2ea98105>Hand-painted oil painting</pre></div></div><div class="col-6" data-v-2ea98105><div class="${ssrRenderClass([{ "border-gray-700": unref(isPrint) }, "width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"])}" data-v-2ea98105><pre data-v-2ea98105>Print painting</pre></div></div></div></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="acea-row row-between-wrapper p-md-20 p-15" data-v-2ea98105><div class="acea-row row-middle" data-v-2ea98105><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-2ea98105></span><span class="text-26" data-v-2ea98105>Choose a Size</span><span class="text-26 text-gray-400 pc" data-v-2ea98105>\xA0\xA0(inches)</span></div><div class="text-20 f-bold" data-v-2ea98105>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_b = unref(currentSizeOption)) == null ? void 0 : _b.price) || 0))}</div></div><div class="p-md-20 p-15" data-v-2ea98105>`);
        _push(ssrRenderComponent(_component_el_select, {
          class: "custom-select",
          modelValue: unref(currentSizeId),
          "onUpdate:modelValue": ($event) => isRef(currentSizeId) ? currentSizeId.value = $event : null,
          placeholder: "Please Select Size",
          size: "large",
          onChange: chooseSize
        }, {
          prefix: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="size-prefix" data-v-2ea98105${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "size-prefix" })
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(sizeOptions), (item) => {
                _push2(ssrRenderComponent(_component_el_option, {
                  key: item.id,
                  label: item.name,
                  value: item.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="option-item acea-row row-between-wrapper" data-v-2ea98105${_scopeId2}><span data-v-2ea98105${_scopeId2}>${ssrInterpolate(item.name)}</span><span data-v-2ea98105${_scopeId2}>${ssrInterpolate(unref(currencyStore).formatToCurrency(item.price || 0))}</span></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "option-item acea-row row-between-wrapper" }, [
                          createVNode("span", null, toDisplayString(item.name), 1),
                          createVNode("span", null, toDisplayString(unref(currencyStore).formatToCurrency(item.price || 0)), 1)
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
                (openBlock(true), createBlock(Fragment, null, renderList(unref(sizeOptions), (item) => {
                  return openBlock(), createBlock(_component_el_option, {
                    key: item.id,
                    label: item.name,
                    value: item.id
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "option-item acea-row row-between-wrapper" }, [
                        createVNode("span", null, toDisplayString(item.name), 1),
                        createVNode("span", null, toDisplayString(unref(currencyStore).formatToCurrency(item.price || 0)), 1)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["label", "value"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="px-md-20 px-15 py-10 text-20" data-v-2ea98105><span class="iconfont icon-info-fill text-20 mr-6" data-v-2ea98105></span><span class="f-bold" data-v-2ea98105>Note:</span> To order a custom size, <a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}`)} class="text-underline cursor-pointer" data-v-2ea98105>click here</a>. Our artists will create a painting in any size you require. </div>`);
        if (unref(route).query.work === unref(ArtCode).Painting && !unref(isPrint)) {
          _push(`<!--[--><div class="acea-row row-between-wrapper p-20" data-v-2ea98105><div class="acea-row row-middle" data-v-2ea98105><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-2ea98105></span><span class="text-26" data-v-2ea98105>Number of ${ssrInterpolate((_c = unref(currentThemeOption)) == null ? void 0 : _c.name)} in Your Photo</span><span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper" data-v-2ea98105><span class="pc" data-v-2ea98105>${ssrInterpolate(unref(moreInfoVisible)[1] ? "LESS INFO" : "MORE INFO")}</span><span class="iconfont icon-down" data-v-2ea98105></span></span></div><div class="text-20 f-bold" data-v-2ea98105></div></div><div class="mx-20 text-16 info-box" style="${ssrRenderStyle({ maxHeight: unref(moreInfoVisible)[1] ? "1000px" : "0px" })}" data-v-2ea98105><p class="p-15 bg-gray-200" data-v-2ea98105> Please select the number of figures in your photo. Each person or pet/animal in a photo would be counted as one figure. Houses, cars, boats and travel scenery would each count as one figure. </p></div><div class="p-20" data-v-2ea98105><div class="width-list row" data-v-2ea98105><!--[-->`);
          ssrRenderList(10, (item, index) => {
            _push(`<div class="col-xl-average col-md-3 col-xs-4 col-6" data-v-2ea98105><div class="${ssrRenderClass([{ "border-gray-700": unref(contentNumber) === item }, "width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-20"])}" data-v-2ea98105><pre data-v-2ea98105>${ssrInterpolate(item)}</pre></div></div>`);
          });
          _push(`<!--]--></div></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="acea-row row-between-wrapper p-md-20 p-15" data-v-2ea98105><div class="acea-row row-middle" data-v-2ea98105><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-2ea98105></span><span class="text-26" data-v-2ea98105>Additional Notes</span><span class="text-20 ml-md-20 ml-10 cursor-pointer text-secondary f-bold acea-row row-center-wrapper" data-v-2ea98105><span class="pc" data-v-2ea98105>${ssrInterpolate(unref(moreInfoVisible)[2] ? "LESS INFO" : "MORE INFO")}</span><span class="iconfont icon-down" data-v-2ea98105></span></span></div><div class="text-20 f-bold" data-v-2ea98105></div></div><div class="mx-20 text-16 info-box" style="${ssrRenderStyle({ maxHeight: unref(moreInfoVisible)[2] ? "1000px" : "0px" })}" data-v-2ea98105><p class="p-15 bg-gray-200" data-v-2ea98105> Here is where you can convey any special requests to the artist, such as removing certain aspects in the photo or specific color and background preferences. </p></div><div class="p-md-20 p-15" data-v-2ea98105>`);
        _push(ssrRenderComponent(_component_el_input, {
          type: "textarea",
          modelValue: unref(remark),
          "onUpdate:modelValue": ($event) => isRef(remark) ? remark.value = $event : null,
          placeholder: "Please enter any additional instructions",
          rows: 8
        }, null, _parent));
        _push(`</div><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-2ea98105><div class="acea-row row-middle" data-v-2ea98105><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-2ea98105></span><span class="text-26" data-v-2ea98105>Choose a Frame</span><span class="text-26 text-gray-400 pc" data-v-2ea98105>\xA0\xA0(100+ styles)</span></div><div class="text-20 f-bold" data-v-2ea98105>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(frameMoney) || 0))}</div></div><div class="p-md-20 p-15" data-v-2ea98105><div class="frame-scroll scroll-y border-sm p-10" data-v-2ea98105><div class="frame-list row" data-v-2ea98105><!--[-->`);
        ssrRenderList(unref(frameOptions), (item, index) => {
          _push(`<div class="col-2xl-2 col-xl-average col-md-3 col-xs-3 col-4" data-v-2ea98105><div class="${ssrRenderClass([{ on: unref(currentFrameId) === item.id }, "frame-item text-14 bg-gray-100 p-5 cursor-pointer"])}" data-v-2ea98105><div class="frame-box" data-v-2ea98105><div class="frame-img aspect-ratio" data-v-2ea98105><img class="w-full h-full fit-cover"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-2ea98105></div><p class="line2 mt-10 frame-name" data-v-2ea98105>${ssrInterpolate(item.name)}</p><p class="f-bold-500 frame-money" data-v-2ea98105>${ssrInterpolate(unref(currencyStore).formatToCurrency(Number(item.price) + Number(item.surcharge) || 0))}</p></div></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
        if (unref(hasFrame) && unref(matVisible)) {
          _push(`<!--[--><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-2ea98105><div class="acea-row row-middle" data-v-2ea98105><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-2ea98105></span><span class="text-26" data-v-2ea98105>Choose a Canvas material</span></div><div class="text-20 f-bold" data-v-2ea98105>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_d = unref(currentMaterialOption)) == null ? void 0 : _d.price) || 0))}</div></div><div class="p-md-20 p-15" data-v-2ea98105><div class="material-wrapper border-sm p-md-20 p-15" data-v-2ea98105><div class="acea-row row-middle text-20 f-bold-500" data-v-2ea98105><p class="mr-xl-40 mr-20" data-v-2ea98105>Mat Color</p><p class="flex-1 line1" data-v-2ea98105>Crisp Bright White</p></div><div class="color-list my-md-20 my-15" data-v-2ea98105><!--[-->`);
          ssrRenderList(unref(materialOptions), (item, index) => {
            var _a2;
            _push(`<div class="${ssrRenderClass([{ on: unref(currentMaterialId) === item.id }, "color-item rounded-full cursor-pointer"])}" style="${ssrRenderStyle({ background: (_a2 = item.config) == null ? void 0 : _a2.matColor })}" data-v-2ea98105>`);
            if (item.id === "") {
              _push(`<span class="iconfont icon-close" data-v-2ea98105></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
          if (unref(currentMaterialWidthOption).length) {
            _push(`<!--[--><div class="acea-row row-middle text-20 f-bold-500" data-v-2ea98105><p class="mr-xl-40 mr-20" data-v-2ea98105>Mat Width</p><p class="flex-1 line1" data-v-2ea98105>Increasing the mat width mayaffectthe frame price.</p></div><div class="width-list row mt-md-20 mt-15" data-v-2ea98105><!--[-->`);
            ssrRenderList(unref(currentMaterialWidthOption), (item, index) => {
              _push(`<div class="col-average" data-v-2ea98105><div class="${ssrRenderClass([{ "border-gray-700": unref(currentMaterialWidth) === item.matWidth }, "width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"])}" data-v-2ea98105>${ssrInterpolate(item.matWidth)}\u2033 </div></div>`);
            });
            _push(`<!--]--></div><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="acea-row row-middle px-md-20 px-15 py-10" data-v-2ea98105><span class="iconfont icon-info-fill text-20" data-v-2ea98105></span><span class="ml-6 text-20 text-underline cursor-pointer flex-1 line1" data-v-2ea98105><span class="f-bold" data-v-2ea98105>Click here:</span> Summary of differences. </span></div><div class="p-md-20 p-15 f-bold-500 text-16 border-t-sm" data-v-2ea98105><p data-v-2ea98105>Product Parameter</p><!--[-->`);
        ssrRenderList(unref(specs), (val, key) => {
          _push(`<p class="mt-10" data-v-2ea98105>${ssrInterpolate(key)}: ${ssrInterpolate(val)}</p>`);
        });
        _push(`<!--]--></div><div class="border-t-sm p-md-20 p-15 text-16 f-bold-500" data-v-2ea98105> All framing includes free canvas stretching, mounting &amp; wall hooks.Your framed oil painting will arrive to your door ready to hang on your wall. </div><div class="p-md-20 p-15 acea-row row-between-wrapper text-20 bg-gray-100" data-v-2ea98105><p class="f-bold-500" data-v-2ea98105> Price Details <span${ssrRenderAttrs(mergeProps({
          class: "text-underline cursor-pointer",
          ref_key: "checkButtonRef",
          ref: checkButtonRef
        }, ssrGetDirectiveProps(_ctx, _directive_click_outside, onClickOutside)))} data-v-2ea98105> Check </span></p><p class="f-bold" data-v-2ea98105>Total\uFF1A<span class="text-26 text-error" data-v-2ea98105>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(totalPrice) || 0))}</span></p></div>`);
        _push(ssrRenderComponent(_component_el_button, {
          class: "w-full",
          size: "large",
          type: "danger",
          onClick: addToCart
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Add To Cart`);
            } else {
              return [
                createTextVNode("Add To Cart")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div></div></div></div><div class="container" style="${ssrRenderStyle(unref(currentView) !== "custom" ? null : { display: "none" })}" data-v-2ea98105><p class="text-60 f-bold-500 text-center my-md-50 my-25" data-v-2ea98105>How it Works:</p><div class="row works-list gap-row-base my-md-50 my-25" data-v-2ea98105><div class="col-lg-3 col-md-6" data-v-2ea98105><div data-v-2ea98105><p class="acea-row row-between-wrapper" data-v-2ea98105><span class="text-26 f-bold" data-v-2ea98105>Choose Subject</span><span class="iconfont icon-album text-50" data-v-2ea98105></span></p><p class="text-20 mt-20" data-v-2ea98105> Pick your most cherished Subject(s). For best quality, choose an image that is clear, in focus, and large enough to see the details. </p></div></div><div class="col-lg-3 col-md-6" data-v-2ea98105><div data-v-2ea98105><p class="acea-row row-between-wrapper" data-v-2ea98105><span class="text-26 f-bold" data-v-2ea98105>Choose Style</span><span class="iconfont icon-magic-pen text-50" data-v-2ea98105></span></p><p class="text-20 mt-20" data-v-2ea98105> Pick the medium for your artist to use when creating your portrait, from charcoal to oils. Then choose your desired background. </p></div></div><div class="col-lg-3 col-md-6" data-v-2ea98105><div data-v-2ea98105><p class="acea-row row-between-wrapper" data-v-2ea98105><span class="text-26 f-bold" data-v-2ea98105>Upload Photos</span><span class="iconfont icon-upload-pictures text-50" data-v-2ea98105></span></p><p class="text-20 mt-20" data-v-2ea98105> Upload your photos when you place your order or send them to us by email. You can even request to combine multiple images into one. </p></div></div><div class="col-lg-3 col-md-6" data-v-2ea98105><div data-v-2ea98105><p class="acea-row row-between-wrapper" data-v-2ea98105><span class="text-26 f-bold" data-v-2ea98105>Place Order</span><span class="iconfont icon-color-palette text-50" data-v-2ea98105></span></p><p class="text-20 mt-20" data-v-2ea98105> After checkout, you will receive an order number and a detailed email with what to expect next. Time to get excited about your custom portrait! </p></div></div></div></div>`);
      if (unref(route).query.work === unref(ArtCode).Painting && unref(currentView) !== "theme") {
        _push(`<div class="foot-wrapper" style="${ssrRenderStyle({ position: unref(currentView) === "custom" ? "relative" : "sticky" })}" data-v-2ea98105><div class="container" data-v-2ea98105><div class="foot-inner py-20" data-v-2ea98105><div class="back-btn acea-row row-middle cursor-pointer" style="${ssrRenderStyle(unref(currentView) !== "theme" ? null : { display: "none" })}" data-v-2ea98105><span class="iconfont icon-left text-20" data-v-2ea98105></span><span class="text-20 f-bold" data-v-2ea98105>Back</span></div><span class="text-20 f-bold" data-v-2ea98105>Online proofing | Unlimited revisions | 100% satisfaction before painting</span>`);
        if (unref(currentView) !== "custom") {
          _push(ssrRenderComponent(_component_el_button, {
            type: "primary",
            size: "large",
            onClick: handleContinue
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Continue `);
              } else {
                return [
                  createTextVNode(" Continue ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: unref(centerDialogVisible),
        "onUpdate:modelValue": ($event) => isRef(centerDialogVisible) ? centerDialogVisible.value = $event : null,
        title: "Summary of Differences",
        width: "720",
        center: ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => centerDialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: ($event) => centerDialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Confirm`);
                } else {
                  return [
                    createTextVNode("Confirm")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: ($event) => centerDialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("Cancel")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: ($event) => centerDialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("Confirm")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-2ea98105${_scopeId}> It should be noted that the content will not be aligned in center by default </span>`);
          } else {
            return [
              createVNode("span", null, " It should be noted that the content will not be aligned in center by default ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      if (unref(imgViewVisible)) {
        _push(ssrRenderComponent(_component_el_image_viewer, {
          "url-list": [unref(generatorImg)],
          onClose: ($event) => imgViewVisible.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_el_popover, {
        ref_key: "checkPopoverRef",
        ref: checkPopoverRef,
        trigger: "click",
        width: "50vw",
        placement: "top",
        title: "Price Details",
        "virtual-ref": unref(checkButtonRef),
        "popper-style": { padding: "20px", "padding-bottom": "10px" },
        "virtual-triggering": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<div class="acea-row row-between-wrapper text-gray-700 mb-10 py-20" data-v-2ea98105${_scopeId}><span class="f-bold text-18 flex-1 line1 mr-10" data-v-2ea98105${_scopeId}>Painting Size Price</span><span class="text-14" data-v-2ea98105${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_a2 = unref(currentSizeOption)) == null ? void 0 : _a2.price) || 0))}</span></div><div class="acea-row row-between-wrapper text-gray-700 py-20 mb-10" data-v-2ea98105${_scopeId}><span class="f-bold text-18 flex-1 line1 mr-10" data-v-2ea98105${_scopeId}>Frame Price</span><span class="text-14" data-v-2ea98105${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(frameMoney) || 0))}</span></div>`);
            if (unref(hasFrame) && !!unref(currentMaterialId)) {
              _push2(`<div class="acea-row row-between-wrapper text-gray-700 mb-10 py-20" data-v-2ea98105${_scopeId}><span class="f-bold text-18 flex-1 line1 mr-10" data-v-2ea98105${_scopeId}>Canvas material Price</span><span class="text-14" data-v-2ea98105${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_b2 = unref(currentMaterialOption)) == null ? void 0 : _b2.price) || 0))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "acea-row row-between-wrapper text-gray-700 mb-10 py-20" }, [
                createVNode("span", { class: "f-bold text-18 flex-1 line1 mr-10" }, "Painting Size Price"),
                createVNode("span", { class: "text-14" }, toDisplayString(unref(currencyStore).formatToCurrency(((_c2 = unref(currentSizeOption)) == null ? void 0 : _c2.price) || 0)), 1)
              ]),
              createVNode("div", { class: "acea-row row-between-wrapper text-gray-700 py-20 mb-10" }, [
                createVNode("span", { class: "f-bold text-18 flex-1 line1 mr-10" }, "Frame Price"),
                createVNode("span", { class: "text-14" }, toDisplayString(unref(currencyStore).formatToCurrency(unref(frameMoney) || 0)), 1)
              ]),
              unref(hasFrame) && !!unref(currentMaterialId) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "acea-row row-between-wrapper text-gray-700 mb-10 py-20"
              }, [
                createVNode("span", { class: "f-bold text-18 flex-1 line1 mr-10" }, "Canvas material Price"),
                createVNode("span", { class: "text-14" }, toDisplayString(unref(currencyStore).formatToCurrency(((_d2 = unref(currentMaterialOption)) == null ? void 0 : _d2.price) || 0)), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/custom-paint.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customPaint = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ea98105"]]);

export { customPaint as default };
//# sourceMappingURL=custom-paint-BqbxFHrY.mjs.map
