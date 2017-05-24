<template>
  <div>
  <Navbar></Navbar>
  <div class="jumbotron">

    <h1>Hello Vue</h1>
    <p>
      <strong>
        Get started by
        <router-link to="/contact">creating a time entry</router-link>.
      </strong>
    </p>
  </div>
  </div>
</template>
<script>
  import Navbar from './Navbar.vue';
  export default {
    components: { 'Navbar': Navbar }
  }
</script>
