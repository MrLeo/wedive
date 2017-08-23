import Vue from 'vue'
import {dive} from '../mutation-types'
import api from '../api'

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
