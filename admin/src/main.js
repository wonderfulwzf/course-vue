import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false;
//设置vue的全局变量
Vue.prototype.$ajax = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
