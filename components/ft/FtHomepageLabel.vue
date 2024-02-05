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
						<radio value="Male" :checked="props.modelValue == 'Male'" />
						男
					</label>
					<label class="radio">
						<radio value="Female" :checked="props.modelValue == 'Female'" />
						女
					</label>
				</radio-group>
			</template>
			<template v-if="props.type == 'birthdate'">
				<qm-datepicker :date="props.modelValue" @update:date="(v) => emit('update:modelValue', v)" />
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

	font-size: 24rpx;

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
