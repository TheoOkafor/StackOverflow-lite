/**
 * db is the Database setup module
 */
import db from '../db';

/**
 * Accept answer controller module
 * @param  {JSON | object}   req  - request parameters and body
 * The request body should have 'value' property which must be boolean value
 * @param  {JSON | object}   res  - response to the user
 */
const acceptAnswer = (req, res, next) => {
  const id = parseInt(req.params.idA, 10);
  const questionID = parseInt(req.params.idQ, 10);
  const reqBody = req.body;

  if (req.reqId === req.questionOwner) {
    if (req.reqId === req.answerOwner && reqBody.body) {
      next();
    } else {
      const invalidReq = !reqBody || typeof reqBody.value !== 'boolean';
      /**
         * Checks to see if the value property is defined and has boolean
         * @param  {boolean} invalidReq
         * @return {JSON | object} - containing error message
         */
      if (invalidReq) {
        res.status(400);
        res.json({
          statusCode: 400,
          error: 'Expected a request body with {value: true || false}',
        });
        return res;
      }
      /**
         * The SQL request
         * @type {String}
         */
      const query = `UPDATE answers SET accepted=$3 WHERE ID=$1
           AND questionID=$2 RETURNING ID`;
        /**
         * The request variable required by the SQL request
         * @type {Array}
         */

      const request = [id, questionID, req.body.value];
      db.result(query, request)
        .then((result) => {
          if (result) {
            res.status(201);
            res.json({
              statusCode: 201,
              message: `Answer ${id} has been ${req.body.value
                ? 'accepted' : 'unaccepted'}`,
            });
            return res;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    return next();
  }
};

export default acceptAnswer;
