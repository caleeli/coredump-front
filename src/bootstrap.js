import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import router from './router'
import queue from './queue'
import components from './components'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Echo from 'laravel-echo';

// Boot Vue
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(queue)
Vue.use(components)

// Get meta content by name
function meta(name) {
  let tag = document.head.querySelector('meta[name="' + name + '"]');
  return tag ? tag.content : null;
}

//Boot Laravel Echo
let broadcasterHost = meta("broadcaster-host");
if (broadcasterHost) {
  window.io = require('socket.io-client');

  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: meta("broadcaster-host"),
    key: meta("broadcaster-key"),
  });
}

// Publish global components
window.router = router
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = '/api/data/';
