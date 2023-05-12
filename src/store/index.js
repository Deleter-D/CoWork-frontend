import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    username: null
  },
  getters: {
    GET_TOKEN (state) {
      state.token = localStorage.getItem('token')
      return state.token
    },
    GET_USERNAME (state) {
      state.username = localStorage.getItem('username')
      return state.username
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    SET_USERNAME (state, username) {
      localStorage.setItem('username', username)
      state.username = username
    }
  },
  actions: {},
  modules: {}
})
