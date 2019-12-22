import homeLeft from './home/home-left.vue'
import homeHeader from './home/home-header.vue'
import crumb from './common/crumb.vue' // 全局注册面包屑
export default {
  install (Vue) {
    Vue.component('home-left', homeLeft)
    Vue.component('home-header', homeHeader)
    Vue.component('crumb', crumb)
  }
}
