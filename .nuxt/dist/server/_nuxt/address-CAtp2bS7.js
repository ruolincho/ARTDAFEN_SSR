import { E as ElDialog } from "./dialog-DQju9U68.js";
import { E as ElForm, a as ElFormItem } from "./form-item-BeekeJ4U.js";
import { $ as $http, a0 as USER_MODULE, E as ElInput, a as ElButton, b as ElMessage } from "../server.mjs";
import { E as ElSelect, a as ElOption } from "./select-BBb6v1ax.js";
import { E as ElCheckbox } from "./checkbox-BsmvevJL.js";
/* empty css             */
import "./scrollbar-BAU7-sWB.js";
import "./popper-BevOnpDk.js";
import { defineComponent, reactive, ref, mergeProps, unref, isRef, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const getStateOptionApi = (params) => {
  return $http().get(USER_MODULE + `/map/state`, params);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "AddressInfoForm"
  },
  __name: "AddressInfoForm",
  __ssrInlineRender: true,
  emits: ["add"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const rules = reactive({
      firstName: [{ required: true, message: "Please enter first name" }],
      lastName: [{ required: true, message: "Please enter last name" }],
      mobile: [{ required: true, message: "Please enter mobile number" }],
      country: [{ required: true, message: "Please select country/region" }],
      detail: [{ required: true, message: "Please enter street address" }],
      city: [{ required: true, message: "Please enter city" }],
      state: [{ required: true, message: "Please select state/province/region" }],
      zip: [{ required: true, message: "Please enter zip code" }]
    });
    const visible = ref(false);
    const paramsProps = ref({
      title: "",
      row: {},
      api: void 0,
      getTableList: void 0
    });
    const emit = __emit;
    const acceptParams = (params) => {
      paramsProps.value = params;
      if (!paramsProps.value.isAdd) getState();
      visible.value = true;
    };
    const ruleFormRef = ref();
    const handleSubmit = () => {
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        try {
          const { data } = await paramsProps.value.api(paramsProps.value.row);
          ElMessage.success({ message: `${paramsProps.value.title} Successfully！` });
          paramsProps.value.getTableList();
          visible.value = false;
          if (paramsProps.value.isAdd) {
            emit("add", data);
          }
        } catch (error) {
          console.log(error);
        }
      });
    };
    const countryOptions = ref([]);
    const stateOptions = ref([]);
    const getState = async (reSelect = false) => {
      if (reSelect) {
        paramsProps.value.row.state = "";
        paramsProps.value.row.city = "";
        paramsProps.value.row.detail = "";
        paramsProps.value.row.zip = "";
      }
      const parentId = countryOptions.value.find((item) => item.name === paramsProps.value.row.country)?.id;
      if (!parentId) return;
      const { data } = await getStateOptionApi({ parentId });
      stateOptions.value = data;
    };
    __expose({
      acceptParams
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: unref(visible),
        "onUpdate:modelValue": ($event) => isRef(visible) ? visible.value = $event : null,
        title: `${unref(paramsProps).title}`,
        "destroy-on-close": true,
        width: "490px"
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="acea-row"${_scopeId}>`);
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "acea-row" }, [
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
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              ref_key: "ruleFormRef",
              ref: ruleFormRef,
              "label-width": "140px",
              "label-suffix": " :",
              "label-position": "top",
              rules: unref(rules),
              model: unref(paramsProps).row,
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "First Name",
                    prop: "firstName"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(paramsProps).row.firstName,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.firstName = $event,
                          placeholder: "Enter First Name",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(paramsProps).row.firstName,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.firstName = $event,
                            placeholder: "Enter First Name",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Last Name",
                    prop: "lastName"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(paramsProps).row.lastName,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.lastName = $event,
                          placeholder: "Enter Last Name",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(paramsProps).row.lastName,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.lastName = $event,
                            placeholder: "Enter Last Name",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Mobile",
                    prop: "mobile"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(paramsProps).row.mobile,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.mobile = $event,
                          placeholder: "Enter Mobile Number",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(paramsProps).row.mobile,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.mobile = $event,
                            placeholder: "Enter Mobile Number",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Country/Region",
                    prop: "country"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: unref(paramsProps).row.country,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.country = $event,
                          filterable: "",
                          onChange: ($event) => getState(true)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(countryOptions), (item) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: item.id,
                                  label: item.name,
                                  value: item.name
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(countryOptions), (item) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: item.id,
                                    label: item.name,
                                    value: item.name
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: unref(paramsProps).row.country,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.country = $event,
                            filterable: "",
                            onChange: ($event) => getState(true)
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(countryOptions), (item) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: item.id,
                                  label: item.name,
                                  value: item.name
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(stateOptions).length || unref(paramsProps).row.state) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "State/Province/Region",
                      prop: "state"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_select, {
                            modelValue: unref(paramsProps).row.state,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.state = $event,
                            filterable: "",
                            "no-data-text": "Please select a country/region first"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(stateOptions), (item) => {
                                  _push5(ssrRenderComponent(_component_el_option, {
                                    key: item.id,
                                    label: item.name,
                                    value: item.name
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(stateOptions), (item) => {
                                    return openBlock(), createBlock(_component_el_option, {
                                      key: item.id,
                                      label: item.name,
                                      value: item.name
                                    }, null, 8, ["label", "value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_select, {
                              modelValue: unref(paramsProps).row.state,
                              "onUpdate:modelValue": ($event) => unref(paramsProps).row.state = $event,
                              filterable: "",
                              "no-data-text": "Please select a country/region first"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(stateOptions), (item) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: item.id,
                                    label: item.name,
                                    value: item.name
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "City",
                    prop: "city"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(paramsProps).row.city,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.city = $event,
                          placeholder: "Enter City",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(paramsProps).row.city,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.city = $event,
                            placeholder: "Enter City",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Street Address",
                    prop: "detail"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(paramsProps).row.detail,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.detail = $event,
                          placeholder: "Street address or P.O. Box,Apt, suite, unit, building, floor, etc.",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(paramsProps).row.detail,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.detail = $event,
                            placeholder: "Street address or P.O. Box,Apt, suite, unit, building, floor, etc.",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "Zip Code",
                    prop: "zip"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(paramsProps).row.zip,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.zip = $event,
                          placeholder: "Enter Zip Code",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(paramsProps).row.zip,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.zip = $event,
                            placeholder: "Enter Zip Code",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_checkbox, {
                          modelValue: unref(paramsProps).row.defaultFlag,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.defaultFlag = $event,
                          label: "Use as my default address",
                          "true-value": "0",
                          "false-value": "1"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_checkbox, {
                            modelValue: unref(paramsProps).row.defaultFlag,
                            "onUpdate:modelValue": ($event) => unref(paramsProps).row.defaultFlag = $event,
                            label: "Use as my default address",
                            "true-value": "0",
                            "false-value": "1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "First Name",
                      prop: "firstName"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(paramsProps).row.firstName,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.firstName = $event,
                          placeholder: "Enter First Name",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "Last Name",
                      prop: "lastName"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(paramsProps).row.lastName,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.lastName = $event,
                          placeholder: "Enter Last Name",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "Mobile",
                      prop: "mobile"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(paramsProps).row.mobile,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.mobile = $event,
                          placeholder: "Enter Mobile Number",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "Country/Region",
                      prop: "country"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: unref(paramsProps).row.country,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.country = $event,
                          filterable: "",
                          onChange: ($event) => getState(true)
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(countryOptions), (item) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: item.id,
                                label: item.name,
                                value: item.name
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      _: 1
                    }),
                    unref(stateOptions).length || unref(paramsProps).row.state ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "State/Province/Region",
                      prop: "state"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: unref(paramsProps).row.state,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.state = $event,
                          filterable: "",
                          "no-data-text": "Please select a country/region first"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(stateOptions), (item) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: item.id,
                                label: item.name,
                                value: item.name
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_form_item, {
                      label: "City",
                      prop: "city"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(paramsProps).row.city,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.city = $event,
                          placeholder: "Enter City",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "Street Address",
                      prop: "detail"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(paramsProps).row.detail,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.detail = $event,
                          placeholder: "Street address or P.O. Box,Apt, suite, unit, building, floor, etc.",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "Zip Code",
                      prop: "zip"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(paramsProps).row.zip,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.zip = $event,
                          placeholder: "Enter Zip Code",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_checkbox, {
                          modelValue: unref(paramsProps).row.defaultFlag,
                          "onUpdate:modelValue": ($event) => unref(paramsProps).row.defaultFlag = $event,
                          label: "Use as my default address",
                          "true-value": "0",
                          "false-value": "1"
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
                "label-width": "140px",
                "label-suffix": " :",
                "label-position": "top",
                rules: unref(rules),
                model: unref(paramsProps).row,
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "First Name",
                    prop: "firstName"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(paramsProps).row.firstName,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.firstName = $event,
                        placeholder: "Enter First Name",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "Last Name",
                    prop: "lastName"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(paramsProps).row.lastName,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.lastName = $event,
                        placeholder: "Enter Last Name",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "Mobile",
                    prop: "mobile"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(paramsProps).row.mobile,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.mobile = $event,
                        placeholder: "Enter Mobile Number",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "Country/Region",
                    prop: "country"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: unref(paramsProps).row.country,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.country = $event,
                        filterable: "",
                        onChange: ($event) => getState(true)
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(countryOptions), (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.id,
                              label: item.name,
                              value: item.name
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                    ]),
                    _: 1
                  }),
                  unref(stateOptions).length || unref(paramsProps).row.state ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "State/Province/Region",
                    prop: "state"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: unref(paramsProps).row.state,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.state = $event,
                        filterable: "",
                        "no-data-text": "Please select a country/region first"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(stateOptions), (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.id,
                              label: item.name,
                              value: item.name
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_el_form_item, {
                    label: "City",
                    prop: "city"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(paramsProps).row.city,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.city = $event,
                        placeholder: "Enter City",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "Street Address",
                    prop: "detail"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(paramsProps).row.detail,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.detail = $event,
                        placeholder: "Street address or P.O. Box,Apt, suite, unit, building, floor, etc.",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "Zip Code",
                    prop: "zip"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(paramsProps).row.zip,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.zip = $event,
                        placeholder: "Enter Zip Code",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_checkbox, {
                        modelValue: unref(paramsProps).row.defaultFlag,
                        "onUpdate:modelValue": ($event) => unref(paramsProps).row.defaultFlag = $event,
                        label: "Use as my default address",
                        "true-value": "0",
                        "false-value": "1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["rules", "model"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddressInfoForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AddressInfo = Object.assign(_sfc_main, { __name: "AddressInfoForm" });
const getAddressListApi = () => {
  return $http().get(USER_MODULE + `/address/list`);
};
const addAddressApi = (params) => {
  return $http().post(USER_MODULE + `/address/add`, params);
};
const editAddressApi = (params) => {
  return $http().post(USER_MODULE + `/address/edit`, params);
};
const detailAddressApi = (id) => {
  return $http().get(USER_MODULE + `/address/detail/${id}`);
};
const removeAddressApi = (id) => {
  return $http().post(USER_MODULE + `/address/remove/${id}`);
};
export {
  AddressInfo as A,
  addAddressApi as a,
  detailAddressApi as d,
  editAddressApi as e,
  getAddressListApi as g,
  removeAddressApi as r
};
//# sourceMappingURL=address-CAtp2bS7.js.map
