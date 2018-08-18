'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _questions = require('./routes/questions');

var _users = require('./routes/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));

// parse application/json and look for raw text
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/json' }));

app.use((0, _cookieParser2.default)());

app.use('/', _questions.questionRouter);
app.use('/users', _users.userRouter);
app.use('/v1/users', _users.userRouter);
app.use('/questions', _questions.questionRouter);
app.use('/v1/questions', _questions.questionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next((0, _httpErrors2.default)(404));
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

exports.app = app;
