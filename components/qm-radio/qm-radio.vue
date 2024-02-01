
<template>
  <view class="container">
    <view class="item" v-for="(item, index) in arr" :key="index" @click="select(item)" >
		
      <image class="icon" v-if="item.value === modelValue" :src="icon.active"></image>
	  <image class="icon" v-if="item.value !== modelValue" :src="icon.inactive"></image>
	  
	  <view class="label"> {{ item.label }} </view>
	  
    </view>
	
  </view>
</template>

<script>
  export default {
    name: "qm-radio",
    props: {
      arr: {
        typeof: Array,
      },
      modelValue: {
        typeof: String,
      },
      icon: {
        typeof: Object,
        default: ()=>{
          return {
            active: '../../static/radio-active.png',
            inactive: '../../static/radio-inactive.png',
          }
        }
      },
    },
	
    methods: {
      select(item) {
        this.$emit('update:modelValue', item.value)
      }
    }
  }
</script>

<style scoped lang="scss">

.container {
	display: flex;
}
.item {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-right: 20rpx;
}
.icon {
	width: 30rpx;
	height: 30rpx;
}

.label {
	margin-left: 12rpx;
}
  
</style>