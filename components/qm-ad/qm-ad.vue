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
  background: #6e86f2;
  width: 65px;
  height: 90px;
  position: fixed;
  text-align: left;
  right: 24rpx;
  top: 60%;
}

.ad {
	width: 100%;
	height: 100%;
}
</style>