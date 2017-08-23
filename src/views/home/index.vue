<template lang="pug">
  .page.page-current
    div 国际化信息：{{ $t("signIn") }}
    .table(@mouseout="outTable")
      .row(v-for="(row,rIndex) in rowsGetter")
        template(v-for="(column,cIndex) in date.list")
          v-column-item(:key="cIndex",:row='rIndex+1',:column="cIndex+1",:eventInfo="eventInfo",@mouseOverBlockItem="mouse")
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
      eventInfo: {
        mouseover: {
          row: 0,
          column: 0
        },
        mousedown: {
          row: 0,
          column: 0
        },
        mouseup: {
          row: 0,
          column: 0
        }
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
        this.eventInfo[data.event.type].row = data.row
        this.eventInfo[data.event.type].column = data.column
        if (data.event.type == 'mouseup') {
          this.eventInfo.mousedown.row = 0
          this.eventInfo.mousedown.column = 0
        } else if (event.type == 'mousedown'
          || event.type == 'mouseover' && (this.eventInfo.mousedown.row || this.eventInfo.mousedown.column)) {
          this.$store.commit(types.dive.addSelected, [data.row, data.column].join(','))
        }
      },
      /**
       * 鼠标移出日历表格
       */
      outTable() {
        this.eventInfo.mouseover.row = 0
        this.eventInfo.mouseover.column = 0
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .row {
    display: flex;
  }
</style>
