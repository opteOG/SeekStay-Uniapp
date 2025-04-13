"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_orderStore = require("../../../store/orderStore.js");
const utils_formatDate = require("../../../utils/formatDate.js");
const utils_formatPrice = require("../../../utils/formatPrice.js");
const service_index = require("../../../service/index.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  (_easycom_uni_nav_bar2 + _easycom_uni_rate2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_rate)();
}
const _sfc_main = {
  __name: "apply-order",
  setup(__props) {
    const orderStore = store_orderStore.useOrderStore();
    const roomData = common_vendor.ref();
    const homeTotalPrice = common_vendor.computed(() => {
      return roomData.value.price * orderStore.totalDays;
    });
    const servicePrice = common_vendor.computed(() => {
      return homeTotalPrice.value * 0.05;
    });
    const taxPrice = common_vendor.computed(() => {
      return homeTotalPrice.value * 0.06;
    });
    const totalPrice = common_vendor.computed(() => {
      return homeTotalPrice.value + servicePrice.value + taxPrice.value;
    });
    common_vendor.onLoad(() => {
      roomData.value = orderStore.roomData;
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleOrderClick = async () => {
      common_vendor.index.showLoading({
        title: "生成订单中",
        mask: true
      });
      const res = await service_index.requestService.post("/order", {}, {
        totalPrice: totalPrice.value,
        startDate: orderStore.startTime,
        endDate: orderStore.endTime,
        totalRestNight: orderStore.totalDays,
        listId: orderStore.roomData.id
      });
      orderStore.orderMessage = res.order;
      common_vendor.index.navigateTo({
        url: `/subPackages/order/confirm-pay/confirm-pay?`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          dark: true,
          fixed: true,
          ["background-color"]: "#c5b6a0",
          ["status-bar"]: true,
          ["left-icon"]: "left",
          ["left-text"]: "返回",
          title: "预定申请"
        }),
        c: roomData.value.imgUrl[0],
        d: common_vendor.t(roomData.value.location),
        e: common_vendor.t(roomData.value.description),
        f: common_vendor.p({
          value: "1",
          max: "1",
          ["active-color"]: "#000",
          readonly: "true"
        }),
        g: common_vendor.t(roomData.value.score),
        h: common_assets._imports_0$2,
        i: common_vendor.t(common_vendor.unref(utils_formatDate.formatDate)(common_vendor.unref(orderStore).startTime)),
        j: common_vendor.t(common_vendor.unref(utils_formatDate.formatDate)(common_vendor.unref(orderStore).endTime)),
        k: common_vendor.t(common_vendor.unref(utils_formatPrice.formatPrice)(roomData.value.price)),
        l: common_vendor.t(common_vendor.unref(orderStore).totalDays),
        m: common_vendor.t(common_vendor.unref(utils_formatPrice.formatPrice)(homeTotalPrice.value)),
        n: common_vendor.t(common_vendor.unref(utils_formatPrice.formatPrice)(servicePrice.value)),
        o: common_vendor.t(common_vendor.unref(utils_formatPrice.formatPrice)(taxPrice.value)),
        p: common_vendor.t(common_vendor.unref(utils_formatPrice.formatPrice)(totalPrice.value)),
        q: common_vendor.o(handleOrderClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5c21dacc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/order/apply-order/apply-order.js.map
