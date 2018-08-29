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
const acceptAnswer = (req, res) => {
  const id = parseInt(req.params.idA);
  const idQ = parseInt(req.params.idQ);
  /**
   * The SQL request
   * @type {String}
   */
  const query = 'UPDATE answers SET accepted=$3 WHERE ID=$1'
   +' AND questionID=$2 RETURNING questionID';
  /**
   * The request variable required by the SQL request
   * @type {Array}
   */
  const request = [id, idQ, req.body.value];
  db.any(query, request)
    .then((data) => {
      /**
       * Check whether the request to the database returned 'any' data
       * @param  {Boolean} data.length < 1 
       * Will be ```true``` or ```false```
       * @return {JSON | object} An error 404 message, that question do not exist.
       */
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
    /**
     * Catch Error call-back
     * @param  {Object} error handles the errors resulting from the request. 
     * @return {JSON | object}  error 500 message.
     */
    .catch(error => {
      console.log(error);
      res.status(500);// Set status to 500
      res.json({
        status: 'failed',
        message: 'Server failed to complete request',
      });
    });
};


export { acceptAnswer };
