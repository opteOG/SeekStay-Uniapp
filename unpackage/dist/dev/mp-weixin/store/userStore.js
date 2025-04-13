"use strict";
const common_vendor = require("../common/vendor.js");
const service_index = require("../service/index.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => {
    return {
      phoneNumber: "",
      email: "",
      introduce: "",
      avatarUrl: "https://img.picgo.net/2025/02/12/imagese3b794525e1c26a9.jpg",
      name: ""
    };
  },
  actions: {
    // 拿取用户数据
    async fetchUserData() {
      var _a, _b, _c, _d, _e, _f;
      const res = await service_index.requestService.get("/profile");
      if ((_a = res.data) == null ? void 0 : _a.avatar_url) {
        this.avatarUrl = (_b = res.data) == null ? void 0 : _b.avatar_url;
      }
      this.phoneNumber = (_c = res.data) == null ? void 0 : _c.phone_number, this.email = (_d = res.data) == null ? void 0 : _d.email;
      this.introduce = (_e = res.data) == null ? void 0 : _e.introduce;
      this.name = (_f = res.data) == null ? void 0 : _f.name;
      return res;
    },
    // 修改用户数据
    async updateUserData(updatedData) {
      const { phoneNumber, email, introduce } = updatedData;
      if (phoneNumber) {
        await service_index.requestService.patch("/profile/phone", {}, {
          phone: phoneNumber
        });
        this.phoneNumber = phoneNumber;
      }
      if (email) {
        await service_index.requestService.patch("/profile/email", {}, {
          email
        });
        this.email = email;
      }
      if (introduce) {
        await service_index.requestService.patch("/profile/introduce", {}, {
          introduce
        });
        this.introduce = introduce;
      }
    },
    // 头像上传
    async upLoadAvatar(filePath) {
      const token = common_vendor.index.getStorageSync("user_token");
      common_vendor.index.uploadFile({
        url: "http://47.108.24.123:3004/file/avatar",
        //仅为示例，非真实的接口地址
        filePath,
        name: "avatar",
        header: {
          "Authorization": `Bearer ${token}`
        },
        success: (res) => {
          this.avatarUrl = JSON.parse(res.data).avatarUrl;
          common_vendor.index.__f__("log", "at store/userStore.js:62", this.avatarUrl);
        }
      });
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/userStore.js.map
