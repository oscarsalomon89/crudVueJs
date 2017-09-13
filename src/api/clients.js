import Vue from 'vue'
import {db} from '../helpers/firebaseConfig'

var users = db.ref('users')

export default {
  getClients (clientes) {
    clientes(users)            
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

      /*Vue.http.post('api/updateUser', data)
        .then(function(res){
            cb()             
            }, function(response){
            if (response.status ==422){
                errorCb()
            }
        })*/
  },

  deleteClient (data, cb) {
    users.child(data.id).remove()
    /*Vue.http.post('api/deleteUser', data)
        .then(function(res){
            cb(res.body)             
            }, function(response){
            if (response.status ==422){
                
            }
        })*/
  }
}