<template>
	<view class="ft-circle-icon">
		<view class="ft-circle-icon-text">
			<slot />
		</view>
	</view>
</template>

<script></script>

<style>
.ft-circle-icon {
	display: inline-block;

	width: 150rpx;
	height: 150rpx;

	display: grid;
	place-content: center;

	font-size: 48rpx;
	color: #bc0c17;

	background-image: url('../../static/ft-circle-icon.png');
	background-size: cover;
	background-repeat: no-repeat;
}

.ft-circle-icon-text {
	transform: translate(4rpx, -2rpx);
}
</style>
