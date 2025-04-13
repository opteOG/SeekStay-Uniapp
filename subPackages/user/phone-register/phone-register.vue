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
		  title="输入手机号"
		  @clickLeft="handleBack"
		/>
		<view class="content">
			<text class="text">手机号：</text>
			<input type="tel" v-model="phoneNumber" placeholder="请输入11位手机号" focus=true />
		</view>
		<button class="btn" @click="handleNext" style="backgroundColor: #7f6147; color: white; border-radius: 40rpx; margin: 50rpx;">下一步</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { tokenNavigateTo } from '@/utils/tokenNavigateTo.js';


const phoneNumber = ref()
const rule = /^1[3456789]\d{9}$/

const handleBack = () => {
  uni.navigateBack();
};

const handleNext = () => {
	// 如果校验成功
	if(rule.test(phoneNumber.value)) {
		tokenNavigateTo(`/subPackages/user/phone-code/phone-code?phoneNumber=${phoneNumber.value}`, false)
	}
	else {
		uni.showToast({
			title: "请输入正确的手机号",
			icon: 'error'
		})
	}
}

</script>

<style scoped lang="scss">

.content {
	margin-top: 100rpx;
	padding: 40rpx;
	border-bottom: 1px solid rgba(1, 1, 1, 0.2);
	display: flex;
	align-items: center;

	.text {
		margin-right: 20rpx;
		font-weight: 500;
	}
	
}
.btn {
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

</style>
