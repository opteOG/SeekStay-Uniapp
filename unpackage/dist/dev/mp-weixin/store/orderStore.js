"use strict";
const common_vendor = require("../common/vendor.js");
const useOrderStore = common_vendor.defineStore("order", {
  state: () => {
    return {
      startTime: null,
      endTime: null,
      totalDays: 0,
      roomData: {},
      orderMessage: {}
    };
  },
  actions: {
    setTime(start, end, totalDays) {
      this.startTime = start;
      this.endTime = end;
      this.totalDays = totalDays;
    },
    reset() {
      this.startTime = null;
      this.endTime = null;
      this.totalDays = null;
    }
  }
});
exports.useOrderStore = useOrderStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/orderStore.js.map
