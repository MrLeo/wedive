/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 13:58:33
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-29 14:50:00
 */
/*                     _ooOoo_
 *                    o8888888o
 *                    88" . "88
 *                    (| -_- |)
 *                    O\  =  /O
 *                 ____/`---'\____
 *               .'  \\|     |//  `.
 *              /  \\|||  :  |||//  \
 *             /  _||||| -:- |||||-  \
 *             |   | \\\  -  /// |   |
 *             | \_|  ''\---/''  |   |
 *             \  .-\__  `-`  ___/-. /
 *           ___`. .'  /--.--\  `. . __
 *        ."" '<  `.___\_<|>_/___.'  >'"".
 *       | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *       \  \ `-.   \_ __\ /__ _/   .-` /  /
 *  ======`-.____`-.___\_____/___.-`____.-'======
 *                     `=---='
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *              佛祖保佑       永无BUG
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App';
import router from './router';
import store from './store/';
import * as filters from './utils/filters';
import fetch from './utils/fetch';
import lan from './utils/language';
// import 'babel-polyfill'

Vue.config.productionTip = false;

/* 全局注册fetch */
Vue.prototype.$fetch = fetch;

/* 注册全局过滤器 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

/* 国际化，默认中文(zh-cn) */
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh-cn',
  messages: lan
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
});
