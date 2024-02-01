<template>
	<view>
		<view class="datepicker" @click="handleClick">
			<view v-if="!showValue" class="choose placeholder" >请选择出生日期</view>
			<view v-else class="choose" >{{showValue}}</view>
			
			<image src="../../static/calender.png" class="logo"></image>
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

<style scoped lang="scss">
.datepicker {
	font-size: 30rpx;
	height: 60rpx;
	border: 1px solid rgb(215, 51, 64);
	border-radius: 10rpx;
	padding: 0 20rpx;
	width: 400rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
}
.choose {
	color: #272727;
}
.placeholder {
	color: #b8b8b8;
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