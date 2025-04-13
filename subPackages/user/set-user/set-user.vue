<template>
	<view class="register">
		<uni-nav-bar
		  :fixed="true"
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="输入个人信息"
		  @clickLeft="handleBack"
		/>
		<view class="form-data">
			<uni-forms ref="formRef" :modelValue="formData">
				<uni-forms-item label="用户名" name="name">
					<uni-easyinput  v-model="formData.name" placeholder="请输入昵称" primaryColor="#c4b8a1"/>
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput type="password"  v-model="formData.password" placeholder="6-16位字符" primaryColor="#c4b8a1" />
				</uni-forms-item>
				<uni-forms-item label="确认密码" name="confirmPassword">
					<uni-easyinput type="password"  v-model="formData.confirmPassword" placeholder="6-16位字符" primaryColor="#c4b8a1" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="handleSubmit" style="backgroundColor: #7f6147; color: white; border-radius: 40rpx; margin-top: 250rpx;">注册</button>
		</view>


			

	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onReady } from "@dcloudio/uni-app";
import requestService from '@/service/index.js'

const formRef = ref()
// 表单数据
const formData = reactive({
	name: '',
	password: '',
	confirmPassword: ''
})
// 校验规则
const rules = {
	name: {
		rules: [
			{
				required: true,
				errorMessage: '请输入手机号或用户名'
			},
			{
				maxLength: 10,
				errorMessage: '用户名长度不能超过10位'
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
	},
	confirmPassword: {
		rules: [
			{
				required: true,
				errorMessage: '请确认密码'
			},
			{
				validateFunction: (rule, value, data, callback) => {
					if(value !== formData.password) {
						callback('两次输入密码不一致，请检查')
					}
					return true
				}
											
			}
		]
	}
}
onReady(() => {
	// 添加校验规则
	formRef.value.setRules(rules)
})

// 处理表单提交事件
const handleSubmit = () => {
	formRef.value.validate().then(res => {
		requestService.post('/register', {},  {
			name: res.name,
			password: res.password
		}).then(res => {
			// 注册成功
			if(res.code !== -1002) {
				// 1.缓存本地token
				uni.setStorageSync(
					'user_token',
					res.data.token
				)
				uni.showToast({
					title: '注册成功'
				})
				// 2.返回登录前跳转页面
				uni.switchTab({
					url: '/pages/search/search'
				})
			} // 注册失败
			else {
				// 提示用户名重复
				rules.name.rules.push({
					validateFunction: (rule, value, data, callback) => {
							callback(res.message)
						return true
					}
				})
				formRef.value.setRules(rules)
				formRef.value.validate()
				rules.name.rules.pop()
			}
		})
	}).catch(err => {
		console.log(err);
	})
}

const handleBack = () => {
	uni.navigateBack()
}

</script>

<style scoped lang="scss">
.register {
	height: 100vh;
	width: 100vw;
	background-color: #c4b8a1;

	.form-data {
		margin: 150rpx 50rpx;
		
	}
	
	.btn{
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}



</style>
