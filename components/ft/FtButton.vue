<template>
	<view class="ft-button" @click="() => emit('click')">
		<slot />
	</view>
</template>

<script setup>
const emit = defineEmits(['click']);
</script>

<style>
.ft-button {
	width: 665rpx;
	height: 92rpx;
	background-image: url('../../static/ft-button.png');
	background-size: cover;
	background-repeat: no-repeat;

	display: grid;
	place-content: center;

	font-size: 36rpx;
	color: #ffe4ba;

	animation: 0.8s ease-in-out infinite alternate breath;
}

@keyframes breath {
	from {
		transform: scale(1.05);
	}
	to {
		transform: scale(0.95);
	}
}
</style>
