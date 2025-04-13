"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = {
  __name: "RoomResource",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  emits: ["navigate"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleClick = () => {
      emit("navigate");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.data.imgUrl, (item, k0, i0) => {
          return {
            a: item
          };
        }),
        b: common_vendor.t(__props.data.location),
        c: common_vendor.p({
          readonly: "true",
          value: __props.data.score,
          ["active-color"]: "#c56729",
          size: "20"
        }),
        d: common_vendor.t(__props.data.description),
        e: common_vendor.t(__props.data.openTime),
        f: common_vendor.t(__props.data.price + "￥"),
        g: common_vendor.o(handleClick)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/RoomResource/RoomResource.js.map
