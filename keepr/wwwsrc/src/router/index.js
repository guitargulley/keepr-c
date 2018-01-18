import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import vaults from '@/components/Vaults'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/vaults/:id',
      name: 'vaults',
      component: vaults
    }
  ]
})