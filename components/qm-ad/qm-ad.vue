<template>
	<view
		class="box"
	>
		<image class="ad" src="../../static/ad.png" ></image>
	</view>
</template>

<script>
	export default {
		name:"qm-ad",
		data() {
			return {
			  show: true,
			}
		},
		 
	}
</script>

<style lang="scss" scoped>
.box {
  background: #ffffff;
  width: 52px;
  height: 72px;
  position: fixed;
  text-align: left;
  right: 26rpx;
  top: 60%;
}

.ad {
	width: 100%;
	height: 100%;
}
</style>