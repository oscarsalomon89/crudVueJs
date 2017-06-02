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
      path: '/login',
      name: 'Login',
      /*beforeEnter: function(to, from, next) {
                auth.islogin(to, from, next);
      },*/
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      /*beforeEnter: function(to, from, next) {
                auth.islogin(to, from, next);
      },*/
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
    }
    ,
    {
      path: '/consultas',
      name: 'Contact',
      component: Contact
    }
  ]
});

//Esta funcion se ejecuta antes de redireccionar
routerApp.beforeEach((to, from, next) => {   
    Vue.http.get('/autorizar', {headers: {'Authorization': localStorage.getItem('id_token')}})
        .then(function(res){
                if(res.body.data == null){
                    next();
                }else{
                  next()
                }
            })
})

export default routerApp;
