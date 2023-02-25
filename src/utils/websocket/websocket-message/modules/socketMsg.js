// import store from "@/store";

const state = {
  receiveMsg: ''
}

const mutations = {
  SET_RECEIVE_MSG: (state, receiveMsg) => {
    state.receiveMsg = receiveMsg
  }
}

/* const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginByUsername(userInfo.username.trim(), userInfo.password).then(response => {
        commit('SET_NAME', response.data.trueName); // 设置用户名
        setToken(response.data.token); // 设置token
        setUserInfo(response.data);
        setPassword(response.data.isDefaultPwd); // 保存是否为默认密码
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    })
  }
} */

export default {
  namespaced: true,
  state,
  mutations
  // actions
}
