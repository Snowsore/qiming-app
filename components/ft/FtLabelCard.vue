<template>
	<view class="ft-label-card-container">
		<view class="ft-label-card">
			<view class="ft-label-card-title" :style="titleStyle">
				{{ props.title }}
			</view>
			<view class="ft-label-card-divider" />
			<view class="ft-label-card-content">
				<slot />
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps(['title', 'color']);

const titleStyle = `color: ${props.color}`;
</script>

<style scoped>
.ft-label-card-container {
	margin: 15rpx 0;
	background-color: #ffe1b5;
	border-radius: 5rpx;
	padding: 7rpx;

	box-shadow: 0 6rpx 12rpx -3rpx #0005;
}

.ft-label-card {
	border: 2rpx solid #ecc488;

	border-radius: 5rpx;

	padding: 0 30rpx;
	font-size: 30rpx;

	color: #3c2d24;

	display: flex;
	align-items: center;
}

.ft-label-card-title {
	white-space: nowrap;
	font-size: 36rpx;
}

.ft-label-card-divider {
	margin: 3rpx 13rpx;
	width: 12rpx;
	height: 66rpx;
	background-image: url('../../static/ft-label-card-divider.png');
	background-size: cover;
	background-repeat: no-repeat;
}

.ft-label-card-content {
	font-size: 30rpx;
	color: #4a272a;
}
</style>
