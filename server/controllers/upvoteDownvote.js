import express from 'express';
import db from '../db';

const upvoteDownvote = (req, res) => {
	const answerId = req.params.idA;
	const questionId = req.params.idQ;
	const timeNow = new Date().toUTCString();
	const username = req.username;
	const userId = req.userId;
	const vote = req.body.vote;

	const request = `INSERT INTO votes 
		(vote, answerId, questionId, username, userid, timeSubmitted)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  const values = [vote, answerId, questionId, username, userId, timeNow];

  db.one(request, values)
  	.then(data => {
      if (data) {
        const result = {
          voteid: data.id
        }
        res.status(201);
        res.json({
          statusCode: 201,
          message: `Answer ${answerId} ${vote}d`,
          data: result,
        });
        return res;
      } else {
        res.status(404);
        res.json({
          statusCode: 404,
          error: `Question or Answer not found`,
        });
        return res;
      }
    })
    .catch( error => {
    	console.log(error);
    });
}

export default upvoteDownvote;
