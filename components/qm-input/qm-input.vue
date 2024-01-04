<template>
	<view>
		<input @input="handleInput" :style="`width: ${width}rpx`" :placeholder="placeholder" class="qm-input"/>
	</view>
</template>

<script>
	export default {
		name:"qm-input",
		props: ['value', 'width', 'placeholder'],
		data() {
			return {
				
			};
		},
		methods: {
			handleInput(e) {
				console.log(e, e.detail.value)
				this.$emit('update:value', e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qm-input {
	  border: 1px solid rgb(215, 51, 64);
	  border-radius: 10rpx;
	  height: 60rpx;
	  padding: 0 20rpx;
	}
</style>