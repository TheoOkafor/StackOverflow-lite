import express from 'express';
import db from '../db';

/**
 * This middleware validates the accept answer endpoint
 * @param  {JSON | object}   req - contains the request body from user
 * @param  {JSON | object}   res - contains the response to the request
 * @param  {Function} next moves to the next middleware if the request is valid
 * @return {JSON | object}
 */

const deleteQuestionValidate = (req, res, next) => {
  const id = parseInt(req.params.id);
  const reqBody = req.body;
  const reqId = parseInt(req.userId);

  db.any('SELECT * FROM questions WHERE id = $1', [id])
    .then(data => {
      let ownerId = parseInt(data[0].userid);

      if (ownerId === reqId) {
        return next();
      } else {
        res.status(403);
        res.json({
          statusCode: 403,
          error: 'You are not authorised to complete this action',
        });
      }
    })
    .catch(error => {
      res.status(404);
      res.json({
        statusCode: 404,
        error: `Question ${id} not found`,
      });
    });
  /**
   * Is true if request has no value property or
   * value of the value property is not boolean.
   * @type {boolean}
   */
};

export default deleteQuestionValidate;
