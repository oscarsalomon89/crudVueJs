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
            <FormItem v-show="addStatus == null" :item="itemSelected"></FormItem>
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
  import * as firebase from "firebase";
  import {storage,db} from '../helpers/firebaseConfig'  
  import { mapGetters, mapActions } from 'vuex'
  import FormItem from './FormItem.vue';

  var filesRef = db.ref('files')
  var storageRef = storage.ref();

  export default {
    components: {Navbar, FormItem },
    computed: mapGetters({
        listItems: 'allProducts',
        addStatus: 'addStatus',
        addFailure: 'addFailure',
        itemSelected: 'itemSelected'
      }),
    data() {
          return {
              cargando: 0
          }
      },
      created () {
        this.$store.dispatch('getAllProducts')
      },
      firebase() {
        return {
          listFiles: filesRef
        }
      },
      methods: {
        openAddItem(item,key){
          if(key == 0){
            var title = 'Nuevo producto';
          }else{
            item.id = key; 
            var title = 'Editar producto';
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
        deleteFile (file) {  
          var path = file.path;
          let key = file['.key'];    
          var fileRef = storageRef.child(path);
          // Delete the file
          fileRef.delete().then(function() {
            // File deleted successfully
            //Elimino en la base de datos
            filesRef.child(key).remove()
          }).catch(function(error) {
            // Uh-oh, an error occurred!
          });
        },
        upload(e,codigo,key){
          var file = e.target.files[0];                
          var extension = file['type'].split('/').pop();

          if(extension == 'jpg' || extension == 'jpeg'){
              this.resizeAndUpload(file,codigo,key);
          }else{
            alert('Extension no permitida!');
          }
        },
        resizeAndUpload(file,codigo,key){
            let vm = this;
            let name = codigo;
            let clave = key;
            var reader = new FileReader();
            reader.onloadend = function() {
              var tempImg = new Image();
              tempImg.onload = function() {
                // Comprobamos con el aspect cómo será la reducción
                // MAX_IMAGE_SIZE_PROCESS es la N que definimos como máxima
                var MAX_WIDTH = 650;
                var MAX_HEIGHT = 350;
                var tempW = tempImg.width;
                var tempH = tempImg.height;
                if (tempW > tempH) {
                  if (tempW > MAX_WIDTH) {
                    tempH *= MAX_WIDTH / tempW;
                    tempW = MAX_WIDTH;
                  }
                } else {
                  if (tempH > MAX_HEIGHT) {
                    tempW *= MAX_HEIGHT / tempH;
                    tempH = MAX_HEIGHT;
                  }
                }
                // Creamos un canvas para la imagen reducida y la dibujamos
                var resizedCanvas = document.createElement('canvas');
                resizedCanvas.width = tempW;
                resizedCanvas.height = tempH;
                var ctx = resizedCanvas.getContext("2d");
                ctx.drawImage(this, 0, 0, tempW, tempH);
                var dataURL = resizedCanvas.toDataURL("image/jpeg");

                // Pasamos la dataURL que nos devuelve Canvas a objeto Blob
                // Envíamos por Ajax el objeto Blob
                // Cogiendo el valor de photo (nombre del input file)
                var file = vm.dataURLtoBlob(dataURL);
                vm.uploadImage(file,name,clave);
              };
              tempImg.src = reader.result;
            }
            reader.readAsDataURL(file);
        },
        dataURLtoBlob(dataURL){
          // Decodifica dataURL
          var binary = atob(dataURL.split(',')[1]);
          // Se transfiere a un array de 8-bit unsigned
          var array = [];
          var length = binary.length;
          for(var i = 0; i < length; i++) {
            array.push(binary.charCodeAt(i));
          }
          // Retorna el objeto Blob
          return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
        },
        uploadImage(file,name,clave){
            let key = clave;
            let vm = this;
            var imgRef = storageRef.child('images/'+name);
            var uploadTask = imgRef.put(file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
              function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.cargando = progress;
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
              }, function(error) {
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  break;
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, function() {
              // Upload completed successfully, now we can get the download URL
              var downloadURL = uploadTask.snapshot.downloadURL;
              var ref = uploadTask.snapshot.ref;
              var path = uploadTask.snapshot.ref.fullPath;
              var folder = path.split('/')[0];
              var metadata = uploadTask.snapshot.metadata;

              var img = {
                          name: ref.name,
                          path: path,
                          folder: folder,
                          url: downloadURL,
                          created: metadata.timeCreated,
                          hash: metadata.md5Hash,
                          contenttype: metadata.contentType
                        }

              var data = {id:key,url:downloadURL};
              
              vm.$store.dispatch('updateUrl',data);
              filesRef.push(img)
              //document.getElementById('fileUpload').src = downloadURL;
              alert('Upload OK.'+key);
            });
        },
        openFile(url){            
            $('.imagepreview').attr('src',url);
			      $('#imagemodal').modal('show');   
        }
      }
  }
</script>
