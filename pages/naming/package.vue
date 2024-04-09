<template>
	<view class="body">
		<image class="banner" mode="widthFix" src="../../static/banner2.png"></image>
		
		<view class="packages">
			<view @click="handleSelect(item)" v-for="(item, index) in packages" :class="['package', selectedPackage && selectedPackage.packageId === item.packageId? 'selected' : 'unselected']">
				<view>
					<view class="price">
						<view class="discount">特惠价：{{ item.discountedPrice }}元</view>
						<view class="regular">原价：{{ item.regularPrice }}元</view>
					</view>
					<view class="desc">
						{{ item.name }}：{{ item.description }}
					</view>
				</view>
			</view>
		</view>
		
		<image class="divider" mode="widthFix" src="../../static/divider.png"></image>
		
		<view class="pay" v-if="selectedPackage">
			<view class="title">请选择支付方式</view>
			<view class="subtitle">支付金额：<text class="price">{{ selectedPackage.lastPrice }}元</text><text v-show="paidAmount > 0">（您已支付 {{paidAmount}} 元）</text> </view>
			
			<view class="pay-btn wx" @click="handleWXPay">
				<image src="../../static/wx.png"></image>点此微信支付
			</view>
			<!-- <view class="pay-btn zfb">
				<image src="../../static/zfb.png"></image>点此支付宝支付
			</view> -->
		</view>
		
		<view class="notice">
			<image mode="widthFix" src="../../static/notice.png"></image>
			<view>支付系统经过安全联盟和可信网站认证，请放心使用</view>
		</view>
		
	</view>
	
</template>

<script>
import { SkuList } from '../../constants.js';
import { mobileWxPay } from '../../pay.js';
import { helaPay } from '../../hela_api/constant.js'

	
	export default {
		data() {
			return {
				orderId: null,
				paidAmount: 0,
				packages: [],
				selectedPackage: null,
			};
		},
		onLoad(option) {
			this.fetchPackages(option.orderId)
			this.orderId = option.orderId
		},
		methods: {
			async fetchPackages(orderId) {
				uni.showLoading({
					mask: true
				})
				
				// const skus = await helaPay.requestAllSkuList()
				// console.log(skus)
			
				
				const paidResult = await uni.request({
					url: `/api/package_options/${orderId}`,
					method: 'GET'
				})
				
				uni.hideLoading()

				const packages = paidResult.data.includedIn.map(item => {
					return {
						...item,
						lastPrice: Number(item.discountedPrice) - (Number(paidResult.data.paidAmount) || 0)
					}
				})
				
				this.packages = packages
				this.paidAmount = paidResult.data.paidAmount
				this.selectedPackage = packages[0]
				
			},
			handleSelect(pack) {
				this.selectedPackage = pack
			},
			async handleWXPay() {
				// const sku = SkuList.find(item => {
				// 	return item.paidAmount === this.paidAmount && item.price === this.selectedPackage.lastPrice
				// })
				// console.log(sku)
				uni.showLoading({})
				
				const result = await uni.request({
					url: '/api/payment/wechat_h5',
					method: 'POST',
					data: {
						orderId: this.orderId,
						packageId: this.selectedPackage.packageId,
						method: "WeChat"
					}
				})
				
				uni.hideLoading()
				
				if (result.data && result.data.h5_url) {
					window.location.href = result.data.h5_url
				}
				
			},
		},
	}
</script>

<style lang="scss" scoped>
.body {
	background-color: #eeeeee;
	min-height: 100vh;
}
	
.banner {
	width: 100vw;
}

.packages {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	
	.package {
		width: 650rpx;
		display: flex;
		align-items: center;
		margin-top: 25rpx;
		border-width: 1px;
		border-style: solid;
		border-radius: 10rpx;
		
		height: 150rpx;
		padding: 0 25rpx;

		
		.price {
			display: flex;
			.discount {
				  font-size: 36rpx;
				  font-family: "PingFang";
				  color: rgb(218, 41, 44);
				  font-weight: bold;
			}
			.regular {
				  font-size: 24rpx;
				  font-family: "PingFang";
				  color: rgba(87, 87, 87, 0.671);
				  font-weight: bold;
				  text-decoration: line-through;
				  line-height: 2.5;
				  margin-left: 10rpx;
			}

		}
		.desc {
			  font-size: 26rpx;
			  font-family: "PingFang";
			  color: rgb(36, 36, 36);
			  font-weight: bold;
		}
	}
}

.selected {
	background-image: -moz-linear-gradient( 90deg, rgb(252,234,172) 0%, rgb(254,245,210) 100%);
	background-image: -webkit-linear-gradient( 90deg, rgb(252,234,172) 0%, rgb(254,245,210) 100%);
	background-image: -ms-linear-gradient( 90deg, rgb(252,234,172) 0%, rgb(254,245,210) 100%);
	background-color: rgb(254,245,210);
	// background:-moz-linear-gradient( 90deg, rgb(252,234,172) 0%, rgb(254,245,210) 100%);/*Mozilla*/
	// background:-webkit-linear-gradient(90deg, rgb(252,234,172) 0%, rgb(254,245,210) 100%);/*new gradient for Webkit*/
	// background:-o-linear-gradient( 90deg, rgb(252,234,172) 0%, rgb(254,245,210) 100%);/*Opera11*/
	
	border-color: #e4c29f;
}
.unselected {
	background-color: #ffffff;
	border-color: rgb(210, 210, 210);
}
.divider {
	width: 700rpx;
	margin-left: 25rpx;
	margin-top: 30rpx;
}
.pay {
	padding: 25rpx 35rpx;
	color: rgb(88, 88, 88);
	font-size: 24rpx;
	font-weight: bold;
	
	.title {
		font-size: 36rpx;
		font-family: "PingFang";
		color: rgb(36, 36, 36);
	}
	
	.subtitle {
		margin: 8rpx;
		margin-bottom: 16rpx;
	}
	.price {
		font-size: 36rpx;
		font-family: "PingFang";
		color: rgb(218, 41, 44);
		font-weight: bold;
		
	}
	.pay-btn {
		font-size: 36rpx;
		font-family: "PingFang";
		color: rgb(255, 255, 255);
		 border-radius: 10px;
		 width: 444rpx;
		 height: 96rpx;
		 display:flex;
		 align-items: center;
		 padding-left: 100rpx;
		 margin-bottom: 30rpx;
	}
	
	.wx {
		background-color: rgb(50, 181, 90);
		image {
			width: 62rpx;
			height: 62rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}
	.zfb {
		background-color: rgb(0, 169, 242);
		image {
			width: 72rpx;
			height: 72rpx;
			margin-right: 10rpx;
		}
	}
}
.notice {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 100rpx;
	// position: absolute;
	// width: 100vw;
	// bottom: 10rpx;
	
	view {
		  font-size: 20rpx;
		  font-family: "PingFang";
		  color: rgb(25, 170, 15);
		  font-weight: bold;
		  margin-top: 10rpx;
	}
	
}

</style>
