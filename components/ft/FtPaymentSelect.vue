<template>
	<view>
		<view class="ft-payment-select-row" @click="() => emit('update:modelValue', 'wechat')">
			<view class="wechatpay-with-icon" />
			<view class="ft-payment-select-radio-container"><FtPaymentSelectRadio :checked="props.modelValue == 'wechat'" /></view>
		</view>
		<view class="ft-payment-select-row" @click="() => emit('update:modelValue', 'alipay')">
			<view class="alipay-with-icon" />
			<view class="ft-payment-select-radio-container"><FtPaymentSelectRadio :checked="props.modelValue == 'alipay'" /></view>
		</view>
	</view>
</template>

<script setup>
import FtPaymentSelectRadio from './FtPaymentSelectRadio.vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
</script>

<style>
.ft-payment-select-row {
	margin: 40rpx 0;
	display: flex;
	justify-content: space-between;
}

.wechatpay-with-icon {
	width: 184rpx;
	height: 50rpx;
	background-image: url('../../static/wechatpay-with-icon.png');
	background-size: cover;
	background-repeat: no-repeat;
}

.alipay-with-icon {
	width: 214rpx;
	height: 50rpx;
	background-image: url('../../static/alipay-with-icon.png');
	background-size: cover;
	background-repeat: no-repeat;
}
</style>
