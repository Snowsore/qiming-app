<template>
	<view>
		<view class="ft-payment-sub-divider" />
		<view class="ft-payment-sub-content">
			<slot />
		</view>
	</view>
</template>

<script setup></script>

<style>
.ft-payment-sub-divider {
	width: 750rpx;
	height: 97rpx;
	background-image: url('../../static/ft-payment-divider.png');
	background-size: cover;
	background-repeat: no-repeat;
}

.ft-payment-sub-content {
	padding: 40rpx;
	background-color: #ffefd7;
}
</style>
