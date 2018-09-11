import express from 'express';
import db from '../db';

/**
 * This middleware validates the POST answer request body
 * @param  {JSON | object}   req - The user request to the API
 * @param  {JSON | object}   res - The server response to the user
 * @param  {Function} next - sends the request to the next middleware
 *  or controller
 * @return {JSON | object} - Error message or next callback
 */
const postCommentValidate = (req, res, next) => {
  const requestId = req.params.id;
  const reqBody = req.body;

  if (reqBody.body) {
    // Check if all fields are provided and are valid:
    const invalidReq = !reqBody.body.trim();

    /**
     * Checks whether the request is valid or not
     * @param  {Boolean} invalidReq - ```true``` or ```false```
     * @return {JSON | object} - returns the error message or the next callback
     */
    if (invalidReq) {
      res.status(400);
      res.json({
        statusCode: 400,
        error: 'Comment body must not be empty',
      });
    } else {
      db.any('SELECT username FROM users WHERE id = $1', [req.userId])
        .then(data => {
          req.username = data[0].username;
          return next();
        })
    }
  } else {

    res.status(400);
    res.json({
      statusCode: 400,
      error: 'Comment must have a body',
    });
    return res;
  }
};

export default postCommentValidate;
