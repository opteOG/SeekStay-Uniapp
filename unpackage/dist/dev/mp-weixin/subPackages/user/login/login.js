"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_tokenNavigateTo = require("../../../utils/tokenNavigateTo.js");
const service_index = require("../../../service/index.js");
if (!Array) {
  const _easycom_LoginBar2 = common_vendor.resolveComponent("LoginBar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_LoginBar2 + _easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_LoginBar = () => "../../../components/LoginBar/LoginBar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_LoginBar + _easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const formRef = common_vendor.ref();
    const formData = common_vendor.reactive({
      name: "",
      password: ""
    });
    const rules = {
      name: {
        rules: [
          {
            required: true,
            errorMessage: "请输入手机号或用户名"
          }
        ]
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "请输入密码"
          },
          {
            minLength: 6,
            maxLength: 16,
            errorMessage: "密码长度在6-16个字符之间"
          }
        ]
      }
    };
    const handleRegister = () => {
      utils_tokenNavigateTo.tokenNavigateTo("/subPackages/user/phone-register/phone-register", false);
    };
    const handleSubmit = () => {
      formRef.value.validate().then((res) => {
        service_index.requestService.post("/login", {}, {
          name: formData.name,
          password: formData.password
        }).then((res2) => {
          if (res2.code === -1003) {
            common_vendor.index.showToast({
              title: res2.message,
              icon: "error"
            });
          }
          if (res2.code === -1004) {
            common_vendor.index.showToast({
              title: res2.message,
              icon: "error"
            });
          }
          common_vendor.index.setStorageSync("user_token", res2.data.token);
          common_vendor.index.switchTab({
            url: "/pages/search/search"
          });
          common_vendor.index.showToast({
            title: "登录成功"
          });
        });
      }).catch((err) => {
        common_vendor.index.__f__("log", "at subPackages/user/login/login.vue:133", err);
      });
    };
    const handleReset = () => {
      formData.name = "";
      formData.password = "";
      formRef.value.clearValidate();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleRegister),
        b: common_vendor.p({
          type: "down",
          color: "#515151",
          size: "24"
        }),
        c: common_vendor.p({
          type: "up",
          color: "#515151",
          size: "24"
        }),
        d: common_vendor.o(($event) => formData.name = $event),
        e: common_vendor.p({
          placeholder: "请输入手机号/昵称",
          primaryColor: "#c4b8a1",
          modelValue: formData.name
        }),
        f: common_vendor.p({
          label: "用户名",
          name: "name"
        }),
        g: common_vendor.o(($event) => formData.password = $event),
        h: common_vendor.p({
          type: "password",
          placeholder: "6-16位字符",
          primaryColor: "#c4b8a1",
          modelValue: formData.password
        }),
        i: common_vendor.p({
          label: "密码",
          name: "password"
        }),
        j: common_vendor.sr(formRef, "f01d4a9f-3", {
          "k": "formRef"
        }),
        k: common_vendor.p({
          rules,
          modelValue: formData
        }),
        l: common_vendor.o(handleSubmit),
        m: common_vendor.o(handleReset)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f01d4a9f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/user/login/login.js.map
