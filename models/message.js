var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MessageSchema = new Schema({
   id: Number,
   username: String,
   body: String,
   time: Date
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;