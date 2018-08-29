import express from 'express';
import db from '../db';

const user = (req, res, next) => {
	const request = {
    text: 'SELECT username, email, created, modified FROM users'
    +' WHERE ID=$1',
    values: [req.id],
  };
	db.one(request.text, request.values) 
		.then((user) => {
    if (!user) { 
	    	res.status(404);
	    	res.json({
	    		status: 'failed',
	    		message: 'User not found',
	    	});
	    }
	    res.status(200);
	    res.json({
	    		status: 'successful',
	    		message: 'User found',
	    		data: user,
	    });
	  })
	  .catch( error => {
	  	if (error){
	    	res.status(500);
	    	res.json({
	    		status: 'failed',
	    		massage: 'Error occurred while finding user',
	    	});
	    }
	  });
}

export default user;
