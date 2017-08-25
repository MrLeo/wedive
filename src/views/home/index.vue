<template lang="pug">
  .page.page-current
    div 国际化信息：{{ $t("signIn") }}
    .table(@mouseout="outTable")
      .row(v-for="(row,rIndex) in rowsGetter")
        template(v-for="(column,cIndex) in date.list")
          v-column-item(:key="cIndex",:row='rIndex+1',:column="cIndex+1",:eventInfo="eventInfo",:selectRange="selectRange",@mouseOverBlockItem="mouse")
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as types from '../../store/mutation-types'

  export default {
    name: 'Home',
    components: {
      vColumnItem: () => import('./ListItem.vue')
    },
    data: () => ({
      classify: {
        '欢乐潜': {},
        'xx潜1': {},
        'xx潜2': {},
        'xx潜3': {},
        'xx潜4': {},
        'xx潜5': {},
      },
      date: {
        start: '2017-10-01',
        end: '2017-10-15',
        list: []
      },
      selectRange: [],
      selectRangeTemp: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
      startPointRow: 0,
      startPointColumn: 0,
      eventInfo: {
        isMouseDown: false,
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        mouseover: {
          row: 0,
          column: 0
        },
        event: null
      }
    }),
    created() {
    },
    mounted() {
      this.getCalendarDays()
    },
    watch: {
      'date.start': function (val, oldVal) {
        this.getCalendarDays()
      },
      'date.end': function (val, oldVal) {
        this.getCalendarDays()
      }
    },
    computed: {
      ...mapState({}),
      ...mapGetters({}),
      rowsGetter() {
        return Object.keys(this.classify)
      }
    },
    methods: {
      ...mapActions([]),
      ...mapMutations({}),
      getWeek(date) {
        switch (date.getDay()) {
          case 0:
            return '星期日'
          case 1:
            return '星期一'
          case 2:
            return '星期三'
          case 3:
            return '星期四'
          case 4:
            return '星期五'
          case 5:
            return '星期六'
        }
      },
      /**
       * 获取月份的最后一天
       * @param year 年
       * @param month 月
       * @returns {number}
       */
      getDaysInMonth(year, month) {
        month = parseInt(month, 10) + 1;
        var temp = new Date(year, month, 0);
        return temp.getDate();
      },
      /**
       * 日历的每一天
       */
      getCalendarDays() {
        let startDateArr = this.date.start.split('-')
        let endDateArr = this.date.end.split('-')
        if (~~startDateArr[1] == ~~endDateArr[1]) {
          for (let day = ~~startDateArr[2]; day < ~~endDateArr[2]; day++) {
            this.date.list.push({
              year: endDateArr[0],
              month: endDateArr[1],
              day,
              week: this.getWeek(new Date(endDateArr[0], endDateArr[1], day))
            })
          }
        } else {
          let setDateList = (year, month, day = 1) => {
            let lastDay = this.getDaysInMonth(year, month)
            for (day; day <= lastDay; day++) {
              this.date.list.push({year, month, day, week: this.getWeek(new Date(year, month, day))})
            }
          }
          setDateList(startDateArr[0], startDateArr[1], startDateArr[2])//起始月
          for (let month = startDateArr[1] + 1; month < endDateArr[1]; month++) {//中间月
            setDateList(startDateArr[0], startDateArr[1])
            console.log('for1')
          }
          for (let day = 1; day < endDateArr[2]; day++) {//结束月
            console.log('for2')
            this.date.list.push({
              year: endDateArr[0],
              month: endDateArr[1],
              day,
              week: this.getWeek(new Date(endDateArr[0], endDateArr[1], day))
            })
          }
        }
      },
      /**
       * 子组件传递上来的鼠标事件
       * @param data
       */
      mouse(data) {
        this.eventInfo.event = data.event
        //标记鼠标按下，并记录按下的坐标
        if (data.event.type === 'mousedown') {
          this.eventInfo.isMouseDown = true
          this.startPointRow = this.eventInfo.top = this.eventInfo.bottom = data.row
          this.startPointColumn = this.eventInfo.left = this.eventInfo.right = data.column
          // this.$store.commit(types.dive.addSelectedItem, [this.row, this.column].join(','))
          let index = this.selectRange.indexOf([data.row, data.column].join(','))
          if (index === -1) {
            this.selectRange.push([this.startPointRow, this.startPointColumn].join(','))
          } else {
            this.selectRange.splice(index, 1)
          }
        }
        if (data.event.type === 'mouseover') {
          this.eventInfo.mouseover.row = data.row
          this.eventInfo.mouseover.column = data.column

          if (this.eventInfo.isMouseDown) {//选择区域
            //记录矩形选择区域的四个边的位置
            this.eventInfo.top = Math.min(this.startPointRow, data.row)
            this.eventInfo.bottom = Math.max(this.startPointRow, data.row)
            this.eventInfo.left = Math.min(this.startPointColumn, data.column)
            this.eventInfo.right = Math.max(this.startPointColumn, data.column)

            for (let row = this.eventInfo.top; row <= this.eventInfo.bottom; row++) {
              for (let column = this.eventInfo.left; column <= this.eventInfo.right; column++) {

                let currPoint = [row, column].join(',')
                let index = this.selectRange.indexOf(currPoint)

                if (row <= this.selectRangeTemp.bottom
                  && row >= this.selectRangeTemp.top
                  && column <= this.selectRangeTemp.right
                  && column >= this.selectRangeTemp.left) {
                  if (index !== -1) this.selectRange.splice(index, 1)
                } else {//上一个选择区域外的，添加
                  if (index === -1) {//没添加过的
                    // this.$store.commit(types.dive.addSelectedItem, [row, column].join(','))
                    this.selectRange.push(currPoint)
                  } else {
                    continue
                  }
                }
              }
            }
          } else {//鼠标滑过
            this.eventInfo.top = this.eventInfo.bottom = data.row
            this.eventInfo.left = this.eventInfo.right = data.column
          }
        }
        if (data.event.type === 'mouseup') {
          this.eventInfo.isMouseDown = false
          this.selectRangeTemp.top = this.eventInfo.top
          this.selectRangeTemp.bottom = this.eventInfo.bottom
          this.selectRangeTemp.left = this.eventInfo.left
          this.selectRangeTemp.right = this.eventInfo.right
        }
      },
      /**
       * 鼠标移出日历表格
       */
      outTable() {
        this.eventInfo.mouseover.row
          = this.eventInfo.mouseover.column
          = this.eventInfo.top
          = this.eventInfo.bottom
          = this.eventInfo.left
          = this.eventInfo.right
          = 0
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .row {
    display: flex;
  }
</style>
