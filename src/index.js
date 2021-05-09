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

Vue.prototype.$completeTask = (token, data = {}) => {
  return app.bpmn.complete(data, token.id);
}
Vue.prototype.$callProcess = (bpmn, processId, data = {}) => {
  return app.bpmn.$instance.call(null, 'callProcess', {bpmn, processId, data})
}
Vue.prototype.$instance = (instanceId, params) => {
  return app.bpmn.$instance.load(instanceId, params);
}
Vue.prototype.$findInstances = (params) => {
  return app.bpmn.$instance.index(params);
}
Vue.prototype.$process = (bpmn, processId) => {
  return app.bpmn.$instance.call(null, 'getProcess', {bpmn, processId});
}
Vue.prototype.$tokens = () => {
  return app.bpmn.$tokens;
}

window.addEventListener('load', () => {
  app = new Vue({
    mixins: [window.WorkflowMixin, window.ResourceMixin],
    router,
    render: h => h(App)
  }).$mount('#app')
  window.app = app
});
