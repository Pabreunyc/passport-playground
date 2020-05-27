var createError   = require('http-errors');
var express       = require('express');
var expressSession = require('express-session');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var passport      = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const initializePassport = require('./config/passport-config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  res.redirect('/login.html');
  console.log('404.ERR', req.originalUrl);
  return;
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.dir(err);
  console.log('ERR.Handler', res.locals);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
