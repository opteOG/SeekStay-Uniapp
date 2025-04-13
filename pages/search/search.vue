<template>
  <!-- 自定义标题导航 -->
  <view class="custom-nav-bar">
    <uni-nav-bar
      backgroundColor="#c5b6a0"
      :border="false"
      :fixed="true"
      status-bar
      title="寻栖"
      color="#625b50"
      style="font-weight: 600; height: 100rpx;"
      :right-icon="rightIcon"
      @clickRight="handleSearchClick"
    >
      <template v-slot:left>
        <image src="https://img.picgo.net/2025/02/13/seekstayb3a7c86cda0409f8.png"
				 mode="aspectFit"></image>
      </template>
    </uni-nav-bar>
  </view>
  <!-- 搜索框 -->
  <view class="search-bar" v-if="showSearchBar">
    <uni-transition mode-class="slide-top" show="true">
      <SearchBar></SearchBar>
    </uni-transition>
  </view>
  <!-- 标签导航 -->
  <view class="tag-bar">
    <TagBar></TagBar>
  </view>
	<!-- 骨架屏 -->
	<view v-if="!dataStore.dataList.length" style="padding-bottom: 100rpx;">
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
	<VirtualList v-else :list="dataStore.dataList" :itemHeight="420" :contentHeight="contentHeight">
		<template v-slot="slotProps">
			<RoomResource :data="slotProps.item" @navigate="handleItemClick(slotProps.item.id)"></RoomResource>
		</template>
	</VirtualList>
</template>

<script setup>
import { computed, ref } from "vue";
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { useDataStore } from "../../store/dataStore.js";
import { tokenNavigateTo } from '../../utils/tokenNavigateTo.js'
const rightIcon = ref();
const showSearchBar = ref(true);
const dataStore = useDataStore();
dataStore.fetchDataList(1);
dataStore.fetchTagList();
const systemInfo = uni.getSystemInfoSync();
const contentHeight = computed(() => {
	return systemInfo.windowHeight - 150
})

onLoad(async () => {
	uni.startPullDownRefresh()
	setTimeout(() => {
	    uni.stopPullDownRefresh();
	  }, 1000);
});
// 监听下拉刷新函数
onPullDownRefresh(() => {
	setTimeout(() => {
		uni.stopPullDownRefresh();
	}, 1000);
})

// 除微信小程序端外添加标题导航栏的搜索图标
// #ifndef MP-WEIXIN
rightIcon.value = "search";
showSearchBar.value = false;

// #endif
// 显示搜索框
const handleSearchClick = () => {
  showSearchBar.value = !showSearchBar.value;
};

// 处理房源点击事件
const handleItemClick = (id) => {
	tokenNavigateTo(`/subPackages/order/room-detail/room-detail?id=${id}`, true)
}

</script>

<style scoped lang="scss">
.room-list {
	padding-top: 20rpx;
	box-sizing: border-box;
}
.tag-bar {
	height: 100rpx;
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
