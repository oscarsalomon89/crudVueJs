import {db} from '../helpers/firebaseConfig'

var users = db.ref('users')

export default {
  getClients (clientes) {
    /*users.once('value').then(function(snapshot) {
      clientes(snapshot.val());
    });*/
    users.on('value', function(snapshot) {
      clientes(snapshot.val());
    });             
  },

  addClient (data, cb, errorCb) {
    var keyUser = users.push(data).key;
    cb(data)    
  },

  updateClient (data, cb, errorCb) {
    users.child(data.id).update({"name": data.name,
                                "email":data.email,"password":data.password}).
                                then(function() {
                                  cb()
                                }).
                                catch(function(error) {
                                  errorCb()
                                });
  },

  deleteClient (data, cb) {
    users.child(data.id).remove()
  }
}