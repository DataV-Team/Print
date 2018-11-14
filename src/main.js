import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// import global style
import './assets/style/index.less'

// import global components
import globalComponents from './components/index'

//  import plugins
import plugins from './plugins/index'

Vue.use(globalComponents)

Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
