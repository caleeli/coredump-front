import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Mock translations
const trans = require('../resources/lang/es.json')
Vue.prototype.__ = (text, ...args) => {
  return (trans[text] || text).replace(/:(\w)/g, (ma) => args[ma[1]])
}

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
