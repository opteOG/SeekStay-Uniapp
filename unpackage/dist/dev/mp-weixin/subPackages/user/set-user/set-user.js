"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_index = require("../../../service/index.js");
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
  __name: "set-user",
  setup(__props) {
    const formRef = common_vendor.ref();
    const formData = common_vendor.reactive({
      name: "",
      password: "",
      confirmPassword: ""
    });
    const rules = {
      name: {
        rules: [
          {
            required: true,
            errorMessage: "请输入手机号或用户名"
          },
          {
            maxLength: 10,
            errorMessage: "用户名长度不能超过10位"
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
      },
      confirmPassword: {
        rules: [
          {
            required: true,
            errorMessage: "请确认密码"
          },
          {
            validateFunction: (rule, value, data, callback) => {
              if (value !== formData.password) {
                callback("两次输入密码不一致，请检查");
              }
              return true;
            }
          }
        ]
      }
    };
    common_vendor.onReady(() => {
      formRef.value.setRules(rules);
    });
    const handleSubmit = () => {
      formRef.value.validate().then((res) => {
        service_index.requestService.post("/register", {}, {
          name: res.name,
          password: res.password
        }).then((res2) => {
          if (res2.code !== -1002) {
            common_vendor.index.setStorageSync(
              "user_token",
              res2.data.token
            );
            common_vendor.index.showToast({
              title: "注册成功"
            });
            common_vendor.index.switchTab({
              url: "/pages/search/search"
            });
          } else {
            rules.name.rules.push({
              validateFunction: (rule, value, data, callback) => {
                callback(res2.message);
                return true;
              }
            });
            formRef.value.setRules(rules);
            formRef.value.validate();
            rules.name.rules.pop();
          }
        });
      }).catch((err) => {
        common_vendor.index.__f__("log", "at subPackages/user/set-user/set-user.vue:131", err);
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          fixed: true,
          ["background-color"]: "#c5b6a0",
          ["status-bar"]: true,
          ["left-icon"]: "left",
          ["left-text"]: "返回",
          title: "输入个人信息"
        }),
        c: common_vendor.o(($event) => formData.name = $event),
        d: common_vendor.p({
          placeholder: "请输入昵称",
          primaryColor: "#c4b8a1",
          modelValue: formData.name
        }),
        e: common_vendor.p({
          label: "用户名",
          name: "name"
        }),
        f: common_vendor.o(($event) => formData.password = $event),
        g: common_vendor.p({
          type: "password",
          placeholder: "6-16位字符",
          primaryColor: "#c4b8a1",
          modelValue: formData.password
        }),
        h: common_vendor.p({
          label: "密码",
          name: "password"
        }),
        i: common_vendor.o(($event) => formData.confirmPassword = $event),
        j: common_vendor.p({
          type: "password",
          placeholder: "6-16位字符",
          primaryColor: "#c4b8a1",
          modelValue: formData.confirmPassword
        }),
        k: common_vendor.p({
          label: "确认密码",
          name: "confirmPassword"
        }),
        l: common_vendor.sr(formRef, "6cc5d9d2-1", {
          "k": "formRef"
        }),
        m: common_vendor.p({
          modelValue: formData
        }),
        n: common_vendor.o(handleSubmit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6cc5d9d2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subPackages/user/set-user/set-user.js.map
