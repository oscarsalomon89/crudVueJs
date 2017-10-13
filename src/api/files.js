import {db} from '../helpers/firebaseConfig'

var filesRef = db.ref('files')

export default {

  selectFiles (data,cb) {
    
    filesRef.orderByChild("folder").equalTo(data).once("value") 
        .then(function(snapshot) {          
          cb(snapshot.val());
        })
      .catch(function (error) {        
        console.log(error);
      });
  },

  addFile (data, cb, errorCb) {
    var keyUser = filesRef.push(data).key;
    cb(data)    
  },
  
  deleteFile (data, cb) {
    filesRef.child(data).remove()
    }
}