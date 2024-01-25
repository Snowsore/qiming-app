<template>
	<view class="ft-background">
		<slot />
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped>
.ft-background {
	min-height: 100vh;
	background-color: #ea3f4a;
	background-image: url('../../static/ft-background.png');
	background-repeat: no-repeat;
	background-size: contain;
}
</style>
