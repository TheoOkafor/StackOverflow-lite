import express from 'express';
import db from '../db';

/**
 * This middleware validates the POST question request body
 * @param  {JSON | object}   req - The user request to the API
 * @param  {JSON | object}   res - The server response to the user
 * @param  {Function} next - sends the request to the next middleware
 *  or controller
 * @return {JSON | object} - Error message or next callback
 */
const postQuestionValidate = (req, res, next) => {
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = !reqBody.title.trim() || !reqBody.title.trim()
    || !reqBody.body.trim() ;

  /**
   * Checks whether the request is valid or not
   * @param  {Boolean} invalidReq - ```true``` or ```false```
   * @return {JSON | object} - returns the error message or the next callback
   */
  if (invalidReq) {
    const err = new Error('Question must have title and body');
    res.status(400);
    res.json({
      statusCode: 400,
      error: err.message,
    });
  } else {
    db.any('SELECT username FROM users WHERE id = $1', [req.userId])
      .then(data => {
        req.username = data[0].username;
        return next();
      })
      .catch(error => {
        res.status(404);
        res.json({
          statusCode: 404,
          error: `User with user ID: ${id} not found`,
        });
      });
  }
};

export { postQuestionValidate };
