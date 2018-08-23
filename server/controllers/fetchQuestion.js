import express from 'express';
import client from '../db-setup';

const fetchQuestionCtrl = (req, res) => {
  const requestId = req.params.id;
  const query = {
    name: 'fetch-question',
    text: 'SELECT * FROM questions WHERE id = $1',
    values: [requestId]
  }
  client.query(query, (err, data) => {
    if(err || data.rows.length === 0){
      res.status(404);// Set status to 404 as question was not found
      res.json({
        status: 'failed',
        message: `Question ${requestId} Not Found`,
      });
    } else {
      res.json({
        status: 'successful',
        message: `Question ${requestId} found`,
        data: data.rows,
      });
    }
  });  
}

export { fetchQuestionCtrl };
