// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import './assets/scss/app.scss'

// 引入iview
Vue.config.productionTip = false;
Vue.use(iView);

import api from './http/api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

router.beforeEach((to,from,next)=>{
  // 加载进度条
  iView.LoadingBar.start();
  // needLogin 为空则为需要登录
  if(to.matched.length == 0){
    next('/homePage/menuPages/errorPage');
  }else{
    if(!to.meta.needLogin){
      let token = localStorage.getItem('token');
      if(!token){
        // 无token跳转login
        router.push('/loginPage')
      }else{
        next();
      }
    }else{
      next();
    }
  }
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
