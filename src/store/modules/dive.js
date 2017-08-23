import Vue from 'vue'
import {dive} from '../mutation-types'
import api from '../api'

const state = {
  selected: []
}

const getters = {}

const mutations = {
  [dive.addSelected](state, selected) {
    //selected为空则清空列表
    if (!selected || selected.length <= 0) {
      state.selected.splice(0, state.selected.length)
      return
    }
    //删除已存在的
    let index = state.selected.indexOf(selected)
    if (index !== -1) {
      state.selected.splice(index, 1)
      return
    }
    //添加不存在
    state.selected.push(selected)
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
