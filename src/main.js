import Vue from 'vue'
import App from './App.vue'
import './permission/index'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import Component from './components/index'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.use(ElementUI)
Vue.use(Component)
Vue.config.productionTip = false

Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
