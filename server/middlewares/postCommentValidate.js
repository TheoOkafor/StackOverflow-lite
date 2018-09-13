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
  const idA = parseInt(req.params.idA);
  const idQ = parseInt(req.params.idQ);
  const reqBody = req.body;
  const reqId = parseInt(req.userId);

  db.multi(`
    SELECT * FROM questions WHERE id = $1;
    SELECT * FROM answers WHERE id = $2`, [idQ, idA])
    .then(data => {
      /**
       * Check whether the question or answer exists
       * @param  {boolean} !data[0][0] ||            !data[1][0] 
       * [question or answer array]
       * @return {JSON | object}             [Error 404 if true]
       */
      if (!data[0][0] || !data[1][0]) {
        res.status(404);
        res.json({
          statusCode: 404,
          error: `Question ${idQ} or answer ${idA} not found`,
        });
        return res;
      }

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
  })
  .catch(error => {
      console.log(error)
  });
};
    

export default postCommentValidate;
