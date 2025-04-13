<template>
	<view class="edit-message">
		<!-- 导航栏 -->
		<uni-nav-bar
		  dark
		  :fixed="true"
		  shadow
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="编辑个人信息"
		  @clickLeft="handleBack"
		/>
		<view class="content">
			<uni-forms ref="form" :rules="formRules" :modelValue="formData">
				<uni-forms-item label="电话" name="phoneNumber">
					<uni-easyinput type="number" v-model="formData.phoneNumber"/>
				</uni-forms-item>
				<uni-forms-item label="邮箱" name="email">
					<uni-easyinput type="text" v-model="formData.email"/>
				</uni-forms-item>
				<uni-forms-item label="个人介绍" name="introduce">
					<uni-easyinput type="textarea" v-model="formData.introduce"/>
				</uni-forms-item>
				<button class="form-btn" type="default" @click="handleSubmit">提交</button>
			</uni-forms>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/userStore.js';

const form = ref()
const formRules = {
	introduce: {
		rules: [
			{
				maxLength: 40,
				errorMessage: '简介长度不超过40字'
			}
		]
	},
	phoneNumber: {
		rules: [
			{
				validateFunction: function (rule,value,data,callback) {
					console.log(value);
				  const reg = /^1[3-9]\d{9}$/;
				  if (!reg.test(value)) {
						callback('电话格式不正确，请重新输入')
				    return false;
				  }
				  return true;
				}
			}
		]
	},
	email: {
		rules: [
			{
				validateFunction: function (rule,value,data,callback) {
					console.log(value);
				  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				  if (!reg.test(value)) {
						callback('邮箱格式不正确，请重新输入')
				    return false;
				  }
				  return true;
				}
			}
		]
	}
}
const userStore = useUserStore()

const formData = reactive({
	phoneNumber: userStore.phoneNumber,
	email: userStore.email,
	introduce: userStore.introduce
})

// 处理提交事件
const handleSubmit = () => {
	form.value.validate().then(res => {
		userStore.updateUserData(formData)
		uni.showToast({
			title: '修改信息成功'
		})
		uni.navigateBack()
	}).catch(err => {
		console.log(err);
	})
}

const handleBack = () => {
	uni.navigateBack()
}

</script>

<style scoped lang="scss">
	
.edit-message {
	height: 100vh;
	padding: 0 40rpx;
	background: linear-gradient(to right, #c5b6a0, #fde9cf, #c5b6a0);
	font-family: '本墨绪圆';
	.content {
		margin-top: 50rpx;
		.form-btn {
			margin-top: 300rpx;
			border-radius: 100rpx;
			background-color: #afa18f;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
	       
</style>
