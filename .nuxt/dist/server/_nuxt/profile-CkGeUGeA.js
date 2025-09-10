import { defineComponent, ref, reactive, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, useSSRContext, resolveComponent, createBlock, createCommentVNode, openBlock, Fragment } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { a3 as useUserStore, E as ElInput, a as ElButton, aV as modifyInfoApi, b as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElDialog } from "./dialog-DQju9U68.js";
import { E as ElForm, a as ElFormItem } from "./form-item-BeekeJ4U.js";
import { _ as _imports_0 } from "./logo-DzgOjlOk.js";
import { V as VerificationCode } from "./VerificationCode-Clpjn_Tf.js";
import { u as useAuth } from "./useAuth-Dm_6RpzH.js";
import { e as emailReg } from "./index-BuIDaW2O.js";
import "F:/artdafen-ui-ssr/node_modules/hookable/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "F:/artdafen-ui-ssr/node_modules/unctx/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/h3/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/ufo/dist/index.mjs";
import "pinia";
import "F:/artdafen-ui-ssr/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "F:/artdafen-ui-ssr/node_modules/radix3/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/destr/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/ohash/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/klona/dist/index.mjs";
import "F:/artdafen-ui-ssr/node_modules/@unhead/vue/dist/index.mjs";
import "@vueuse/core";
import "lodash-unified";
import "@vue/shared";
import "@ctrl/tinycolor";
import "axios";
import "./index-QxVyGfSM.js";
import "async-validator";
import "./custom-CnGfPiQ8.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "UserInfoForm"
  },
  __name: "UserInfoForm",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const userStore = useUserStore();
    const formData = ref({
      nickname: userStore.userInfo.nickname,
      intro: userStore.userInfo.intro
    });
    const rules = reactive({
      nickname: [{ required: true, message: "Please enter your nickname" }],
      intro: [{ required: true, message: "Please enter your introduction" }]
    });
    const visible = ref(false);
    const open = () => {
      visible.value = true;
    };
    const ruleFormRef = ref();
    const handleSubmit = () => {
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          await modifyInfoApi(formData.value);
          ElMessage.success("Modify user information success");
          await userStore.getUserEcho();
          visible.value = false;
        } catch (error) {
          console.log(error);
        }
      });
    };
    __expose({
      open
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: unref(visible),
        "onUpdate:modelValue": ($event) => isRef(visible) ? visible.value = $event : null,
        title: "Edit user information",
        "destroy-on-close": true,
        width: "490px"
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              class: "flex-1",
              onClick: ($event) => visible.value = false,
              size: "large"
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
              class: "flex-1",
              type: "primary",
              onClick: handleSubmit,
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Submit`);
                } else {
                  return [
                    createTextVNode("Submit")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                class: "flex-1",
                onClick: ($event) => visible.value = false,
                size: "large"
              }, {
                default: withCtx(() => [
                  createTextVNode("Cancel")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, {
                class: "flex-1",
                type: "primary",
                onClick: handleSubmit,
                size: "large"
              }, {
                default: withCtx(() => [
                  createTextVNode("Submit")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              ref_key: "ruleFormRef",
              ref: ruleFormRef,
              model: unref(formData),
              rules: unref(rules),
              "label-width": "auto",
              "label-position": "top",
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Nickname",
                    prop: "nickname"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(formData).nickname,
                          "onUpdate:modelValue": ($event) => unref(formData).nickname = $event,
                          placeholder: "Please enter your nickname"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(formData).nickname,
                            "onUpdate:modelValue": ($event) => unref(formData).nickname = $event,
                            placeholder: "Please enter your nickname"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Introduction",
                    prop: "intro"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(formData).intro,
                          "onUpdate:modelValue": ($event) => unref(formData).intro = $event,
                          type: "textarea",
                          rows: 5,
                          placeholder: "Please enter your introduction"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(formData).intro,
                            "onUpdate:modelValue": ($event) => unref(formData).intro = $event,
                            type: "textarea",
                            rows: 5,
                            placeholder: "Please enter your introduction"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "Nickname",
                      prop: "nickname"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(formData).nickname,
                          "onUpdate:modelValue": ($event) => unref(formData).nickname = $event,
                          placeholder: "Please enter your nickname"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "Introduction",
                      prop: "intro"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(formData).intro,
                          "onUpdate:modelValue": ($event) => unref(formData).intro = $event,
                          type: "textarea",
                          rows: 5,
                          placeholder: "Please enter your introduction"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                ref_key: "ruleFormRef",
                ref: ruleFormRef,
                model: unref(formData),
                rules: unref(rules),
                "label-width": "auto",
                "label-position": "top",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "Nickname",
                    prop: "nickname"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(formData).nickname,
                        "onUpdate:modelValue": ($event) => unref(formData).nickname = $event,
                        placeholder: "Please enter your nickname"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "Introduction",
                    prop: "intro"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(formData).intro,
                        "onUpdate:modelValue": ($event) => unref(formData).intro = $event,
                        type: "textarea",
                        rows: 5,
                        placeholder: "Please enter your introduction"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserInfoForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const UserInfoForm = Object.assign(_sfc_main$2, { __name: "UserInfoForm" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ResetPasswordWindow"
  },
  __name: "ResetPasswordWindow",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const visible = ref(false);
    const userStore = useUserStore();
    const { resetPasswordFn, logoutFn } = useAuth();
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
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          await resetPasswordFn({ channel: "0", password: ruleForm.value.password }, authToken.value);
          ElMessage.success("Password reset successfully");
          logoutFn();
        } catch (error) {
          console.log(error);
        }
      });
    };
    const open = () => {
      ruleForm.value.username = userStore.userInfo.email;
      visible.value = true;
    };
    __expose({
      open
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_router_link = resolveComponent("router-link");
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: unref(visible),
        "onUpdate:modelValue": ($event) => isRef(visible) ? visible.value = $event : null,
        "destroy-on-close": true,
        width: "424px",
        "append-to-body": "",
        class: "wall-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" data-v-352e77ca${_scopeId}>`);
            _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img class="logo"${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-352e77ca${_scopeId2}>`);
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
            }, _parent2, _scopeId));
            _push2(`<p class="text-20 text-center f-bold my-24" data-v-352e77ca${_scopeId}>`);
            if (!unref(authToken)) {
              _push2(`<!--[-->Reset Password<!--]-->`);
            } else {
              _push2(`<!--[-->Reset Password<!--]-->`);
            }
            _push2(`</p><p class="text-center text-14 text-gray-600 mb-24" data-v-352e77ca${_scopeId}>`);
            if (!unref(authToken)) {
              _push2(`<!--[-->Enter the email address or mobile phone number associated with your Clicon account. <!--]-->`);
            } else {
              _push2(`<!--[-->Duis sagittis molestie tellus, at eleifend sapien pellque quis. Fusce lorem nunc, fringilla sit amet nunc. <!--]-->`);
            }
            _push2(`</p>`);
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
                  if (!unref(authToken)) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "Email Address",
                      prop: "username"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: unref(ruleForm).username,
                            "onUpdate:modelValue": ($event) => unref(ruleForm).username = $event,
                            placeholder: "Please enter your email address",
                            disabled: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: unref(ruleForm).username,
                              "onUpdate:modelValue": ($event) => unref(ruleForm).username = $event,
                              placeholder: "Please enter your email address",
                              disabled: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(authToken)) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "Password",
                      prop: "password"
                    }, {
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
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(authToken)) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "Confirm Password",
                      prop: "rePassword"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: unref(ruleForm).rePassword,
                            "onUpdate:modelValue": ($event) => unref(ruleForm).rePassword = $event,
                            type: "password",
                            placeholder: "Please confirm your password",
                            "show-password": ""
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!unref(authToken)) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: "w-full",
                      type: "primary",
                      onClick: sendCode
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` SEND CODE <span class="iconfont icon-right-arrow ml-8 text-16" data-v-352e77ca${_scopeId3}></span>`);
                        } else {
                          return [
                            createTextVNode(" SEND CODE "),
                            createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(authToken)) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: "w-full",
                      type: "primary",
                      onClick: resetPassword
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` RESET PASSWORD <span class="iconfont icon-right-arrow ml-8 text-16" data-v-352e77ca${_scopeId3}></span>`);
                        } else {
                          return [
                            createTextVNode(" RESET PASSWORD "),
                            createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
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
                          placeholder: "Please enter your email address",
                          disabled: ""
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
                      class: "w-full",
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
                      class: "w-full",
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" }, [
                createVNode(_component_router_link, { to: "/" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "logo",
                      src: _imports_0,
                      alt: "logo"
                    })
                  ]),
                  _: 1
                }),
                createVNode("p", { class: "text-20 text-center f-bold my-24" }, [
                  !unref(authToken) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createTextVNode("Reset Password")
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("Reset Password")
                  ], 64))
                ]),
                createVNode("p", { class: "text-center text-14 text-gray-600 mb-24" }, [
                  !unref(authToken) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createTextVNode("Enter the email address or mobile phone number associated with your Clicon account. ")
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("Duis sagittis molestie tellus, at eleifend sapien pellque quis. Fusce lorem nunc, fringilla sit amet nunc. ")
                  ], 64))
                ]),
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
                    !unref(authToken) ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "Email Address",
                      prop: "username"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(ruleForm).username,
                          "onUpdate:modelValue": ($event) => unref(ruleForm).username = $event,
                          placeholder: "Please enter your email address",
                          disabled: ""
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
                      class: "w-full",
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
                      class: "w-full",
                      type: "primary",
                      onClick: resetPassword
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" RESET PASSWORD "),
                        createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["model", "rules"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VerificationCode, {
        token: unref(authToken),
        "onUpdate:token": ($event) => isRef(authToken) ? authToken.value = $event : null,
        sendOption: {},
        ref_key: "verificationCodeRef",
        ref: verificationCodeRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ResetPasswordWindow.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ResetPasswordWindow = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-352e77ca"]]), { __name: "ResetPasswordWindow" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Profile"
  },
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const userInfoFormRef = ref();
    const resetPasswordWindowRef = ref();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="text-24 f-bold mb-md-20 mb-15">Account Details</div><div class="p-20 shadow-lg rounded-sm mb-15"><div class="acea-row row-between-wrapper mb-20 f-bold"><span class="text-18">My Profile</span><span class="text-14 cursor-pointer">Edit</span></div><div class="row gap-row-base text-16"><div class="col-sm-4 col-12"><div class="mb-10 f-bold">Nickname</div><div>${ssrInterpolate(unref(userStore).userInfo.nickname)}</div></div><div class="col-sm-4 col-12"><div class="mb-10 f-bold">Email</div><div>${ssrInterpolate(unref(userStore).userInfo.email)}</div></div><div class="col-sm-4 col-12"><div class="mb-10 f-bold">Introduction</div><div>${ssrInterpolate(unref(userStore).userInfo.intro)}</div></div></div></div><div class="p-20 shadow-lg rounded-sm mb-15"><div class="acea-row row-between-wrapper mb-20 f-bold"><span class="text-18">Password</span><span class="text-14 cursor-pointer">Edit</span></div><div class="row gap-row-base text-16"><div class="col-sm-4 col-12"><div class="mb-10 f-bold">Password</div><div>••••••••</div></div></div></div>`);
      _push(ssrRenderComponent(UserInfoForm, {
        ref_key: "userInfoFormRef",
        ref: userInfoFormRef
      }, null, _parent));
      _push(ssrRenderComponent(ResetPasswordWindow, {
        ref_key: "resetPasswordWindowRef",
        ref: resetPasswordWindowRef
      }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=profile-CkGeUGeA.js.map
