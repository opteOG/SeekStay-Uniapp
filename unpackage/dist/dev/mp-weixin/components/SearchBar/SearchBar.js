"use strict";
const utils_tokenNavigateTo = require("../../utils/tokenNavigateTo.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "SearchBar",
  data() {
    return {
      content: "",
      showPH: true
      // 显示占位文字
    };
  },
  methods: {
    // 处理搜索请求
    handleSearch() {
      utils_tokenNavigateTo.tokenNavigateTo(`/subPackages/search/search-answer/search-answer?content=${this.content}`, true);
    },
    handleFocus() {
      this.showPH = false;
    },
    handleBlur() {
      this.showPH = true;
      this.content = "";
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleFocus && $options.handleFocus(...args)),
    b: common_vendor.o((...args) => $options.handleBlur && $options.handleBlur(...args)),
    c: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    d: $data.content,
    e: common_vendor.o(($event) => $data.content = $event.detail.value),
    f: common_vendor.p({
      type: "search"
    }),
    g: $data.showPH
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6602f27d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/SearchBar/SearchBar.js.map
