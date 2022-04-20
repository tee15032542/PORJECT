import { createStore } from "vuex";

export default createStore({
  state: {
    userProfile: null,
    hasLogin: "",
    drawState: false,
    drawStep: "", // start, end, confirm
    geometrydr: "",
    geometry: [],
    userdataall: [],
  },
  // getters: {
  //   getAllGeometry: (state) => {
  //     return state.geometry;
  //   },
  // },
  mutations: {
    setDrawStep(state, step) {
      state.drawStep = step;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
      if (userProfile == null) {
        state.hasLogin = false;
      } else {
        state.hasLogin = true;
      }
      console.log(state.hasLogin);
    },
    setDrawState(state, drawState) {
      state.drawState = drawState;
    },
    setLoginState(state, loginState) {
      state.hasLogin = loginState;
    },
    setgeometrydr(state, geometrydr) {
      state.geometrydr = geometrydr;
    },
    setuserdataall(state, userdataall) {
      state.userdataall = userdataall;
    },
    setgeometry(state, geometry) {
      //console.log("setgeometry", geometry);
      state.geometry = geometry;
      // geometry.forEach(data => {
      //   console.log(data)
      //   state.geometry.push(data)
      // })
    },
  },
  actions: {

    getUserProfile({ commit }, profile) {
      const noProfile = null;
      console.log(profile);
      profile
        ? commit("setUserProfile", profile)
        : commit("setUserProfile", noProfile);
    },
    getDrawState({ commit }, drawState) {
      commit("setDrawState", drawState);
    },
    getLoginState({ commit }, loginState) {
      commit("setLoginState", loginState);
    },
    getgeometrydr({ commit }, geometrydr) {
      commit("setgeometrydr", geometrydr);
    },
    getgeometry({ commit }, geometry) {
      //console.log("getGeometry", geometry);
      commit("setgeometry", geometry);
    },
    putDrawStep({ commit }, step) {
      commit("setDrawStep", step);
    },
    getuserdataall({ commit }, userdataall) {
      commit("setuserdataall", userdataall);
    },
  },
  modules: {},
});
