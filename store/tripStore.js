import { defineStore } from 'pinia'
import requestService from '@/service/index.js'

const useTripStore = defineStore('trip', {
	state: () => {
		return {
			orderList: [],
			tripDataList: []
		}	},
	actions: {
		async fetchOrderList() {
		 const res = await requestService.get('/order')
		 this.orderList = res.data.res
		},
		async fetchTripDataList() {
			for(let i=0; i < this.orderList.length ; i++) {
				const dataDetail = await requestService.get(`/detail?id=${this.orderList[i].listId}`)
				this.tripDataList.push(dataDetail.data.listDeatil)
			}
		}
	}
})

export { useTripStore }