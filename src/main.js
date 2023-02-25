import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/theme/index.css'
import '@/styles/index.scss' // global css
import '@/assets/custom-icon/iconfont.css' // custom icon

import App from './App'
import store from './store'
import router from './router'
import uploader from 'vue-simple-uploader'
import '@/icons' // icon
import '@/permission' // permission control

const G2 = require('@antv/g2')
Vue.prototype.$G2 = G2

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(uploader)
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'mini' // set element-ui default size
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
