import { _ as __nuxt_component_1 } from "./nuxt-link-DR_c-RpP.js";
import { E as ElForm, a as ElFormItem } from "./form-item-BeekeJ4U.js";
import { a4 as useRouter, E as ElInput, a as ElButton, o as CONTACT_EMAIL, b as ElMessage, ae as LOGIN_URL, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, reactive, withCtx, createVNode, unref, createTextVNode, createBlock, createCommentVNode, openBlock, isRef, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./logo-DzgOjlOk.js";
import { V as VerificationCode } from "./VerificationCode-Clpjn_Tf.js";
import { u as useAuth } from "./useAuth-Dm_6RpzH.js";
import { e as emailReg } from "./index-BuIDaW2O.js";
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
import "./dialog-DQju9U68.js";
import "./index-QxVyGfSM.js";
import "./custom-CnGfPiQ8.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ResetPassword"
  },
  __name: "forget-password",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const { resetPasswordFn } = useAuth();
    const validatePassword = (rule, value, callback) => {
      if (ruleForm.value.password !== value) callback(new Error("Passwords do not match"));
      callback();
    };
    const authToken = ref("");
    const ruleForm = ref({
      username: "",
      password: "",
      rePassword: ""
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
      ]
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
    const resetPassword = () => {
      ruleFormRef.value.validate((valid) => {
        if (!valid) return;
        try {
          resetPasswordFn({ channel: "0", password: ruleForm.value.password }, authToken.value);
          ElMessage.success("Password reset successfully");
          router.replace(LOGIN_URL);
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
      const _component_el_button = ElButton;
      _push(`<!--[--><div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" data-v-a404a318>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="logo"${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-a404a318${_scopeId}>`);
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
      _push(`<p class="text-20 text-center f-bold my-24" data-v-a404a318>`);
      if (!unref(authToken)) {
        _push(`<!--[-->Forget Password<!--]-->`);
      } else {
        _push(`<!--[-->Reset Password<!--]-->`);
      }
      _push(`</p><p class="text-center text-14 text-gray-600 mb-24" data-v-a404a318>`);
      if (!unref(authToken)) {
        _push(`<!--[-->Enter the email address or mobile phone number associated with your Clicon account. <!--]-->`);
      } else {
        _push(`<!--[-->Duis sagittis molestie tellus, at eleifend sapien pellque quis. Fusce lorem nunc, fringilla sit amet nunc. <!--]-->`);
      }
      _push(`</p>`);
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
            if (!unref(authToken)) {
              _push2(ssrRenderComponent(_component_el_button, {
                class: "w-full mb-22",
                type: "primary",
                onClick: sendCode
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` SEND CODE <span class="iconfont icon-right-arrow ml-8 text-16" data-v-a404a318${_scopeId2}></span>`);
                  } else {
                    return [
                      createTextVNode(" SEND CODE "),
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
                class: "w-full mb-22",
                type: "primary",
                onClick: resetPassword
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` RESET PASSWORD <span class="iconfont icon-right-arrow ml-8 text-16" data-v-a404a318${_scopeId2}></span>`);
                  } else {
                    return [
                      createTextVNode(" RESET PASSWORD "),
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
              !unref(authToken) ? (openBlock(), createBlock(_component_el_button, {
                key: 3,
                class: "w-full mb-22",
                type: "primary",
                onClick: sendCode
              }, {
                default: withCtx(() => [
                  createTextVNode(" SEND CODE "),
                  createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(authToken) ? (openBlock(), createBlock(_component_el_button, {
                key: 4,
                class: "w-full mb-22",
                type: "primary",
                onClick: resetPassword
              }, {
                default: withCtx(() => [
                  createTextVNode(" RESET PASSWORD "),
                  createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="acea-row row-middle text-14" data-v-a404a318><span class="text-gray-600" data-v-a404a318>Already have an account?</span>`);
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
      _push(`</div><div class="acea-row row-middle text-14 mt-8" data-v-a404a318><span class="text-gray-600" data-v-a404a318>Don’t have account?</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-secondary ml-6 cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign Up`);
          } else {
            return [
              createTextVNode("Sign Up")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-14 text-gray-600 pt-24 mt-24 border-t-sm border-gray-200" data-v-a404a318>You may contact <a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}`)} class="text-primary cursor-pointer f-bold" data-v-a404a318>Customer Service</a> for help restoring access to your account. </div></div>`);
      _push(ssrRenderComponent(VerificationCode, {
        token: unref(authToken),
        "onUpdate:token": ($event) => isRef(authToken) ? authToken.value = $event : null,
        sendOption: {
          username: unref(ruleForm).username,
          ifExists: false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forget-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const forgetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a404a318"]]);
export {
  forgetPassword as default
};
//# sourceMappingURL=forget-password-DyrY8_B2.js.map
