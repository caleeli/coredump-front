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
  //queue.eventBus.notify('router', {path: '/login'})
}, 0)
Vue.prototype.$sessionToken = {
  instanceId: 1,
};
Vue.prototype.$complete = (token) => {
  if (token.instanceId === 1) {
    setTimeout(() => {
      queue.eventBus.notify('router', { path: '/about' })
    }, 200)
  }
}

Vue.prototype.$sendMessage = () => {
}

Vue.prototype.$completeTask = (token, data = {}) => {
  return app.bpmn.complete(data, token.id);
}
Vue.prototype.$callProcess = (bpmn, processId, data = {}) => {
  return app.bpmn.$instance.call(null, 'callProcess', { bpmn, processId, data })
}
Vue.prototype.$instance = (instanceId, params) => {
  return app.bpmn.$instance.load(instanceId, params);
}
Vue.prototype.$findInstances = (params) => {
  return app.bpmn.$instance.index(params);
}
Vue.prototype.$process = (bpmn, processId) => {
  return app.bpmn.$instance.call(null, 'getProcess', { bpmn, processId });
}
Vue.prototype.$tokens = () => {
  return app.bpmn.$tokens;
}
Vue.prototype.$listenInstanceUpdate = (instance, owner, method) => {
  app.addListener(`Process.${instance.id}`, '.ProcessUpdated', owner, method);
}
Vue.prototype.$removeOwnerListeners = (owner) => {
  app.removeOwnerListeners(owner);
}


window.addEventListener('load', () => {
  app = new Vue({
    mixins: [window.WorkflowMixin, window.ResourceMixin],
    router,
    render: h => h(App),
    data() {
      return {
        bpmnListeners: [],
        bpmnEvents: [],
      };
    },
    methods: {
      bpmnEventCatch(channel, event, payload) {
        this.bpmnListeners.filter(bl => bl.channel === channel && bl.event === event)
          .forEach(bl => (bl.method instanceof Function ? bl.method : bl.owner[bl.method])({channel, event, payload}));
      },
      addListener(channel, event, owner, method) {
        const eventChannel = this.bpmnEvents.find(sl => sl.channel == channel && sl.event == event);
        if (!eventChannel) {
          this.addSocketListener(channel, event, (payload) => this.bpmnEventCatch(channel, event, payload));
          this.bpmnEvents.push({ channel, event });
        }
        this.bpmnListeners.push({ channel, event, owner, method });
      },
      removeOwnerListeners(owner) {
        this.bpmnListeners = this.bpmnListeners.filter(bl => bl.owner !== owner);
        const remove = this.bpmnEvents.filter(be => this.bpmnListeners.filter(bl => be.channel === bl.channel && be.event === bl.event).length === 0);
        remove.forEach(be => this.removeEvent(be));
      },
      removeEvent(bpmnEvent) {
        this.bpmnEvents.splice(this.bpmnEvents.indexOf(bpmnEvent), 1);
        this.removeSocketListener(bpmnEvent.channel, bpmnEvent.event);
      },
    },
  }).$mount('#app')
  window.app = app
});
