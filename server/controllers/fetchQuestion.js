import db from '../db';


/**
 * Handles the GET one question requests
 * @param  {JSON | object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON | object}   res  - response to the user
 * @return {JSON | object}     Success or error message.
 */

const fetchQuestionCtrl = (req, res) => {
  const requestId = parseInt(req.params.id, 10);

  db.multi(`
    SELECT * FROM questions WHERE id = $1;
    SELECT * FROM answers WHERE questionid=$1; 
    SELECT * FROM votes WHERE questionid=$1;
    SELECT * FROM comments WHERE questionid=$1;`, requestId)
    .then((output) => {
      if (output[0].length < 1) {
        res.status(404);// Set status to 404 as question was not found
        res.json({
          statusCode: 404,
          error: `Question ${requestId} Not Found`,
        });
        return res;
      }
      const question = output[0][0];
      const dbAnswers = output[1];
      const dbVotes = output[2];
      const dbComments = output[3];

      // Works on answers and add votes and comments to it.
      dbAnswers.map((answer) => {
        // VOTES
        // Put the votes in the corresponding answers
        const answerVotes = dbVotes.filter((vote) => {
          vote.answerid === answer.id;
        });

        // Makes the array of downvotes in each answer
        const downvotes = answerVotes.filter((voteItem) => {
          voteItem.vote === 'downvote';
        });
          // Makes the array of upvotes in each answer
        const upvotes = answerVotes.filter((voteItem) => {
          voteItem.vote === 'upvote';
        });

        const votesCount = upvotes.length - downvotes.length;

        answer.upvotes = upvotes.length;
        answer.downvotes = downvotes.length;
        answer.votesCount = votesCount;

        // COMMENTS
        const answerComments = dbComments.filter((comment) => {
          comment.answerid === answer.id;
        });
        answer.comments = answerComments;
        return answer;
      });

      question.answers = dbAnswers;
      const data = question;
      res.status(200);
      res.json({
        statusCode: 200,
        message: `Question ${requestId} found`,
        data,
      });
      return res;
    })
    /**
     * Catches the database error
     * @param  {Object} error - contains the details about the error
     * @return {JSON | object} - contains the error 404 or 500 reponse
     *  to the user
     */
    .catch((error) => {
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

export default fetchQuestionCtrl;
