<template lang="pug">
  .block(@mousedown="mouse",@mouseup="mouse",@mouseover="mouse",:class="[{'selected':selected},classGetter]") {{row}}/{{column}}
</template>

<script>
  export default {
    props: ['row', 'column', 'eventInfo'],
    data: () => ({
      hover: false,
      currHover: false,
      selected: false
    }),
    computed: {
      classGetter() {
        return {
          //当前鼠标滑过的关联行列的高亮
          'hover': this.row == this.eventInfo.mouseover.row || this.column == this.eventInfo.mouseover.column,
          //当前鼠标滑过的高亮
          'curr-hover': this.row == this.eventInfo.mouseover.row && this.column == this.eventInfo.mouseover.column
        }
      }
    },
    watch: {
      eventInfo: function (val, oldVal) {
        console.log('eventInfo change', val)
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      /**
       * 鼠标事件
       * @param event
       */
      mouse(event) {
        //向父组件传递事件通知
        this.$emit('mouseOverBlockItem', {row: this.row, column: this.column, event})
        if (event.type == 'mousedown'
          || event.type == 'mouseover' && (this.eventInfo.mousedown.row || this.eventInfo.mousedown.column)) {
          this.selected = !this.selected
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 50px;
    height: 50px;
    border: 1px solid #efefef;
    &.hover {
      background-color: #efefef;
    }
    &.curr-hover {
      background-color: #666666;
    }
    &.selected {
      background-color: #f00;
    }
  }
</style>
