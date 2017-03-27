import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index'
import history from '@/pages/history'
import comingSoon from '@/pages/comingSoon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/history',
      name: 'history',
      component: history
    },{
      path: '/comingSoon',
      name: 'comingSoon',
      component: comingSoon
    }
  ]
})
