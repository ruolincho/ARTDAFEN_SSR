import { E as ElCollapse, f as faqList, a as ElCollapseItem } from './faq-DxITp9IQ.mjs';
import { E as ElForm, a as ElFormItem } from './form-item-BeekeJ4U.mjs';
import { _ as _export_sfc, u as useRoute, E as ElInput, a as ElButton, b as ElMessage } from './server.mjs';
import { E as ElSelect, a as ElOption } from './select-BBb6v1ax.mjs';
import { defineComponent, ref, reactive, watch, unref, isRef, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createTextVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { s as sendConsulting } from './message-DIUxZVmi.mjs';
import { e as emailReg } from './index-BuIDaW2O.mjs';
import '@vue/shared';
import 'lodash-unified';
import 'async-validator';
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
import './popper-BevOnpDk.mjs';
import '@popperjs/core';
import './index-QxVyGfSM.mjs';
import './scrollbar-BAU7-sWB.mjs';
import './index-TgbWtzhx.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const messageForm = ref({
      email: "",
      subject: "",
      message: ""
    });
    const rules = reactive({
      email: [
        { required: true, message: "Please enter your email" },
        { message: "Please enter the correct email address", pattern: emailReg }
      ],
      subject: [{ required: true, message: "Please select your subject" }],
      message: [{ required: true, message: "Please enter your message" }]
    });
    const sectionRefs = ref([]);
    const activeName = ref("");
    const scrollToSection = async (name) => {
      await nextTick();
      await nextTick();
      const sectionIndex = faqList.findIndex((item) => item.name === name.split("-")[0]);
      if (sectionIndex > -1 && sectionRefs.value[sectionIndex]) {
        sectionRefs.value[sectionIndex].scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        activeName.value = name;
      }
    };
    const ruleFormRef = ref();
    const handleSend = () => {
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        await sendConsulting(messageForm.value);
        ElMessage.success("Message sent successfully");
        ruleFormRef.value.resetFields();
      });
    };
    watch(() => route.query.name, (newVal) => {
      if (newVal) {
        scrollToSection(newVal);
      }
    }, {
      immediate: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_collapse = ElCollapse;
      const _component_el_collapse_item = ElCollapseItem;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      _push(`<section${ssrRenderAttrs(_attrs)} data-v-144dd291><div class="container" data-v-144dd291><h1 class="text-40 f-bold-500 py-lg-50 py-30" data-v-144dd291>Frequently Asked Questions</h1><div class="fq-container acea-row row-between row-top" data-v-144dd291><div class="fq-left" data-v-144dd291>`);
      _push(ssrRenderComponent(_component_el_collapse, {
        modelValue: unref(activeName),
        "onUpdate:modelValue": ($event) => isRef(activeName) ? activeName.value = $event : null,
        accordion: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(faqList), (item, index) => {
              _push2(`<div data-v-144dd291${_scopeId}><div class="text-center my-20 f-bold-500" data-v-144dd291${_scopeId}>${ssrInterpolate(item.headTitle)}</div><!--[-->`);
              ssrRenderList(item.list, (subItem) => {
                _push2(ssrRenderComponent(_component_el_collapse_item, {
                  title: subItem.title,
                  name: subItem.name,
                  key: subItem.name
                }, {
                  icon: withCtx(({ isActive }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p style="${ssrRenderStyle({ "margin-left": "auto" })}" data-v-144dd291${_scopeId2}><span class="${ssrRenderClass([isActive ? "icon-reduce" : "icon-add", "iconfont text-20 ml-10"])}" data-v-144dd291${_scopeId2}></span></p>`);
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
                    var _a;
                    if (_push3) {
                      _push3(`<div class="px-20 py-24" data-v-144dd291${_scopeId2}>${(_a = subItem.content) != null ? _a : ""}</div>`);
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
              _push2(`<!--]--></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(faqList), (item, index) => {
                return openBlock(), createBlock("div", {
                  key: index,
                  ref_for: true,
                  ref: (el) => unref(sectionRefs)[index] = el
                }, [
                  createVNode("div", { class: "text-center my-20 f-bold-500" }, toDisplayString(item.headTitle), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(item.list, (subItem) => {
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
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="fq-right shadow-lg p-xl-20 p-15" data-v-144dd291><p class="text-18 f-bold-500" data-v-144dd291>Couldn&#39;t find what you need? Contact Support.</p><p class="text-14 text-gray-600 mt-12 mb-24" data-v-144dd291> We typically reply within 5 business days. </p>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: unref(messageForm),
        rules: unref(rules),
        size: "large",
        ref_key: "ruleFormRef",
        ref: ruleFormRef
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, { prop: "email" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(messageForm).email,
                    "onUpdate:modelValue": ($event) => unref(messageForm).email = $event,
                    placeholder: "Email address"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(messageForm).email,
                      "onUpdate:modelValue": ($event) => unref(messageForm).email = $event,
                      placeholder: "Email address"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { prop: "subject" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: unref(messageForm).subject,
                    "onUpdate:modelValue": ($event) => unref(messageForm).subject = $event,
                    placeholder: "Subject",
                    clearable: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(faqList), (subject) => {
                          _push4(ssrRenderComponent(_component_el_option, {
                            key: subject.headTitle,
                            label: subject.headTitle,
                            value: subject.headTitle
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(faqList), (subject) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: subject.headTitle,
                              label: subject.headTitle,
                              value: subject.headTitle
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_select, {
                      modelValue: unref(messageForm).subject,
                      "onUpdate:modelValue": ($event) => unref(messageForm).subject = $event,
                      placeholder: "Subject",
                      clearable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(faqList), (subject) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: subject.headTitle,
                            label: subject.headTitle,
                            value: subject.headTitle
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { prop: "message" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(messageForm).message,
                    "onUpdate:modelValue": ($event) => unref(messageForm).message = $event,
                    type: "textarea",
                    rows: 4,
                    placeholder: "Message"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(messageForm).message,
                      "onUpdate:modelValue": ($event) => unref(messageForm).message = $event,
                      type: "textarea",
                      rows: 4,
                      placeholder: "Message"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              class: "",
              type: "primary",
              onClick: handleSend
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` SEND MESSAGE <span class="iconfont icon-right-arrow ml-8 text-16" data-v-144dd291${_scopeId2}></span>`);
                } else {
                  return [
                    createTextVNode(" SEND MESSAGE "),
                    createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form_item, { prop: "email" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(messageForm).email,
                    "onUpdate:modelValue": ($event) => unref(messageForm).email = $event,
                    placeholder: "Email address"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { prop: "subject" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: unref(messageForm).subject,
                    "onUpdate:modelValue": ($event) => unref(messageForm).subject = $event,
                    placeholder: "Subject",
                    clearable: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(faqList), (subject) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: subject.headTitle,
                          label: subject.headTitle,
                          value: subject.headTitle
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { prop: "message" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(messageForm).message,
                    "onUpdate:modelValue": ($event) => unref(messageForm).message = $event,
                    type: "textarea",
                    rows: 4,
                    placeholder: "Message"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                class: "",
                type: "primary",
                onClick: handleSend
              }, {
                default: withCtx(() => [
                  createTextVNode(" SEND MESSAGE "),
                  createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-144dd291"]]);

export { faq as default };
//# sourceMappingURL=faq-CyIoQ0Qh.mjs.map
