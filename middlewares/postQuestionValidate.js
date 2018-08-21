import express from 'express';
import { data } from '../data/data';

const questions = data.questions;

const postQuestionValidate = (req, res, next) => {
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.title === null || reqBody.title.trim() === '' || reqBody.title === undefined;
  if (invalidReq) {
    const err = new Error('Bad Request. Question must have a title.');
    err.status = 'failed';
    err.data= reqBody;
    err.statusCode(400);
    return next(err);
  }

  return next();
}

export { postQuestionValidate };