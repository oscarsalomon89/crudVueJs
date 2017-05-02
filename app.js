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
       user: req.body.user,
       body: req.body.message,
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

app.post('/api/updatemessage', function(req, res) {
  Message.findById(req.body[0], function (err, ms) {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        mensaje = req.body[1];
        console.log(req.body[1].user);
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        ms.user = mensaje.user;
        ms.body = mensaje.message;
        ms.time = new Date();

        // Save the updated document back to the database
        ms.save(function (err, todo) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(todo);
        });
    }
  })
});

app.post('/api/removemessage', function(req, res) {
    Message.findByIdAndRemove(req.body, function(err) {
      if (err) throw err;
      // we have deleted the user
      return res.json({'msg':'User deleted!'});
    });
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

app.post('/api/editmessage',function(req, res) {
    Message.findById(req.body, function(err,msg) {
      if (err) throw err;
      return res.json(msg);
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
