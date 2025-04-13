"use strict";
const common_vendor = require("../../common/vendor.js");
const store_dataStore = require("../../store/dataStore.js");
const _sfc_main = {
  __name: "TagBar",
  setup(__props) {
    const activeId = common_vendor.ref(1);
    const dataStore = store_dataStore.useDataStore();
    common_vendor.ref();
    const handleItemClick = (tag = 1) => {
      dataStore.fetchDataList(tag);
      activeId.value = tag;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(dataStore).tagList, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: common_vendor.n(activeId.value === item.id ? "item active" : "item"),
            d: common_vendor.o(($event) => handleItemClick(item.id), item.id),
            e: item.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-155e7ba6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/TagBar/TagBar.js.map
