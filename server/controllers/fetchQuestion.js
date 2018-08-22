import express from 'express';
import { data } from '../../data/data';

const questions = data.questions;

const fetchQuestionCtrl = (req, res) => {
  const requestId = req.params.id;
  const currQuestion = questions.filter((question) => {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });

  if (currQuestion.length === 1) {
    res.json({
      status: 'successful',
      message: `Question ${requestId} found`,
      data: currQuestion[0],
    });
  } else {
    res.status(404);// Set status to 404 as question was not found
    res.json({
      status: 'failed',
      message: `Question ${requestId} Not Found`,
    });
  }
};

export { fetchQuestionCtrl };
