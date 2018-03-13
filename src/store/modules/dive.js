/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 14:00:12
 * @Last Modified by: Leo
 * @Last Modified time: 2018-03-13 15:59:06
 */
import Vue from 'vue'
import { dive } from '../mutation-types'
import api from '../../utils/fetch'

const state = {
  selected: []
}

const getters = {}

const mutations = {
  [dive.addSelectedItem](state, selected) {
    state.selected.push(selected)
  },
  [dive.cleanSelected](state) {
    state.selected.splice(0, state.selected.length)
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
