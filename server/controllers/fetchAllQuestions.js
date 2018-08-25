import express from 'express';
import db from '../db';

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
  	.catch((err) => {
  		res.status(501);// Set status to 501
      res.json({
        status: 'failed',
        message: 'Server failed to complete request',
      });
  	});
};

export { fetchAllQuestionsCtrl };
