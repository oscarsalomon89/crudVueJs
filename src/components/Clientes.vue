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
            <cliente v-for="item in users" :user="item" :key="item.id"></cliente>            
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
  import * as firebase from "firebase";
  import {db} from '../helpers/firebaseConfig'

  //var db = app.database()
  //var users = db.ref('users')

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
      firebase() {
        return {
          users: db.ref('users')
        }
      },
      created () {
        //this.$store.dispatch('getAllClients')
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
                        vm.showForm = false;//oculta el form
                        //document.getElementById('mensajesError').innerHTML = '';
                        //if (res.status == 422){
                          //  document.getElementById('mensajes').innerHTML = response.body.email[0];
                        //}else{
                            //var mymodal = $('#myModal');
                            //mymodal.find('.modal-body').text('Usuario agregado con exito');
                        //}                                   
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
      }      
    }
  }
</script>
