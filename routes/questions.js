import express from 'express';
import {data} from '../data/data';

const questionRouter = express.Router();

const questions = data.questions;

// GET ALL QUESTIONS

questionRouter.get('/v1/questions', (req, res) => {
  res.json(questions);
});


// GET A QUESTION
questionRouter.get('/v1/questions/:id([0-9]{1,})', (req, res) => {
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
questionRouter.post('/v1/questions', (req, res) => {
  const reqBody = req.body;
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
    res.status(201);
    res.json({status: 'Successful',
      message: `New question: ${reqBody.title} added.`,
      location: `/v1/questions/${newId}`
    });
  }
});


// POST AN ANSWER
questionRouter.post('/v1/questions/:id([0-9]{1,})/answers', (req, res) => {
  const reqBody = req.body;
  const requestId = req.params.id;
  const invalidReq = reqBody.body === null || reqBody.body === '' || reqBody.body === undefined;

  // Find the question with the request id.
  const currQuestion = questions.filter((question) => {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });

  if (currQuestion.length < 1) {
    res.status(404);// Set status to 404 as question was not found
    res.json({ message: `Question ${requestId} Not Found` });
  } else if (invalidReq) {
    res.status(400);
    res.json({ message: 'Bad Request. Answer must have a body.' });
  } else {
  	const answers = currQuestion[0].answers;
    const newId = answers[answers.length - 1].id + 1;
    const timeNow = new Date();
    const timeStr = timeNow.toUTCString();
    answers.push({
      id: newId,
      body: reqBody.body,
      username: reqBody.username,
      timeAnswered: timeStr,
      accepted: false,
    });
    res.status(201);
    res.json({ message: `New answer: ${reqBody.body} added`, question: `${currQuestion[0].title}` });
  }
});

export {questionRouter};
