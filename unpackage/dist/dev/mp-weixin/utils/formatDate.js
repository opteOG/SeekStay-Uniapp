"use strict";
function formatDate(date) {
  if (!date)
    return null;
  return `${date == null ? void 0 : date.getFullYear()}年${(date == null ? void 0 : date.getMonth()) + 1}月${date == null ? void 0 : date.getDate()}日`;
}
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/formatDate.js.map
