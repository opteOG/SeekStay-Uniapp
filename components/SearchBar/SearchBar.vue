<template>
	<view class="searchBar">
		<input 
			class="search"
			v-model="content"
			type="text"
			auto-blur=true
			@focus="handleFocus"
			@blur="handleBlur"
			@confirm="handleSearch"
		>
		<view class="placeHolder" v-show="showPH">
			<uni-icons type="search"></uni-icons>
			开始搜索
		</view>
	</view>
</template>

<script>
import { tokenNavigateTo } from '../../utils/tokenNavigateTo';


	export default {
		name:"SearchBar",
		data() {
			return {
				content: "",
				showPH: true, // 显示占位文字
			};
		},
		methods: {
			// 处理搜索请求
			handleSearch() {
				tokenNavigateTo(`/subPackages/search/search-answer/search-answer?content=${this.content}`, true)
			},
			handleFocus() {
				this.showPH = false
			},
			handleBlur() {
				this.showPH = true
				this.content = ""
			}
		},
		
	}
</script>

<style scoped lang="scss">

.searchBar {
	height: 80upx;
	margin: 10px 40px ;
	position: relative;
	display: flex;
	align-items: center;
	border-radius: 30px;
	padding: 10px 10px;
	background-color: $uni-bg-color-grey;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1), 0 12px 24px rgba(0, 0, 0, 0.1);
	.search {
		height: 40upx;
		color: $uni-color-primary;
		margin: 0 10px;
		background-color: $uni-bg-color-grey;
	}
	.placeHolder {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 40%;
		font-size: 13px;
		text-align: center;
	}
}

</style>