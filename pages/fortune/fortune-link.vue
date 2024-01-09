<template>
	<view class="body">
		<image class="full-width" mode="widthFix" src="../../static/payment-successful.png"></image>
		<image @click="redirect" class="full-width" mode="widthFix" src="../../static/view-report.png"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(option) {},
	methods: {
		redirect() {
			uni.navigateTo({
				url: `/pages/fortune/fortune-result?serviceId=1`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.full-width {
	width: 100vw;
}
</style>
