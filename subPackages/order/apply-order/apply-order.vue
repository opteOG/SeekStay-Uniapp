<template>
	<view class="apply-order"> 
		<!-- 导航栏 -->
		<uni-nav-bar
		  dark
		  :fixed="true"
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="预定申请"
		  @clickLeft="handleBack"
		/>
		<!-- 头部信息 -->
		<view class="header bar">
			<view class="part1">
				<image class="img" :src="roomData.imgUrl[0]" mode="scaleToFill"></image>
				<view class="text">
					<view class="part1-title">{{ roomData.location }}</view>
					<view class="desc">{{ roomData.description }}</view>
					<view class="score">
						<uni-rate value="1" max="1" active-color="#000" readonly="true"></uni-rate>
						<text>{{ roomData.score }} 超赞房东√</text>
					</view>
				</view>
			</view>
			<view class="part2">
				<view class="text">24小时内可免费取消订单。请注意！！！订单支付后，无法取消订单。</view>
				<image src="/static/img/calender.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 行程信息 -->
		<view class="trip-message bar">
			<view class="title">您的行程</view>
			<view class="date">
				<view class="part">
					<view class="tag">日期</view>
					<view class="content">{{ formatDate(orderStore.startTime) }}至{{ formatDate(orderStore.endTime) }}</view>
				</view>
				<view class="part">
					<view class="tag">房客</view>
					<view class="content">一位房客</view>
				</view>
			</view>
		</view>
		<!-- 价格详情 -->
		<view class="price-detail bar">
			<view class="title">价格详情</view>
					<view class="item">
						<view class="key">￥{{ formatPrice(roomData.price) }} × {{ orderStore.totalDays }}晚</view>
						<view class="value">共计：￥{{ formatPrice(homeTotalPrice) }}</view>
					</view>
					<view class="item">
						<view class="key">寻栖服务费</view>
						<view class="value">共计：￥{{ formatPrice(servicePrice) }}</view>
					</view>
					<view class="item">
						<view class="key">税费</view>
						<view class="value">共计：￥{{ formatPrice(taxPrice) }}</view>
					</view>
					<view class="item end">
						<view class="key">总计</view>
						<view class="value">￥{{ formatPrice(totalPrice) }}</view>
					</view>
		</view>
		<!-- 基本规则 -->
		<view class="base-rule bar">
			<view class="title">基本规则</view>
			<view class="desc">请每位房客留意遵守几个简单要求，做一名优秀的房⁠客。</view>
			<view class="list">
				<view class="item">· 遵守入住须知</view>
				<view class="item">. 像对待自己的家一样对待房东的房源</view>
			</view>
		</view>
		<!-- 确认订单 -->
		<view class="confirm-order bar">
			<view class="remind">点击下方按钮即代表您同意房东的入住须知、房客基本规则、
寻栖重新预订和退款政策，且如果我对损坏负有责任，寻栖可以从我的付款方式中扣款。</view>
			<view>
				<button class="order-btn" type="default" @click="handleOrderClick">确认订单</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useOrderStore } from '@/store/orderStore.js';
import { onLoad } from '@dcloudio/uni-app'
import { formatDate } from '@/utils/formatDate.js';
import { formatPrice } from '@/utils/formatPrice.js'
import requestService from '@/service/index.js'

const orderStore = useOrderStore()
const roomData = ref()
// 租房总价
const homeTotalPrice = computed(() => {
	return roomData.value.price * orderStore.totalDays
})
// 服务费
const servicePrice = computed(() => {
	return homeTotalPrice.value * 0.05
})
// 税费 
const taxPrice = computed(() => {
	return homeTotalPrice.value * 0.06
})
// 总价
const totalPrice = computed(() => {
	return homeTotalPrice.value + servicePrice.value + taxPrice.value
})

onLoad(() => {
	roomData.value = orderStore.roomData
})

const handleBack = () => {
	uni.navigateBack()
}
// 出来订单确定点击
const handleOrderClick = async () => {
	uni.showLoading({
		title: '生成订单中',
		mask: true
	})
	const res = await requestService.post('/order', {}, {
		totalPrice: totalPrice.value,
		startDate: orderStore.startTime,
		endDate: orderStore.endTime,
		totalRestNight: orderStore.totalDays,
		listId: orderStore.roomData.id
	})
	orderStore.orderMessage = res.order
	uni.navigateTo({
		url: `/subPackages/order/confirm-pay/confirm-pay?`
	})
	
}
	
</script>

<style scoped lang="scss">

.apply-order {
	.bar {
		padding: 40rpx;
	}
	
	.header {
		.part1 {
			display: flex;
			height: 150rpx;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
			.img {
				height: 150rpx;
				width: 150rpx;
				border-radius: 20rpx;
				margin-right: 40rpx;
			}
			.text {
				.part1-title {
					font-size: 36rpx;
					font-weight: 600;
				}
				.desc {
					margin: 10rpx 0;
					font-size: 12rpx
				}
				.score {
					margin-top: 10rpx;
					display: flex;
					align-items: center;
					font-size: 24rpx;
				}
			}
		}
		.part2 {
			display: flex;
			padding: 40rpx 0;
			.text {
				font-size: 32rpx;
				flex: 1;
				margin-right: 40rpx;
			}
			image {
				height: 100rpx;
				width: 100rpx;
			}
		}
	}
	.trip-message {
		border-top: 15rpx solid rgba(0, 0, 0, 0.1);
		border-bottom: 15rpx solid rgba(0, 0, 0, 0.1);
		.title {
			font-size: 48rpx;
			font-weight: 600;
		}
		.date {
			.part {
				margin-top: 40rpx;
				.tag {
					margin-bottom: 10rpx;
					font-size: 36rpx;
				}
			}
		}
	}
	.price-detail {
		border-bottom: 15rpx solid rgba(0, 0, 0, 0.1);
		.title {
			font-size: 48rpx;
			font-weight: 600;
		}
		.item {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			.key {
				font-weight: 400;
			}
			.value {
				font-weight: 500;
			}
		}
		.end {
			padding: 20rpx 0;
			border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		}
	}
	.base-rule {
		border-bottom: 15rpx solid rgba(0, 0, 0, 0.1);
		.title {
			font-size: 48rpx;
			font-weight: 600;
		}
		.desc {
			margin-top: 20rpx;
		}
		.list {
			margin-top: 20rpx;
			.item {
				margin-top: 10rpx;
			}
		}
	}
	.confirm-order {
		.remind {
			font-size: 12rpx;
		}
		.order-btn {
			margin-top: 40rpx;
			background-color: #da0b64;
			color: white;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

</style>
