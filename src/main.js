import Vue from 'vue'
import './bootstrap'
import App from './App.vue'
import router from './router'
import queue from './queue'

Vue.use(queue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
