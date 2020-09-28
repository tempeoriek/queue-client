import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BAvatar, BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('b-avatar', BAvatar)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
