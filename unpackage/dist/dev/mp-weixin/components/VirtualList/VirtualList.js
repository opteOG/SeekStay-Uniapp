"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "VirtualList",
  props: {
    list: {
      // 数据列表
      type: Array,
      require: true
    },
    itemHeight: {
      // 数据高度
      type: Number,
      require: true
    },
    contentHeight: {
      // 容器高度
      type: Number,
      require: true
    }
  },
  setup(__props) {
    const props = __props;
    const { list, itemHeight, contentHeight } = common_vendor.toRefs(props);
    const scollTop = common_vendor.ref(0);
    const listHeight = common_vendor.computed(() => {
      return list.value.length * itemHeight.value;
    });
    const visibleCount = common_vendor.computed(() => {
      return Math.ceil(contentHeight.value / itemHeight.value);
    });
    const startIndex = common_vendor.computed(() => {
      return Math.floor(scollTop.value / itemHeight.value);
    });
    const endIndex = common_vendor.computed(() => {
      return startIndex.value + visibleCount.value;
    });
    const visibleList = common_vendor.computed(() => {
      return list.value.slice(startIndex.value, endIndex.value);
    });
    const handleScroll = (e) => {
      scollTop.value = e.detail.scrollTop;
    };
    const getItemTop = (index) => {
      return index * itemHeight.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(visibleList.value, (item, index, i0) => {
          return {
            a: "d-" + i0,
            b: common_vendor.r("d", {
              item,
              key: index
            }, i0),
            c: getItemTop(startIndex.value + index) * 2 + "rpx",
            d: startIndex.value + index
          };
        }),
        b: listHeight.value * 2 + "rpx",
        c: common_vendor.o(handleScroll),
        d: common_vendor.unref(contentHeight) * 2 + "rpx"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef17f403"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/VirtualList/VirtualList.js.map
