/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 13:58:41
 * @Last Modified by:   Leo
 * @Last Modified time: 2017-12-29 13:58:41
 */
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    // 从本地缓存获取并设置语言版本
    this.$i18n.locale = window.localStorage.getItem('lan') || window.localStorage.setItem('lan', 'zh-cn') || 'zh-cn';
    console.log(this.$i18n.locale);
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import './assets/scss/base';
</style>
