<template>
	<view>
		<view v-if="wuxing === '金'" class="wuxing jin">
			<image src="../../static/jin.png" mode="widthFix"></image>
			<view>金</view>
		</view>
		<view v-if="wuxing === '木'" class="wuxing mu">
			<image src="../../static/mu.png" mode="widthFix"></image>
			<view>木</view>
		</view>
		<view v-if="wuxing === '水'" class="wuxing shui">
			<image src="../../static/shui.png" mode="widthFix"></image>
			<view>水</view>
		</view>
		<view v-if="wuxing === '火'" class="wuxing huo">
			<image src="../../static/huo.png" mode="widthFix"></image>
			<view>火</view>
		</view>
		<view v-if="wuxing === '土'" class="wuxing tu">
			<image src="../../static/tu.png" mode="widthFix"></image>
			<view>土</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"qm-wuxing",
		props: ['wuxing'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.wuxing {
	display: flex;
	align-items: center;
	image {
		margin-right: 6rpx;
	}
	view {
		font-size: 18rpx;
		font-family: "NotoSansHans";
	}
}
.jin {
	color: #e7ad0f;
	image {
		width: 24rpx;
	}
}
.mu {
	color: #32b55a;
	image {
		width: 24rpx;
	}
}
.shui {
	color: #1dc2f1;
	image {
		width: 22rpx;
	}
}
.huo {
	color: #ea3f4a;
	image {
		width: 22rpx;
	}
}
.tu {
	color: #593624;
	image {
		width: 26rpx;
	}
}
</style>