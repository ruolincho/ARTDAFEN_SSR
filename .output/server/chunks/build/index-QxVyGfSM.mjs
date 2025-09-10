import { defineComponent, renderSlot, createBlock, openBlock, Teleport as Teleport$1 } from 'vue';
import { w as withInstall, c as buildProps, g as _export_sfc$1, d as definePropType } from './server.mjs';

const teleportProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    required: true
  },
  disabled: Boolean
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "teleport",
  props: teleportProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.disabled ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(Teleport$1, {
        key: 1,
        to: _ctx.to
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to"]));
    };
  }
});
var Teleport = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "teleport.vue"]]);
const ElTeleport = withInstall(Teleport);

export { ElTeleport as E, teleportProps as t };
//# sourceMappingURL=index-QxVyGfSM.mjs.map
