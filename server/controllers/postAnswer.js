import express from 'express';
import db from '../db';

/**
 * Handles POST answer requests to the database
 * @param  {JSON Object} req - The user request to the server
 * @param  {JSON Object} res - The response to the user
 * @return {JSON Object}     - Error Message or Success message.
 */
const postAnswer = (req, res) => {
  const reqBody = req.body;
  const requestId = req.params.id;
  const timeNow = new Date().toUTCString();
  /**
   * The SQL statement
   * @type {Object}
   */
  const request = {
    text: 'INSERT INTO answers'
      + ' (questionID, body, timeSubmitted, username, accepted)'
      + ' VALUES ($1, $2, $3, $4, $5)'
      + ' RETURNING ID',
    values: [requestId, reqBody.body, timeNow, reqBody.username, false],
  };
  db.one(request.text, request.values)
    .then(data => {
      res.status(201);
      res.json({
        status: 'successful',
        message: 'New answer added',
        data: reqBody,
        metadata: {
          location: `/v1/questions/${requestId}/answers/${data.id}`,
        },
      });
    })
    /**
     * Catches the error from the database
     * @param  {Object} error - contains details about the database error
     * @return {JSON Object}  - contains error 404 or 500 message sent to the user
     */
    .catch(error => {
      /**
       * checks for the question ID
       * @param {undefined} error.where - Property of the error object return
       * @return {JSON Object} - Error 404 or Error 500
       */
      if (error.where === undefined) {
        const err = new Error(`Question ${requestId} Not Found`);
        res.status(404);
        res.json({
          status: 'failed',
          message: err.message,
          data: reqBody,
        });
      } else {
        res.status(500);// Set status to 500
        res.json({
          status: 'failed',
          message: 'Server failed to complete request',
        });
        console.log(error);
      }
    });
};

export { postAnswer };
