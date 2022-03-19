import { createStore } from 'vuex'

export default createStore({
  state: {
    userProfile: null,
    hasLogin: '',
    drawState: false,
    geometrydr: '',
  },
  mutations: {
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile
      if (userProfile == null) {
        state.hasLogin = false
      } else {
        state.hasLogin = true
      }
      console.log(state.hasLogin)
    },
    setDrawState(state, drawState) {
      state.drawState = drawState
    },
    setLoginState(state, loginState) {
      state.hasLogin = loginState
    },
    setgeometrydr(state, geometrydr) {
      console.log(789487);
      state.geometrydr = geometrydr
    },
  },
  actions: {
    getUserProfile({ commit }, profile) {
      const noProfile = null
      console.log(profile)
      profile ? commit('setUserProfile', profile) : commit('setUserProfile', noProfile)
    },
    getDrawState({ commit }, drawState) {
      commit('setDrawState', drawState)
    },
    getLoginState({ commit }, loginState) {
      commit('setLoginState', loginState)
    },
    getgeometrydr({ commit }, geometrydr) {
      console.log(444444);
      commit('setgeometrydr', geometrydr)
    },
  },
  modules: {},
})
