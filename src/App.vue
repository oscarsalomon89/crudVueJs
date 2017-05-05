<template>
  <div id="wraper" class="container">
      <Navbar></Navbar>
      <div>
        <router-view></router-view>
      </div>
    </div><!--/.wraper -->
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: { 'Navbar': Navbar },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
