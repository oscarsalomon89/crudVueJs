<template>
<div>
  <Navbar></Navbar>
  <h1>Clientes <small>Subtext for header</small></h1>
    <button type="button" class="btn btn-primary" v-on:click="openAddItem([],0)" data-target="#myModal">
      Agregar Producto
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
            <FormItem v-show="addStatus == null" :item="itemSelected" :files="filesItem"></FormItem>
            <p id="mensajesError">{{ addFailure }}</p>
            <p v-show="addStatus != null" id="mensajes">{{ addStatus }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" v-show="addStatus == null" @click="addItem()" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped">
            <tr>
                <th>Cod</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>imagen</th>
                <th></th>
            </tr>
            <tr v-for="(item,key) in listItems" :key="key">
              <td>{{item.codigo}}</td>
              <td>{{item.descripcion}}</td>
              <td>{{ item.precio }}</td>
              <td><a @click="openFile(item.url)">link</a></td>
              <td>                
                <button @click="deleteItem(key)" class="btn btn-danger btn-xs">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
                <button @click="openAddItem(item,key)" class="btn btn-success btn-xs">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
              </td>
          </tr>            
    </table>

    <div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">              
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <img src="" class="imagepreview" style="width: 100%; height:350px" >
          </div>
        </div>
      </div>
    </div> 
</div>
</template>
<script>
  import auth from '../auth/auth.js';
  import Navbar from './Navbar.vue';  
  import {storage,db} from '../helpers/firebaseConfig'  
  import { mapGetters, mapActions } from 'vuex'
  import FormItem from './FormItem.vue';

  var storageRef = storage.ref();

  export default {
    components: {Navbar, FormItem },
    computed: mapGetters({
        listItems: 'allProducts',
        addStatus: 'addStatus',
        addFailure: 'addFailure',
        itemSelected: 'itemSelected',
        filesItem: 'filesItem'
      }),
    data() {
          return {
              cargando: 0
          }
      },
      created () {
        this.$store.dispatch('getAllProducts')
      },
      methods: {
        openAddItem(item,key){
          if(key == 0){
            var title = 'Nuevo producto';
          }else{
            item.id = key; 
            var title = 'Editar producto';
            this.$store.dispatch('selectFilesItem',item.codigo);
          }

          this.$store.dispatch('selectItem',item);          
          //this.$store.dispatch('failMensaje', '');
          //document.getElementById('mensajesError').innerHTML = '';
          //document.getElementById('inputPassword').value = '';
          document.getElementById('myModalLabel').innerHTML = title;

          $('#myModal').modal('show');
        },
        addItem(){          
            let vm = this;
            var id   = document.getElementById('iditem').value;
            var cod = document.getElementById('inputCodigo').value;
            var desc = document.getElementById('inputDescripcion').value;
            var price = document.getElementById('inputPrecio').value;          

            if (cod == '' || desc =='' || price == '') {
              var msgError = 'Datos incompletos';
              this.$store.dispatch('failMensaje', msgError)
            } else {
              var data = {
                  codigo: cod,
                  descripcion: desc,
                  precio: price
                  };

                  if(id != ''){
                    this.updateItem(data,id);
                    return;
                  }

                  this.$store.dispatch('addItem', data)
                      .then(function(res){
                          vm.showForm = false;                                  
                        }, function(response){
                          alert('error');
                    })
            }
        },
        updateItem(item,id){
            let vm = this;
            item.id = id;
            this.$store.dispatch('updateItem', item)
                .then(function(res){
                    //vm.$store.dispatch('getAllClients')
                    vm.showForm = false;//oculta el form                              
                  }, function(response){
                    alert('error');
              })
        },                
        openFile(url){            
            $('.imagepreview').attr('src',url);
			      $('#imagemodal').modal('show');   
        }
      }
  }
</script>
