import express from 'express';
import db from '../db';

const postQuestion = (req, res) => {
  const reqBody = req.body;
  const timeNow = new Date().toUTCString();
  const request = {
    text: 'INSERT INTO questions (title, body, timeSubmitted, username,'+
    ' answers) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    values: [reqBody.title, reqBody.body, timeNow, reqBody.username, []],
  }
  db.one(request.text, request.values)
    .then( (data) => {
      if(!data){
        res.status(501);// Set status to 501
        res.json({
          status: 'failed',
          message: 'Server failed to complete request',
          data: reqBody,
        });
      } else {
        res.status(201);
        res.json({
          status: 'successful',
          message: 'New question added',
          data: reqBody,
          metadata: {
            location: `/v1/questions/${data.id}`,
          },
        });
      }
    })
};

export { postQuestion };
