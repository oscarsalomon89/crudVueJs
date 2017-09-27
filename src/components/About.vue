<template>
<div>
  <Navbar></Navbar>
  <h1>Clientes <small>Subtext for header</small></h1>
    <button type="button" class="btn btn-primary" v-on:click="openAddItem()" data-target="#myModal">
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

  <!-- List group -->
  <div class="row">
    <div class="col-xs-6 col-md-3">
      <input type="file" id="fileButton" @change="upload($event)"/>
    </div>
    <div class="col-xs-6 col-md-4">
      <div class="progress">
          <div class="progress-bar" role="progressbar" v-bind:aria-valuenow="cargando" 
          aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: cargando+'%'}">
          {{cargando}}%
        </div>
      </div>  
    </div>
    </div>
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
  <br>
  <div class="row">
    <div v-for="file in listFiles" :key="file['.key']" class="col-xs-6 col-md-3">
      <a @click="openFile(file.url)" class="portfolio-box">
          <img v-bind:src="file.url" class="img-responsive" alt="">
          <div class="portfolio-box-caption">
              <div class="portfolio-box-caption-content">
                  <div class="project-category text-faded">
                      {{file.name}}
                  </div>
              </div>
          </div>
      </a>
      <p><a @click="deleteFile(file)" class="btn btn-primary" role="button">Eliminar</a></p>
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
  import FormItem from './FormItem.vue'

  var filesRef = db.ref('files')
  var storageRef = storage.ref();

  export default {
    components: { 'Navbar': Navbar },
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
      firebase() {
        return {
          listFiles: filesRef
        }
      },
      methods: {
        openAddItem(){
          this.$store.dispatch('selectItem',[]);
          //this.$store.dispatch('failMensaje', '');
          //document.getElementById('mensajesError').innerHTML = '';
          //document.getElementById('inputPassword').value = '';
          document.getElementById('myModalLabel').innerHTML = 'Nuevo Producto';

          $('#myModal').modal('show');
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
        upload(e){
          var file = e.target.files[0];                
          var extension = file['type'].split('/').pop();

          if(extension == 'jpg' || extension == 'jpeg'){
              this.resizeAndUpload(file);
          }else{
            alert('Extension no permitida!');
          }
        },
        resizeAndUpload(file){
            let vm = this;
            let name = file.name;
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
                vm.uploadImage(file,name);
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
        uploadImage(file,name){
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

              filesRef.push(img)
              //document.getElementById('fileUpload').src = downloadURL;
              alert('Upload OK.');
            });
        },
        openFile(url){
            $('.imagepreview').attr('src',url);
			      $('#imagemodal').modal('show');   
        }
      }
  }
</script>
