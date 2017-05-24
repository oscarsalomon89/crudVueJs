<template>
  <div id="wraper" class="container">
      <div>
        <router-view></router-view>
      </div>
    </div><!--/.wraper -->
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
