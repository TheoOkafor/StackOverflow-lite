import express from 'express';
import db from '../db';

const fetchQuestionCtrl = (req, res) => {
  const requestId = parseInt(req.params.id);
  const query = {
    name: 'fetch-question',
    text: 'SELECT * FROM questions WHERE id = $1',
    values: [requestId],
  };

  db.one(query.text, requestId)
    .then((data) => {
      res.json({
        status: 'successful',
        message: `Question ${requestId} found`,
        data,
      });
    })
    .catch((error) => {
      if (error.received === 0) {
        res.status(404);// Set status to 404 as question was not found
        res.json({
          status: 'failed',
          message: `Question ${requestId} Not Found`,
        });
      } else {
        res.status(501);// Set status to 501
        res.json({
          status: 'failed',
          message: 'Server failed to complete request',
        });
      }
    });
};

export { fetchQuestionCtrl };
