<template>
	<view class="body">
		<!-- <image class="full-width" mode="widthFix" src="../../static/result-page.png" /> -->
		{{ fateData }}
	</view>
</template>

<script>
export default {
	data() {
		return {
			fateData: ''
		};
	},
	onLoad(option) {
		this.updateData();
	},
	methods: {
		async updateData() {
			const { serviceId } = this.options;

			const res = await uni.request({
				url: `/service/fortune_service/${serviceId}`
			});

			if (res.statusCode >= 300) return;

			const { data } = res;

			this.fateData = data;
		}
	}
};
</script>

<style lang="scss" scoped>
.full-width {
	width: 100vw;
}
</style>
