<template>
	<view class="body">
		<image class="banner" mode="widthFix" src="../../static/bg_up.png"></image>
		
		<view class="container">
			
			<view class="title">
				<view>已为您展示{{ data.length }}个AI智能取名结果</view>
			</view>
			
			<view class="table">
			
				<table cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<th>ID</th>
							<th>姓名</th>
							<th>拼音</th>
							<th>五行</th>
							<th>三才</th>
							<th>五格</th>
							<th>好听</th>
							<th>好写</th>
							<th>总分</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in data" :key="item.id" >
							<td>{{ index+1 }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.pinyin }}</td>
							<td>{{ item.wuxing }}</td>
							<td>{{ item.sancai }}</td>
							<td>{{ item.wuge }}</td>
							<td>{{ item.haoting }}</td>
							<td>{{ item.haoxie }}</td>
							<td>{{ item.score }}</td>
						</tr>
					</tbody>
				</table>
			
			</view>
			
			<view class="subtitle">
				扫码请专业老师看字，说疑析惑全解答
			</view>
			
			<image class="qrcode" src="../../static/qrcode.jpg"></image>
			
		</view>
		
		<image class="banner-down" mode="widthFix" src="../../static/bg_down.png"></image>
	</view>
</template>

<script>
import qingnangAPI from '../../utils/qingnangAPI';
	export default {
		data() {
			return {
				val: '',
				orderId: '',
				submitted: false,
				data:[]
			};
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.fetchData()
		},
		methods: {
			
			async fetchData() {
				uni.showLoading()
				
				const result = await qingnangAPI.getNamingService({
					orderId: this.orderId,
				})
				
				this.data = result.NamingService.map(item => {
					return {
						...item,
						pinyin: item.name_info.map(pin => pin.pinyin).join(''),
						wuxing: item.attribute_info.find(item => item.attribute === 'chinese_fate_wuxing').score,
						sancai: item.attribute_info.find(item => item.attribute === 'chinese_fate_sancai').score,
						wuge: item.attribute_info.find(item => item.attribute === 'chinese_fate_wuge').score,
						haoting: item.attribute_info.find(item => item.attribute === 'hearing').score,
						haoxie: item.attribute_info.find(item => item.attribute === 'writing').score,
					}
				})
				uni.hideLoading()
				
			}
		}
	}
</script>

<style lang="scss">
	
.body {
	min-height: 100vh;
	background-color: #ea3f4a;
	
	.table {
		margin-top: 20px;
		max-width: 100vw;
		padding: 12px 8px;
		border-collapse:collapse;
		font-size: 12px;
		background-color: #ffe1b5;
	}
	table {
		background-color: #ffe1b5;
		border-collapse:collapse;
		width: 90vw;
		text-align: center;
		line-height: 2;
	}
	
	thead {
		color: #ffe1b5;
		background-color: #d63742;
	}
	tbody {
		color: rgb(39, 39, 39);
		background-color: #ffe1b5;
		td {
			border: 1px solid #d63742
		}
	}
	
	.banner {
		width: 100vw;
	}
	
	.banner-down {
		width: 100vw;
	}
	
	.container {
		position: relative;
		bottom: 160px;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		
		.title {
			display: flex;
			justify-content: center;
			font-size: 18px;
			color: #ffe1b5;
			font-weight: bold;
			margin-bottom: 12px;
			
		}
		.qrcode {
			margin-top: 12px;
			width: 140px;
			height: 140px;
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
			color: #ffe1b5;
			align-items: baseline;
			margin-top: 12px;
			
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
