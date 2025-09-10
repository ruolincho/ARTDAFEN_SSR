import { _ as _export_sfc, a as ElButton, aW as ElMessageBox, b as ElMessage } from './server.mjs';
import { E as ElTag } from './index-TgbWtzhx.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { A as AddressInfo, d as detailAddressApi, a as addAddressApi, e as editAddressApi, g as getAddressListApi, r as removeAddressApi } from './address-CAtp2bS7.mjs';
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
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import '@ctrl/tinycolor';
import 'axios';
import './dialog-DQju9U68.mjs';
import './index-QxVyGfSM.mjs';
import './form-item-BeekeJ4U.mjs';
import 'async-validator';
import './select-BBb6v1ax.mjs';
import './popper-BevOnpDk.mjs';
import '@popperjs/core';
import './scrollbar-BAU7-sWB.mjs';
import './checkbox-BsmvevJL.mjs';

const useHandleData = (api, params = {}, message, confirmType = "warning") => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`${message}`, "Tips", {
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      type: confirmType,
      draggable: true
    }).then(async () => {
      const res = await api(params);
      if (!res) return reject(false);
      ElMessage({
        type: "success",
        message: `Success!`
      });
      resolve(true);
    });
  });
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Addresses"
  },
  __name: "addresses",
  __ssrInlineRender: true,
  setup(__props) {
    const addressList = ref([]);
    const getAddressList = async () => {
      const { data } = await getAddressListApi();
      addressList.value = data;
    };
    const addressInfoRef = ref();
    const openAddEdit = async (title, row = {}, isAdd = true) => {
      var _a;
      if (!isAdd) {
        const record = await detailAddressApi(row == null ? void 0 : row.id);
        row = record == null ? void 0 : record.data;
      }
      const params = {
        isAdd,
        title,
        row: { ...row },
        api: isAdd ? addAddressApi : editAddressApi,
        getTableList: getAddressList
      };
      (_a = addressInfoRef.value) == null ? void 0 : _a.acceptParams(params);
    };
    const deleteAddress = async (id) => {
      await useHandleData(
        removeAddressApi,
        id,
        "Are you sure to delete this address?"
      );
      await getAddressList();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      _push(`<!--[--><div class="orders-container" data-v-d65b8a64>`);
      if (unref(addressList).length) {
        _push(`<!--[--><div class="acea-row row-right mb-30" data-v-d65b8a64>`);
        _push(ssrRenderComponent(_component_el_button, {
          size: "large",
          onClick: ($event) => openAddEdit("Add a new address")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="iconfont icon-add mr-10" data-v-d65b8a64${_scopeId}></span> Add New Address `);
            } else {
              return [
                createVNode("span", { class: "iconfont icon-add mr-10" }),
                createTextVNode(" Add New Address ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="address-list" data-v-d65b8a64><!--[-->`);
        ssrRenderList(unref(addressList), (item) => {
          _push(`<div class="address-item acea-row row-between-wrapper gap-base pb-20 mb-20 border-b-sm border-gray-200" data-v-d65b8a64><div class="flex-1 text-16" data-v-d65b8a64><p class="text-18 f-bold" data-v-d65b8a64>${ssrInterpolate(item.firstName)} ${ssrInterpolate(item.lastName)} `);
          if (item.defaultFlag === "0") {
            _push(ssrRenderComponent(_component_el_tag, { type: "primary" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Default`);
                } else {
                  return [
                    createTextVNode("Default")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</p><p class="my-18" data-v-d65b8a64>${ssrInterpolate(item.detail)}</p><p class="acea-row row-middle" data-v-d65b8a64><span class="iconfont icon-phone mr-10 text-20" data-v-d65b8a64></span><span data-v-d65b8a64>${ssrInterpolate(item.mobile)}</span></p></div><div class="row gap-row-base address-btn" data-v-d65b8a64><div class="col-sm-12 col-6" data-v-d65b8a64>`);
          _push(ssrRenderComponent(_component_el_button, {
            class: "w-full",
            size: "large",
            onClick: ($event) => openAddEdit("Edit address", item, false)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Edit`);
              } else {
                return [
                  createTextVNode("Edit")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="col-sm-12 col-6" data-v-d65b8a64>`);
          _push(ssrRenderComponent(_component_el_button, {
            class: "w-full",
            size: "large",
            onClick: ($event) => deleteAddress(item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Delete`);
              } else {
                return [
                  createTextVNode("Delete")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<div class="text-center py-60" data-v-d65b8a64><span class="iconfont icon-location text-50" data-v-d65b8a64></span><p class="text-20 f-bold mt-20" data-v-d65b8a64>No Saved Addresses.</p><p class="text-14 my-20" data-v-d65b8a64>Add a new address method for faster checkout.</p>`);
        _push(ssrRenderComponent(_component_el_button, {
          size: "large",
          type: "primary",
          onClick: ($event) => openAddEdit("Add a new address")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add Address `);
            } else {
              return [
                createTextVNode(" Add Address ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(AddressInfo, {
        ref_key: "addressInfoRef",
        ref: addressInfoRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/addresses.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const addresses = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d65b8a64"]]);

export { addresses as default };
//# sourceMappingURL=addresses-D4nGwBlK.mjs.map
