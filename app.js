var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const HttpStatus = require('http-status');

const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const authController = require('./controllers/authController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

authController.setSecretKey(app);
app.use('/product', productRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(HttpStatus.NOT_FOUND));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err?.message || 'Unknown error' });
});

module.exports = app;
