<template>
	<view>
		<view class="ft-timer-title">距离结束还有</view>
		<view class="ft-timer">
			<uni-countdown :show-day="false" :hour="20" :minute="20" :second="20" />
		</view>
	</view>
</template>

<script></script>

<style>
.ft-timer-title {
	color: #341d1d;
	font-size: 24rpx;
	margin-bottom: 14rpx;
}

.ft-timer .uni-countdown {
	place-content: flex-end;
}

.ft-timer ::v-deep span {
	font-size: 24rpx;
	color: #da292c;
}
</style>
