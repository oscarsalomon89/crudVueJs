<template>
<div>
  <Navbar></Navbar>
  <!-- Default panel contents -->
  <div class="panel-heading">Panel heading</div>
  <div class="panel-body">
    <p>Esta es la historia de vue js</p>
  </div>

  <!-- List group -->
  <div class="row">
    <div class="col-xs-6 col-md-3">
      <input type="file" id="fileButton"/>
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
  
  <br>
  <div class="row">
    <div v-for="file in listFiles" :key="file['.key']" class="col-xs-6 col-md-3">
      <a href="#" class="thumbnail">
        <img v-bind:src="file.url" v-bind:title="file.name" alt="...">
      </a>
      <div class="caption">
        <h3>{{file.name}}</h3>
        <p><a @click="deleteFile(file)" class="btn btn-primary" role="button">Eliminar</a></p>
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

  var filesRef = db.ref('files')
  var storageRef = storage.ref();

  export default {
    components: { 'Navbar': Navbar },
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
    mounted () {
        var fileButton = document.getElementById("fileButton");
            fileButton.addEventListener('change', function(e){
                var file = e.target.files[0];                
                var imgRef = storageRef.child('images/'+file.name);
                var uploadTask = imgRef.put(file);
                //var storageRef = storage.ref(file.name);
                //storageRef.put(file);
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
            }); 
      },
      methods: {
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
        }
      }
  }
</script>
