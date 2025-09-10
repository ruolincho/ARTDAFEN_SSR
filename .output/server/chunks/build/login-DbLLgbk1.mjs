import { _ as __nuxt_component_1 } from './nuxt-link-DR_c-RpP.mjs';
import { E as ElForm, a as ElFormItem } from './form-item-BeekeJ4U.mjs';
import { _ as _export_sfc, E as ElInput, a as ElButton } from './server.mjs';
import { E as ElDivider } from './divider-DgH3PmJB.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-DzgOjlOk.mjs';
import { _ as _imports_1 } from './google-CA8l_UnH.mjs';
import { u as useAuth, g as getCaptchaImageApi } from './useAuth-Dm_6RpzH.mjs';
import { e as emailReg } from './index-BuIDaW2O.mjs';
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
import '@vue/shared';
import 'lodash-unified';
import 'async-validator';
import '@vueuse/core';
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
import './custom-CnGfPiQ8.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Login"
  },
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { loginFn } = useAuth();
    const ruleForm = ref({
      username: "",
      password: "",
      captcha: ""
    });
    const rules = reactive({
      username: [
        { required: true, message: "Please enter your email address" },
        { message: "Please enter the correct email address", pattern: emailReg }
      ],
      password: [{ required: true, message: "Please enter your password" }],
      captcha: [{ required: true, message: "Please enter your captcha" }]
    });
    const captchaLoading = ref(false);
    const captchaData = ref({
      // 验证码图像对象
      imgStream: "",
      uuid: ""
    });
    const reloadCaptcha = async () => {
      if (captchaLoading.value) return;
      captchaLoading.value = true;
      const { data } = await getCaptchaImageApi();
      captchaData.value = data;
      captchaLoading.value = false;
    };
    const ruleFormRef = ref();
    const submitting = ref(false);
    const handleLogin = () => {
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          submitting.value = true;
          await loginFn({
            ...ruleForm.value,
            uuid: captchaData.value.uuid,
            channel: "0"
          });
        } catch (e) {
          await reloadCaptcha();
        } finally {
          submitting.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_divider = ElDivider;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" }, _attrs))} data-v-3ab15b3d>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="logo"${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-3ab15b3d${_scopeId}>`);
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
      _push(`<p class="text-20 text-center f-bold my-24" data-v-3ab15b3d>Welcome Back</p>`);
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
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "Password",
              prop: "password"
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-3ab15b3d${_scopeId2}>Password</span>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    class: "cursor-pointer float-right text-secondary f-bold-500",
                    to: "/forget-password"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Forget Password`);
                      } else {
                        return [
                          createTextVNode("Forget Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Password"),
                    createVNode(_component_NuxtLink, {
                      class: "cursor-pointer float-right text-secondary f-bold-500",
                      to: "/forget-password"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Forget Password")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
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
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "Captcha",
              prop: "captcha"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(ruleForm).captcha,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                    placeholder: "Please enter your captcha",
                    maxlength: "6"
                  }, {
                    suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img class="captcha-img cursor-pointer"${ssrRenderAttr("src", unref(captchaData).imgStream)} alt="captcha" data-v-3ab15b3d${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            class: "captcha-img cursor-pointer",
                            src: unref(captchaData).imgStream,
                            alt: "captcha",
                            onClick: ($event) => reloadCaptcha()
                          }, null, 8, ["src", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(ruleForm).captcha,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                      placeholder: "Please enter your captcha",
                      maxlength: "6"
                    }, {
                      suffix: withCtx(() => [
                        createVNode("img", {
                          class: "captcha-img cursor-pointer",
                          src: unref(captchaData).imgStream,
                          alt: "captcha",
                          onClick: ($event) => reloadCaptcha()
                        }, null, 8, ["src", "onClick"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              class: "w-full mb-22",
              type: "primary",
              loading: unref(submitting),
              onClick: handleLogin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` SIGN IN <span class="iconfont icon-right-arrow ml-8 text-16" data-v-3ab15b3d${_scopeId2}></span>`);
                } else {
                  return [
                    createTextVNode(" SIGN IN "),
                    createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form_item, {
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
              }),
              createVNode(_component_el_form_item, {
                label: "Password",
                prop: "password"
              }, {
                label: withCtx(() => [
                  createVNode("span", null, "Password"),
                  createVNode(_component_NuxtLink, {
                    class: "cursor-pointer float-right text-secondary f-bold-500",
                    to: "/forget-password"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Forget Password")
                    ]),
                    _: 1
                  })
                ]),
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
              }),
              createVNode(_component_el_form_item, {
                label: "Captcha",
                prop: "captcha"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(ruleForm).captcha,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                    placeholder: "Please enter your captcha",
                    maxlength: "6"
                  }, {
                    suffix: withCtx(() => [
                      createVNode("img", {
                        class: "captcha-img cursor-pointer",
                        src: unref(captchaData).imgStream,
                        alt: "captcha",
                        onClick: ($event) => reloadCaptcha()
                      }, null, 8, ["src", "onClick"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                class: "w-full mb-22",
                type: "primary",
                loading: unref(submitting),
                onClick: handleLogin
              }, {
                default: withCtx(() => [
                  createTextVNode(" SIGN IN "),
                  createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                ]),
                _: 1
              }, 8, ["loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="acea-row row-middle text-14" data-v-3ab15b3d><span class="text-gray-600" data-v-3ab15b3d>Don&#39;t have an account?</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-secondary ml-6 cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create account`);
          } else {
            return [
              createTextVNode("Create account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_divider, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-gray-600 text-14" data-v-3ab15b3d${_scopeId}>or</span>`);
          } else {
            return [
              createVNode("span", { class: "text-gray-600 text-14" }, "or")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="other-login text-14 text-gray-600 border-sm border-gray-600 text-center cursor-pointer" data-v-3ab15b3d><img class="icon"${ssrRenderAttr("src", _imports_1)} alt="google" data-v-3ab15b3d> Login with Google </div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ab15b3d"]]);

export { login as default };
//# sourceMappingURL=login-DbLLgbk1.mjs.map
