"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_dataStore = require("../../../store/dataStore.js");
const store_orderStore = require("../../../store/orderStore.js");
const utils_formatDate = require("../../../utils/formatDate.js");
const service_index = require("../../../service/index.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_ScoreBar2 = common_vendor.resolveComponent("ScoreBar");
  const _easycom_DatePicker2 = common_vendor.resolveComponent("DatePicker");
  (_easycom_uni_nav_bar2 + _easycom_ScoreBar2 + _easycom_DatePicker2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_ScoreBar = () => "../../../components/ScoreBar/ScoreBar.js";
const _easycom_DatePicker = () => "../../../components/DatePicker/DatePicker.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_ScoreBar + _easycom_DatePicker)();
}
const _sfc_main = {
  __name: "room-detail",
  setup(__props) {
    const data = common_vendor.ref();
    const collected = common_vendor.ref(false);
    store_dataStore.useDataStore();
    const orderStore = store_orderStore.useOrderStore();
    common_vendor.onLoad(async (option) => {
      orderStore.reset();
      const res = await service_index.requestService.get(`/detail?id=${option.id}`);
      data.value = res.data.listDeatil;
      collected.value = res.data.collected;
      orderStore.roomData = data.value;
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const changeCollectState = () => {
      collected.value = !collected.value;
      if (collected.value) {
        common_vendor.index.showToast({
          title: "已收藏"
        });
        service_index.requestService.post("/collect", {}, {
          listId: data.value.id
        });
      } else {
        common_vendor.index.showToast({
          title: "已取消收藏"
        });
        service_index.requestService.delete("/collect", {}, {
          listId: data.value.id
        });
      }
    };
    const handleOrder = () => {
      if (!orderStore.startTime) {
        common_vendor.index.showToast({
          title: "请先选择订房日期",
          icon: "error"
        });
        return;
      }
      if (!orderStore.endTime && orderStore.startTime) {
        common_vendor.index.showToast({
          title: "请选择退房日期",
          icon: "error"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/subPackages/order/apply-order/apply-order"
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          dark: true,
          fixed: true,
          ["background-color"]: "#c5b6a0",
          ["status-bar"]: true,
          ["left-icon"]: "left",
          ["left-text"]: "返回",
          title: "房屋详情"
        }),
        c: !collected.value,
        d: common_assets._imports_0$3,
        e: collected.value,
        f: common_assets._imports_1$1,
        g: common_vendor.o(changeCollectState),
        h: common_vendor.f((_a = data.value) == null ? void 0 : _a.imgUrl, (url, k0, i0) => {
          return {
            a: url
          };
        }),
        i: common_vendor.t((_b = data.value) == null ? void 0 : _b.location),
        j: common_vendor.t((_c = data.value) == null ? void 0 : _c.description),
        k: common_vendor.p({
          score: (_d = data.value) == null ? void 0 : _d.score
        }),
        l: common_assets._imports_2$1,
        m: common_vendor.t((_e = data.value) == null ? void 0 : _e.price),
        n: common_vendor.t(common_vendor.unref(utils_formatDate.formatDate)(common_vendor.unref(orderStore).startTime)),
        o: common_vendor.t(common_vendor.unref(utils_formatDate.formatDate)(common_vendor.unref(orderStore).endTime)),
        p: common_vendor.o(handleOrder)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55ccfdfb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/order/room-detail/room-detail.js.map
