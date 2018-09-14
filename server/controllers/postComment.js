import db from '../db';

/**
 * Handles POST comment requests to the database
 * @param  {JSON | object} req - The user request to the server
 * @param  {JSON | object} res - The response to the user
 * @return {JSON | object}     - Error Message or Success message.
 */
const postComment = (req, res) => {
  const reqBody = req.body;
  const answerId = req.params.idA;
  const questionId = req.params.idQ;
  const timeNow = new Date().toUTCString();
  const username = req.username;
  const userId = req.userId;
  /**
   * The SQL statement
   * @type {Object}
   */
  const request = `INSERT INTO comments 
    (answerId, questionId, body, username, userid, timeSubmitted)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING ID`;
  const values = [
    answerId,
    questionId,
    reqBody.body,
    username,
    userId,
    timeNow,
  ];

  db.one(request, values)
    .then((data) => {
      res.status(201);
      res.json({
        statusCode: 201,
        message: 'New comment added',
        data: reqBody,
      });
    })
    /**
     * Catches the error from the database
     * @param  {Object} error - contains details about the database error
     * @return {JSON | object}  - contains error 404 or
     * 500 message sent to the user
     */
    .catch((error) => {
      console.log(error);
    });
};

export default postComment;
