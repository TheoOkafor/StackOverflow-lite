import express from 'express';
import { data } from '../data/data';

const questions = data.questions;

const postAnswerValidate = (req, res, next) => {
  const requestId = req.params.id;
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.body === null || reqBody.body.trim() === '' || reqBody.body === undefined;
  
  // Find the question with the request id.
  const currQuestion = questions.filter((question) => {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });
  if (currQuestion.length !== 1) {
    const err = new Error(`Question ${requestId} Not Found`);
    err.status = 'failed';
    err.data= reqBody;
    err.statusCode(404);
    return next(err);
  } else if (invalidReq) {
    const err = new Error('Bad Request. Answer must have a body.');
    err.status = 'failed';
    err.data= reqBody;
    err.statusCode(400);
    return next(err);
  }
  return next(currQuestion);
}

export { postAnswerValidate };