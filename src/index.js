import Vue from 'vue'
import './bootstrap'
import App from './App.vue'
import router from './router'
import queue from './queue'

// Mock translations
const trans = require('../resources/lang/es.json')
Vue.prototype.__ = (text, ...args) => {
  return (trans[text] || text).replace(/:(\w)/g, (ma) => args[ma[1]])
}

// Mock Flows
let app
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

Vue.prototype.$sendMessage = () => {
}

Vue.prototype.$complete = (token) => {
  if (token.instanceId === 1) {
    setTimeout(() => {
      queue.eventBus.notify('router', { path: '/about' })
    }, 200)
  }
}
Vue.prototype.$callProcess = (processId, data) => {
  //this.bpmn = new window.Bpmn({
  //  $owner: this,
  //});
  console.log(app, processId, data)
}

window.addEventListener('load', () => {
  app = new Vue({
    mixins: [window.workflowMixin],
    router,
    render: h => h(App)
  }).$mount('#app')
  window.app = app
});
