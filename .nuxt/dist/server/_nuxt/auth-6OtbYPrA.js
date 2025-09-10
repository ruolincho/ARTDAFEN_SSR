import { E as ElForm, a as ElFormItem } from "./form-item-BeekeJ4U.js";
import { u as useRoute, E as ElInput, a as ElButton, a2 as useNuxtApp, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./logo-DzgOjlOk.js";
import { u as useAuth } from "./useAuth-Dm_6RpzH.js";
import "@vue/shared";
import "lodash-unified";
import "async-validator";
import "@vueuse/core";
import "F:/artdafen-ui-ssr/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "F:/artdafen-ui-ssr/node_modules/hookable/dist/index.mjs";
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
import "@ctrl/tinycolor";
import "axios";
import "./custom-CnGfPiQ8.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const { loginFn } = useAuth();
    useRoute();
    const hasCode = ref(true);
    const notVerified = ref(false);
    const uuid = ref("");
    const ruleForm = ref({
      code: ""
    });
    const rules = reactive({
      code: [{ required: true, message: "Please enter your code" }]
    });
    const handleVerify = () => {
      loginFn({
        channel: "1",
        captcha: ruleForm.value.code,
        uuid: uuid.value,
        component: false
      });
    };
    const retryAuth = () => {
      const { $google } = useNuxtApp();
      $google.oAuth();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-container" }, _attrs))} data-v-9f635874>`);
      if (unref(notVerified)) {
        _push(`<div class="login-container border-gray-200 rounded-sm shadow-lg p-lg-32 p-20" data-v-9f635874><p class="text-20 text-center f-bold mb-16" data-v-9f635874>Verify Your Email Address</p><p class="text-center text-14 text-gray-600 mb-24" data-v-9f635874>Kindly check your email inbox.</p>`);
        _push(ssrRenderComponent(_component_el_form, {
          ref: "ruleFormRef",
          model: unref(ruleForm),
          rules: unref(rules),
          size: "large",
          "status-icon": "",
          "label-position": "top"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "Code",
                prop: "code"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(ruleForm).code,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).code = $event,
                      placeholder: "Please enter your code",
                      maxlength: "6"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(ruleForm).code,
                        "onUpdate:modelValue": ($event) => unref(ruleForm).code = $event,
                        placeholder: "Please enter your code",
                        maxlength: "6"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                class: "w-full",
                type: "primary",
                onClick: handleVerify
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` VERIFY ME <span class="iconfont icon-right-arrow ml-8 text-16" data-v-9f635874${_scopeId2}></span>`);
                  } else {
                    return [
                      createTextVNode(" VERIFY ME "),
                      createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_form_item, {
                  label: "Code",
                  prop: "code"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: unref(ruleForm).code,
                      "onUpdate:modelValue": ($event) => unref(ruleForm).code = $event,
                      placeholder: "Please enter your code",
                      maxlength: "6"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  class: "w-full",
                  type: "primary",
                  onClick: handleVerify
                }, {
                  default: withCtx(() => [
                    createTextVNode(" VERIFY ME "),
                    createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(hasCode)) {
          _push(`<div class="loading-content" data-v-9f635874><div class="loading-animate" data-v-9f635874><div class="circle" data-v-9f635874></div><img class="logo"${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-9f635874></div><p class="text-20 mt-24 text-gray-600" data-v-9f635874>Authorizing, please wait...</p></div>`);
        } else {
          _push(`<div class="error-content" data-v-9f635874><div class="error-icon" data-v-9f635874><span class="iconfont icon-error-fill" data-v-9f635874></span></div><p class="text-20 mt-25 text-gray-600" data-v-9f635874>Authorization failed</p>`);
          _push(ssrRenderComponent(_component_el_button, {
            type: "danger",
            size: "large",
            class: "mt-25",
            onClick: retryAuth
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Retry Authorization `);
              } else {
                return [
                  createTextVNode(" Retry Authorization ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const auth = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9f635874"]]);
export {
  auth as default
};
//# sourceMappingURL=auth-6OtbYPrA.js.map
