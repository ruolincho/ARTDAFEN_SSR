import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createVNode, withKeys, withModifiers, renderSlot, createTextVNode, toDisplayString, withCtx, createBlock, resolveDynamicComponent, withDirectives, vShow, inject, ref, computed, watch, provide, Transition, mergeProps, toHandlers } from 'vue';
import { w as withInstall, o as CONTACT_EMAIL, n as withNoopInstall, g as _export_sfc$1, c as buildProps, l as ElIcon, i as isNumber, h as arrow_right_default, j as iconPropType, d as definePropType, e as useNamespace, k as useIdInjection, C as CHANGE_EVENT, U as UPDATE_MODEL_EVENT, m as mutable, f as isBoolean, t as throwError } from './server.mjs';
import { isString, isArray, isPromise } from '@vue/shared';
import { castArray } from 'lodash-unified';

const emitChangeFn = (value) => isNumber(value) || isString(value) || isArray(value);
const collapseProps = buildProps({
  accordion: Boolean,
  modelValue: {
    type: definePropType([Array, String, Number]),
    default: () => mutable([])
  },
  expandIconPosition: {
    type: definePropType([String]),
    default: "right"
  },
  beforeCollapse: {
    type: definePropType(Function)
  }
});
const collapseEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn
};
const collapseContextKey = Symbol("collapseContextKey");
const SCOPE = "ElCollapse";
const useCollapse = (props, emit) => {
  const activeNames = ref(castArray(props.modelValue));
  const setActiveNames = (_activeNames) => {
    activeNames.value = _activeNames;
    const value = props.accordion ? activeNames.value[0] : activeNames.value;
    emit(UPDATE_MODEL_EVENT, value);
    emit(CHANGE_EVENT, value);
  };
  const handleChange = (name) => {
    if (props.accordion) {
      setActiveNames([activeNames.value[0] === name ? "" : name]);
    } else {
      const _activeNames = [...activeNames.value];
      const index = _activeNames.indexOf(name);
      if (index > -1) {
        _activeNames.splice(index, 1);
      } else {
        _activeNames.push(name);
      }
      setActiveNames(_activeNames);
    }
  };
  const handleItemClick = async (name) => {
    const { beforeCollapse } = props;
    if (!beforeCollapse) {
      handleChange(name);
      return;
    }
    const shouldChange = beforeCollapse(name);
    const isPromiseOrBool = [
      isPromise(shouldChange),
      isBoolean(shouldChange)
    ].includes(true);
    if (!isPromiseOrBool) {
      throwError(SCOPE, "beforeCollapse must return type `Promise<boolean>` or `boolean`");
    }
    if (isPromise(shouldChange)) {
      shouldChange.then((result) => {
        if (result !== false) {
          handleChange(name);
        }
      }).catch((e) => {
      });
    } else if (shouldChange) {
      handleChange(name);
    }
  };
  watch(() => props.modelValue, () => activeNames.value = castArray(props.modelValue), { deep: true });
  provide(collapseContextKey, {
    activeNames,
    handleItemClick
  });
  return {
    activeNames,
    setActiveNames
  };
};
const useCollapseDOM = (props) => {
  const ns = useNamespace("collapse");
  const rootKls = computed(() => [
    ns.b(),
    ns.b(`icon-position-${props.expandIconPosition}`)
  ]);
  return {
    rootKls
  };
};
const __default__$2 = defineComponent({
  name: "ElCollapse"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: collapseProps,
  emits: collapseEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const { activeNames, setActiveNames } = useCollapse(props, emit);
    const { rootKls } = useCollapseDOM(props);
    expose({
      activeNames,
      setActiveNames
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(rootKls))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Collapse = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "collapse.vue"]]);
const __default__$1 = defineComponent({
  name: "ElCollapseTransition"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  setup(__props) {
    const ns = useNamespace("collapse-transition");
    const reset = (el) => {
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };
    const on = {
      beforeEnter(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        if (el.style.height)
          el.dataset.elExistsHeight = el.style.height;
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },
      enter(el) {
        requestAnimationFrame(() => {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.elExistsHeight) {
            el.style.maxHeight = el.dataset.elExistsHeight;
          } else if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = 0;
          }
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = "hidden";
        });
      },
      afterEnter(el) {
        el.style.maxHeight = "";
        el.style.overflow = el.dataset.oldOverflow;
      },
      enterCancelled(el) {
        reset(el);
      },
      beforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },
      afterLeave(el) {
        reset(el);
      },
      leaveCancelled(el) {
        reset(el);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({
        name: unref(ns).b()
      }, toHandlers(on)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["name"]);
    };
  }
});
var CollapseTransition = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "collapse-transition.vue"]]);
const ElCollapseTransition = withInstall(CollapseTransition);
const collapseItemProps = buildProps({
  title: {
    type: String,
    default: ""
  },
  name: {
    type: definePropType([String, Number]),
    default: void 0
  },
  icon: {
    type: iconPropType,
    default: arrow_right_default
  },
  disabled: Boolean
});
const useCollapseItem = (props) => {
  const collapse = inject(collapseContextKey);
  const { namespace } = useNamespace("collapse");
  const focusing = ref(false);
  const isClick = ref(false);
  const idInjection = useIdInjection();
  const id = computed(() => idInjection.current++);
  const name = computed(() => {
    var _a;
    return (_a = props.name) != null ? _a : `${namespace.value}-id-${idInjection.prefix}-${unref(id)}`;
  });
  const isActive = computed(() => collapse == null ? void 0 : collapse.activeNames.value.includes(unref(name)));
  const handleFocus = () => {
    setTimeout(() => {
      if (!isClick.value) {
        focusing.value = true;
      } else {
        isClick.value = false;
      }
    }, 50);
  };
  const handleHeaderClick = (e) => {
    if (props.disabled)
      return;
    const target = e.target;
    if (target == null ? void 0 : target.closest("input, textarea, select"))
      return;
    collapse == null ? void 0 : collapse.handleItemClick(unref(name));
    focusing.value = false;
    isClick.value = true;
  };
  const handleEnterClick = (e) => {
    const target = e.target;
    if (target == null ? void 0 : target.closest("input, textarea, select"))
      return;
    e.preventDefault();
    collapse == null ? void 0 : collapse.handleItemClick(unref(name));
  };
  return {
    focusing,
    id,
    isActive,
    handleFocus,
    handleHeaderClick,
    handleEnterClick
  };
};
const useCollapseItemDOM = (props, { focusing, isActive, id }) => {
  const ns = useNamespace("collapse");
  const rootKls = computed(() => [
    ns.b("item"),
    ns.is("active", unref(isActive)),
    ns.is("disabled", props.disabled)
  ]);
  const headKls = computed(() => [
    ns.be("item", "header"),
    ns.is("active", unref(isActive)),
    { focusing: unref(focusing) && !props.disabled }
  ]);
  const arrowKls = computed(() => [
    ns.be("item", "arrow"),
    ns.is("active", unref(isActive))
  ]);
  const itemTitleKls = computed(() => [ns.be("item", "title")]);
  const itemWrapperKls = computed(() => ns.be("item", "wrap"));
  const itemContentKls = computed(() => ns.be("item", "content"));
  const scopedContentId = computed(() => ns.b(`content-${unref(id)}`));
  const scopedHeadId = computed(() => ns.b(`head-${unref(id)}`));
  return {
    itemTitleKls,
    arrowKls,
    headKls,
    rootKls,
    itemWrapperKls,
    itemContentKls,
    scopedContentId,
    scopedHeadId
  };
};
const __default__ = defineComponent({
  name: "ElCollapseItem"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: collapseItemProps,
  setup(__props, { expose }) {
    const props = __props;
    const {
      focusing,
      id,
      isActive,
      handleFocus,
      handleHeaderClick,
      handleEnterClick
    } = useCollapseItem(props);
    const {
      arrowKls,
      headKls,
      rootKls,
      itemTitleKls,
      itemWrapperKls,
      itemContentKls,
      scopedContentId,
      scopedHeadId
    } = useCollapseItemDOM(props, { focusing, isActive, id });
    expose({
      isActive
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(rootKls))
      }, [
        createElementVNode("div", {
          id: unref(scopedHeadId),
          class: normalizeClass(unref(headKls)),
          "aria-expanded": unref(isActive),
          "aria-controls": unref(scopedContentId),
          "aria-describedby": unref(scopedContentId),
          tabindex: _ctx.disabled ? -1 : 0,
          role: "button",
          onClick: unref(handleHeaderClick),
          onKeydown: withKeys(withModifiers(unref(handleEnterClick), ["stop"]), ["space", "enter"]),
          onFocus: unref(handleFocus),
          onBlur: ($event) => focusing.value = false
        }, [
          createElementVNode("span", {
            class: normalizeClass(unref(itemTitleKls))
          }, [
            renderSlot(_ctx.$slots, "title", { isActive: unref(isActive) }, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ])
          ], 2),
          renderSlot(_ctx.$slots, "icon", { isActive: unref(isActive) }, () => [
            createVNode(unref(ElIcon), {
              class: normalizeClass(unref(arrowKls))
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 42, ["id", "aria-expanded", "aria-controls", "aria-describedby", "tabindex", "onClick", "onKeydown", "onFocus", "onBlur"]),
        createVNode(unref(ElCollapseTransition), null, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              id: unref(scopedContentId),
              role: "region",
              class: normalizeClass(unref(itemWrapperKls)),
              "aria-hidden": !unref(isActive),
              "aria-labelledby": unref(scopedHeadId)
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(itemContentKls))
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)
            ], 10, ["id", "aria-hidden", "aria-labelledby"]), [
              [vShow, unref(isActive)]
            ])
          ]),
          _: 3
        })
      ], 2);
    };
  }
});
var CollapseItem = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "collapse-item.vue"]]);
const ElCollapse = withInstall(Collapse, {
  CollapseItem
});
const ElCollapseItem = withNoopInstall(CollapseItem);
const faqList = [
  {
    name: "1",
    headTitle: "PAYMENTS",
    list: [
      {
        name: "1-1",
        title: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
        content: "<p>We accept payments via PayPal and Credit Cards.</p>"
      },
      {
        name: "1-2",
        title: "I AM HAVING TROUBLE COMPLETING MY PAYMENT. WHAT SHOULD I DO?",
        content: `We apologize for the inconvenience. Please attempt an alternative payment method, or contact us directly at ${CONTACT_EMAIL} for assistance. We will respond promptly to resolve the issue.</p>`
      }
    ]
  },
  {
    name: "2",
    headTitle: "DELIVERY",
    list: [
      {
        name: "2-1",
        title: "HAS MY ORDER BEEN SHIPPED YET?",
        content: `<p>All orders are typically processed and shipped within 1-5 business days. You will receive an automated shipping notification email once your order has been dispatched. If you have not received a shipping notification after 7 business days, please contact us at ${CONTACT_EMAIL}.</p>`,
        quote: ["shopping"]
      },
      {
        name: "2-2",
        title: "HOW CAN I TRACK MY PACKAGE?",
        content: `<p>Upon shipment of your order, you will receive a separate email containing your tracking information. For any inquiries regarding your tracking details, please email us at ${CONTACT_EMAIL}.</p>`
      },
      {
        name: "2-3",
        title: "WHEN WILL I RECEIVE MY ORDER?",
        content: "<p>Delivery times vary depending on the destination country. Typically, orders are delivered within 1-2 weeks after the shipping notification email is sent. The provided tracking information will show the current status and any potential delays. Should you have any concerns about your shipment's progress, please do not hesitate to contact us.</p>"
      },
      {
        name: "2-4",
        title: "MY ORDER IS DELAYED. WHAT SHOULD I DO?",
        content: `<p>Please consult the tracking information provided in your shipping notification email for the most current status and any updates regarding delays. If the tracking details are unclear or you have specific concerns about your shipment, please contact us at ${CONTACT_EMAIL}.</p>`
      },
      {
        name: "2-5",
        title: "MY ORDER ARRIVED DAMAGED. WHAT SHOULD I DO?",
        content: `
                        <p>We sincerely apologize for this situation. To facilitate a resolution, please notify us via email at ${CONTACT_EMAIL} within 3 days of delivery. Kindly provide the following documentation to process your replacement:</p>
                        <br/>
                        <ol>
                            <li>Photograph of the damaged external packaging with shipping label clearly visible</li>
                            <li>Image showing the interior of the damaged package</li>
                            <li>Clear overview photograph of the damaged product</li>
                            <li>Detailed images highlighting specific damage areas</li>
                        </ol>
                        <br/>
                        <p>These materials are required for our claims process with the shipping carrier. Upon receipt and verification of the documentation, we will initiate your replacement shipment immediately. </p>
                    `
      },
      {
        name: "2-6",
        title: "HOW ARE ART PRINTS SHIPPED?",
        content: "<p>All art prints are sold unframed (standard) and are securely packaged using protective materials to ensure safe transit. </p>"
      },
      {
        name: "2-7",
        title: "IS PACKAGE ARRIVAL GUARANTEED?",
        content: `<p>Yes, we guarantee the safe arrival of your package. In the rare event of loss or damage during transit, we will either issue a full refund or dispatch a replacement. If you experience any such issue, please contact us at ${CONTACT_EMAIL}.</p>`
      },
      {
        name: "2-8",
        title: "DOES FREE SHIPPING MEAN THERE ARE NO CUSTOMS DUTIES OR TAXES?",
        content: `<p>Our shipping is free of charge; however, it does not include customs duties or import taxes. While most shipments do not incur additional charges, this depends on the regulations of your local customs authority. If you are required to pay duties or taxes and need assistance, please feel free to reach out to us at ${CONTACT_EMAIL}.</p>`
      }
    ]
  },
  {
    name: "3",
    headTitle: "ORDERS",
    list: [
      {
        name: "3-1",
        title: "I HAVEN'T RECEIVED MY ORDER CONFIRMATION / SHIPPING NOTIFICATION.",
        content: `<p>If our emails are not appearing in your inbox, please first check your spam folder. Alternatively, your email address may have been entered incorrectly during checkout. If neither scenario applies, please contact us immediately at ${CONTACT_EMAIL} for order verification. </p>`,
        quote: ["shopping"]
      },
      {
        name: "3-2",
        title: "I PROVIDED AN INCORRECT SHIPPING ADDRESS. HOW CAN I CORRECT THIS? ",
        content: `<p>For address modifications, please email us at ${CONTACT_EMAIL} as soon as possible.</p>`
      },
      {
        name: "3-3",
        title: "MY ORDER IS MISSING ITEMS. WHAT IS THE RESOLUTION PROCESS? ",
        content: `<p>We sincerely apologize for this oversight. Please contact us immediately at ${CONTACT_EMAIL} with your order details. We will investigate and resolve the matter promptly.</p>`
      },
      {
        name: "3-4",
        title: "I PURCHASED A PRE-ORDER ITEM. WHEN WILL IT SHIP?",
        content: `<p>The expected shipping timeframe for pre-order items is clearly indicated on each product page. If your item has not shipped by the specified date, please contact us at ${CONTACT_EMAIL} for assistance.</p>`
      }
    ]
  },
  {
    name: "4",
    headTitle: "RETURNS & REFUNDS",
    list: [
      {
        name: "4-1",
        title: "HOW DO I RETURN AN ITEM?",
        content: ` <p>If you are not fully satisfied with your purchase, you may return unused items in their original packaging within 14 days of delivery. Please initiate your return by emailing us at ${CONTACT_EMAIL} to receive authorization and return instructions. Return shipping costs are the customer's responsibility. Refunds will be processed as soon as we receive your returned package. Note: Returns initiated after 14 days cannot be accepted.</p>`,
        quote: ["shopping"]
      },
      {
        name: "4-2",
        title: "CAN I RETURN A PERSONALIZED ITEM?",
        content: "<p>Personalized items are final sale and cannot be returned or refunded due to their bespoke nature.</p>",
        quote: ["shopping"]
      },
      {
        name: "4-3",
        title: "WHAT SHOULD I DO IF MY REFUND IS INCORRECT?",
        content: `<p>We apologize for any discrepancy in your refund. Please contact us immediately at ${CONTACT_EMAIL} with your order details. We will investigate and resolve this matter promptly.</p>`
      },
      {
        name: "4-4",
        title: "CAN I GET A PRICE ADJUSTMENT IF MY PURCHASE GOES ON SALE?",
        content: "<p>We do not offer retroactive price adjustments or partial refunds for items purchased prior to sale periods.</p>"
      }
    ]
  },
  {
    name: "5",
    headTitle: "PRODUCT & STOCK",
    list: [
      {
        name: "5-1",
        title: "DO YOU ACCEPT REQUESTS FOR CUSTOM ARTWORK?",
        content: `<p>Custom sizing may be available for select art prints upon request. Please contact us at ${CONTACT_EMAIL} with your specifications. Important: Custom commissions require additional fees and are non-returnable.</p>`
      },
      {
        name: "5-2",
        title: "WILL SOLD-OUT ITEMS BE RESTOCKED?",
        content: `<p>While limited edition items typically will not be restocked, we periodically replenish popular designs based on demand. For availability inquiries about specific items, please contact us at ${CONTACT_EMAIL}. We'll gladly provide restock updates when available.</p>`
      }
    ]
  },
  {
    name: "6",
    headTitle: "WHOLESALE",
    list: [
      {
        name: "6-1",
        title: "WHOLESALE INQUIRIES",
        content: `<p>We welcome interest in stocking our art products! For wholesale opportunities, please contact our sales team at ${CONTACT_EMAIL}. We'll promptly send you the information.</p>`
      }
    ]
  }
];
const shoppingFaq = faqList.flatMap((category) => category.list).filter((item) => {
  var _a;
  return (_a = item.quote) == null ? void 0 : _a.includes("shopping");
});

export { ElCollapse as E, ElCollapseItem as a, faqList as f, shoppingFaq as s };
//# sourceMappingURL=faq-DxITp9IQ.mjs.map
