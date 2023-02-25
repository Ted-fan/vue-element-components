
const state = {
  notifications: [],
  showProductDetail: {
    showProductDetailDialog: false,
    productId: ''
  } // 是否显示产品详情弹窗
}

const mutations = {
  SET_NOTIFICATIONS: (state, notifications) => {
    state.notifications = notifications
  },
  // 是否显示产品详情弹窗
  SHOW_PRODUCT_DETAIL: (state, { showProductDetailDialog, productId }) => {
    state.showProductDetail.showProductDetailDialog = showProductDetailDialog
    state.showProductDetail.productId = productId
  }
}

const actions = {
  // 消息弹窗三条数组
  showNotifications({ commit }, notifications) {
    commit('SET_NOTIFICATIONS', notifications)
  },
  showProductDetail({ commit }, { showProductDetailDialog, productId }) {
    commit('SHOW_PRODUCT_DETAIL', { showProductDetailDialog, productId })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
