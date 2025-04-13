<template>
	<view class="confirm-pay">
		<!-- 头部导航 -->
		<uni-nav-bar
		  dark
		  :fixed="true"
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="确认支付"
		  @clickLeft="handleBack"
		/>
		<!-- 支付方式 -->
		<view class="pay-way">
			<radio-group @change="changePayWay">
				<view class="pay-item">
					<image src="https://img.picgo.net/2025/02/13/wechat-paybea6b0df48d1ac15.png" mode="scaleToFill"></image>
					<view class="text">
						微信支付
						<view class="reconmannd">推荐微信用户使用</view>
					</view>
					<label class="radio">
						<radio value="wechat"/>
					</label>
				</view>
				<view class="pay-item">
					<image src="https://img.picgo.net/2025/02/13/ali-payeb759f8997ced4a4.png" mode="scaleToFill"></image>
					<view class="text">
						支付宝支付
						<view class="reconmannd">推荐支付宝用户使用</view>
					</view>
					<label class="radio">
						<radio value="ali" />
					</label>
				</view>
			</radio-group>
		</view>
		<!-- 底部框 -->
		<view class="bottom-bar">
			<view class="text">
				合计：
				<text style="color: #9bc4d1; font-size: 36rpx;">{{ formatPrice(orderStore.orderMessage.totalPrice, 2) }} ￥</text>
			</view>
			<view class="">
				<button class="pay-btn" type="default" @click="handlePayClick">支付</button>
			</view>
		</view>
	</view>
	
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app'
import { useOrderStore } from '@/store/orderStore.js';
import { formatPrice } from '@/utils/formatPrice.js';
import requestService from '@/service/index.js'

const orderStore = useOrderStore()
let payway = ''


onShow(() => {
	uni.hideLoading()
	if(!orderStore.orderMessage?.orderNumber) {
		uni.showToast({
			title: '请重新进入页面',
			icon: 'error'
		})
	}
})


const handleBack = () => {
	uni.navigateBack()
}

// 切换支付方式
const changePayWay = (e) => {
	payway = e.detail.value
}

// 出来支付点击事件
const handlePayClick = async () => {
	if(!payway) {
		return uni.showToast({
			title: '请先选择支付方式',
			icon: 'error'
		})
	}
	uni.showLoading({
		mask: true,
		title: "支付中"
	})
	const res = await requestService.patch('/order/paid', {}, {
		orderNumber: orderStore.orderMessage.orderNumber
	})
	setTimeout(() => {
		uni.hideLoading()
		if(res.status !== 201) {
			return uni.showToast({
				title: '支付失败，请重试',
				icon: 'error'
			})
		}
		uni.showToast({
			title: '支付成功'
		})
		uni.switchTab({
			url: '/pages/trip/trip'
		})
	}, 2000)
}

</script>

<style scoped lang="scss">
.confirm-pay {
	position: relative;
	.pay-item {
		padding: 20rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		align-items: center;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		image {
			width: 70rpx;
			height: 70rpx;
		}
		.reconmannd {
			font-size: 24rpx;
			color: #bdbdbd;
		}
		.radio {
			margin-left: 100rpx;
		}
	}
	.bottom-bar {
		position: fixed;
		bottom: 10rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.text {
			font-size: 32rpx;
			font-weight: 600;
			margin-left: 20rpx;
		}
		.pay-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 64rpx;
			width: 180rpx;
			margin-right: 20rpx;
			font-size: 32rpx;
			background-color: #007aff;
			color: #fff;
		}
	}
}


</style>
