import express from 'express';
import { data } from '../../data/data';

const questions = data.questions;

const postAnswer = (req, res) => {
  const reqBody = req.body;
  const requestId = req.params.id;
  // Find the question with the request id.
  const currQuestion = questions.filter((question) => {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });
  if (currQuestion.length !== 1) {
    const err = new Error(`Question ${requestId} Not Found`);
    res.status(404);
    res.json({
      status: 'failed',
      message: err.message,
      data: reqBody,
    });
  } else {
    const answers = currQuestion[0].answers;
    const newId = answers[answers.length - 1].id + 1;
    const timeNow = new Date().toUTCString();

    const answer = {
      id: newId,
      body: reqBody.body,
      username: reqBody.username,
      timeAnswered: timeNow,
      accepted: false,
    };

    answers.push(answer);
    res.status(201);
    res.json({
      status: 'successful',
      message: 'New answer added.',
      data: answers[newId - 1],
      metadata: {
        location: `/v1/questions/${newId}`,
      },
    });
  }
};

export { postAnswer };
