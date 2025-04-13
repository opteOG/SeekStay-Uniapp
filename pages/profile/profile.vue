 <template>
  <view class="profile">
		<!-- 导航栏 -->
		<uni-nav-bar
		  dark
		  :fixed="true"
		  shadow
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="个人主页"
		  @clickLeft="handleBack"
		/>
		<view class="avatar">
			<image @click="handleUpload" :src="userStore.avatarUrl" mode="aspectFill" :key="randow"></image>
		</view>
		<view class="name">
			<view class="user-name">{{ userStore.name }}</view>
			<text>用户名</text>
		</view>
		<view class="edit">
			<button class="edit-btn btn" type="default" @click="handleEditClick">编辑个人信息</button>
		</view>
		<view class="user-message">
			<view class="item">
				<view class="item-title">
					<image src="/static/img/userMessage.png" mode="scaleToFill"></image>
					<view class="">个人介绍</view>
				</view>
				<view class="introduce">{{ userStore.introduce }}</view>
			</view>
			<view class="item">
				<view class="item-title">
					<image src="/static/img/phone.png" mode="scaleToFill"></image>
					<view class="">联系电话</view>
				</view>
				<view class="phone">{{ userStore.phoneNumber }}</view>
			</view>
			<view class="item">
				<view class="item-title">
					<image src="/static/img/email.png" mode="scaleToFill"></image>
					<view class="email">邮箱地址</view>
				</view>
				<view>{{ userStore.email }}</view>
			</view>
		</view>
		<view class="logout">
			<button class="logout-btn btn" type="default" @click="handleLogout">退出登录</button>
		</view>
	</view>
</template>

<script setup>
import { onLoad, onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { tokenNavigateTo } from '@/utils/tokenNavigateTo.js'
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore.js'


const userStore = useUserStore()
const randow = ref(Math.random())

onPullDownRefresh(() => {
	randow.value = Math.random()
	setTimeout(() => {
		uni.stopPullDownRefresh()
	}, 1000)
})

onShow(async () => {
	const token = uni.getStorageSync('user_token')
	if(!token) {
		uni.showToast({
			title: "请登录后查看",
			icon: 'error'
		})
		uni.redirectTo({
			url: '/subPackages/user/login/login'
		})
	}
	// 获取个人信息
	const res = await userStore.fetchUserData()
	if(res.status === 401 && token) {
		uni.showToast({
			title: '登录已过期，请重新登录',
			icon: 'error'
		})
		uni.redirectTo({
			url: '/subPackages/user/login/login'
		})
	}
	
	uni.hideTabBar()
})

const handleBack = () => {
	uni.showTabBar()
  uni.switchTab({
  	url: '/pages/search/search'
  })
};

// 处理编辑按钮点击
const handleEditClick = () => {
	uni.navigateTo({
		url: '/subPackages/person/edit-user-message/edit-user-message'
	})
}

// 处理退出登录事件
const handleLogout = () => {
	uni.removeStorageSync('user_token')
	uni.switchTab({
		url: '/pages/search/search'
	})
	uni.showTabBar()
}


// 处理头像上传
const handleUpload = () => {
	uni.navigateTo({
		url: '/subPackages/person/crop-image/crop-image'
	})
}

</script>

<style scoped lang="scss">

.profile {
	height: 100vh;
	background: linear-gradient(to right, #c5b6a0, #fde9cf, #c5b6a0);
	font-family: '本墨绪圆';
	.avatar {
		text-align: center;
		margin-top: 40rpx;
		image {
			height: 400rpx;
			width: 400rpx;
			border-radius: 100%;
			border: 6rpx solid rgba(255, 255, 255, 0.8);
			box-shadow: 0 0 8rpx 8rpx rgba(0, 0, 0, 0.4);
			cursor: pointer;
		}
	}
	.btn {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.name {
		margin-top: 80rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 450;
		color: #9e9182;
		.user-name {
			font-size: 60rpx;
			font-weight: 500;
		}
	}
	.edit {
		margin-top: 40rpx;
		text-align: center;
		.edit-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 600rpx;
			background-color: #ac9e8c;
			border-radius: 50rpx;
			font-size: 32rpx;
			font-weight: 500;
		}
	}
	.user-message {
		margin-top: 80rpx;
		image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 40rpx;
			.item-title {
				display: flex;
				align-items: center;
			}
			.introduce {
				flex: 1;
				margin-left: 20rpx;
				font-size: 24rpx;
			}
		}
		
	}
	.logout {
		margin-top: 40rpx;
		text-align: center;
		.logout-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 600rpx;
			background-color: #ac9e8c;
			border-radius: 50rpx;
			font-size: 32rpx;
			font-weight: 500;
		}
	}
}

</style>
