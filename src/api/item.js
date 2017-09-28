import {db} from '../helpers/firebaseConfig'

var items = db.ref('items')

export default {
  getProducts (cb) {
    items.on('value', function(snapshot) {
      cb(snapshot.val());
    });  
  },

  addItem (data, cb, errorCb) {
    var keyUser = items.push(data).key;
    cb(data)    
  },

  updateItem (data, cb, errorCb) {
    items.child(data.id).update({"codigo": data.codigo,
                                "descripcion":data.descripcion,
                                "precio":data.precio}).
                                then(function() {
                                  cb()
                                }).
                                catch(function(error) {
                                  errorCb()
                                });
  }
}