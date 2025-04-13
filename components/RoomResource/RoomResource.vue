<template>
	<view class="room-resource" @click="handleClick">
		<swiper class="swiper" :indicator-dots="true" :autoplay="false">
			<template v-for="item in data.imgUrl">
				<swiper-item>
					<image class="image" :src="item" mode="scaleToFill"></image>
				</swiper-item>
			</template>
		</swiper>
		<view class="context">
			<view class="title">
				<view class="location">{{ data.location }}</view>
				<uni-rate readonly="true" :value="data.score" active-color="#c56729" size="20"></uni-rate>
			</view>
			<view class="desc">{{ data.description }}</view>
			<view class="openTime">{{ data.openTime }}</view>
			<view class="price">{{ data.price + '￥' }}</view>
		</view>
	</view>
</template>

<script setup>
	
defineProps({
	data: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(['navigate'])

const handleClick = () => {
	emit('navigate')
}

</script>

<style lang="scss">
.room-resource {
	height: 840rpx;
	z-index: 9;
	.swiper {
		height: 600rpx;
		text-align: center;
		.image {
			height: 600rpx;
			width: 600rpx;
			border-radius: 20rpx;
		}
	}
	
	.context {
		margin: 10rpx 56rpx;
		.title {
			display: flex;
			justify-content: space-between;
		}
		.price {
			font-weight: 600;
		}
	}
}
</style>
