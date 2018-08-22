import express from 'express';
import { data } from '../data/data';

const questions = data.questions;

const postAnswerValidate = (req, res, next) => {
  const requestId = req.params.id;
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.body === null || reqBody.body === undefined;

  if (invalidReq) {
    const err = new Error('Bad Request. Answer must have a body.');
    res.status(400);
    res.json({
      status: 'failed',
      message: err.message,
      data: reqBody,
    });
  } else {
    return next();
  }
};

export { postAnswerValidate };
