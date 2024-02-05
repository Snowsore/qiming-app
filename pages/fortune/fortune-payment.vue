<template>
	<FtBackground>
		<FtScroll>
			<view>
				<p style="font-size: 30rpx; line-height: 48rpx">{{ fullName }} {{ gender }}</p>
				<view style="font-size: 24rpx; line-height: 36rpx">
					<p>{{ formatBirthdate }}</p>
					<p>八字：{{ bazi }}</p>
					<p>特点：草泽东方之次 辰逢壬戌癸亥即龙归大海格</p>
				</view>
			</view>
		</FtScroll>
		<image src="../../static/ft-p-1.png" style="width: 750rpx; height: 616rpx" />
		<FtPaymentSub>
			<view style="display: flex">
				<view>
					<image src="../../static/ft-master.png" style="width: 238rpx; height: 238rpx" />
				</view>
				<view style="padding: 20rpx 4rpx">
					<p style="font-size: 30rpx; line-height: 48rpx">算命老师</p>
					<view style="font-size: 24rpx; line-height: 36rpx">
						<p>资深算命大师</p>
					</view>
				</view>
			</view>
			<FtSubDivider />
			<view style="display: flex; align-items: center; justify-content: space-between">
				<view><FtPriceTag price="38" oprice="118" /></view>
				<view><FtTimer /></view>
			</view>
			<FtSubDivider />
			<FtPaymentSelect v-model="method" />
			<FtButton @click="handlePay">立即解锁内容</FtButton>
		</FtPaymentSub>
		<FtPaymentConfirmPopup ref="confirmPopup" @continue="handleContinue" @complete="handleComplete" />
	</FtBackground>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';

import FtBackground from '../../components/ft/FtBackground.vue';
import FtScroll from '../../components/ft/FtScroll.vue';
import FtPaymentSub from '../../components/ft/FtPaymentSub.vue';
import FtSubDivider from '../../components/ft/FtSubDivider.vue';
import FtPaymentSelect from '../../components/ft/FtPaymentSelect.vue';
import FtPriceTag from '../../components/ft/FtPriceTag.vue';
import FtTimer from '../../components/ft/FtTimer.vue';
import FtButton from '../../components/ft/FtButton.vue';
import FtPaymentConfirmPopup from '../../components/ft/FtPaymentConfirmPopup.vue';

import { mobileWxPay } from '../../pay.js';
import { apiFortune, apiPayment } from '../../api/qingnang.js';
import calendarConverter from '../../utils/calendarConverter.js';

const props = defineProps(['orderId']);
const confirmPopup = ref(null);
const fullName = ref('');
const gender = ref('');
const birthdate = ref('');
const bazi = ref('');

const method = ref('wechat');

const paymentInfo = ref('');
const paymentChecking = ref(false);

const updateData = async () => {
	const res = await apiFortune.getOrder(props.orderId);
	const { FortuneService: fs } = res;
	fullName.value = fs.fullName;
	gender.value = fs.gender == 'Male' ? '男' : '女';
	birthdate.value = fs.birthdate;
	bazi.value = fs.data.info1.bazi;
};

const formatBirthdate = computed(() => {
	const calendar = calendarConverter.create(new Date(birthdate.value));
	return calendar.solarString;
});

watchEffect(() => {
	updateData();
});

const handleContinue = async () => {
	await apiPayment.request(paymentInfo.value);
};

const handleComplete = async () => {
	if (paymentChecking.value) return;
	paymentChecking.value = true;

	const res = await apiPayment.check(paymentInfo.value);
	if (res.result.status == 1) {
		confirmPopup.value.close();

		uni.navigateTo({
			url: `/pages/fortune/fortune-result`
		});
	}

	paymentChecking.value = false;
};

const handlePay = async () => {
	paymentInfo.value = await apiPayment.create('1749983144897007618');
	await apiPayment.request(paymentInfo.value);

	confirmPopup.value.open();
};
</script>

<style></style>
