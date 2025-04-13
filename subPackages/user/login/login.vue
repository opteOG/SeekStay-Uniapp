<template>
	<view class="login">
		<!-- 内容 -->

			<swiper vertical=true style="height: 100vh;">
				<swiper-item>
					<view class="swiper-item">
						<view class="view1">
							<view class="logo">
								<image class="img" src="https://img.picgo.net/2025/02/13/seekstayb3a7c86cda0409f8.png" mode="scaleToFill"></image>
								<h2 class="title">寻栖欢迎您</h2>
							</view>
							<view class="register">
								<button class="btn" @click="handleRegister" style="backgroundColor: #7f6147; color: white; border-radius: 40rpx;">手机号注册</button>
							</view>
							<view class="login-other">
								<view class="other-text">
									<view>或用以下方式登录</view>
								</view>
								<LoginBar></LoginBar>
							</view>
							<view class="go-login">
								<view>已有账号？去登录！</view>
								<uni-icons type="down" color="#515151" size="24"></uni-icons>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="view2">
							<view class="go-login">
								<uni-icons type="up" color="#515151" size="24"></uni-icons>
								<view>没有账号？去注册！</view>
							</view>
							<view class="form-data">
								<uni-forms ref="formRef" :rules="rules" :modelValue="formData">
									<uni-forms-item label="用户名" name="name">
										<uni-easyinput  v-model="formData.name" placeholder="请输入手机号/昵称" primaryColor="#c4b8a1" />
									</uni-forms-item>
									<uni-forms-item label="密码" name="password">
										<uni-easyinput type="password"  v-model="formData.password" placeholder="6-16位字符" primaryColor="#c4b8a1" />
									</uni-forms-item>
								</uni-forms>
								<view class="foget-password">忘记密码？</view>
								<button class="btn" @click="handleSubmit" style="backgroundColor: #7f6147; color: white; border-radius: 40rpx; margin-top: 50rpx;">提交</button>
								<button class="btn" @click="handleReset" style="backgroundColor: #7f6147; color: white; border-radius: 40rpx; margin-top: 50rpx;">重置</button>
							</view>
							<view class="login-other register-other">
								<view class="other-text">
									<view>或用以下方式登录</view>
								</view>
								<LoginBar></LoginBar>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			
			

	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { tokenNavigateTo } from '@/utils/tokenNavigateTo.js';
import requestService from '@/service/index.js'

const formRef = ref()
// 表单数据
const formData = reactive({
	name: '',
	password: ''
})
// 校验规则
const rules = {
	name: {
		rules: [
			{
				required: true,
				errorMessage: '请输入手机号或用户名'
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: '请输入密码'
			},
			{
				minLength: 6,
				maxLength: 16,
				errorMessage: '密码长度在6-16个字符之间'
			}
		]
	}
}
// 处理手机号注册事件
const handleRegister = () => {
	tokenNavigateTo('/subPackages/user/phone-register/phone-register', false)
}

// 处理表单提交事件
const handleSubmit = () => {
	formRef.value.validate().then(res => {
		requestService.post('/login', {}, {
			name: formData.name,
			password: formData.password
		}).then(res => {
			if(res.code === -1003) {
				uni.showToast({
					title: res.message,
					icon: 'error'
				})
			}
			if(res.code === -1004) {
				uni.showToast({
					title: res.message,
					icon: 'error'
				})
			}
			uni.setStorageSync('user_token', res.data.token)
			uni.switchTab({
				url: '/pages/search/search'
			})
			uni.showToast({
				title: '登录成功'
			})
		})
	}).catch(err => {
		console.log(err);
	})
}
// 处理表单重置事件
const handleReset = () => {
	formData.name = ""
	formData.password = ""
	formRef.value.clearValidate()
}

</script>

<style scoped lang="scss">
.login {

	background-color: #c4b8a1;
	.btn {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logo{	
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.img {
			width: 300rpx;
			height: 300rpx;
		}
		.title {
			color: #2d271b;
			font-weight: 700;
			font-size: 48rpx;
			font-family: '宋体';
		}
	}
	.register {
		margin: 280rpx 50rpx 0;
	}
	
	.login-other {
		margin-top: 50rpx;
		.other-text {
			display: flex;
			justify-content: center;
			padding: 50rpx;
			color: #fff;
		}
		.other-text::after {
			flex: 1;
			content: '';
			height: 2rpx;
			margin-top: 20rpx;
			margin-left: 10rpx;
			background-color: #515151;
		}
		.other-text::before {
			flex: 1;
			content: '';
			height: 2rpx;
			margin-top: 20rpx;
			margin-right: 10rpx;
			background-color: #515151;
		}
	}
	.go-login {
		margin-top: 80rpx;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.form-data {
		margin: 150rpx 50rpx;
		
		.foget-password:hover {
			color: #918877;
		}
	}

}



</style>
