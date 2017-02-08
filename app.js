var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var eHbs = require('express-handlebars');

var index = require('./routes/index');
var users = require('./routes/users');
var errorsRoutes = require('./routes/errors');

var app = express();

var mongoClient = require('mongodb').MongoClient;
const mongoDatabaseUrl = "mongodb://localhost:27017/worldbank";

mongoClient.connect(mongoDatabaseUrl, function (err, db) {

  /**
   * Here we are checking an err variable is having null value
   * or not.
   * 
   */
  if (err === null && typeof err === "object") {

    console.log('Connection has been made successfull using nodemon');
  }
  db.close();

});

app.engine('.hbs', eHbs({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: [
    path.join(__dirname, '/views/partials')
  ],
  defaultLayout: 'main'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function errorHandler(err, req, res, next) {

  console.log(err.message);
  console.log(err.stack);

  res.status(500);
  res.send('Something went wrong try after some time.');
}

app.use(errorHandler);

app.use('/', index);
app.use('/users', users);
app.use('/errors', errorsRoutes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
