import express from 'express';
import db from '../db';

/**
 * Handles POST questions requests to the database
 * @param  {JSON | object} req - The user request to the server
 * @param  {JSON | object} res - The response to the user
 * @return {JSON | object}     - Error Message or Success message.
 */
const postQuestion = (req, res) => {
  console.log('>>>' + req.username);
  const reqBody = req.body;
  const userid = req.userId;
  const timeNow = new Date().toUTCString();
  /**
   * The SQL statement sent to the DB
   * @type {Object}
   */
  const request = {
    text: 'INSERT INTO questions (title, body, timeSubmitted, username, userid)'
    + ' VALUES ($1, $2, $3, $4, $5) RETURNING id',
    values: [reqBody.title, reqBody.body, timeNow, req.username, userid],
  };
  db.one(request.text, request.values)
    .then(data => {
      res.status(201);
      res.json({
        statusCode: 201,
        message: 'New question added',
        data: reqBody
      });
    })
    /**
     * Catches the error from the database
     * @param  {Object} error - contains details about the database error
     * @return {JSON | object}  - contains error 500 message sent to the user
     */
    .catch(error => {
      console.log(error);
      res.status(500);// Set status to 500
      res.json({
        statusCode: 500,
        error: 'Server failed to complete request'
      });
    });
}

export { postQuestion };
