import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import queue from './queue'

// Mock translations
const trans = require('../resources/lang/es.json')
Vue.prototype.__ = (text, ...args) => {
  return (trans[text] || text).replace(/:(\w)/g, (ma) => args[ma[1]])
}

// Install plugins
Vue.use(BootstrapVue)
Vue.use(queue)

// Mock Flows
setTimeout(() => {
  queue.eventBus.notify('router', {path: '/login'})
}, 0)
Vue.prototype.$sessionToken = {
  instanceId: 1,
};
  Vue.prototype.$complete = (token) => {
  if (token.instanceId === 1) {
    setTimeout(() => {
      queue.eventBus.notify('router', {path: '/about'})
    }, 200)
  }
}
Vue.prototype.$callProcess = () => {
}
Vue.prototype.$sendMessage = () => {
}
