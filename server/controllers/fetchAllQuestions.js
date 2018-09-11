import express from 'express';
import db from '../db';

/**
 * Handles the GET all questions requests
 * @param  {JSON | object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON | object}   res  - response to the user
 * @return {JSON | object}     Success or error message.
 */
const fetchAllQuestionsCtrl = (req, res, next) => {
 	db.multi('SELECT * FROM questions;SELECT * FROM answers')
    .then((data) => {
      /**
       * Handles the arrangement of the answers inside the corresponding
       *  questions
       * @param  {object} question   [the question object]
       * @return {object}            [the question object with answers]
       */
      const questions = data[0].map((question) => {
        /**
         * Filters out the answers from the answers array that have
         *  the current question id as their ```questionid```.
         * @param  {object} answer [The answer object]
         * @return {array}        [An array of answers that met the set
         *  condition]
         */
        const answers = data[1].filter((answer) => {
          if (parseInt(answer.questionid) === parseInt(question.id)) {
            return true;
          }
        });
        question.answers = answers;
        question.numAnswers = answers.length;
        return question;
      });
      res.status(200);
      res.json({
        statusCode: 200,
        message: 'Questions found',
        data: questions,
      });
    })
    /**
     * Catches the database error when it occurs
     * @param  {object} err - contains details about the error from the DB
     * @return {JSON | object} - Error message response to user
     */
  	.catch((error) => {
  		res.status(500);// Set status to 500
      res.json({
        statusCode: 500,
        error: 'Server failed to complete request',
      });
  	});
};

export { fetchAllQuestionsCtrl };
