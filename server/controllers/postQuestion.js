import express from 'express';
import db from '../db';

/**
 * Handles POST questions requests to the database
 * @param  {JSON | object} req - The user request to the server
 * @param  {JSON | object} res - The response to the user
 * @return {JSON | object}     - Error Message or Success message.
 */
const postQuestion = (req, res) => {
  const reqBody = req.body;
  const timeNow = new Date().toUTCString();
  /**
   * The SQL statement sent to the DB
   * @type {Object}
   */
  const request = {
    text: 'INSERT INTO questions (title, body, timeSubmitted, username)'
    + ' VALUES ($1, $2, $3, $4) RETURNING id',
    values: [reqBody.title, reqBody.body, timeNow, reqBody.username],
  };
  db.one(request.text, request.values)
    .then(data => {
      res.status(201);
      res.json({
        status: 'successful',
        message: 'New question added',
        data: reqBody,
        metadata: {
          location: `/v1/questions/${data.id}`,
        },
      });
    })
    /**
     * Catches the error from the database
     * @param  {Object} error - contains details about the database error
     * @return {JSON | object}  - contains error 500 message sent to the user
     */
    .catch(error => {
      res.status(500);// Set status to 500
      res.json({
        status: 'failed',
        message: 'Server failed to complete request',
        data: reqBody,
      });
    });
}

export { postQuestion };
