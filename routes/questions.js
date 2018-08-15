const express = require('express');
const data = require('../data/data');

const router = express.Router();

const questions = data.questions;

// GET ALL QUESTIONS
router.get('/', (req, res) => {
  res.json(questions);
});

router.get('/questions', (req, res) => {
  res.json(questions);
});

router.get('/v1', (req, res) => {
  res.json(questions);
});

router.get('/v1/questions', (req, res) => {
  res.json(questions);
});


// GET A QUESTION
router.get('/v1/questions/:id([0-9]{1,})', (req, res) => {
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
});

// POST A QUESTION
router.post('/v1/questions', (req, res) => {
  const reqBody = req.body; // reqBody = JSON.parse(req.body) worked for POSTMAN but not MOCHA test
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.title === null || reqBody.title === '' || reqBody.title === undefined;
  if (invalidReq) {
    res.status(400);
    res.json({ message: 'Bad Request. Question must have a title.' });
  } else {
    const newId = questions[questions.length - 1].id + 1;
    const timeNow = new Date();
    const timeStr = timeNow.toUTCString();
    questions.push({
      id: newId,
      title: reqBody.title,
      body: reqBody.body,
      timeSubmitted: timeStr,
      username: reqBody.username,
      answers: [],
    });
    res.json({ message: `New question: ${reqBody.title} added.`, location: `/v1/questions/${newId}` });
  }
});

module.exports = router;
