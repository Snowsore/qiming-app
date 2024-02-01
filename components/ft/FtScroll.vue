<template>
	<view class="ft-scroll">
		<slot />
	</view>
</template>

<script setup></script>

<style>
.ft-scroll {
	height: 300rpx;
	background-image: url('../../static/ft-scroll.png');
	background-size: cover;
	background-repeat: no-repeat;

	box-sizing: border-box;

	padding: 55rpx 85rpx;

	color: #3c2d24;
}
</style>
