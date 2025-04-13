<template>
	<view class="phone-register">
		<!-- 导航栏 -->
		<uni-nav-bar
		  dark
		  :fixed="true"
		  shadow
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="输入验证码"
		  @clickLeft="handleBack"
		/>
		<view class="content">
			<text class="text">验证码：</text>
			<input style="flex: 1;" type="number" v-model="code" placeholder="请输入验证码" focus=true />
			<button @click="handleSend" style="flex: 0.6;" type="default" size="mini" plain='true' :disabled="isDisabled">重新发送{{countdown}}</button>
		</view>
		<view class=remind>
			功能暂未实现请直接下一步
		</view>
		<button class="btn" @click="handleNext" style="backgroundColor: #7f6147; color: white; border-radius: 40rpx; margin: 50rpx;">下一步</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onReady } from "@dcloudio/uni-app";
import { tokenNavigateTo } from '@/utils/tokenNavigateTo.js';

const phoneNumber = ref() // 电话号码
const verifyCode = ref() // 验证码
const countdown = ref(60) // 重新发送倒计时
const isDisabled = ref(false) //是否禁用按钮

onLoad((option) => {
	phoneNumber.value = option.phoneNumber
})

onReady(() => {
	sendCode()
})

const handleBack = () => {
  uni.navigateBack();
};
// 处理下一步
const handleNext = () => {
	tokenNavigateTo('/subPackages/user/set-user/set-user')
}
// 处理发送事件
const handleSend = () => {
	sendCode()
}
// 发送验证码
const sendCode = () => {
	isDisabled.value = true
	let timer = setInterval(() => {
		countdown.value--
	}, 1000)
	setTimeout(() => {
		clearInterval(timer)
		countdown.value = 60
		isDisabled.value = false
	}, 60000)
}

</script>

<style scoped lang="scss">

.content {
	margin-top: 100rpx;
	padding: 40rpx;
	border-bottom: 1px solid rgba(1, 1, 1, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
	.text {
		flex: 0.5;
		margin-right: 10rpx;
		font-weight: 500;
		font-size: 30rpx;
	}
	
}
.remind {
	font-size: 12rpx;
	margin-top: 10rpx;
	display: flex;
	justify-content: center;
}
.btn {
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
