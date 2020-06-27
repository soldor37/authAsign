import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import AuthPage from './components/AuthPage.vue'
import Users from './components/Users.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { 
    path: '/auth',
    component: AuthPage,
    name: 'auth',
    // meta: { 
    //   requiresAuth: true,
    //   is_admin: true
    // } 
  },
  { 
    path: '/users',
    component: Users,
    name: 'users',
    // meta: { 
    //   requiresAuth: true,
    //   is_admin: true
    // } 
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
