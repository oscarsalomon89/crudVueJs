import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Pedidos from '../components/Pedidos.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import auth from '../auth/auth.js'

Vue.use(Router)
Vue.use(VueResource)

/*Vue.http.interceptors.push((request, next) => {
  request.headers['Authorization'] = 'hello'
  request.headers['Accept'] = 'application/json'
  next()
})*/

var routerApp = new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/inicio' },
    {
      path: '/inicio',
      name: 'Home',
      beforeEnter: function(to, from, next) {
                auth.requireAuth(to, from, next);
            },
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: function(to, from, next) {
                auth.islogin(to, from, next);
            },
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/productos',
      name: 'About',
      beforeEnter: function(to, from, next) {
                auth.requireAuth(to, from, next);
            },
      component: About
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      beforeEnter: function(to, from, next) {
                auth.requireAuth(to, from, next);
            },
      component: Pedidos
    }
    ,
    {
      path: '/consultas',
      name: 'Contact',
      beforeEnter: function(to, from, next) {
                auth.requireAuth(to, from, next);
            },
      component: Contact
    }
  ]
});

export default routerApp;
