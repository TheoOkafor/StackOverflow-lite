import express from 'express';
import { data } from '../data/data';

const questions = data.questions;

const postQuestion = (req, res) => {
  const reqBody = req.body;
  const newId = questions[questions.length - 1].id + 1;
  const timeNow = new Date().toUTCString();
  const newQuestion = {
    id: newId,
    title: reqBody.title,
    body: reqBody.body,
    timeSubmitted: timeNow,
    username: reqBody.username,
    answers: [],
  };
  questions.push(newQuestion);
  res.status(201);
  res.json({
    status: 'Successful',
    message: 'New question added.',
    data: questions[newId-1],
    location: `/v1/questions/${ newId }`
  });
}

export { postQuestion };