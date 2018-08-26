import express from 'express';
import db from '../db';


/**
 * Handles the GET one question requests
 * @param  {JSON object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON object}   res  - response to the user
 * @return {JSON object}     Success or error message.
 */

const fetchQuestionCtrl = (req, res) => {
  const requestId = parseInt(req.params.id);
  /**
   * The SQL statement
   * @type {Object}
   */
  const query = {
    name: 'fetch-question',
    text: 'SELECT * FROM questions WHERE id = $1',
    values: [requestId],
  };

  db.one(query.text, requestId)
    .then((data) => {
      res.json({
        status: 'successful',
        message: `Question ${requestId} found`,
        data,
      });
    })
    /**
     * Catches the database error
     * @param  {Object} error - contains the details about the error
     * @return {JSON Object} - contains the error 404 or 500 reponse to the user 
     */
    .catch(error => {
      /**
       * Checks whether data was received from the database
       * @param  {Number} error.received - is zero if no data was received
       * @return {JSON Object} - error message
       */
      if (error.received === 0) {
        res.status(404);// Set status to 404 as question was not found
        res.json({
          status: 'failed',
          message: `Question ${requestId} Not Found`,
        });
      } else {
        res.status(500);// Set status to 500
        res.json({
          status: 'failed',
          message: 'Server failed to complete request',
        });
      }
    });
};

export { fetchQuestionCtrl };
