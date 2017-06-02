<template>
    <div>
    <Navbar></Navbar>
    <form class="form-horizontal">
    <div class="form-group">
    <label for="cliente" class="col-sm-2 control-label">Cliente</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="cliente" placeholder="Nombre Cliente">
    </div>
  </div>
  <div class="form-group">
    <label for="email" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="email" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Consulta</label>
    <div class="col-sm-10">
      <textarea class="form-control" rows="5"></textarea>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Enviar Consulta</button>
    </div>
  </div>
    </form>
    </div>
</template>
<script>
  import Navbar from './Navbar.vue';
  export default {
    components: {'Navbar': Navbar }
  }
</script>