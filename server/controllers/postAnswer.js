import express from 'express';
import pool from '../db';

/**
 * Handles POST answer requests to the database
 * @param  {JSON | object} req - The user request to the server
 * @param  {JSON | object} res - The response to the user
 * @return {JSON | object}     - Error Message or Success message.
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
  pool.connect()
    .then((client) => {
      client.query(request.text, request.values)
        .then((data) => {
          client.release()
          data = data.rows;
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
    })
    /**
     * Catches the error from the database
     * @param  {Object} error - contains details about the database error
     * @return {JSON | object}  - contains error 404 or 500 message sent to the user
     */
    .catch(error => {
      /**
       * checks for the question ID
       * @param {undefined} error.where - Property of the error object return
       * @return {JSON | object} - Error 404 or Error 500
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
