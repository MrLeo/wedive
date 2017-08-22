import Vue from 'vue'
import {dive} from '../mutation-types'
import api from '../api'

const state = {
  selected: []
}

const getters = {}

const mutations = {
  [dive.addSelected](state, selected) {
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
