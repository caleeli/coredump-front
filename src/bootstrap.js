import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import router from './router'
import queue from './queue'
import components from './components'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Boot Vue
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(queue)
Vue.use(components)

// Publish global components
window.router = router
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = '/api/data/';
