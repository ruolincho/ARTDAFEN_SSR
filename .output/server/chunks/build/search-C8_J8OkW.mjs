import { defineComponent, computed, useAttrs, ref, createBlock, openBlock, unref, withCtx, createElementVNode, normalizeStyle, normalizeClass, createVNode, mergeProps, withKeys, withModifiers, createSlots, renderSlot, createElementBlock, createCommentVNode, Fragment, renderList, createTextVNode, toDisplayString } from 'vue';
import { pick, debounce } from 'lodash-unified';
import { onClickOutside } from '@vueuse/core';
import { w as withInstall, g as _export_sfc$1, $ as $http, Z as TRADE_MODULE, i as isNumber, c as buildProps, aL as inputProps, aA as useFormDisabled, e as useNamespace, x as useId, E as ElInput, l as ElIcon, aM as loading_default, C as CHANGE_EVENT, az as INPUT_EVENT, U as UPDATE_MODEL_EVENT, d as definePropType, t as throwError } from './server.mjs';
import { E as ElScrollbar } from './scrollbar-BAU7-sWB.mjs';
import { E as ElTooltip, u as useTooltipContentProps } from './popper-BevOnpDk.mjs';
import { isObject, isString, NOOP, isArray } from '@vue/shared';

const autocompleteProps = buildProps({
  ...inputProps,
  valueKey: {
    type: String,
    default: "value"
  },
  modelValue: {
    type: [String, Number],
    default: ""
  },
  debounce: {
    type: Number,
    default: 300
  },
  placement: {
    type: definePropType(String),
    values: [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end"
    ],
    default: "bottom-start"
  },
  fetchSuggestions: {
    type: definePropType([Function, Array]),
    default: NOOP
  },
  popperClass: {
    type: String,
    default: ""
  },
  triggerOnFocus: {
    type: Boolean,
    default: true
  },
  selectWhenUnmatched: Boolean,
  hideLoading: Boolean,
  teleported: useTooltipContentProps.teleported,
  appendTo: useTooltipContentProps.appendTo,
  highlightFirstItem: Boolean,
  fitInputWidth: Boolean
});
const autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value) || isNumber(value),
  [INPUT_EVENT]: (value) => isString(value) || isNumber(value),
  [CHANGE_EVENT]: (value) => isString(value) || isNumber(value),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item) => isObject(item)
};
const COMPONENT_NAME = "ElAutocomplete";
const __default__ = defineComponent({
  name: COMPONENT_NAME,
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: autocompleteProps,
  emits: autocompleteEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const passInputProps = computed(() => pick(props, Object.keys(inputProps)));
    const rawAttrs = useAttrs();
    const disabled = useFormDisabled();
    const ns = useNamespace("autocomplete");
    const inputRef = ref();
    const regionRef = ref();
    const popperRef = ref();
    const listboxRef = ref();
    let ignoreFocusEvent = false;
    const suggestions = ref([]);
    const highlightedIndex = ref(-1);
    const dropdownWidth = ref("");
    const activated = ref(false);
    const suggestionDisabled = ref(false);
    const loading = ref(false);
    const listboxId = useId();
    const styles = computed(() => rawAttrs.style);
    const suggestionVisible = computed(() => {
      const isValidData = suggestions.value.length > 0;
      return (isValidData || loading.value) && activated.value;
    });
    const suggestionLoading = computed(() => !props.hideLoading && loading.value);
    const refInput = computed(() => {
      if (inputRef.value) {
        return Array.from(inputRef.value.$el.querySelectorAll("input"));
      }
      return [];
    });
    const onSuggestionShow = () => {
      if (suggestionVisible.value) {
        dropdownWidth.value = `${inputRef.value.$el.offsetWidth}px`;
      }
    };
    const onHide = () => {
      highlightedIndex.value = -1;
    };
    const getData = async (queryString) => {
      if (suggestionDisabled.value)
        return;
      const cb = (suggestionList) => {
        loading.value = false;
        if (suggestionDisabled.value)
          return;
        if (isArray(suggestionList)) {
          suggestions.value = suggestionList;
          highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
        } else {
          throwError(COMPONENT_NAME, "autocomplete suggestions must be an array");
        }
      };
      loading.value = true;
      if (isArray(props.fetchSuggestions)) {
        cb(props.fetchSuggestions);
      } else {
        const result = await props.fetchSuggestions(queryString, cb);
        if (isArray(result))
          cb(result);
      }
    };
    const debouncedGetData = debounce(getData, props.debounce);
    const handleInput = (value) => {
      const valuePresented = !!value;
      emit(INPUT_EVENT, value);
      emit(UPDATE_MODEL_EVENT, value);
      suggestionDisabled.value = false;
      activated.value || (activated.value = valuePresented);
      if (!props.triggerOnFocus && !value) {
        suggestionDisabled.value = true;
        suggestions.value = [];
        return;
      }
      debouncedGetData(value);
    };
    const handleMouseDown = (event) => {
      var _a;
      if (disabled.value)
        return;
      if (((_a = event.target) == null ? void 0 : _a.tagName) !== "INPUT" || refInput.value.includes((void 0).activeElement)) {
        activated.value = true;
      }
    };
    const handleChange = (value) => {
      emit(CHANGE_EVENT, value);
    };
    const handleFocus = (evt) => {
      var _a;
      if (!ignoreFocusEvent) {
        activated.value = true;
        emit("focus", evt);
        const queryString = (_a = props.modelValue) != null ? _a : "";
        if (props.triggerOnFocus && true) {
          debouncedGetData(String(queryString));
        }
      } else {
        ignoreFocusEvent = false;
      }
    };
    const handleBlur = (evt) => {
      setTimeout(() => {
        var _a;
        if ((_a = popperRef.value) == null ? void 0 : _a.isFocusInsideContent()) {
          ignoreFocusEvent = true;
          return;
        }
        activated.value && close();
        emit("blur", evt);
      });
    };
    const handleClear = () => {
      activated.value = false;
      emit(UPDATE_MODEL_EVENT, "");
      emit("clear");
    };
    const handleKeyEnter = async () => {
      if (suggestionVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
        handleSelect(suggestions.value[highlightedIndex.value]);
      } else if (props.selectWhenUnmatched) {
        emit("select", { value: props.modelValue });
        suggestions.value = [];
        highlightedIndex.value = -1;
      }
    };
    const handleKeyEscape = (evt) => {
      if (suggestionVisible.value) {
        evt.preventDefault();
        evt.stopPropagation();
        close();
      }
    };
    const close = () => {
      activated.value = false;
    };
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    const handleSelect = async (item) => {
      emit(INPUT_EVENT, item[props.valueKey]);
      emit(UPDATE_MODEL_EVENT, item[props.valueKey]);
      emit("select", item);
      suggestions.value = [];
      highlightedIndex.value = -1;
    };
    const highlight = (index) => {
      if (!suggestionVisible.value || loading.value)
        return;
      if (index < 0) {
        highlightedIndex.value = -1;
        return;
      }
      if (index >= suggestions.value.length) {
        index = suggestions.value.length - 1;
      }
      const suggestion = regionRef.value.querySelector(`.${ns.be("suggestion", "wrap")}`);
      const suggestionList = suggestion.querySelectorAll(`.${ns.be("suggestion", "list")} li`);
      const highlightItem = suggestionList[index];
      const scrollTop = suggestion.scrollTop;
      const { offsetTop, scrollHeight } = highlightItem;
      if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= scrollHeight;
      }
      highlightedIndex.value = index;
      inputRef.value.ref.setAttribute("aria-activedescendant", `${listboxId.value}-item-${highlightedIndex.value}`);
    };
    onClickOutside(listboxRef, () => {
      var _a;
      if ((_a = popperRef.value) == null ? void 0 : _a.isFocusInsideContent())
        return;
      suggestionVisible.value && close();
    });
    expose({
      highlightedIndex,
      activated,
      loading,
      inputRef,
      popperRef,
      suggestions,
      handleSelect,
      handleKeyEnter,
      focus,
      blur,
      close,
      highlight,
      getData
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTooltip), {
        ref_key: "popperRef",
        ref: popperRef,
        visible: unref(suggestionVisible),
        placement: _ctx.placement,
        "fallback-placements": ["bottom-start", "top-start"],
        "popper-class": [unref(ns).e("popper"), _ctx.popperClass],
        teleported: _ctx.teleported,
        "append-to": _ctx.appendTo,
        "gpu-acceleration": false,
        pure: "",
        "manual-mode": "",
        effect: "light",
        trigger: "click",
        transition: `${unref(ns).namespace.value}-zoom-in-top`,
        persistent: "",
        role: "listbox",
        onBeforeShow: onSuggestionShow,
        onHide
      }, {
        content: withCtx(() => [
          createElementVNode("div", {
            ref_key: "regionRef",
            ref: regionRef,
            class: normalizeClass([unref(ns).b("suggestion"), unref(ns).is("loading", unref(suggestionLoading))]),
            style: normalizeStyle({
              [_ctx.fitInputWidth ? "width" : "minWidth"]: dropdownWidth.value,
              outline: "none"
            }),
            role: "region"
          }, [
            _ctx.$slots.header ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(unref(ns).be("suggestion", "header")),
              onClick: withModifiers(() => {
              }, ["stop"])
            }, [
              renderSlot(_ctx.$slots, "header")
            ], 10, ["onClick"])) : createCommentVNode("v-if", true),
            createVNode(unref(ElScrollbar), {
              id: unref(listboxId),
              tag: "ul",
              "wrap-class": unref(ns).be("suggestion", "wrap"),
              "view-class": unref(ns).be("suggestion", "list"),
              role: "listbox"
            }, {
              default: withCtx(() => [
                unref(suggestionLoading) ? (openBlock(), createElementBlock("li", { key: 0 }, [
                  renderSlot(_ctx.$slots, "loading", {}, () => [
                    createVNode(unref(ElIcon), {
                      class: normalizeClass(unref(ns).is("loading"))
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(loading_default))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ])
                ])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(suggestions.value, (item, index) => {
                  return openBlock(), createElementBlock("li", {
                    id: `${unref(listboxId)}-item-${index}`,
                    key: index,
                    class: normalizeClass({ highlighted: highlightedIndex.value === index }),
                    role: "option",
                    "aria-selected": highlightedIndex.value === index,
                    onClick: ($event) => handleSelect(item)
                  }, [
                    renderSlot(_ctx.$slots, "default", { item }, () => [
                      createTextVNode(toDisplayString(item[_ctx.valueKey]), 1)
                    ])
                  ], 10, ["id", "aria-selected", "onClick"]);
                }), 128))
              ]),
              _: 3
            }, 8, ["id", "wrap-class", "view-class"]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(unref(ns).be("suggestion", "footer")),
              onClick: withModifiers(() => {
              }, ["stop"])
            }, [
              renderSlot(_ctx.$slots, "footer")
            ], 10, ["onClick"])) : createCommentVNode("v-if", true)
          ], 6)
        ]),
        default: withCtx(() => [
          createElementVNode("div", {
            ref_key: "listboxRef",
            ref: listboxRef,
            class: normalizeClass([unref(ns).b(), _ctx.$attrs.class]),
            style: normalizeStyle(unref(styles)),
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-expanded": unref(suggestionVisible),
            "aria-owns": unref(listboxId)
          }, [
            createVNode(unref(ElInput), mergeProps({
              ref_key: "inputRef",
              ref: inputRef
            }, mergeProps(unref(passInputProps), _ctx.$attrs), {
              "model-value": _ctx.modelValue,
              disabled: unref(disabled),
              onInput: handleInput,
              onChange: handleChange,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onClear: handleClear,
              onKeydown: [
                withKeys(withModifiers(($event) => highlight(highlightedIndex.value - 1), ["prevent"]), ["up"]),
                withKeys(withModifiers(($event) => highlight(highlightedIndex.value + 1), ["prevent"]), ["down"]),
                withKeys(handleKeyEnter, ["enter"]),
                withKeys(close, ["tab"]),
                withKeys(handleKeyEscape, ["esc"])
              ],
              onMousedown: handleMouseDown
            }), createSlots({
              _: 2
            }, [
              _ctx.$slots.prepend ? {
                name: "prepend",
                fn: withCtx(() => [
                  renderSlot(_ctx.$slots, "prepend")
                ])
              } : void 0,
              _ctx.$slots.append ? {
                name: "append",
                fn: withCtx(() => [
                  renderSlot(_ctx.$slots, "append")
                ])
              } : void 0,
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
            ]), 1040, ["model-value", "disabled", "onKeydown"])
          ], 14, ["aria-expanded", "aria-owns"])
        ]),
        _: 3
      }, 8, ["visible", "placement", "popper-class", "teleported", "append-to", "transition"]);
    };
  }
});
var Autocomplete = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "autocomplete.vue"]]);
const ElAutocomplete = withInstall(Autocomplete);
const deleteSearchHistoryApi = (params) => {
  return $http().post(TRADE_MODULE + `/search/history/remove`, params);
};
const getSearchCompletionApi = (keyword) => {
  return $http().get(TRADE_MODULE + `/search/completion`, { keyword });
};

export { ElAutocomplete as E, deleteSearchHistoryApi as d, getSearchCompletionApi as g };
//# sourceMappingURL=search-C8_J8OkW.mjs.map
