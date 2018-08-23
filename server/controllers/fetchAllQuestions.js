import express from 'express';
import db from '../db';

const fetchAllQuestionsCtrl = (req, res, next) => {
 	db.any('SELECT * FROM questions')
 		.then((data) => {
	  	res.status(200);
	  	res.json({
		  	status: 'successful',
		    message: 'Questions found',
		  	data: data.rows,
      });
  	})
  	.catch(err => next(err));
};

export { fetchAllQuestionsCtrl };
