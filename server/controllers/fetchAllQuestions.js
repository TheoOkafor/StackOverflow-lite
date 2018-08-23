import express from 'express';
import client from '../db-setup';

const fetchAllQuestionsCtrl = (req, res, next) => {
 	client.query('SELECT * FROM questions', (err, data) => {
    if(err){
      console.log(err);
      res.status(400).send(err);
    }
  	res.status(200);
  	res.json({
	  	status: 'successful',
	    message: 'Questions found',
	  	data: data.rows,
		});
  });  
};

export { fetchAllQuestionsCtrl };
