import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './styles/element-variables.scss'
import removeIcon from '@/components/icons/removeIcon'
import router from './router'
import store from './store'
import { ElDatePicker } from 'element-plus'
import VueClipboard from 'vue3-clipboard'
import directives from '@/directives'
import './styles/main.scss'
import VueLoading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/css/index.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueColumnsResizable from 'vue-columns-resizable'

// import { req } from 'vuelidate/lib/validators/common'
require('@/assets/css/style.css')
require('@/assets/css/temporary.css')
require('@/assets/css/media.css')
require('@/assets/css/global.css')
require('@/assets/css/scenarios.css')
require('@vueform/multiselect/themes/default.css')
// require('element-plus/theme-chalk/src/base.scss')
require('element-plus/packages/theme-chalk/src/base.scss')

const globalSettings = {
  // harpUiVersion: '1.0.12'
}

const app = createApp(App, globalSettings).use(store).use(router).use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true
}).use(VueColumnsResizable)
app.component('loading', VueLoading)
app.component(ElDatePicker.name, ElDatePicker)
app.component('remove-icon', removeIcon)
app.config.globalProperties.uiVersion = '1.0.13'
directives(app)
app.mount('#app')
