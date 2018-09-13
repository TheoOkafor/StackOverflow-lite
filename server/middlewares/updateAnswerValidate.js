import express from 'express';
import db from '../db';

/**
 * This middleware validates the update answer endpoint
 * @param  {JSON | object}   req - contains the request body from user
 * @param  {JSON | object}   res - contains the response to the request
 * @param  {Function} next moves to the next middleware if the request is valid
 * @return {JSON | object}
 */

const updateAnswerValidate = (req, res, next) => {
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

      } else {
        let questionOwnerId = parseInt(data[0][0].userid);
        let answerOwnerId = parseInt(data[1][0].userid);

        /**
         * Check the ID of requester is the same as the id of question creator
         * @param  {string} reqId - the ID of the requester
         *                  questionOwnerId - the ID of question owner
         * @return {JSON | object}  Error message or OK response
         */
        if(reqId === questionOwnerId || reqId === answerOwnerId) {
          req.questionOwner = questionOwnerId;
          req.answerOwner = answerOwnerId;
          req.reqId = reqId;

          next();
        } else {
          res.status(403);
          res.json({
            statusCode: 403,
            error: 'You are not authorised to complete this action',
          });
          return res;
        } 
        
      }
    })
    .catch(error => {
      console.log(error)
    });
  /**
   * Is true if request has no value property or
   * value of the value property is not boolean.
   * @type {boolean}
   */
};

export { updateAnswerValidate };
