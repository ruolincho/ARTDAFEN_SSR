import { c as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc, a2 as useNuxtApp, a3 as useUserStore, a8 as useAppStore, aw as useCartStore, u as useRoute, a4 as useRouter, a9 as useCurrencyStore, b3 as cm2inch, ac as __nuxt_component_1$2, at as debounce, ab as imagePrefix, o as CONTACT_EMAIL, a as ElButton, ap as useRuntimeConfig, Z as TRADE_MODULE, ax as PRODUCT_URL, b as ElMessage } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, resolveDirective, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, withDirectives, vShow, isRef, Fragment, renderList, mergeProps, createTextVNode, nextTick, watch, toRaw, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import { isEqual, cloneDeep } from 'lodash-es';
import { E as ElSkeleton, a as ElSkeletonItem } from './skeleton-item-BRULBEUt.mjs';
import { E as ElSelect, a as ElOption } from './select-BBb6v1ax.mjs';
import { E as ElCollapse, s as shoppingFaq, a as ElCollapseItem } from './faq-DxITp9IQ.mjs';
import { E as ElDialog } from './dialog-DQju9U68.mjs';
import { E as ElPopover } from './popover-Z4OiMpEN.mjs';
import { a as getCombinationApi } from './paint-B_vqKQsu.mjs';
import { p as productThumbsApi } from './likes-CD9WoB9V.mjs';
import { g as gen_path_obj } from './product-DJnmy_Y8.mjs';
import { L as LoginWindow } from './LoginWindow-8pCArWXq.mjs';
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
import './scrollbar-BAU7-sWB.mjs';
import './index-TgbWtzhx.mjs';
import './form-item-BeekeJ4U.mjs';
import 'async-validator';
import './nuxt-link-DR_c-RpP.mjs';
import './divider-DgH3PmJB.mjs';
import './logo-DzgOjlOk.mjs';
import './google-CA8l_UnH.mjs';
import './useAuth-Dm_6RpzH.mjs';
import './custom-CnGfPiQ8.mjs';
import './index-BuIDaW2O.mjs';

const ct = "data:image/png;base64,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";
const cl = "data:image/png;base64,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";
const MAX_WIDTH = 1e3;
const MAX_HEIGHT = 1e3;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ImageGenerator"
  },
  __name: "ImageGenerator",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    pixel: {},
    coreImage: {},
    hasMat: { type: Boolean, default: false },
    matThickness: { default: "0" },
    matColor: { default: "#ffffff" },
    hasFrame: { type: Boolean, default: false },
    frameCornerImages: { default: () => [] },
    frameSideImages: { default: () => [] },
    frameCm: {},
    innerFrame: { type: Boolean, default: false },
    sizeCm: {},
    shape: { default: "slim" },
    embeddedFrame: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:pixel", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const lastSnapshot = ref(null);
    const inch2cm = (inch) => Number(inch) * 2.54;
    const isLoading = ref(false);
    const isError = ref(false);
    const imageSrc = ref("");
    const offscreenCanvas = ref(null);
    const wRatio = ref(100);
    const hRatio = ref(100);
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };
    const drawHorizontalTiledImage = (ctx, img, x, y, totalWidth, height) => {
      const patternWidth = img.width;
      for (let repeat = 0; repeat < 4; repeat++) {
        for (let i = 0; i < totalWidth; ) {
          const drawWidth = Math.min(patternWidth, totalWidth - i);
          ctx.drawImage(img, 0, 0, drawWidth, img.height, x + i, y, drawWidth, height);
          i += drawWidth;
        }
      }
    };
    const drawVerticalTiledImage = (ctx, img, x, y, width, totalHeight) => {
      const patternHeight = img.height;
      for (let repeat = 0; repeat < 4; repeat++) {
        for (let i = 0; i < totalHeight; ) {
          const drawHeight = Math.min(patternHeight, totalHeight - i);
          ctx.drawImage(img, 0, 0, img.width, drawHeight, x, y + i, width, drawHeight);
          i += drawHeight;
        }
      }
    };
    const getFrameWidthPx = (pixelSize, widthCm) => {
      const realCmSize = { width: props.sizeCm.width, length: props.sizeCm.length };
      const scale = (pixelSize.width / realCmSize.width + pixelSize.length / realCmSize.length) / 2;
      return widthCm * scale;
    };
    const draw = async () => {
      try {
        isLoading.value = true;
        isError.value = false;
        if (!offscreenCanvas.value) {
          offscreenCanvas.value = (void 0).createElement("canvas");
        }
        const canvas = offscreenCanvas.value;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let coreImage = props.coreImage;
        const coreImg = await loadImage(coreImage);
        let coreWidth = coreImg.width;
        let coreHeight = coreImg.height;
        if (coreWidth > MAX_WIDTH || coreHeight > MAX_HEIGHT) {
          const widthRatio = MAX_WIDTH / coreWidth;
          const heightRatio = MAX_HEIGHT / coreHeight;
          const ratio = Math.min(widthRatio, heightRatio);
          coreWidth = Math.floor(coreWidth * ratio);
          coreHeight = Math.floor(coreHeight * ratio);
        }
        let frameThickness = 0;
        let matThickness = props.hasMat ? getFrameWidthPx({ width: coreWidth, length: coreHeight }, inch2cm(props.matThickness)) : 0;
        let MAT_WIDTH = props.hasMat ? Math.min(5, Math.max(2, 2 + matThickness * 0.05)) : 0;
        matThickness = matThickness + MAT_WIDTH;
        let embeddedThickness = props.hasFrame && props.embeddedFrame ? getFrameWidthPx({ width: coreWidth, length: coreHeight }, 0.6) : 0;
        let cornerImgs = [];
        let sideImgs = [];
        if (props.hasFrame && props.frameCornerImages.length === 4 && props.frameSideImages.length === 4) {
          cornerImgs = await Promise.all(props.frameCornerImages.map(loadImage));
          sideImgs = await Promise.all(props.frameSideImages.map(loadImage));
          frameThickness = getFrameWidthPx({ width: coreWidth, length: coreHeight }, Number(props.frameCm));
        }
        const totalWidth = coreWidth + 2 * matThickness + 2 * frameThickness + 2 * embeddedThickness;
        const totalHeight = coreHeight + 2 * matThickness + 2 * frameThickness + 2 * embeddedThickness;
        wRatio.value = (coreWidth + 2 * matThickness) / totalWidth * 100;
        hRatio.value = (coreHeight + 2 * matThickness) / totalHeight * 100;
        canvas.width = totalWidth;
        canvas.height = totalHeight;
        ctx.clearRect(0, 0, totalWidth, totalHeight);
        const coreX = frameThickness + matThickness + embeddedThickness;
        const coreY = frameThickness + matThickness + embeddedThickness;
        if (props.hasFrame) {
          ctx.drawImage(cornerImgs[0], 0, 0, frameThickness, frameThickness);
          ctx.drawImage(cornerImgs[1], totalWidth - frameThickness, 0, frameThickness, frameThickness);
          ctx.drawImage(cornerImgs[2], 0, totalHeight - frameThickness, frameThickness, frameThickness);
          ctx.drawImage(cornerImgs[3], totalWidth - frameThickness, totalHeight - frameThickness, frameThickness, frameThickness);
          ctx.save();
          ctx.translate(frameThickness, 0);
          drawHorizontalTiledImage(ctx, sideImgs[0], 0, 0, totalWidth - 2 * frameThickness, frameThickness);
          ctx.restore();
          ctx.save();
          ctx.translate(frameThickness, totalHeight - frameThickness);
          drawHorizontalTiledImage(ctx, sideImgs[1], 0, 0, totalWidth - 2 * frameThickness, frameThickness);
          ctx.restore();
          ctx.save();
          ctx.translate(0, frameThickness);
          drawVerticalTiledImage(ctx, sideImgs[2], 0, 0, frameThickness, totalHeight - 2 * frameThickness);
          ctx.restore();
          ctx.save();
          ctx.translate(totalWidth - frameThickness, frameThickness);
          drawVerticalTiledImage(ctx, sideImgs[3], 0, 0, frameThickness, totalHeight - 2 * frameThickness);
          ctx.restore();
          if (embeddedThickness !== 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.beginPath();
            ctx.moveTo(frameThickness, frameThickness);
            ctx.lineTo(coreX + coreWidth + embeddedThickness, frameThickness);
            ctx.lineTo(coreX + coreWidth, coreY);
            ctx.lineTo(frameThickness, coreY);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(frameThickness, coreY);
            ctx.lineTo(frameThickness, coreY + coreHeight + embeddedThickness);
            ctx.lineTo(coreX, coreY + coreHeight);
            ctx.lineTo(coreX, coreY);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.beginPath();
            ctx.moveTo(frameThickness, coreY + coreHeight + embeddedThickness);
            ctx.lineTo(coreX + coreWidth + embeddedThickness, coreY + coreHeight + embeddedThickness);
            ctx.lineTo(coreX + coreWidth, coreY + coreHeight);
            ctx.lineTo(frameThickness, coreY + coreHeight);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(coreX + coreWidth, coreY);
            ctx.lineTo(coreX + coreWidth + embeddedThickness, coreY - embeddedThickness);
            ctx.lineTo(coreX + coreWidth + embeddedThickness, coreY + coreHeight + embeddedThickness);
            ctx.lineTo(coreX + coreWidth, coreY + coreHeight);
            ctx.closePath();
            ctx.fill();
          }
        }
        if (props.hasMat) {
          ctx.fillStyle = props.matColor;
          ctx.fillRect(frameThickness, frameThickness, totalWidth - 2 * frameThickness, totalHeight - 2 * frameThickness);
          const SHADOW_WEIGHT = Math.min(50, Math.max(5, matThickness * 0.4));
          const ctShadow = await loadImage(ct);
          const clShadow = await loadImage(cl);
          ctx.drawImage(ctShadow, frameThickness, frameThickness, totalWidth - 2 * frameThickness, SHADOW_WEIGHT);
          ctx.drawImage(clShadow, frameThickness, frameThickness, SHADOW_WEIGHT, totalHeight - 2 * frameThickness);
          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.beginPath();
          ctx.moveTo(coreX - MAT_WIDTH, coreY - MAT_WIDTH);
          ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY - MAT_WIDTH);
          ctx.lineTo(coreX + coreWidth, coreY);
          ctx.lineTo(coreX - MAT_WIDTH, coreY);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(coreX - MAT_WIDTH, coreY);
          ctx.lineTo(coreX - MAT_WIDTH, coreY + coreHeight + MAT_WIDTH);
          ctx.lineTo(coreX, coreY + coreHeight);
          ctx.lineTo(coreX, coreY);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "rgba(244, 243, 243, 1)";
          ctx.beginPath();
          ctx.moveTo(coreX + coreWidth, coreY);
          ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY - MAT_WIDTH);
          ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY + coreHeight + MAT_WIDTH);
          ctx.lineTo(coreX + coreWidth, coreY + coreHeight);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(coreX, coreY + coreHeight);
          ctx.lineTo(coreX - MAT_WIDTH, coreY + coreHeight + MAT_WIDTH);
          ctx.lineTo(coreX + coreWidth + MAT_WIDTH, coreY + coreHeight + MAT_WIDTH);
          ctx.lineTo(coreX + coreWidth, coreY + coreHeight);
          ctx.closePath();
          ctx.fill();
        }
        ctx.drawImage(coreImg, coreX, coreY, coreWidth, coreHeight);
        imageSrc.value = canvas.toDataURL("image/png");
        emit("update:modelValue", imageSrc.value);
        emit("update:pixel", { width: totalWidth, height: totalHeight });
        emit("change", imageSrc.value);
      } catch (e) {
        isError.value = true;
      } finally {
        isLoading.value = false;
      }
    };
    const shapeStyle = computed(() => {
      let style = {};
      switch (props.shape) {
        case "square":
        case "landscape":
        case "panoramic":
          style = {
            maxWidth: `70% !important`
          };
          break;
        case "portrait":
        case "slim":
          style = {
            maxWidth: `50%!important`
          };
          break;
      }
      return style;
    });
    watch(
      () => ({
        coreImage: props.coreImage,
        hasMat: props.hasMat,
        matThickness: props.matThickness,
        matColor: props.matColor,
        hasFrame: props.hasFrame,
        frameCornerImages: props.frameCornerImages,
        frameSideImages: props.frameSideImages,
        sizeCm: props.sizeCm
      }),
      (newVal) => {
        const rawNew = toRaw(newVal);
        if (!isEqual(rawNew, lastSnapshot.value)) {
          draw();
          lastSnapshot.value = cloneDeep(rawNew);
        }
      },
      { flush: "post", immediate: true }
      // flush 为 post 确保在 DOM 更新后执行
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "image-generator" }, _attrs))} data-v-b3537ebf>`);
      if (unref(isLoading)) {
        _push(`<div class="loading" data-v-b3537ebf><div class="spinner" data-v-b3537ebf></div><p style="${ssrRenderStyle({ "margin-top": "10px" })}" data-v-b3537ebf>Generating images...</p></div>`);
      } else if (!unref(isLoading) && !unref(isError)) {
        _push(`<div class="${ssrRenderClass(["image-container", { "inner-frame": _ctx.innerFrame }])}" style="${ssrRenderStyle(unref(shapeStyle))}" data-v-b3537ebf><img${ssrRenderAttr("src", unref(imageSrc))} alt="image generator" data-v-b3537ebf><div class="scan-light" style="${ssrRenderStyle([
          { width: unref(wRatio) + "%", height: unref(hRatio) + "%" },
          _ctx.hasMat ? null : { display: "none" }
        ])}" data-v-b3537ebf></div>`);
        if (_ctx.innerFrame) {
          _push(`<div class="frame-holder-box" data-v-b3537ebf><div class="frame-holder" style="${ssrRenderStyle({ backgroundImage: `url(${unref(imageSrc)})` })}" data-v-b3537ebf></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<p data-v-b3537ebf>Image generation error, please refresh the page and try again.</p>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageGenerator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-b3537ebf"]]), { __name: "ImageGenerator" });
const _imports_0 = "" + buildAssetsURL("quality1.BJZ2YJXc.png");
const _imports_1 = "" + buildAssetsURL("quality2.DozYwGC6.png");
const _imports_2 = "" + buildAssetsURL("quality3.BVn4quix.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "PaintDetail"
  },
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $bus } = useNuxtApp();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const cartStore = useCartStore();
    const route = useRoute();
    const router = useRouter();
    const currencyStore = useCurrencyStore();
    const activeName = ref("");
    const generatorImg = ref("");
    const pixel = ref({ width: 0, height: 0 });
    const imgViewVisible = ref(false);
    const centerDialogVisible = ref(false);
    const generateStepIndex = () => {
      nextTick(() => {
        const el = (void 0).documentElement.getElementsByClassName("step-index");
        Array.from(el).forEach((item, index) => {
          item.textContent = `STEP ${index + 1}:`;
        });
      });
    };
    const reReckon = ref(false);
    const handleImageChange = () => {
      reReckon.value = false;
      nextTick(() => {
        reReckon.value = true;
      });
    };
    const { data: goodsDetail, pending: isSkeleton } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("goods-detail", async () => {
      const config = useRuntimeConfig();
      const { data } = await $fetch(config.public.apiBase + TRADE_MODULE + "/product/detail", { params: { productId: route.params.id } });
      return data;
    })), __temp = await __temp, __restore(), __temp);
    const specsCombination = ref([]);
    const currentSpecId = ref("");
    const currentSpecOption = computed(() => specsCombination.value.find((item) => item.id === currentSpecId.value));
    const chooseTechnique = (item) => {
      if (currentSpecId.value === item.id) return;
      currentSpecId.value = item.id;
      getCombination(true);
    };
    const isBan = computed(() => {
      var _a, _b;
      return ((_a = currentSpecOption.value) == null ? void 0 : _a.status) === "1" || parseInt(((_b = currentSpecOption.value) == null ? void 0 : _b.retailStock) || "0") < 1;
    });
    let loaded = false;
    const getCombination = async (senior = false) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const { data } = await getCombinationApi({
        code: currentSpecOption.value.code,
        ratio: goodsDetail.value.ratio,
        dimensionId: currentSizeId.value || null
      });
      sizeOptions.value = data.size || [];
      innerFrame.value = data.parts.inner_frame[0];
      frameOptions.value = [
        notFrame,
        innerFrame.value,
        ...((_a = data.parts) == null ? void 0 : _a.frame) || []
      ];
      hasMat.value = !!((_c = (_b = data.parts) == null ? void 0 : _b.mat) == null ? void 0 : _c.length);
      if (hasMat.value) {
        materialOptions.value = [
          ...data.parts.mat,
          noMat
        ];
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
          chooseMatWidth(((_d = materialOptions.value[0].specs[0]) == null ? void 0 : _d.matWidth) || "");
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
        if (!hasMat.value || !((_f = (_e = currentFrameOption.value) == null ? void 0 : _e.config) == null ? void 0 : _f.matSupport)) {
          currentMaterialId.value = "";
          chooseMatWidth("");
        } else {
          currentMaterialId.value = materialOptions.value[0].id;
          chooseMatWidth(((_g = materialOptions.value[0].specs[0]) == null ? void 0 : _g.matWidth) || "");
        }
      }
      loaded = true;
      generateStepIndex();
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
    const chooseFrame = (item) => {
      var _a, _b;
      currentFrameId.value = item.id;
      generateStepIndex();
      if (hasMat.value) {
        if (!((_a = item.config) == null ? void 0 : _a.matSupport)) {
          currentMaterialId.value = "";
          chooseMatWidth("");
        } else if (currentMaterialId.value === "") {
          currentMaterialId.value = materialOptions.value[0].id;
          chooseMatWidth(((_b = materialOptions.value[0].specs[0]) == null ? void 0 : _b.matWidth) || "");
        }
      }
    };
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
    const chooseMatColor = (item) => {
      currentMaterialId.value = item.id;
      if (!!item.id) {
        if (!currentMaterialWidth.value) {
          chooseMatWidth(currentMaterialOption.value.specs[0].matWidth);
        }
      } else {
        chooseMatWidth("");
      }
    };
    const currentMaterialWidth = ref("");
    const currentMaterialWidthOption = computed(() => {
      var _a;
      return ((_a = currentMaterialOption.value) == null ? void 0 : _a.specs) || [];
    });
    const chooseMatWidth = (width) => {
      currentMaterialWidth.value = width;
    };
    const matVisible = computed(() => {
      var _a;
      return ((_a = currentFrameOption.value.config) == null ? void 0 : _a.matSupport) && hasMat.value;
    });
    const totalPrice = computed(() => {
      var _a, _b;
      const sizePrice = ((_a = currentSizeOption.value) == null ? void 0 : _a.price) || 0;
      const framePrice = frameMoney.value || 0;
      const matPrice = !!currentMaterialId.value && hasFrame.value ? ((_b = currentMaterialOption.value) == null ? void 0 : _b.price) || 0 : 0;
      return Number(sizePrice) + Number(framePrice) + Number(matPrice);
    });
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
        "Mat Width": currentMaterialWidth.value + "\u2033"
      };
      return parts2;
    });
    const addToCart = () => {
      var _a;
      const cartRow = {
        productId: goodsDetail.value.id,
        // 商品ID
        techniqueId: goodsDetail.value.techniqueId,
        // 工艺编号
        title: goodsDetail.value.title,
        // 商品标题
        deliveryType: goodsDetail.value.deliveryType || "0",
        // 配送方式
        retailPrice: totalPrice.value,
        // 商品售价
        redeemPoints: goodsDetail.value.redeemPoints,
        // 商品积分
        img: goodsDetail.value.img,
        // 商品图片
        shopId: (_a = goodsDetail.value.merchant) == null ? void 0 : _a.id,
        // 商家编号
        specsId: currentSpecId,
        // 商品规格编号
        specs: specs.value,
        // 商品规格值
        quantity: 1,
        // 购买数量
        dimensionId: currentSizeId.value,
        // 尺寸编号
        parts: parts.value
        // 商品配件
      };
      cartStore.addition(cartRow);
      ElMessage.success("Add to cart success!");
      $bus.emit("openCartWindow");
    };
    const checkButtonRef = ref();
    const checkPopoverRef = ref();
    const onClickOutside = () => {
      var _a, _b;
      (_b = (_a = unref(checkPopoverRef).popperRef) == null ? void 0 : _a.delayHide) == null ? void 0 : _b.call(_a);
    };
    const relatedList = ref([]);
    ref([]);
    const wallColorRef = ref();
    const openWallColor = () => {
      var _a;
      (_a = wallColorRef.value) == null ? void 0 : _a.open();
    };
    const roomRef = ref();
    const openRoom = () => {
      var _a;
      (_a = roomRef.value) == null ? void 0 : _a.open();
    };
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
      var _a;
      (_a = loginWindowRef.value) == null ? void 0 : _a.open();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
      const _component_ClientOnly = __nuxt_component_1$2;
      const _component_ImageGenerator = __nuxt_component_1;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      const _component_el_collapse = ElCollapse;
      const _component_el_collapse_item = ElCollapseItem;
      const _component_el_dialog = ElDialog;
      const _component_el_popover = ElPopover;
      const _directive_click_outside = resolveDirective("click-outside");
      _push(`<!--[--><section data-v-24101095>`);
      if (!unref(appStore).isPc) {
        _push(`<div class="app-preview aspect-ratio" data-v-24101095><div class="img-wrapper acea-row row-center-wrapper flex-1 scroll-y" data-v-24101095>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div><div class="acea-row row-evenly py-20" data-v-24101095><div class="acea-row row-middle cursor-pointer" data-v-24101095><span class="iconfont icon-user-defined text-20" data-v-24101095></span><span class="text-14 ml-10" data-v-24101095>SELECT WALL COLOR</span></div><div class="acea-row row-middle cursor-pointer" data-v-24101095><span class="iconfont icon-pictures text-20" data-v-24101095></span><span class="text-14 ml-10" data-v-24101095>VIEW PAINTING IN A ROOM</span></div></div><div class="btn" data-v-24101095>PREVIEW</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(appStore).isPc) {
        _push(`<div class="app-title px-20 pt-20 acea-row row-between-wrapper" data-v-24101095><p style="${ssrRenderStyle({ "font-size": "20px" })}" class="f-bold-500 flex-1 mr-10" data-v-24101095>${ssrInterpolate(unref(goodsDetail).title)}</p><span class="iconfont icon-follow text-40 mr-10 cursor-pointer" style="${ssrRenderStyle(!unref(isThumbs) ? null : { display: "none" })}" data-v-24101095></span><span class="iconfont icon-follow-fill text-40 mr-10 cursor-pointer text-error" style="${ssrRenderStyle(unref(isThumbs) ? null : { display: "none" })}" data-v-24101095></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-24101095><div class="spu-wrapper row pt-md-50 pt-20" data-v-24101095>`);
      if (unref(appStore).isPc) {
        _push(`<div class="col-sm-6" data-v-24101095>`);
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
              _push2(`<div class="acea-row my-10" data-v-24101095${_scopeId}>`);
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
              _push2(`</div><div data-v-24101095${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "h1",
                style: { "width": "20%" }
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-24101095${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "p",
                style: { "width": "30%" }
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-24101095${_scopeId}>`);
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
            var _a2, _b2;
            if (_push2) {
              _push2(`<div class="spu-preview border-sm" data-v-24101095${_scopeId}><div class="p-md-20 p-15 border-b-sm" data-v-24101095${_scopeId}><p class="text-22 f-bold-500" data-v-24101095${_scopeId}>${ssrInterpolate(unref(goodsDetail).title)}</p></div><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-24101095${_scopeId}><div data-v-24101095${_scopeId}><p class="text-22 f-bold-500 cursor-pointer text-underline" data-v-24101095${_scopeId}> by:${ssrInterpolate((_a2 = unref(goodsDetail).creator) == null ? void 0 : _a2.name)}</p><p class="text-18 text-gray-600 mt-10" data-v-24101095${_scopeId}>`);
              if (unref(goodsDetail).techniqueId === "3000012") {
                _push2(`<span data-v-24101095${_scopeId}>Hand-painted oil painting</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(goodsDetail).techniqueId === "3000013") {
                _push2(`<span data-v-24101095${_scopeId}>Print painting</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(goodsDetail).techniqueId === "3000014") {
                _push2(`<span data-v-24101095${_scopeId}>Relief painting</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p></div><div data-v-24101095${_scopeId}><span class="iconfont icon-follow text-40 mr-10 cursor-pointer" style="${ssrRenderStyle(!unref(isThumbs) ? null : { display: "none" })}" data-v-24101095${_scopeId}></span><span class="iconfont icon-follow-fill text-40 mr-10 cursor-pointer text-error" style="${ssrRenderStyle(unref(isThumbs) ? null : { display: "none" })}" data-v-24101095${_scopeId}></span><span class="iconfont icon-quanping text-40 cursor-pointer" data-v-24101095${_scopeId}></span></div></div><div class="preview-box" data-v-24101095${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
              _push2(`</div><div class="acea-row row-evenly py-20" data-v-24101095${_scopeId}><div class="acea-row row-middle cursor-pointer" data-v-24101095${_scopeId}><span class="iconfont icon-user-defined text-20" data-v-24101095${_scopeId}></span><span class="text-14 ml-10" data-v-24101095${_scopeId}>SELECT WALL COLOR</span></div><div class="acea-row row-middle cursor-pointer" data-v-24101095${_scopeId}><span class="iconfont icon-pictures text-20" data-v-24101095${_scopeId}></span><span class="text-14 ml-10" data-v-24101095${_scopeId}>VIEW PAINTING IN A ROOM</span></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "spu-preview border-sm" }, [
                  createVNode("div", { class: "p-md-20 p-15 border-b-sm" }, [
                    createVNode("p", { class: "text-22 f-bold-500" }, toDisplayString(unref(goodsDetail).title), 1)
                  ]),
                  createVNode("div", { class: "acea-row row-between-wrapper p-md-20 p-15" }, [
                    createVNode("div", null, [
                      createVNode("p", {
                        class: "text-22 f-bold-500 cursor-pointer text-underline",
                        onClick: handleClickArtist
                      }, " by:" + toDisplayString((_b2 = unref(goodsDetail).creator) == null ? void 0 : _b2.name), 1),
                      createVNode("p", { class: "text-18 text-gray-600 mt-10" }, [
                        unref(goodsDetail).techniqueId === "3000012" ? (openBlock(), createBlock("span", { key: 0 }, "Hand-painted oil painting")) : createCommentVNode("", true),
                        unref(goodsDetail).techniqueId === "3000013" ? (openBlock(), createBlock("span", { key: 1 }, "Print painting")) : createCommentVNode("", true),
                        unref(goodsDetail).techniqueId === "3000014" ? (openBlock(), createBlock("span", { key: 2 }, "Relief painting")) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      withDirectives(createVNode("span", {
                        class: "iconfont icon-follow text-40 mr-10 cursor-pointer",
                        onClick: unref(productThumbs)
                      }, null, 8, ["onClick"]), [
                        [vShow, !unref(isThumbs)]
                      ]),
                      withDirectives(createVNode("span", {
                        class: "iconfont icon-follow-fill text-40 mr-10 cursor-pointer text-error",
                        onClick: unref(productThumbs)
                      }, null, 8, ["onClick"]), [
                        [vShow, unref(isThumbs)]
                      ]),
                      createVNode("span", {
                        class: "iconfont icon-quanping text-40 cursor-pointer",
                        onClick: ($event) => imgViewVisible.value = true
                      }, null, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "preview-box" }, [
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => {
                        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r, _s, _t, _u, _v, _w, _x;
                        return [
                          unref(goodsDetail).id ? (openBlock(), createBlock(_component_ImageGenerator, {
                            key: 0,
                            modelValue: unref(generatorImg),
                            "onUpdate:modelValue": ($event) => isRef(generatorImg) ? generatorImg.value = $event : null,
                            pixel: unref(pixel),
                            "onUpdate:pixel": ($event) => isRef(pixel) ? pixel.value = $event : null,
                            shape: unref(goodsDetail).shape,
                            "core-image": unref(imagePrefix)(unref(goodsDetail).img),
                            "has-mat": unref(hasFrame) && unref(matVisible) && !!unref(currentMaterialId),
                            "mat-thickness": unref(currentMaterialWidth).toString(),
                            "mat-color": ((_b3 = (_a3 = unref(currentMaterialOption)) == null ? void 0 : _a3.config) == null ? void 0 : _b3.matColor) || "",
                            "has-frame": unref(hasFrame),
                            "inner-frame": unref(isInnerFrame),
                            "embedded-frame": !((_d2 = (_c2 = unref(currentFrameOption)) == null ? void 0 : _c2.config) == null ? void 0 : _d2.matSupport),
                            "frame-cm": (_f2 = (_e2 = unref(currentFrameOption)) == null ? void 0 : _e2.config) == null ? void 0 : _f2.thickness,
                            "size-cm": {
                              width: Number((_g2 = unref(currentSizeOption)) == null ? void 0 : _g2.widthInCm),
                              length: Number((_h2 = unref(currentSizeOption)) == null ? void 0 : _h2.lengthInCm)
                            },
                            "frame-corner-images": [
                              unref(imagePrefix)((_j2 = (_i2 = unref(currentFrameOption)) == null ? void 0 : _i2.config) == null ? void 0 : _j2.lt),
                              unref(imagePrefix)((_l2 = (_k2 = unref(currentFrameOption)) == null ? void 0 : _k2.config) == null ? void 0 : _l2.rt),
                              unref(imagePrefix)((_n2 = (_m2 = unref(currentFrameOption)) == null ? void 0 : _m2.config) == null ? void 0 : _n2.lb),
                              unref(imagePrefix)((_p2 = (_o2 = unref(currentFrameOption)) == null ? void 0 : _o2.config) == null ? void 0 : _p2.rb)
                            ],
                            "frame-side-images": [
                              unref(imagePrefix)((_r = (_q2 = unref(currentFrameOption)) == null ? void 0 : _q2.config) == null ? void 0 : _r.ct),
                              unref(imagePrefix)((_t = (_s = unref(currentFrameOption)) == null ? void 0 : _s.config) == null ? void 0 : _t.cb),
                              unref(imagePrefix)((_v = (_u = unref(currentFrameOption)) == null ? void 0 : _u.config) == null ? void 0 : _v.cl),
                              unref(imagePrefix)((_x = (_w = unref(currentFrameOption)) == null ? void 0 : _w.config) == null ? void 0 : _x.cr)
                            ],
                            onChange: handleImageChange
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "pixel", "onUpdate:pixel", "shape", "core-image", "has-mat", "mat-thickness", "mat-color", "has-frame", "inner-frame", "embedded-frame", "frame-cm", "size-cm", "frame-corner-images", "frame-side-images"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 2
                    }, 1024)
                  ]),
                  createVNode("div", { class: "acea-row row-evenly py-20" }, [
                    createVNode("div", {
                      class: "acea-row row-middle cursor-pointer",
                      onClick: openWallColor
                    }, [
                      createVNode("span", { class: "iconfont icon-user-defined text-20" }),
                      createVNode("span", { class: "text-14 ml-10" }, "SELECT WALL COLOR")
                    ]),
                    createVNode("div", {
                      class: "acea-row row-middle cursor-pointer",
                      onClick: openRoom
                    }, [
                      createVNode("span", { class: "iconfont icon-pictures text-20" }),
                      createVNode("span", { class: "text-14 ml-10" }, "VIEW PAINTING IN A ROOM")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="col-sm-6" data-v-24101095>`);
      _push(ssrRenderComponent(_component_el_skeleton, {
        loading: unref(isSkeleton),
        animated: ""
      }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-24101095${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "50%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="my-10" data-v-24101095${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "20%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="acea-row my-10" data-v-24101095${_scopeId}>`);
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
            _push2(`</div><div class="my-10" data-v-24101095${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "20%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="acea-row my-10" data-v-24101095${_scopeId}>`);
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
            _push2(`</div><div class="acea-row row-right my-10" data-v-24101095${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "p",
              style: { "width": "30%" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="my-10" data-v-24101095${_scopeId}>`);
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
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<div class="spu-spec border-sm" data-v-24101095${_scopeId}>`);
            if (unref(specsCombination).length > 1) {
              _push2(`<!--[--><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-24101095${_scopeId}><div class="acea-row row-middle flex-1 mr-10" data-v-24101095${_scopeId}><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-24101095${_scopeId}></span><span class="text-26" data-v-24101095${_scopeId}>Choose a Craft</span></div></div><div class="p-md-20 p-15" data-v-24101095${_scopeId}><div class="width-list row" data-v-24101095${_scopeId}><!--[-->`);
              ssrRenderList(unref(specsCombination), (item) => {
                _push2(`<div class="col-6" data-v-24101095${_scopeId}><div class="${ssrRenderClass([{ "border-gray-700": unref(currentSpecId) === item.id }, "width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"])}" data-v-24101095${_scopeId}>${ssrInterpolate(item.craft)}</div></div>`);
              });
              _push2(`<!--]--></div></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="acea-row row-between-wrapper p-md-20 p-15" data-v-24101095${_scopeId}><div class="acea-row row-middle flex-1 mr-10" data-v-24101095${_scopeId}><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-24101095${_scopeId}></span><span class="text-26" data-v-24101095${_scopeId}>Choose a Size</span><span class="text-26 text-gray-400 pc" data-v-24101095${_scopeId}>\xA0\xA0(inches)</span></div><div class="text-20 f-bold" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_a2 = unref(currentSizeOption)) == null ? void 0 : _a2.price) || 0))}</div></div><div class="p-md-20 p-15" data-v-24101095${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_select, {
              class: "custom-select",
              modelValue: unref(currentSizeId),
              "onUpdate:modelValue": ($event) => isRef(currentSizeId) ? currentSizeId.value = $event : null,
              placeholder: "Please Select Size",
              size: "large",
              onChange: chooseSize
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="size-prefix" data-v-24101095${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "size-prefix" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(sizeOptions), (item) => {
                    _push3(ssrRenderComponent(_component_el_option, {
                      key: item.id,
                      label: item.name,
                      value: item.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="option-item acea-row row-between-wrapper" data-v-24101095${_scopeId3}><span data-v-24101095${_scopeId3}>${ssrInterpolate(item.name)}</span><span data-v-24101095${_scopeId3}>${ssrInterpolate(unref(currencyStore).formatToCurrency(item.price || 0))}</span></div>`);
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
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
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
            }, _parent2, _scopeId));
            _push2(`</div><div class="px-md-20 px-15 py-10 text-20" data-v-24101095${_scopeId}><span class="iconfont icon-info-fill text-20 mr-6" data-v-24101095${_scopeId}></span><span class="f-bold" data-v-24101095${_scopeId}>Note:</span> To order a custom size, <a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}`)} class="text-underline cursor-pointer" data-v-24101095${_scopeId}>click here</a>. Our artists will create a painting in any size you require. </div><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-24101095${_scopeId}><div class="acea-row row-middle flex-1 mr-10" data-v-24101095${_scopeId}><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-24101095${_scopeId}></span><span class="text-26" data-v-24101095${_scopeId}>Choose a Frame</span><span class="text-26 text-gray-400 pc" data-v-24101095${_scopeId}>\xA0\xA0(100+ styles)</span></div><div class="text-20 f-bold" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(frameMoney) || 0))}</div></div><div class="p-md-20 p-15" data-v-24101095${_scopeId}><div class="frame-scroll scroll-y border-sm p-10" data-v-24101095${_scopeId}><div class="frame-list row" data-v-24101095${_scopeId}><!--[-->`);
            ssrRenderList(unref(frameOptions), (item, index) => {
              _push2(`<div class="col-2xl-2 col-xl-average col-md-3 col-xs-3 col-4" data-v-24101095${_scopeId}><div class="${ssrRenderClass([{ on: unref(currentFrameId) === item.id }, "frame-item text-14 bg-gray-100 p-5 cursor-pointer"])}" data-v-24101095${_scopeId}><div class="frame-box" data-v-24101095${_scopeId}><div class="frame-img aspect-ratio" data-v-24101095${_scopeId}><img class="w-full h-full fit-cover"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-24101095${_scopeId}></div><p class="line2 mt-10 frame-name" data-v-24101095${_scopeId}>${ssrInterpolate(item.name)}</p><p class="f-bold-500 frame-money" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(Number(item.price) + Number(item.surcharge) || 0))}</p></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
            if (unref(hasFrame) && unref(matVisible)) {
              _push2(`<!--[--><div class="acea-row row-between-wrapper p-md-20 p-15" data-v-24101095${_scopeId}><div class="acea-row row-middle flex-1 mr-10" data-v-24101095${_scopeId}><span class="text-30 f-bold mr-md-20 mr-10 step-index" data-v-24101095${_scopeId}></span><span class="text-26" data-v-24101095${_scopeId}>Choose a Canvas material</span></div><div class="text-20 f-bold" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_b2 = unref(currentMaterialOption)) == null ? void 0 : _b2.price) || 0))}</div></div><div class="p-md-20 p-15" data-v-24101095${_scopeId}><div class="material-wrapper border-sm p-md-20 p-15" data-v-24101095${_scopeId}><div class="acea-row row-middle text-20 f-bold-500" data-v-24101095${_scopeId}><p class="mr-xl-40 mr-20" data-v-24101095${_scopeId}>Mat Color</p><p class="flex-1 line1" data-v-24101095${_scopeId}>Crisp Bright White</p></div><div class="color-list my-md-20 my-15" data-v-24101095${_scopeId}><!--[-->`);
              ssrRenderList(unref(materialOptions), (item, index) => {
                var _a3;
                _push2(`<div class="${ssrRenderClass([{ on: unref(currentMaterialId) === item.id }, "color-item rounded-full cursor-pointer"])}" style="${ssrRenderStyle({ background: (_a3 = item.config) == null ? void 0 : _a3.matColor })}" data-v-24101095${_scopeId}>`);
                if (item.id === "") {
                  _push2(`<span class="iconfont icon-close" data-v-24101095${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
              if (unref(currentMaterialWidthOption).length) {
                _push2(`<!--[--><div class="acea-row row-middle text-20 f-bold-500" data-v-24101095${_scopeId}><p class="mr-xl-40 mr-20" data-v-24101095${_scopeId}>Mat Width</p><p class="flex-1 line1" data-v-24101095${_scopeId}>Increasing the mat width mayaffectthe frame price.</p></div><div class="width-list row mt-md-20 mt-15" data-v-24101095${_scopeId}><!--[-->`);
                ssrRenderList(unref(currentMaterialWidthOption), (item, index) => {
                  _push2(`<div class="col-average" data-v-24101095${_scopeId}><div class="${ssrRenderClass([{ "border-gray-700": unref(currentMaterialWidth) === item.matWidth }, "width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10"])}" data-v-24101095${_scopeId}>${ssrInterpolate(item.matWidth)}\u2033 </div></div>`);
                });
                _push2(`<!--]--></div><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="acea-row row-middle px-md-20 px-15 py-10" data-v-24101095${_scopeId}><span class="iconfont icon-info-fill text-20" data-v-24101095${_scopeId}></span><span class="ml-6 text-20 text-underline cursor-pointer flex-1 line1" data-v-24101095${_scopeId}><span class="f-bold" data-v-24101095${_scopeId}>Click here:</span> Summary of differences. </span></div><div class="p-md-20 p-15 f-bold-500 text-16 border-t-sm" data-v-24101095${_scopeId}><p data-v-24101095${_scopeId}>Product Parameter</p><!--[-->`);
            ssrRenderList(unref(specs), (val, key) => {
              _push2(`<p class="mt-10" data-v-24101095${_scopeId}>${ssrInterpolate(key)}: ${ssrInterpolate(val)}</p>`);
            });
            _push2(`<!--]--></div><div class="border-t-sm p-md-20 p-15 text-16 f-bold-500" data-v-24101095${_scopeId}> All framing includes free canvas stretching, mounting &amp; wall hooks.Your framed oil painting will arrive to your door ready to hang on your wall. </div><div class="p-md-20 p-15 acea-row row-between-wrapper text-20 bg-gray-100" data-v-24101095${_scopeId}><p class="f-bold-500" data-v-24101095${_scopeId}> Price Details <span${ssrRenderAttrs(mergeProps({
              class: "text-underline cursor-pointer",
              ref_key: "checkButtonRef",
              ref: checkButtonRef
            }, ssrGetDirectiveProps(_ctx, _directive_click_outside, onClickOutside)))} data-v-24101095${_scopeId}> Check </span></p><p class="f-bold" data-v-24101095${_scopeId}>Total\uFF1A<span class="text-26 text-error" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(totalPrice) || 0))}</span></p></div>`);
            _push2(ssrRenderComponent(_component_el_button, {
              style: { "border-radius": "0" },
              class: "w-full",
              size: "large",
              type: "danger",
              onClick: addToCart,
              disabled: unref(isBan)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(isBan) ? "Sold Out" : "Add To Cart")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(isBan) ? "Sold Out" : "Add To Cart"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "spu-spec border-sm" }, [
                unref(specsCombination).length > 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", { class: "acea-row row-between-wrapper p-md-20 p-15" }, [
                    createVNode("div", { class: "acea-row row-middle flex-1 mr-10" }, [
                      createVNode("span", { class: "text-30 f-bold mr-md-20 mr-10 step-index" }),
                      createVNode("span", { class: "text-26" }, "Choose a Craft")
                    ])
                  ]),
                  createVNode("div", { class: "p-md-20 p-15" }, [
                    createVNode("div", { class: "width-list row" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(specsCombination), (item) => {
                        return openBlock(), createBlock("div", {
                          class: "col-6",
                          key: item.id
                        }, [
                          createVNode("div", {
                            class: ["width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10", { "border-gray-700": unref(currentSpecId) === item.id }],
                            onClick: ($event) => chooseTechnique(item)
                          }, toDisplayString(item.craft), 11, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ])
                ], 64)) : createCommentVNode("", true),
                createVNode("div", { class: "acea-row row-between-wrapper p-md-20 p-15" }, [
                  createVNode("div", { class: "acea-row row-middle flex-1 mr-10" }, [
                    createVNode("span", { class: "text-30 f-bold mr-md-20 mr-10 step-index" }),
                    createVNode("span", { class: "text-26" }, "Choose a Size"),
                    createVNode("span", { class: "text-26 text-gray-400 pc" }, "\xA0\xA0(inches)")
                  ]),
                  createVNode("div", { class: "text-20 f-bold" }, toDisplayString(unref(currencyStore).formatToCurrency(((_c2 = unref(currentSizeOption)) == null ? void 0 : _c2.price) || 0)), 1)
                ]),
                createVNode("div", { class: "p-md-20 p-15" }, [
                  createVNode(_component_el_select, {
                    class: "custom-select",
                    modelValue: unref(currentSizeId),
                    "onUpdate:modelValue": ($event) => isRef(currentSizeId) ? currentSizeId.value = $event : null,
                    placeholder: "Please Select Size",
                    size: "large",
                    onChange: chooseSize
                  }, {
                    prefix: withCtx(() => [
                      createVNode("div", { class: "size-prefix" })
                    ]),
                    default: withCtx(() => [
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
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "px-md-20 px-15 py-10 text-20" }, [
                  createVNode("span", { class: "iconfont icon-info-fill text-20 mr-6" }),
                  createVNode("span", { class: "f-bold" }, "Note:"),
                  createTextVNode(" To order a custom size, "),
                  createVNode("a", {
                    href: `mailto:${unref(CONTACT_EMAIL)}`,
                    class: "text-underline cursor-pointer"
                  }, "click here", 8, ["href"]),
                  createTextVNode(". Our artists will create a painting in any size you require. ")
                ]),
                createVNode("div", { class: "acea-row row-between-wrapper p-md-20 p-15" }, [
                  createVNode("div", { class: "acea-row row-middle flex-1 mr-10" }, [
                    createVNode("span", { class: "text-30 f-bold mr-md-20 mr-10 step-index" }),
                    createVNode("span", { class: "text-26" }, "Choose a Frame"),
                    createVNode("span", { class: "text-26 text-gray-400 pc" }, "\xA0\xA0(100+ styles)")
                  ]),
                  createVNode("div", { class: "text-20 f-bold" }, toDisplayString(unref(currencyStore).formatToCurrency(unref(frameMoney) || 0)), 1)
                ]),
                createVNode("div", { class: "p-md-20 p-15" }, [
                  createVNode("div", { class: "frame-scroll scroll-y border-sm p-10" }, [
                    createVNode("div", { class: "frame-list row" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(frameOptions), (item, index) => {
                        return openBlock(), createBlock("div", {
                          class: "col-2xl-2 col-xl-average col-md-3 col-xs-3 col-4",
                          key: item.id
                        }, [
                          createVNode("div", {
                            class: ["frame-item text-14 bg-gray-100 p-5 cursor-pointer", { on: unref(currentFrameId) === item.id }],
                            onClick: ($event) => chooseFrame(item)
                          }, [
                            createVNode("div", { class: "frame-box" }, [
                              createVNode("div", { class: "frame-img aspect-ratio" }, [
                                createVNode("img", {
                                  class: "w-full h-full fit-cover",
                                  src: unref(imagePrefix)(item.img),
                                  alt: ""
                                }, null, 8, ["src"])
                              ]),
                              createVNode("p", { class: "line2 mt-10 frame-name" }, toDisplayString(item.name), 1),
                              createVNode("p", { class: "f-bold-500 frame-money" }, toDisplayString(unref(currencyStore).formatToCurrency(Number(item.price) + Number(item.surcharge) || 0)), 1)
                            ])
                          ], 10, ["onClick"])
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                unref(hasFrame) && unref(matVisible) ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { class: "acea-row row-between-wrapper p-md-20 p-15" }, [
                    createVNode("div", { class: "acea-row row-middle flex-1 mr-10" }, [
                      createVNode("span", { class: "text-30 f-bold mr-md-20 mr-10 step-index" }),
                      createVNode("span", { class: "text-26" }, "Choose a Canvas material")
                    ]),
                    createVNode("div", { class: "text-20 f-bold" }, toDisplayString(unref(currencyStore).formatToCurrency(((_d2 = unref(currentMaterialOption)) == null ? void 0 : _d2.price) || 0)), 1)
                  ]),
                  createVNode("div", { class: "p-md-20 p-15" }, [
                    createVNode("div", { class: "material-wrapper border-sm p-md-20 p-15" }, [
                      createVNode("div", { class: "acea-row row-middle text-20 f-bold-500" }, [
                        createVNode("p", { class: "mr-xl-40 mr-20" }, "Mat Color"),
                        createVNode("p", { class: "flex-1 line1" }, "Crisp Bright White")
                      ]),
                      createVNode("div", { class: "color-list my-md-20 my-15" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(materialOptions), (item, index) => {
                          var _a3;
                          return openBlock(), createBlock("div", {
                            class: ["color-item rounded-full cursor-pointer", { on: unref(currentMaterialId) === item.id }],
                            style: { background: (_a3 = item.config) == null ? void 0 : _a3.matColor },
                            key: index,
                            onClick: ($event) => chooseMatColor(item)
                          }, [
                            item.id === "" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "iconfont icon-close"
                            })) : createCommentVNode("", true)
                          ], 14, ["onClick"]);
                        }), 128))
                      ]),
                      unref(currentMaterialWidthOption).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("div", { class: "acea-row row-middle text-20 f-bold-500" }, [
                          createVNode("p", { class: "mr-xl-40 mr-20" }, "Mat Width"),
                          createVNode("p", { class: "flex-1 line1" }, "Increasing the mat width mayaffectthe frame price.")
                        ]),
                        createVNode("div", { class: "width-list row mt-md-20 mt-15" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(currentMaterialWidthOption), (item, index) => {
                            return openBlock(), createBlock("div", {
                              class: "col-average",
                              key: index
                            }, [
                              createVNode("div", {
                                class: ["width-item border-sm acea-row row-center-wrapper cursor-pointer text-14 py-xl-20 py-md-15 py-10", { "border-gray-700": unref(currentMaterialWidth) === item.matWidth }],
                                onClick: ($event) => chooseMatWidth(item.matWidth)
                              }, toDisplayString(item.matWidth) + "\u2033 ", 11, ["onClick"])
                            ]);
                          }), 128))
                        ])
                      ], 64)) : createCommentVNode("", true)
                    ])
                  ])
                ], 64)) : createCommentVNode("", true),
                createVNode("div", { class: "acea-row row-middle px-md-20 px-15 py-10" }, [
                  createVNode("span", { class: "iconfont icon-info-fill text-20" }),
                  createVNode("span", {
                    class: "ml-6 text-20 text-underline cursor-pointer flex-1 line1",
                    onClick: ($event) => centerDialogVisible.value = true
                  }, [
                    createVNode("span", { class: "f-bold" }, "Click here:"),
                    createTextVNode(" Summary of differences. ")
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "p-md-20 p-15 f-bold-500 text-16 border-t-sm" }, [
                  createVNode("p", null, "Product Parameter"),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(specs), (val, key) => {
                    return openBlock(), createBlock("p", { class: "mt-10" }, toDisplayString(key) + ": " + toDisplayString(val), 1);
                  }), 256))
                ]),
                createVNode("div", { class: "border-t-sm p-md-20 p-15 text-16 f-bold-500" }, " All framing includes free canvas stretching, mounting & wall hooks.Your framed oil painting will arrive to your door ready to hang on your wall. "),
                createVNode("div", { class: "p-md-20 p-15 acea-row row-between-wrapper text-20 bg-gray-100" }, [
                  createVNode("p", { class: "f-bold-500" }, [
                    createTextVNode(" Price Details "),
                    withDirectives((openBlock(), createBlock("span", {
                      class: "text-underline cursor-pointer",
                      ref_key: "checkButtonRef",
                      ref: checkButtonRef
                    }, [
                      createTextVNode(" Check ")
                    ])), [
                      [_directive_click_outside, onClickOutside]
                    ])
                  ]),
                  createVNode("p", { class: "f-bold" }, [
                    createTextVNode("Total\uFF1A"),
                    createVNode("span", { class: "text-26 text-error" }, toDisplayString(unref(currencyStore).formatToCurrency(unref(totalPrice) || 0)), 1)
                  ])
                ]),
                createVNode(_component_el_button, {
                  style: { "border-radius": "0" },
                  class: "w-full",
                  size: "large",
                  type: "danger",
                  onClick: addToCart,
                  disabled: unref(isBan)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(isBan) ? "Sold Out" : "Add To Cart"), 1)
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
        _push(`<section class="mt-lg-60 mt-sm-20" data-v-24101095><div class="container" data-v-24101095><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-24101095>About the Artist</h1><div class="artist-box acea-row gap-base" data-v-24101095>`);
        if ((_a = unref(goodsDetail).creator) == null ? void 0 : _a.portrait) {
          _push(`<div class="avatar" data-v-24101095><img class="w-full"${ssrRenderAttr("src", unref(imagePrefix)((_b = unref(goodsDetail).creator) == null ? void 0 : _b.portrait))} alt="avatar" data-v-24101095></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="info flex-1 text-gray-600" data-v-24101095><p class="text-16 f-bold-500" data-v-24101095>${ssrInterpolate(((_c = unref(goodsDetail).creator) == null ? void 0 : _c.timeline) || "--")}</p><p class="text-20 f-bold-500 text-gray-700 my-10" data-v-24101095>${ssrInterpolate((_d = unref(goodsDetail).creator) == null ? void 0 : _d.name)}</p><p class="text-18" data-v-24101095>${ssrInterpolate((_e = unref(goodsDetail).creator) == null ? void 0 : _e.intro)}</p></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="mt-lg-60 mt-sm-20" data-v-24101095><div class="container" data-v-24101095><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-24101095>Commitment to Quality</h1><div class="quality-list" data-v-24101095><div class="quality-item acea-row gap-base" data-v-24101095><div class="p-img" data-v-24101095><img class="w-full"${ssrRenderAttr("src", _imports_0)} alt="" data-v-24101095></div><div class="info flex-1" data-v-24101095><p class="text-20 f-bold-500" data-v-24101095>High-Quality Framed Art Prints</p><p class="mt-10 text-16 text-gray-600" data-v-24101095> Our high-end framed wall art is printed on premium paper using non-toxic, archival inks that protect against UV light to resist fading. Experience unmatched quality and style as you choose from a wide range of designs to enhance your room d\xE9cor. </p></div></div><div class="quality-item acea-row gap-base" data-v-24101095><div class="p-img" data-v-24101095><img class="w-full"${ssrRenderAttr("src", _imports_1)} alt="" data-v-24101095></div><div class="info flex-1" data-v-24101095><p class="text-20 f-bold-500" data-v-24101095>Professionally Crafted Framed Wall Art</p><p class="mt-10 text-16 text-gray-600" data-v-24101095> Attention to detail is at the heart of our process, as we exclusively use 100% solid wood frames that include 4-ply white core matboard and durable, frame-grade clear acrylic for clarity, long-lasting protection of the artwork and unrivaled quality. With a thoughtfully selected frame and mat combination, this piece is designed to complement your art and create a visually appealing display. </p></div></div><div class="quality-item acea-row gap-base" data-v-24101095><div class="p-img" data-v-24101095><img class="w-full"${ssrRenderAttr("src", _imports_2)} alt="" data-v-24101095></div><div class="info flex-1" data-v-24101095><p class="text-20 f-bold-500" data-v-24101095>Easy-to-Hang &amp; Ready-to-Display Artwork</p><p class="mt-10 text-16 text-gray-600" data-v-24101095> Each framed art piece comes with hanging hardware affixed to the back of the frame, allowing for easy and convenient installation. Handcrafted in the USA. Ready to display right out of the box. Handcrafted in the USA. </p></div></div></div></div></section>`);
      if (unref(relatedList).length) {
        _push(`<section class="mt-lg-60 mt-sm-20" data-v-24101095><div class="container" data-v-24101095><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-24101095>Product Related</h1>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      if ((_g = (_f = unref(goodsDetail)) == null ? void 0 : _f.brand) == null ? void 0 : _g.id) {
        _push(`<section class="mt-lg-60 mt-sm-20" data-v-24101095><div class="container" data-v-24101095><div class="brand-topic mb-20" data-v-24101095><div class="brand-topic-caption text-white text-26" data-v-24101095><p data-v-24101095>${ssrInterpolate((_i = (_h = unref(goodsDetail)) == null ? void 0 : _h.brand) == null ? void 0 : _i.name)}</p><p class="text-60 f-bold my-xs-20 my-15" data-v-24101095>${ssrInterpolate((_k = (_j = unref(goodsDetail)) == null ? void 0 : _j.brand) == null ? void 0 : _k.title)}</p><p data-v-24101095>${ssrInterpolate((_m = (_l = unref(goodsDetail)) == null ? void 0 : _l.brand) == null ? void 0 : _m.intro)}</p></div><button class="caption-btn text-28 p-xs-20 p-15" data-v-24101095> Brand Home <span class="iconfont icon-right-arrow text-28 ml-xs-60 ml-30" data-v-24101095></span></button><img class="w-full pc"${ssrRenderAttr("src", unref(imagePrefix)((_o = (_n = unref(goodsDetail)) == null ? void 0 : _n.brand) == null ? void 0 : _o.background))} alt="" data-v-24101095><img class="w-full app"${ssrRenderAttr("src", unref(imagePrefix)((_q = (_p = unref(goodsDetail)) == null ? void 0 : _p.brand) == null ? void 0 : _q.img))} alt="" data-v-24101095></div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="mt-lg-60 mt-sm-20" data-v-24101095><div class="container" data-v-24101095><h1 class="py-sm-30 py-20 text-26 f-bold border-b-xl border-gray-700 mb-20" data-v-24101095>Frequently Asked Questions</h1>`);
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
                    _push3(`<p style="${ssrRenderStyle({ "margin-left": "auto" })}" data-v-24101095${_scopeId2}><span class="${ssrRenderClass([isActive ? "icon-reduce" : "icon-add", "iconfont text-20 ml-10"])}" data-v-24101095${_scopeId2}></span></p>`);
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
                  var _a2;
                  if (_push3) {
                    _push3(`<div class="px-20 py-24" data-v-24101095${_scopeId2}>${(_a2 = subItem.content) != null ? _a2 : ""}</div>`);
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
            _push2(`<span data-v-24101095${_scopeId}> It should be noted that the content will not be aligned in center by default </span>`);
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
            _push2(`<div class="acea-row row-between-wrapper text-gray-700 mb-10 py-20" data-v-24101095${_scopeId}><span class="f-bold text-18 flex-1 line1 mr-10" data-v-24101095${_scopeId}>Painting Size Price</span><span class="text-14" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_a2 = unref(currentSizeOption)) == null ? void 0 : _a2.price) || 0))}</span></div><div class="acea-row row-between-wrapper text-gray-700 py-20 mb-10" data-v-24101095${_scopeId}><span class="f-bold text-18 flex-1 line1 mr-10" data-v-24101095${_scopeId}>Frame Price</span><span class="text-14" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(frameMoney) || 0))}</span></div>`);
            if (unref(hasFrame) && !!unref(currentMaterialId)) {
              _push2(`<div class="acea-row row-between-wrapper text-gray-700 mb-10 py-20" data-v-24101095${_scopeId}><span class="f-bold text-18 flex-1 line1 mr-10" data-v-24101095${_scopeId}>Canvas material Price</span><span class="text-14" data-v-24101095${_scopeId}>${ssrInterpolate(unref(currencyStore).formatToCurrency(((_b2 = unref(currentMaterialOption)) == null ? void 0 : _b2.price) || 0))}</span></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/paint-detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-24101095"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-C2OF6vyX.mjs.map
