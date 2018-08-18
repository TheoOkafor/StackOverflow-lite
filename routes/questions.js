'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _data = require('../data/data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionRouter = _express2.default.Router();

var questions = _data.data.questions;

// GET ALL QUESTIONS
questionRouter.get('/', function (req, res) {
  res.json(questions);
});

questionRouter.get('/questions', function (req, res) {
  res.json(questions);
});

questionRouter.get('/v1', function (req, res) {
  res.json(questions);
});

questionRouter.get('/v1/questions', function (req, res) {
  res.json(questions);
});

// GET A QUESTION
questionRouter.get('/v1/questions/:id([0-9]{1,})', function (req, res) {
  var requestId = req.params.id;
  var currQuestion = questions.filter(function (question) {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });

  if (currQuestion.length === 1) {
    res.json(currQuestion[0]);
  } else {
    res.status(404); // Set status to 404 as question was not found
    res.json('Question ' + requestId + ' Not Found');
  }
});

// POST A QUESTION
questionRouter.post('/v1/questions', function (req, res) {
  var reqBody = req.body; // reqBody = JSON.parse(req.body) worked for POSTMAN but not MOCHA test
  // Check if all fields are provided and are valid:
  var invalidReq = reqBody.title === null || reqBody.title === '' || reqBody.title === undefined;
  if (invalidReq) {
    res.status(400);
    res.json({ message: 'Bad Request. Question must have a title.' });
  } else {
    var newId = questions[questions.length - 1].id + 1;
    var timeNow = new Date();
    var timeStr = timeNow.toUTCString();
    questions.push({
      id: newId,
      title: reqBody.title,
      body: reqBody.body,
      timeSubmitted: timeStr,
      username: reqBody.username,
      answers: []
    });
    res.json({ message: 'New question: ' + reqBody.title + ' added.', location: '/v1/questions/' + newId });
  }
});

// POST AN ANSWER
questionRouter.post('/v1/questions/:id([0-9]{1,})/answers', function (req, res) {
  var reqBody = req.body;
  var requestId = req.params.id;
  var invalidReq = reqBody.body === null || reqBody.body === '' || reqBody.body === undefined;

  // Find the question with the request id.
  var currQuestion = questions.filter(function (question) {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });

  if (currQuestion.length < 1) {
    res.status(404); // Set status to 404 as question was not found
    res.json({ message: 'Question ' + requestId + ' Not Found' });
  } else if (invalidReq) {
    res.status(400);
    res.json({ message: 'Bad Request. Answer must have a body.' });
  } else {
    var answers = currQuestion[0].answers;
    var newId = answers[answers.length - 1].id + 1;
    var timeNow = new Date();
    var timeStr = timeNow.toUTCString();
    answers.push({
      id: newId,
      body: reqBody.body,
      username: reqBody.username,
      timeAnswered: timeStr,
      accepted: false
    });
    res.json({ message: 'New answer: ' + reqBody.body + ' added', question: '' + currQuestion[0].title });
  }
});

exports.questionRouter = questionRouter;
