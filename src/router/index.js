import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Pedidos from '../components/Pedidos.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Clientes from '../components/Clientes.vue'
import auth from '../auth/auth.js'
import * as firebase from "firebase";

Vue.use(Router)
Vue.use(VueResource)

var routerApp = new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/inicio' },
    {
      path: '/inicio',
      name: 'Home',
      component: Home
    },
    {
      path: '/clientes',
      name: 'Clientes',
      /*beforeEnter: function(to, from, next) {
                auth.requireAuth(to, from, next);
      },*/
      component: Clientes
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
      path: '/productos',
      name: 'About',
      component: About
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: Pedidos
    },
    {
      path: '/consultas',
      name: 'Contact',
      component: Contact
    }
  ]
});

//Esta funcion se ejecuta antes de redireccionar
routerApp.beforeEach((to, from, next) => {    
    firebase.auth().onAuthStateChanged((user) => {
      if(user) { 
        if(to.name != 'Login'){
          next();
        }else{
          next('/inicio');
        }
      } else {
        //No esta logueado
        if(to.name == 'Login'){
          next();
        }else{
          next('/login')
        }
      }
     })
})

export default routerApp;
