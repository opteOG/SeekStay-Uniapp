"use strict";
const common_vendor = require("../common/vendor.js");
function tokenNavigateTo(url, needToken = false) {
  if (!needToken) {
    common_vendor.index.navigateTo({
      url
    });
  } else {
    const token = common_vendor.index.getStorageSync("user_token");
    if (token) {
      common_vendor.index.navigateTo({
        url
      });
    } else {
      common_vendor.index.showToast({
        title: "请登录后再操作",
        icon: "error"
      });
      common_vendor.index.navigateTo({
        url: "/subPackages/user/login/login"
      });
    }
  }
}
exports.tokenNavigateTo = tokenNavigateTo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/tokenNavigateTo.js.map
