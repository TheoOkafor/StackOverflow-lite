import express from 'express';
import db from '../db';

const acceptAnswer = (req, res) => {
  const id = parseInt(req.params.idA);
  const reqBody = req.body;
  const query = 'UPDATE answers SET accepted=$2 WHERE ID=$1'+
  'RETURNING id';
  const request = [id, req.body.value];
  db.one(query, request)
    .then( (data) => {
      if(!data){
        res.status(501);// Set status to 501
        res.json({
          status: 'failed',
          message: 'Server failed to complete request',
        });
      } else {
        res.status(201);
        res.json({
          status: 'successful',
          message: `Answer ${data.id} has been ${req.body.value === true?
           'accepted':'unaccepted'}`,
          metadata: {
            location: `/v1/questions/${req.params.idQ}`,
          },
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export { acceptAnswer };
