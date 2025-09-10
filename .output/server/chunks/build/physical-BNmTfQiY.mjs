import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, reactive, computed, watch, createElementBlock, openBlock, withModifiers, normalizeClass, withDirectives, createCommentVNode, withKeys, renderSlot, createBlock, createSlots, useSSRContext } from 'vue';
import { isNil } from 'lodash-unified';
import { w as withInstall, g as _export_sfc$1, _ as _export_sfc, $ as $http, Z as TRADE_MODULE, a4 as useRouter, a as ElButton, a6 as HOME_URL, i as isNumber, c as buildProps, B as useLocale, e as useNamespace, D as useFormItem, J as isUndefined, q as useFormSize, aA as useFormDisabled, l as ElIcon, O as arrow_down_default, aB as minus_default, aC as arrow_up_default, aD as plus_default, E as ElInput, U as UPDATE_MODEL_EVENT, az as INPUT_EVENT, C as CHANGE_EVENT, d as definePropType, M as useAriaProps, Q as useSizeProp, t as throwError, r as debugWarn, L as EVENT_CODE } from './server.mjs';
import { isString, isFunction } from '@vue/shared';
import { E as ElDialog } from './dialog-DQju9U68.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';

const REPEAT_INTERVAL = 100;
const REPEAT_DELAY = 600;
const vRepeatClick = {
  beforeMount(el, binding) {
    const value = binding.value;
    const { interval = REPEAT_INTERVAL, delay = REPEAT_DELAY } = isFunction(value) ? {} : value;
    let intervalId;
    let delayId;
    const handler = () => isFunction(value) ? value() : value.handler();
    const clear = () => {
      if (delayId) {
        clearTimeout(delayId);
        delayId = void 0;
      }
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = void 0;
      }
    };
    el.addEventListener("mousedown", (evt) => {
      if (evt.button !== 0)
        return;
      clear();
      handler();
      (void 0).addEventListener("mouseup", () => clear(), {
        once: true
      });
      delayId = setTimeout(() => {
        intervalId = setInterval(() => {
          handler();
        }, interval);
      }, delay);
    });
  }
};
const inputNumberProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: Boolean,
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER
  },
  modelValue: {
    type: [Number, null]
  },
  readonly: Boolean,
  disabled: Boolean,
  size: useSizeProp,
  controls: {
    type: Boolean,
    default: true
  },
  controlsPosition: {
    type: String,
    default: "",
    values: ["", "right"]
  },
  valueOnClear: {
    type: [String, Number, null],
    validator: (val) => val === null || isNumber(val) || ["min", "max"].includes(val),
    default: null
  },
  name: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  ...useAriaProps(["ariaLabel"]),
  inputmode: {
    type: definePropType(String),
    default: void 0
  },
  align: {
    type: definePropType(String),
    default: "center"
  },
  disabledScientific: Boolean
});
const inputNumberEmits = {
  [CHANGE_EVENT]: (cur, prev) => prev !== cur,
  blur: (e) => e instanceof FocusEvent,
  focus: (e) => e instanceof FocusEvent,
  [INPUT_EVENT]: (val) => isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val) => isNumber(val) || isNil(val)
};
const __default__ = defineComponent({
  name: "ElInputNumber"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: inputNumberProps,
  emits: inputNumberEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const { t } = useLocale();
    const ns = useNamespace("input-number");
    const input = ref();
    const data = reactive({
      currentValue: props.modelValue,
      userInput: null
    });
    const { formItem } = useFormItem();
    const minDisabled = computed(() => isNumber(props.modelValue) && props.modelValue <= props.min);
    const maxDisabled = computed(() => isNumber(props.modelValue) && props.modelValue >= props.max);
    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(props.step);
      if (!isUndefined(props.precision)) {
        if (stepPrecision > props.precision) ;
        return props.precision;
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision);
      }
    });
    const controlsAtRight = computed(() => {
      return props.controls && props.controlsPosition === "right";
    });
    const inputNumberSize = useFormSize();
    const inputNumberDisabled = useFormDisabled();
    const displayValue = computed(() => {
      if (data.userInput !== null) {
        return data.userInput;
      }
      let currentValue = data.currentValue;
      if (isNil(currentValue))
        return "";
      if (isNumber(currentValue)) {
        if (Number.isNaN(currentValue))
          return "";
        if (!isUndefined(props.precision)) {
          currentValue = currentValue.toFixed(props.precision);
        }
      }
      return currentValue;
    });
    const toPrecision = (num, pre) => {
      if (isUndefined(pre))
        pre = numPrecision.value;
      if (pre === 0)
        return Math.round(num);
      let snum = String(num);
      const pointPos = snum.indexOf(".");
      if (pointPos === -1)
        return num;
      const nums = snum.replace(".", "").split("");
      const datum = nums[pointPos + pre];
      if (!datum)
        return num;
      const length = snum.length;
      if (snum.charAt(length - 1) === "5") {
        snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
      }
      return Number.parseFloat(Number(snum).toFixed(pre));
    };
    const getPrecision = (value) => {
      if (isNil(value))
        return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    };
    const ensurePrecision = (val, coefficient = 1) => {
      if (!isNumber(val))
        return data.currentValue;
      if (val >= Number.MAX_SAFE_INTEGER && coefficient === 1) {
        return val;
      } else if (val <= Number.MIN_SAFE_INTEGER && coefficient === -1) {
        return val;
      }
      return toPrecision(val + props.step * coefficient);
    };
    const handleKeydown = (event) => {
      var _a;
      const e = event;
      if (props.disabledScientific && ["e", "E"].includes(e.key)) {
        e.preventDefault();
        return;
      }
      const keyHandlers = {
        [EVENT_CODE.up]: () => {
          e.preventDefault();
          increase();
        },
        [EVENT_CODE.down]: () => {
          e.preventDefault();
          decrease();
        }
      };
      (_a = keyHandlers[e.key]) == null ? void 0 : _a.call(keyHandlers);
    };
    const increase = () => {
      if (props.readonly || inputNumberDisabled.value || maxDisabled.value)
        return;
      const value = Number(displayValue.value) || 0;
      const newVal = ensurePrecision(value);
      setCurrentValue(newVal);
      emit(INPUT_EVENT, data.currentValue);
      setCurrentValueToModelValue();
    };
    const decrease = () => {
      if (props.readonly || inputNumberDisabled.value || minDisabled.value)
        return;
      const value = Number(displayValue.value) || 0;
      const newVal = ensurePrecision(value, -1);
      setCurrentValue(newVal);
      emit(INPUT_EVENT, data.currentValue);
      setCurrentValueToModelValue();
    };
    const verifyValue = (value, update) => {
      const { max, min, step, precision, stepStrictly, valueOnClear } = props;
      if (max < min) {
        throwError("InputNumber", "min should not be greater than max.");
      }
      let newVal = Number(value);
      if (isNil(value) || Number.isNaN(newVal)) {
        return null;
      }
      if (value === "") {
        if (valueOnClear === null) {
          return null;
        }
        newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear;
      }
      if (stepStrictly) {
        newVal = toPrecision(Math.round(newVal / step) * step, precision);
        if (newVal !== value) {
          update && emit(UPDATE_MODEL_EVENT, newVal);
        }
      }
      if (!isUndefined(precision)) {
        newVal = toPrecision(newVal, precision);
      }
      if (newVal > max || newVal < min) {
        newVal = newVal > max ? max : min;
        update && emit(UPDATE_MODEL_EVENT, newVal);
      }
      return newVal;
    };
    const setCurrentValue = (value, emitChange = true) => {
      var _a;
      const oldVal = data.currentValue;
      const newVal = verifyValue(value);
      if (!emitChange) {
        emit(UPDATE_MODEL_EVENT, newVal);
        return;
      }
      if (oldVal === newVal && value)
        return;
      data.userInput = null;
      emit(UPDATE_MODEL_EVENT, newVal);
      if (oldVal !== newVal) {
        emit(CHANGE_EVENT, newVal, oldVal);
      }
      if (props.validateEvent) {
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "change").catch((err) => debugWarn());
      }
      data.currentValue = newVal;
    };
    const handleInput = (value) => {
      data.userInput = value;
      const newVal = value === "" ? null : Number(value);
      emit(INPUT_EVENT, newVal);
      setCurrentValue(newVal, false);
    };
    const handleInputChange = (value) => {
      const newVal = value !== "" ? Number(value) : "";
      if (isNumber(newVal) && !Number.isNaN(newVal) || value === "") {
        setCurrentValue(newVal);
      }
      setCurrentValueToModelValue();
      data.userInput = null;
    };
    const focus = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    const blur = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
    };
    const handleFocus = (event) => {
      emit("focus", event);
    };
    const handleBlur = (event) => {
      var _a, _b;
      data.userInput = null;
      if (data.currentValue === null && ((_a = input.value) == null ? void 0 : _a.input)) {
        input.value.input.value = "";
      }
      emit("blur", event);
      if (props.validateEvent) {
        (_b = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _b.call(formItem, "blur").catch((err) => debugWarn());
      }
    };
    const setCurrentValueToModelValue = () => {
      if (data.currentValue !== props.modelValue) {
        data.currentValue = props.modelValue;
      }
    };
    watch(() => props.modelValue, (value, oldValue) => {
      const newValue = verifyValue(value, true);
      if (data.userInput === null && newValue !== oldValue) {
        data.currentValue = newValue;
      }
    }, { immediate: true });
    watch(() => props.precision, () => {
      data.currentValue = verifyValue(props.modelValue);
    });
    expose({
      focus,
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(unref(inputNumberSize)),
          unref(ns).is("disabled", unref(inputNumberDisabled)),
          unref(ns).is("without-controls", !_ctx.controls),
          unref(ns).is("controls-right", unref(controlsAtRight)),
          unref(ns).is(_ctx.align, !!_ctx.align)
        ]),
        onDragstart: withModifiers(() => {
        }, ["prevent"])
      }, [
        _ctx.controls ? withDirectives((openBlock(), createElementBlock("span", {
          key: 0,
          role: "button",
          "aria-label": unref(t)("el.inputNumber.decrease"),
          class: normalizeClass([unref(ns).e("decrease"), unref(ns).is("disabled", unref(minDisabled))]),
          onKeydown: withKeys(decrease, ["enter"])
        }, [
          renderSlot(_ctx.$slots, "decrease-icon", {}, () => [
            createVNode(unref(ElIcon), null, {
              default: withCtx(() => [
                unref(controlsAtRight) ? (openBlock(), createBlock(unref(arrow_down_default), { key: 0 })) : (openBlock(), createBlock(unref(minus_default), { key: 1 }))
              ]),
              _: 1
            })
          ])
        ], 42, ["aria-label", "onKeydown"])), [
          [unref(vRepeatClick), decrease]
        ]) : createCommentVNode("v-if", true),
        _ctx.controls ? withDirectives((openBlock(), createElementBlock("span", {
          key: 1,
          role: "button",
          "aria-label": unref(t)("el.inputNumber.increase"),
          class: normalizeClass([unref(ns).e("increase"), unref(ns).is("disabled", unref(maxDisabled))]),
          onKeydown: withKeys(increase, ["enter"])
        }, [
          renderSlot(_ctx.$slots, "increase-icon", {}, () => [
            createVNode(unref(ElIcon), null, {
              default: withCtx(() => [
                unref(controlsAtRight) ? (openBlock(), createBlock(unref(arrow_up_default), { key: 0 })) : (openBlock(), createBlock(unref(plus_default), { key: 1 }))
              ]),
              _: 1
            })
          ])
        ], 42, ["aria-label", "onKeydown"])), [
          [unref(vRepeatClick), increase]
        ]) : createCommentVNode("v-if", true),
        createVNode(unref(ElInput), {
          id: _ctx.id,
          ref_key: "input",
          ref: input,
          type: "number",
          step: _ctx.step,
          "model-value": unref(displayValue),
          placeholder: _ctx.placeholder,
          readonly: _ctx.readonly,
          disabled: unref(inputNumberDisabled),
          size: unref(inputNumberSize),
          max: _ctx.max,
          min: _ctx.min,
          name: _ctx.name,
          "aria-label": _ctx.ariaLabel,
          "validate-event": false,
          inputmode: _ctx.inputmode,
          onKeydown: handleKeydown,
          onBlur: handleBlur,
          onFocus: handleFocus,
          onInput: handleInput,
          onChange: handleInputChange
        }, createSlots({
          _: 2
        }, [
          _ctx.$slots.prefix ? {
            name: "prefix",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "prefix")
            ])
          } : void 0,
          _ctx.$slots.suffix ? {
            name: "suffix",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "suffix")
            ])
          } : void 0
        ]), 1032, ["id", "step", "model-value", "placeholder", "readonly", "disabled", "size", "max", "min", "name", "aria-label", "inputmode"])
      ], 42, ["onDragstart"]);
    };
  }
});
var InputNumber = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "input-number.vue"]]);
const ElInputNumber = withInstall(InputNumber);
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "PaySuccessPopup"
  },
  __name: "PaySuccessPopup",
  __ssrInlineRender: true,
  props: {
    tradeNo: { default: "" }
  },
  setup(__props, { expose: __expose }) {
    const router = useRouter();
    const visible = ref(false);
    const show = () => {
      visible.value = true;
    };
    __expose({
      show
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: unref(visible),
        "onUpdate:modelValue": ($event) => isRef(visible) ? visible.value = $event : null,
        "destroy-on-close": true,
        width: "500px",
        "show-close": false
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-16" data-v-3cc1b9b4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              class: "w-full",
              type: "primary",
              onClick: ($event) => unref(router).replace(`/order-detail/${_ctx.tradeNo}`),
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`View Order`);
                } else {
                  return [
                    createTextVNode("View Order")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div data-v-3cc1b9b4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              class: "w-full",
              onClick: ($event) => unref(router).replace(unref(HOME_URL)),
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Back to Home`);
                } else {
                  return [
                    createTextVNode("Back to Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mb-16" }, [
                createVNode(_component_el_button, {
                  class: "w-full",
                  type: "primary",
                  onClick: ($event) => unref(router).replace(`/order-detail/${_ctx.tradeNo}`),
                  size: "large"
                }, {
                  default: withCtx(() => [
                    createTextVNode("View Order")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              createVNode("div", null, [
                createVNode(_component_el_button, {
                  class: "w-full",
                  onClick: ($event) => unref(router).replace(unref(HOME_URL)),
                  size: "large"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Back to Home")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="success-icon-wrapper acea-row row-center-wrapper py- 42" data-v-3cc1b9b4${_scopeId}><div class="success-icon rounded-full bg-primary acea-row row-center-wrapper" data-v-3cc1b9b4${_scopeId}><span class="iconfont icon-shopping text-30 text-white" data-v-3cc1b9b4${_scopeId}></span></div><div class="ripple ripple-inner" data-v-3cc1b9b4${_scopeId}></div><div class="ripple ripple-outer" data-v-3cc1b9b4${_scopeId}></div></div><p class="text-20 f-bold text-center my-20" data-v-3cc1b9b4${_scopeId}>Your order is confirmed</p><p class="text-14 text-center" data-v-3cc1b9b4${_scopeId}> Thanks for shopping! your order hasn&#39;t shipped yet,but we will send you and email when it done. </p>`);
          } else {
            return [
              createVNode("div", { class: "success-icon-wrapper acea-row row-center-wrapper py- 42" }, [
                createVNode("div", { class: "success-icon rounded-full bg-primary acea-row row-center-wrapper" }, [
                  createVNode("span", { class: "iconfont icon-shopping text-30 text-white" })
                ]),
                createVNode("div", { class: "ripple ripple-inner" }),
                createVNode("div", { class: "ripple ripple-outer" })
              ]),
              createVNode("p", { class: "text-20 f-bold text-center my-20" }, "Your order is confirmed"),
              createVNode("p", { class: "text-14 text-center" }, " Thanks for shopping! your order hasn't shipped yet,but we will send you and email when it done. ")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaySuccessPopup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PaySuccessPopup = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-3cc1b9b4"]]), { __name: "PaySuccessPopup" });
const discountCalcApi = (params) => {
  return $http().post(TRADE_MODULE + `/physical/order/discount/calculation`, params);
};

export { ElInputNumber as E, PaySuccessPopup as P, discountCalcApi as d };
//# sourceMappingURL=physical-BNmTfQiY.mjs.map
