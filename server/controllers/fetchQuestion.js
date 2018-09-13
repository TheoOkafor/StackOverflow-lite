import express from 'express';
import db from '../db';


/**
 * Handles the GET one question requests
 * @param  {JSON | object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON | object}   res  - response to the user
 * @return {JSON | object}     Success or error message.
 */

const fetchQuestionCtrl = (req, res) => {
  const requestId = parseInt(req.params.id);

  db.multi(`
    SELECT * FROM questions WHERE id = $1;
    SELECT * FROM answers WHERE questionid=$1; 
    SELECT * FROM votes WHERE questionid=$1;
    SELECT * FROM comments WHERE questionid=$1;`, requestId)
    .then(output => {
      if (output[0].length<1) { 
        res.status(404);// Set status to 404 as question was not found
        res.json({
          statusCode: 404,
          error: `Question ${requestId} Not Found`,
        });
        return res;
      } else {
        let question = output[0][0];
        let dbAnswers = output[1];
        let dbVotes = output[2];
        let dbComments = output[3];

        dbAnswers.map(answer => {
          // VOTES
          // Put the votes in the corresponding answers
          let answerVotes = dbVotes.filter(vote => {
            if(vote.answerid === answer.id){
              return true;
            }
          });

          // Makes the array of downvotes in each answer
          let downvotes = answerVotes.filter(voteItem => {
            if(voteItem.vote === 'downvote'){
              return true;
            }
          });
          // Makes the array of upvotes in each answer
          let upvotes = answerVotes.filter(voteItem => {
            if(voteItem.vote === 'upvote'){
              return true;
            }
          });

          let votesCount = upvotes.length - downvotes.length;

          answer.upvotes = upvotes.length;
          answer.downvotes = downvotes.length;
          answer.votesCount = votesCount;

          // COMMENTS
          let answerComments = dbComments.filter(comment => {
            if(comment.answerid === answer.id){
              return true;
            }
          });
          answer.comments = answerComments;
        });

        question.answers = dbAnswers;
        let data = question;
        res.status(200);
        res.json({
          statusCode: 200,
          message: `Question ${requestId} found`,
          data,
        });
        return res;
      }
    })
    /**
     * Catches the database error
     * @param  {Object} error - contains the details about the error
     * @return {JSON | object} - contains the error 404 or 500 reponse
     *  to the user
     */
    .catch((error) => {
      console.log(error);
      /**
       * Checks whether data was received from the database
       * @param  {Number} error.received - is zero if no data was received
       * @return {JSON | object} - error message
       */
      res.status(500);// Set status to 500
      res.json({
        statusCode: 500,
        error: 'Server failed to complete request',
      });
    });
};

export { fetchQuestionCtrl };
