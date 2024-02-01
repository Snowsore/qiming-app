<template>
	<view class="content">
		<image class="banner" src="/static/preview-bg.png" mode="widthFix"></image>
		<view class="form">
			<view class="form-input" v-if="data">
				<view class="main">
					<view class="name">
						<view class="real">{{ data.name }}</view>
						<view class="icon">
							<view v-for="(item, index) in data.name_info" class="wuxing">
								<qm-wuxing :wuxing="item.wuxing"></qm-wuxing>
							</view>
						</view>
					</view>
					<view class="scores">
						<view class="score">{{ data.score }}
						<text>分</text></view>
						<view class="desc">综合得分</view>
					</view>
				</view>
				
				<image class="divider" mode="widthFix" src="../../static/divider.png"></image>
				
				<view class="detail">
					<qm-score v-for="(item, index) in data.attribute_info" :score="item.score" :attribute="item.attribute"></qm-score>
				</view>
				
				<image class="divider" mode="widthFix" src="../../static/divider.png"></image>
				
				<view>
					<image @click="jumpPackage" src="../../static/name_coupon.png" class="coupon"></image>
					<view class="countdown">
						<uv-count-down :time="12 * 60 * 60 * 1000" format="HH：mm：ss" autoStart></uv-count-down>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<image src="../../static/check200.png" mode="widthFix" class="check200" @click="jumpPackage"></image>

		<view class="intro">
			<!-- <image src="../../static/name_basic.png" mode="widthFix"></image> -->
			<view class="form">
				<view><text class="label">姓氏：</text><text class="cont">{{namingSubmit.lastName}}</text></view>
				<view><text class="label">性别：</text><text class="cont">{{namingSubmit.gender}}</text></view>
				<view><text class="label">出生时间：</text><text class="cont">{{namingSubmit.birthdate}}</text></view>
				<view v-if="namingSubmit.seniority"><text class="label">辈分：</text><text class="cont">{{namingSubmit.seniority}}</text></view>
			</view>
		</view>
		
		<view class="info">
			<view>关注二维码查看更多测字服务，以及查询支付订单</view>
			<image src="../../static/qrcode.jpg" mode="widthFix"></image>
		</view>

		

		<qm-ad></qm-ad>
	</view>
</template>

<script>
import qmRadio from '../../components/qm-radio/qm-radio.vue';
import qmCheckbox from '../../components/qm-checkbox/qm-checkbox.vue';
import qmInput from '../../components/qm-input/qm-input.vue';
import qmDatepicker from '@/components/qm-datepicker/qm-datepicker.vue';
import qmAd from '../../components/qm-ad/qm-ad.vue';

import { GenderType } from '../../constants.js';

export default {
	data() {
		return {
			GenderType,
			agreeTerm: true,

			gender: 'Male',
			lastName: '',
			seniority: '',
			birthdate: null,
			knowsExactTime: false,

			showBtn: false,
			isShowCalendar: true,
			
			data: undefined,
			orderId: undefined,
			namingSubmit: {}
		};
	},
	onLoad(options) {
		this.orderId = options.orderId
		this.fetchData(options.orderId)
	},
	components: {
		qmRadio,
		qmCheckbox,
		qmInput,
		qmDatepicker,
		qmAd
	},
	methods: {
		async fetchData(orderId) {
			uni.showLoading({
				mask: true
			})
			
			const storage = await uni.getStorage({
				key: 'naming_submit'
			})
			this.namingSubmit = storage.data
			
			console.log(this.namingSubmit)
			
			setTimeout(async () => {
				const result = await uni.request({
					url: `/order/${orderId}/service_preview`,
					method: 'GET'
				})
				this.data = result.data
				uni.hideLoading()
			}, 1000)
			
			
		},
		jumpPackage() {
			uni.navigateTo({
				url: `/pages/naming/package?orderId=${this.orderId}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #eeeeee;
	min-height: 100vh;
}

.banner {
	width: 750rpx;
}

.divider {
	width: 628rpx;
	margin-left: 15rpx;
	margin-top: 10rpx;
}

.check200 {
	padding: 0 16rpx;
	margin-top: 16rpx;
	width: 718rpx;
}

.form {
	padding: 0 16rpx;
	margin-top: 16rpx;

	.title {
		width: 100%;
		margin-bottom: -46rpx;
	}

	.form-input {
		font-size: 32rpx;
		color: rgb(39, 39, 39);
		background-image: url('../../static/main-bg1.svg');
		background-repeat: no-repeat;
		background-size: contain;
		height: 700rpx;
		padding: 36rpx 30rpx 0 30rpx;
		
		.coupon {
			width: 680rpx;
		}
		.countdown {
			position: relative;
			// left: 470rpx;
			text-align: right;
			margin-right: 88rpx;
			bottom: 250rpx;
		}
		.detail {
			display: flex;
			flex-wrap: wrap; 
			align-content: flex-start;
			justify-content: space-evenly;
			margin-bottom: 16rpx;
		}

		.main {
			display: flex;
			justify-content: space-between;
			margin-left: 24rpx;
			.name {
				.real {
					font-size: 60rpx;
					font-family: "PingFang";
					color: rgb(39, 39, 39);
					letter-spacing: 40rpx;
					font-weight: bold;
				}
				.icon {
					display: flex;
					.wuxing {
						margin-left: 6rpx;
						min-width: 94rpx;
					}
				}
			}
			.scores {
				margin-right: 20rpx;
				.score {
					font-size: 60rpx;
					font-family: "PingFang";
					color: rgb(208, 38, 42);
					font-weight: bold;
					text {
						font-size: 30rpx;
						font-weight: normal;
					}
				}
				.desc {
					position: relative;
					left: 6rpx;
					font-size: 18rpx;
					font-family: "PingFang";
					color: rgb(96, 96, 96);
				}
			}
			
			
		}
	}
	.submit-btn {
		display: flex;
		justify-content: center;
		margin-right: 30rpx;
		.qiming-btn {
			margin-top: 40rpx;
			// position: relative;
			// right: 32rpx;
			width: 580rpx;
			animation: breath 1.8s ease-in-out infinite;
		}
	}
	
	.hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 18rpx;
		font-family: 'NotoSansHans';
		color: rgb(128, 128, 128);
		view {
			display: flex;
			align-items: center;
			margin-bottom: 6rpx;
		}
	}
}

.intro {
	display: flex;
	flex-direction: column;
	margin: 0 20rpx;
	width: 100%;
	height: 335rpx;
	
	background-image: url('../../static/name_basic.png');
	background-repeat: no-repeat;
	background-size: contain;
	
	.form {
		margin-top: 88rpx;
		margin-left: 32rpx;
		
		view {
			margin-top: 12rpx;
			font-size: 26rpx;
			font-family: "PingFang";
			color: rgb(96, 96, 96);

			.cont {
				color: rgb(39, 39, 39);
			}
		}
	}
	// image {
	// 	width: 100%;
	// 	margin-bottom: 20rpx;
	// }
}

.info {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 100rpx;
	
	
	
	image {
		width: 200rpx;
		margin-top: 30rpx;
	}
	view {
		margin-top: 30rpx;
		font-size: 24rpx;
		font-family: "NotoSansHans";
		color: rgb(36, 36, 36);
	}
}

.text-area {
	display: flex;
	justify-content: center;
}

.btn-c {
	padding: 12rpx;
	background-color: #ea3f4a;
	position: fixed;
	bottom: 0;
	width: 730rpx;

	.bottom-btn {
		display: flex;
		justify-content: center;
		font-size: 40rpx;
		font-family: 'PingFang';
		color: rgb(255, 244, 219);
		font-weight: bold;
		line-height: 1.5;
		padding: 10rpx 0;
		background-color: #ea3f4a;
		// width: 100%;
		border: 1px solid #ebaa96;
	}
}

@keyframes breath {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(0.9);
	}
	100% {
		transform: scale(1);
	}
}
</style>
