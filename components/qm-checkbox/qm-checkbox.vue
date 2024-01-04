<template>
	<view class="checkbox">
		<image class="checked" @click="handleClick(false)" v-if="checked" src="../../static/qm-check.svg" />
		<image class="unchecked" @click="handleClick(true)" v-if="!checked" src="../../static/qm-uncheck.svg" />
	</view>
</template>

<script>
	export default {
		name:"qm-checkbox",
		props: ['checked'],
		data() {
			return {
				
			};
		},
		methods: {
			handleClick(checked) {
				this.$emit('update:checked', checked)
			}
		}
	}
</script>

<style scoped lang="scss">
.checkbox {
	margin-right: 4rpx;
	.checked {
		width: 33rpx;
		height: 30rpx;
	}
	.unchecked {
		width: 28rpx;
		height: 30rpx;
	}
}
</style>