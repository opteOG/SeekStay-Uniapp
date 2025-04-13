<template>
  <view class="trip">
		<!-- 导航栏 -->
		<uni-nav-bar
			shadow="true"
		  dark
		  :fixed="true"
		  background-color="#c5b6a0"
		  status-bar
		  title="我的行程"
		/>
		<view class="empty" v-if="!tripStore.orderList.length">
			<view class="title">
				尚未预定任何行程！
			</view>
			<view class="content">
				是时候拿出你的行李箱，着手规划下一趟行程了。
			</view>
			<view>
				<button class="btn" type="default" @click="handleEmptyClick">开始探索</button>
			</view>
		</view>
		<view class="trip-list" v-else>
			<template v-for="(item, index) in tripStore.orderList" :key="item.id">
				<view class="trip-item">
					<trip-item @delete="handleTripDelete(index)" :orderData="item" :detailData="tripStore.tripDataList[index]"></trip-item>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup>
import { onShow, onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { useTripStore } from '../../store/tripStore'
import { useUserStore } from '../../store/userStore'
import { computed } from 'vue'
import requestService from '@/service/index.js'

const tripStore = useTripStore()
const userStore = useUserStore()

onPullDownRefresh(() => {
	tripStore.fetchOrderList()
	tripStore.fetchTripDataList()
	setTimeout(() => {
		uni.stopPullDownRefresh()
	}, 1000)
})

onLoad(async () => {
 await tripStore.fetchOrderList()
 await tripStore.fetchTripDataList()
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
	// 获取个人信息
	const res = await userStore.fetchUserData()
	if(res.status === 401 && token) {
		uni.showToast({
			title: '登录已过期，请重新登录',
			icon: 'error'
		})
		uni.redirectTo({
			url: '/subPackages/user/login/login'
		})
	}
})

const handleEmptyClick = () => {
	uni.switchTab({
		url: '/pages/search/search'
	})
}

const handleTripDelete = async (id) => {
	await requestService.delete('/order', {}, {
		orderNumber: tripStore.orderList[id].orderNumber
	})
	tripStore.orderList.splice(id, 1)
	uni.showToast({
		title: '行程删除成功'
	})
}

</script>

<style scoped lang="scss">

.trip {
	padding: 0 20rpx 20rpx;
	.empty {
		margin-top: 100rpx;
		text-align: center;
		.title {
			font-size: 48rpx;
		}
		.content {
			margin-top: 20rpx;
			font-size: 32rpx;
		}
		.btn {
			width: 300rpx;
			height: 80rpx;
			margin-top: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

</style>
