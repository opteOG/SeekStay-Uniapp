<template>
	<view class="room-detail">
		<!-- 头部导航 -->
		<uni-nav-bar
		  dark
		  :fixed="true"
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="房屋详情"
		  @clickLeft="handleBack"
		/>
		<!-- 收藏图标 -->
		<view @click="changeCollectState">
			<image class="collect" v-show="!collected" src="@/static/img/collect.png" mode="scaleToFill"></image>
			<image class="collect" v-show="collected" src="@/static/img/collected.png" mode="scaleToFill"></image>
		</view>
		<!-- 轮播区域 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<template v-for="url in data?.imgUrl">
				<swiper-item>
					<image class="image" :src="url" mode="scaleToFill"></image>
				</swiper-item>
			</template>
		</swiper>
		<!-- 内容 -->
		<view class="content">
			<!-- 标题 -->
			<view class="title">
				<view class="location">{{ data?.location }}</view>
				<view class="desc">{{ data?.description }}</view>
			</view>
			<!-- 评分栏 -->
			<view class="score-bar">
				<ScoreBar :score="data?.score"></ScoreBar>
			</view>
			<!-- 房东信息 -->
			<view class="host">
				<image class="host-image" src="/static/img/user-avator.png" mode="scaleToFill"></image>
				<view class="host-message">
					<view class="host-name">房东：XX</view>
					<view class="host-text">超赞房东，7年出租经验</view>
				</view>
			</view>
			<!-- 日期选择 -->
			<view class="date-pick">
				<view class="date-title">请选择订房日期</view>
				<view class="date-desc">请添加日期以查看价格</view>
				<view class="calendar">
					<DatePicker></DatePicker>
				</view>
			</view>
			<!-- 入住须知 -->
			<view class="check-in">
				<view class="block">
					<view class="header">取消政策</view>
					<view class="instructions">
						添加行程日期，查看此次住宿的取消政策详情
					</view>
				</view>
				<view class="block">
					<view class="header">
						入住须知
					</view>
					<view class="instructions">
						<view class="">下午3:00后可入住</view>
						<view class="in-item">上午11:00前退房</view>
						<view class="in-item">最多两位房客</view>
					</view>
				</view>
				<view class="block">
					<view class="header">人生安全与房源</view>
					<view class="instructions">
						<view class="">无门或无门锁的泳池/热水泳池</view>
						<view class="in-item">附近的湖泊、河流、其他水体</view>
						<view class="in-item">已配备一氧化碳报警器</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 底部导航 -->
		<view class="bottom-block">
			<view class="bk">
				<view class="">客服支持</view>
				<view class="">帮助中心</view>
				<view class="">安全问题求助</view>
				<view class="">[四海无忧]</view>
				<view class="">反歧视</view>
				<view class="">残障人士支持</view>
				<view class="">取消预定的选择</view>
				<view class="">举报邻里问题</view>
			</view>
			<view class="bk">
				<view class="">出租房源</view>
				<view class="">新闻</view>
				<view class="">新功能</view>
				<view class="">工作机会</view>
				<view class="">投资者</view>
				<view class="">礼品卡</view>
				<view class="">紧急住宿</view>
			</view>
			<view class="bk">
				<view class="">出租资源</view>
				<view class="">社区论坛</view>
				<view class="">负责人地出租</view>
				<view class="">参加免费的出租相关课程</view>
				<view class="">寻找房屋管家</view>
			</view>
		</view>
		<!-- 预定栏 -->
		<view class="schedule-bar">
			<view class="price-night">
				<view style="font-size: 38rpx;">￥{{data?.price}}/晚</view>
				<view style="font-size: 20rpx;">{{ formatDate(orderStore.startTime)}}至{{ formatDate(orderStore.endTime)}}</view>
			</view>
			<view class="order"> 
				<button class="order-btn" type="default" @click="handleOrder">预定</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useDataStore } from '@/store/dataStore.js';
import { ref } from 'vue';
import { useOrderStore } from '@/store/orderStore.js';
import { formatDate } from '@/utils/formatDate.js';
import requestService from '@/service/index.js'

const data = ref()
const collected = ref(false)
const dataStore = useDataStore()
const orderStore = useOrderStore()

onLoad(async (option) => {
	// 重设orderStore数据
	orderStore.reset()
	// 根据id请求数据
	const res = await requestService.get(`/detail?id=${option.id}`)
	data.value = res.data.listDeatil
	collected.value = res.data.collected
	// 保存房间信息到store
	orderStore.roomData = data.value
})

const handleBack = () => {
	uni.navigateBack()
}

// 切换收藏状态
const changeCollectState = () => {
	collected.value = !collected.value
	if(collected.value) {
		uni.showToast({
			title: '已收藏'
		})
		requestService.post('/collect', {}, {
			listId: data.value.id
		})
	}
	else {
		uni.showToast({
			title: '已取消收藏'
		})
		requestService.delete('/collect', {}, {
			listId: data.value.id
		})
	}
}

// 处理预定点击事件
const handleOrder = () => {
	if(!orderStore.startTime) {
		uni.showToast({
			title: '请先选择订房日期',
			icon: 'error'
		})
		return
	}
	if(!orderStore.endTime && orderStore.startTime) {
		uni.showToast({
			title: '请选择退房日期',
			icon: 'error'
		})
		return
	}
	uni.navigateTo({
		url: '/subPackages/order/apply-order/apply-order'
	})
}

</script>

<style scoped lang="scss">

.room-detail {
	position: relative;
	padding-bottom: 160rpx;
	.collect {
		width: 60rpx;
		height: 60rpx;
		position: fixed;
		right: 6rpx;
		top: 100rpx;
		z-index: 10;
		cursor: pointer;

	}
	.swiper {
		height: 500rpx;
		.image {
			width: 100%;
			height: 600rpx;
		}
	}
	.content {
		margin: 0 50rpx;
		.title {
			margin-top: 50rpx;
			text-align: center;
			.location {
				font-size: 48rpx;
				font-weight: 500;
			}
			.desc {
				margin-top: 10rpx;
			}
		}
		.score-bar {
			margin-top: 40rpx;
		}
		.host {
			display: flex;
			margin-top: 40rpx;
			align-items: center;
			.host-image {
				border: 1rpx solid rgba(0, 0, 0, 0.6);
				width: 90rpx;
				height: 90rpx;
				border-radius: 100%;
			}
			.host-message {
				margin-left: 30rpx;
				.host-name {
					font-size: 36rpx;
					font-weight: 600;
				}
				.host-text {
					font-size: 12rpx;
					color: #8c8c8c;
				}
			}
		}
		.date-pick {
			margin-top: 80rpx;
			.date-title {
				font-size: 48rpx;
				font-weight: 600;
			}
			.date-desc {
				font-size: 32rpx;
				color: #8c8c8c;
			}
		}
		.calendar {
			margin-top: 40rpx;
		}
		.check-in {
			margin-top: 80rpx;
			.block {
				padding: 40rpx;
				border-top: 1rpx solid rgba(0, 0, 0, 0.4);
				.header {
					font-size: 48rpx;
					font-weight: 600;
				}
				.instructions {
					margin-top: 20rpx;
					font-size: 28rpx;
					color: #8c8c8c;
					.in-item {
						margin-top: 10rpx;
					}
				}
			}
		}
	}
	.bottom-block {
		padding: 40rpx;
		background-color: #dddddd;
		.bk {
			padding: 40rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.3);
			font-size: 24rpx;
			font-weight: 400;
			view {
				margin-top: 20rpx;
				cursor: pointer;
				&:hover {
					color: #a1a1a1;
				}
			}
		}
	}
	.schedule-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 160rpx;
		box-sizing: border-box;
		padding: 40rpx;
		text-align: center;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;
		.order-btn {
			background-color: #da0b64;
			color: white;
			width: 200rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			&:active {
				box-shadow: 0 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
			}
		}
	}
}


</style>
