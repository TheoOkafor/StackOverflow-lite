import express from 'express';
import db from '../db';

const votesValidate = (req, res, next) => {
  const answerId = req.params.idA;
  const questionId = req.params.idQ;
  const vote = req.body.vote;

  if (vote) {
    // Check if all fields are provided and are valid:
    const invalidReq = !vote.trim() || vote.toLowerCase() !== 'upvote'
      && vote.toLowerCase() !== 'downvote';

    /**
     * Checks whether the request is valid or not
     * @param  {Boolean} invalidReq - ```true``` or ```false```
     * @return {JSON | object} - returns the error message or the next callback
     */
    if (invalidReq) {
      res.status(400);
      res.json({
        statusCode: 400,
        error: 'Vote must not be empty (UPVOTE or DOWNVOTE)',
      });
      return res;
    } else {
      db.multi(`
        SELECT username FROM users WHERE id = $1;
        SELECT userid, vote FROM votes WHERE answerid = $2;
        SELECT * FROM questions WHERE id = $3;
        SELECT * FROM answers WHERE id = $2;`,
      [req.userId, answerId, questionId])
        .then((data) => {
          const votes = data[1];
          if (data[2].length <= 0 || data[3].length <= 0) {
            res.status(404);
            res.json({
              statusCode: 404,
              error: `Question ${questionId} or answer ${answerId} not found`,
            });
          }
          const conflictVote = votes.filter((voteItem) => {
            if (parseInt(voteItem.userid) === parseInt(req.userId)
              && voteItem.vote === vote.toLowerCase()) {
              return true;
            }
          });
          if (conflictVote.length > 0) {
            res.status(409);
            res.json({
              statusCode: 409,
              error: 'You have voted on this answer before',
            });
            return res;
          }
          req.username = data[0][0].username;
          return next();
        });
    }
  } else {
    res.status(400);
    res.json({
      statusCode: 400,
      error: 'Vote must be specified (UPVOTE or DOWNVOTE)',
    });
    return res;
  }
};

export default votesValidate;
