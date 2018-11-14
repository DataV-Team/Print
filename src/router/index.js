import Vue from 'vue'
import Router from 'vue-router'

// home
const Home = r => require.ensure([], () => r(require('../views/layout/index.vue')), 'home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: []
    }
  ]
})
