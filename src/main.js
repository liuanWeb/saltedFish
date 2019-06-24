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



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
