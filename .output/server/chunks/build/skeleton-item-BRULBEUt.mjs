import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createBlock, createCommentVNode, toRef, renderSlot, mergeProps, Fragment, renderList, createVNode, normalizeProps, ref, watch } from 'vue';
import { w as withInstall, n as withNoopInstall, g as _export_sfc$1, c as buildProps, e as useNamespace, aG as picture_filled_default, d as definePropType, i as isNumber, J as isUndefined } from './server.mjs';
import { isObject } from '@vue/shared';

const skeletonProps = buildProps({
  animated: Boolean,
  count: {
    type: Number,
    default: 1
  },
  rows: {
    type: Number,
    default: 3
  },
  loading: {
    type: Boolean,
    default: true
  },
  throttle: {
    type: definePropType([Number, Object])
  }
});
const skeletonItemProps = buildProps({
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
});
const __default__$1 = defineComponent({
  name: "ElSkeletonItem"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: skeletonItemProps,
  setup(__props) {
    const ns = useNamespace("skeleton");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(ns).e("item"), unref(ns).e(_ctx.variant)])
      }, [
        _ctx.variant === "image" ? (openBlock(), createBlock(unref(picture_filled_default), { key: 0 })) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var SkeletonItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "skeleton-item.vue"]]);
const useThrottleRender = (loading, throttle = 0) => {
  if (throttle === 0)
    return loading;
  const initVal = isObject(throttle) && Boolean(throttle.initVal);
  const throttled = ref(initVal);
  let timeoutHandle = null;
  const dispatchThrottling = (timer) => {
    if (isUndefined(timer)) {
      throttled.value = loading.value;
      return;
    }
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = setTimeout(() => {
      throttled.value = loading.value;
    }, timer);
  };
  const dispatcher = (type) => {
    if (type === "leading") {
      if (isNumber(throttle)) {
        dispatchThrottling(throttle);
      } else {
        dispatchThrottling(throttle.leading);
      }
    } else {
      if (isObject(throttle)) {
        dispatchThrottling(throttle.trailing);
      } else {
        throttled.value = false;
      }
    }
  };
  watch(() => loading.value, (val) => {
    dispatcher(val ? "leading" : "trailing");
  });
  return throttled;
};
const __default__ = defineComponent({
  name: "ElSkeleton"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: skeletonProps,
  setup(__props, { expose }) {
    const props = __props;
    const ns = useNamespace("skeleton");
    const uiLoading = useThrottleRender(toRef(props, "loading"), props.throttle);
    expose({
      uiLoading
    });
    return (_ctx, _cache) => {
      return unref(uiLoading) ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        class: [unref(ns).b(), unref(ns).is("animated", _ctx.animated)]
      }, _ctx.$attrs), [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.count, (i) => {
          return openBlock(), createElementBlock(Fragment, { key: i }, [
            unref(uiLoading) ? renderSlot(_ctx.$slots, "template", { key: i }, () => [
              createVNode(SkeletonItem, {
                class: normalizeClass(unref(ns).is("first")),
                variant: "p"
              }, null, 8, ["class"]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (item) => {
                return openBlock(), createBlock(SkeletonItem, {
                  key: item,
                  class: normalizeClass([
                    unref(ns).e("paragraph"),
                    unref(ns).is("last", item === _ctx.rows && _ctx.rows > 1)
                  ]),
                  variant: "p"
                }, null, 8, ["class"]);
              }), 128))
            ]) : createCommentVNode("v-if", true)
          ], 64);
        }), 128))
      ], 16)) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, _ctx.$attrs)));
    };
  }
});
var Skeleton = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "skeleton.vue"]]);
const ElSkeleton = withInstall(Skeleton, {
  SkeletonItem
});
const ElSkeletonItem = withNoopInstall(SkeletonItem);

export { ElSkeleton as E, ElSkeletonItem as a };
//# sourceMappingURL=skeleton-item-BRULBEUt.mjs.map
