<template>
  <view>
		<!-- 导航栏 -->
    <uni-nav-bar
      dark
      :fixed="true"
      shadow
      background-color="#c5b6a0"
      status-bar
      left-icon="left"
      left-text="返回"
      title="搜索结果"
      @clickLeft="handleBack"
    />
		<!-- 骨架屏 -->
		<view v-if="!dataStore.searchList.length" style="padding-bottom: 100rpx;">
			<template v-for="(item, index) in Array.from({ length: 6 })" :key="index">
				<view class="skeleton">
					<view class="image"></view>
					<view class="context">
						<view class="context-item" style="width: 600rpx;"></view>
						<view class="context-item"></view>
						<view class="context-item"></view>
					</view>
				</view>
			</template>
		</view>
    <!-- 数据列表 -->
    <view class="room-list">
      <view class="match" v-if="dataStore.searchList">
				<template v-for="item in dataStore.searchList" :key="item.id">
				  <view>
				    <RoomResource :data="item" @click="handleDetailClick(item.id)"></RoomResource>
				  </view>
				</template>
			</view>
			<view class="no-match" v-else>
				<view>很遗憾，没有搜索到相关房源~~</view>
			</view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { useDataStore } from "@/store/dataStore.js";
import { tokenNavigateTo } from "@/utils/tokenNavigateTo.js";
		
const dataStore = useDataStore();
onLoad(option => {
		dataStore.fetchSearchAnswer(option.content)
})

const handleBack = () => {
  uni.navigateBack();
};

// 处理房源点击事件
const handleDetailClick = (id) => {
	tokenNavigateTo(`/subPackages/order/room-detail/room-detail?id=${id}`, true)
}
</script>

<style scoped lang="scss">
	.room-list {
		margin: 40rpx 20rpx;
		.no-match {
			margin-top: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 600;
			font-size: 40rpx;
			font-family: '本墨绪圆';
			color: #6b4842;
		}
	}
	.skeleton {
		@keyframes skeleton-loading {
		  0% { background-color: #e0e0e0; }
		  100% { background-color: #f5f5f5; }
		}
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
		.image {
			height: 600rpx;
			width: 600rpx;
			border-radius: 20rpx;
			background-color: #ccc;
			animation: skeleton-loading 1.5s infinite alternate;
		}
		.context {
			width: 600rpx;
			.context-item {
				margin-top: 10rpx;
				width: 200rpx;
				height: 40rpx;
				border-radius: 20rpx;
				background-color: #ccc;
				animation: skeleton-loading 1.5s infinite alternate;
			}
		}
	}
</style>
