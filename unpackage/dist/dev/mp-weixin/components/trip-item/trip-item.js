"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_formatPrice = require("../../utils/formatPrice.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_dateformat2 + _easycom_uni_card2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "trip-item",
  props: {
    orderData: {
      type: Object
    },
    detailData: {
      type: Object
    }
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const orderStatus = common_vendor.computed(() => {
      switch (props.orderData.status) {
        case "pending":
          return "待支付";
        case "paid":
          return "已支付";
        case "ing":
          return "进行中";
        case "completed":
          return "已完成";
        case "concelled":
          return "已取消";
      }
    });
    const lastDay = common_vendor.computed(() => {
      const startDay = new Date(props.orderData.startDate);
      const today = /* @__PURE__ */ new Date();
      const endDay = new Date(props.orderData.endDate);
      const diffTime1 = startDay - today;
      const diffTime2 = endDay - today;
      const ans = Math.ceil(diffTime1 / (1e3 * 60 * 60 * 24));
      if (diffTime1 > 0) {
        return `距离行程开始还有${ans}天`;
      }
      if (diffTime1 <= 0 && diffTime2 >= 0) {
        return "行程进行中";
      }
      if (diffTime2 <= 0) {
        return "行程已结束";
      }
    });
    const emit = __emit;
    const props = __props;
    const handleCancelTrip = async () => {
      if (orderStatus.value === "已支付") {
        return common_vendor.index.showToast({
          title: "当前行程已支付，无法取消",
          icon: "error"
        });
      }
      if (orderStatus.value === "进行中") {
        return common_vendor.index.showToast({
          title: "当前行程进行中，无法取消",
          icon: "error"
        });
      }
      emit("delete");
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return {
        a: (_a = __props.detailData) == null ? void 0 : _a.imgUrl[0],
        b: common_vendor.p({
          date: (_b = __props.orderData) == null ? void 0 : _b.startDate,
          format: "yyyy-MM-dd"
        }),
        c: common_vendor.p({
          date: (_c = __props.orderData) == null ? void 0 : _c.endDate,
          format: "yyyy-MM-dd"
        }),
        d: common_vendor.t(lastDay.value),
        e: common_vendor.t(common_vendor.unref(utils_formatPrice.formatPrice)((_d = __props.orderData) == null ? void 0 : _d.totalPrice, 2, "￥")),
        f: common_vendor.o(handleCancelTrip),
        g: common_vendor.p({
          title: (_e = __props.detailData) == null ? void 0 : _e.location,
          ["sub-title"]: (_f = __props.detailData) == null ? void 0 : _f.description,
          extra: orderStatus.value,
          padding: "10px 0"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b900612"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/trip-item/trip-item.js.map
