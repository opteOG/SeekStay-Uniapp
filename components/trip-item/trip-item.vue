<template>
	<view class="trip-item">
		<uni-card :title="detailData?.location" :sub-title="detailData?.description" :extra="orderStatus" padding="10px 0" >
			<image style="width: 100%;" :src="detailData?.imgUrl[0]"></image>
			<view class="time">
				<uni-dateformat :date="orderData?.startDate" format='yyyy-MM-dd'/>
				<text>——</text>
				<uni-dateformat :date="orderData?.endDate" format='yyyy-MM-dd'/>
			</view>
			<view class="last-day">{{ lastDay }}</view>
			<view class="price">共计：{{ formatPrice(orderData?.totalPrice, 2, '￥') }}</view>
			<view class="cancel">
				<button class="cancel-btn" type="default" @click="handleCancelTrip">取消行程</button>
			</view>
		</uni-card>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate } from '@/utils/formatDate.js'
import { formatPrice } from '@/utils/formatPrice.js'

const orderStatus = computed(() => {
	switch(props.orderData.status) {
		case 'pending'  : return '待支付'
		case 'paid'     : return '已支付'
		case 'ing'      : return '进行中'
		case 'completed': return '已完成'
		case 'concelled': return '已取消'
	}
})

const lastDay = computed(() => {
	const startDay = new Date(props.orderData.startDate)
	const today = new Date()
	const endDay = new Date(props.orderData.endDate)
	const diffTime1 = startDay - today;
	const diffTime2 = endDay - today
	const ans = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24))
	if(diffTime1 > 0) {
		return `距离行程开始还有${ans}天`
	}
	if(diffTime1<=0 && diffTime2>=0) {
		return '行程进行中'
	}
	if(diffTime2 <=0 ) {
		return '行程已结束'
	}
})

const emit = defineEmits(['delete'])

const props = defineProps({
	orderData: {
		type: Object
	},
	detailData: {
		type: Object
	}
})

const handleCancelTrip = async () => {
	if(orderStatus.value === '已支付') {
		return uni.showToast({
			title: '当前行程已支付，无法取消',
			icon: 'error'
		})
	}
	if(orderStatus.value === '进行中') {
		return uni.showToast({
			title: '当前行程进行中，无法取消',
			icon: 'error'
		})
	}
	
	emit('delete')

}


</script>

<style scoped lang="scss">

.trip-item {
	.header {
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
	}
	.time {
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx;
		margin-top: 40rpx;
		font-size: 40rpx;
		font-weight: 600;
	}
	.last-day {
		text-align: center;
		font-size: 36rpx;
		font-weight: 540;
		margin-top: 20rpx;
	}
	.price {
		display: flex;
		justify-content: flex-end;
		margin-top: 40rpx;
	}
	.cancel {
		width: 30%;
		.cancel-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60rpx;
			background-color: #da0b64;
			color: #ffffff;
			font-size: 24rpx;
		}
	}
}

</style>