"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_dataStore = require("../../../store/dataStore.js");
const utils_tokenNavigateTo = require("../../../utils/tokenNavigateTo.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_RoomResource2 = common_vendor.resolveComponent("RoomResource");
  (_easycom_uni_nav_bar2 + _easycom_RoomResource2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_RoomResource = () => "../../../components/RoomResource/RoomResource.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_RoomResource)();
}
const _sfc_main = {
  __name: "search-answer",
  setup(__props) {
    const dataStore = store_dataStore.useDataStore();
    common_vendor.onLoad((option) => {
      dataStore.fetchSearchAnswer(option.content);
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleDetailClick = (id) => {
      utils_tokenNavigateTo.tokenNavigateTo(`/subPackages/order/room-detail/room-detail?id=${id}`, true);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          dark: true,
          fixed: true,
          shadow: true,
          ["background-color"]: "#c5b6a0",
          ["status-bar"]: true,
          ["left-icon"]: "left",
          ["left-text"]: "返回",
          title: "搜索结果"
        }),
        c: !common_vendor.unref(dataStore).searchList.length
      }, !common_vendor.unref(dataStore).searchList.length ? {
        d: common_vendor.f(Array.from({
          length: 6
        }), (item, index, i0) => {
          return {
            a: index
          };
        })
      } : {}, {
        e: common_vendor.unref(dataStore).searchList
      }, common_vendor.unref(dataStore).searchList ? {
        f: common_vendor.f(common_vendor.unref(dataStore).searchList, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleDetailClick(item.id), item.id),
            b: "64acba2d-1-" + i0,
            c: common_vendor.p({
              data: item
            }),
            d: item.id
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-64acba2d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/search/search-answer/search-answer.js.map
