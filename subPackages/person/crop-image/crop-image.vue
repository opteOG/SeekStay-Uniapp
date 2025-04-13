<template>
	<view class="crop-image">
		<uni-nav-bar
		  dark
		  :fixed="true"
		  shadow
		  background-color="#c5b6a0"
		  status-bar
		  left-icon="left"
		  left-text="返回"
		  title="头像上传"
		  @clickLeft="handleBack"
		/>
		<qf-image-cropper :width="450" :height="450" :radius="360" @crop="handleCrop"></qf-image-cropper>
	</view>
</template>

<script setup>
import { useUserStore } from '@/store/userStore.js'

const userStore = useUserStore()

// 头像上传
const handleCrop = (e) => {
	userStore.upLoadAvatar(e.tempFilePath)
	uni.previewImage({
		urls: [e.tempFilePath],
		indicator: "none",
	});
}

const handleBack = () => {
	uni.reLaunch({
		url: '/pages/profile/profile'
	})
}

</script>

<style scoped lang="scss">
	
</style>