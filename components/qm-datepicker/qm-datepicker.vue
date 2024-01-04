<template>
	<view>
		<view class="datepicker">
			<view v-if="!showValue" class="choose" @click="handleClick">请选择出生日期</view>
			<view v-else class="choose" @click="handleClick">{{showValue}}</view>
			
			<image src="../../static/calender.svg" class="logo"></image>
		</view>
		
		<view class="pop">
			<uni-popup ref="popup" >
				<qm-calendar :userString="userString" :show='true' :isHourShow='true' :isMinShow='false' @confirm='confirm' ></qm-calendar>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import qmCalendar from '../qm-calendar/qm-calendar.vue'
	import dayjs from 'dayjs'
	
	export default {
		name:"qm-datepicker",
		data() {
			return {
				isShowCalendar: true,
				showValue: null,
				userString: ''
			};
		},
		props: ['value'],
		components: {
			qmCalendar,
		},
		methods: {
			handleClick() {
				this.$refs.popup.open('bottom')
			},
			confirm(e) {
				this.showValue = dayjs(e.solarDate).format('YYYY-MM-DD') + ' ' + e.showTime
				console.log(e)
				this.userString = e.date
				this.$refs.popup.close()
				this.$emit('update:value', e.solarDate)
				this.$emit('update:knowsExactTime', e.knowsExactTime)
			},
 		}
	}
</script>

<style scoped>
.datepicker {
	font-size: 30rpx;
	height: 60rpx;
	border: 1px solid rgb(215, 51, 64);
	border-radius: 10rpx;
	padding: 0 20rpx;
	width: 320rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.choose {
	color: #808080;
}
.logo {
	width: 42rpx;
	height: 39rpx;
}
.pop {
	/* position: absolute; */
	/* width: 100vw; */
}
</style>