"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_tokenNavigateTo = require("../../../utils/tokenNavigateTo.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
const _sfc_main = {
  __name: "phone-register",
  setup(__props) {
    const phoneNumber = common_vendor.ref();
    const rule = /^1[3456789]\d{9}$/;
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleNext = () => {
      if (rule.test(phoneNumber.value)) {
        utils_tokenNavigateTo.tokenNavigateTo(`/subPackages/user/phone-code/phone-code?phoneNumber=${phoneNumber.value}`, false);
      } else {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "error"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          dark: true,
          fixed: true,
          shadow: true,
          ["background-color"]: "#c5b6a0",
          ["status-bar"]: true,
          ["left-icon"]: "left",
          ["left-text"]: "返回",
          title: "输入手机号"
        }),
        c: phoneNumber.value,
        d: common_vendor.o(($event) => phoneNumber.value = $event.detail.value),
        e: common_vendor.o(handleNext)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a01c5351"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/user/phone-register/phone-register.js.map
