<template>
	<uni-popup ref="dialog" type="dialog">
		<view class="ft-payment-confirm-popup">
			<view class="ft-payment-confirm-popup-title">
				<view>请确认支付是否完成</view>
				<view class="ft-payment-confirm-popup-title-tools" @click="handleClose"></view>
			</view>
			<view class="ft-payment-confirm-popup-content">
				<view class="ft-payment-confirm-popup-content-text">
					<p>已支付,点击“我已支付”可查看订单结果</p>
					<p>若未支付，请点击“继续支付”</p>
				</view>
				<view class="ft-payment-confirm-popup-tools">
					<button @click="handleContinue" class="ft-payment-confirm-popup-button ft-payment-confirm-popup-button-red">继续支付</button>
					<button @click="handleComplete" class="ft-payment-confirm-popup-button ft-payment-confirm-popup-button-outline">我已支付</button>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(null);

const open = () => {
	dialog.value.open();
};

const close = () => {
	dialog.value.close();
};

const handleClose = () => {
	dialog.value.close();
};

const handleContinue = () => {
	emit('continue');
};

const handleComplete = () => {
	emit('complete');
};

const emit = defineEmits(['continue', 'complete']);

defineExpose({
	open,
	close
});
</script>

<style>
.ft-payment-confirm-popup {
	width: 650rpx;
	height: 400rpx;
	background-color: white;
	border-radius: 10rpx;
}

.ft-payment-confirm-popup-title {
	height: 90rpx;
	border-bottom: 1rpx solid #e8e8e8;

	font-size: 36rpx;
	letter-spacing: 2rpx;

	color: #272727;

	display: grid;
	place-content: center;
}

.ft-payment-confirm-popup-title-tools {
	width: 32rpx;
	height: 32rpx;
	position: absolute;

	background-image: url('../../static/icon-cancle.png');
	background-repeat: no-repeat;
	background-size: contain;

	right: 20rpx;
	top: 29rpx;
}

.ft-payment-confirm-popup-content {
	font-size: 30rpx;
	line-height: 48rpx;
	padding: 30rpx;
}

.ft-payment-confirm-popup-content-text {
	text-align: center;
	padding: 10rpx 0;
}

.ft-payment-confirm-popup-tools {
	display: flex;
	margin: 30rpx 15rpx;
}

.ft-payment-confirm-popup-button {
	width: 220rpx;
	height: 80rpx;

	font-size: 36rpx;
	display: grid;
	place-content: center;

	padding: 0;
}

.ft-payment-confirm-popup-button-red {
	border: none;
	background-color: #ea3f4a;
	color: #ffffff;
}

.ft-payment-confirm-popup-button-outline {
	border: 3rpx solid #ea3f4a;
	background-color: #ffffff;
	color: #ea3f4a;
}
</style>
