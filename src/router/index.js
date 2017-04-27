import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'

Vue.use(Router)
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  request.headers['Authorization'] = 'hello'
  request.headers['Accept'] = 'application/json'
  next()
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
    ,
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})