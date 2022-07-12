import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import runtime from './modules/runtime'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    runtime
  },
  getters
})

export default store
