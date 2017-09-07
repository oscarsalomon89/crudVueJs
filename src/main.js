import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'

Vue.use(VueFire)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
