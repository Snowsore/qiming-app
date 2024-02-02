<template>
	<FtBackground>
		<FtScroll>
			<view>
				<p style="font-size: 30rpx; line-height: 48rpx">熊小姐 女</p>
				<view style="font-size: 24rpx; line-height: 36rpx">
					<p>公(阳)历 1995年7月1日 5时</p>
					<p>八字：乙亥 壬午 癸已 乙卯</p>
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
					<p style="font-size: 30rpx; line-height: 48rpx">熊小姐 女</p>
					<view style="font-size: 24rpx; line-height: 36rpx">
						<p>公(阳)历 1995年7月1日 5时</p>
						<p>八字：乙亥 壬午 癸已 乙卯</p>
						<p>特点：草泽东方之次 辰逢壬戌癸亥即龙归大海格</p>
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
import { ref } from 'vue';

import FtBackground from '../../components/ft/FtBackground.vue';
import FtScroll from '../../components/ft/FtScroll.vue';
import FtPaymentSub from '../../components/ft/FtPaymentSub.vue';
import FtSubDivider from '../../components/ft/FtSubDivider.vue';
import FtPaymentSelect from '../../components/ft/FtPaymentSelect.vue';
import FtPriceTag from '../../components/ft/FtPriceTag.vue';
import FtTimer from '../../components/ft/FtTimer.vue';
import FtButton from '../../components/ft/FtButton.vue';
import FtPaymentConfirmPopup from '../../components/ft/FtPaymentConfirmPopup.vue';

const confirmPopup = ref(null);

const handleContinue = () => {
	console.log('con');
};

const handleComplete = () => {
	confirmPopup.value.close();
	uni.navigateTo({
		url: `/pages/fortune/fortune-result`
	});
};

const method = ref('wechat');
const handlePay = () => {
	confirmPopup.value.open();
};
</script>

<style></style>
