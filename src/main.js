import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './assets/style/index.less'

import plugins from './plugins/index'

Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
