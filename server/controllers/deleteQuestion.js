import express from 'express';
import db from '../db';

const deleteQuestion = (req, res) => {
  const id = parseInt(req.params.id);
  const request = 'DELETE FROM questions WHERE ID = $1';

  db.result(request, id)
    .then((result) => {
      if (result.rowCount < 1) {
        res.status(404);// Set status to 501
        res.json({
          status: 'failed',
          message: `Question ${id} not found`,
        });
      } else {
        res.status(201);
        res.json({
          status: 'successful',
          message: `Question ${id} deleted`,
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

export { deleteQuestion };
