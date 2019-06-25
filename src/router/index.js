import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/login/loginPage'

import homePage from '@/components/pages/homePage'
// ------------ ------------ 配置
import menuPages from '@/components/pages/menuPages/menuPages'
import errorPage from '@/components/pages/menuPages/errorPage/errorPage'
// ------------ 首页
import indexPage from '@/components/pages/menuPages/indexPage/indexPage'
// ------------ 系统设置
// 菜单管理
import menuSettingPage from '@/components/pages/menuPages/systemSettingPage/menuSettingPage'
// 用户管理
import userSettingPage from '@/components/pages/menuPages/systemSettingPage/userSettingPage'
// 机构管理
import teamSettingPage from '@/components/pages/menuPages/systemSettingPage/teamSettingPage'
// 角色管理
import roleSettingPage from '@/components/pages/menuPages/systemSettingPage/roleSettingPage'
// 操作日志
import logSettingPage from '@/components/pages/menuPages/systemSettingPage/logSettingPage'



// 设置
import settingPage from '@/components/pages/settingPage/settingPage'
// 帮助
import helpPage from '@/components/pages/helpPage/helpPage'
// 关于
import aboutPage from '@/components/pages/aboutPage/aboutPage'
// 个人中心
import userCenterPage from '@/components/pages/userCenterPage/userCenterPage'
// 消息
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
      component: loginPage,
      meta:{
        needLogin: true
      }
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      redirect: '/homePage/menuPages',
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
            },
            {
              path: '/homePage/menuPages/errorPage',
              name: 'errorPage',
              component: errorPage,
            },
            {
              path: '/homePage/menuPages/systemSettingPage/menuSettingPage',
              name: 'menuSettingPage',
              component: menuSettingPage
            },
            {
              path: '/homePage/menuPages/systemSettingPage/userSettingPage',
              name: 'userSettingPage',
              component: userSettingPage
            },
            {
              path: '/homePage/menuPages/systemSettingPage/teamSettingPage',
              name: 'teamSettingPage',
              component: teamSettingPage
            },
            {
              path: '/homePage/menuPages/systemSettingPage/roleSettingPage',
              name: 'roleSettingPage',
              component: roleSettingPage
            },
            {
              path: '/homePage/menuPages/systemSettingPage/logSettingPage',
              name: 'logSettingPage',
              component: logSettingPage
            },
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
