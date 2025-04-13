// 缓存预定房源数据
import { defineStore } from 'pinia'
import requestService from '../service/index.js'

const useUserStore = defineStore('user', {
	state: () => {
		return {
			phoneNumber: '',
			email: '',
			introduce: '',
			avatarUrl: 'https://img.picgo.net/2025/02/12/imagese3b794525e1c26a9.jpg',
			name: ''
		}
	},
	actions: {
		// 拿取用户数据
		async fetchUserData() {
			const res = await requestService.get('/profile')
			if(res.data?.avatar_url) {
				this.avatarUrl = res.data?.avatar_url
			}
			this.phoneNumber = res.data?.phone_number,
			this.email = res.data?.email
			this.introduce = res.data?.introduce
			this.name = res.data?.name
			return res
		},
		// 修改用户数据
		async updateUserData(updatedData) {
			const { phoneNumber, email, introduce } = updatedData
			if(phoneNumber) {
				await requestService.patch('/profile/phone', {}, {
					phone: phoneNumber,
				})
				this.phoneNumber = phoneNumber
			}
			if(email) {
			 await requestService.patch('/profile/email', {}, {
					email,
				})
				this.email = email
			}
			if(introduce) {
				await requestService.patch('/profile/introduce', {}, {
					introduce,
				})
				this.introduce = introduce
			}
		},
		// 头像上传
		async upLoadAvatar(filePath) {
			const token = uni.getStorageSync('user_token')
			uni.uploadFile({
				url: 'http://47.108.24.123:3004/file/avatar', //仅为示例，非真实的接口地址
				filePath: filePath,
				name: 'avatar',
				header: {
					'Authorization': `Bearer ${token}`
				},
				success: (res) => {
					this.avatarUrl = JSON.parse(res.data).avatarUrl
					console.log(this.avatarUrl);
				}
			});
		}
	}
})

export { useUserStore }