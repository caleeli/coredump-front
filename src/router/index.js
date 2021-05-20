import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/open/:instanceId',
    name: 'open',
    component: () => import(/* webpackChunkName: "about" */ '../views/Open.vue')
  },
  {
    path: '/list/:bpmn',
    name: 'process.list',
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
