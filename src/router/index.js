import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
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
    { path: '*', redirect: '/' },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/about',
      name: 'About',
      beforeEnter: function(to, from, next) {
                auth.requireAuth(to, from, next);
            },
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      //beforeEnter: requireAuth,
      component: Contact
    }
  ]
});


/*routerApp.beforeEach(function (transition) {
        // if route requires auth and user isn't authenticated
        alert('hola');
        return;
})*/

export default routerApp;
