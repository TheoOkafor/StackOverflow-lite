'use strict';

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var questionsRouter = require('./routes/questions');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));

// parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(cookieParser());

app.use('/', questionsRouter);
app.use('/users', usersRouter);
app.use('/v1/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/v1/questions', questionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : 'Something went wrong';

  // render the error page
  res.status(err.status || 500);
  res.send('error');
  next();
});

// listen for requests
app.listen(5000, function () {
  console.log('Server is listening on port 5000');
});

module.exports = app;
