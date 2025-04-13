// 缓存预定房源数据
import { defineStore } from 'pinia'

const useOrderStore = defineStore('order', {
	state: () => {
		return {
			startTime: null,
			endTime: null,
			totalDays: 0,
			roomData: {},
			orderMessage: {}
		}
	},
	actions: {
		setTime(start, end, totalDays) {
			this.startTime = start
			this.endTime = end
			this.totalDays = totalDays
		},
		reset() {
			this.startTime = null
			this.endTime = null
			this.totalDays = null
		}
	}
})

export { useOrderStore }