"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_nav_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "edit-user-message",
  setup(__props) {
    const form = common_vendor.ref();
    const formRules = {
      introduce: {
        rules: [
          {
            maxLength: 40,
            errorMessage: "简介长度不超过40字"
          }
        ]
      },
      phoneNumber: {
        rules: [
          {
            validateFunction: function(rule, value, data, callback) {
              common_vendor.index.__f__("log", "at subPackages/person/edit-user-message/edit-user-message.vue:50", value);
              const reg = /^1[3-9]\d{9}$/;
              if (!reg.test(value)) {
                callback("电话格式不正确，请重新输入");
                return false;
              }
              return true;
            }
          }
        ]
      },
      email: {
        rules: [
          {
            validateFunction: function(rule, value, data, callback) {
              common_vendor.index.__f__("log", "at subPackages/person/edit-user-message/edit-user-message.vue:65", value);
              const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (!reg.test(value)) {
                callback("邮箱格式不正确，请重新输入");
                return false;
              }
              return true;
            }
          }
        ]
      }
    };
    const userStore = store_userStore.useUserStore();
    const formData = common_vendor.reactive({
      phoneNumber: userStore.phoneNumber,
      email: userStore.email,
      introduce: userStore.introduce
    });
    const handleSubmit = () => {
      form.value.validate().then((res) => {
        userStore.updateUserData(formData);
        common_vendor.index.showToast({
          title: "修改信息成功"
        });
        common_vendor.index.navigateBack();
      }).catch((err) => {
        common_vendor.index.__f__("log", "at subPackages/person/edit-user-message/edit-user-message.vue:94", err);
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack();
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
          title: "编辑个人信息"
        }),
        c: common_vendor.o(($event) => formData.phoneNumber = $event),
        d: common_vendor.p({
          type: "number",
          modelValue: formData.phoneNumber
        }),
        e: common_vendor.p({
          label: "电话",
          name: "phoneNumber"
        }),
        f: common_vendor.o(($event) => formData.email = $event),
        g: common_vendor.p({
          type: "text",
          modelValue: formData.email
        }),
        h: common_vendor.p({
          label: "邮箱",
          name: "email"
        }),
        i: common_vendor.o(($event) => formData.introduce = $event),
        j: common_vendor.p({
          type: "textarea",
          modelValue: formData.introduce
        }),
        k: common_vendor.p({
          label: "个人介绍",
          name: "introduce"
        }),
        l: common_vendor.o(handleSubmit),
        m: common_vendor.sr(form, "6783d631-1", {
          "k": "form"
        }),
        n: common_vendor.p({
          rules: formRules,
          modelValue: formData
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6783d631"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/person/edit-user-message/edit-user-message.js.map
