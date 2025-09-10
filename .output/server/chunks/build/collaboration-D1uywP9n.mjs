import { c as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc, ab as imagePrefix, o as CONTACT_EMAIL, a as ElButton, E as ElInput, b as ElMessage } from './server.mjs';
import { E as ElForm, a as ElFormItem } from './form-item-BeekeJ4U.mjs';
import { defineComponent, ref, reactive, resolveDirective, unref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { e as emailReg } from './index-BuIDaW2O.mjs';
import { s as sendConsulting } from './message-DIUxZVmi.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import '@ctrl/tinycolor';
import 'axios';
import 'async-validator';

const _imports_0 = "data:image/png;base64,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";
const _imports_1 = "" + buildAssetsURL("collaboration-icon2.DtzlQNTW.png");
const _imports_2 = "data:image/png;base64,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";
const _imports_3 = "data:image/png;base64,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";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "collaboration",
  __ssrInlineRender: true,
  setup(__props) {
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
      subject: [{ required: true, message: "Please enter your subject" }],
      message: [{ required: true, message: "Please enter your message" }]
    });
    const ruleFormRef = ref();
    const handleSend = () => {
      ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;
        await sendConsulting(messageForm.value);
        ElMessage.success("Message sent successfully");
        ruleFormRef.value.resetFields();
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _directive_aos = resolveDirective("aos");
      _push(`<!--[--><section class="sec-banner" data-v-bbdbe723><div class="banner-wrapper" data-v-bbdbe723><img class="cursor-pointer"${ssrRenderAttr("src", unref(imagePrefix)("/static/artdafen/collaboration-banner.webp"))} alt="banner" data-v-bbdbe723></div></section><section class="sec-global py-lg-80 py-40" data-v-bbdbe723><div class="container" data-v-bbdbe723><div class="section-header text-center" data-v-bbdbe723><div${ssrRenderAttrs(mergeProps({ class: "text-16 py-10 px-16 border-sm border-gray-700 inline-block" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723>Global Art Collaboration</div><h1${ssrRenderAttrs(mergeProps({ class: "text-50 f-bold-500 mt-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723>CREATING BEYOND BORDERS</h1></div><p${ssrRenderAttrs(mergeProps({ class: "intro text-22 mt-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723> At Art Dafen, we believe that great art is born from connection. By collaborating with artists from around the world, we bring together diverse ideas, cultures, and styles to create something truly meaningful. Whether you\u2019re an emerging voice or an established name, partnering with us means joining a platform that values originality, supports creative growth, and helps your work reach a wider, global audience. </p></div></section><section class="sec-benefits py-lg-80 py-40" data-v-bbdbe723><div class="container" data-v-bbdbe723><div class="section-header text-center text-left-md" data-v-bbdbe723><div${ssrRenderAttrs(mergeProps({ class: "text-16 py-10 px-16 border-sm border-gray-700 inline-block" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723>Benefits</div><h1${ssrRenderAttrs(mergeProps({ class: "text-50 f-bold-500 mt-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723>PARTNERING WITH ART DAFEN</h1></div><div class="row benefits-list mt-30" data-v-bbdbe723><div${ssrRenderAttrs(mergeProps({ class: "col-xs-6 col-12" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 0 })))} data-v-bbdbe723><div class="benefits-item bg-gray-200" data-v-bbdbe723><img class="icon"${ssrRenderAttr("src", _imports_0)} alt="" data-v-bbdbe723><div class="content" data-v-bbdbe723><h2 class="text-24 f-bold-500" data-v-bbdbe723>Global Reach</h2><p class="text-22 text-gray-600" data-v-bbdbe723>Showcase your work through exhibitions, digital platforms, and global partnerships.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "col-xs-6 col-12" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 100 })))} data-v-bbdbe723><div class="benefits-item bg-gray-200" data-v-bbdbe723><img class="icon"${ssrRenderAttr("src", _imports_1)} alt="" data-v-bbdbe723><div class="content" data-v-bbdbe723><h2 class="text-24 f-bold-500" data-v-bbdbe723>Cultural Exchange</h2><p class="text-22 text-gray-600" data-v-bbdbe723>Collaborate with artists and designers from around the world to inspire fresh ideas.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "col-xs-6 col-12" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 200 })))} data-v-bbdbe723><div class="benefits-item bg-gray-200" data-v-bbdbe723><img class="icon"${ssrRenderAttr("src", _imports_2)} alt="" data-v-bbdbe723><div class="content" data-v-bbdbe723><h2 class="text-24 f-bold-500" data-v-bbdbe723>Creative Support</h2><p class="text-22 text-gray-600" data-v-bbdbe723>Access resources and a dedicated team that values both creativity and quality.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "col-xs-6 col-12" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 300 })))} data-v-bbdbe723><div class="benefits-item bg-gray-200" data-v-bbdbe723><img class="icon"${ssrRenderAttr("src", _imports_3)} alt="" data-v-bbdbe723><div class="content" data-v-bbdbe723><h2 class="text-24 f-bold-500" data-v-bbdbe723>Sustainable Growth</h2><p class="text-22 text-gray-600" data-v-bbdbe723>Transform your art into lifestyle products that expand your audience and income.</p></div></div></div></div></div></section><section class="sec-looking py-lg-80 py-40 bg-gray-200" data-v-bbdbe723><div class="container" data-v-bbdbe723><div class="looking-wrapper" data-v-bbdbe723><div${ssrRenderAttrs(mergeProps({ class: "left-block border-sm border-gray-700 text-50 f-bold-500 acea-row row-center-wrapper text-center" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-right")))} data-v-bbdbe723> WHO WE\u2019RE <br data-v-bbdbe723> LOOKING FOR </div><div${ssrRenderAttrs(mergeProps({ class: "right-block text-22 border-sm border-gray-700" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-left")))} data-v-bbdbe723><div class="content" data-v-bbdbe723><p class="mb-15" data-v-bbdbe723> We welcome artists from all creative backgrounds \u2014 whether your practice is in painting, sculpture, illustration, or mixed techniques. </p><p data-v-bbdbe723> We&#39;re seeking creators who: </p><ul class="list-ul disc" data-v-bbdbe723><li data-v-bbdbe723>Have a clear artistic voice and produce original, authentic work</li><li data-v-bbdbe723>Uphold high standards of quality, creativity, and cultural relevance</li><li data-v-bbdbe723>Believe in bringing art into everyday life in meaningful ways</li><li data-v-bbdbe723>Are open to international collaboration and expanding their reach</li></ul><p class="mt-15" data-v-bbdbe723> Whether you&#39;re emerging or established, if your vision resonates with ours, we\u2019d love to hear from you. </p></div></div></div></div></section><section class="sec-process py-lg-80 py-40" data-v-bbdbe723><div class="container" data-v-bbdbe723><div class="section-header text-center" data-v-bbdbe723><div${ssrRenderAttrs(mergeProps({ class: "text-16 py-10 px-16 border-sm border-gray-700 inline-block" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723>How to Apply</div><h1${ssrRenderAttrs(mergeProps({ class: "text-50 f-bold-500 mt-30" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723>APPLICATION PROCESS</h1></div><div class="row process-list" data-v-bbdbe723><div${ssrRenderAttrs(mergeProps({ class: "col-12 col-xs-6 col-md-3" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 0 })))} data-v-bbdbe723><div data-eq="1" class="process-item bg-gray-200 rounded-lg text-center" data-v-bbdbe723><p class="text-24 f-bold-500 mb-lg-38 mb-15" data-v-bbdbe723>Prepare Your Portfolio</p><p class="text-22 text-gray-600 break-word" data-v-bbdbe723> Select 5\u201310 recent works with titles, short descriptions, and any relevant links. Add a brief bio highlighting your artistic path. </p></div></div><div${ssrRenderAttrs(mergeProps({ class: "col-12 col-xs-6 col-md-3" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 100 })))} data-v-bbdbe723><div data-eq="2" class="process-item bg-gray-200 rounded-lg text-center" data-v-bbdbe723><p class="text-24 f-bold-500 mb-lg-38 mb-15" data-v-bbdbe723>Submit Your Application</p><p class="text-22 text-gray-600 break-word" data-v-bbdbe723> Email your portfolio and bio to us at <a${ssrRenderAttr("href", `mailto:${unref(CONTACT_EMAIL)}`)} data-v-bbdbe723>${ssrInterpolate(unref(CONTACT_EMAIL))}</a>. Be sure to include your full name and contact details. </p></div></div><div${ssrRenderAttrs(mergeProps({ class: "col-12 col-xs-6 col-md-3" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 200 })))} data-v-bbdbe723><div data-eq="3" class="process-item bg-gray-200 rounded-lg text-center" data-v-bbdbe723><p class="text-24 f-bold-500 mb-lg-38 mb-15" data-v-bbdbe723>Review &amp; Response</p><p class="text-22 text-gray-600 break-word" data-v-bbdbe723> Our curatorial team will assess your submission. You\u2019ll receive a response within 14 business days if selected. </p></div></div><div${ssrRenderAttrs(mergeProps({ class: "col-12 col-xs-6 col-md-3" }, ssrGetDirectiveProps(_ctx, _directive_aos, { name: "fade-up", delay: 300 })))} data-v-bbdbe723><div data-eq="4" class="process-item bg-gray-200 rounded-lg text-center" data-v-bbdbe723><p class="text-24 f-bold-500 mb-lg-38 mb-15" data-v-bbdbe723>Begin the Collaboration</p><p class="text-22 text-gray-600 break-word" data-v-bbdbe723> Once approved, you\u2019ll become part of our artist network and explore new opportunities with us. </p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-up")))} data-v-bbdbe723>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` SUBMIT NOW `);
          } else {
            return [
              createTextVNode(" SUBMIT NOW ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="sec-form py-lg-80 py-40 bg-gray-600" data-v-bbdbe723><div class="container" data-v-bbdbe723><div class="form-wrapper" data-v-bbdbe723><div${ssrRenderAttrs(mergeProps({ class: "form-left text-white" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-right")))} data-v-bbdbe723><div class="section-header" data-v-bbdbe723><div class="text-16 py-10 px-16 border-sm border-white inline-block" data-v-bbdbe723>Get In Touch</div><h1 class="text-50 f-bold-500 mt-30" data-v-bbdbe723>COLLABORATION INQUIRIES</h1></div><p class="text-28 text-gray-300 mt-28 mb-55" style="${ssrRenderStyle({ "max-width": "509px" })}" data-v-bbdbe723> Have questions about the collaboration or need help with your application? We\u2019re here to support you. </p><p class="text-22 f-bold-500" data-v-bbdbe723> Reach us at: ${ssrInterpolate(unref(CONTACT_EMAIL))}<br data-v-bbdbe723> Or use the form to send us a message. </p><p class="text-28 f-bold-600 pt-25 mt-25 border-t-sm border-white" data-v-bbdbe723>Let\u2019s create something meaningful together.</p></div><div${ssrRenderAttrs(mergeProps({ class: "form-right bg-white p-xl-35 p-25" }, ssrGetDirectiveProps(_ctx, _directive_aos, "fade-left")))} data-v-bbdbe723><p class="text-30 f-bold-600" data-v-bbdbe723>Send a Message</p><p class="text-18 text-gray-600 mt-10 mb-30" data-v-bbdbe723> We typically respond within 3\u20135 business days. </p>`);
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
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: unref(messageForm).subject,
                    "onUpdate:modelValue": ($event) => unref(messageForm).subject = $event,
                    placeholder: "Subject"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: unref(messageForm).subject,
                      "onUpdate:modelValue": ($event) => unref(messageForm).subject = $event,
                      placeholder: "Subject"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              class: "float-right",
              type: "primary",
              size: "large",
              onClick: handleSend
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
                  createVNode(_component_el_input, {
                    modelValue: unref(messageForm).subject,
                    "onUpdate:modelValue": ($event) => unref(messageForm).subject = $event,
                    placeholder: "Subject"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                class: "float-right",
                type: "primary",
                size: "large",
                onClick: handleSend
              }, {
                default: withCtx(() => [
                  createTextVNode("Submit")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/collaboration.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const collaboration = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbdbe723"]]);

export { collaboration as default };
//# sourceMappingURL=collaboration-D1uywP9n.mjs.map
