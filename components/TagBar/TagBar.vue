<template>
	<scroll-view scroll-x="true" show-scrollbar=false>
		<view class="tag-bar">
			<template v-for="item in dataStore.tagList" :key="item.id">
				<view :class="activeId === item.id? 'item active' : 'item'" @click="handleItemClick(item.id)">
					<image class="icon" :src="item.icon" mode="aspectFit"></image>
					<span class="name">{{ item.name }}</span>
				</view>
			</template>
		</view>
	</scroll-view>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '../../store/dataStore';

const activeId = ref(1)
const dataStore = useDataStore();
const scrollPosition = ref()

const handleItemClick = (tag=1) => {
	dataStore.fetchDataList(tag)
	activeId.value = tag
}

</script>

<style scoped lang="scss">
.uni-scroll-vie::-webkit-scrollbar-thumb {
	display: none;
}

.active {
	border-bottom: 6rpx solid $uni-bg-color-grey;
}

.tag-bar {
	display: flex;
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 120rpx;
		.icon {
			width: 60rpx;
			height: 60rpx;
			padding: 0 30rpx;
		}
		.name {
			margin: 0 5rpx;
			padding-bottom: 5rpx;
			font-size: 15rpx;
			font-family: '思源黑体 CN';
			font-weight: 400;
		}
		
	}
}
</style>
