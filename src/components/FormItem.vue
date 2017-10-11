<template>
    <form v-on:submit.prevent class="form-horizontal">
        <input type="hidden" v-bind:value="item.id" id="iditem" name="iditem">
        <div class="form-group">
            <label for="inputUser" class="col-sm-4 control-label">Codigo</label>
            <div class="col-sm-8">
                <input type="text" v-bind:value="item.codigo" class="form-control" id="inputCodigo" placeholder="Codigo del producto">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label">Descripcion</label>
            <div class="col-sm-8">
                <input type="text" v-bind:value="item.descripcion" class="form-control" id="inputDescripcion" placeholder="Descripcion">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPrecio" value="" class="col-sm-4 control-label">Precio</label>
            <div class="col-sm-8">
                <input type="text" v-bind:value="item.precio" class="form-control" id="inputPrecio" placeholder="Precio">
            </div>
        </div>
        <input type="file" multiple="multiple" id="fileButton" @change="upload(item.codigo,item.id)"/> 
        <br>
        <div class="row"> 
            <div v-for="file in files" :key="file['.key']" class="col-xs-6 col-md-3">        
                <a @click="openFile(file.url)" class="portfolio-box">        
                    <img style="height:60px;" v-bind:src="file.url" class="img-responsive" alt="">        
                    <div class="portfolio-box-caption">        
                        <div class="portfolio-box-caption-content">        
                            <div class="project-category text-faded">        
                                {{file.name}}        
                            </div>        
                        </div>        
                    </div>        
                </a>        
                <p>
                    <a @click="deleteFile(file)" class="btn btn-primary" role="button">Eliminar</a>
                </p>
            </div>        
        </div>                      
    </form>
</template>
<script>
import * as firebase from "firebase";
import {storage,db} from '../helpers/firebaseConfig'

var filesRef = db.ref('files')
var storageRef = storage.ref();

 export default {
    name: 'FormItem',
    props: ['item','files'],
    methods: {
        upload(codigo,key){
            var fileSelect  = document.getElementById('fileButton');
            //Obtengo los archivos seleccionados
            var files = fileSelect.files;
            
            //Recorro los archivos seleccionados
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var name = codigo+'/'+file.name;
                var extension = file['type'].split('/').pop();

                if(extension == 'jpg' || extension == 'jpeg'){
                    this.resizeAndUpload(file,name,key);
                }else{
                    alert('Extension no permitida!');
                }
            }          
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
              var folder = path.split('/')[1];
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

              //var data = {id:key,url:downloadURL};
              
              //vm.$store.dispatch('updateUrl',data);
              filesRef.push(img);
            });
        }
    }
 }
 </script>