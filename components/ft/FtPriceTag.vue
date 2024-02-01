<template>
	<view>
		<view class="ft-price-tag">结缘价：{{ props.price }}元</view>
		<view class="ft-price-tag-ori">原价：{{ props.oprice }}元</view>
	</view>
</template>

<script setup>
const props = defineProps(['price', 'oprice']);
</script>

<style>
.ft-price-tag {
	margin-bottom: 8rpx;
	background-color: #ea3f4a;
	border-radius: 10rpx;

	display: grid;
	place-content: center;

	font-size: 30rpx;

	color: #fffde1;

	padding: 16rpx 20rpx;
}
.ft-price-tag-ori {
	text-align: center;
	font-size: 24rpx;
	color: #7d7d7d;
	text-decoration-line: line-through;
}
</style>
