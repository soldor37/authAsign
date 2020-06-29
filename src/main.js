import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store.js'
import Axios from 'axios'
import Vuelidate from 'vuelidate'

import AuthPage from './components/AuthPage.vue'
import Users from './components/Users.vue'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const routes = [
  {
    path: '/auth',
    component: AuthPage,
    name: 'auth',
  },
  {
    path: '/users',
    component: Users,
    name: 'users',
    meta: {
      requiresAuth: true,
    }
  },
  { path: '*', redirect: '/users' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
 if(to.matched.some(record => record.meta.requiresAuth)){
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/auth')
  }
  else if (store.getters.isLoggedIn && to.name == "auth"){
    next('/users')
  }
  else next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
