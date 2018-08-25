import express from 'express';
import db from '../db';

const acceptAnswer = (req, res) => {
  const id = parseInt(req.params.idA);
  const idQ = parseInt(req.params.idQ);
  const query = 'UPDATE answers SET accepted=$3 WHERE ID=$1'
   +' AND questionID=$2 RETURNING questionID';
  const request = [id, idQ, req.body.value];
  db.any(query, request)
    .then((data) => {
      if (data.length < 1) {
        res.status(404);// Set status to 404
        res.json({
          status: 'failed',
          message: `Question ${req.params.idQ} not found`,
        });
      } else {
        res.status(201);
        res.json({
          status: 'successful',
          message: `Answer ${id} has been ${req.body.value ?
           'accepted' : 'unaccepted'}`,
          metadata: {
            location: `/v1/questions/${req.params.idQ}`,
          },
        });
      }
    })
    .catch((error) => {
      res.status(501);// Set status to 501
      res.json({
        status: 'failed',
        message: 'Server failed to complete request',
      });
    });
};


export { acceptAnswer };
