import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/login/loginPage'

import homePage from '@/components/pages/homePage'

import menuPages from '@/components/pages/menuPages/menuPages'
import indexPage from '@/components/pages/menuPages/indexPage/indexPage'

import settingPage from '@/components/pages/settingPage/settingPage'
import helpPage from '@/components/pages/helpPage/helpPage'
import aboutPage from '@/components/pages/aboutPage/aboutPage'
import userCenterPage from '@/components/pages/userCenterPage/userCenterPage'
import messagePage from '@/components/pages/messagePage/messagePage'



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
      redirect: '/homePage/menuPages',
      meta:{
        needLogin: true
      },
      children: [
        {
          path: '/homePage/menuPages',
          name: 'menuPages',
          component: menuPages,
          redirect: '/homePage/menuPages/indexPage',
          children: [
            {
              path: '/homePage/menuPages/indexPage',
              name: 'indexPage',
              component: indexPage
            }
          ]
        },
        {
          path: '/homePage/settingPage',
          name: 'settingPage',
          component: settingPage,
        },
        {
          path: '/homePage/helpPage',
          name: 'helpPage',
          component: helpPage,
        },
        {
          path: '/homePage/aboutPage',
          name: 'aboutPage',
          component: aboutPage,
        },
        {
          path: '/homePage/userCenterPage',
          name: 'userCenterPage',
          component: userCenterPage,
        },
        {
          path: '/homePage/messagePage',
          name: 'messagePage',
          component: messagePage,
        }
      ]
    }
  ]
})
