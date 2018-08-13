'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var questionsRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(logger('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                               
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(cookieParser());

app.use('/', questions);

app.route("/questions").get(questionsRouter.getQuestions).post(questionsRouter.postQuestion);
app.route("/questions/:id").get(questionsRouter.getQuestion).delete(questionsRouter.deleteQuestion);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
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

// listen for requests
app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});

module.exports = app;
