"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_userStore = require("../../store/userStore.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const userStore = store_userStore.useUserStore();
    const randow = common_vendor.ref(Math.random());
    common_vendor.onPullDownRefresh(() => {
      randow.value = Math.random();
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
      common_vendor.index.hideTabBar();
    });
    const handleBack = () => {
      common_vendor.index.showTabBar();
      common_vendor.index.switchTab({
        url: "/pages/search/search"
      });
    };
    const handleEditClick = () => {
      common_vendor.index.navigateTo({
        url: "/subPackages/person/edit-user-message/edit-user-message"
      });
    };
    const handleLogout = () => {
      common_vendor.index.removeStorageSync("user_token");
      common_vendor.index.switchTab({
        url: "/pages/search/search"
      });
      common_vendor.index.showTabBar();
    };
    const handleUpload = () => {
      common_vendor.index.navigateTo({
        url: "/subPackages/person/crop-image/crop-image"
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
          title: "个人主页"
        }),
        c: common_vendor.o(handleUpload),
        d: common_vendor.unref(userStore).avatarUrl,
        e: randow.value,
        f: common_vendor.t(common_vendor.unref(userStore).name),
        g: common_vendor.o(handleEditClick),
        h: common_assets._imports_0$1,
        i: common_vendor.t(common_vendor.unref(userStore).introduce),
        j: common_assets._imports_1,
        k: common_vendor.t(common_vendor.unref(userStore).phoneNumber),
        l: common_assets._imports_2,
        m: common_vendor.t(common_vendor.unref(userStore).email),
        n: common_vendor.o(handleLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
