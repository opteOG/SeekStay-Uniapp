<template>
	<scroll-view class="list-wrap" 
		scroll-y="true" 
		@scroll="handleScroll"
		:style="{height: contentHeight * 2 + 'rpx'}"
	>
		<view class="virtual-list" :style="{height: listHeight * 2 + 'rpx'}">
			<view class="virtual-list-item" 
				v-for="(item, index) in visibleList" 
				:style="{top: getItemTop(startIndex + index) * 2 + 'rpx'}"
				:key='startIndex + index'
			>
				<slot :item="item" :key="index">
				</slot>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue';

const props = defineProps({
	list: { // 数据列表
		type: Array,
		require: true
	},
	itemHeight: { // 数据高度
		type: Number,
		require: true
	}, 
	contentHeight: { // 容器高度
		type: Number,
		require: true
	}
})
const {list, itemHeight, contentHeight} = toRefs(props)

const scollTop = ref(0) // 已经滚出上方的距离
const listHeight = computed(() => { // 数据列表总高度
	return list.value.length * itemHeight.value
})
const visibleCount = computed(() => {  // 可以展示的数据个数
	return 	Math.ceil(contentHeight.value / itemHeight.value) + 1
})
const startIndex = computed(() => { // 开始展示的数据索引
	return Math.floor(scollTop.value / itemHeight.value)
})
const endIndex = computed(() => { // 结束展示的数据索引
	return startIndex.value + visibleCount.value
})
const visibleList = computed(() => { // 在可视容器中的数据列表
	return list.value.slice(startIndex.value, endIndex.value)
})
const handleScroll = (e) => { // 监听滚动事件
	scollTop.value = e.detail.scrollTop
}
const getItemTop = (index) => { // 计算每个数据的top
	return index * itemHeight.value
}
</script>

<style scoped lang="scss">
.list-wrap {
	position: relative;
	.virtual-list {
		width: 100%;
		position: relative;
		.virtual-list-item {
			position: absolute;
			width: 100%;
		}
	}
}
</style>