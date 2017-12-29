/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 14:00:42
 * @Last Modified by:   Leo
 * @Last Modified time: 2017-12-29 14:00:42
 */
<template lang="pug">
    .header header
        select(@change="changeLan",v-model="lan")
            option(value="zh-cn") zh-cn
            option(value="en") en
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import * as types from '@/store/mutation-types';

export default {
  name: 'Header',
  components: {},
  props: {},
  data: () => ({
    lan: 'zh-cn'
  }),
  created() {},
  mounted() {
    this.lan = window.localStorage.getItem('lan') || 'zh-cn';
  },
  watch: {},
  computed: {
    ...mapState({}),
    ...mapGetters({})
  },
  methods: {
    ...mapActions([]),
    ...mapMutations({}),
    changeLan(event) {
      this.$emit('changeLan', event.target.value); // 向父组件发送消息
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
