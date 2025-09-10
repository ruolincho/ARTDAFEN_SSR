import { E as ElUpload } from './progress-BLBrRfja.mjs';
import { _ as _export_sfc, a3 as useUserStore, a4 as useRouter, u as useRoute, aN as __nuxt_component_1, ac as __nuxt_component_1$2, b as ElMessage } from './server.mjs';
import { defineComponent, computed, ref, withCtx, unref, createVNode, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-Dm_6RpzH.mjs';
import '@vue/shared';
import 'lodash-unified';
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
import './custom-CnGfPiQ8.mjs';

const fileSize = 15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Account"
  },
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const userStore = useUserStore();
    useRouter();
    const route = useRoute();
    const menuList = [
      { name: "Personal Information", icon: "icon-customer", path: "/account/profile" },
      { name: "My Orders", icon: "icon-goods", path: "/account/orders" },
      { name: "My Wishlists", icon: "icon-follow", path: "/account/favorites" },
      { name: "Manage Addresses", icon: "icon-location", path: "/account/addresses" }
      // {name: 'Saved Cards', icon: 'icon-money-wallet', path: '/account/payments'},
    ];
    const currentRoute = computed(() => route.path);
    const fileType = ["image/webp", "image/png", "image/jpg", "image/jpeg"];
    const imageUrl = ref("");
    const imgCropperRef = ref();
    const beforeUpload = (rawFile) => {
      const imgSize = rawFile.size / 1024 / 1024 < fileSize;
      const imgType = fileType.includes(rawFile.type);
      if (!imgType) ElMessage.warning("The uploaded image does not conform to the required format!");
      if (!imgSize) ElMessage.warning(`The size of the uploaded image cannot exceed ${fileSize}MB\uFF01`);
      return imgType && imgSize;
    };
    const uploadChange = (file) => {
      var _a;
      imageUrl.value = URL.createObjectURL(file.raw);
      (_a = imgCropperRef.value) == null ? void 0 : _a.open();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_upload = ElUpload;
      const _component_NuxtPage = __nuxt_component_1;
      const _component_ClientOnly = __nuxt_component_1$2;
      _push(`<!--[--><div class="container" data-v-86c941ab><h1 class="text-40 f-bold-500 py-50" data-v-86c941ab>MY PAGE</h1><div class="account-container acea-row row-between row-top" data-v-86c941ab><div class="account-panel shadow-lg" data-v-86c941ab><div class="account-info acea-row row-middle p-20 border-b-sm border-gray-200" data-v-86c941ab>`);
      _push(ssrRenderComponent(_component_el_upload, {
        class: "mr-16",
        accept: fileType.join(","),
        "before-upload": beforeUpload,
        "on-change": uploadChange,
        "auto-upload": false,
        "show-file-list": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="account-avatar" data-v-86c941ab${_scopeId}><img class="w-full h-full fit-cover rounded-full"${ssrRenderAttr("src", unref(userStore).userInfo.avatar)} alt="avatar" style="${ssrRenderStyle(unref(userStore).userInfo.avatar ? null : { display: "none" })}" data-v-86c941ab${_scopeId}><div class="camera acea-row row-center-wrapper" data-v-86c941ab${_scopeId}><span class="iconfont icon-camera-switching" data-v-86c941ab${_scopeId}></span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "account-avatar" }, [
                withDirectives(createVNode("img", {
                  class: "w-full h-full fit-cover rounded-full",
                  src: unref(userStore).userInfo.avatar,
                  alt: "avatar"
                }, null, 8, ["src"]), [
                  [vShow, unref(userStore).userInfo.avatar]
                ]),
                createVNode("div", { class: "camera acea-row row-center-wrapper" }, [
                  createVNode("span", { class: "iconfont icon-camera-switching" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex-1 overflow-hidden" data-v-86c941ab><p class="text-14" data-v-86c941ab>Hello \u{1F44B} </p><p class="text-18 f-bold mt-5 line1" data-v-86c941ab>${ssrInterpolate(unref(userStore).userInfo.nickname)}</p></div></div><div class="account-menu my-lg-20 my-15" data-v-86c941ab><!--[-->`);
      ssrRenderList(menuList, (menu) => {
        _push(`<div class="${ssrRenderClass([{ "on": unref(currentRoute) === menu.path }, "account-item acea-row row-middle py-15 px-20 cursor-pointer"])}" data-v-86c941ab><span class="${ssrRenderClass(`iconfont ${menu.icon} text-24`)}" data-v-86c941ab></span><span class="text-16 ml-12" data-v-86c941ab>${ssrInterpolate(menu.name)}</span></div>`);
      });
      _push(`<!--]--><div class="account-item acea-row row-middle py-16 px-20 cursor-pointer" data-v-86c941ab><span class="iconfont icon-money-wallet text-24" data-v-86c941ab></span><span class="text-16 ml-12" data-v-86c941ab>Log Out</span></div></div></div><div class="account-page flex-1" data-v-86c941ab>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const account = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86c941ab"]]);

export { account as default };
//# sourceMappingURL=account-Dk0vAFS0.mjs.map
