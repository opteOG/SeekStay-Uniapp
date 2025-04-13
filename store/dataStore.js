import { defineStore } from 'pinia'
import requestService from '@/service/index.js'

const useDataStore = defineStore('data', {
	state: () => {
		return {
			dataList: [],
			tagList: [],
			searchList: []
		}
	},
	actions: {
		// 拿取数据列表
		async fetchDataList(tag) {
			const res = await requestService.get(`/home/${tag}`)
			this.dataList = res.data
		},
		// 拿取标签数据
		async fetchTagList() {
			const res = await requestService.get('/tags')
			this.tagList = res.data
		},
		// 拿取搜索数据
		async fetchSearchAnswer(content) {
			const res = await requestService.get(`/search?content=${content}`)
			this.searchList = res.data 
		}
	}
})

export { useDataStore }