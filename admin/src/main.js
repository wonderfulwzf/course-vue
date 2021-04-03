import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import filter from './filter/filter';

Vue.config.productionTip = false;
//设置vue的全局变量
Vue.prototype.$ajax = axios;

//解决session不一致问题
axios.defaults.withCredentials = true;

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


//全局过滤器
Object.keys(filter).forEach(key =>{
  Vue.filter(key,filter[key])
});

// 路由登录拦截
router.beforeEach((to, from, next) => {
  // 要不要对meta.loginRequire属性做监控拦截
  if (to.matched.some(function (item) {
    return item.meta.loginRequire
  })) {
    let loginUser = Tool.getLoginUser();
    if (Tool.isEmpty(loginUser)) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

//打印环境信息
console.log("环境",process.env.NODE_ENV)



