import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import router from './router'
import queue from './queue'
import components from './components'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Echo from 'laravel-echo'
import modeler from './modeler'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'
import MonacoEditor from 'vue-monaco'

// Boot Vue
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(queue)
Vue.use(components)
Vue.use(modeler)

const publicPath = "/modules/coredump/frontend/";
window.MonacoEnvironment = {
  getWorkerUrl() {
    return publicPath + 'editor.worker.js';
  },

}
Vue.component('monaco-editor', MonacoEditor)

// Boot axios
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.baseURL = '/api/data/'

// Boot dayjs
dayjs.locale('es')
dayjs.extend(relativeTime)
Vue.prototype.$dayjs = dayjs

// Get meta content by name
function meta(name) {
  let tag = document.head.querySelector('meta[name="' + name + '"]')
  return tag ? tag.content : null
}

//Boot Laravel Echo
let broadcasterHost = meta("broadcaster-host")
if (broadcasterHost) {
  window.io = require('socket.io-client')

  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: meta("broadcaster-host"),
    key: meta("broadcaster-key"),
  })
}

// Format Number
Vue.prototype.$formatNumber = (number) => {
  return Number(number).toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
}

// Mock translations
const trans = require('../resources/lang/es.json')
Vue.prototype.__ = (text, ...args) => {
  return (trans[text] || String(text)).replace(/:(\w)/g, (ma) => args[ma[1]])
}
Vue.prototype.$t = Vue.prototype.__

// Boot workflow
Vue.prototype.$completeTask = function (token, data = {}) {
  return this.$root.bpmn.complete(data, token.id);
}
Vue.prototype.$callProcess = function (bpmn, processId, data = {}) {
  return this.$root.bpmn.$instance.call(null, 'callProcess', { bpmn, processId, data })
}
Vue.prototype.$cancelInstance = function (instance) {
  return this.$root.bpmn.$instance.call(instance.id, 'cancel', {})
}
Vue.prototype.$instanceScreen = function (instanceId) {
  return this.$root.bpmn.$instance.call(instanceId, 'getScreen', {})
}
Vue.prototype.$instance = function (instanceId, params) {
  params.t = new Date().getTime();
  return this.$root.bpmn.$instance.load(instanceId, params);
}
Vue.prototype.$findInstances = function (params) {
  return this.$root.bpmn.$instance.index(params);
}
Vue.prototype.$process = function (bpmn, processId) {
  return this.$root.bpmn.$instance.call(null, 'getProcess', { bpmn, processId });
}
Vue.prototype.$tokens = function () {
  return this.$root.bpmn.$tokens;
}
Vue.prototype.$listenInstanceUpdate = function (instance, owner, method) {
  this.$root.addListener(`Process.${instance.id}`, '.ProcessUpdated', owner, method);
}
Vue.prototype.$listenInstanceEvent = function (instance, event, owner, method) {
  this.$root.addListener(`Process.${instance.id}`, event, owner, method);
}
Vue.prototype.$removeOwnerListeners = function (owner) {
  this.$root.removeOwnerListeners(owner);
}
Vue.prototype.$sendMessage = function (instance, targetId, messageId, data = {}) {
  return this.$root.bpmn.$instance.call(instance.id, 'sendMessage', { targetId, messageId, data });
}
Vue.prototype.$cancelInstance = function (instance) {
  return this.$root.bpmn.$instance.call(instance.id, 'cancel', {});
}

// Publish globals
window.router = router
window.userId = meta('user-id')
