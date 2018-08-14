'use strict';

var express = require('express');
var data = require('../data/data');
var router = express.Router();

var questions = data.questions;

router.get('/', function (req, res, next) {
  res.json(questions);
});

router.get('/questions', function (req, res, next) {
  res.json(questions);
});

router.get('/v1', function (req, res, next) {
  res.json(questions);
});

router.get('/v1/questions', function (req, res, next) {
  res.json(questions);
});

router.get('/v1/questions/:id([0-9]{1,})', function (req, res, next) {
  var requestId = req.params.id;
  var currQuestion = questions.filter(function (question) {
    if (question.id === requestId) {
      return true;
    }
  });

  if (currQuestion.length === 1) {
    res.json(currQuestion[0]);
  } else {
    res.status(404); //Set status to 404 as question was not found
    res.send('Question ' + requestId + ' Not Found');
  }
});

module.exports = router;
