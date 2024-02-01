<template>
	<view class="ft-info-text">
		<view class="ft-info-text-title">{{ props.title }}</view>
		<view class="ft-info-text-content"><slot /></view>
	</view>
</template>

<script setup>
const props = defineProps(['title']);
</script>

<style>
.ft-info-text {
	margin: 30rpx;
	color: #ffe9c9;
}

.ft-info-text-title {
	font-size: 30rpx;
	line-height: 48rpx;
}

.ft-info-text-content {
	font-size: 24rpx;
	line-height: 36rpx;
}
</style>
