/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 13:59:10
 * @Last Modified by:   Leo
 * @Last Modified time: 2017-12-29 13:59:10
 */
<template lang="pug">
  .block(@mousedown="mouse",@mouseup="mouse",@mouseover="mouse",:class="[classGetter,selectedGetter]")
    span(v-if="showPop") pop
</template>

<script>
export default {
  props: ['row', 'column', 'eventInfo', 'selectRange'],
  data: () => ({
    showPop: false,
    hover: false,
    currHover: false
  }),
  computed: {
    classGetter() {
      return {
        hover: this.row === this.eventInfo.mouseover.row || this.column === this.eventInfo.mouseover.column, // 关联横纵坐标高亮
        'curr-hover': this.row === this.eventInfo.mouseover.row && this.column === this.eventInfo.mouseover.column // 鼠标点高亮
      };
    },
    selectedGetter() {
      // return {'selected': this.$store.state.dive.selected.indexOf([this.row, this.column].join(',')) !== -1}
      return { selected: this.selectRange.indexOf([this.row, this.column].join(',')) !== -1 };
    }
  },
  watch: {
    'eventInfo.event': function(val, oldVal) {
      if (val.type === 'mouseup') {
        let lastSelected = this.selectRange[this.selectRange.length - 1];
        if (lastSelected) {
          let lastSelecteds = lastSelected.split(',');
          if (this.row === lastSelecteds[0] && this.column === lastSelecteds[1]) {
            this.showPop = true;
          } else {
            this.showPop = false;
          }
        } else {
          this.showPop = false;
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    /**
       * 鼠标事件
       * @param event
       */
    mouse(event) {
      this.$emit('mouseOverBlockItem', { row: this.row, column: this.column, event }); // 向父组件传递事件通知
    }
  }
};
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
