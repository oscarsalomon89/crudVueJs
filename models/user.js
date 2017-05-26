var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
   username: String,
   password: String,
   email: String,
   token: String
});

var User = mongoose.model('User', UsuarioSchema);

module.exports = User;