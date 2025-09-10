import { E as ElInputNumber, P as PaySuccessPopup, d as discountCalcApi } from './physical-BNmTfQiY.mjs';
import { E as ElTag } from './index-TgbWtzhx.mjs';
import { _ as _export_sfc, a2 as useNuxtApp, a4 as useRouter, a3 as useUserStore, aw as useCartStore, a9 as useCurrencyStore, ab as imagePrefix, at as debounce, a as ElButton, E as ElInput, ax as PRODUCT_URL, ay as confirmOrderApi } from './server.mjs';
import { E as ElForm, a as ElFormItem } from './form-item-BeekeJ4U.mjs';
import { defineComponent, ref, reactive, computed, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { A as AddressInfo, d as detailAddressApi, a as addAddressApi, e as editAddressApi, g as getAddressListApi } from './address-CAtp2bS7.mjs';
import { L as LoginWindow } from './LoginWindow-8pCArWXq.mjs';
import 'lodash-unified';
import '@vue/shared';
import './dialog-DQju9U68.mjs';
import './index-QxVyGfSM.mjs';
import '@vueuse/core';
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
import '@ctrl/tinycolor';
import 'axios';
import 'async-validator';
import './select-BBb6v1ax.mjs';
import './popper-BevOnpDk.mjs';
import '@popperjs/core';
import './scrollbar-BAU7-sWB.mjs';
import './checkbox-BsmvevJL.mjs';
import './nuxt-link-DR_c-RpP.mjs';
import './divider-DgH3PmJB.mjs';
import './logo-DzgOjlOk.mjs';
import './google-CA8l_UnH.mjs';
import './useAuth-Dm_6RpzH.mjs';
import './custom-CnGfPiQ8.mjs';
import './index-BuIDaW2O.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Cart"
  },
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { $bus } = useNuxtApp();
    const router = useRouter();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const currencyStore = useCurrencyStore();
    const isExpand = ref(false);
    const form = reactive({
      discountCode: ""
    });
    const rules = reactive({
      discountCode: [
        { required: true, message: "Please enter the discount code", trigger: [] }
      ]
    });
    const canCarts = computed(() => cartStore.canCarts);
    ref({});
    const addressId = ref("");
    const addressList = ref([]);
    const getAddressList = async () => {
      const { data } = await getAddressListApi();
      addressList.value = data;
    };
    const shoppingCartData = ref([]);
    const offerData = ref({});
    const confirmOrder = async () => {
      shoppingCartData.value = canCarts.value.map((item) => ({
        shopId: item.shopId,
        techniqueId: item.techniqueId,
        productId: item.productId,
        specsId: item.specsId,
        dimensionId: item.dimensionId,
        parts: item.parts,
        quantity: item.quantity,
        retailPrice: item.retailPrice,
        redeemPoints: item.redeemPoints
      }));
      const params = {
        shoppingCarts: shoppingCartData.value,
        addressId: addressId.value,
        deliveryType: "0"
      };
      const { data } = await confirmOrderApi(params);
      offerData.value = data;
    };
    const quantityChange = debounce(() => {
      if (userStore.isLogin) confirmOrder();
    });
    const addressInfoRef = ref();
    const openAddEdit = async (title, row = {}, isAdd = true) => {
      var _a;
      if (!userStore.isLogin) return showLoginWindow();
      if (!isAdd) {
        const record = await detailAddressApi(row == null ? void 0 : row.id);
        row = record == null ? void 0 : record.data;
      }
      const params = {
        isAdd,
        title,
        row: { ...row },
        api: isAdd ? addAddressApi : editAddressApi,
        getTableList: getAddressList
      };
      (_a = addressInfoRef.value) == null ? void 0 : _a.acceptParams(params);
    };
    const paySuccessPopupRef = ref();
    const tradeNo = ref("");
    const loginWindowRef = ref();
    const showLoginWindow = () => {
      var _a;
      (_a = loginWindowRef.value) == null ? void 0 : _a.open();
    };
    const addAddressCB = (id) => {
      addressId.value = id;
      confirmOrder();
    };
    const isDiscount = ref(false);
    const discountDetail = ref({});
    const formRef = ref();
    const applyCode = () => {
      formRef.value.validate(async (valid) => {
        if (!valid) return;
        const { data } = await discountCalcApi({
          couponCode: form.discountCode,
          shoppingCarts: shoppingCartData.value
        });
        discountDetail.value = data;
        isDiscount.value = true;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_input_number = ElInputNumber;
      const _component_el_tag = ElTag;
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      _push(`<!--[--><div class="container" data-v-469c0c1a><h1 class="text-40 f-bold-500 py-lg-50 py-30" data-v-469c0c1a>Checkout</h1><div class="cart-container acea-row row-between row-top" style="${ssrRenderStyle(unref(canCarts).length > 0 ? null : { display: "none" })}" data-v-469c0c1a><div class="review-container pr-md-30" data-v-469c0c1a><div class="review-list" data-v-469c0c1a><!--[-->`);
      ssrRenderList(unref(canCarts), (item, index) => {
        _push(`<div class="review-item acea-row gap-base" data-v-469c0c1a><div class="p-img" data-v-469c0c1a><div class="aspect-ratio p-10 border-sm border-gray-200" data-v-469c0c1a><img class="w-full h-full fit-contain"${ssrRenderAttr("src", unref(imagePrefix)(item.img))} alt="" data-v-469c0c1a></div></div><div class="p-cont flex-1" data-v-469c0c1a><div class="acea-row row-between-wrapper gap-base mb-10" data-v-469c0c1a><p class="text-16 f-bold-500 flex-1" data-v-469c0c1a>${ssrInterpolate(item.title)}</p><span class="iconfont icon-close text-20 cursor-pointer" data-v-469c0c1a></span></div><!--[-->`);
        ssrRenderList(item.specs, (v, k) => {
          _push(`<p class="text-14 text-gray-500 mt-4" data-v-469c0c1a>${ssrInterpolate(k)}: ${ssrInterpolate(v)}</p>`);
        });
        _push(`<!--]--><div class="acea-row row-between-wrapper mt-10" data-v-469c0c1a>`);
        _push(ssrRenderComponent(_component_el_input_number, {
          class: "review-number",
          modelValue: item.quantity,
          "onUpdate:modelValue": ($event) => item.quantity = $event,
          min: 1,
          max: Number(item.retailStock) > 999 ? 999 : Number(item.retailStock),
          onChange: unref(quantityChange)
        }, null, _parent));
        _push(`<p class="text-14 f-bold" data-v-469c0c1a>${ssrInterpolate(unref(currencyStore).formatToCurrency(Number(item.retailPrice) * Number(item.quantity)))}</p></div></div></div>`);
      });
      _push(`<!--]--></div><div class="row gap-row-base address-list" data-v-469c0c1a><!--[-->`);
      ssrRenderList(unref(addressList), (item, index) => {
        _push(`<!--[-->`);
        if (unref(isExpand) ? true : index < 2) {
          _push(`<div class="col-sm-6 col-12" data-v-469c0c1a><div class="address-item p-lg-20 p-15 border-sm border-gray-200 bg-gray-100" data-v-469c0c1a><div class="acea-row row-between-wrapper" data-v-469c0c1a><span class="text-20 f-bold" data-v-469c0c1a>${ssrInterpolate(item.firstName)} ${ssrInterpolate(item.lastName)} `);
          if (item.defaultFlag === "0") {
            _push(ssrRenderComponent(_component_el_tag, { type: "primary" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Default`);
                } else {
                  return [
                    createTextVNode("Default")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</span><span class="${ssrRenderClass([[item.id === unref(addressId) ? "icon-checkbox-fill" : "icon-checkbox"], "iconfont text-24 cursor-pointer"])}" data-v-469c0c1a></span></div><p class="mt-10 text-14 line1" data-v-469c0c1a>${ssrInterpolate(item.mobile)}</p><p class="mt-10 mb-lg-20 mb-15 text-14 line1" data-v-469c0c1a>${ssrInterpolate(item.detail)}</p>`);
          _push(ssrRenderComponent(_component_el_button, {
            type: "primary",
            class: "w-full",
            size: "large",
            onClick: ($event) => openAddEdit("Edit address", item, false)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Edit `);
              } else {
                return [
                  createTextVNode(" Edit ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      if (unref(isExpand) || unref(addressList).length < 2) {
        _push(`<div class="col-sm-6 col-12" data-v-469c0c1a><div class="address-item h-full border-sm border-gray-200 bg-gray-100 acea-row row-center-wrapper cursor-pointer" data-v-469c0c1a><span class="iconfont icon-add text-20" data-v-469c0c1a></span><span class="text-16 f-bold-500 ml-10" data-v-469c0c1a>Add Address</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(addressList).length >= 2) {
        _push(`<div class="acea-row row-center-wrapper py-20 cursor-pointer" data-v-469c0c1a><span class="mr-10 text-16 f-bold-500" data-v-469c0c1a>${ssrInterpolate(unref(isExpand) ? "Less" : "More")} Address</span><span class="${ssrRenderClass([{ "icon-down": !unref(isExpand), "icon-up": unref(isExpand) }, "iconfont text-20"])}" data-v-469c0c1a></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="review-summary shadow-lg p-xl-20 p-15" data-v-469c0c1a><div class="acea-row row-between-wrapper text-16 f-bold pb-20 mb-20 border-b-sm border-gray-200" data-v-469c0c1a><span data-v-469c0c1a>Subtotal</span><span data-v-469c0c1a>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(cartStore).subtotal))}</span></div><p class="text-16 text-gray-600 mb-8" data-v-469c0c1a>Enter Discount Code</p>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: unref(form),
        ref_key: "formRef",
        ref: formRef,
        rules: unref(rules),
        "auto-complete": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, { prop: "discountCode" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(form).discountCode,
                    "onUpdate:modelValue": ($event) => unref(form).discountCode = $event,
                    placeholder: "Enter your discount code",
                    size: "large",
                    disabled: unref(isDiscount)
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          size: "large",
                          onClick: applyCode
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Apply`);
                            } else {
                              return [
                                createTextVNode("Apply")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            size: "large",
                            onClick: applyCode
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Apply")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(form).discountCode,
                      "onUpdate:modelValue": ($event) => unref(form).discountCode = $event,
                      placeholder: "Enter your discount code",
                      size: "large",
                      disabled: unref(isDiscount)
                    }, {
                      append: withCtx(() => [
                        createVNode(_component_el_button, {
                          size: "large",
                          onClick: applyCode
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Apply")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form_item, { prop: "discountCode" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(form).discountCode,
                    "onUpdate:modelValue": ($event) => unref(form).discountCode = $event,
                    placeholder: "Enter your discount code",
                    size: "large",
                    disabled: unref(isDiscount)
                  }, {
                    append: withCtx(() => [
                      createVNode(_component_el_button, {
                        size: "large",
                        onClick: applyCode
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Apply")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if ((_a = unref(discountDetail)) == null ? void 0 : _a.discountAmount) {
        _push(`<div class="acea-row row-right row-center text-error" data-v-469c0c1a><span class="text-14" data-v-469c0c1a>not using discounts <span class="iconfont icon-close text-14 cursor-pointer" data-v-469c0c1a></span></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper" data-v-469c0c1a><span data-v-469c0c1a>Delivery Amount</span><span data-v-469c0c1a>${ssrInterpolate(unref(currencyStore).formatToCurrency(unref(offerData).deliveryAmount || 0))}</span></div><div class="text-16 text-gray-600 my-20 acea-row row-between-wrapper" data-v-469c0c1a><span data-v-469c0c1a>Discount Amount</span><span data-v-469c0c1a>${ssrInterpolate(unref(currencyStore).formatToCurrency(Number(unref(offerData).discountAmount || 0) + Number(unref(discountDetail).discountAmount || 0)))}</span></div><div class="acea-row row-between-wrapper text-16 f-bold pt-20 my-20 border-t-sm border-gray-200" data-v-469c0c1a><span data-v-469c0c1a>Grand Total</span><div data-v-469c0c1a><p class="${ssrRenderClass([unref(discountDetail).discountAmount ? "text-through text-gray-600" : ""])}" data-v-469c0c1a>${ssrInterpolate(unref(currencyStore).formatToCurrency(Number(unref(offerData).actualAmount || 0) || unref(cartStore).subtotal))}</p>`);
      if (unref(discountDetail).discountAmount) {
        _push(`<p data-v-469c0c1a>${ssrInterpolate(unref(currencyStore).formatToCurrency(Number(unref(offerData).actualAmount || 0) - Number(unref(discountDetail).discountAmount || 0) || unref(cartStore).subtotal))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div id="paypal-button-container" class="paypal-button-container" data-v-469c0c1a></div></div></div><div class="text-center py-60" style="${ssrRenderStyle(unref(canCarts).length === 0 ? null : { display: "none" })}" data-v-469c0c1a><span class="iconfont icon-shopping-bag text-50" data-v-469c0c1a></span><p class="text-20 f-bold mt-20" data-v-469c0c1a>Your Cart is Empty.</p><p class="text-14 my-20" data-v-469c0c1a>Please add products to your cart to checkout.</p>`);
      _push(ssrRenderComponent(_component_el_button, {
        size: "large",
        type: "primary",
        onClick: ($event) => unref(router).push(unref(PRODUCT_URL))
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Start Shopping `);
          } else {
            return [
              createTextVNode(" Start Shopping ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(AddressInfo, {
        ref_key: "addressInfoRef",
        ref: addressInfoRef,
        onAdd: addAddressCB
      }, null, _parent));
      _push(ssrRenderComponent(PaySuccessPopup, {
        "trade-no": unref(tradeNo),
        ref_key: "paySuccessPopupRef",
        ref: paySuccessPopupRef
      }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-469c0c1a"]]);

export { cart as default };
//# sourceMappingURL=cart-42PbsIU3.mjs.map
