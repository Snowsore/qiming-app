##wan-calendar是什么


# wan-calendar

#### 介绍
uniapp、vue2日历组件  
一个公历、农历切换选择的一个日期选择器，可用于生日开发日期选择中

#### 使用说明

1.  npm i dayjs
2.  使用
```html
    <wan-calendar
      ref="betterCalendarRef"
      :showCalendar="showCalendar"
      @confirm="selectDate"
      @cancel="showCalendar = false"
      :selectOptions="[48, 9, 16, 1]"
    ></wan-calendar>
```
```
import dayjs from "dayjs";
import wanCalendar from "@/components/wan-calendar/wan-calendar";

components: { wanCalendar },
```
```js
data() {
  return {
    showCalendar: false,
  };
},
```
```
methods: {
  async selectDate(e) {
    console.log(e)
    this.showCalendar = false
  },
},
```

# 鸣谢
本项目基于多项目效果优化合并，在此感谢！

# 有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(173451161@qq.com)
* QQ: 173451161
