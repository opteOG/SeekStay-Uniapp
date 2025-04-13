"use strict";
const common_vendor = require("../../common/vendor.js");
const store_tripStore = require("../../store/tripStore.js");
const store_userStore = require("../../store/userStore.js");
const service_index = require("../../service/index.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_trip_item2 = common_vendor.resolveComponent("trip-item");
  (_easycom_uni_nav_bar2 + _easycom_trip_item2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_trip_item = () => "../../components/trip-item/trip-item.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_trip_item)();
}
const _sfc_main = {
  __name: "trip",
  setup(__props) {
    const tripStore = store_tripStore.useTripStore();
    const userStore = store_userStore.useUserStore();
    common_vendor.onPullDownRefresh(() => {
      tripStore.fetchOrderList();
      tripStore.fetchTripDataList();
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    common_vendor.onLoad(async () => {
      await tripStore.fetchOrderList();
      await tripStore.fetchTripDataList();
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
      const res = await userStore.fetchUserData();
      if (res.status === 401 && token) {
        common_vendor.index.showToast({
          title: "登录已过期，请重新登录",
          icon: "error"
        });
        common_vendor.index.redirectTo({
          url: "/subPackages/user/login/login"
        });
      }
    });
    const handleEmptyClick = () => {
      common_vendor.index.switchTab({
        url: "/pages/search/search"
      });
    };
    const handleTripDelete = async (id) => {
      await service_index.requestService.delete("/order", {}, {
        orderNumber: tripStore.orderList[id].orderNumber
      });
      tripStore.orderList.splice(id, 1);
      common_vendor.index.showToast({
        title: "行程删除成功"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          shadow: "true",
          dark: true,
          fixed: true,
          ["background-color"]: "#c5b6a0",
          ["status-bar"]: true,
          title: "我的行程"
        }),
        b: !common_vendor.unref(tripStore).orderList.length
      }, !common_vendor.unref(tripStore).orderList.length ? {
        c: common_vendor.o(handleEmptyClick)
      } : {
        d: common_vendor.f(common_vendor.unref(tripStore).orderList, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => handleTripDelete(index), item.id),
            b: "b49b36a1-1-" + i0,
            c: common_vendor.p({
              orderData: item,
              detailData: common_vendor.unref(tripStore).tripDataList[index]
            }),
            d: item.id
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b49b36a1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/trip/trip.js.map
