<template>
    <form v-on:submit.prevent class="form-horizontal">
        <input type="hidden" v-bind:value="user.id" id="iduser" name="iduser">
        <div class="form-group">
        <label for="inputUser" class="col-sm-4 control-label">Usuario</label>
        <div class="col-sm-8">
            <input type="text" v-bind:value="user.name" class="form-control" id="inputUser" placeholder="Nombre usuario">
        </div>
        </div>
        <div class="form-group">
        <label for="inputEmail" class="col-sm-4 control-label">Email</label>
        <div class="col-sm-8">
            <input type="email" v-bind:value="user.email" class="form-control" id="inputEmail" placeholder="Email">
        </div>
        </div>
        <div class="form-group">
        <label for="inputPassword" value="" class="col-sm-4 control-label">Password</label>
        <div class="col-sm-8">
            <div class="input-group">
                <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                <span class="input-group-btn">
                    <button v-on:click="showHide()" class="btn btn-default btn-md" id="showhide" data-val='1'>
                        <span id='eye' class="glyphicon glyphicon-eye-open"></span>
                    </button>
                </span>
            </div>
        </div>
        </div>                      
    </form>
</template>
<script>
 export default {
    name: 'FormCliente',
    props: ['user'],
    methods: {
      showHide(){
        if ($("#showhide").data('val') == "1"){
            $("#inputPassword").prop('type','text');
            $("#eye").attr("class","glyphicon glyphicon-eye-close");
            $("#showhide").data('val','0');
        } else {
            $("#inputPassword").prop('type', 'password');
            $("#eye").attr("class","glyphicon glyphicon-eye-open");
            $("#showhide").data('val','1');
        }
      }
    }
 }
 </script>