/**
 * @param {String} url 跳转的页面路径  
 * @param {Boolean} needToken 跳转的页面是否需要token 
 */
export function tokenNavigateTo(url, needToken=false) {
	if(!needToken) {
		uni.navigateTo({
			url: url
		})
	}
	else {
		const token = uni.getStorageSync('user_token')
		if(token) {
			uni.navigateTo({
				url: url
			})
		}
		else {
			uni.showToast({
				title: '请登录后再操作',
				icon: 'error'
			})
			uni.navigateTo({
				url: '/subPackages/user/login/login'
			})
		}
	}
}