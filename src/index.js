import Vue from 'vue'
import './bootstrap'
import App from './App.vue'
import router from './router'
//import queue from './queue'

// Mock Flows

window.addEventListener('load', () => {
  Vue.mixin(window.ResourceMixin);
  const app = new Vue({
    mixins: [window.WorkflowMixin, window.ResourceMixin],
    router,
    render: h => h(App),
    data() {
      return {
        user: this.$api.user.row(window.userId),
        bpmnListeners: [],
        bpmnEvents: [],
      };
    },
    methods: {
      bpmnEventCatch(channel, event, payload) {
        this.bpmnListeners.filter(bl => bl.channel === channel && bl.event === event)
          .forEach(bl => (bl.method instanceof Function ? bl.method : bl.owner[bl.method])({ channel, event, payload }));
      },
      addListener(channel, event, owner, method) {
        const eventChannel = this.bpmnEvents.find(sl => sl.channel == channel && sl.event == event);
        if (!eventChannel) {
          this.addSocketListener(channel, event, (payload) => {
            this.bpmnEventCatch(channel, event, payload)
          });
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
