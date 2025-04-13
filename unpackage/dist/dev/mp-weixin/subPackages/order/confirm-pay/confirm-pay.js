"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_orderStore = require("../../../store/orderStore.js");
const utils_formatPrice = require("../../../utils/formatPrice.js");
const service_index = require("../../../service/index.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
const _sfc_main = {
  __name: "confirm-pay",
  setup(__props) {
    const orderStore = store_orderStore.useOrderStore();
    let payway = "";
    common_vendor.onShow(() => {
      var _a;
      common_vendor.index.hideLoading();
      if (!((_a = orderStore.orderMessage) == null ? void 0 : _a.orderNumber)) {
        common_vendor.index.showToast({
          title: "请重新进入页面",
          icon: "error"
        });
      }
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const changePayWay = (e) => {
      payway = e.detail.value;
    };
    const handlePayClick = async () => {
      if (!payway) {
        return common_vendor.index.showToast({
          title: "请先选择支付方式",
          icon: "error"
        });
      }
      common_vendor.index.showLoading({
        mask: true,
        title: "支付中"
      });
      const res = await service_index.requestService.patch("/order/paid", {}, {
        orderNumber: orderStore.orderMessage.orderNumber
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        if (res.status !== 201) {
          return common_vendor.index.showToast({
            title: "支付失败，请重试",
            icon: "error"
          });
        }
        common_vendor.index.showToast({
          title: "支付成功"
        });
        common_vendor.index.switchTab({
          url: "/pages/trip/trip"
        });
      }, 2e3);
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
          title: "确认支付"
        }),
        c: common_vendor.o(changePayWay),
        d: common_vendor.t(common_vendor.unref(utils_formatPrice.formatPrice)(common_vendor.unref(orderStore).orderMessage.totalPrice, 2)),
        e: common_vendor.o(handlePayClick)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16743bed"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/order/confirm-pay/confirm-pay.js.map
