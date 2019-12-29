import homeLeft from './home/home-left.vue'
import homeHeader from './home/home-header.vue'
import crumb from './common/crumb.vue' // 全局注册面包屑
import { quillEditor } from 'vue-quill-editor' // 富文本编辑器
import CoverImage from './publish/cover-image.vue'
// import { Form } from 'element-ui'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('home-left', homeLeft)
    Vue.component('home-header', homeHeader)
    Vue.component('crumb', crumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', CoverImage)
  }
}
