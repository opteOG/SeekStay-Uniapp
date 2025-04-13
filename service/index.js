import { BASE_URL, TIME_OUT } from "./config";

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
				const token = uni.getStorageSync('user_token') 
				uni.request({
					url: BASE_URL + url,
					method: method,
					timeout: TIME_OUT,
					header: Object.assign({
					  "Content-Type": "application/json",
					  'Authorization': `Bearer ${token}`
					}, headers),
					data: data,
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
				console.log(err);
			}
		});
	}

	// get 请求
	get(url, headers = {}) {
		return this._request('GET', url, headers);
	}

	// post 请求
	post(url, headers = {}, data = {}) {
		return this._request('POST', url, headers, data);
	}
	
	// delete 请求
	delete(url, headers = {}, data = {}) {
		return this._request('DELETE', url, headers, data)
	}
	
	// patch 请求
	patch(url, headers = {}, data = {}) {
		return this._request('PATCH', url, headers, data)
	}
}

export default new RequestService();