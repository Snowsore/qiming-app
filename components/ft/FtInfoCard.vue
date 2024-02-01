<template>
	<view class="FtInfoCard">
		<view class="FtInfoCardTitle">{{ props.title }}</view>
		<view class="FtInfoCardDivider" />
		<view class="FtInfoCardContent">
			<slot />
		</view>
	</view>
</template>

<script setup>
const props = defineProps(['title']);
</script>

<style>
.FtInfoCard {
	margin: 70rpx 15rpx 40rpx 15rpx;
	background-color: #ffe1b5;
	border-radius: 12rpx;
}

.FtInfoCardTitle {
	transform: translateY(-33rpx);
	margin: 0 auto;
	width: 565rpx;
	height: 66rpx;
	background-image: url('../../static/ft-info-card-title.png');
	background-size: cover;
	background-repeat: no-repeat;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 30rpx;
	letter-spacing: 20rpx;
	color: #ffe1b5;
}

.FtInfoCardDivider {
	transform: translateY(-25rpx);
	width: 305rpx;
	height: 13rpx;
	margin: 0 auto;
	background-image: url('../../static/ft-info-card-divider.png');
	background-size: cover;
	background-repeat: no-repeat;
}

.FtInfoCardContent {
	padding: 0 30rpx 30rpx 30rpx;
	font-size: 22rpx;
	line-height: 30rpx;
	color: #4a272a;
}
</style>