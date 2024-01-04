<template>
	<view
		class="box"
		:style="{ top: top + 'px', left: left + 'px' }"
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
			  stepX: 1,
			  stepY: 1,
			  timer: null,
			  maxTop: 0,
			  maxLeft: 0,
			  top: 0,
			  left: 0,
			}
		},
		mounted() {
			this.init()
		},
		beforeDestroy() {
			// dom 销毁前清除定时器
			clearInterval(this.timer)
		},
		  methods: {
		    init() {
		      this.maxTop = document.documentElement.clientHeight - 90
		      this.maxLeft = document.documentElement.clientWidth - 65
		      this.top = 0
		      this.left = 0
		      clearInterval(this.timer)
		      this.timer = setInterval(() => {
		        this.move()
		      }, 20)
		    },
		 
		    // 移动函数
		 
		    move() {
		      if (this.top >= this.maxTop || this.top < 0) {
		        this.stepY = -this.stepY
		      }
		      if (this.left >= this.maxLeft || this.left < 0) {
		        this.stepX = -this.stepX
		      }
		      this.top += this.stepY
		      this.left += this.stepX
		    },
		}
	}
</script>

<style lang="scss" scoped>
.box {
  background: #6e86f2;
  width: 65px;
  height: 90px;
  position: fixed;
  text-align: left;
  top: 0;
  left: 0;
}

.ad {
	width: 100%;
	height: 100%;
}
</style>