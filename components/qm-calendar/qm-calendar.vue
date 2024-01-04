<template>
  <view class="calendarpage">
    <span class="iconfont icon-el-hg-icon-close" @click="closeDialog"></span>
    <view class="grace-btdialog-shade">
      <view class="pickerView dialog" v-show="isPicker">
        <p class="seltiemtitle">请选择时间</p>
        <view class="pickerHeaderTitle">
          <!-- <view class="close" @click="closeDialog">取消</view> -->
          <view class="actionBtn addcursor">
            <view :class="['solar', lunar === 'solar' ? 'current' : '']" @click.stop="tabCalendar('solar')">公历</view>
            <view :class="['lunar', lunar === 'lunar' ? 'current' : '']" @click.stop="tabCalendar('lunar')">农历</view>
            <!-- <view @click.stop="tabCalendar('sizhu')">四柱</view> -->
          </view>
          <!-- <view class="confirm" @click="confirm">确定</view> -->
        </view>

        <picker-view v-show="lunar!='sizhu'" :indicator-style="indicatorStyle" :value="value" @change="bindChange"
          style="width:100%; height: 328rpx;">
          <picker-view-column>
            <view class="item year" v-for="(item,index) in years" :key="index" :style="{fontWeight:index==firstSelectedIndex? 'bold':''}">{{item.text}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in months" :key="index" :style="{fontWeight:index==secondSelectedIndex? 'bold':''}">{{item.text}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in days" :key="index" :style="{fontWeight:index==thirdSelectedIndex? 'bold':''}">{{item.text}}</view>
          </picker-view-column>
          <picker-view-column v-if="isHourShow">
            <view class="item" v-for="(item,index) in hours" :key="index" :style="{fontWeight:index==fourSelectedIndex? 'bold':''}">{{item.text}}</view>
          </picker-view-column>
          <picker-view-column v-if="isMinShow">
            <view class="item" v-for="(item,index) in mins" :key="index" :style="{fontWeight:index==fiveSelectedIndex? 'bold':''}">{{item.text}}</view>
          </picker-view-column>
        </picker-view>
        <!-- <div>四柱星神</div> -->
        <view class="btnbox">
          <button class="confirmbtn" @click="confirm">确定</button>
        </view>
      </view>
      <view class="confirmView dialog" v-show="!isPicker">
        <view class="pickerHeaderTitle" style="text-align: center; color: rgb(201, 23, 35);">确认时间</view>
        <view style="background: #FFFFFF; padding: 20upx; text-align: center;">
          <view class="confirmSubTitle">请确认输入的时间是否正确</view>
          <view class="solar"><text>公(阳)历：</text>{{solarDate}}</view>
          <view class="lunar"><text>农(阴)历：</text>{{lunarDate}}</view>
          <view class="buttons">
            <view class="blak" @click.stop="blak">返回修改</view>
            <view class="confirm" @click.stop="confirmDialog">确认正确</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // import render from './calendar-data/render.js';
  import calendarFormatter from './calendar-data/calendar.js'
  let date = new Date();
  export default {
    name: "qmCalendar",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      date: {
        type: String,
        default: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      },
      time: {
        type: String,
        default: '00:00'
      },
      isHourShow: {
        type: Boolean,
        default: false
      },
      isMinShow: {
        type: Boolean,
        default: false
      },
      lunarType: {
        type: String,
        default: 'number' //number or words
      },
      userString: {
        type: String,
        default: '' //number or words
      },
    },
    data() {
      return {
        years: [],
        months: [],
        days: [],
        year: '',
        month: '',
        day: '',
        hours: [{
            text: '未知',
            value: '未知',
          },
          {
            text: '0子时',
            value: '0',
          },
          {
            text: '1丑时',
            value: '1',
          },
          {
            text: '2丑时',
            value: '2',
          },
          {
            text: '3寅时',
            value: '3',
          },
          {
            text: '4寅时',
            value: '4',
          },
          {
            text: '5卯时',
            value: '5',
          },
          {
            text: '6卯时',
            value: '6',
          },
          {
            text: '7辰时',
            value: '7',
          },
          {
            text: '8辰时',
            value: '8',
          },
          {
            text: '9巳时',
            value: '9',
          },
          {
            text: '10巳时',
            value: '10',
          },
          {
            text: '11午时',
            value: '11',
          },
          {
            text: '12午时',
            value: '12',
          },
          {
            text: '13未时',
            value: '13',
          },
          {
            text: '14未时',
            value: '14',
          },
          {
            text: '15申时',
            value: '15',
          },
          {
            text: '16申时',
            value: '16',
          },
          {
            text: '17酉时',
            value: '17',
          },
          {
            text: '18酉时',
            value: '18',
          },
          {
            text: '19戌时',
            value: '19',
          },
          {
            text: '20戌时',
            value: '20',
          },
          {
            text: '21亥时',
            value: '21',
          },
          {
            text: '22亥时',
            value: '22',
          },
          {
            text: '23子时',
            value: '23',
          },
        ],
        mins: [{
          text: '未知',
          value: '未知',
        }, ],
        hour: '',
        min: '',
        indicatorStyle: `height: 35px;`,
        lunar: 'solar',
        isPicker: true,
        solarDate: "", //国历最后时间
        lunarDate: "", //农历最终时间
        returnDate: "", //返回页面的日期
        returnTime: "", //返回页面的时间
        outterApi: [2020, 5, 26],
        isRunMonthBoolean: false,
        lYear: "",
        lMonth: "",
        lDay: "",
        firstSelectedIndex: 0,
        secondSelectedIndex: 0,
        thirdSelectedIndex: 0,
        fourSelectedIndex: 0,
        fiveSelectedIndex: 0,
        value: [96, 0, 20, 0, 0],
        isRunNianBoolean: '',
      }
    },
    created: function() {
      // this.init();
      for (let index = 0; index < 60; index++) {
        this.mins.push({
          text: index + '分',
          value: index
        })
      }
      let year = new Date().getFullYear()
      // this.years
      for (let index = 1902; index < (year + 3); index++) {
        this.years.push({
          text: index + '年',
          value: index
        })
      }
      // months
      for (let index = 1; index < 13; index++) {
        this.months.push({
          text: index + '月',
          value: index
        })
      }
      //days
      for (let index = 1; index < 31; index++) {
        this.days.push({
          text: index + '日',
          value: index
        })
      }
      this.init()
    },
    watch: {
      // isHourShow() {
      //   this.init();
      // },
      // isMinShow() {
      //   this.init();
      // },
      // lunarType() {
      //   this.init();
      // },
      value(oldval, newval) {
        const changIndex = this.getArrDifference(oldval, newval)
        if (changIndex[0] == 0 && this.lunar == 'solar') {
          console.log('年改变');
          this.$set(this.value, changIndex[0], changIndex[1])
          let changeYearValue = this.years[changIndex[1]].value || ''
          if (changeYearValue % 4 === 0 && changeYearValue % 100 !== 0 || changeYearValue % 400 === 0) {
            this.isRunNianBoolean = true
          } else {
            this.isRunNianBoolean = false
          }
        } else if (changIndex[0] == 1 && this.lunar == 'solar') {
          console.log('月改变');
          this.days = []
          if (changIndex[1] == '0' || changIndex[1] == '2' || changIndex[1] == '4' || changIndex[1] == '6' ||
            changIndex[1] == '7' || changIndex[1] == '9' || changIndex[1] == '11') {
            for (let index = 1; index < 32; index++) {
              this.days.push({
                text: index + '日',
                value: index
              })
            }
          } else if (changIndex[1] == '1') {
            if (this.isRunNianBoolean) {
              for (let index = 1; index < 30; index++) {
                this.days.push({
                  text: index + '日',
                  value: index
                })
              }
            } else {
              for (let index = 1; index < 29; index++) {
                this.days.push({
                  text: index + '日',
                  value: index
                })
              }
            }
          } else {
            for (let index = 1; index < 31; index++) {
              this.days.push({
                text: index + '日',
                value: index
              })
            }
          }
          this.$set(this.value, changIndex[0], changIndex[1])
        } else if (changIndex[0] == 2 && this.lunar == 'solar') {
          //下面尝试更新去转化农历的值
          console.log('日改变');
          this.$set(this.value, changIndex[0], changIndex[1])
          this.outterApi[2] = this.days[changIndex[1]].value
        } else if (changIndex[0] == 0 && this.lunar == 'lunar') {
          console.log('农历年改变');
          //下面尝试更新年份去转化公历的值
          this.lYear = this.years[changIndex[1]].value
          // 下面更新年份索引
          this.firstSelectedIndex = changIndex[1]
          var hanNameMonth = ''
          if (calendarFormatter.leapMonth(this.years[changIndex[1]].value) != '0') {
            hanNameMonth = this.giveChName(calendarFormatter.leapMonth(this.years[changIndex[1]].value))
            // 下面这里需要先把月份数组清空再添加避免重复
            this.months = [{
                text: '正月',
                value: '1',
              },
              {
                text: '二月',
                value: '2',
              },
              {
                text: '三月',
                value: '3',
              },
              {
                text: '四月',
                value: '4',
              },
              {
                text: '五月',
                value: '5',
              },
              {
                text: '六月',
                value: '6',
              },
              {
                text: '七月',
                value: '7',
              },
              {
                text: '八月',
                value: '8',
              },
              {
                text: '九月',
                value: '9',
              },
              {
                text: '十月',
                value: '10',
              },
              {
                text: '冬月',
                value: '11',
              },
              {
                text: '腊月',
                value: '12',
              },
            ]
            this.months.map((item, idnex) => {
              if (idnex == calendarFormatter.leapMonth(this.years[changIndex[1]].value)) {
                this.months.splice(idnex, 0, {
                  text: hanNameMonth,
                  value: idnex
                }, )
              }
            })
            // 下面是计算闰月的天数
            if (calendarFormatter.leapDays(this.years[changIndex[1]].value) == '29') {
              this.days = []
              this.days = [{
                  text: '初一',
                  value: '1',
                },
                {
                  text: '初二',
                  value: '2',
                },
                {
                  text: '初三',
                  value: '3',
                },
                {
                  text: '初四',
                  value: '4',
                },
                {
                  text: '初五',
                  value: '5',
                },
                {
                  text: '初六',
                  value: '6',
                },
                {
                  text: '初七',
                  value: '7',
                },
                {
                  text: '初八',
                  value: '8',
                },
                {
                  text: '初九',
                  value: '9',
                },
                {
                  text: '初十',
                  value: '10',
                },
                {
                  text: '十一',
                  value: '11',
                },
                {
                  text: '十二',
                  value: '12',
                },
                {
                  text: '十三',
                  value: '13',
                },
                {
                  text: '十四',
                  value: '14',
                },
                {
                  text: '十五',
                  value: '15',
                },
                {
                  text: '十六',
                  value: '16',
                },
                {
                  text: '十七',
                  value: '17',
                },
                {
                  text: '十八',
                  value: '18',
                },
                {
                  text: '十九',
                  value: '19',
                },
                {
                  text: '二十',
                  value: '20',
                },
                {
                  text: '廿一',
                  value: '21',
                },
                {
                  text: '廿二',
                  value: '22',
                },
                {
                  text: '廿三',
                  value: '23',
                },
                {
                  text: '廿四',
                  value: '24',
                },
                {
                  text: '廿五',
                  value: '25',
                },
                {
                  text: '廿六',
                  value: '26',
                },
                {
                  text: '廿七',
                  value: '27',
                },
                {
                  text: '廿八',
                  value: '28',
                },
                {
                  text: '廿九',
                  value: '29',
                },
              ]
            } else if (calendarFormatter.leapDays(this.years[changIndex[1]].value) == '30') {
              this.days = []
              this.days = [{
                  text: '初一',
                  value: '1',
                },
                {
                  text: '初二',
                  value: '2',
                },
                {
                  text: '初三',
                  value: '3',
                },
                {
                  text: '初四',
                  value: '4',
                },
                {
                  text: '初五',
                  value: '5',
                },
                {
                  text: '初六',
                  value: '6',
                },
                {
                  text: '初七',
                  value: '7',
                },
                {
                  text: '初八',
                  value: '8',
                },
                {
                  text: '初九',
                  value: '9',
                },
                {
                  text: '初十',
                  value: '10',
                },
                {
                  text: '十一',
                  value: '11',
                },
                {
                  text: '十二',
                  value: '12',
                },
                {
                  text: '十三',
                  value: '13',
                },
                {
                  text: '十四',
                  value: '14',
                },
                {
                  text: '十五',
                  value: '15',
                },
                {
                  text: '十六',
                  value: '16',
                },
                {
                  text: '十七',
                  value: '17',
                },
                {
                  text: '十八',
                  value: '18',
                },
                {
                  text: '十九',
                  value: '19',
                },
                {
                  text: '二十',
                  value: '20',
                },
                {
                  text: '廿一',
                  value: '21',
                },
                {
                  text: '廿二',
                  value: '22',
                },
                {
                  text: '廿三',
                  value: '23',
                },
                {
                  text: '廿四',
                  value: '24',
                },
                {
                  text: '廿五',
                  value: '25',
                },
                {
                  text: '廿六',
                  value: '26',
                },
                {
                  text: '廿七',
                  value: '27',
                },
                {
                  text: '廿八',
                  value: '28',
                },
                {
                  text: '廿九',
                  value: '29',
                },
                {
                  text: '三十',
                  value: '30',
                },
              ]
            }

          } else {
            this.months = [{
                text: '正月',
                value: '1',
              },
              {
                text: '二月',
                value: '2',
              },
              {
                text: '三月',
                value: '3',
              },
              {
                text: '四月',
                value: '4',
              },
              {
                text: '五月',
                value: '5',
              },
              {
                text: '六月',
                value: '6',
              },
              {
                text: '七月',
                value: '7',
              },
              {
                text: '八月',
                value: '8',
              },
              {
                text: '九月',
                value: '9',
              },
              {
                text: '十月',
                value: '10',
              },
              {
                text: '冬月',
                value: '11',
              },
              {
                text: '腊月',
                value: '12',
              },
            ]
          }
          // 当农历时候切换年份重新计算月份吧,告诉现在不是闰月
          this.secondSelectedIndex = ''
          this.$set(this.value, 1, 0)
          this.isRunMonthBoolean = false
          // 农历滚动的时候也要更新数值
          this.outterApi[0] = this.years[changIndex[1]].value
          this.$set(this.value, changIndex[0], changIndex[1])
        } else if (changIndex[0] == 1 && this.lunar == 'lunar') {
          console.log('农历月改变');
          this.lMonth = this.months[changIndex[1]].value
          if (this.months[changIndex[1]].text.indexOf('闰') != -1) {
            this.isRunMonthBoolean = true
          } else {
            // 下面滚动的时候需要计算农历 非闰月的大小月
            this.isRunMonthBoolean = false
            if (calendarFormatter.monthDays(this.lYear, this.lMonth) == '29') {
              this.days = [{
                  text: '初一',
                  value: '1',
                },
                {
                  text: '初二',
                  value: '2',
                },
                {
                  text: '初三',
                  value: '3',
                },
                {
                  text: '初四',
                  value: '4',
                },
                {
                  text: '初五',
                  value: '5',
                },
                {
                  text: '初六',
                  value: '6',
                },
                {
                  text: '初七',
                  value: '7',
                },
                {
                  text: '初八',
                  value: '8',
                },
                {
                  text: '初九',
                  value: '9',
                },
                {
                  text: '初十',
                  value: '10',
                },
                {
                  text: '十一',
                  value: '11',
                },
                {
                  text: '十二',
                  value: '12',
                },
                {
                  text: '十三',
                  value: '13',
                },
                {
                  text: '十四',
                  value: '14',
                },
                {
                  text: '十五',
                  value: '15',
                },
                {
                  text: '十六',
                  value: '16',
                },
                {
                  text: '十七',
                  value: '17',
                },
                {
                  text: '十八',
                  value: '18',
                },
                {
                  text: '十九',
                  value: '19',
                },
                {
                  text: '二十',
                  value: '20',
                },
                {
                  text: '廿一',
                  value: '21',
                },
                {
                  text: '廿二',
                  value: '22',
                },
                {
                  text: '廿三',
                  value: '23',
                },
                {
                  text: '廿四',
                  value: '24',
                },
                {
                  text: '廿五',
                  value: '25',
                },
                {
                  text: '廿六',
                  value: '26',
                },
                {
                  text: '廿七',
                  value: '27',
                },
                {
                  text: '廿八',
                  value: '28',
                },
                {
                  text: '廿九',
                  value: '29',
                },
              ]

            } else if (calendarFormatter.monthDays(this.lYear, this.lMonth) == '30') {
              this.days = [{
                  text: '初一',
                  value: '1',
                },
                {
                  text: '初二',
                  value: '2',
                },
                {
                  text: '初三',
                  value: '3',
                },
                {
                  text: '初四',
                  value: '4',
                },
                {
                  text: '初五',
                  value: '5',
                },
                {
                  text: '初六',
                  value: '6',
                },
                {
                  text: '初七',
                  value: '7',
                },
                {
                  text: '初八',
                  value: '8',
                },
                {
                  text: '初九',
                  value: '9',
                },
                {
                  text: '初十',
                  value: '10',
                },
                {
                  text: '十一',
                  value: '11',
                },
                {
                  text: '十二',
                  value: '12',
                },
                {
                  text: '十三',
                  value: '13',
                },
                {
                  text: '十四',
                  value: '14',
                },
                {
                  text: '十五',
                  value: '15',
                },
                {
                  text: '十六',
                  value: '16',
                },
                {
                  text: '十七',
                  value: '17',
                },
                {
                  text: '十八',
                  value: '18',
                },
                {
                  text: '十九',
                  value: '19',
                },
                {
                  text: '二十',
                  value: '20',
                },
                {
                  text: '廿一',
                  value: '21',
                },
                {
                  text: '廿二',
                  value: '22',
                },
                {
                  text: '廿三',
                  value: '23',
                },
                {
                  text: '廿四',
                  value: '24',
                },
                {
                  text: '廿五',
                  value: '25',
                },
                {
                  text: '廿六',
                  value: '26',
                },
                {
                  text: '廿七',
                  value: '27',
                },
                {
                  text: '廿八',
                  value: '28',
                },
                {
                  text: '廿九',
                  value: '29',
                },
                {
                  text: '三十',
                  value: '30',
                },
              ]
            }
            this.secondSelectedIndex = changIndex[1]
            this.$set(this.value, changIndex[0], changIndex[1])
          }
          //农历年滚动校正月份数值todolist
          this.lDay = this.days[changIndex[1]].value
        } else if (changIndex[0] == 2 && this.lunar == 'lunar') {
          console.log('农历日改变');
          this.lDay = this.days[changIndex[1]].value
        } else if (changIndex[0] == 3) {
          this.fourSelectedIndex = changIndex[1]
          this.$set(this.value, changIndex[0], changIndex[1])
           if (this.hours[changIndex[1]].value == "未知") {
              this.$set(this.value, 4, 0)
              this.fiveSelectedIndex = 0
           }
        } else if (changIndex[0] == 4) {
          if (this.hours[this.value[3]].value == "未知") {
            this.$set(this.value, changIndex[0], 0)
            this.fiveSelectedIndex = 0
          } else {
            this.$set(this.value, changIndex[0], changIndex[1])
          }
        }
      }
    },
    methods: {
      getArrDifference(arr1, arr2) {
        let arrIndex = null
        let arrVal = null
        arr1.map(function(v, i, arr) {
          if (arr1[i] != arr2[i]) {
            arrIndex = i
            arrVal = v
          }
        });
        return [arrIndex, arrVal]
      },
      giveChName(num) {
        if (num == 4) {
          return '闰四月'
        } else
        if (num == 1) {
          return '闰正月'
        } else
        if (num == 2) {
          return '闰二月'
        } else
        if (num == 3) {
          return '闰三月'
        } else
        if (num == 5) {
          return '闰五月'
        } else
        if (num == 6) {
          return '闰六月'
        } else
        if (num == 7) {
          return '闰七月'
        } else
        if (num == 8) {
          return '闰八月'
        } else
        if (num == 9) {
          return '闰九月'
        } else
        if (num == 10) {
          return '闰冬月'
        }

      },
      init: function() {
        let userStringArr = this.userString.split('|')
        const lunar = userStringArr[2] == '公历' ? 'solar' : 'lunar'
        this.value[3] = this.hours.findIndex(item => {
          return item.value == parseInt(userStringArr[6])
        })
        this.value[4] = this.mins.findIndex(item => {
          return item.value == parseInt(userStringArr[7])
        })
        if (lunar == 'solar') {
          this.value[0] = this.years.findIndex(item => {
            return item.value == userStringArr[3]
          })
          this.value[1] = this.months.findIndex(item => {
            return item.value == userStringArr[4]
          })
          this.value[2] = this.days.findIndex(item => {
            return item.value == userStringArr[5]
          })
        } else {
          this.lunar = lunar
          console.log('初始化为农历');
          if(userStringArr[8]=="是"){
            this.isRunMonthBoolean=true
          }
           console.log(this.isRunMonthBoolean);
          let saveTurn = calendarFormatter.lunar2solar(userStringArr[3], Number(userStringArr[4]), Number(
              userStringArr[5]), this.isRunMonthBoolean)

          this.value[0] = this.years.findIndex(item => {
            return item.value == saveTurn.lYear
          })
          this.value[1] = this.months.findIndex(item => {
            return item.value == saveTurn.lMonth
          })
          this.value[2] = this.days.findIndex(item => {
            return item.value == saveTurn.lDay
          })
          if (saveTurn.IMonthCn.indexOf('闰') != -1) {
            this.isRunMonthBoolean = true
          } else {
            this.isRunMonthBoolean = false
          }
          this.lYear = saveTurn.lYear
          this.lMonth = saveTurn.lMonth
          this.lDay = saveTurn.lDay
          this.months = [{
              text: '正月',
              value: '1',
            },
            {
              text: '二月',
              value: '2',
            },
            {
              text: '三月',
              value: '3',
            },
            {
              text: '四月',
              value: '4',
            },
            {
              text: '五月',
              value: '5',
            },
            {
              text: '六月',
              value: '6',
            },
            {
              text: '七月',
              value: '7',
            },
            {
              text: '八月',
              value: '8',
            },
            {
              text: '九月',
              value: '9',
            },
            {
              text: '十月',
              value: '10',
            },
            {
              text: '冬月',
              value: '11',
            },
            {
              text: '腊月',
              value: '12',
            },
          ]
          // 下面农历需要判断29 30
          this.days = [{
              text: '初一',
              value: '1',
            },
            {
              text: '初二',
              value: '2',
            },
            {
              text: '初三',
              value: '3',
            },
            {
              text: '初四',
              value: '4',
            },
            {
              text: '初五',
              value: '5',
            },
            {
              text: '初六',
              value: '6',
            },
            {
              text: '初七',
              value: '7',
            },
            {
              text: '初八',
              value: '8',
            },
            {
              text: '初九',
              value: '9',
            },
            {
              text: '初十',
              value: '10',
            },
            {
              text: '十一',
              value: '11',
            },
            {
              text: '十二',
              value: '12',
            },
            {
              text: '十三',
              value: '13',
            },
            {
              text: '十四',
              value: '14',
            },
            {
              text: '十五',
              value: '15',
            },
            {
              text: '十六',
              value: '16',
            },
            {
              text: '十七',
              value: '17',
            },
            {
              text: '十八',
              value: '18',
            },
            {
              text: '十九',
              value: '19',
            },
            {
              text: '二十',
              value: '20',
            },
            {
              text: '廿一',
              value: '21',
            },
            {
              text: '廿二',
              value: '22',
            },
            {
              text: '廿三',
              value: '23',
            },
            {
              text: '廿四',
              value: '24',
            },
            {
              text: '廿五',
              value: '25',
            },
            {
              text: '廿六',
              value: '26',
            },
            {
              text: '廿七',
              value: '27',
            },
            {
              text: '廿八',
              value: '28',
            },
            {
              text: '廿九',
              value: '29',
            },
          ]
          this.years.map((item, index) => {
            if (item.value == saveTurn.lYear) {
              this.value[0] = index
              this.$set(this.value, 0, index)
            }
          })
          // 下面判断当前年份中是否有闰月,修改为只能方法判断增加闰月不能包含闰文字
          if (calendarFormatter.leapMonth(this.years[this.value[0]].value) != 0) {
            this.months.splice(calendarFormatter.leapMonth(this.years[this.value[0]].value), 0, {
              text: this.giveChName(calendarFormatter.leapMonth(this.years[this.value[0]].value)),
              value: calendarFormatter.leapMonth(this.years[this.value[0]].value)
            }, )
            // 同步闰月的索引
            for (let index = 0; index < this.months.length; index++) {
              if (this.months[index].text == saveTurn.IMonthCn) {
                this.value[1] = index
                this.$set(this.value, 1, index)
              }
            }
          } else {
            for (let index = 0; index < this.months.length; index++) {
              if (this.months[index].text == saveTurn.IMonthCn) {
                this.value[1] = index
                this.$set(this.value, 1, index)
              }
            }
          }
          this.days.map((item, index) => {
            if (item.value == saveTurn.lDay) {
              this.value[2] = index
              this.$set(this.value, 2, index)
            }
          })
          console.log(this.value);
          // this.value[1] = this.secondSelectedIndex

          console.log(saveTurn);
          console.log(this.value);
        }
        [this.firstSelectedIndex,this.secondSelectedIndex,this.thirdSelectedIndex,this.fourSelectedIndex,this.fiveSelectedIndex] = this.value
      },
      bindChange: function(e) {
        const val = e.detail.value;
        this.value = [val[0], val[1], val[2], val[3], val[4]];
        [this.firstSelectedIndex,this.secondSelectedIndex,this.thirdSelectedIndex,this.fourSelectedIndex,this.fiveSelectedIndex] = this.value
      },
      tabCalendar: function(tab) {
        this.lunar = tab
        if (tab == 'lunar') {
          let saveTurn = calendarFormatter.solar2lunar(this.years[this.value[0]].value, this.months[this.value[1]]
            .value,
            this.days[this.value[2]].value)
          if (saveTurn.IMonthCn.indexOf('闰') != -1) {
            this.isRunMonthBoolean = true
          } else {
            this.isRunMonthBoolean = false
          }
          this.lYear = saveTurn.lYear
          this.lMonth = saveTurn.lMonth
          this.lDay = saveTurn.lDay
          this.months = [{
              text: '正月',
              value: '1',
            },
            {
              text: '二月',
              value: '2',
            },
            {
              text: '三月',
              value: '3',
            },
            {
              text: '四月',
              value: '4',
            },
            {
              text: '五月',
              value: '5',
            },
            {
              text: '六月',
              value: '6',
            },
            {
              text: '七月',
              value: '7',
            },
            {
              text: '八月',
              value: '8',
            },
            {
              text: '九月',
              value: '9',
            },
            {
              text: '十月',
              value: '10',
            },
            {
              text: '冬月',
              value: '11',
            },
            {
              text: '腊月',
              value: '12',
            },
          ]
          // 下面农历需要判断29 30
          this.days = [{
              text: '初一',
              value: '1',
            },
            {
              text: '初二',
              value: '2',
            },
            {
              text: '初三',
              value: '3',
            },
            {
              text: '初四',
              value: '4',
            },
            {
              text: '初五',
              value: '5',
            },
            {
              text: '初六',
              value: '6',
            },
            {
              text: '初七',
              value: '7',
            },
            {
              text: '初八',
              value: '8',
            },
            {
              text: '初九',
              value: '9',
            },
            {
              text: '初十',
              value: '10',
            },
            {
              text: '十一',
              value: '11',
            },
            {
              text: '十二',
              value: '12',
            },
            {
              text: '十三',
              value: '13',
            },
            {
              text: '十四',
              value: '14',
            },
            {
              text: '十五',
              value: '15',
            },
            {
              text: '十六',
              value: '16',
            },
            {
              text: '十七',
              value: '17',
            },
            {
              text: '十八',
              value: '18',
            },
            {
              text: '十九',
              value: '19',
            },
            {
              text: '二十',
              value: '20',
            },
            {
              text: '廿一',
              value: '21',
            },
            {
              text: '廿二',
              value: '22',
            },
            {
              text: '廿三',
              value: '23',
            },
            {
              text: '廿四',
              value: '24',
            },
            {
              text: '廿五',
              value: '25',
            },
            {
              text: '廿六',
              value: '26',
            },
            {
              text: '廿七',
              value: '27',
            },
            {
              text: '廿八',
              value: '28',
            },
            {
              text: '廿九',
              value: '29',
            },
          ]
          this.years.map((item, index) => {
            if (item.value == saveTurn.lYear) {
              this.value[0] = index
              this.$set(this.value, 0, index)
            }
          })
          // 下面判断当前年份中是否有闰月,修改为只能方法判断增加闰月不能包含闰文字
          if (calendarFormatter.leapMonth(this.years[this.value[0]].value) != 0) {
            this.months.splice(calendarFormatter.leapMonth(this.years[this.value[0]].value), 0, {
              text: this.giveChName(calendarFormatter.leapMonth(this.years[this.value[0]].value)),
              value: calendarFormatter.leapMonth(this.years[this.value[0]].value)
            }, )
            // 同步闰月的索引
            for (let index = 0; index < this.months.length; index++) {
              if (this.months[index].text == saveTurn.IMonthCn) {
                this.value[1] = index
                this.$set(this.value, 1, index)
                this.secondSelectedIndex = this.value[1]
              }
            }
          } else {
            for (let index = 0; index < this.months.length; index++) {
              if (this.months[index].text == saveTurn.IMonthCn) {
                this.value[1] = index
                this.$set(this.value, 1, index)
              }
            }
          }
          this.days.map((item, index) => {
            if (item.value == saveTurn.lDay) {
              this.value[2] = index
              this.$set(this.value, 2, index)
              this.thirdSelectedIndex = this.value[2]
            }
          })
        } else if (tab == 'solar') {
          let saveTurn = calendarFormatter.lunar2solar(this.lYear, Number(this.lMonth), Number(this.lDay), this.isRunMonthBoolean)
          console.log(saveTurn);
          this.days = []
          this.months = []

          this.years.map((item, index) => {
            if (item.value == saveTurn.lYear) {
              // this.firstSelectedIndex = index
              this.$set(this.value, 0, index)
            }
          })

          for (let index = 1; index < 13; index++) {
            this.months.push({
              text: index + '月',
              value: index
            })
          }
          if (saveTurn.cMonth == '1' || saveTurn.cMonth == '3' || saveTurn.cMonth == '5' || saveTurn.cMonth == '7' ||
            saveTurn.cMonth == '8' || saveTurn.cMonth == '10' || saveTurn.cMonth == '12') {
            for (let index = 1; index < 32; index++) {
              this.days.push({
                text: index + '日',
                value: index
              })
            }
          } else if (saveTurn.cMonth == '2') {
            if (this.isRunNianBoolean) {
              for (let index = 1; index < 30; index++) {
                this.days.push({
                  text: index + '日',
                  value: index
                })
              }
            } else {
              for (let index = 1; index < 29; index++) {
                this.days.push({
                  text: index + '日',
                  value: index
                })
              }
            }
          } else {
            for (let index = 1; index < 31; index++) {
              this.days.push({
                text: index + '日',
                value: index
              })
            }
          }
          this.years.map((item, index) => {
            if (item.value == saveTurn.cYear) {
              this.$set(this.value, 0, index)
            }
          })
          this.months.map((item, index) => {
            if (item.value == saveTurn.cMonth) {
              this.$set(this.value, 1, index)
              this.secondSelectedIndex = index
            }
          })
          this.days.map((item, index) => {
            if (item.value == saveTurn.cDay) {
              this.$set(this.value, 2, index)
              this.thirdSelectedIndex = index
            }
          })
          this.isRunMonthBoolean = false
        } else {
          console.log(12312);
        }
      },
      confirm: function() {
        if (this.value[1] == '闰正月') {
          this.value[1] = 1
        } else
        if (this.value[1] == '闰二月') {
          this.value[1] = 2
        } else
        if (this.value[1] == '闰三月') {
          this.value[1] = 3
        } else
        if (this.value[1] == '闰四月') {
          this.value[1] = 4
        } else
        if (this.value[1] == '闰五月') {
          this.value[1] = 5
        } else
        if (this.value[1] == '闰六月') {
          this.value[1] = 6
        } else
        if (this.value[1] == '闰七月') {
          this.value[1] = 7
        } else
        if (this.value[1] == '闰八月') {
          this.value[1] = 8
        } else
        if (this.value[1] == '闰九月') {
          this.value[1] = 9
        } else
		if (this.value[1] == '闰十月') {
		  this.value[1] = 10
		} else
        if (this.value[1] == '闰冬月') {
          this.value[1] = 11
        } else 
		if (this.value[1] == '闰腊月') {
		  this.value[1] = 12
		}
		
        let mutiColumnPick = ''
        if (this.lunar == 'solar') {
          mutiColumnPick += '公历'
        } else {
          mutiColumnPick += '农历'
        }
		
        // if (this.hours[this.value[3]].value == '未知时辰') {
        //   this.hours[this.value[3]].value = '8'
        // }
        // if (this.mins[this.value[4]].value == '未知分') {
        //   this.mins[this.value[4]].value = '0'
        // }
		
        this.outterApi = [this.years[this.value[0]].value, this.months[this.value[1]].value, this.days[this.value[2]]
          .value
        ]
        this.initFineIndex = ''
		// console.log('!!!', this.value[3], this.hours[this.value[3]].value)
        if (this.isRunMonthBoolean == true) {
          mutiColumnPick += '|' + this.years[this.value[0]].value + '|' + this.months[this.value[1]].value + '|' +
            this.days[this.value[2]].value + '|' +
            (this.value[3] >= 0 ? this.hours[this.value[3]].value : '-1') + '|' + '-1' + '|是'
        }
        if (!this.isRunMonthBoolean) {
          mutiColumnPick += '|' + this.years[this.value[0]].value + '|' + this.months[this.value[1]].value + '|' +
            this.days[this.value[2]].value + '|' +
            (this.value[3] >= 0 ? this.hours[this.value[3]].value : '-1') + '|' + '-1' + '|否'
        }
        // if (this.lunar == 'solar') {
        //   mutiColumnPick += '|' + this.years[this.value[0]].value + '|' + this.months[this.value[1]].value + '|' + this.days[this.value[2]].value + '|' +
        //     this.hours[this.value[3]].value + '|' + this.mins[this.value[4]].value + '|否'
        // }
        let strData = mutiColumnPick.split('|')
        strData.forEach((item,i,val)=>{
          if(i!=6){
            val[i] = item.padStart(2,'0')
          }
        })
		
		let solarDate
		const cHour = this.value[3] >= 0 ? this.value[3] - 1 : 0
		if (this.lunar == 'lunar') {
			const solar = calendarFormatter.lunar2solar(this.years[this.value[0]].value, Number(this.months[this.value[1]].value), Number(this.days[this.value[2]].value))
			solarDate = new Date(solar.cYear, solar.cMonth - 1, solar.cDay, cHour)
		} else {
			solarDate = new Date(this.years[this.value[0]].value, Number(this.months[this.value[1]].value) - 1, Number(this.days[this.value[2]].value), cHour)
		}
		const knowsExactTime = this.value[3] >= 0
		
        this.$emit('confirm', {
          type: this.lunar,
          name: this.lunar == 'solar' ? '公历' : '农历',
          date: '||' + strData.join('|'),
		  knowsExactTime,
		  showTime: knowsExactTime ? this.hours[this.value[3]].text : this.hours[0].text,
		  solarDate,
        });
      },
      blak: function() {
        this.isPicker = true;
        this.lunarDate = "";
        this.solarDate = "";
      },
      closeDialog: function() {
        this.$emit('closeDialog');
      },
      confirmDialog: function() {
        this.$emit('confirmDialog', {
          date: this.returnDate,
          time: this.returnTime
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/.uni-picker-view-content {
    // font-weight: bold;
  }

  .calendarpage {
    position: relative;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
  }

  .seltiemtitle {
    color: #352B1D;
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    padding: 32rpx 0;
  }

  .btnbox {
    margin-top: 56rpx;
    height: 140rpx;
  }

  .confirmbtn {
    font-size: 32rpx;
    color: white;
    background: #ea3f4a;
    width: 496rpx;
    height: 84rpx;
    border-radius: 16rpx;
  }

  .grace-btdialog-shade {
    /*    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9991;
    background: rgba(0, 0, 0, 0.5); */
  }

  /deep/ .uni-picker-view-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0 16rpx;
  }

  .grace-btdialog-shade .dialog {
    width: 100%;
    height: auto;
    background: #FFFFFF;
    /* position: absolute; */
    bottom: 0;
    left: 0;
  }

  .pickerHeaderTitle {
    // display: flex;
    background: #FFFFFF;
    /* border-bottom: 1px solid #E8E8E8; */
    width: 100%;
    height: 72rpx;
    line-height: 72rpx;
    margin-top: 10.5px;
    margin-bottom: 24px;
    font-size: 32rpx;
    box-sizing: border-box;
    position: relative;
  }

  .icon-el-hg-icon-close {
    position: absolute;
    color: rgb(219, 219, 219);
    right: 32rpx;
    top: 32rpx;
    font-size: 44rpx;
    cursor: pointer;
  }

  .pickerHeaderTitle .close {
    width: 20%;
    float: left;
    text-align: left;
    color: rgb(153, 153, 153);
    cursor: pointer;
  }

  .pickerHeaderTitle .actionBtn {
    background: rgb(255, 247, 236);
    width: 274rpx;
    /* float: left; */
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 16rpx;
  }

  .pickerHeaderTitle .actionBtn .solar {
    height: 72rpx;
    line-height: 48rpx;
    /* margin-top: 5px; */
    padding: 12rpx 34rpx;
    /* border: 1upx solid rgb(201, 23, 35); */
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: #ea3f4a;
    box-sizing: border-box;
    // font-weight: bold;
  }

  .pickerHeaderTitle .actionBtn .lunar {
    height: 72rpx;
    line-height: 48rpx;
    padding: 12rpx 34rpx;
    /* border: 1upx solid rgb(201, 23, 35); */
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #ea3f4a;
    box-sizing: border-box;
    // font-weight: bold;
  }

  .pickerHeaderTitle .actionBtn .current {
    background: #ea3f4a;
    color: #FFFFFF;
    border-radius: 16rpx;
    font-weight: bold;
  }


  .pickerHeaderTitle .confirm {
    width: 20%;
    float: left;
    text-align: right;
    color: #352B1D;
    cursor: pointer;
  }

  .item {
    line-height: 70rpx;
    text-align: center;
    font-size: 18px;
    color: #352B1D;
  }

  .confirmSubTitle {
    font-size: 34upx;
    color: #000000;
    line-height: 48upx;
    margin-top: 48upx;
    padding-bottom: 20upx;
  }

  .confirmView .solar,
  .confirmView .lunar {
    font-size: 34upx;
    color: rgb(163, 30, 26);
    line-height: 34upx;
    padding: 10upx 0upx;
  }

  .confirmView .buttons {
    padding: 40upx 0upx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: #FFFFFF;
    font-size: 34upx;
  }

  .confirmView .buttons .blak {
    display: inline-block;
    padding: 20upx 40upx;
    border-radius: 10upx;
    background: #DDDDDD;
  }

  .confirmView .buttons .confirm {
    display: inline-block;
    padding: 20upx 40upx;
    margin-left: 40upx;
    border-radius: 10upx;
    background: rgb(163, 30, 26);
  }

  /deep/.uni-picker-view-indicator {
    background: #F0F0F0;
    z-index: auto;
  }
</style>