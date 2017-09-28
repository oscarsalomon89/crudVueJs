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
  }
}