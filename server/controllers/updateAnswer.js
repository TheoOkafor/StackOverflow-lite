import db from '../db';

const updateAnswer = (req, res) => {
  const idA = parseInt(req.params.idA);
  const idQ = parseInt(req.params.idQ);
  /**
   * Check the ID of requester is the same as the id of answer creator
   * {string} reqId - the ID of the requester
   *  answerOwnerId - the ID of answer owner
   * @return {JSON | object}       error message or OK response
   */
  if (req.body.body) {
    // Check if all fields are provided and are valid:
    const invalidReq = !req.body.body.trim();

    /**
     * Checks whether the request is valid or not
     * @param  {Boolean} invalidReq - ```true``` or ```false```
     * @return {JSON | object} - returns the error message or the next callback
     */
    if (invalidReq) {
      res.status(400);
      res.json({
        statusCode: 400,
        error: 'Answer body must not be empty',
      });
    } else {
      const query = `UPDATE answers SET body=$3 WHERE ID=$1
       AND questionID=$2 RETURNING ID`;
      /**
       * The request variable required by the SQL request
       * @type {Array}
       */

      const request = [idA, idQ, req.body.body];
      db.result(query, request)
        .then((result) => {
          res.status(201);
          res.json({
            statusCode: 201,
            message: `Answer ${idA} has been updated`,
          });
          return res;
        })
        /**
         * Catch Error call-back
         * @param  {Object} error handles the errors resulting from the request.
         */
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    res.status(400);
    res.json({
      statusCode: 400,
      error: 'Answer must have a body',
    });
    return res;
  }
};

export default updateAnswer;
