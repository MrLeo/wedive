/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 14:00:07
 * @Last Modified by:   Leo
 * @Last Modified time: 2017-12-29 14:00:07
 */
import Vue from 'vue';
import { base } from '../mutation-types';
import api from '../api';

const state = {
  version: '',
  token: null,
  user: {
    id: '',
    name: '',
    pwd: '',
    photo: ''
  }
};

const getters = {
  versionGetter(state, getters) {
    return state.version;
  }
};

const mutations = {
  [base.userInfo](state, userInfo) {
    userInfo.id && (state.user.id = userInfo.id);
    userInfo.name && (state.user.name = userInfo.name);
    userInfo.pwd && (state.user.pwd = userInfo.pwd);
    userInfo.photo && (state.user.photo = userInfo.photo);
  }
};

const actions = {
  login({ state, dispatch, commit, rootState }, { username, password }) {
    api.login('login', { username, password }).then(data => {
      commit(base.userInfo, {
        id: data.id,
        name: data.username,
        pwd: data.password,
        photo: data.photo
      });
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
