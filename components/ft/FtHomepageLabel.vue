<template>
	<view class="ft-homepage-label">
		<view class="ft-homepage-label-text">
			<template v-if="props.type == 'name'">姓名</template>
			<template v-if="props.type == 'gender'">性别</template>
			<template v-if="props.type == 'birthdate'">生日</template>
		</view>
		<view class="ft-homepage-label-text-indi">:</view>
		<view>
			<template v-if="props.type == 'name'">
				<input placeholder="请输入汉字(必须汉字)" :value="props.modelValue" @input="(e) => emit('update:modelValue', e.detail.value)" />
			</template>
			<template v-if="props.type == 'gender'">
				<radio-group @change="(e) => emit('update:modelValue', e.detail.value)">
					<label class="radio">
						<radio value="男" :checked="props.modelValue == '男'" />
						男
					</label>
					<label class="radio">
						<radio value="女" :checked="props.modelValue == '女'" />
						女
					</label>
				</radio-group>
			</template>
			<template v-if="props.type == 'birthdate'">
				<qm-datepicker :value="props.modelValue" @update:value="(v) => emit('update:modelValue', v)"></qm-datepicker>
			</template>
		</view>
	</view>
</template>

<script setup>
const props = defineProps(['type', 'modelValue']);
const emit = defineEmits(['update:modelValue']);
</script>

<style>
.ft-homepage-label {
	width: 660rpx;
	height: 90rpx;

	border-radius: 45rpx;

	display: flex;
	align-items: center;

	background-color: #fbce86;

	padding: 0 35rpx;
	box-sizing: border-box;
}

.ft-homepage-label-text {
	font-weight: bold;
	letter-spacing: 30rpx;
}

.ft-homepage-label-text-indi {
	transform: translateX(-25rpx);
}
</style>
