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
