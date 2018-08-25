import express from 'express';
import db from '../db';

const postAnswer = (req, res) => {
  const reqBody = req.body;
  const requestId = req.params.id;
  const timeNow = new Date().toUTCString();
  // Find the question with the request id.
  const request = {
    text: 'INSERT INTO answers'
      + ' (questionID, body, timeSubmitted, username, accepted)'
      + ' VALUES ($1, $2, $3, $4, $5)'
      + ' RETURNING ID',
    values: [requestId, reqBody.body, timeNow, reqBody.username, false],
  };
  db.one(request.text, request.values)
    .then((data) => {
      res.status(201);
      res.json({
        status: 'successful',
        message: 'New answer added',
        data: reqBody,
        metadata: {
          location: `/v1/questions/${requestId}/answers/${data.id}`,
        },
      });
    })
    .catch((error) => {
      /**
       * [if there question ID is not found]
       * @param {[undefined]} error.where [Property of the error object return]
       * @return {[JSON reponse]}             [The request failed]
       */
      if (error.where === undefined) {
        const err = new Error(`Question ${requestId} Not Found`);
        res.status(404);
        res.json({
          status: 'failed',
          message: err.message,
          data: reqBody,
        });
      } else {
        res.status(501);// Set status to 501
        res.json({
          status: 'failed',
          message: 'Server failed to complete request',
        });
        console.log(error);
      }
    });
};

export { postAnswer };
