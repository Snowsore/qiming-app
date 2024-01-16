<template>
	<view class="wrapper" v-if="getAttribute(attribute)">
		<view class="content">
			<view class="label">{{ getAttribute(attribute).label }}</view>
			<view class="score">{{ score }}分</view>
		</view>
		<view class="bar">
			<view class="percentage" :style="{ width: score + '%', backgroundColor: getAttribute(attribute).color }"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"qm-score",
		props: ['score', 'attribute'],
		data() {
			return {
				
			};
		},
		methods: {
			getAttribute(attribute) {
				if (attribute === 'chinese_fate_wuxing') {
					return {
						label: '八字五行',
						color: '#79d12b'
					}
				} else if (attribute === 'hearing') {
					return {
						label: '好听顺口',
						color: '#80c993'
					}
				} else if (attribute === 'distinct') {
					return {
						label: '特别',
						color: '#87c4d0'
					}
				} else if (attribute === 'chinese_culture') {
					return {
						label: '文化寓意',
						color: '#9caee4'
					}
				} else if (attribute === 'chinese_fate_wuge') {
					return {
						label: '五格数理',
						color: '#dc9cdf'
					}
				} else if(attribute === 'writing') {
					return {
						label: '简单易写',
						color: '#f6abbe'
					}
				}
				return null
			}
		}
	}
</script>

<style scoped>
	
.wrapper {
	width: 186rpx;
	margin-top: 20rpx;
}	
.bar {
	width: 186rpx;
	heigh: 14rpx;
	background-color: #d7d7d7;
	border-radius: 14rpx;
	overflow: hidden;
	.percentage {
		height: 14rpx;
		border-radius: 14rpx;
	}
}

.label {
	font-size: 24rpx;
	font-family: "PingFang";
	color: rgb(111, 111, 111);
}

.content {
	display: flex;
	justify-content: space-between;
	.score {
		font-size: 24rpx;
		font-family: "PingFang";
		color: rgb(55, 55, 55);
	}
}
</style>