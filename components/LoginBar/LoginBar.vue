<template>
	<view class="login-bar">
		<view class="login-other">
			<image class="login-item" src="https://img.picgo.net/2025/02/13/QQc0a6565d49111f5b.png" mode="scaleToFill"></image>
			<view class="text">QQ登录</view>
		</view>
		<view class="login-other">
			<image class="login-item" src="https://img.picgo.net/2025/02/13/weibo9660b2a3e646619a.png" mode="scaleToFill"></image>
			<view class="text">微博登录</view>
		</view>
		<view class="login-other">
			<image class="login-item" src="https://img.picgo.net/2025/02/13/wechatefe102185734cf79.png" mode="scaleToFill"></image>
			<view class="text">微信登录</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style scoped lang="scss">

.login-bar {
	display: flex;
	justify-content: space-evenly;
		
	.login-other {
		display: flex;
		flex-direction: column;
		align-items: center;
		.login-item {
			height: 100rpx;
			width: 100rpx;
		}
		.text {
			color: #515151;
		}
	}
}

</style>