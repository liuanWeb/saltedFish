// 封装 axios
import axios from 'axios';
import QS from 'qs';
import Message from 'iview/src/components/message'


// 环境的切换
axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(
config => {
  // 每次发送请求之前判断vuex中是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  let Token = localStorage.getItem('token');
  // console.log(Token);
  if(Token){
    config.headers['token'] = Token;
  }
  return config;
},
error => {
  return Promise.error(error);
});

axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if(!(response.data.code == '1')){
        Message.error(response.data.msg);
        // console.log(response.data.msg);
      }
      return Promise.resolve(response);
    } else {
      Message.error('网络异常');
      return Promise.reject(response);
    }
  },
  error => {
    if (error) {
      // this.$Message.error('网络异常');
      return Promise.reject(error);
    }
});

 // * get方法，对应get请求
 // * @param {String} url [请求的url地址]
 // * @param {Object} params [请求时携带的参数]
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, QS.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });
}

// * post方法，对应post请求
// * @param {String} url [请求的url地址]
// * @param {Object} params [请求时携带的参数]
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err)
      })
  });
}

