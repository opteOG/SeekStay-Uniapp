"use strict";
const common_vendor = require("../../common/vendor.js");
const store_orderStore = require("../../store/orderStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "DatePicker",
  setup(__props) {
    const today = /* @__PURE__ */ new Date();
    const startDate = common_vendor.ref(null);
    const endDate = common_vendor.ref(null);
    const currentDate = common_vendor.ref(new Date(today.getFullYear(), today.getMonth(), 1));
    const twoYearsLater = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate());
    const orderStore = store_orderStore.useOrderStore();
    const weekDays = ["一", "二", "三", "四", "五", "六", "日"];
    const year = common_vendor.computed(() => currentDate.value.getFullYear());
    const month = common_vendor.computed(() => currentDate.value.getMonth());
    const totalDays = common_vendor.computed(() => {
      if (!startDate.value || !endDate.value)
        return "?";
      const timeDiff = endDate.value.getTime() - startDate.value.getTime();
      const dayDiff = Math.ceil(timeDiff / (1e3 * 60 * 60 * 24));
      return dayDiff;
    });
    const firstDayOfMonth = common_vendor.computed(() => new Date(year.value, month.value, 1));
    const lastDayOfMonth = common_vendor.computed(() => new Date(year.value, month.value + 1, 0));
    const monthDays = common_vendor.computed(() => {
      let dates = [];
      let firstDay = firstDayOfMonth.value;
      let lastDay = lastDayOfMonth.value;
      let firstWeekday = firstDay.getDay();
      firstWeekday = firstWeekday === 0 ? 7 : firstWeekday;
      for (let i = 1; i < firstWeekday; i++) {
        dates.push(null);
      }
      for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(new Date(year.value, month.value, i));
      }
      return dates;
    });
    const isSelected = (date) => date && startDate.value && startDate.value.toDateString() === date.toDateString();
    const isInRange = (date) => date && startDate.value && endDate.value && date > startDate.value && date < endDate.value;
    const isStart = (date) => date && startDate.value && startDate.value.toDateString() === date.toDateString();
    const isEnd = (date) => date && endDate.value && endDate.value.toDateString() === date.toDateString();
    const isDisabled = (date) => !date || date < today || date > twoYearsLater;
    const selectDate = (date) => {
      if (!date || isDisabled(date))
        return;
      if (!startDate.value || startDate.value && endDate.value) {
        startDate.value = date;
        endDate.value = null;
      } else {
        if (date > startDate.value) {
          endDate.value = date;
        } else if (date < startDate.value) {
          endDate.value = startDate.value;
          startDate.value = date;
        }
      }
      orderStore.setTime(startDate.value, endDate.value, totalDays.value);
    };
    const prevMonth = () => {
      let prev = new Date(year.value, month.value - 1, 1);
      let minDate = new Date(today.getFullYear(), today.getMonth(), 1);
      if (prev >= minDate) {
        currentDate.value = prev;
      }
    };
    const nextMonth = () => {
      let next = new Date(year.value, month.value + 1, 1);
      if (next <= twoYearsLater) {
        currentDate.value = next;
      }
    };
    const resetToCurrent = () => {
      startDate.value = null;
      endDate.value = null;
      currentDate.value = new Date(today.getFullYear(), today.getMonth(), 1);
    };
    const isPrevDisabled = common_vendor.computed(() => {
      let minDate = new Date(today.getFullYear(), today.getMonth(), 1);
      return currentDate.value <= minDate;
    });
    const isNextDisabled = common_vendor.computed(() => new Date(year.value, month.value + 1, 1) > twoYearsLater);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "left"
        }),
        b: common_vendor.o(prevMonth),
        c: isPrevDisabled.value,
        d: common_vendor.t(year.value),
        e: common_vendor.t(month.value + 1),
        f: common_vendor.p({
          type: "right"
        }),
        g: common_vendor.o(nextMonth),
        h: isNextDisabled.value,
        i: common_vendor.f(weekDays, (day, index, i0) => {
          return {
            a: common_vendor.t(day),
            b: index
          };
        }),
        j: common_vendor.f(monthDays.value, (day, index, i0) => {
          return common_vendor.e({
            a: day
          }, day ? {
            b: common_vendor.t(day.getDate())
          } : {}, {
            c: index,
            d: isSelected(day) ? 1 : "",
            e: isInRange(day) ? 1 : "",
            f: isDisabled(day) ? 1 : "",
            g: isStart(day) ? 1 : "",
            h: isEnd(day) ? 1 : "",
            i: common_vendor.o(($event) => selectDate(day), index)
          });
        }),
        k: common_vendor.o(resetToCurrent),
        l: common_vendor.t(totalDays.value || "?")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6a917b3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/DatePicker/DatePicker.js.map
