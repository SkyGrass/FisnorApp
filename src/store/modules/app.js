const state = {
  model: {
    accountId: '',
    accountName: '',
    accountDate: '',
    loginName: '',
    loginUserId: '',
    pwd: '',
    key: ''
  }
}
const mutations = {
  SET_MODEL(state, model) {
    MyLStorage.set('model', model);

    state.model.accountId = model.accountId
    state.model.accountName = model.accountName
    state.model.accountDate = model.accountDate
    state.model.loginName = model.loginName
    state.model.loginUserId = model.loginUserId
    state.model.pwd = model.pwd
    state.model.key = model.key
  }
}
const actions = {
  setModel({ commit }, arg) {
    commit('SET_MODEL', arg)
  }
}
export default {
  state,
  mutations,
  actions
}
