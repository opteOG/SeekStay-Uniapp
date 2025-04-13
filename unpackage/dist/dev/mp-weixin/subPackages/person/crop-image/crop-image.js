"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_qf_image_cropper2 = common_vendor.resolveComponent("qf-image-cropper");
  (_easycom_uni_nav_bar2 + _easycom_qf_image_cropper2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_qf_image_cropper = () => "../../../uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_qf_image_cropper)();
}
const _sfc_main = {
  __name: "crop-image",
  setup(__props) {
    const userStore = store_userStore.useUserStore();
    const handleCrop = (e) => {
      userStore.upLoadAvatar(e.tempFilePath);
      common_vendor.index.previewImage({
        urls: [e.tempFilePath],
        indicator: "none"
      });
    };
    const handleBack = () => {
      common_vendor.index.reLaunch({
        url: "/pages/profile/profile"
      });
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
          title: "头像上传"
        }),
        c: common_vendor.o(handleCrop),
        d: common_vendor.p({
          width: 450,
          height: 450,
          radius: 360
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/person/crop-image/crop-image.js.map
