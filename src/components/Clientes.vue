<template>
  <div>
    <Navbar></Navbar>
  <div class="page-header">
    <h1>Clientes <small>Subtext for header</small></h1>
    <button type="button" class="btn btn-primary" v-on:click="openAddUser()" data-target="#myModal">
  Add User modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"></h4>
      </div>
      <div class="modal-body">
        <FormCliente v-show="addStatus == null" :user="userSelected"></FormCliente>
        <p id="mensajesError">{{ addFailure }}</p>
        <p v-show="addStatus != null" id="mensajes">{{ addStatus }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" v-show="addStatus == null" @click="addUser()" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    <div class="row">
      <div class="col-md-3">

      </div>
      <div class="col-md-6 jumbotron">
          <table class="table table-striped">
            <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Auth</th>
                <th></th>
            </tr>
            <tr v-for="(user,key,index) in listUsers" :key="key">
              <th scope="row">{{index}}</th>
              <td>{{user.name}}</td>
              <td>{{ user.email }}</td>
              <td>
              <span class="label label-default">{{ $store.state.count }}</span>
              </td>
              <td>
              <button @click="deleteUser(key)" class="btn btn-danger btn-xs">
                  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
              <button @click="editarUsuario(user,key)" class="btn btn-success btn-xs">
                  <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
              </button>
              </td>
          </tr>            
          </table>
        </div>
    </div>
  </div>  
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Navbar from './Navbar.vue'
  import Cliente from './Cliente.vue'
  import FormCliente from './FormCliente.vue'

  export default {
    components: {Navbar, Cliente, FormCliente},
      computed: mapGetters({
        listUsers: 'allClients',
        addStatus: 'addStatus',
        addFailure: 'addFailure',
        userSelected: 'userSelected'
      }),
      data() {
          return {
              showForm: true,
              titulo: 'Nuevo Usuario'
          }
      },
      /*firebase() {
        return {
          users: db.ref('users')
        }
      },*/
      created () {
        this.$store.dispatch('getAllClients')
      },
    methods: {
      openAddUser(){
        this.showForm = true;
        this.$store.dispatch('selectClient',[]);
        this.$store.dispatch('failMensaje', '');
        //document.getElementById('mensajesError').innerHTML = '';
        document.getElementById('inputPassword').value = '';
        document.getElementById('myModalLabel').innerHTML = 'Nuevo Usuario';

        $('#myModal').modal('show');
      },
      addUser(){          
          let vm = this;
          var id   = document.getElementById('iduser').value;
          var user = document.getElementById('inputUser').value;
          var email = document.getElementById('inputEmail').value;
          var pass = document.getElementById('inputPassword').value;          

          if (email == '' || user =='' || pass == '') {
            var msgError = 'Datos incompletos';
            this.$store.dispatch('failMensaje', msgError)
          } else {
            var data = {
                name: user,
                email: email,
                password: pass
                };

                if(id != ''){
                  this.updateUser(data,id);
                  return;
                }

                this.$store.dispatch('addClient', data)
                    .then(function(res){
                        vm.$store.dispatch('getAllClients')
                        vm.showForm = false;                                  
                      }, function(response){
                        alert('error');
                  })
          }
      },
      updateUser(user,id){
          let vm = this;
          user.id = id;
          this.$store.dispatch('updateClient', user)
              .then(function(res){
                  vm.$store.dispatch('getAllClients')
                  vm.showForm = false;//oculta el form                              
                }, function(response){
                  alert('error');
            })
      },
      deleteUser(user){
            var data = { id: user };
            this.$store.dispatch('deleteClient',data)
            //this.$store.dispatch('getAllClients')      
        },
        editarUsuario(user,key){  
            user.id = key;           
            this.showForm = true;
            this.$store.dispatch('selectClient',user);
            this.$store.dispatch('failMensaje', '');
            document.getElementById('myModalLabel').innerHTML = 'Editar Usuario';
            document.getElementById('inputPassword').value = '';

            $('#myModal').modal('show');
        }      
    }
  }
</script>
