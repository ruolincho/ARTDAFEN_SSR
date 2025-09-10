import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { a7 as piniaPersistConfig } from "../server.mjs";
const useCustomStore = defineStore(
  "custom",
  () => {
    const carts = ref({});
    function addition(cart) {
      carts.value = cart;
    }
    function clear() {
      carts.value = {};
    }
    const subtotal = computed(() => {
      return Number(carts.value.actualAmount) * Number(carts.value.quantity);
    });
    const subtotalQuantity = computed(() => {
      return Number(carts.value.quantity);
    });
    const themeOptions = ref([]);
    const setThemeOptions = (data) => {
      themeOptions.value = data;
    };
    const currentView = ref(null);
    const setCurrentView = (view) => {
      currentView.value = view;
    };
    const viewHistory = ref([]);
    const setViewHistory = (history) => {
      viewHistory.value = history;
    };
    const caseContrastData = ref([]);
    const setCaseContrastData = (data) => {
      caseContrastData.value = data;
    };
    const themeIdMap = ref([]);
    const setThemeIdMap = (data) => {
      themeIdMap.value = data;
    };
    const clearCache = () => {
      themeOptions.value = [];
      themeIdMap.value = [];
      caseContrastData.value = [];
      currentView.value = null;
      viewHistory.value = [];
    };
    return {
      carts,
      subtotal,
      addition,
      clear,
      subtotalQuantity,
      themeOptions,
      setThemeOptions,
      currentView,
      setCurrentView,
      viewHistory,
      setViewHistory,
      caseContrastData,
      setCaseContrastData,
      themeIdMap,
      setThemeIdMap,
      clearCache
    };
  },
  {
    persist: piniaPersistConfig("custom")
  }
);
export {
  useCustomStore as u
};
//# sourceMappingURL=custom-CnGfPiQ8.js.map
