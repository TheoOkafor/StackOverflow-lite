import express from 'express';
import db from '../db';

/**
 * Handles POST answer requests to the database
 * @param  {JSON | object} req - The user request to the server
 * @param  {JSON | object} res - The response to the user
 * @return {JSON | object}     - Error Message or Success message.
 */
const postAnswer = (req, res) => {
  const reqBody = req.body;
  const requestId = req.params.id;
  const userid = req.userId;
  const timeNow = new Date().toUTCString();
  /**
   * The SQL statement
   * @type {Object}
   */
  const request = {
    text: 'INSERT INTO answers'
      + ' (questionID, body, timeSubmitted, username, userid)'
      + ' VALUES ($1, $2, $3, $4, $5)'
      + ' RETURNING ID',
    values: [requestId, reqBody.body, timeNow, reqBody.username, userid],
  };
  db.one(request.text, request.values)
    .then(data => {
      res.status(201);
      res.json({
        statusCode: 201,
        message: 'New answer added',
        data: reqBody,
      });
    })
    /**
     * Catches the error from the database
     * @param  {Object} error - contains details about the database error
     * @return {JSON | object}  - contains error 404 or 
     * 500 message sent to the user
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
          statusCode: 404,
          error: err.message,
        });
      } else {
        res.status(500);// Set status to 500
        res.json({
          statusCode: 500,
          error: 'Server failed to complete request',
        });
      }

    });
};

export { postAnswer };
