import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/login/loginPage'
import homePage from '@/components/pages/homePage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      meta:{
        needLogin: true
      },
      children: [

      ]
    }
  ]
})
