import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false;
//设置vue的全局变量
Vue.prototype.$ajax = axios;


/**
 * axios拦截器
 */
axios.interceptors.request.use(function (config){
  console.log("请求",config)
  return config;
},error=>{})// eslint-disable-line no-unused-vars
axios.interceptors.response.use(function (response){
  console.log("响应",response)
  return response;
},error=>{})// eslint-disable-line no-unused-vars

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
