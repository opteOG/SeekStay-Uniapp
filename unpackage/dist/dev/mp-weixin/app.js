"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/search/search.js";
  "./pages/history/history.js";
  "./pages/trip/trip.js";
  "./pages/profile/profile.js";
  "./subPackages/order/apply-order/apply-order.js";
  "./subPackages/order/confirm-pay/confirm-pay.js";
  "./subPackages/order/room-detail/room-detail.js";
  "./subPackages/person/crop-image/crop-image.js";
  "./subPackages/person/edit-user-message/edit-user-message.js";
  "./subPackages/search/search-answer/search-answer.js";
  "./subPackages/user/login/login.js";
  "./subPackages/user/phone-register/phone-register.js";
  "./subPackages/user/phone-code/phone-code.js";
  "./subPackages/user/set-user/set-user.js";
}
const _sfc_main = {
  onLaunch: function(e) {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
