"use strict";
const common_vendor = require("../common/vendor.js");
const service_index = require("../service/index.js");
const useTripStore = common_vendor.defineStore("trip", {
  state: () => {
    return {
      orderList: [],
      tripDataList: []
    };
  },
  actions: {
    async fetchOrderList() {
      const res = await service_index.requestService.get("/order");
      this.orderList = res.data.res;
    },
    async fetchTripDataList() {
      for (let i = 0; i < this.orderList.length; i++) {
        const dataDetail = await service_index.requestService.get(`/detail?id=${this.orderList[i].listId}`);
        this.tripDataList.push(dataDetail.data.listDeatil);
      }
    }
  }
});
exports.useTripStore = useTripStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/tripStore.js.map
