import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/login/loginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    }
  ]
})
