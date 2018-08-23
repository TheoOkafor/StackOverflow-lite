import express from 'express';
import db from '../db';

const fetchQuestionCtrl = (req, res) => {
  const requestId = parseInt(req.params.id);
  const query = {
    name: 'fetch-question',
    text: 'SELECT * FROM questions WHERE id = $1',
    values: [requestId]
  }
  const errorResponse = () => {
    res.status(404);// Set status to 404 as question was not found
    res.json({
      status: 'failed',
      message: `Question ${requestId} Not Found`,
    });
    return res;
  }

  db.one(query.text, requestId)
    .then( (data) => {
      if(data.length === 0){
        errorResponse();
      } else {
        res.json({
          status: 'successful',
          message: `Question ${requestId} found`,
          data: data,
        });
      }
    })
    .catch(error => {
      console.log(error);
      errorResponse();
    }); 
}

export { fetchQuestionCtrl };
