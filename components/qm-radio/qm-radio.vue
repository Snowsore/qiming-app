<!-- 
    <qm-radio :arr="['html','css','js']" :value.sync="item"></qm-radio> 
    <qm-radio :arr="[{name:'111',id:1},{name:'222',id:1},{name:'333',id:1}]" keyName="name" :value.sync="item"></qm-radio>
    多选模式
    <qm-radio :isM="true" :arr.sync="arr" keyName="name" :value.sync="item"></qm-radio>
     arr:选项数组
     keyName:如果arr为对象格式 显示的keyName 
     value:双向绑定的值
     icon: 图标对象 {
          icon1: '选中状态',
          icon2: '未选中状态',
        }
    iconClass:图标的样式类
    labelClass:每一项的样式类
    activeLabel:当前选中项目的样式类
    boxClass:父盒子的样式类
 
 -->
<template>
  <view class="container">
    <view class="item" v-for="(item, index) in arr" :key="index" @click="select(item)" >
		
      <image class="icon" v-if="item.value === value" :src="icon.active"></image>
	  <image class="icon" v-if="item.value !== value" :src="icon.inactive"></image>
	  
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
      value: {
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
        this.$emit('update:value', item.value)
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