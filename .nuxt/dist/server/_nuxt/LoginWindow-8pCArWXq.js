import { E as ElDialog } from "./dialog-DQju9U68.js";
import { E as ElForm, a as ElFormItem } from "./form-item-BeekeJ4U.js";
import { u as useRoute, E as ElInput, a as ElButton, a2 as useNuxtApp, a5 as STORAGE_BACK_URL, ae as LOGIN_URL, a6 as HOME_URL, _ as _export_sfc } from "../server.mjs";
import { _ as __nuxt_component_1 } from "./nuxt-link-DR_c-RpP.js";
import { E as ElDivider } from "./divider-DgH3PmJB.js";
import { defineComponent, ref, reactive, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./logo-DzgOjlOk.js";
import { _ as _imports_1 } from "./google-CA8l_UnH.js";
import { u as useAuth, g as getCaptchaImageApi } from "./useAuth-Dm_6RpzH.js";
import { e as emailReg } from "./index-BuIDaW2O.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "LoginWindow"
  },
  __name: "LoginWindow",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const route = useRoute();
    const visible = ref(false);
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
    const handleLogin = () => {
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          await loginFn({
            ...ruleForm.value,
            uuid: captchaData.value.uuid,
            channel: "0",
            component: true
          });
          visible.value = false;
        } catch (e) {
          await reloadCaptcha();
        }
      });
    };
    const toGoogleAuth = () => {
      const { $google } = useNuxtApp();
      let path = route.fullPath;
      if (path === LOGIN_URL) path = HOME_URL;
      (void 0).localStorage.setItem(STORAGE_BACK_URL, path);
      $google.oAuth();
    };
    const open = () => {
      visible.value = true;
    };
    __expose({
      open
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_el_button = ElButton;
      const _component_el_divider = ElDivider;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: unref(visible),
        "onUpdate:modelValue": ($event) => isRef(visible) ? visible.value = $event : null,
        "destroy-on-close": true,
        width: "424px",
        "append-to-body": "",
        class: "wall-dialog"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" data-v-cb1d7acb${_scopeId}><img class="logo"${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-cb1d7acb${_scopeId}><p class="text-20 text-center f-bold my-24" data-v-cb1d7acb${_scopeId}>Welcome Back</p>`);
            _push2(ssrRenderComponent(_component_el_form, {
              ref_key: "ruleFormRef",
              ref: ruleFormRef,
              model: unref(ruleForm),
              rules: unref(rules),
              "label-width": "360px",
              size: "large",
              "status-icon": "",
              "label-position": "top"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Email Address",
                    prop: "username"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(ruleForm).username,
                          "onUpdate:modelValue": ($event) => unref(ruleForm).username = $event,
                          placeholder: "Please enter your email address"
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Password",
                    prop: "password"
                  }, {
                    label: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span data-v-cb1d7acb${_scopeId3}>Password</span>`);
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          class: "cursor-pointer float-right text-secondary f-bold-500",
                          to: "/forget-password"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Forget Password `);
                            } else {
                              return [
                                createTextVNode("Forget Password ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("span", null, "Password"),
                          createVNode(_component_NuxtLink, {
                            class: "cursor-pointer float-right text-secondary f-bold-500",
                            to: "/forget-password"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Forget Password ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(ruleForm).password,
                          "onUpdate:modelValue": ($event) => unref(ruleForm).password = $event,
                          type: "password",
                          placeholder: "Please enter your password",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Captcha",
                    prop: "captcha"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(ruleForm).captcha,
                          "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                          placeholder: "Please enter your captcha",
                          maxlength: "6"
                        }, {
                          suffix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img class="captcha-img cursor-pointer"${ssrRenderAttr("src", unref(captchaData).imgStream)} alt="captcha" data-v-cb1d7acb${_scopeId4}>`);
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
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    class: "w-full mb-22",
                    type: "primary",
                    onClick: handleLogin
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` SIGN IN <span class="iconfont icon-right-arrow ml-8 text-16" data-v-cb1d7acb${_scopeId3}></span>`);
                      } else {
                        return [
                          createTextVNode(" SIGN IN "),
                          createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                            createTextVNode("Forget Password ")
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
                      onClick: handleLogin
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" SIGN IN "),
                        createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="acea-row row-middle text-14" data-v-cb1d7acb${_scopeId}><span class="text-gray-600" data-v-cb1d7acb${_scopeId}>Don&#39;t have an account?</span>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              class: "text-secondary ml-6 cursor-pointer"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create account`);
                } else {
                  return [
                    createTextVNode("Create account")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_divider, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-gray-600 text-14" data-v-cb1d7acb${_scopeId2}>or</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-600 text-14" }, "or")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="other-login text-14 text-gray-600 border-sm border-gray-600 text-center cursor-pointer" data-v-cb1d7acb${_scopeId}><img class="icon"${ssrRenderAttr("src", _imports_1)} alt="google" data-v-cb1d7acb${_scopeId}> Login with Google </div></div>`);
          } else {
            return [
              createVNode("div", { class: "login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" }, [
                createVNode("img", {
                  class: "logo",
                  src: _imports_0,
                  alt: "logo"
                }),
                createVNode("p", { class: "text-20 text-center f-bold my-24" }, "Welcome Back"),
                createVNode(_component_el_form, {
                  ref_key: "ruleFormRef",
                  ref: ruleFormRef,
                  model: unref(ruleForm),
                  rules: unref(rules),
                  "label-width": "360px",
                  size: "large",
                  "status-icon": "",
                  "label-position": "top"
                }, {
                  default: withCtx(() => [
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
                            createTextVNode("Forget Password ")
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
                      onClick: handleLogin
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" SIGN IN "),
                        createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["model", "rules"]),
                createVNode("div", { class: "acea-row row-middle text-14" }, [
                  createVNode("span", { class: "text-gray-600" }, "Don't have an account?"),
                  createVNode(_component_NuxtLink, {
                    to: "/register",
                    class: "text-secondary ml-6 cursor-pointer"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Create account")
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_el_divider, null, {
                  default: withCtx(() => [
                    createVNode("span", { class: "text-gray-600 text-14" }, "or")
                  ]),
                  _: 1
                }),
                createVNode("div", {
                  class: "other-login text-14 text-gray-600 border-sm border-gray-600 text-center cursor-pointer",
                  onClick: toGoogleAuth
                }, [
                  createVNode("img", {
                    class: "icon",
                    src: _imports_1,
                    alt: "google"
                  }),
                  createTextVNode(" Login with Google ")
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginWindow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LoginWindow = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-cb1d7acb"]]), { __name: "LoginWindow" });
export {
  LoginWindow as L
};
//# sourceMappingURL=LoginWindow-8pCArWXq.js.map
