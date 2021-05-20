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

// Publish globals
window.router = router
window.userId = meta('user-id')
