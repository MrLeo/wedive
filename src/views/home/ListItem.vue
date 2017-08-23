<template lang="pug">
  .block(@mousedown="mouse",@mouseup="mouse",@mouseover="mouse",:class="[classGetter,selectedGetter]")
</template>

<script>
  export default {
    props: ['row', 'column', 'eventInfo'],
    data: () => ({
      hover: false,
      currHover: false,
    }),
    computed: {
      classGetter() {
        return {
          //当前鼠标滑过的关联行列的高亮
          'hover': this.row == this.eventInfo.mouseover.row || this.column == this.eventInfo.mouseover.column,
          //当前鼠标滑过的高亮
          'curr-hover': this.row == this.eventInfo.mouseover.row && this.column == this.eventInfo.mouseover.column
        }
      },
      selectedGetter() {
        let se = {'selected': false}
        if (this.$store.state.dive.selected.indexOf([this.row, this.column].join(',')) !== -1) se['selected'] = true
        return se
      }
    },
    watch: {},
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
