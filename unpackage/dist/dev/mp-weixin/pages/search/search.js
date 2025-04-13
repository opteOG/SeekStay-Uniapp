"use strict";
const common_vendor = require("../../common/vendor.js");
const store_dataStore = require("../../store/dataStore.js");
const utils_tokenNavigateTo = require("../../utils/tokenNavigateTo.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_SearchBar2 = common_vendor.resolveComponent("SearchBar");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_TagBar2 = common_vendor.resolveComponent("TagBar");
  const _easycom_RoomResource2 = common_vendor.resolveComponent("RoomResource");
  const _easycom_VirtualList2 = common_vendor.resolveComponent("VirtualList");
  (_easycom_uni_nav_bar2 + _easycom_SearchBar2 + _easycom_uni_transition2 + _easycom_TagBar2 + _easycom_RoomResource2 + _easycom_VirtualList2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_SearchBar = () => "../../components/SearchBar/SearchBar.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_TagBar = () => "../../components/TagBar/TagBar.js";
const _easycom_RoomResource = () => "../../components/RoomResource/RoomResource.js";
const _easycom_VirtualList = () => "../../components/VirtualList/VirtualList.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_SearchBar + _easycom_uni_transition + _easycom_TagBar + _easycom_RoomResource + _easycom_VirtualList)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const rightIcon = common_vendor.ref();
    const showSearchBar = common_vendor.ref(true);
    const dataStore = store_dataStore.useDataStore();
    dataStore.fetchDataList(1);
    dataStore.fetchTagList();
    const systemInfo = common_vendor.index.getSystemInfoSync();
    const contentHeight = common_vendor.computed(() => {
      return systemInfo.windowHeight - 150;
    });
    common_vendor.onLoad(async () => {
      common_vendor.index.startPullDownRefresh();
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    common_vendor.onPullDownRefresh(() => {
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    const handleSearchClick = () => {
      showSearchBar.value = !showSearchBar.value;
    };
    const handleItemClick = (id) => {
      utils_tokenNavigateTo.tokenNavigateTo(`/subPackages/order/room-detail/room-detail?id=${id}`, true);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearchClick),
        b: common_vendor.p({
          backgroundColor: "#c5b6a0",
          border: false,
          fixed: true,
          ["status-bar"]: true,
          title: "寻栖",
          color: "#625b50",
          ["right-icon"]: rightIcon.value
        }),
        c: showSearchBar.value
      }, showSearchBar.value ? {
        d: common_vendor.p({
          ["mode-class"]: "slide-top",
          show: "true"
        })
      } : {}, {
        e: !common_vendor.unref(dataStore).dataList.length
      }, !common_vendor.unref(dataStore).dataList.length ? {
        f: common_vendor.f(Array.from({
          length: 6
        }), (item, index, i0) => {
          return {
            a: index
          };
        })
      } : {
        g: common_vendor.w((slotProps, s0, i0) => {
          return {
            a: common_vendor.o(($event) => handleItemClick(slotProps.item.id)),
            b: "c10c040c-5-" + i0 + ",c10c040c-4",
            c: common_vendor.p({
              data: slotProps.item
            }),
            d: i0,
            e: s0
          };
        }, {
          name: "d",
          path: "g",
          vueId: "c10c040c-4"
        }),
        h: common_vendor.p({
          list: common_vendor.unref(dataStore).dataList,
          itemHeight: 420,
          contentHeight: contentHeight.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
