<template>
	<view class="content">
		<image class="banner" src="/static/banner.png" mode="widthFix"></image>
		<view class="form">
			<image class="title" src="/static/main-title.png" mode="widthFix"></image>
			<view class="form-input">
				<view class="form-item">
					<view class="label">
						中文姓氏
						<text>*</text>
					</view>
					<qm-input placeholder="如张、李" :width="400" :value.sync="lastName"></qm-input>
					<!-- <qm-radio :arr="['不限','男','女']" :value.sync="sex" labelClass="item"></qm-radio> -->
				</view>
				<view class="form-item">
					<view class="label">
						性别
						<text>*</text>
					</view>
					<qm-radio :arr="GenderType" :value.sync="gender"></qm-radio>
				</view>
				<view class="form-item">
					<view class="label">
						出生时辰
						<text>*</text>
					</view>
					<qm-datepicker :value.sync="birthdate" :knowsExactTime.sync="knowsExactTime"></qm-datepicker>
				</view>
				<view class="form-item">
					<view class="label">
						辈分
						<text style="visibility: hidden">*</text>
					</view>
					<qm-input placeholder="如“张小三”是小字辈" :width="400" :value.sync="seniority" />
				</view>
				
				<view class="submit-btn">
					<image @click="submit" class="qiming-btn" src="../../static/qiming-btn.png" mode="widthFix" />
				</view>
				
				<view class="hint">
					<view>测试部分免费，获取报告或解锁全部内容时，需付费查看</view>
					<view>
						<qm-checkbox :checked.sync="agreeTerm"></qm-checkbox>
						同意个人隐私协议
					</view>
				</view>
			</view>
		</view>

		<view class="intro">
			<image src="../../static/intro1.png" mode="widthFix"></image>
			<image src="../../static/intro2.png" mode="widthFix"></image>
		</view>
		<view class="info">
			<image src="../../static/qrcode.jpg" mode="widthFix"></image>
			<view>微信公众号：柠檬来测，扫码关注了解更多详情</view>
		</view>

		<view class="btn-c" @click="submit" v-show="showBtn">
			<view class="bottom-btn">立即取名</view>
		</view>

		<qm-ad></qm-ad>
		
		<view class="safe-area">
			
		</view>
	</view>
</template>

<script>
import qmRadio from '../../components/qm-radio/qm-radio.vue';
import qmCheckbox from '../../components/qm-checkbox/qm-checkbox.vue';
import qmInput from '../../components/qm-input/qm-input.vue';
import qmDatepicker from '@/components/qm-datepicker/qm-datepicker.vue';
import qmAd from '../../components/qm-ad/qm-ad.vue';
import dayjs from 'dayjs'
	
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
			isShowCalendar: true
		};
	},
	onLoad() {
		this.init()
	},
	components: {
		qmRadio,
		qmCheckbox,
		qmInput,
		qmDatepicker,
		qmAd
	},
	methods: {
		init() {
			const that = this;
			window.onscroll = function() {
				let scrollTop = 0
				if (document.documentElement && document.documentElement.scrollTop){
					scrollTop = document.documentElement.scrollTop
				} else if (document.body){
					scrollTop = document.body.scrollTop
				}
				if (scrollTop >= 440){
					that.showBtn = true
				} else {
					that.showBtn = false
				}
			}
		},
		confirm() {
			
		},
		async submit() {
			let msg = '';
			if (!this.lastName) {
				msg = '请输入中文姓氏';
			} else if (this.lastName.length > 2) {
				msg = '请输入正确的中文姓氏';
			} else if (!this.birthdate) {
				msg = '请选择出生日期';
			} else if (!this.agreeTerm) {
				msg = '请同意个人隐私协议';
			}
			if (msg) {
				uni.showToast({
					title: msg,
					icon: 'none'
				});
				if (scrollY > 262) {
					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					})
				}
				return;
			}
			uni.showLoading({
				mask: true
			});
			const result = await uni.request({
				url: '/order/naming_service',
				method: 'POST',
				data: {
					lastName: this.lastName,
					gender: this.gender,
					birthdate: this.birthdate.toISOString(),
					knowsExactTime: this.knowsExactTime,
					seniority: this.seniority || undefined
				},
			});
			uni.setStorage({
				key: 'naming_submit',
				data: {
					lastName: this.lastName,
					gender: this.gender === 'Male' ? '男':'女',
					birthdate: dayjs(this.birthdate).format('YYYY年MM月DD日 HH时mm分 (公历)'),
					knowsExactTime: this.knowsExactTime,
					seniority: this.seniority || undefined
				}
			})
			uni.hideLoading();
			console.log(result);
			uni.navigateTo({
				url: `/pages/naming/preview?orderId=${result.data.id}`
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
	margin-bottom: -80rpx;
}

.form {
	padding: 0 16rpx;

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
		padding: 50rpx 30rpx 0 30rpx;

		.form-item {
			margin-top: 32rpx;
			display: flex;
			align-items: center;

			.label {
				text-align: right;
				width: 154rpx;
				flex-shrink: 0;
				margin-right: 30rpx;
				text-wrap: nowrap;
				text {
					color: #e32129;
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
	padding: 0 20rpx;
	image {
		width: 100%;
		margin-bottom: 20rpx;
	}
}

.info {
	display: flex;
	flex-direction: column;
	align-items: center;
	image {
		width: 200rpx;
		margin-top: 30rpx;
	}
	view {
		margin-top: 30rpx;
		margin-bottom: 200rpx;
		font-size: 20rpx;
		font-family: 'NotoSansHans';
		color: rgb(128, 128, 128);
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
	bottom: 44rpx;
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

.safe-area {
	width: 750rpx;
	height: 44rpx;
	background-color: #fff;
	position: fixed;
	bottom: 0;
}
</style>
