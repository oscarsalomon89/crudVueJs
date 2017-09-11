import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'
import store from './vuex/store'

Vue.use(VueFire)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
