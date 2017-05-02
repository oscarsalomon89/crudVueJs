var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MessageSchema = new Schema({
   id: Number,
   user: String,
   body: String,
   time: Date,
   timeUpdate: Date
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;