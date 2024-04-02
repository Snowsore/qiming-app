<template>
	<view class="ft-homepage">
		<view class="ft-homepage-label-input-form">
			<FtHomepageLabel type="name" v-model="fullName" />
			<FtHomepageLabel type="gender" v-model="gender" />
			<FtHomepageLabel type="birthdate" v-model="birthdate" />
		</view>
		<view class="ft-start-button" @click="handleSubmit" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import FtHomepageLabel from '../../components/ft/FtHomepageLabel.vue';
import qingnangAPI from '../../utils/qingnangAPI.js';

const fullName = ref('');
const gender = ref('Male');
const birthdate = ref('');
const knowsExactTime = ref('');

const handleSubmit = async () => {
	try {
		const res = await qingnangAPI.createFortuneOrder({
			fullName: fullName.value,
			gender: gender.value,
			birthdate: birthdate.value,
			knowsExactTime: false
		});

		const { orderId } = res;

		uni.navigateTo({
			url: `/pages/fortune/fortune-payment?orderId=${orderId}`
		});
	} catch (err) {
		alert('订单错误');
		console.log(err);
	}
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
	position: absolute;
	top: 700rpx;
	left: 40rpx;
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
