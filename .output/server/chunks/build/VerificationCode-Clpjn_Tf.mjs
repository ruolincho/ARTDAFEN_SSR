import { E as ElDialog } from './dialog-DQju9U68.mjs';
import { E as ElForm, a as ElFormItem } from './form-item-BeekeJ4U.mjs';
import { _ as _export_sfc, a8 as useAppStore, E as ElInput, a as ElButton } from './server.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, isRef, withCtx, createVNode, createBlock, openBlock, withModifiers, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-Dm_6RpzH.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "VerificationCode"
  },
  __name: "VerificationCode",
  __ssrInlineRender: true,
  props: {
    sendOption: { default: void 0 }
  },
  emits: ["update:token"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const appStore = useAppStore();
    const { sendCodeFn, verifyCodeFn } = useAuth();
    const visible = ref(false);
    const ruleForm = ref({
      captcha: ""
    });
    const rules = reactive({
      captcha: [{ required: true, message: "Please enter the verification captcha sent to your email address" }]
    });
    const sendCode = async () => {
      if (isShowCountDown.value) return;
      try {
        await sendCodeFn(props.sendOption);
        appStore.startCodeCountDown(60);
      } catch (error) {
        visible.value = false;
      }
    };
    const open = () => {
      visible.value = true;
      sendCode();
    };
    const isShowCountDown = computed(() => appStore.codeCountDown > 0);
    const ruleFormRef = ref();
    const verifyCode = () => {
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          const params = { captcha: ruleForm.value.captcha };
          if (props.sendOption.username) params.username = props.sendOption.username;
          const authToken = await verifyCodeFn(params);
          emit("update:token", authToken);
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
        "destroy-on-close": true,
        "close-on-click-modal": false,
        "close-on-press-escape": false,
        "show-close": true,
        width: "420px"
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-20 text-center f-bold mt-16" data-v-2073b044${_scopeId}>Verify Your Email Address</p>`);
          } else {
            return [
              createVNode("p", { class: "text-20 text-center f-bold mt-16" }, "Verify Your Email Address")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-center text-14 text-gray-600 mb-24" data-v-2073b044${_scopeId}>Kindly check your email inbox.</p>`);
            _push2(ssrRenderComponent(_component_el_form, {
              ref_key: "ruleFormRef",
              ref: ruleFormRef,
              model: unref(ruleForm),
              rules: unref(rules),
              "label-width": "auto",
              size: "large",
              "status-icon": "",
              "label-position": "top"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Verification Code",
                    prop: "captcha"
                  }, {
                    label: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span data-v-2073b044${_scopeId3}>Verification Code</span><p class="float-right text-secondary f-bold-500" data-v-2073b044${_scopeId3}>`);
                        if (!unref(isShowCountDown)) {
                          _push4(`<span class="cursor-pointer" data-v-2073b044${_scopeId3}>Resend Code</span>`);
                        } else {
                          _push4(`<span data-v-2073b044${_scopeId3}>Retrieve again in ${ssrInterpolate(unref(appStore).codeCountDown)} seconds</span>`);
                        }
                        _push4(`</p>`);
                      } else {
                        return [
                          createVNode("span", null, "Verification Code"),
                          createVNode("p", { class: "float-right text-secondary f-bold-500" }, [
                            !unref(isShowCountDown) ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "cursor-pointer",
                              onClick: withModifiers(sendCode, ["stop"])
                            }, "Resend Code")) : (openBlock(), createBlock("span", { key: 1 }, "Retrieve again in " + toDisplayString(unref(appStore).codeCountDown) + " seconds", 1))
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(ruleForm).captcha,
                          "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                          maxlength: 6,
                          placeholder: "Please enter the verification captcha sent to your email address"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(ruleForm).captcha,
                            "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                            maxlength: 6,
                            placeholder: "Please enter the verification captcha sent to your email address"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    class: "w-full mb-22",
                    type: "primary",
                    onClick: verifyCode
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` VERIFY ME <span class="iconfont icon-right-arrow ml-8 text-16" data-v-2073b044${_scopeId3}></span>`);
                      } else {
                        return [
                          createTextVNode(" VERIFY ME "),
                          createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "Verification Code",
                      prop: "captcha"
                    }, {
                      label: withCtx(() => [
                        createVNode("span", null, "Verification Code"),
                        createVNode("p", { class: "float-right text-secondary f-bold-500" }, [
                          !unref(isShowCountDown) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "cursor-pointer",
                            onClick: withModifiers(sendCode, ["stop"])
                          }, "Resend Code")) : (openBlock(), createBlock("span", { key: 1 }, "Retrieve again in " + toDisplayString(unref(appStore).codeCountDown) + " seconds", 1))
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(ruleForm).captcha,
                          "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                          maxlength: 6,
                          placeholder: "Please enter the verification captcha sent to your email address"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_button, {
                      class: "w-full mb-22",
                      type: "primary",
                      onClick: verifyCode
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "text-center text-14 text-gray-600 mb-24" }, "Kindly check your email inbox."),
              createVNode(_component_el_form, {
                ref_key: "ruleFormRef",
                ref: ruleFormRef,
                model: unref(ruleForm),
                rules: unref(rules),
                "label-width": "auto",
                size: "large",
                "status-icon": "",
                "label-position": "top"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "Verification Code",
                    prop: "captcha"
                  }, {
                    label: withCtx(() => [
                      createVNode("span", null, "Verification Code"),
                      createVNode("p", { class: "float-right text-secondary f-bold-500" }, [
                        !unref(isShowCountDown) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "cursor-pointer",
                          onClick: withModifiers(sendCode, ["stop"])
                        }, "Resend Code")) : (openBlock(), createBlock("span", { key: 1 }, "Retrieve again in " + toDisplayString(unref(appStore).codeCountDown) + " seconds", 1))
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(ruleForm).captcha,
                        "onUpdate:modelValue": ($event) => unref(ruleForm).captcha = $event,
                        maxlength: 6,
                        placeholder: "Please enter the verification captcha sent to your email address"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    class: "w-full mb-22",
                    type: "primary",
                    onClick: verifyCode
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" VERIFY ME "),
                      createVNode("span", { class: "iconfont icon-right-arrow ml-8 text-16" })
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VerificationCode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VerificationCode = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-2073b044"]]), { __name: "VerificationCode" });

export { VerificationCode as V };
//# sourceMappingURL=VerificationCode-Clpjn_Tf.mjs.map
