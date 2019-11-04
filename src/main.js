import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/css/style.css'
import './assets/css/font-awesome.min.css'
import axios from 'axios'
import bus from './bus'
Vue.config.productionTip = false


// 请求拦截
axios.interceptors.request.use(config=>{
  // console.log(config)
  if(localStorage.getItem('token')){
    config.headers.Authorization='Bearer ' +localStorage.getItem('token')
  }
  return config
})


// 响应拦截

axios.interceptors.response.use(res=>{
  // console.log(res);
  if(res.data.res_code===401){
    alert('请登录')
    bus.$emit('logout')
  }
  return res
})

console.log(process.env);



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
