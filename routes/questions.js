const express = require('express');
const data = require('../data/data');

const router = express.Router();

const questions = data.questions;

router.get('/', (req, res, next) => {
  res.json(questions);
  next();
});

router.get('/questions', (req, res, next) => {
  res.json(questions);
  next();
});

router.get('/v1', (req, res, next) => {
  res.json(questions);
  next();
});

router.get('/v1/questions', (req, res, next) => {
  res.json(questions);
  next();
});

router.get('/v1/questions/:id([0-9]{1,})', (req, res, next) => {
  const requestId = req.params.id;
  const currQuestion = questions.filter((question) => {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });

  if (currQuestion.length === 1) {
    res.json(currQuestion[0]);
  } else {
    res.status(404);// Set status to 404 as question was not found
    res.json(`Question ${requestId} Not Found`);
  }
  next();
});

module.exports = router;
