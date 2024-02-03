<template>
	<view class="ft-homepage">
		<qm-datepicker></qm-datepicker>
		<view class="ft-homepage-label-input-form">
			<FtHomepageLabel type="name" v-model="name" />
			<FtHomepageLabel type="gender" v-model="gender" />
			<FtHomepageLabel type="birthdate" v-model="birthdate" />
		</view>
		<view class="ft-start-button" @click="handleSubmit" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import FtHomepageLabel from '../../components/ft/FtHomepageLabel.vue';

const name = ref('');
const gender = ref('男');
const birthdate = ref('');

const handleSubmit = () => {
	uni.navigateTo({
		url: `/pages/fortune/fortune-payment`
	});
};
</script>

<style scoped>
.ft-homepage {
	width: 750rpx;
	height: 4935rpx;
	background-image: url('../../static/ft-homepage.png');
	background-repeat: no-repeat;
	background-size: contain;
}

.ft-homepage-label-input-form {
	margin: 640rpx 40rpx;
	display: grid;
	gap: 45rpx;
}

.ft-start-button {
	position: absolute;
	top: 1150rpx;
	left: 50%;
	width: 700rpx;
	height: 120rpx;
	background-image: url('../../static/ft-start-button.png');
	background-repeat: no-repeat;
	background-size: contain;
	animation: 0.8s ease-in-out infinite alternate breath;
}

@keyframes breath {
	from {
		transform: translateX(-50%) scale(1.05);
	}
	to {
		transform: translateX(-50%) scale(0.95);
	}
}
</style>
