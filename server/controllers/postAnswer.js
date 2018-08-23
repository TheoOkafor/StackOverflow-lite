import express from 'express';
import db from '../db';

const postAnswer = (req, res) => {
  const reqBody = req.body;
  const requestId = req.params.id;
  const timeNow = new Date().toUTCString();
  // Find the question with the request id.
  const request = {
    text: 'WITH rows AS ('+
      ' INSERT INTO answers'+
      ' (questionID, body, timeSubmitted, username, accepted)'+
      ' VALUES ($1, $2, $3, $4, $5)'+
      ' RETURNING id'+
      ')'+
        'UPDATE questions SET answers = array_cat'+
        '(topics, ARRAY[SELECT id FROM rows]) WHERE ID = $1'+
          ' RETURNING id',
    values: [requestId, reqBody.body, timeNow, reqBody.username, false],
  }
  db.one(request.text, request.values)
    .then( (data) => {
      if(!data){
        const err = new Error(`Question ${requestId} Not Found`);
        res.status(404);
        res.json({
          status: 'failed',
          message: err.message,
          data: reqBody,
        });
      } else {

        res.status(201);
        res.json({
          status: 'successful',
          message: 'New answer added.',
          data: reqBody,
          metadata: {
            location: `/v1/questions/${requestId}/answers`,
          },
        });
      }
    });
}

export { postAnswer };
