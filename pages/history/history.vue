<template>
  <view class="history">
		<view class="header">
			<view class="title">心愿单</view>
			<view class="edit" @click="handleEdit">编辑</view>
		</view>
		<view class="collect-list">
			<template v-for="item in historyRooms" :key="item?.id">
				<view class="room-content" @click="handleDetailClick(item?.id)">
					<image @click="handleDelete(item?.id)" v-show="showDelete" class="delete" src="@/static/img/delete.png" mode="scaleToFill"></image>
					<image class="room-cover" :src="item?.imgUrl[0]" mode="scaleToFill"></image>
					<view class="room-title">{{ item?.location }}</view>
					<view class="collect-time">时间：{{ item?.collectionTime }}</view>
				</view>
			</template>
		</view>
		<view class="bottom">暂无更多收藏记录~</view>
	</view>
</template>

<script setup>
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import requestService from '../../service/index.js'
import { ref } from 'vue';
import { tokenNavigateTo } from '../../utils/tokenNavigateTo.js';

const historyRooms = ref()
const showDelete = ref(false)

onPullDownRefresh(() => {
	setTimeout(() => {
		uni.stopPullDownRefresh()
	}, 1000)
})

onShow(async () => {
	const token = uni.getStorageSync('user_token')
	if(!token) {
		uni.showToast({
			title: "请登录后查看",
			icon: 'error'
		})
		uni.redirectTo({
			url: '/subPackages/user/login/login'
		})
	}
	const res = await requestService.get('/collect', {}, {})
	if(res.status === 401 && token) {
		uni.showToast({
			title: '登录已过期，请重新登录',
			icon: 'error'
		})
		uni.redirectTo({
			url: '/subPackages/user/login/login'
		})
	}
	historyRooms.value = res.data.list
})
// 处理编辑事件
const handleEdit = () => {
	showDelete.value = !showDelete.value
}
// 处理详情跳转事件
const handleDetailClick = (id) => {
	if(!showDelete.value) {
		tokenNavigateTo(`/subPackages/order/room-detail/room-detail?id=${id}`, true)
	}
}
// 处理删除收藏事件
const handleDelete = (id) => {
	requestService.delete('/collect', {}, {listId: id})
	historyRooms.value = historyRooms.value.filter(item => item.id !== id)
}

</script>

<style scoped lang="scss">
	.history {
		padding: 40rpx;
		.header {
			display: flex;
			margin-bottom: 80rpx;
			justify-content: space-between;
			.title {
				font-size: 64rpx;
				font-weight: 400;
			}
			.edit {
				align-self: flex-end;
				border-bottom: 1rpx solid black;
				cursor: pointer;
				&:hover {
					color: #636363;
				}
			}
		}
		.collect-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 10rpx;
			row-gap: 20rpx;
			justify-content: center;
			
			.room-content {
				cursor: pointer;
				position: relative;
				transition: all 1s ease-out;
				.delete {
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					top: 10rpx;
					left: 10rpx;
					z-index: 1;
				}
				.room-cover {
					width: 40vw;
					height: 40vw;
					border-radius: 20rpx;
				}
				.room-title {
					font-size: 32rpx;
				}
				.collect-time {
					font-size: 12rpx;
					color: #989898;
				}
				}
			}
			.bottom {
				margin-top: 40rpx;
				text-align: center;
				color: #636363;
			}
		}
</style>
