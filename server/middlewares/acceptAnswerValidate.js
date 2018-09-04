import express from 'express';
import db from '../db';

/**
 * This middleware validates the accept answer endpoint
 * @param  {JSON | object}   req - contains the request body from user
 * @param  {JSON | object}   res - contains the response to the request
 * @param  {Function} next moves to the next middleware if the request is valid
 * @return {JSON | object}
 */

const acceptAnswerValidate = (req, res, next) => {
  const idA = parseInt(req.params.idA);
  const idQ = parseInt(req.params.idQ);
  const reqBody = req.body;
  const reqId = parseInt(req.userId);

  db.any('SELECT * FROM questions WHERE id = $1', [idQ])
    .then(data => {
      let ownerId = parseInt(data[0].userid);

      const invalidReq = !reqBody || typeof reqBody.value !== 'boolean';
      /**
         * Checks to see if the value property is defined and has boolean value
         * @param  {boolean} invalidReq
         * @return {JSON | object} - containing error message
         */
      if (invalidReq) {
        res.status(400);
        res.json({
          statusCode: 400,
          error: 'Expected a request body with {value: true || false}',
        });
        return res;
      }
      if (ownerId === reqId) {
        next();
      } else {
        res.status(403);
        res.json({
          statusCode: 403,
          error: 'You are not authorised to complete this action',
        });
        return res;
      }
    })
    .catch(error => {
      res.status(404);
      res.json({
        statusCode: 404,
        error: `Question ${idQ} not found`,
      });
      return res;
    });
  /**
   * Is true if request has no value property or
   * value of the value property is not boolean.
   * @type {boolean}
   */
};

export { acceptAnswerValidate };
