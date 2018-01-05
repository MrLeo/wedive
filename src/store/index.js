/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 13:59:45
 * @Last Modified by: Leo
 * @Last Modified time: 2018-01-05 17:40:07
 */
// https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart/store

import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import base from './modules/base';
import dive from './modules/dive';

// import createLogger from 'vuex/dist/logger' //vuex内置的Logger日志插件
const debug = process.env.NODE_ENV !== 'production'; // 发布品种时需要用 Webpack 的 DefinePlugin 来转换 process.env.NODE_ENV !== 'production' 的值为 false

Vue.use(Vuex);

let state = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    base,
    dive
  },
  strict: debug // 开发阶段使用
  // plugins: debug ? [createLogger()] : []//vuex插件
});

// 热重载
// if (module.hot) {
//    // 使 mutations，modules ，actions 和 getters 成为可热重载模块
//    module.hot.accept([
//        './actions',
//        './getters'
//    ], () => {
//        // 获取更新后的模块
//        // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
//        // 成新的 mutation 和 mudule
//        store.hotUpdate({
//            actions: require('./actions').default,
//            getters: require('./getters').default
//        })
//    })
// }
