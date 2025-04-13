"use strict";
const common_vendor = require("../common/vendor.js");
const service_config = require("./config.js");
class RequestService {
  // 通用请求方法
  /**
   * @param {String} method 请求方式  
   * @param {String} url 请求路径
   * @param {Object} headers 请求头信息
   * @param {Object} data 请求携带数据
   */
  _request(method, url, headers = {}, data = {}) {
    return new Promise((resolve, reject) => {
      try {
        const token = common_vendor.index.getStorageSync("user_token");
        common_vendor.index.request({
          url: service_config.BASE_URL + url,
          method,
          timeout: service_config.TIME_OUT,
          header: Object.assign({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }, headers),
          data,
          success: (res) => {
            if (res.statusCode === 200) {
              resolve(res.data);
            } else {
              reject(new Error(`Request failed with status ${res.statusCode}`));
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      } catch (err) {
        common_vendor.index.__f__("log", "at service/index.js:36", err);
      }
    });
  }
  // get 请求
  get(url, headers = {}) {
    return this._request("GET", url, headers);
  }
  // post 请求
  post(url, headers = {}, data = {}) {
    return this._request("POST", url, headers, data);
  }
  // delete 请求
  delete(url, headers = {}, data = {}) {
    return this._request("DELETE", url, headers, data);
  }
  // patch 请求
  patch(url, headers = {}, data = {}) {
    return this._request("PATCH", url, headers, data);
  }
}
const requestService = new RequestService();
exports.requestService = requestService;
//# sourceMappingURL=../../.sourcemap/mp-weixin/service/index.js.map
