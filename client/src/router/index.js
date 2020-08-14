import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Thankyou from '@/views/Thankyou'
import List from '@/views/List'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/thank-you',
      name: 'Thankyou',
      component: Thankyou,
    },
    {
      path: '/list11customer11event11eunoia',
      name: 'List',
      component: List,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})
