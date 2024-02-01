<template>
	<view class="ft-payment-select-radio">
		<view v-if="props.checked" class="ft-payment-select-radio-checker" />
	</view>
</template>

<script setup>
const props = defineProps(['checked']);
</script>

<style>
.ft-payment-select-radio {
	width: 45rpx;
	height: 45rpx;
	border-radius: 50%;

	box-sizing: border-box;
	border: 1rpx solid #7e6b5a;
	display: grid;
	place-content: center;
}

.ft-payment-select-radio-checker {
	width: 37rpx;
	height: 37rpx;

	border-radius: 50%;
	background-color: #32b55a;
}
</style>
