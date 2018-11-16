import Vue from 'vue'
import Router from 'vue-router'

// home
const Home = r => require.ensure([], () => r(require('../views/layout/index.vue')), 'home')

const Gallery = r => require.ensure([], () => r(require('../views/gallery/index.vue')), 'gallery')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/',
          redirect: 'gallery/123'
        },
        {
          path: 'gallery/:album?',
          name: 'gallery',
          component: Gallery
        }
      ]
    },
    {
      path: '*',
      redirect: '/home/gallery'
    }
  ]
})
