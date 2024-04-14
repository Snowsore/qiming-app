<template>
	<view class="body">
		<image class="banner" mode="widthFix" src="../../static/link-bg.png"></image>
		
		<view class="container">
			
			<view class="title">
				<view>如何查看取名报告？</view>
			</view>
			
			<view class="subtitle">
				<view>第</view><view class="number">1</view>步：添加手机号，绑定支付订单
			</view>
			
			<view class="phone" v-if="!submitted">
				<input type="number" placeholder="请输入手机号" v-model="val"/>
				<button @click="handleConfirm" >确定</button>
			</view>
			
			<view class="phone" v-if="submitted">
				<view class="hint">您本次绑定号码为：{{val}}</view>
				<image mode="widthFix" src="../../static/link-success.png"></image>
			</view>
			
			
			<view class="next"><image  mode="widthFix" src="../../static/next.png"/></view>
			
			<view class="subtitle">
				第<view class="number">2</view>步：扫码关注公众号
			</view>
			
			<image class="qrcode" src="../../static/qrcode.jpg"></image>
			
			<view class="next"><image  mode="widthFix" src="../../static/next.png"/></view>
			
			<view class="subtitle">
				第<view class="number">3</view>步：在公众号输入手机号查询订单
			</view>
			
		</view>
	</view>
</template>

<script>
import qingnangAPI from '../../utils/qingnangAPI';
	export default {
		data() {
			return {
				val: '',
				orderId: '',
				submitted: false
			};
		},
		onLoad(option) {
			this.orderId = option.orderId
		},
		methods: {
			handleConfirm() {
				const reg = /^[1][0-9]{10}$/;
				if (reg.test(this.val)) {
					this.submit()
				} else {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}
			},
			async submit() {
				uni.showLoading()
				
				const result = await qingnangAPI.linkUser({
					orderId: this.orderId,
					phoneNumber: this.val
				})
				
				this.submitted = true
				uni.hideLoading()
				
			}
		}
	}
</script>

<style lang="scss">
.body {
	.banner {
		width: 100vw;
	}
	
	.container {
		position: absolute;
		top: 200px;
		width: 100vw;
		
		.title {
			display: flex;
			justify-content: center;
			font-size: 18px;
			color: rgb(39, 39, 39);
			font-weight: bold;
			margin-bottom: 12px;
			
		}
		
		.phone {
			display: flex;
			align-items: flex-end;
			margin-top: 10px;
			
			input {
				border-style: solid;
				border-width: 1px;
				border-color: rgb(136, 136, 136);
				border-radius: 6px;
				width: 220px;
				height: 50px;
				padding-left: 10px;
				margin-left: 40px;
				margin-top: 4px;
			}
			
			button {
				background-color: #32b55a;
				color: white;
				width: 70px;
				height: 52px;
				padding-top: 2px;
				margin-left: 8px;
			}
			
			image {
				width: 74px;
				margin-left: 6px;
				margin-bottom: 3px;
			}
			
			.hint {
				margin-left: 40px;
				font-size: 14px;
				font-weight: 500;
				color: rgb(98, 89, 89);
			}
		}
		
		.qrcode {
			width: 200px;
			height: 200px;
			padding-left: 26px;
		}
		
		.next {
			display: flex;
			justify-content: center;
			margin: 6px 0;
			image {
				width: 40px;
			}
		}
		
		.subtitle {
			display: flex;
			flex-direction: row;
			font-size: 14px;
			color: rgb(39, 39, 39);
			align-items: baseline;
			font-weight: 500;
			padding-left: 40px;
			
			.number{
				margin: 0 4px;
				font-size: 20px;
				color: #039d03;
				font-weight: bold;
			}
		}
		
	}
}
</style>
