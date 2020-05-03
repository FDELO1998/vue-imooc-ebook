import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import './utils/boost'
import './utils/create-api'
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

