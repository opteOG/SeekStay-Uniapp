"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_index = require("../../service/index.js");
const utils_tokenNavigateTo = require("../../utils/tokenNavigateTo.js");
const _sfc_main = {
  __name: "history",
  setup(__props) {
    const historyRooms = common_vendor.ref();
    const showDelete = common_vendor.ref(false);
    common_vendor.onPullDownRefresh(() => {
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    common_vendor.onShow(async () => {
      const token = common_vendor.index.getStorageSync("user_token");
      if (!token) {
        common_vendor.index.showToast({
          title: "请登录后查看",
          icon: "error"
        });
        common_vendor.index.redirectTo({
          url: "/subPackages/user/login/login"
        });
      }
      const res = await service_index.requestService.get("/collect", {}, {});
      if (res.status === 401 && token) {
        common_vendor.index.showToast({
          title: "登录已过期，请重新登录",
          icon: "error"
        });
        common_vendor.index.redirectTo({
          url: "/subPackages/user/login/login"
        });
      }
      historyRooms.value = res.data.list;
    });
    const handleEdit = () => {
      showDelete.value = !showDelete.value;
    };
    const handleDetailClick = (id) => {
      if (!showDelete.value) {
        utils_tokenNavigateTo.tokenNavigateTo(`/subPackages/order/room-detail/room-detail?id=${id}`, true);
      }
    };
    const handleDelete = (id) => {
      service_index.requestService.delete("/collect", {}, { listId: id });
      historyRooms.value = historyRooms.value.filter((item) => item.id !== id);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleEdit),
        b: common_vendor.f(historyRooms.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleDelete(item == null ? void 0 : item.id), item == null ? void 0 : item.id),
            b: item == null ? void 0 : item.imgUrl[0],
            c: common_vendor.t(item == null ? void 0 : item.location),
            d: common_vendor.t(item == null ? void 0 : item.collectionTime),
            e: common_vendor.o(($event) => handleDetailClick(item == null ? void 0 : item.id), item == null ? void 0 : item.id),
            f: item == null ? void 0 : item.id
          };
        }),
        c: showDelete.value,
        d: common_assets._imports_0
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b2d018fa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/history/history.js.map
