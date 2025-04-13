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
  __name: "phone-code",
  setup(__props) {
    const phoneNumber = common_vendor.ref();
    common_vendor.ref();
    const countdown = common_vendor.ref(60);
    const isDisabled = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      phoneNumber.value = option.phoneNumber;
    });
    common_vendor.onReady(() => {
      sendCode();
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleNext = () => {
      utils_tokenNavigateTo.tokenNavigateTo("/subPackages/user/set-user/set-user");
    };
    const handleSend = () => {
      sendCode();
    };
    const sendCode = () => {
      isDisabled.value = true;
      let timer = setInterval(() => {
        countdown.value--;
      }, 1e3);
      setTimeout(() => {
        clearInterval(timer);
        countdown.value = 60;
        isDisabled.value = false;
      }, 6e4);
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
          title: "输入验证码"
        }),
        c: _ctx.code,
        d: common_vendor.o(($event) => _ctx.code = $event.detail.value),
        e: common_vendor.t(countdown.value),
        f: common_vendor.o(handleSend),
        g: isDisabled.value,
        h: common_vendor.o(handleNext)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d23b600"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/user/phone-code/phone-code.js.map
