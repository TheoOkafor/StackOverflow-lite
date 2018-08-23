import express from 'express';
import client from '../db-setup';
import db from '../db';

const fetchQuestionCtrl = (req, res) => {
  const requestId = parseInt(req.params.id);
  const query = {
    name: 'fetch-question',
    text: 'SELECT * FROM questions WHERE id = $1',
    values: [requestId]
  }

  db.one(query.text, requestId)
    .then( (data) => {
      if(data.length === 0){
        res.status(404);// Set status to 404 as question was not found
        res.json({
          status: 'failed',
          message: `Question ${requestId} Not Found`,
        });
      } else {
        res.json({
          status: 'successful',
          message: `Question ${requestId} found`,
          data: data,
        });
      }
    });
/*
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
  }); */ 
}

export { fetchQuestionCtrl };
