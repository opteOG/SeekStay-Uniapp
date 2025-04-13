"use strict";
const common_vendor = require("../common/vendor.js");
const service_index = require("../service/index.js");
const useDataStore = common_vendor.defineStore("data", {
  state: () => {
    return {
      dataList: [],
      tagList: [],
      searchList: []
    };
  },
  actions: {
    // 拿取数据列表
    async fetchDataList(tag) {
      const res = await service_index.requestService.get(`/home/${tag}`);
      this.dataList = res.data;
    },
    // 拿取标签数据
    async fetchTagList() {
      const res = await service_index.requestService.get("/tags");
      this.tagList = res.data;
    },
    // 拿取搜索数据
    async fetchSearchAnswer(content) {
      const res = await service_index.requestService.get(`/search?content=${content}`);
      this.searchList = res.data;
    }
  }
});
exports.useDataStore = useDataStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/dataStore.js.map
