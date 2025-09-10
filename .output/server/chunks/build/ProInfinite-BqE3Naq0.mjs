import { aa as vLoading, a as ElButton } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, reactive, computed, toRefs, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';

const useInfinite = (api, initParam = {}, needGroup = false, groupField = "date", dataCallBack, requestError, loadingTime, requestSuccess) => {
  const state = reactive({
    // 表格数据
    tableData: needGroup ? /* @__PURE__ */ new Map() : [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0
    },
    // 总参数(包含分页和查询参数)
    totalParam: {},
    loading: false,
    loaded: false
  });
  let observer = null;
  const pageParam = computed({
    get: () => {
      return {
        page: state.pageable.pageNum,
        size: state.pageable.pageSize
      };
    },
    set: (newVal) => {
      console.log("\u6211\u662F\u5206\u9875\u66F4\u65B0\u4E4B\u540E\u7684\u503C", newVal);
    }
  });
  const getTableList = async () => {
    if (!api || state.loading || state.loaded) return;
    state.loading = true;
    try {
      await delayLoading(loadingTime);
      Object.assign(state.totalParam, pageParam.value, initParam);
      let { data } = await api({ ...state.totalParam });
      dataCallBack && (data = dataCallBack(data));
      const { current: pageNum, size: pageSize, total, records } = data;
      if (pageNum * pageSize >= total) {
        state.loaded = true;
        stopObserver();
      }
      if (!needGroup) {
        state.tableData.push(...records);
      } else {
        records.forEach((record) => {
          var _a;
          const index = record[groupField] || "default";
          const has = state.tableData.has(index);
          if (has) {
            (_a = state.tableData.get(index)) == null ? void 0 : _a.push(record);
          } else {
            state.tableData.set(index, [record]);
          }
        });
      }
      requestSuccess && requestSuccess(data);
      state.loading = false;
      updatePageable({ pageNum: pageNum + 1, pageSize, total });
    } catch (error) {
      state.loading = false;
      requestError && requestError(error);
    }
  };
  const updatePageable = (pageable) => {
    Object.assign(state.pageable, pageable);
  };
  const search = () => {
    state.pageable.pageNum = 1;
    getTableList();
  };
  const initObserver = (el) => {
    if (!el) return;
    stopObserver();
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        getTableList();
      }
    }, {
      threshold: 0.1
      // 露出10%就触发
    });
    observer.observe(el);
  };
  const stopObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
  const reset = () => {
    state.pageable.pageNum = 1;
    getTableList();
  };
  const clear = () => {
    state.tableData = needGroup ? /* @__PURE__ */ new Map() : [];
    state.pageable = {
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
    state.loading = false;
    state.loaded = false;
    stopObserver();
    Object.assign(state.totalParam, initParam);
  };
  const delayLoading = async (loadingTime2) => {
    const defaultLoadingTime = 0;
    let actualLoadingTime = loadingTime2;
    if (typeof loadingTime2 === "undefined" || loadingTime2 === null || loadingTime2 === -1) {
      actualLoadingTime = defaultLoadingTime;
    }
    await new Promise((resolve) => setTimeout(resolve, actualLoadingTime));
  };
  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    clear,
    initObserver,
    stopObserver
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ProInfinite"
  },
  __name: "ProInfinite",
  __ssrInlineRender: true,
  props: {
    data: {},
    requestApi: {},
    requestAuto: { type: Boolean, default: true },
    requestSuccess: {},
    requestError: {},
    dataCallback: {},
    initParam: { default: {} },
    loadingTime: {},
    needGroup: { type: Boolean, default: false },
    groupField: { default: "date" }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const loadMoreRef = ref(null);
    const isObserver = ref(false);
    const startLoadMore = () => {
      getTableList();
      initObserver(loadMoreRef.value);
      isObserver.value = true;
    };
    const {
      tableData,
      getTableList,
      search,
      reset,
      initObserver,
      loading,
      loaded,
      clear
    } = useInfinite(
      props.requestApi,
      props.initParam,
      props.needGroup,
      props.groupField,
      props.dataCallback,
      props.requestError,
      props.loadingTime,
      props.requestSuccess
    );
    __expose({
      tableData,
      search,
      reset,
      clear
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps(_attrs, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))))}>`);
      if (!_ctx.needGroup ? unref(tableData).length : unref(tableData).size) {
        _push(`<!--[-->`);
        ssrRenderSlot(_ctx.$slots, "default", { rows: unref(tableData) }, null, _push, _parent);
        _push(`<div>`);
        if (!unref(isObserver) && !unref(loaded)) {
          ssrRenderSlot(_ctx.$slots, "pagination", {}, () => {
            _push(`<div class="acea-row row-center-wrapper py-lg-40 py-20">`);
            _push(ssrRenderComponent(_component_el_button, {
              size: "large",
              plain: "",
              onClick: startLoadMore
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` See More <span class="iconfont icon-down"${_scopeId}></span>`);
                } else {
                  return [
                    createTextVNode(" See More "),
                    createVNode("span", { class: "iconfont icon-down" })
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div>`);
          }, _push, _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        ssrRenderSlot(_ctx.$slots, "empty", {}, () => {
          _push(`<div class="text-center py-60"><span class="iconfont icon-empty text-50"></span><p class="text-20 f-bold mt-20">No Data</p><p class="text-14 my-20">No data found, please check the query or try again later.</p>`);
          _push(ssrRenderComponent(_component_el_button, {
            size: "large",
            type: "primary",
            onClick: unref(getTableList)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`TRY AGAIN`);
              } else {
                return [
                  createTextVNode("TRY AGAIN")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }, _push, _parent);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProInfinite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProInfinite = Object.assign(_sfc_main, { __name: "ProInfinite" });

export { ProInfinite as P };
//# sourceMappingURL=ProInfinite-BqE3Naq0.mjs.map
