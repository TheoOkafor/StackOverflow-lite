/**
 * db is the Database setup module
 */
import express from 'express';
import db from '../db';

/**
 * Accept answer controller module
 * @param  {JSON | object}   req  - request parameters and body
 * The request body should have 'value' property which must be boolean value
 * @param  {JSON | object}   res  - response to the user
 */
const acceptAnswer = (req, res, next) => {
  const id = parseInt(req.params.idA);
  const questionID = parseInt(req.params.idQ);
  const reqBody = req.body;

  if (req.reqId === req.questionOwner) {
    if (req.reqId === req.answerOwner && reqBody.body) {
      next();
    } else {
      const invalidReq = !reqBody || typeof reqBody.value !== 'boolean';
      /**
         * Checks to see if the value property is defined and has boolean
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
      } else {
        /**
         * The SQL request
         * @type {String}
         */
        const query = `UPDATE answers SET accepted=$3 WHERE ID=$1
           AND questionID=$2 RETURNING ID`;
        /**
         * The request variable required by the SQL request
         * @type {Array}
         */
        
        const request = [id, questionID, req.body.value];
        db.result(query, request)
          .then((result) => {
            /**
             * Check whether the request to the database returned 'any' data
             * @param  {Boolean} data.length < 1
             * Will be ```true``` or ```false```
             * @return {JSON | object} An error 404 message, that question do not exist.
             */
            if (result.rowCount < 1) {
              res.status(404);// Set status to 404
              res.json({
                statusCode: 404,
                error: `Answer ${id} not found`,
              });
              return res;
            } else {
              res.status(201);
              res.json({
                statusCode: 201,
                message: `Answer ${id} has been ${req.body.value
                  ? 'accepted' : 'unaccepted'}`,
              });
              return res;
            }
          })
          /**
           * Catch Error call-back
           * @param  {Object} error handles the errors resulting from the request.
           * @return {JSON | object}  error 500 message.
           */
          .catch((error) => {
            res.status(500);// Set status to 500
            res.json({
              statusCode: 500,
              error: 'Server failed to complete request',
            });
            return res;
          });
      } 
    }
      
  } else {
    next();

  }
};

export { acceptAnswer };
