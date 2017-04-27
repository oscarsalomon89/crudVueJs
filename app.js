var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose    = require('mongoose');
var router = express.Router();
var app = express();

var Message = require('./models/message');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost/vueDb');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/addmessage', function(req, res) {
  Message.count({},function(err,cantidad) {
      
    //Parámetros para la inserción de datos
    var valorId = (cantidad + 1);
    var parametros = {
       id: valorId,
       body: req.body,
       time: new Date()
    };
    //Realizo la inserción de datos
    new Message(parametros).save(function(error, mensaje){
       if (error) {
          return console.log('error');
       } else {
          return res.json(mensaje);
       }
    });
  })
});

app.get('/api/messages', function(req, res) {
    Message.find()
        .sort({time: 'asc'})
        .exec(function(error,messages){
          if(error){
              console.log('error');
           }else{
               return res.json(messages);
           }
        });
});

app.get('*', function(req, res) {
	res.sendFile('index.html', {
		root: './views'
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error');
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error');
});


module.exports = app;
