import express from 'express';
import db from '../db';

/**
 * Handles the GET all questions requests
 * @param  {JSON object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON object}   res  - response to the user
 * @return {JSON object}     Success or error message.
 */
const fetchAllQuestionsCtrl = (req, res, next) => {
 	db.any('SELECT * FROM questions')
 		.then((data) => {
	  	res.status(200);
	  	res.json({
		  	status: 'successful',
		    message: 'Questions found',
		  	data,
      });
  	})
    /**
     * Catches the database error when it occurs
     * @param  {object} err - contains details about the error from the DB
     * @return {JSON object} - Error message response to user
     */
  	.catch(error => {
  		res.status(501);// Set status to 501
      res.json({
        status: 'failed',
        message: 'Server failed to complete request',
      });
  	});
};

export { fetchAllQuestionsCtrl };
