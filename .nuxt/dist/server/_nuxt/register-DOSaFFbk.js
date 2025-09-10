import { _ as __nuxt_component_1 } from "./nuxt-link-DR_c-RpP.js";
import { E as ElForm, a as ElFormItem } from "./form-item-BeekeJ4U.js";
import { E as ElInput, a as ElButton, _ as _export_sfc } from "../server.mjs";
import { E as ElCheckbox } from "./checkbox-BsmvevJL.js";
import { defineComponent, ref, reactive, withCtx, createVNode, unref, createTextVNode, createBlock, createCommentVNode, openBlock, isRef, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _imports_0 } from "./logo-DzgOjlOk.js";
import { u as useAuth } from "./useAuth-Dm_6RpzH.js";
import { e as emailReg } from "./index-BuIDaW2O.js";
import { V as VerificationCode } from "./VerificationCode-Clpjn_Tf.js";
import "F:/artdafen-ui-ssr/node_modules/ufo/dist/index.mjs";
import "@vue/shared";
import "lodash-unified";
import "async-validator";
import "@vueuse/core";
import "F:/artdafen-ui-ssr/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "F:/artdafen-ui-ssr/node_modules/hookable/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/unctx/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/h3/dist/index.mjs";
import "pinia";
import "F:/artdafen-ui-ssr/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "F:/artdafen-ui-ssr/node_modules/radix3/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/destr/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/ohash/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/klona/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/@unhead/vue/dist/index.mjs";
import "@ctrl/tinycolor";
import "axios";
import "./custom-CnGfPiQ8.js";
import "./dialog-DQju9U68.js";
import "./index-QxVyGfSM.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Register "
  },
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const { registerFn } = useAuth();
    const validateAgree = (rule, value, callback) => {
      if (!value) callback(new Error("Please agree to the terms and conditions"));
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (ruleForm.value.password !== value) callback(new Error("Passwords do not match"));
      callback();
    };
    const authToken = ref("");
    const ruleForm = ref({
      username: "",
      password: "",
      rePassword: "",
      inviteCode: "",
      agree: false
    });
    const rules = reactive({
      username: [
        { required: true, message: "Please enter your email address" },
        { message: "Please enter the correct email address", pattern: emailReg }
      ],
      password: [{ required: true, message: "Please enter your password" }],
      rePassword: [
        { required: true, message: "Please confirm your password" },
        { validator: validatePassword }
      ],
      agree: [{ validator: validateAgree }]
    });
    const ruleFormRef = ref();
    const verificationCodeRef = ref();
    const sendCode = () => {
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        try {
          verificationCodeRef.value?.open();
        } catch (error) {
          console.log(error);
        }
      });
    };
    const register2 = () => {
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        try {
          registerFn({ inviteCode: ruleForm.value.inviteCode, password: ruleForm.value.password }, authToken.value);
        } catch (error) {
          console.log(error);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_button = ElButton;
      _push(`<!--[--><div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" data-v-54187e44>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="logo"${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-54187e44${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "logo",
                src: _imports_0,
                alt: "logo"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-20 text-center f-bold my-24" data-v-54187e44>Let&#39;s get started!</p><p class="text-center text-14 text-gray-600 mb-24" data-v-54187e44> Create an account and get first access to the very best products, inspiration and community. </p>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "ruleFormRef",
        ref: ruleFormRef,
        model: unref(ruleForm),
        rules: unref(rules),
        "label-width": "360px",
        size: "large",
        "status-icon": "",
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(authToken)) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "Email Address",
                prop: "username"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(ruleForm).username,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).username = $event,
                      placeholder: "Please enter your email address"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(ruleForm).username,
                        "onUpdate:modelValue": ($event) => unref(ruleForm).username = $event,
                        placeholder: "Please enter your email address"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(authToken)) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "Password",
                prop: "password"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(ruleForm).password,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).password = $event,
                      type: "password",
                      placeholder: "Please enter your password",
                      "show-password": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(ruleForm).password,
                        "onUpdate:modelValue": ($event) => unref(ruleForm).password = $event,
                        type: "password",
                        placeholder: "Please enter your password",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(authToken)) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "Confirm Password",
                prop: "rePassword"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(ruleForm).rePassword,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).rePassword = $event,
                      type: "password",
                      placeholder: "Please confirm your password",
                      "show-password": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(ruleForm).rePassword,
                        "onUpdate:modelValue": ($event) => unref(ruleForm).rePassword = $event,
                        type: "password",
                        placeholder: "Please confirm your password",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(authToken)) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "Invite Code",
                prop: "inviteCode"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(ruleForm).inviteCode,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).inviteCode = $event,
                      placeholder: "Invite Code (Optional)"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(ruleForm).inviteCode,
                        "onUpdate:modelValue": ($event) => unref(ruleForm).inviteCode = $event,
                        placeholder: "Invite Code (Optional)"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_el_form_item, { prop: "agree" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="acea-row row-top" style="${ssrRenderStyle({ "line-height": "normal" })}" data-v-54187e44${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_checkbox, {
                    modelValue: unref(ruleForm).agree,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).agree = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="flex-1 ml-8 text-14 text-gray-600" data-v-54187e44${_scopeId2}><span data-v-54187e44${_scopeId2}>Are you agree to Clicon</span>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    class: "text-secondary cursor-pointer",
                    to: "/terms-and-conditions"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Terms of Condition `);
                      } else {
                        return [
                          createTextVNode(" Terms of Condition ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-54187e44${_scopeId2}>and</span>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    class: "text-secondary cursor-pointer",
                    to: "privacy-policy"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Privacy Policy. `);
                      } else {
                        return [
                          createTextVNode(" Privacy Policy. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</p></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "acea-row row-top",
                      style: { "line-height": "normal" }
                    }, [
                      createVNode(_component_el_checkbox, {
                        modelValue: unref(ruleForm).agree,
                        "onUpdate:modelValue": ($event) => unref(ruleForm).agree = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "flex-1 ml-8 text-14 text-gray-600" }, [
                        createVNode("span", null, "Are you agree to Clicon"),
                        createVNode(_component_NuxtLink, {
                          class: "text-secondary cursor-pointer",
                          to: "/terms-and-conditions"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Terms of Condition ")
                          ]),
                          _: 1
                        }),
                        createVNode("span", null, "and"),
                        createVNode(_component_NuxtLink, {
                          class: "text-secondary cursor-pointer",
                          to: "privacy-policy"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Privacy Policy. ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(authToken)) {
              _push2(ssrRenderComponent(_component_el_button, {
                class: "w-full mb-22",
                type: "primary",
                onClick: sendCode
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`SEND CODE <span class="iconfont icon-right-arrow ml-8 text-16" data-v-54187e44${_scopeId2}></span>`);
                  } else {
                    return [
                      createTextVNode("SEND CODE "),
                      createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(authToken)) {
              _push2(ssrRenderComponent(_component_el_button, {
                class: "w-full my-22",
                type: "primary",
                onClick: register2
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`CREATE ACCOUNT <span class="iconfont icon-right-arrow ml-8 text-16" data-v-54187e44${_scopeId2}></span>`);
                  } else {
                    return [
                      createTextVNode("CREATE ACCOUNT "),
                      createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !unref(authToken) ? (openBlock(), createBlock(_component_el_form_item, {
                key: 0,
                label: "Email Address",
                prop: "username"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(ruleForm).username,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).username = $event,
                    placeholder: "Please enter your email address"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(authToken) ? (openBlock(), createBlock(_component_el_form_item, {
                key: 1,
                label: "Password",
                prop: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(ruleForm).password,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).password = $event,
                    type: "password",
                    placeholder: "Please enter your password",
                    "show-password": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(authToken) ? (openBlock(), createBlock(_component_el_form_item, {
                key: 2,
                label: "Confirm Password",
                prop: "rePassword"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(ruleForm).rePassword,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).rePassword = $event,
                    type: "password",
                    placeholder: "Please confirm your password",
                    "show-password": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(authToken) ? (openBlock(), createBlock(_component_el_form_item, {
                key: 3,
                label: "Invite Code",
                prop: "inviteCode"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(ruleForm).inviteCode,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).inviteCode = $event,
                    placeholder: "Invite Code (Optional)"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_el_form_item, { prop: "agree" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: "acea-row row-top",
                    style: { "line-height": "normal" }
                  }, [
                    createVNode(_component_el_checkbox, {
                      modelValue: unref(ruleForm).agree,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).agree = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("p", { class: "flex-1 ml-8 text-14 text-gray-600" }, [
                      createVNode("span", null, "Are you agree to Clicon"),
                      createVNode(_component_NuxtLink, {
                        class: "text-secondary cursor-pointer",
                        to: "/terms-and-conditions"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Terms of Condition ")
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "and"),
                      createVNode(_component_NuxtLink, {
                        class: "text-secondary cursor-pointer",
                        to: "privacy-policy"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Privacy Policy. ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              !unref(authToken) ? (openBlock(), createBlock(_component_el_button, {
                key: 4,
                class: "w-full mb-22",
                type: "primary",
                onClick: sendCode
              }, {
                default: withCtx(() => [
                  createTextVNode("SEND CODE "),
                  createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(authToken) ? (openBlock(), createBlock(_component_el_button, {
                key: 5,
                class: "w-full my-22",
                type: "primary",
                onClick: register2
              }, {
                default: withCtx(() => [
                  createTextVNode("CREATE ACCOUNT "),
                  createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="acea-row row-middle text-14" data-v-54187e44><span class="text-gray-600" data-v-54187e44>Already have an account?</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-secondary ml-6 cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign in`);
          } else {
            return [
              createTextVNode("Sign in")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(VerificationCode, {
        token: unref(authToken),
        "onUpdate:token": ($event) => isRef(authToken) ? authToken.value = $event : null,
        sendOption: {
          username: unref(ruleForm).username,
          ifExists: true
        },
        ref_key: "verificationCodeRef",
        ref: verificationCodeRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-54187e44"]]);
export {
  register as default
};
//# sourceMappingURL=register-DOSaFFbk.js.map
